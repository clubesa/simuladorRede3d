import React, { useState, useCallback, useMemo, useEffect, useRef, RefObject } from 'react';
import ReactDOM from 'react-dom/client';
import { Map, Cpu, Award, Heart, Share2, CheckCircle, ChevronLeft, ChevronRight, BarChart2, X } from 'lucide-react';

// --- Type/Interface Definitions (from all files) ---
interface FlipCardProps {
    icon: React.ReactNode;
    frontTitle: string;
    backTitle: string;
    backText: string;
}

interface ImageLightboxProps {
    images: string[];
    currentIndex: number;
    originRect: DOMRect;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
}

interface PortfolioItem {
    title: string;
    folder: string;
    images: string[];
    tooltip: string | null;
}

interface PortfolioCardProps {
    item: PortfolioItem;
    onImageClick: (item: PortfolioItem, imageIndex: number, element: HTMLImageElement) => void;
}

interface FooterProps {
    onOpenModal: () => void;
}

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface LightboxState {
    images: string[];
    currentIndex: number;
    originElement: HTMLElement;
}

// --- Hooks (from hooks/useFadeIn.ts) ---
const useFadeIn = <T extends HTMLElement,>(): [RefObject<T>, boolean] => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<T>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (ref.current) {
                        observer.unobserve(ref.current);
                    }
                }
            },
            {
                threshold: 0.1,
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return [ref, isVisible];
};


// --- Common Components (from components/common/*) ---

const FlipCard: React.FC<FlipCardProps> = ({ icon, frontTitle, backTitle, backText }) => {
    return (
        <div className="group h-80 [perspective:1000px]">
            <div className="relative h-full w-full rounded-2xl shadow-md transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front */}
                <div className="absolute inset-0 bg-white rounded-2xl [backface-visibility:hidden] flex flex-col items-center justify-center text-center p-8">
                    <div className="mb-4">{icon}</div>
                    <h4 className="font-lora text-2xl text-text-main">{frontTitle}</h4>
                </div>
                {/* Back */}
                <div className="absolute inset-0 bg-accent-blue rounded-2xl [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col items-center justify-center text-center p-8">
                    <h4 className="font-lora text-xl mb-2 text-text-main">{backTitle}</h4>
                    <p className="text-base text-gray-800">{backText}</p>
                </div>
            </div>
        </div>
    );
};

