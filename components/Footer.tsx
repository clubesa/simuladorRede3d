
import React from 'react';

interface FooterProps {
    onOpenModal: () => void;
}

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

export default Footer;
