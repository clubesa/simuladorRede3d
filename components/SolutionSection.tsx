
import React from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { FlipCard, FlipCardProps } from './common/FlipCard';
import { Cpu, Award, Heart, Share2 } from 'lucide-react';

const solutionCards: FlipCardProps[] = [
    {
        icon: <Cpu size={48} className="text-primary" />,
        frontTitle: 'Tecnologia',
        backTitle: 'Gestão Inteligente',
        backText: 'Plataforma digital que organiza, automatiza e simplifica todo o ciclo do contraturno escolar, da matrícula ao pagamento.'
    },
    {
        icon: <Award size={48} className="text-primary" />,
        frontTitle: 'Rede de Educadores Empreendedores',
        backTitle: 'Rede Qualificada',
        backText: 'Educadores autorais, engajados e em formação contínua, que oferecem experiências únicas e ampliam a rede com indicações qualificadas, contribuindo diretamente para o impacto e alcance da escola.'
    },
    {
        icon: <Heart size={48} className="text-primary" />,
        frontTitle: 'Curadoria Pedagógica',
        backTitle: 'Experiências Vivas',
        backText: 'Atividades integradas ao projeto educacional da escola, com base em escuta das infâncias e evidências pedagógicas. Vai além da ocupação do tempo: promove desenvolvimento integral, múltiplas linguagens e experiências com sentido.'
    },
    {
        icon: <Share2 size={48} className="text-primary" />,
        frontTitle: 'Comunidade Colaborativa',
        backTitle: 'Ecossistema Educacional',
        backText: 'Ecossistema vivo que conecta escolas, educadores e famílias. Compartilhamos ferramentas, afetos, suporte contínuo e escuta ativa para fortalecer vínculos, impulsionar matrículas e ampliar o impacto da educação integral.'
    }
];


const SolutionSection: React.FC = () => {
    const [sectionRef, isVisible] = useFadeIn<HTMLElement>();

    const getFadeInClass = (isVisible: boolean) => 
        `transition-opacity duration-1000 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`;

    return (
        <section ref={sectionRef} className={`bg-gradient-to-br from-accent-lavender to-white py-24 ${getFadeInClass(isVisible)}`}>
            <div className="container mx-auto max-w-5xl px-4 sm:px-8">
                <h2 className="font-lora text-center text-[clamp(2.2rem,5vw,3.2rem)] leading-tight mb-4">Nossa Solução: Um Ecossistema Integrado</h2>
                <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-16">Conectamos quatro pilares para criar uma experiência de contraturno única, viva e pulsante.</p>
                
                <div className="grid md:grid-cols-2 gap-8 [perspective:1000px]">
                    {solutionCards.map((card, index) => (
                        <FlipCard key={index} {...card} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SolutionSection;
