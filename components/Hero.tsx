
import React from 'react';
import { useFadeIn } from '../hooks/useFadeIn';

const Hero: React.FC = () => {
    const [logoRef, isLogoVisible] = useFadeIn<HTMLImageElement>();
    const [titleRef, isTitleVisible] = useFadeIn<HTMLHeadingElement>();
    const [subtitleRef, isSubtitleVisible] = useFadeIn<HTMLParagraphElement>();
    
    const getFadeInClass = (isVisible: boolean) => 
        `transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`;

    return (
        <header className="relative h-screen flex flex-col items-center justify-center text-center p-4 bg-gradient-to-br from-accent-blue to-accent-lavender overflow-hidden">
            <img 
                ref={logoRef}
                src="https://clubesa.github.io/simuladorRede3d/logoslabirintar/Labirintar_RGB.png" 
                alt="Logo LABirintar" 
                className={`w-[350px] max-w-[80%] mb-8 drop-shadow-md ${getFadeInClass(isLogoVisible)}`}
                style={{ transitionDelay: '100ms' }}
            />
            <h1 
                ref={titleRef}
                className={`font-lora text-white text-shadow text-[clamp(2.8rem,6vw,4.5rem)] leading-tight shadow-black/20 ${getFadeInClass(isTitleVisible)}`}
                style={{ transitionDelay: '300ms' }}
            >
                Educar é ocupar o tempo com sentido.
            </h1>
            <p 
                ref={subtitleRef}
                className={`text-xl text-white font-light tracking-wider mt-4 text-shadow shadow-black/15 ${getFadeInClass(isSubtitleVisible)}`}
                style={{ transitionDelay: '500ms' }}
            >
                E sentido se constrói em rede.
            </p>
        </header>
    );
};

export default Hero;
