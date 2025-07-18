import { useState, useEffect } from 'react';
import LegalModal from './LegalModal';

const Footer = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'privacy' | 'legal' | 'cookies'>('privacy');

  useEffect(() => {
    const handleOpenModal = (event: CustomEvent) => {
      const type = event.detail as 'privacy' | 'legal' | 'cookies';
      setModalType(type);
      setModalOpen(true);
    };

    window.addEventListener('openModal', handleOpenModal as EventListener);
    return () => {
      window.removeEventListener('openModal', handleOpenModal as EventListener);
    };
  }, []);

  const openModal = (type: 'privacy' | 'legal' | 'cookies') => {
    setModalType(type);
    setModalOpen(true);
  };

  return (
    <>
      <footer className="bg-inforia-green text-white py-12 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Logo y descripción */}
            <div className="space-y-4">
              <div className="font-heading font-bold text-2xl text-inforia-gold">
                iNFORIA
              </div>
              <p className="font-sans text-white/80 leading-relaxed">
                El asistente clínico con IA diseñado para psicólogos que quieren dedicar su tiempo a los pacientes, no a la burocracia.
              </p>
            </div>

            {/* Contacto */}
            <div className="space-y-4">
              <h3 className="font-heading font-semibold text-lg text-inforia-gold">
                Contacto
              </h3>
              <div className="space-y-2 font-sans text-white/80">
                <p>
                  <strong>Email:</strong>{' '}
                  <a href="mailto:info@inforia.cat" className="hover:text-white transition-colors">
                    info@inforia.cat
                  </a>
                </p>
                <p>
                  <strong>Atención al cliente:</strong><br />
                  Lunes a Viernes: 9:00 - 18:00h
                </p>
              </div>
            </div>

            {/* Enlaces legales */}
            <div className="space-y-4">
              <h3 className="font-heading font-semibold text-lg text-inforia-gold">
                Legal
              </h3>
              <div className="space-y-2 font-sans">
                <div>
                  <button 
                    onClick={() => openModal('legal')}
                    className="text-white/80 hover:text-white transition-colors underline"
                  >
                    Aviso Legal
                  </button>
                </div>
                <div>
                  <button 
                    onClick={() => openModal('privacy')}
                    className="text-white/80 hover:text-white transition-colors underline"
                  >
                    Política de Privacidad
                  </button>
                </div>
                <div>
                  <button 
                    onClick={() => openModal('cookies')}
                    className="text-white/80 hover:text-white transition-colors underline"
                  >
                    Política de Cookies
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p className="font-sans text-white/60 text-sm">
              © {new Date().getFullYear()} INFORIA, S.L. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>

      <LegalModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type={modalType}
      />
    </>
  );
};

export default Footer;