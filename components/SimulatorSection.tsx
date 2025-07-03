
import React, { useState, useMemo } from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { BarChart2 } from 'lucide-react';

const ticketPrices: { [key: number]: number } = { 1: 298, 2: 447, 3: 759, 4: 948, 5: 948 };

const formatCurrency = (value: number) => {
    if (isNaN(value)) return 'R$ 0,00';
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const SimulatorSection: React.FC = () => {
    const [sectionRef, isVisible] = useFadeIn<HTMLDivElement>();
    const [totalAlunos, setTotalAlunos] = useState(500);
    const [metaConversao, setMetaConversao] = useState(10);
    const [frequenciaSemanal, setFrequenciaSemanal] = useState(2);
    const [mensalidadeCurricular, setMensalidadeCurricular] = useState(1500);

    const alunosExtra = useMemo(() => Math.round((totalAlunos * metaConversao) / 100), [totalAlunos, metaConversao]);
    const mensalidadeExtra = useMemo(() => ticketPrices[frequenciaSemanal], [frequenciaSemanal]);
    const percentualCurricular = useMemo(() => {
        if (!mensalidadeCurricular || mensalidadeCurricular <= 0) return '-';
        return `${((mensalidadeExtra / mensalidadeCurricular) * 100).toFixed(1)}%`;
    }, [mensalidadeExtra, mensalidadeCurricular]);
    
    const totalRevenue = useMemo(() => alunosExtra * mensalidadeExtra, [alunosExtra, mensalidadeExtra]);
    const gainModel1 = useMemo(() => totalRevenue * 0.15, [totalRevenue]);
    const costModel2 = useMemo(() => (mensalidadeCurricular > 0 ? mensalidadeCurricular : 2000), [mensalidadeCurricular]);
    const gainModel2 = useMemo(() => (totalRevenue * 0.50) - costModel2, [totalRevenue, costModel2]);

    const getFadeInClass = (isVisible: boolean) => 
        `transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`;
    
    return (
        <div ref={sectionRef} className={`container mx-auto max-w-5xl py-24 px-4 sm:px-8 ${getFadeInClass(isVisible)}`}>
            <div className="bg-light-bg p-6 sm:p-8 lg:p-12 rounded-2xl">
                <div className="mb-8">
                    <h3 className="font-lora text-3xl text-text-main flex items-center">
                        <BarChart2 className="w-8 h-8 mr-3 text-primary" />
                        Simule o seu Potencial de Ganho
                    </h3>
                </div>

                {/* --- INPUTS --- */}
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
                    {/* Total de Alunos */}
                    <div className="input-group">
                        <label htmlFor="totalAlunos" className="font-semibold mb-2 block">Total de alunos da escola</label>
                        <input type="number" id="totalAlunos" name="simulador_total_alunos" placeholder="Ex: 500" value={totalAlunos} onChange={e => setTotalAlunos(Number(e.target.value))} className="w-full p-3 border-2 border-accent-blue rounded-lg text-lg"/>
                    </div>

                    {/* Meta de Conversão */}
                    <div className="slider-group">
                        <div className="flex justify-between items-center mb-2">
                            <label htmlFor="metaConversao" className="font-semibold">Meta de conversão para o extra</label>
                            <span className="font-bold text-primary text-lg">{metaConversao}%</span>
                        </div>
                        <input type="range" id="metaConversao" name="simulador_meta_conversao" min="0" max="100" value={metaConversao} onChange={e => setMetaConversao(Number(e.target.value))} className="w-full h-2 bg-accent-blue rounded-lg appearance-none cursor-pointer thumb:bg-primary" />
                    </div>

                     {/* Alunos no Extra */}
                    <div className="input-group">
                        <label htmlFor="alunosExtra" className="font-semibold mb-2 block">Alunos no extracurricular (calculado)</label>
                        <input type="text" id="alunosExtra" name="simulador_alunos_extra" value={alunosExtra} readOnly className="w-full p-3 border-2 border-accent-blue rounded-lg text-lg bg-gray-200 cursor-not-allowed"/>
                    </div>

                    {/* Frequência Semanal */}
                    <div className="slider-group">
                        <div className="flex justify-between items-center mb-2">
                            <label htmlFor="frequenciaSemanal" className="font-semibold">Frequência semanal média</label>
                            <span className="font-bold text-primary text-lg">{frequenciaSemanal}x / semana</span>
                        </div>
                        <input type="range" id="frequenciaSemanal" name="simulador_frequencia_semanal" min="1" max="5" value={frequenciaSemanal} onChange={e => setFrequenciaSemanal(Number(e.target.value))} className="w-full h-2 bg-accent-blue rounded-lg appearance-none cursor-pointer" />
                    </div>

                     {/* Financial Comparison */}
                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-6 pt-6 mt-4 border-t border-accent-blue">
                        <div className="input-group">
                            <label htmlFor="mensalidadeCurricular" className="font-semibold mb-2 block">Mensalidade curricular (R$)</label>
                            <input type="number" id="mensalidadeCurricular" name="simulador_mensalidade_curricular" placeholder="Ex: 1500" value={mensalidadeCurricular} onChange={e => setMensalidadeCurricular(Number(e.target.value))} className="w-full p-3 border-2 border-accent-blue rounded-lg text-lg"/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="percentualCurricular" className="font-semibold mb-2 block">% sobre curricular</label>
                            <input type="text" id="percentualCurricular" value={percentualCurricular} readOnly className="w-full p-3 border-2 border-accent-blue rounded-lg text-lg bg-gray-200 cursor-not-allowed text-center font-bold text-primary"/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="mensalidadeExtra" className="font-semibold mb-2 block">Mensalidade do extra (sugestão R$)</label>
                            <input type="text" id="mensalidadeExtra" value={formatCurrency(mensalidadeExtra)} readOnly className="w-full p-3 border-2 border-accent-blue rounded-lg text-lg bg-gray-200 cursor-not-allowed"/>
                        </div>
                    </div>
                </div>

                {/* --- RESULTS --- */}
                {alunosExtra > 0 && (
                    <div id="results" className="mt-8 grid md:grid-cols-2 gap-6 text-left">
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h4 className="font-lora text-xl mb-2">Ganho com Modelo 1 (Split)</h4>
                            <p className="text-3xl font-bold text-primary">{formatCurrency(gainModel1)}</p>
                            <p className="text-sm text-gray-500 italic mt-1">15% da receita total de {formatCurrency(totalRevenue)}</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h4 className="font-lora text-xl mb-2">Ganho com Modelo 2 (Assinatura)</h4>
                            <p className="text-3xl font-bold text-primary">{formatCurrency(gainModel2)}</p>
                            <p className="text-sm text-gray-500 italic mt-1">50% ({formatCurrency(totalRevenue * 0.5)}) - Assinatura ({formatCurrency(costModel2)})</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SimulatorSection;
