import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Check, ArrowLeft, TestTube } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const TestProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId: 'price_1S7WbA1RyyayvxpU0nEynBbh' }
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      } else {
        throw new Error('No se recibió la URL de checkout');
      }
    } catch (error) {
      console.error('Error en checkout:', error);
      toast({
        title: "Error",
        description: "Hubo un problema al procesar tu solicitud. Por favor, intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-16">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 text-inforia-green hover:text-inforia-green/80 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-sans">Volver al inicio</span>
          </Link>
        </div>

        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-inforia-gold/10 text-inforia-gold px-4 py-2 rounded-full mb-6">
            <TestTube className="w-4 h-4" />
            <span className="font-sans font-medium">Producto de Test</span>
          </div>
          
          <h1 className="font-heading font-bold text-3xl lg:text-4xl text-foreground mb-4">
            Producto de Prueba INFORIA
          </h1>
          <p className="font-sans text-lg text-muted-foreground">
            Producto específico para realizar pruebas del sistema de pagos y webhooks.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-elegant border-2 border-inforia-gold/20 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-inforia-gold text-white px-6 py-2 rounded-full text-sm font-medium">
                Solo Testing
              </div>
            </div>

            <div className="space-y-8 pt-4">
              {/* Header */}
              <div className="text-center space-y-4">
                <h3 className="font-heading font-bold text-2xl text-foreground">
                  Test Product
                </h3>
                <div className="flex items-baseline justify-center space-x-2">
                  <span className="font-heading font-bold text-5xl text-inforia-gold">
                    1€
                  </span>
                  <span className="font-sans text-muted-foreground">
                    /mes
                  </span>
                </div>
                  <p className="font-sans text-inforia-green font-medium text-lg">
                  Para pruebas únicamente
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <h4 className="font-heading font-semibold text-lg text-foreground">
                  Funcionalidades de Test:
                </h4>
                {[
                  "Webhook de confirmación",
                  "Creación de perfil en Supabase",
                  "Estado de suscripción activa",
                  "Validación del flujo completo",
                  "Testing de eventos de Stripe",
                  "Verificación de datos"
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-inforia-gold mt-0.5 flex-shrink-0" />
                    <span className="font-sans text-foreground">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="space-y-4">
                <Button 
                  onClick={handleCheckout}
                  disabled={isLoading}
                  size="lg"
                  className="w-full font-sans bg-inforia-gold hover:bg-inforia-gold/90"
                >
                  {isLoading ? "Procesando..." : "Iniciar Test de Pago"}
                </Button>
                
                <p className="font-sans text-sm text-muted-foreground text-center">
                  Solo para pruebas • No es un producto real
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="font-sans text-muted-foreground mb-4">
            Este producto está configurado específicamente para testing del webhook.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="font-sans text-sm text-yellow-800">
              <strong>Nota:</strong> Este es un producto de prueba. Úsalo para verificar que el webhook de Stripe funciona correctamente y que se crean los perfiles en Supabase.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestProduct;