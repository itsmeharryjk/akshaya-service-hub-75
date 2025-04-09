import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { deleteDocument, getServiceById, getStoredDocuments } from "@/lib/data-service";
import { ScannedDocument } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Eye, Trash2, FileText, X } from "lucide-react";

const Documents: React.FC = () => {
  const [documents, setDocuments] = useState<ScannedDocument[]>([]);
  const [viewingDoc, setViewingDoc] = useState<ScannedDocument | null>(null);

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

  return (
    <Layout title="My Documents">
      <div className="p-4 space-y-4">
        {documents.length === 0 ? (
          <div className="text-center p-8">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <FileText size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-700">No Documents</h3>
            <p className="text-sm text-gray-500 mt-2">
              You haven't scanned or uploaded any documents yet.
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-medium">My Documents</h2>
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
                          {service?.name || "Unknown Service"}
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
          </>
        )}
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
                <Button variant="outline" onClick={closeViewer}>Close</Button>
                <Button 
                  variant="destructive" 
                  onClick={() => {
                    handleDeleteDocument(viewingDoc.id);
                    closeViewer();
                  }}
                >
                  <Trash2 size={16} className="mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Documents;