const ImageLightbox: React.FC<ImageLightboxProps> = ({ images, currentIndex, originRect, onClose, onNext, onPrev }) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const imageUrl = images[currentIndex];

    const handleClose = useCallback(() => {
        setIsClosing(true);
        const timer = setTimeout(() => {
            onClose();
        }, 300); // This duration must match the CSS transition duration
        return () => clearTimeout(timer);
    }, [onClose]);

    // Effect to handle keyboard keys
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') handleClose();
            if (images.length > 1) {
                if (e.key === 'ArrowRight') onNext();
                if (e.key === 'ArrowLeft') onPrev();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleClose, onNext, onPrev, images.length]);

    // Effect to trigger the opening animation
    useEffect(() => {
        const timer = setTimeout(() => setIsAnimating(true), 10);
        return () => clearTimeout(timer);
    }, []);

    // Calculate initial and final styles for the animation
    const style: React.CSSProperties = {
        position: 'fixed',
        transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 60, // Ensure image is above backdrop but below buttons
        // Initial state: matches the thumbnail
        top: `${originRect.top}px`,
        left: `${originRect.left}px`,
        width: `${originRect.width}px`,
        height: `${originRect.height}px`,
    };

    // Final state: centered and larger
    if (isAnimating && !isClosing) {
        style.top = '50%';
        style.left = '50%';
        style.width = 'auto'; // Let aspect ratio work
        style.height = 'auto';
        style.maxWidth = '90vw';
        style.maxHeight = '90vh';
        style.transform = 'translate(-50%, -50%)';
        style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
        style.borderRadius = '0.75rem'; // 12px
    }

    return (
        // The backdrop: fades in and handles closing clicks
        <div
            className={`fixed inset-0 z-50 transition-colors duration-300 ease-in-out ${isAnimating && !isClosing ? 'bg-black/70 backdrop-blur-sm' : 'bg-transparent'}`}
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
        >
             {/* The Image is rendered first, but its z-index keeps it behind the buttons */}
            <img
                src={imageUrl}
                alt="Imagem ampliada"
                style={style}
                // Stop propagation so clicking the image doesn't close the lightbox
                onClick={(e) => e.stopPropagation()}
            />
            {/* The controls are rendered after, and have a higher z-index via their fixed positioning context */}
             {images.length > 1 && (
                <>
                    <button
                        onClick={(e) => { e.stopPropagation(); onPrev(); }}
                        className={`fixed left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/70 text-text-main rounded-full p-2 sm:p-3 shadow-lg transition-all duration-300 ease-in-out hover:scale-110 hover:bg-white z-70 ${isAnimating && !isClosing ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
                        aria-label="Imagem Anterior"
                    >
                        <ChevronLeft size={28} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onNext(); }}
                        className={`fixed right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/70 text-text-main rounded-full p-2 sm:p-3 shadow-lg transition-all duration-300 ease-in-out hover:scale-110 hover:bg-white z-70 ${isAnimating && !isClosing ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
                        aria-label="Próxima Imagem"
                    >
                        <ChevronRight size={28} />
                    </button>
                </>
            )}
            {/* Close Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    handleClose();
                }}
                className={`fixed top-4 right-4 bg-white text-text-main rounded-full p-2 shadow-lg transition-all duration-300 ease-in-out hover:scale-110 z-70 ${isAnimating && !isClosing ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
                aria-label="Fechar"
            >
                <X size={24} />
            </button>
        </div>
    );
};

const PortfolioCard: React.FC<PortfolioCardProps> = ({ item, onImageClick }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const basePath = 'https://clubesa.github.io/simuladorRede3d/diagnostico/';

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prevIndex) => (prevIndex + 1) % item.images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prevIndex) => (prevIndex - 1 + item.images.length) % item.images.length);
    };

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.onerror = null; 
        e.currentTarget.src = 'https://picsum.photos/400/300?grayscale';
    };

    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden group h-full">
            <div className="relative w-full h-52 overflow-hidden bg-gray-100">
                <div 
                    className="flex h-full transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {item.images.map((imgFile, index) => {
                        const fullUrl = `${basePath}${item.folder}/${imgFile}`;
                        return (
                            <img 
                                key={index}
                                src={fullUrl} 
                                alt={`${item.title} - Imagem ${index + 1}`} 
                                className="w-full h-full object-contain flex-shrink-0 cursor-pointer"
                                onError={handleImageError}
                                onClick={(e) => onImageClick(item, index, e.currentTarget)}
                            />
                        );
                    })}
                </div>

                {item.images.length > 1 && (
                    <>
                        <button 
                            type="button"
                            onClick={prevImage}
                            className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/70 rounded-full p-2 text-text-main hover:bg-white transition-opacity opacity-0 group-hover:opacity-100"
                            aria-label="Imagem anterior"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            type="button"
                            onClick={nextImage} 
                            className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/70 rounded-full p-2 text-text-main hover:bg-white transition-opacity opacity-0 group-hover:opacity-100"
                            aria-label="Próxima imagem"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </>
                )}

                {item.tooltip && (
                     <div className="absolute bottom-0 left-0 w-full bg-black/50 overflow-hidden">
                        <div className="flex whitespace-nowrap animate-marquee">
                            <span className="text-xs text-white p-1 mx-4">{item.tooltip}</span>
                            <span className="text-xs text-white p-1 mx-4" aria-hidden="true">{item.tooltip}</span>
                        </div>
                    </div>
                )}
            </div>
            <div className="p-4">
                <div className="flex justify-between items-center gap-2">
                    <h4 className="font-lora text-xl font-semibold">{item.title}</h4>
                    <input 
                        type="checkbox" 
                        name="modalidades_selecionadas" 
                        value={item.title}
                        className="w-5 h-5 accent-primary cursor-pointer"
                    />
                </div>
            </div>
        </div>
    );
};


// --- Main Components (from components/*) ---

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

const portfolioData: PortfolioItem[] = [
    { title: 'Marcenaria', folder: 'marcenaria', images: ['IMG_1960.jpeg', 'IMG_1809.jpeg', 'IMG_1810.jpeg', 'IMG_1835.jpeg', 'IMG_1836.jpeg', 'IMG_1837.jpeg'], tooltip: null },
    { title: 'Circo', folder: 'circo', images: ['IMG_1953.jpeg', 'IMG_1813.jpeg', 'IMG_1839.jpeg', 'IMG_1840.jpeg', 'IMG_1841.jpeg', 'IMG_1842.jpeg', 'IMG_1843.jpeg', 'IMG_1844.jpeg', 'bc110c9c-a8e1-452a-94b7-5a0c6ce0d3b8.jpeg', 'e3b3b2a3-a15e-4e24-be2f-b529a24e3a60.jpeg', 'f80d9019-6851-4b2f-af19-5a8dd0edcaf7.jpeg'], tooltip: null },
    { title: 'Fazeres Manuais', folder: 'fazeresmanuais', images: ['82d08da1-ed2c-4bfd-908a-4b6e75999604.jpeg', 'IMG_1822.jpeg', 'IMG_1846.jpeg', 'IMG_1847.jpeg', 'IMG_1848.jpeg', 'IMG_1849.jpeg', 'IMG_1850.jpeg', 'IMG_1851.jpeg', 'IMG_1852.jpeg', 'IMG_1853.jpeg', 'IMG_1956.jpeg'], tooltip: 'Horta, Panificação, Cozinha Experimental' },
    { title: 'Tecnologia', folder: 'tecnologia', images: ['IMG_1952.jpeg', 'IMG_1807.jpeg', 'IMG_1808.jpeg', 'IMG_1894.jpeg', 'IMG_1895.jpeg', 'IMG_1896.jpeg', 'IMG_1897.jpeg', 'IMG_1898.jpeg', 'IMG_1899.jpeg', 'IMG_1900.jpeg', 'IMG_1901.jpeg', 'IMG_1902.jpeg', 'IMG_1903.jpeg', 'IMG_1904.jpeg', 'IMG_1905.jpeg', 'IMG_1906.jpeg'], tooltip: 'Programação de Jogos, Robótica, Criação de Jogos de Tabuleiro e RPG' },
    { title: 'CidadeVamos', folder: 'cidadevamos', images: ['IMG_1912.jpeg', 'IMG_1913.jpeg', 'IMG_1914.jpeg', 'IMG_1915.jpeg', 'IMG_1916.jpeg', 'IMG_1917.jpeg', 'IMG_1918.jpeg', 'IMG_1919.jpeg', 'IMG_1920.jpeg', 'IMG_1921.jpeg', 'IMG_1922.jpeg', 'IMG_1923.jpeg', 'IMG_1924.jpeg', 'IMG_1925.jpeg', 'IMG_1926.jpeg', 'IMG_1943.jpeg', 'IMG_1946.jpeg', 'IMG_1947.jpeg', 'IMG_1948.jpeg'], tooltip: null },
    { title: 'Infância Sem Excesso', folder: 'infanciasemexcesso', images: ['IMG_1927.jpeg', 'IMG_1928.jpeg', 'IMG_1929.jpeg', 'IMG_1930.jpeg', 'IMG_1931.jpeg', 'IMG_1932.jpeg', 'IMG_1933.jpeg', 'IMG_1934.jpeg', 'IMG_1935.jpeg', 'IMG_1936.jpeg', 'IMG_1937.jpeg', 'IMG_1938.jpeg', 'IMG_1939.jpeg', 'IMG_1940.jpeg', 'IMG_1941.jpeg', 'IMG_1942.jpeg', 'IMG_1943.jpeg', 'IMG_1944.jpeg', 'IMG_1945.jpeg', 'IMG_1946.jpeg'], tooltip: null },
    { title: 'Prática Esportiva', folder: 'praticaesportiva', images: ['IMG_1955.jpeg', 'IMG_1907.jpeg', 'IMG_1908.jpeg', 'IMG_1910.jpeg', 'IMG_1911.jpeg', 'IMG_1969.jpeg', 'IMG_1970.jpeg', 'IMG_1971.jpeg', 'IMG_1972.jpeg', 'IMG_1973.jpeg', 'IMG_1974.jpeg', 'IMG_1975.jpeg', 'IMG_1976.jpeg', 'IMG_1977.jpeg', 'IMG_1978.jpeg'], tooltip: null },
    { title: 'Brincar Livre', folder: 'brincarlivre', images: ['8c01a9ee-c495-41bd-926e-4ee64715ef30.jpeg', 'IMG_1801.jpeg', 'IMG_1804.jpeg', 'IMG_1811.jpeg', 'IMG_1830.jpeg', 'IMG_1831.jpeg', 'IMG_1832.jpeg', 'IMG_1979.jpeg', 'IMG_1980.jpeg', 'IMG_1981.jpeg', 'IMG_1982.jpeg', 'IMG_1983.jpeg', 'IMG_1984.jpeg', 'IMG_1985.jpeg', 'IMG_1986.jpeg', 'IMG_1987.jpeg', 'IMG_1988.jpeg'], tooltip: null },
    { title: 'Mindfulness', folder: 'mindfulness', images: ['IMG_1959.jpeg', 'IMG_1812.jpeg', 'IMG_1854.jpeg', 'IMG_1855.jpeg', 'IMG_1857.jpeg'], tooltip: null },
    { title: 'Ateliês', folder: 'atelie', images: ['8c01a9ee-c495-41bd-926e-4ee64715ef30.jpeg', 'IMG_1820.jpeg', 'IMG_1861.jpeg', 'IMG_1862.jpeg', 'IMG_1863.jpeg', 'IMG_1865.jpeg', 'IMG_1866.jpeg', 'IMG_1867.jpeg', 'IMG_1868.jpeg', 'IMG_1869.jpeg', 'IMG_1870.jpeg', 'IMG_1871.jpeg', 'IMG_1872.jpeg', 'IMG_1873.jpeg', 'IMG_1874.jpeg', 'IMG_1875.jpeg', 'IMG_1881.jpeg', 'IMG_1883.jpeg', 'IMG_1884.jpeg', 'IMG_1885.jpeg', 'IMG_1886.jpeg', 'IMG_1887.jpeg', 'IMG_1888.jpeg', 'IMG_1890.jpeg', 'IMG_1891.jpeg', 'IMG_1962.jpeg', 'IMG_1963.jpeg', 'IMG_1964.jpeg', 'IMG_1965.jpeg', 'IMG_1966.jpeg', 'IMG_3195.jpeg', 'fa97fcb7-9657-435d-8e72-e67d85f09b8b.jpeg'], tooltip: 'Clube de Leitura, CrioLivros, Artes Visuais, Artes Cênicas, Improvisação, Dança e Música' },
];

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

    const handleOpenLightbox = useCallback((item: PortfolioItem, imageIndex: number, element: HTMLElement) => {
        const basePath = 'https://clubesa.github.io/simuladorRede3d/diagnostico/';
        const fullImageUrls = item.images.map(img => `${basePath}${item.folder}/${img}`);
        element.style.visibility = 'hidden';
        setLightboxState({ images: fullImageUrls, currentIndex: imageIndex, originElement: element });
    }, []);

    const handleCloseLightbox = useCallback(() => {
        if (lightboxState) {
            lightboxState.originElement.style.visibility = 'visible';
        }
        setLightboxState(null);
    }, [lightboxState]);

    const handleNextImage = useCallback(() => {
        setLightboxState(prev => {
            if (!prev) return null;
            const nextIndex = (prev.currentIndex + 1) % prev.images.length;
            return { ...prev, currentIndex: nextIndex };
        });
    }, []);
    
    const handlePrevImage = useCallback(() => {
        setLightboxState(prev => {
            if (!prev) return null;
            const prevIndex = (prev.currentIndex - 1 + prev.images.length) % prev.images.length;
            return { ...prev, currentIndex: prevIndex };
        });
    }, []);

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
                    images={lightboxState.images}
                    currentIndex={lightboxState.currentIndex}
                    originRect={lightboxState.originElement.getBoundingClientRect()}
                    onClose={handleCloseLightbox}
                    onNext={handleNextImage}
                    onPrev={handlePrevImage}
                />
            )}
        </section>
    );
};

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

const Footer: React.FC<FooterProps> = ({ onOpenModal }) => {
    return (
        <footer className="bg-text-main text-white text-center py-20 px-4">
            <div className="container mx-auto max-w-3xl">
                <h2 className="font-lora text-4xl text-white mb-6">Escolha Caminhar Conosco</h2>
                <p className="text-lg opacity-80 max-w-xl mx-auto mb-10">
                    A LABirintar transforma o contraturno. Preencha seus dados e nossa equipe entrará em contato.
                </p>
                <div className="flex justify-center">
                    <button 
                        type="button" 
                        onClick={onOpenModal}
                        className="inline-block py-4 px-10 rounded-full text-white font-bold text-lg bg-secondary hover:bg-opacity-90 transition-all transform hover:-translate-y-1 shadow-md hover:shadow-lg"
                    >
                        Receber Contato
                    </button>
                </div>
            </div>
        </footer>
    );
};

const InputGroup: React.FC<{ label: string; id: string; name: string; type?: string; placeholder?: string; required?: boolean }> = 
({ label, id, name, type = 'text', placeholder, required = true }) => (
    <div>
        <label htmlFor={id} className="block font-semibold mb-2 text-text-main">{label}</label>
        <input 
            type={type} 
            id={id} 
            name={name} 
            placeholder={placeholder} 
            required={required}
            className="w-full p-3 border-2 border-accent-blue rounded-lg text-lg focus:ring-2 focus:ring-primary focus:outline-none"
        />
    </div>
);

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300"
            onClick={onClose}
        >
            <div 
                className="bg-white p-8 rounded-2xl shadow-xl w-11/12 max-w-md m-4"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                <h3 className="font-lora text-2xl mb-2">Informações de Contato</h3>
                <p className="text-gray-600 mb-6">Deixe seus dados para que nossa equipe possa retornar.</p>
                
                <div className="space-y-4">
                    <InputGroup label="Seu nome" id="contact-name" name="contato_nome" />
                    <InputGroup label="Telefone" id="contact-phone" name="contato_telefone" type="tel" placeholder="(11) 99999-9999" />
                    <InputGroup label="Cargo" id="contact-role" name="contato_cargo" />
                    <InputGroup label="Escola" id="contact-school" name="contato_escola" />
                </div>
                
                <button 
                    type="submit" 
                    form="commercial-form" 
                    className="w-full mt-8 py-4 px-10 rounded-full text-white font-bold text-lg bg-primary hover:bg-opacity-90 transition-all transform hover:-translate-y-1 shadow-md hover:shadow-lg"
                >
                    Enviar
                </button>
            </div>
        </div>
    );
};

// --- App Component (from App.tsx) ---
const App: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // This state would hold all form data if it were to be submitted to a backend.
    const [formData, setFormData] = useState<Record<string, any>>({});

    const handleOpenModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fullFormData = new FormData(e.currentTarget);
        const data: Record<string, any> = {};
        
        fullFormData.forEach((value, key) => {
             // Handle multiple checkboxes with the same name
            if (key in data) {
                if (Array.isArray(data[key])) {
                    data[key].push(value);
                } else {
                    data[key] = [data[key], value];
                }
            } else {
                data[key] = value;
            }
        });
        
        console.log("Final form data submitted:", data);
        alert("Obrigado! Suas respostas foram enviadas com sucesso. (Demonstração)");
        handleCloseModal();
        e.currentTarget.reset(); // Reset form fields
    };

    return (
        <div className="overflow-x-hidden">
            <Hero />
            <form id="commercial-form" onSubmit={handleFormSubmit}>
                <main>
                    <VisionSection />
                    <ProblemSection />
                    <SolutionSection />
                    <WayOfDoingSection />
                    <PortfolioSection />
                    <PartnershipSection />
                    <SimulatorSection />
                    <BenefitsSection />
                </main>
                <Footer onOpenModal={handleOpenModal} />
                <ContactModal 
                    isOpen={isModalOpen} 
                    onClose={handleCloseModal} 
                />
            </form>
        </div>
    );
};


// --- ReactDOM Render (from original index.tsx) ---
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
