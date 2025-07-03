
import React from 'react';
import { useFadeIn } from '../hooks/useFadeIn';

const PartnershipCard = ({ title, description, border, details, note, activityDuration }: any) => (
    <div className={`bg-white p-8 sm:p-10 rounded-2xl shadow-md border-t-4 ${border} transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg`}>
        <h4 className="font-lora text-3xl mb-4">{title}</h4>
        <p className="text-lg text-gray-600 mb-4" dangerouslySetInnerHTML={{ __html: description }}></p>
        <p className="font-bold text-primary mb-6">{activityDuration}</p>
        <div className="text-lg font-medium my-6 pl-4 border-l-2 border-gray-200 space-y-2">
            {details.map((line: any, index: number) => (
                <p key={index} dangerouslySetInnerHTML={{ __html: line }}></p>
            ))}
        </div>
        <p className="text-gray-500 italic">{note}</p>
    </div>
);

const PartnershipSection: React.FC = () => {
    const [sectionRef, isVisible] = useFadeIn<HTMLElement>();

    const getFadeInClass = (isVisible: boolean) => 
        `transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`;
    
    return (
        <section ref={sectionRef} className={`container mx-auto max-w-5xl py-24 px-4 sm:px-8 ${getFadeInClass(isVisible)}`}>
            <h2 className="font-lora text-center text-[clamp(2.2rem,5vw,3.2rem)] leading-tight mb-4">Modelos de Parceria Flexíveis</h2>
            <p className="text-center text-lg text-gray-600 max-w-2xl mx-auto mb-16">Temos o modelo ideal para o momento e a estratégia da sua escola.</p>

            <div className="grid lg:grid-cols-2 gap-12">
                <PartnershipCard 
                    title="Modelo 1: Split de Receita"
                    description="Perfeito para escolas que desejam <strong>inovar sem investimento inicial</strong>."
                    border="border-primary"
                    activityDuration="2 horas de atividade/dia"
                    details={[
                        '<span class="font-bold">50%</span> LABirintar',
                        '<span>35%</span> Educador',
                        '<strong class="font-bold"><span>15%</span> Escola</strong>',
                    ]}
                    note="A escola oferece o espaço e a LABirintar cuida de toda a operação."
                />
                <PartnershipCard 
                    title="Modelo 2: Assinatura Mensal"
                    description="Para escolas que buscam ser <strong>protagonistas e maximizar o retorno</strong>."
                    border="border-secondary"
                    activityDuration="2 horas de atividade/dia"
                    details={[
                        '<strong class="font-bold"><span>50%</span> Escola</strong>',
                        '<span>35%</span> Educador',
                        '<span>15%</span> LABirintar',
                    ]}
                    note="A escola se torna o motor comercial e fica com a maior parte da receita. O custo fixo da assinatura corresponde ao valor médio da mensalidade do curricular."
                />
            </div>
        </section>
    );
};

export default PartnershipSection;
