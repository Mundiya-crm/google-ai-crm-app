
import React, { useState, useRef, DragEvent } from 'react';
import JSZip from 'jszip';
import { ICONS } from '../constants/icons';

interface ImageUploadManagerProps {
    imageUrls: string[];
    onImageUrlsChange: (urls: string[]) => void;
}

export const ImageUploadManager: React.FC<ImageUploadManagerProps> = ({ imageUrls, onImageUrlsChange }) => {
    const [urlInput, setUrlInput] = useState('');
    const [isFetchingUrls, setIsFetchingUrls] = useState(false);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const dragOverIndex = useRef<number | null>(null);
    const [isDraggingOver, setIsDraggingOver] = useState(false);

    const processFiles = async (files: FileList) => {
        const newImageUrls: string[] = [];

        const blobToDataUrl = (blob: Blob): Promise<string> => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = error => reject(error);
                reader.readAsDataURL(blob);
            });
        };

        for (const file of Array.from(files)) {
            const isZip = file.type.includes('zip') || file.name.toLowerCase().endsWith('.zip');
            if (isZip) {
                try {
                    const zip = await JSZip.loadAsync(file);
                    const imagePromises: Promise<string>[] = [];

                    zip.forEach((relativePath, zipEntry) => {
                        const isImage = /\.(jpe?g|png|gif|webp)$/i.test(zipEntry.name);
                        const isNotMacMetadata = !zipEntry.name.startsWith('__MACOSX/');
                        
                        if (isImage && isNotMacMetadata && !zipEntry.dir) {
                            const promise = zipEntry.async('blob').then(blobToDataUrl);
                            imagePromises.push(promise);
                        }
                    });

                    const urlsFromZip = await Promise.all(imagePromises);
                    newImageUrls.push(...urlsFromZip);
                } catch (error) {
                    console.error("Error processing zip file:", error);
                    alert("Failed to process the ZIP file. Please ensure it's a valid archive.");
                }
            } else if (file.type.startsWith('image/')) {
                try {
                    const dataUrl = await blobToDataUrl(file);
                    newImageUrls.push(dataUrl);
                } catch (error) {
                    console.error("Error processing image file:", error);
                }
            }
        }

        if (newImageUrls.length > 0) {
            // Combine and filter for unique URLs to avoid duplicates
            onImageUrlsChange([...imageUrls, ...newImageUrls].filter((url, index, self) => self.indexOf(url) === index));
        }
    };
    
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        processFiles(files);
        // Reset the input value to allow re-uploading the same file
        e.target.value = '';
    };

    const handleFetchUrls = async () => {
        const urls = urlInput.split('\n').map(url => url.trim()).filter(Boolean);
        if (urls.length === 0) return;

        setIsFetchingUrls(true);
        const fetchedUrls: string[] = [];

        for (const url of urls) {
            try {
                // NOTE: This can fail due to CORS policy on the remote server.
                const response = await fetch(url);
                const blob = await response.blob();
                const dataUrl = await new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                });
                fetchedUrls.push(dataUrl);
            } catch (error) {
                console.error(`Failed to fetch image from ${url}:`, error);
            }
        }
        
        onImageUrlsChange([...imageUrls, ...fetchedUrls]);
        setUrlInput('');
        setIsFetchingUrls(false);
    };

    const handleRemoveImage = (indexToRemove: number) => {
        const updatedUrls = imageUrls.filter((_, index) => index !== indexToRemove);
        onImageUrlsChange(updatedUrls);
    };

    // Drag and Drop for Reordering
    const handleDragStart = (index: number) => {
        setDraggedIndex(index);
    };

    const handleDragEnter = (index: number) => {
        dragOverIndex.current = index;
    };

    const handleDragEnd = () => {
        if (draggedIndex === null || dragOverIndex.current === null || draggedIndex === dragOverIndex.current) {
            setDraggedIndex(null);
            dragOverIndex.current = null;
            return;
        }

        const items = [...imageUrls];
        const [reorderedItem] = items.splice(draggedIndex, 1);
        items.splice(dragOverIndex.current, 0, reorderedItem);
        
        onImageUrlsChange(items);
        setDraggedIndex(null);
        dragOverIndex.current = null;
    };

    // Drag and Drop for Uploading
    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDraggingOver(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDraggingOver(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDraggingOver(false);
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            processFiles(files);
            e.dataTransfer.clearData();
        }
    };

    return (
        <div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`space-y-4 p-2 rounded-lg transition-colors border-2 ${isDraggingOver ? 'border-accent bg-accent/20 border-solid' : 'border-transparent'}`}
        >
            <div className="w-full aspect-video rounded-btn bg-tertiary/20 border-2 border-dashed border-secondary flex items-center justify-center overflow-hidden">
                {imageUrls.length > 0 ? (
                    <img src={imageUrls[0]} alt="Main vehicle" className="w-full h-full object-cover"/>
                ) : (
                    <p className="text-sm text-secondary">Main Photo Preview</p>
                )}
            </div>

            {imageUrls.length > 0 && (
                <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2 p-2 bg-tertiary/20 rounded-lg">
                    {imageUrls.map((url, index) => (
                        <div 
                            key={index} 
                            className={`relative aspect-square group shadow-md rounded-lg overflow-hidden cursor-grab transition-opacity ${draggedIndex === index ? 'opacity-30' : 'opacity-100'}`}
                            draggable
                            onDragStart={() => handleDragStart(index)}
                            onDragEnter={() => handleDragEnter(index)}
                            onDragEnd={handleDragEnd}
                            onDragOver={(e) => e.preventDefault()}
                        >
                            <img src={url} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-white text-2xl font-bold">{index + 1}</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-0.5 right-0.5 bg-red-600/80 text-white rounded-full w-4 h-4 p-0.5 flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
                                aria-label="Remove image"
                            >
                                <div className="w-full h-full">{ICONS.trash}</div>
                            </button>
                        </div>
                    ))}
                </div>
            )}
             <p className="text-xs text-secondary text-center">Drag and drop thumbnails to re-order. The first image is the main photo.</p>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                     <label htmlFor="photos-upload" className="block text-sm font-semibold text-primary mb-2">Upload from Computer</label>
                     <input 
                        id="photos-upload" 
                        type="file" 
                        multiple 
                        onChange={handleFileSelect} 
                        accept="image/*,.zip" 
                        className="w-full text-sm text-secondary file:mr-2 file:py-1.5 file:px-3 file:rounded-btn file:border-0 file:text-sm file:font-semibold file:bg-accent/20 file:text-accent hover:file:bg-accent/30 cursor-pointer" 
                    />
                     <p className="text-xs text-secondary mt-1">You can select multiple images or a single .zip file.</p>
                </div>

                <div>
                    <label htmlFor="url-upload" className="block text-sm font-semibold text-primary mb-2">Upload from URLs</label>
                    <div className="flex gap-2">
                        <textarea
                            id="url-upload"
                            rows={2}
                            value={urlInput}
                            onChange={(e) => setUrlInput(e.target.value)}
                            placeholder="Paste one image URL per line..."
                            className="flex-grow w-full text-sm px-2 py-1.5 border border-secondary rounded-btn bg-tertiary/50 text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                        <button 
                            type="button" 
                            onClick={handleFetchUrls} 
                            disabled={isFetchingUrls}
                            className="btn-primary text-sm px-4 self-stretch"
                        >
                            {isFetchingUrls ? '...' : 'Fetch'}
                        </button>
                    </div>
                    <p className="text-xs text-secondary mt-1">Note: URL fetching may be blocked by some websites due to CORS policy.</p>
                </div>
            </div>
        </div>
    );
};
