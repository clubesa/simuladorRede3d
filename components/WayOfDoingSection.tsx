
import React from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { CheckCircle } from 'lucide-react';

const routineItems = [
    'Intencionalidade', 'Autonomia', 'Presença', 'Problematização/ Aproximação',
    'Ação/ Cooperação', 'Contemplação', 'Documentação'
];

const WayOfDoingSection: React.FC = () => {
    const [sectionRef, isVisible] = useFadeIn<HTMLElement>();

    const getFadeInClass = (isVisible: boolean) => 
        `transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`;
    
    return (
        <section ref={sectionRef} className={`container mx-auto max-w-5xl py-24 px-4 sm:px-8 ${getFadeInClass(isVisible)}`}>
            <h2 className="font-lora text-center text-[clamp(2.2rem,5vw,3.2rem)] leading-tight mb-12">Nosso jeito de fazer</h2>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm">
                    <h4 className="text-primary font-lora text-2xl mb-1">Aula como experiência</h4>
                    <p className="text-gray-500 italic mb-6">Por que eu quero viver isso?</p>
                    <h4 className="text-primary font-lora text-2xl mb-1">Aprendizado por Projeto</h4>
                    <p className="text-gray-500 italic">Onde eu quero chegar?</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm">
                    <h4 className="text-primary font-lora text-2xl mb-4">Rotina estruturante</h4>
                    <ul className="space-y-3">
                        {routineItems.map(item => (
                            <li key={item} className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-secondary" />
                                <span className="font-medium">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default WayOfDoingSection;
