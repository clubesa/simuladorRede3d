
import React from 'react';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

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

export default ContactModal;
