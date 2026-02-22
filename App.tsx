import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Products from './components/Products';
import Services from './components/Services';
import CTA from './components/CTA';
import FAQ from './components/FAQ';
import AboutUs from './components/AboutUs';
import Environment from './components/Environment';
import Footer from './components/Footer';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Modal from './components/Modal';
import ContactForm from './components/ContactForm';
import AdminPanel from './components/AdminPanel';
import ChatInterface from './components/ChatInterface';
import ServicesPage from './pages/Services';
import { MessageCircle } from 'lucide-react';

function App() {
  const [route, setRoute] = useState(window.location.hash);
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const [isAdminModalOpen, setAdminModalOpen] = useState(false);
  const [isChatModalOpen, setChatModalOpen] = useState(false);


  useEffect(() => {
    const handleHashChange = () => {
      const newHash = window.location.hash;
      setRoute(newHash);

      // Scroll logic for sections
      if (newHash === '#contacto') {
        setContactModalOpen(true);
        window.location.hash = '#home'; // Reset hash
        return;
      }

      if (newHash && newHash !== '#catalogo' && !newHash.startsWith('#produto/')) {
        // Small delay to allow the DOM to render the home sections if we just came from Catalog
        setTimeout(() => {
          const id = newHash.replace('#', '');
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          } else if (newHash === '#home') {
             window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 150);
      } else if (newHash !== '#catalogo' && !newHash.startsWith('#produto/')) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Initial check on load
    if (window.location.hash) {
      handleHashChange();
    } else {
        window.location.hash = '#home';
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    if (route === '#catalogo') {
      return <Catalog />;
    }

    if (route === '#servicos-detalhe') {
        return <ServicesPage />;
    }

    if (route.startsWith('#produto/')) {
      const productId = parseInt(route.split('/')[1]);
      if (!isNaN(productId)) {
        return <ProductDetail productId={productId} />;
      }
    }
    
    return (
      <main id="home">
        <Header />
        <Products />
        <Services onContactClick={() => setContactModalOpen(true)} />
        <FAQ />
        <CTA />
        <Environment />
        <AboutUs />
      </main>
    );
  };

  return (
    <>
    <div className="bg-white text-black font-sans min-h-screen selection:bg-yellow-400 selection:text-black">
      <Navbar onContactClick={() => setContactModalOpen(true)} onAdminClick={() => setAdminModalOpen(true)} />
      {renderPage()}
      <Footer onContactClick={() => setContactModalOpen(true)} onAdminClick={() => setAdminModalOpen(true)} />
      
      {/* Floating Chat Button */}
      <button 
        onClick={() => setChatModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-yellow-400 text-black p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 group"
        aria-label="Abrir Chat"
      >
        <MessageCircle size={24} className="group-hover:rotate-12 transition-transform" />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-black text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Assistente IA
        </span>
      </button>
    </div>
    <Modal isOpen={isContactModalOpen} onClose={() => setContactModalOpen(false)}>
        <ContactForm onClose={() => setContactModalOpen(false)} />
    </Modal>
    <Modal isOpen={isAdminModalOpen} onClose={() => setAdminModalOpen(false)}>
        <AdminPanel onClose={() => setAdminModalOpen(false)} onProductAdded={() => {
          // If we are on catalog page, we might want to refresh, but Catalog fetches on mount
          // and we can force a refresh if needed by changing a key or just letting the user navigate
          if (window.location.hash === '#catalogo') {
            window.location.reload();
          }
        }} />
    </Modal>
    <Modal isOpen={isChatModalOpen} onClose={() => setChatModalOpen(false)} padding={false}>
        <ChatInterface onClose={() => setChatModalOpen(false)} />
    </Modal>
    </>
  );
}

export default App;