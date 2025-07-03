
import React, { useState } from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { Map } from 'lucide-react';

const challenges = [
    { id: 'diferenciar', text: 'Diferenciar-se sem onerar a operação' },
    { id: 'reter', text: 'Atrair e reter alunos com propostas significativas' },
    { id: 'espacos', text: 'Transformar espaços ociosos em ambientes vivos' },
];

const ProblemSection: React.FC = () => {
    const [sectionRef, isVisible] = useFadeIn<HTMLElement>();
    const [rankings, setRankings] = useState<Record<string, string>>({
        diferenciar: '',
        reter: '',
        espacos: '',
    });

    const handleRankingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setRankings(prev => ({
            ...prev,
            [name.replace('ranking_', '')]: value,
        }));
    };

    const selectedValues = Object.values(rankings).filter(v => v !== '');

    const getFadeInClass = (isVisible: boolean) => 
        `transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`;
    
    return (
        <section ref={sectionRef} className={`container mx-auto max-w-5xl py-24 px-4 sm:px-8 ${getFadeInClass(isVisible)}`}>
            <h2 className="font-lora text-center text-[clamp(2.2rem,5vw,3.2rem)] leading-tight mb-4">A Cartografia do Desafio</h2>

            <div className="grid lg:grid-cols-2 gap-12 items-start mt-12">
                <div>
                    <p className="text-gray-600 mb-8">Classifique os desafios abaixo em ordem de importância para sua instituição (1 = mais importante).</p>
                    <div className="space-y-4">
                        {challenges.map(challenge => (
                            <div key={challenge.id} className="flex justify-between items-center bg-light-bg p-4 rounded-xl">
                                <p className="font-medium text-text-main pr-4">{challenge.text}</p>
                                <select 
                                    name={`ranking_${challenge.id}`}
                                    value={rankings[challenge.id]}
                                    onChange={handleRankingChange}
                                    className="p-2 rounded-lg border-2 border-accent-blue font-bold cursor-pointer text-text-main bg-white" 
                                    required
                                >
                                    <option value="">Prioridade</option>
                                    {[1, 2, 3].map(num => (
                                        <option 
                                            key={num} 
                                            value={num}
                                            disabled={selectedValues.includes(String(num)) && rankings[challenge.id] !== String(num)}
                                        >
                                            {num}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-light-bg rounded-2xl p-8 text-center shadow-sm">
                    <Map className="w-20 h-20 text-secondary mx-auto mb-6" strokeWidth={1.5} />
                    <div className="text-left">
                        <label htmlFor="open-challenge" className="block font-semibold mb-2 text-text-main">Quais são os maiores desafios do seu contraturno hoje?</label>
                        <textarea 
                            id="open-challenge" 
                            name="desafio_aberto" 
                            placeholder="Descreva aqui..."
                            className="w-full min-h-[120px] p-4 rounded-xl border-2 border-accent-blue font-inter text-base resize-vertical focus:ring-2 focus:ring-primary focus:outline-none"
                        ></textarea>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProblemSection;
