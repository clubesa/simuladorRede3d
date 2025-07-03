
import React, { useState, useCallback } from 'react';
import Hero from './components/Hero';
import VisionSection from './components/VisionSection';
import ProblemSection from './components/ProblemSection';
import SolutionSection from './components/SolutionSection';
import WayOfDoingSection from './components/WayOfDoingSection';
import PortfolioSection from './components/PortfolioSection';
import PartnershipSection from './components/PartnershipSection';
import SimulatorSection from './components/SimulatorSection';
import BenefitsSection from './components/BenefitsSection';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';

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

export default App;
