import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface PortfolioItem {
    title: string;
    folder: string;
    images: string[];
    tooltip: string | null;
}

interface PortfolioCardProps {
    item: PortfolioItem;
    onImageClick: (imageUrl: string, element: HTMLImageElement) => void;
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({ item, onImageClick }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const basePath = 'https://clubesa.github.io/simuladorRede3d/diagnostico/';

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prevIndex) => (prevIndex + 1) % item.images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prevIndex) => (prevIndex - 1 + item.images.length) % item.images.length);
    };

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.onerror = null; 
        e.currentTarget.src = 'https://picsum.photos/400/300?grayscale';
    };

    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden group h-full">
            <div className="relative w-full h-52 overflow-hidden bg-gray-100">
                <div 
                    className="flex h-full transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {item.images.map((imgFile, index) => {
                        const fullUrl = `${basePath}${item.folder}/${imgFile}`;
                        return (
                            <img 
                                key={index}
                                src={fullUrl} 
                                alt={`${item.title} - Imagem ${index + 1}`} 
                                className="w-full h-full object-contain flex-shrink-0 cursor-pointer"
                                onError={handleImageError}
                                onClick={(e) => onImageClick(fullUrl, e.currentTarget)}
                            />
                        );
                    })}
                </div>

                {item.images.length > 1 && (
                    <>
                        <button 
                            type="button"
                            onClick={prevImage}
                            className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/70 rounded-full p-2 text-text-main hover:bg-white transition-opacity opacity-0 group-hover:opacity-100"
                            aria-label="Imagem anterior"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            type="button"
                            onClick={nextImage} 
                            className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/70 rounded-full p-2 text-text-main hover:bg-white transition-opacity opacity-0 group-hover:opacity-100"
                            aria-label="Próxima imagem"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </>
                )}

                {item.tooltip && (
                     <div className="absolute bottom-0 left-0 w-full bg-black/50 overflow-hidden">
                        <div className="flex whitespace-nowrap animate-marquee">
                            <span className="text-xs text-white p-1 mx-4">{item.tooltip}</span>
                            <span className="text-xs text-white p-1 mx-4" aria-hidden="true">{item.tooltip}</span>
                        </div>
                    </div>
                )}
            </div>
            <div className="p-4">
                <div className="flex justify-between items-center gap-2">
                    <h4 className="font-lora text-xl font-semibold">{item.title}</h4>
                    <input 
                        type="checkbox" 
                        name="modalidades_selecionadas" 
                        value={item.title}
                        className="w-5 h-5 accent-primary cursor-pointer"
                    />
                </div>
            </div>
        </div>
    );
};