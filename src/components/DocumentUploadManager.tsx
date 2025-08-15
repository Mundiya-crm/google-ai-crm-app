import React, { DragEvent } from 'react';
import { ClearingDocument } from '../constants/vehicleData';
import { ICONS } from '../constants/icons';

interface DocumentUploadManagerProps {
    documents: ClearingDocument[];
    onDocumentsChange: (docs: ClearingDocument[]) => void;
}

const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
};

export const DocumentUploadManager: React.FC<DocumentUploadManagerProps> = ({ documents, onDocumentsChange }) => {

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const newDocs: ClearingDocument[] = [];
        for (const file of Array.from(files)) {
            try {
                const url = await fileToDataUrl(file);
                newDocs.push({ name: file.name, url, type: file.type });
            } catch (error) {
                console.error(`Error processing file ${file.name}:`, error);
            }
        }
        
        onDocumentsChange([...documents, ...newDocs]);
        e.target.value = ''; // Allow re-uploading the same file
    };
    
    const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            const newDocs: ClearingDocument[] = [];
             for (const file of Array.from(files)) {
                try {
                    const url = await fileToDataUrl(file);
                    newDocs.push({ name: file.name, url, type: file.type });
                } catch (error) {
                    console.error(`Error processing file ${file.name}:`, error);
                }
            }
            onDocumentsChange([...documents, ...newDocs]);
        }
    };
    
    const handleRemoveDoc = (indexToRemove: number) => {
        onDocumentsChange(documents.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div className="space-y-2">
            <div 
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="p-4 border-2 border-dashed border-content-secondary rounded-btn text-center hover:bg-content-tertiary/30"
            >
                 <label htmlFor="docs-upload" className="cursor-pointer text-sm text-content-secondary">
                    <div className="w-8 h-8 mx-auto mb-1 text-content-primary">{ICONS.upload}</div>
                    Drag &amp; drop files here, or click to select
                </label>
                 <input 
                    id="docs-upload" 
                    type="file" 
                    multiple 
                    onChange={handleFileSelect} 
                    accept="application/pdf,image/jpeg,image/png" 
                    className="sr-only"
                />
            </div>
            
            {documents.length > 0 && (
                <div className="space-y-1 max-h-32 overflow-y-auto pr-1">
                    {documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-1.5 bg-content-tertiary/50 rounded-md text-xs">
                           <a href={doc.url} download={doc.name} className="flex-grow truncate text-accent font-semibold hover:underline" title={doc.name}>
                               {doc.name}
                           </a>
                           <button type="button" onClick={() => handleRemoveDoc(index)} className="w-4 h-4 ml-2 text-red-500 hover:text-red-400 shrink-0">
                               {ICONS.trash}
                           </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};