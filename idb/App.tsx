
import React, { useState, useCallback } from 'react';
import { SCENARIOS } from './constants';
import { Scenario } from './types';
import { HandshakeIcon, ChartBarIcon, RocketLaunchIcon, CheckCircleIcon } from './components/Icons';
import { InfoCard } from './components/InfoCard';

const Header = () => (
  <header className="text-center py-12 bg-white shadow-sm">
    <div className="container mx-auto px-4">
      <img src="/logoslabirintar/Labirintar_RGB.png" alt="LABirintar Logo" className="w-auto h-24 mx-auto mb-6" />
      <h1 className="text-4xl md:text-5xl font-bold text-brand-primary mb-2">
        Proposta de Parceria Estratégica
      </h1>
      <p className="text-2xl font-semibold text-neutral-800">
        + Instituto IDB
      </p>
      <p className="mt-4 text-lg text-neutral-600 max-w-3xl mx-auto">
        Construindo o futuro da Educação Integral através da sinergia entre curadoria pedagógica e inteligência de dados.
      </p>
    </div>
  </header>
);

const Introduction = () => (
  <section className="py-16">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center text-neutral-800 mb-12">Uma Sinergia Visionária</h2>
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <InfoCard title="LABirintar" icon={<RocketLaunchIcon className="w-6 h-6 text-brand-primary" />}>
          <p>
            Plataforma de gestão e curadoria para o contraturno escolar. Em fase de <strong>Validação de Cliente</strong>, busca escalar seu modelo de negócio e validar seu Product-Market Fit (PMF) com agilidade, capitalizada por investimento anjo.
          </p>
        </InfoCard>
        <InfoCard title="Instituto IDB" icon={<ChartBarIcon className="w-6 h-6 text-brand-primary" />}>
          <p>
            Especialista em inteligência preditiva e análise de dados para o setor educacional. Em fase de <strong>Descoberta de Cliente</strong>, busca ser o "back-end" de dados para EdTechs, validando suas soluções em cenários reais.
          </p>
        </InfoCard>
      </div>
    </div>
  </section>
);

const ScenarioContent: React.FC<{ scenario: Scenario }> = ({ scenario }) => (
  <div className="bg-white rounded-lg shadow-lg p-8 mt-6 border border-gray-200 animate-fade-in">
    <h3 className="text-2xl font-bold text-neutral-800 mb-2">{scenario.subtitle}</h3>
    <p className="text-neutral-600 mb-8">{scenario.description}</p>

    <div className="grid md:grid-cols-2 gap-8 mb-8">
      <div>
        <h4 className="text-lg font-semibold text-neutral-800 mb-3">Benefícios para LABirintar</h4>
        <ul className="space-y-2">
          {scenario.benefits.labirintar.map((benefit, index) => (
            <li key={index} className="flex items-start">
              <CheckCircleIcon className="w-5 h-5 text-brand-secondary mr-3 mt-1 flex-shrink-0" />
              <span className="text-neutral-600">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-lg font-semibold text-neutral-800 mb-3">Benefícios para IDB</h4>
        <ul className="space-y-2">
          {scenario.benefits.idb.map((benefit, index) => (
            <li key={index} className="flex items-start">
              <CheckCircleIcon className="w-5 h-5 text-brand-secondary mr-3 mt-1 flex-shrink-0" />
              <span className="text-neutral-600">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
    
    <div>
        <h4 className="text-lg font-semibold text-neutral-800 mb-3">Modelo de Colaboração</h4>
        <div className="bg-neutral-100 p-4 rounded-lg border border-gray-200">
            <p className="text-neutral-600 mb-3"><strong className="text-neutral-700">Remuneração:</strong> {scenario.remuneration}</p>
            {scenario.equity && <p className="text-neutral-600"><strong className="text-neutral-700">Equity:</strong> {scenario.equity}</p>}
        </div>
    </div>
  </div>
);

const Scenarios = () => {
  const [activeScenario, setActiveScenario] = useState<number>(1);

  const handleSetScenario = useCallback((id: number) => {
    setActiveScenario(id);
  }, []);

  const currentScenario = SCENARIOS.find(s => s.id === activeScenario);

  return (
    <section className="py-16 bg-brand-light">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-neutral-800 mb-2">Cenários de Parceria Evolutiva</h2>
        <p className="text-center text-neutral-600 mb-12 max-w-2xl mx-auto">
          Propomos uma jornada de colaboração crescente, permitindo que a parceria se aprofunde de forma orgânica e estratégica.
        </p>

        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6">
          {SCENARIOS.map(scenario => (
            <button
              key={scenario.id}
              onClick={() => handleSetScenario(scenario.id)}
              className={`px-4 py-2 text-sm md:text-base font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-secondary ${
                activeScenario === scenario.id
                  ? 'bg-brand-primary text-white shadow-md'
                  : 'bg-white text-neutral-600 hover:bg-white hover:text-brand-primary hover:shadow-md'
              }`}
              aria-pressed={activeScenario === scenario.id}
            >
              {scenario.title}
            </button>
          ))}
        </div>
        
        {currentScenario && <ScenarioContent scenario={currentScenario} />}
      </div>
    </section>
  );
};


const StrategicAnalysis = () => (
    <section className="py-16">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-neutral-800 mb-12">Análise Estratégica e Atratividade para Investidores</h2>
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                <div className="space-y-6">
                    <div className="flex items-start">
                        <HandshakeIcon className="w-8 h-8 text-brand-primary mr-4 mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="text-xl font-bold text-neutral-800">Proposta de Valor Combinada</h4>
                            <p className="text-neutral-600 mt-1">A união cria uma EdTech única que oferece desde a curadoria pedagógica até a inteligência preditiva do impacto dessas atividades, uma solução de ponta a ponta com forte diferenciação competitiva.</p>
                        </div>
                    </div>
                     <div className="flex items-start">
                        <RocketLaunchIcon className="w-8 h-8 text-brand-primary mr-4 mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="text-xl font-bold text-neutral-800">Validação e Potencial de Exit</h4>
                            <p className="text-neutral-600 mt-1">A parceria reforça a validação de mercado de ambas as empresas. A capacidade de gerar e analisar dados sobre desempenho, retenção e inadimplência agrega valor mensurável, aprimorando o potencial para um futuro exit (M&A) com grandes grupos educacionais.</p>
                        </div>
                    </div>
                     <div className="flex items-start">
                        <ChartBarIcon className="w-8 h-8 text-brand-primary mr-4 mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="text-xl font-bold text-neutral-800">Governança e Alinhamento</h4>
                            <p className="text-neutral-600 mt-1">A participação mútua de equity, mesmo que minoritária nos estágios iniciais, alinha os interesses para o longo prazo e demonstra um compromisso estratégico que vai além de uma simples relação cliente-fornecedor, o que é altamente valorizado por investidores.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);


const Footer = () => (
  <footer className="text-center py-6 bg-neutral-800 text-neutral-100">
    <p>&copy; {new Date().getFullYear()} LABirintar & Instituto IDB. Todos os direitos reservados.</p>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-100">
      <Header />
      <main>
        <Introduction />
        <Scenarios />
        <StrategicAnalysis />
      </main>
      <Footer />
    </div>
  );
}
