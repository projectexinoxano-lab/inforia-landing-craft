import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { X, Cookie } from "lucide-react";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('inforia-cookies-accepted');
    if (!cookiesAccepted) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('inforia-cookies-accepted', 'true');
    setIsVisible(false);
  };

  const openCookiePolicy = () => {
    // This will trigger the modal from the Footer component
    const event = new CustomEvent('openModal', { detail: 'cookies' });
    window.dispatchEvent(event);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-lg z-50">
      <div className="container mx-auto p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start space-x-3 flex-1">
            <Cookie className="w-6 h-6 text-inforia-gold flex-shrink-0 mt-1" />
            <div className="space-y-2">
              <p className="font-sans text-sm text-foreground">
                Utilizamos cookies para mejorar tu experiencia en nuestro sitio web y analizar el tráfico.
              </p>
              <button 
                onClick={openCookiePolicy}
                className="font-sans text-sm text-inforia-green hover:text-inforia-green/80 underline transition-colors"
              >
                Ver Política de Cookies
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button 
              variant="cta" 
              size="sm"
              onClick={acceptCookies}
              className="font-sans"
            >
              Aceptar
            </Button>
            <button 
              onClick={() => setIsVisible(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;