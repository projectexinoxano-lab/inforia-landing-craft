import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoModal = ({ isOpen, onClose }: DemoModalProps) => {
  const [step, setStep] = useState<'form' | 'calendar'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    challenge: ''
  });
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.challenge) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos.",
        variant: "destructive",
      });
      return;
    }
    setStep('calendar');
  };

  const handleDateSelect = async (date: Date | undefined) => {
    if (!date) return;
    
    setSelectedDate(date);
    setIsSubmitting(true);

    try {
      const response = await fetch('https://hook.eu2.make.com/119okwo9d8lehf8frh0h2nifi372sjby', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'demo_request',
          name: formData.name,
          email: formData.email,
          challenge: formData.challenge,
          demo_date: format(date, 'yyyy-MM-dd', { locale: es }),
          demo_time: format(date, 'HH:mm', { locale: es })
        }),
      });

      if (response.ok) {
        toast({
          title: "¡Demo agendada!",
          description: "Te enviaremos la confirmación por email.",
        });
        onClose();
        resetForm();
      } else {
        throw new Error('Error en el envío');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al agendar la demo. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep('form');
    setFormData({ name: '', email: '', challenge: '' });
    setSelectedDate(undefined);
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
            Aquí empieza tu liberación profesional.
          </DialogTitle>
        </DialogHeader>

        {step === 'form' ? (
          <div className="space-y-6">
            <p className="font-sans text-muted-foreground text-center">
              Estás a un paso de ver cómo funciona el sistema que te devolverá el control. 
              Para asegurar que esta sesión de 20 minutos transforme tu consulta, necesitamos un par de detalles.
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
                  placeholder="¿Cuál es tu mayor reto administrativo actualmente? (Ej: 'pierdo horas transcribiendo', 'la facturación es un caos', etc.)"
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
              >
                Ver horarios y agendar mi demo
              </Button>
            </form>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="font-sans text-center font-medium">
              Elige tu momento. Allí estaremos.
            </p>

            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                initialFocus
                className="border rounded-md p-3 pointer-events-auto"
              />
            </div>

            {isSubmitting && (
              <p className="text-center text-sm text-muted-foreground">
                Agendando tu demo...
              </p>
            )}

            <Button 
              variant="outline" 
              onClick={() => setStep('form')}
              className="w-full"
              disabled={isSubmitting}
            >
              Volver al formulario
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DemoModal;