import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const requestDemo = () => {
    window.open('https://calendly.com/inforia-inforia/demo_inforia', '_blank');
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="font-heading font-bold text-3xl text-inforia-green ml-8">
            iNFORiA
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('benefits')}
              className="text-foreground hover:text-inforia-green transition-colors font-sans font-medium"
            >
              Beneficios
            </button>
            <button 
              onClick={() => scrollToSection('lead-magnet')}
              className="text-foreground hover:text-inforia-green transition-colors font-sans font-medium"
            >
              Guía Gratuita
            </button>
            <button 
              onClick={() => scrollToSection('pricing')}
              className="text-foreground hover:text-inforia-green transition-colors font-sans font-medium"
            >
              Precios
            </button>
            <button 
              onClick={() => scrollToSection('faqs')}
              className="text-foreground hover:text-inforia-green transition-colors font-sans font-medium"
            >
              FAQs
            </button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => window.location.href = '/test-product'}
              className="mr-2"
            >
              Test
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => window.location.href = '/auth'}
              className="mr-2"
            >
              Iniciar Sesión
            </Button>
            <Button variant="cta" size="default" onClick={requestDemo}>
              Solicitar Demo
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border">
            <div className="flex flex-col space-y-4 pt-4">
              <button 
                onClick={() => scrollToSection('benefits')}
                className="text-left text-foreground hover:text-inforia-green transition-colors font-sans font-medium"
              >
                Beneficios
              </button>
              <button 
                onClick={() => scrollToSection('lead-magnet')}
                className="text-left text-foreground hover:text-inforia-green transition-colors font-sans font-medium"
              >
                Guía Gratuita
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="text-left text-foreground hover:text-inforia-green transition-colors font-sans font-medium"
              >
                Precios
              </button>
              <button 
                onClick={() => scrollToSection('faqs')}
                className="text-left text-foreground hover:text-inforia-green transition-colors font-sans font-medium"
              >
                FAQs
              </button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => window.location.href = '/auth'}
                className="self-start"
              >
                Iniciar Sesión
              </Button>
              <Button variant="cta" size="default" onClick={requestDemo}>
                Solicitar Demo
              </Button>
            </div>
          </nav>
        )}
      </div>

    </header>
  );
};

export default Header;