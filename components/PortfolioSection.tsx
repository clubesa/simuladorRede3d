import React, { useState, useCallback, useEffect } from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { PortfolioCard, PortfolioItem } from './common/PortfolioCard';
import { ImageLightbox } from './common/ImageLightbox';

const portfolioData: PortfolioItem[] = [
    { title: 'Marcenaria', folder: 'marcenaria', images: ['IMG_1954.jpeg', 'IMG_1809.jpeg', 'IMG_1810.jpeg', 'IMG_1835.jpeg'], tooltip: null },
    { title: 'Circo', folder: 'circo', images: ['IMG_1953.jpeg', 'IMG_1813.jpeg', 'IMG_1839.jpeg', 'IMG_1840.jpeg'], tooltip: null },
    { title: 'Fazeres Manuais', folder: 'fazeresmanuais', images: ['IMG_1956.jpeg', '82d08da1-ed2c-4bfd-908a-4b6e75999604.jpeg', 'IMG_1822.jpeg', 'IMG_1846.jpeg'], tooltip: 'Horta, Panificação, Cozinha Experimental' },
    { title: 'Tecnologia', folder: 'tecnologia', images: ['IMG_1952.jpeg', 'IMG_1807.jpeg', 'IMG_1808.jpeg', 'IMG_1894.jpeg'], tooltip: 'Programação de Jogos, Robótica, Criação de Jogos de Tabuleiro e RPG' },
    { title: 'CidadeVamos', folder: 'cidadevamos', images: ['IMG_1947.jpeg', 'IMG_1948.jpeg', 'IMG_1943.jpeg', 'IMG_1946.jpeg', 'IMG_1912.jpeg', 'IMG_1913.jpeg', 'IMG_1914.jpeg'], tooltip: null },
    { title: 'Infância Sem Excesso', folder: 'infanciasemexcesso', images: ['IMG_1943.jpeg', 'IMG_1944.jpeg', 'IMG_1946.jpeg', 'IMG_1930.jpeg', 'IMG_1931.jpeg', 'IMG_1932.jpeg', 'IMG_1933.jpeg', 'IMG_1934.jpeg', 'IMG_1937.jpeg', 'IMG_1938.jpeg', 'IMG_1939.jpeg', 'IMG_1940.jpeg', 'IMG_1941.jpeg', 'IMG_1942.jpeg', 'IMG_1936.jpeg', 'IMG_1945.jpeg', 'IMG_1927.jpeg', 'IMG_1935.jpeg', 'IMG_1928.jpeg', 'IMG_1929.jpeg'], tooltip: null },
    { title: 'Prática Esportiva', folder: 'praticaesportiva', images: ['IMG_1955.jpeg', 'IMG_1907.jpeg', 'IMG_1908.jpeg', 'IMG_1909.jpeg'], tooltip: null },
    { title: 'Brincar Livre', folder: 'brincarlivre', images: ['IMG_1958.jpeg', 'IMG_1811.jpeg', 'IMG_1829.jpeg', 'IMG_1830.jpeg', 'IMG_1831.jpeg', 'IMG_1832.jpeg'], tooltip: null },
    { title: 'Mindfulness', folder: 'mindfulness', images: ['IMG_1957.jpeg', 'IMG_1854.jpeg', 'IMG_1855.jpeg'], tooltip: null },
    { title: 'Ateliês', folder: 'atelie', images: ['IMG_1820.jpeg', 'IMG_1825.jpeg', 'IMG_1826.jpeg'], tooltip: 'Clube de Leitura, CrioLivros, Artes Visuais, Artes Cênicas, Improvisação, Dança e Música' },
];

interface LightboxState {
    imageUrl: string;
    originElement: HTMLElement;
}

const PortfolioSection: React.FC = () => {
    const [sectionRef, isVisible] = useFadeIn<HTMLElement>();
    const [copyButtonText, setCopyButtonText] = useState('Copiar Link do Diagnóstico');
    const [lightboxState, setLightboxState] = useState<LightboxState | null>(null);

    const getFadeInClass = (isVisible: boolean) => 
        `transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`;

    const handleCopyLink = useCallback(() => {
        const link = 'https://clubesa.github.io/simuladorRede3d/diagnostico/formulario.html';
        navigator.clipboard.writeText(link).then(() => {
            setCopyButtonText('Link Copiado!');
            setTimeout(() => setCopyButtonText('Copiar Link do Diagnóstico'), 2000);
        }).catch(err => console.error('Failed to copy link: ', err));
    }, []);

    const handleOpenLightbox = useCallback((imageUrl: string, element: HTMLElement) => {
        element.style.visibility = 'hidden';
        setLightboxState({ imageUrl, originElement: element });
    }, []);

    const handleCloseLightbox = useCallback(() => {
        if (lightboxState) {
            lightboxState.originElement.style.visibility = 'visible';
        }
        setLightboxState(null);
    }, [lightboxState]);

    useEffect(() => {
        if (lightboxState) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [lightboxState]);

    return (
        <section ref={sectionRef} className={`container mx-auto max-w-5xl py-24 px-4 sm:px-8 ${getFadeInClass(isVisible)}`}>
            <h2 className="font-lora text-center text-[clamp(2.2rem,5vw,3.2rem)] leading-tight mb-12">Portfólio de Experiências</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex items-center justify-center text-center bg-light-bg rounded-2xl p-6">
                    <p className="text-lg font-semibold text-gray-700">
                        Selecione as experiências que melhor compõem com o projeto pedagógico da sua escola.
                    </p>
                </div>
                {portfolioData.map((item) => (
                   <PortfolioCard 
                        key={item.title} 
                        item={item}
                        onImageClick={handleOpenLightbox} 
                    />
                ))}
                <div className="flex items-center justify-center text-center bg-light-bg rounded-2xl p-6">
                    <p className="text-lg font-semibold text-gray-700">
                        Se não tem certeza de quais experiências escolher, criamos a ferramenta Diagnóstico para inventariar os interesses de alunos e famílias. Para isso, basta copiar o link no botão adiante e enviá-lo ao público da pesquisa.
                    </p>
                </div>
            </div>

            <div className="mt-24 bg-accent-blue p-8 sm:p-12 rounded-2xl grid md:grid-cols-2 gap-8 items-center">
                <div className="text-center md:text-left">
                    <h4 className="font-lora text-2xl mb-4">Não tem certeza de quais experiências escolher?</h4>
                    <p className="max-w-xl mx-auto md:mx-0 text-gray-700 mb-8">
                        Use nosso formulário de diagnóstico para pesquisar os interesses de alunos e famílias. Copie o link e compartilhe com sua equipe pedagógica.
                    </p>
                    <button 
                        type="button" 
                        onClick={handleCopyLink}
                        className="inline-block py-3 px-8 rounded-full text-white font-bold bg-primary hover:bg-opacity-90 transition-all transform hover:-translate-y-1 shadow-md hover:shadow-lg"
                    >
                        {copyButtonText}
                    </button>
                </div>
                <div className="w-full h-full min-h-[400px]">
                    <iframe 
                        src="https://clubesa.github.io/simuladorRede3d/diagnostico/formulario.html" 
                        title="Preview do Formulário de Diagnóstico"
                        className="w-full h-full border-4 border-white rounded-lg shadow-lg"
                    ></iframe>
                </div>
            </div>
             {lightboxState && (
                <ImageLightbox
                    imageUrl={lightboxState.imageUrl}
                    originRect={lightboxState.originElement.getBoundingClientRect()}
                    onClose={handleCloseLightbox}
                />
            )}
        </section>
    );
};

export default PortfolioSection;