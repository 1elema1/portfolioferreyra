import { useState } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminModal from './components/AdminModal';

function PortfolioApp() {
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const { sections } = usePortfolio();

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      <Navbar onOpenAdmin={() => setIsAdminModalOpen(true)} />
      
      <main className="flex-1">
        {sections.hero && <Hero />}
        {sections.about && <About />}
        {sections.skills && <Skills />}
        {sections.projects && <Projects />}
        {sections.experience && <Experience />}
        {sections.contact && <Contact />}
      </main>

      <Footer onOpenAdmin={() => setIsAdminModalOpen(true)} />
      
      {/* Modal de Administración Privado Completo */}
      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioApp />
    </PortfolioProvider>
  );
}
