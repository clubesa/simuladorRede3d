
import React from 'react';

export interface FlipCardProps {
    icon: React.ReactNode;
    frontTitle: string;
    backTitle: string;
    backText: string;
}

export const FlipCard: React.FC<FlipCardProps> = ({ icon, frontTitle, backTitle, backText }) => {
    return (
        <div className="group h-80 [perspective:1000px]">
            <div className="relative h-full w-full rounded-2xl shadow-md transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front */}
                <div className="absolute inset-0 bg-white rounded-2xl [backface-visibility:hidden] flex flex-col items-center justify-center text-center p-8">
                    <div className="mb-4">{icon}</div>
                    <h4 className="font-lora text-2xl text-text-main">{frontTitle}</h4>
                </div>
                {/* Back */}
                <div className="absolute inset-0 bg-accent-blue rounded-2xl [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col items-center justify-center text-center p-8">
                    <h4 className="font-lora text-xl mb-2 text-text-main">{backTitle}</h4>
                    <p className="text-base text-gray-800">{backText}</p>
                </div>
            </div>
        </div>
    );
};
