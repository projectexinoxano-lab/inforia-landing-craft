import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import ebookImage from "@/assets/ebook-survival-guide.jpg";
import { Download, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LeadMagnetSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://hook.eu2.make.com/119okwo9d8lehf8frh0h2nifi372sjby', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name || "",
          email: formData.email || "",
          website: formData.website || ""
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast({
          title: "¡Guía enviada!",
          description: "Revisa tu email para descargar la guía gratuita.",
        });
      } else {
        throw new Error('Error en el envío');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al enviar el formulario. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-16 px-6 bg-inforia-green" id="lead-magnet">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-2xl p-8 shadow-elegant">
              <CheckCircle className="w-16 h-16 text-inforia-green mx-auto mb-4" />
              <h2 className="font-heading font-bold text-2xl text-inforia-green mb-4">
                ¡Perfecto! Tu guía está en camino
              </h2>
              <p className="font-sans text-muted-foreground mb-6">
                Revisa tu email en los próximos minutos. Si no lo encuentras, mira en la carpeta de spam.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-6 bg-inforia-green" id="lead-magnet">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Ebook Image */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              <img 
                src={ebookImage} 
                alt="Guía de Supervivencia del Psicólogo Emprendedor"
                className="w-full max-w-md mx-auto drop-shadow-2xl"
              />
              <div className="absolute -top-4 -right-4 bg-inforia-gold text-inforia-graphite px-4 py-2 rounded-full font-sans font-bold text-sm">
                GRATIS
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="order-1 lg:order-2 text-white">
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <Download className="w-8 h-8 text-inforia-gold" />
                <h2 className="font-heading font-bold text-3xl lg:text-4xl">
                  🎁 GUÍA GRATUITA
                </h2>
              </div>
              
              <h3 className="font-heading font-bold text-xl lg:text-2xl">
                La Guía de Supervivencia del Psicólogo Emprendedor
              </h3>
              
              <p className="font-sans text-lg opacity-90 leading-relaxed">
                Descarga nuestra guía completa con estrategias probadas para optimizar tu consulta, reducir el estrés administrativo y aumentar tu rentabilidad sin comprometer la calidad del cuidado.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Tu nombre completo"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20"
                  />
                </div>
                
                <div>
                  <Input
                    type="email"
                    placeholder="Tu email profesional"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20"
                  />
                </div>

                <div>
                  <Input
                    type="url"
                    placeholder="Tu página web (opcional)"
                    value={formData.website}
                    onChange={(e) => setFormData({...formData, website: e.target.value})}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20"
                  />
                </div>

                <Button 
                  type="submit"
                  variant="cta" 
                  size="xl" 
                  disabled={isSubmitting}
                  className="w-full font-sans"
                >
                  {isSubmitting ? 'Enviando...' : 'Descargar Guía Gratuita'}
                </Button>
              </form>

              <p className="font-sans text-xs opacity-70 text-center">
                No spam. Solo contenido valioso para hacer crecer tu práctica.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadMagnetSection;