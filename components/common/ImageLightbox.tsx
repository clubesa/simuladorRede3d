import React, { useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';

interface ImageLightboxProps {
    imageUrl: string;
    originRect: DOMRect; // The position of the original thumbnail
    onClose: () => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({ imageUrl, originRect, onClose }) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = useCallback(() => {
        setIsClosing(true);
        const timer = setTimeout(() => {
            onClose();
        }, 300); // This duration must match the CSS transition duration
        return () => clearTimeout(timer);
    }, [onClose]);

    // Effect to handle keyboard escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') handleClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleClose]);

    // Effect to trigger the opening animation
    useEffect(() => {
        const timer = setTimeout(() => setIsAnimating(true), 10);
        return () => clearTimeout(timer);
    }, []);

    // Calculate initial and final styles for the animation
    const style: React.CSSProperties = {
        position: 'fixed',
        transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        // Initial state: matches the thumbnail
        top: `${originRect.top}px`,
        left: `${originRect.left}px`,
        width: `${originRect.width}px`,
        height: `${originRect.height}px`,
    };

    // Final state: centered and larger
    if (isAnimating && !isClosing) {
        style.top = '50%';
        style.left = '50%';
        style.width = 'auto'; // Let aspect ratio work
        style.height = 'auto';
        style.maxWidth = '90vw';
        style.maxHeight = '90vh';
        style.transform = 'translate(-50%, -50%)';
        style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
        style.borderRadius = '0.75rem'; // 12px
    }

    return (
        // The backdrop: fades in and handles closing clicks
        <div
            className={`fixed inset-0 z-50 transition-colors duration-300 ease-in-out ${isAnimating && !isClosing ? 'bg-black/70 backdrop-blur-sm' : 'bg-transparent'}`}
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
        >
            <img
                src={imageUrl}
                alt="Imagem ampliada"
                style={style}
                // Stop propagation so clicking the image doesn't close the lightbox
                onClick={(e) => e.stopPropagation()}
            />
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    handleClose();
                }}
                className={`fixed top-4 right-4 bg-white text-text-main rounded-full p-2 shadow-lg transition-all duration-300 ease-in-out hover:scale-110 ${isAnimating && !isClosing ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
                aria-label="Fechar"
            >
                <X size={24} />
            </button>
        </div>
    );
};
