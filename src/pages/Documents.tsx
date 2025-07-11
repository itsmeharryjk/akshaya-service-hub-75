
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Layout from "@/components/Layout";
import { deleteDocument, getServiceById, getStoredDocuments, saveDocument } from "@/lib/data-service";
import { ScannedDocument } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Eye, Trash2, FileText, X, Send, Plus, Camera } from "lucide-react";
import { toast } from "sonner";

const Documents: React.FC = () => {
  const [documents, setDocuments] = useState<ScannedDocument[]>([]);
  const [viewingDoc, setViewingDoc] = useState<ScannedDocument | null>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = () => {
    const docs = getStoredDocuments();
    setDocuments(docs);
  };

  const handleViewDocument = (doc: ScannedDocument) => {
    setViewingDoc(doc);
  };

  const handleDeleteDocument = (id: string) => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      deleteDocument(id);
      loadDocuments();
      if (viewingDoc?.id === id) {
        setViewingDoc(null);
      }
    }
  };

  const closeViewer = () => {
    setViewingDoc(null);
  };

  const handleScanDocument = () => {
    navigate('/scanner?standalone=true');
  };

  const handleSendDocument = (doc: ScannedDocument) => {
    // This would typically involve an API call to send the document to Akshaya
    // For now, we'll just show a toast notification
    toast.success(`Document ${doc.documentTypeName} sent to Akshaya successfully!`);
  };

  return (
    <Layout title={t('myDocuments')} showBack={true}>
      <div className="p-4 space-y-4">
        <div className="bg-akshaya-light rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-medium text-akshaya-primary mb-2">{t('myDocuments')}</h2>
          <p className="text-gray-600 text-sm">
            {t('documentsDescription')}
          </p>
        </div>

        {documents.length === 0 ? (
          <div className="text-center p-8">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <FileText size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-700">{t('noDocuments')}</h3>
            <p className="text-sm text-gray-500 mt-2">
              {t('noDocumentsDescription')}
            </p>
            <Button 
              variant="outline" 
              className="mt-4" 
              onClick={handleScanDocument}
            >
              <Plus size={16} className="mr-2" />
              {t('scanFirstDocument')}
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {documents.map((doc) => {
              const service = getServiceById(doc.serviceId);
              
              return (
                <div 
                  key={doc.id} 
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-medium">{doc.documentTypeName}</div>
                      <div className="text-xs text-gray-500">
                        {service?.name || "Personal Document"}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {new Date(doc.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleViewDocument(doc)}
                      >
                        <Eye size={16} />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleSendDocument(doc)}
                      >
                        <Send size={16} />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleDeleteDocument(doc.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating action button for scanning new documents */}
      <div className="fixed bottom-20 inset-x-0 flex justify-center">
        <Button 
          onClick={handleScanDocument} 
          className="bg-akshaya-primary h-14 w-14 rounded-full shadow-lg"
          size="icon"
        >
          <Camera size={24} />
        </Button>
      </div>

      {/* Document viewer modal */}
      {viewingDoc && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-medium">{viewingDoc.documentTypeName}</h3>
              <Button variant="ghost" size="icon" onClick={closeViewer}>
                <X size={18} />
              </Button>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <img 
                src={viewingDoc.file} 
                alt={viewingDoc.documentTypeName} 
                className="w-full h-auto"
              />
            </div>
            <div className="p-4 border-t">
              <div className="flex justify-between">
                <Button variant="outline" onClick={closeViewer}>{t('close')}</Button>
                <div className="space-x-2">
                  <Button 
                    variant="default" 
                    onClick={() => {
                      handleSendDocument(viewingDoc);
                      closeViewer();
                    }}
                  >
                    <Send size={16} className="mr-2" />
                    {t('sendToAkshaya')}
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={() => {
                      handleDeleteDocument(viewingDoc.id);
                      closeViewer();
                    }}
                  >
                    <Trash2 size={16} className="mr-2" />
                    {t('delete')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Documents;
