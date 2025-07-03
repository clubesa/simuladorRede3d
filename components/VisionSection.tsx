import React from 'react';
import { useFadeIn } from '../hooks/useFadeIn';

const visionCards = [
    {
        title: 'Plataforma Inteligente',
        text: 'Conectamos escolas, educadores e famílias por meio de uma plataforma viva, sensível e inteligente que simplifica toda a gestão do contraturno.',
    },
    {
        title: 'Geração de Receita',
        text: 'Otimizamos o uso de espaços ociosos da sua escola, transformando-os em ambientes de aprendizagem que geram nova receita e impulsionam matrículas no currículo regular.',
    },
    {
        title: 'Desenvolvimento integral',
        text: 'Vamos além da recreação: nossas experiências são fundamentadas em ciência, dados e escuta sensível, promovendo o desenvolvimento integral das crianças com ênfase em competências socioemocionais, relações significativas e aprendizagem.',
    },
    {
        title: 'Ecossistema Colaborativo',
        text: 'Oferecemos um convite para caminhar conosco, em uma rede de apoio contínuo e escuta ativa que fortalece vínculos e amplia o impacto da educação integral.',
    },
];

const VisionSection: React.FC = () => {
    const [sectionRef, isVisible] = useFadeIn<HTMLElement>();
    
    const getFadeInClass = (isVisible: boolean) => 
        `transition-opacity duration-1000 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`;

    return (
        <section ref={sectionRef} className={`py-24 px-4 sm:px-8 ${getFadeInClass(isVisible)}`}>
            <div className="container mx-auto max-w-5xl">
                <h2 className="font-lora text-center text-[clamp(2.2rem,5vw,3.2rem)] leading-tight mb-4">A escola em tempo integral precisa mais do que tempo: ela precisa de experiência com sentido.</h2>
                <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-16">A LABirintar é o ecossistema que torna isso possível.</p>
                
                <div className="flex overflow-x-auto space-x-8 pb-8 scrollbar-thin scrollbar-thumb-accent-blue scrollbar-track-transparent snap-x snap-mandatory">
                    {visionCards.map((card, index) => (
                        <div key={index} className="flex-shrink-0 w-80 bg-white rounded-2xl p-8 shadow-md border-t-4 border-primary snap-start">
                            <h4 className="font-lora text-xl text-primary mb-4">{card.title}</h4>
                            <p className="text-base leading-relaxed text-gray-700">{card.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VisionSection;