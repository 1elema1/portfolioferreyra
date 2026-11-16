import { useState, useEffect } from 'react';
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

  // Detección de ruta secreta /administrador
  useEffect(() => {
    const checkAdminRoute = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes('administrador') || hash.includes('administrador') || path === '/admin' || hash === '#admin') {
        setIsAdminModalOpen(true);
      }
    };

    checkAdminRoute();

    // Atajo de teclado secreto: Ctrl + Shift + A
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminModalOpen(prev => !prev);
      }
    };

    window.addEventListener('popstate', checkAdminRoute);
    window.addEventListener('hashchange', checkAdminRoute);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('popstate', checkAdminRoute);
      window.removeEventListener('hashchange', checkAdminRoute);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleCloseAdmin = () => {
    setIsAdminModalOpen(false);
    // Limpiar la URL si entró por /administrador
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    if (path.includes('administrador') || hash.includes('administrador') || path === '/admin' || hash === '#admin') {
      window.history.pushState(null, '', '/');
    }
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-200">
      <Navbar />
      
      <main className="flex-1">
        {sections.hero && <Hero />}
        {sections.about && <About />}
        {sections.skills && <Skills />}
        {sections.projects && <Projects />}
        {sections.experience && <Experience />}
        {sections.contact && <Contact />}
      </main>

      <Footer />
      
      {/* Modal de Administración Privado (acceso exclusivo por link secreto /administrador) */}
      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={handleCloseAdmin}
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
