
import React, { useState, useEffect } from 'react';
import JSZip from 'jszip';


interface ImageGalleryModalProps {
    images: string[];
    onClose: () => void;
    chassisNumber: string;
    supplierName: string;
}

export const ImageGalleryModal: React.FC<ImageGalleryModalProps> = ({ images, onClose, chassisNumber, supplierName }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        const isFirstImage = currentIndex === 0;
        const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastImage = currentIndex === images.length - 1;
        const newIndex = isLastImage ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') goToPrevious();
            if (e.key === 'ArrowRight') goToNext();
        };
        
        if (typeof window !== 'undefined') {
            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }
    }, [currentIndex, onClose]);
    
    const handleDownload = async () => {
        try {
            const { default: saveAs } = await import('file-saver');
            saveAs(images[currentIndex], `${chassisNumber}-image-${currentIndex + 1}.jpg`);
        } catch (error) {
            console.error("Failed to download image:", error);
        }
    };
    
    const handleDownloadAllAsZip = async () => {
        if (!images || images.length === 0) return;
        try {
            const { default: saveAs } = await import('file-saver');
            const zip = new JSZip();
            
            const imagePromises = images.map(async (url, index) => {
              try {
                const response = await fetch(url);
                const blob = await response.blob();
                const extension = blob.type.split('/')[1] || 'jpg';
                zip.file(`${chassisNumber}_image_${index + 1}.${extension}`, blob);
              } catch (error) {
                console.error(`Failed to process image ${index} for zipping:`, error);
              }
            });
            
            await Promise.all(imagePromises);
            
            const shortSupplierName = (supplierName || 'supplier').split(' ')[0].toLowerCase();
            const zipFileName = `${shortSupplierName}-${chassisNumber}.zip`;
            
            const content = await zip.generateAsync({ type: "blob" });
            saveAs(content, zipFileName);
        } catch (error) {
            console.error("Failed to create zip file:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-2xl p-4 relative max-w-4xl max-h-[90vh] flex flex-col gap-4" onClick={e => e.stopPropagation()}>
                
                <div className="flex-grow flex items-center justify-center overflow-hidden">
                    <img src={images[currentIndex]} alt={`Vehicle image ${currentIndex + 1}`} className="max-w-full max-h-full object-contain rounded-md"/>
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                         <button onClick={handleDownload} className="flex items-center gap-2 text-xs font-semibold bg-green-700 text-white px-3 py-1.5 rounded-md hover:bg-green-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                            Download Image
                        </button>
                         <button onClick={handleDownloadAllAsZip} className="flex items-center gap-2 text-xs font-semibold bg-blue-700 text-white px-3 py-1.5 rounded-md hover:bg-blue-600 transition-colors">
                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" /></svg>
                            Download All (.zip)
                        </button>
                    </div>
                    <div className="text-sm font-medium text-slate-400">
                        {currentIndex + 1} / {images.length}
                    </div>
                    <div className="flex gap-2">
                        <button onClick={goToPrevious} className="text-xs font-semibold bg-slate-600 text-slate-200 px-3 py-1.5 rounded-md hover:bg-slate-500 transition-colors">&lt; Prev</button>
                        <button onClick={goToNext} className="text-xs font-semibold bg-slate-600 text-slate-200 px-3 py-1.5 rounded-md hover:bg-slate-500 transition-colors">Next &gt;</button>
                    </div>
                </div>
            </div>
             <button onClick={onClose} className="absolute top-4 right-4 text-white text-3xl font-bold">&times;</button>
        </div>
    );
};
