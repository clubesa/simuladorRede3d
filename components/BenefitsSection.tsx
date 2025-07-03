
import React from 'react';
import { useFadeIn } from '../hooks/useFadeIn';

const benefits = [
    { id: 'b1', value: 'Novas receitas', label: 'Novas receitas recorrentes' },
    { id: 'b2', value: 'Ocupação de espaços', label: 'Ocupação inteligente de espaços' },
    { id: 'b3', value: 'Aumento de matrículas', label: 'Aumento de matrículas e retenção' },
    { id: 'b4', value: 'Educação Integral', label: 'Alinhamento com a Educação Integral' },
    { id: 'b5', value: 'Simplificação da gestão', label: 'Simplificação da gestão do contraturno' },
    { id: 'b6', value: 'Reputação de inovação', label: 'Fortalecimento da reputação de inovação' },
    { id: 'b7', value: 'Engajamento das famílias', label: 'Engajamento das famílias' },
];

const BenefitsSection: React.FC = () => {
    const [sectionRef, isVisible] = useFadeIn<HTMLElement>();
    
    const getFadeInClass = (isVisible: boolean) => 
        `transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`;
    
    return (
        <section ref={sectionRef} className={`container mx-auto max-w-5xl py-24 px-4 sm:px-8 ${getFadeInClass(isVisible)}`}>
            <h2 className="font-lora text-center text-[clamp(2.2rem,5vw,3.2rem)] leading-tight mb-4">Quais destes benefícios mais importam para sua escola?</h2>
            <p className="text-center text-lg text-gray-600 max-w-2xl mx-auto mb-12">Selecione as opções que representam maior valor para sua instituição.</p>

            <div className="flex flex-wrap justify-center gap-4">
                {benefits.map(benefit => (
                    <div key={benefit.id} className="benefit-tag">
                        <input type="checkbox" id={benefit.id} name="beneficios" value={benefit.value} className="peer hidden" />
                        <label 
                            htmlFor={benefit.id} 
                            className="flex items-center justify-center min-w-[180px] h-14 bg-accent-blue text-text-main px-6 py-3 rounded-full font-semibold transition-all duration-300 cursor-pointer text-center hover:bg-opacity-80 peer-checked:bg-secondary peer-checked:text-white peer-checked:scale-105 peer-checked:shadow-lg"
                        >
                            {benefit.label}
                        </label>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BenefitsSection;
