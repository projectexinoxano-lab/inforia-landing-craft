import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    challenge: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.challenge) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://hook.eu2.make.com/119okwo9d8lehf8frh0h2nifi372sjby', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'contacto_empresarial',
          name: formData.name,
          email: formData.email,
          challenge: formData.challenge
        }),
      });

      if (response.ok) {
        toast({
          title: "¡Mensaje enviado!",
          description: "Te contactaremos pronto para crear tu plan personalizado.",
        });
        onClose();
        resetForm();
      } else {
        throw new Error('Error en el envío');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al enviar el mensaje. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', challenge: '' });
  };

  const handleClose = () => {
    onClose();
    resetForm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading font-bold text-xl text-center">
            Plan Empresarial Personalizado
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <p className="font-sans text-muted-foreground text-center">
            Cuéntanos sobre tu clínica o centro y diseñaremos un plan que se adapte perfectamente a tus necesidades.
          </p>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Nombre"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            
            <div>
              <Input
                type="email"
                placeholder="Email de contacto"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>

            <div>
              <Textarea
                placeholder="Describe tu clínica/centro y tus necesidades específicas (Ej: 'somos 5 psicólogos', 'necesitamos 500+ informes/mes', etc.)"
                value={formData.challenge}
                onChange={(e) => setFormData({...formData, challenge: e.target.value})}
                required
                rows={3}
              />
            </div>

            <Button 
              type="submit"
              variant="cta" 
              size="lg" 
              className="w-full font-sans"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Solicitar Plan Personalizado'}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;