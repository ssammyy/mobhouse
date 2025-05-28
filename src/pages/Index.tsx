import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DJProfiles from "@/components/DJProfiles";
import MixesSection from "@/components/MixesSection";
import EventsSection from "@/components/EventsSection";
import GallerySection from "@/components/GallerySection";
import SponsorsSection from "@/components/SponsorsSection";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";

const Index = () => {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [showTicketModal, setShowTicketModal] = useState(false);

    const handleGetTicketsClick = () => {
        setShowTicketModal(true);
    };

    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden">
            <Header user={user} onAuthClick={() => setIsAuthModalOpen(true)} onLogout={() => setUser(null)} />

            <main>
                <HeroSection onGetTicketsClick={handleGetTicketsClick} />
                <DJProfiles />
                <MixesSection user={user} onAuthRequired={() => setIsAuthModalOpen(true)} />
                <EventsSection user={user} onAuthRequired={() => setIsAuthModalOpen(true)} />
                <GallerySection />
                <SponsorsSection />
            </main>

            <Footer />

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                onAuthSuccess={setUser}
            />
        </div>
    );
};

export default Index;