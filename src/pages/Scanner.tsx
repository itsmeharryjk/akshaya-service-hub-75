
import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Camera, Aperture, RotateCw, X, Check } from "lucide-react";
import { saveDocument } from "@/lib/data-service";

const Scanner: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [capturing, setCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [fileName, setFileName] = useState("Scanned document");
  const [documentName, setDocumentName] = useState("Document");
  
  // Get URL params
  const params = new URLSearchParams(location.search);
  const serviceId = params.get("serviceId");
  const docTypeId = params.get("docTypeId");
  const docTypeName = params.get("docTypeName") || "Document";
  const isStandalone = params.get("standalone") === "true";

  // Use docTypeName from URL or default to the state value
  useState(() => {
    if (docTypeName) {
      setDocumentName(docTypeName);
    }
  });

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setCapturing(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access camera. Please ensure camera permissions are granted.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => {
        track.stop();
      });
      setStream(null);
    }
    setCapturing(false);
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw video frame to canvas
      context?.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Get image data as base64
      const imageData = canvas.toDataURL('image/jpeg');
      setCapturedImage(imageData);
      
      // Stop camera
      stopCamera();
    }
  };

  const retake = () => {
    setCapturedImage(null);
    startCamera();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCapturedImage(event.target.result as string);
          setFileName(file.name);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocumentNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocumentName(e.target.value);
  };

  const handleSaveDocument = () => {
    if (!capturedImage) {
      alert("No image captured");
      return;
    }

    const document = {
      id: Date.now().toString(),
      serviceId: serviceId || "personal",
      documentTypeId: docTypeId || "personal-doc",
      documentTypeName: documentName,
      file: capturedImage,
      fileName: `${fileName}.pdf`,
      createdAt: new Date().toISOString()
    };

    try {
      saveDocument(document);
      if (serviceId) {
        navigate(`/service/${serviceId}`);
      } else {
        navigate('/documents');
      }
    } catch (error) {
      console.error("Error saving document:", error);
      alert("Failed to save document");
    }
  };

  return (
    <Layout title={t('documentScanner')} showNav={false} showBack>
      <div className="flex flex-col h-full">
        <div className="p-4">
          <h2 className="text-lg font-medium">{t('scanDocument')} {isStandalone ? t('documents') : docTypeName}</h2>
          <p className="text-sm text-gray-600 mb-4">
            {t('positionDocument')}
          </p>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-4">
          {/* Camera preview */}
          {capturing && (
            <div className="relative w-full max-w-md aspect-[3/4] bg-black rounded-lg overflow-hidden">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 border-2 border-white border-opacity-70 pointer-events-none" />
            </div>
          )}

          {/* Captured preview */}
          {capturedImage && (
            <div className="relative w-full max-w-md aspect-[3/4] bg-black rounded-lg overflow-hidden">
              <img 
                src={capturedImage} 
                alt="Captured document" 
                className="absolute inset-0 w-full h-full object-contain"
              />
            </div>
          )}

          {/* Hidden canvas for capturing */}
          <canvas ref={canvasRef} style={{ display: 'none' }} />

          {/* Hidden file input */}
          <input 
            type="file" 
            ref={fileInputRef} 
            accept="image/*" 
            onChange={handleFileUpload} 
            style={{ display: 'none' }}
          />

          {/* Document name input (only for standalone mode) */}
          {isStandalone && capturedImage && (
            <div className="w-full max-w-md mt-4">
              <label htmlFor="document-name" className="block text-sm font-medium text-gray-700 mb-1">
                {t('documentName')}
              </label>
              <input
                id="document-name"
                type="text"
                value={documentName}
                onChange={handleDocumentNameChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder={t('enterDocumentName')}
              />
            </div>
          )}

          {/* Controls */}
          <div className="flex justify-around w-full mt-6">
            {!capturing && !capturedImage ? (
              <>
                <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                  {t('uploadImage')}
                </Button>
                <Button onClick={startCamera}>
                  <Camera size={18} className="mr-2" />
                  {t('openCamera')}
                </Button>
              </>
            ) : capturing ? (
              <div className="flex justify-center w-full space-x-4">
                <Button variant="outline" size="icon" onClick={stopCamera}>
                  <X size={18} />
                </Button>
                <Button 
                  variant="default" 
                  size="icon" 
                  className="w-16 h-16 rounded-full"
                  onClick={captureImage}
                >
                  <Aperture size={32} />
                </Button>
                <Button variant="outline" size="icon" onClick={() => fileInputRef.current?.click()}>
                  <RotateCw size={18} />
                </Button>
              </div>
            ) : capturedImage ? (
              <div className="flex justify-center w-full space-x-4">
                <Button variant="outline" onClick={retake}>{t('retake')}</Button>
                <Button onClick={handleSaveDocument}>
                  <Check size={18} className="mr-2" />
                  {t('saveDocument')}
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Scanner;
