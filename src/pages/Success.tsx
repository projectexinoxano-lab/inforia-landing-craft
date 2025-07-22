import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Calendar, Mail, Phone } from "lucide-react";

const Success = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="font-heading font-bold text-3xl lg:text-4xl text-foreground mb-4">
            ¡Suscripción Exitosa!
          </h1>
          <p className="font-sans text-lg text-muted-foreground mb-8">
            Gracias por confiar en INFORIA. Tu suscripción está ahora activa y puedes comenzar a usar todas las funcionalidades.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-card mb-8">
          <h2 className="font-heading font-bold text-xl text-inforia-green mb-6">
            Próximos pasos
          </h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-inforia-green mt-1 flex-shrink-0" />
              <div className="text-left">
                <p className="font-sans font-medium text-foreground">
                  Revisa tu email
                </p>
                <p className="font-sans text-sm text-muted-foreground">
                  Te hemos enviado todos los detalles de tu suscripción y las credenciales de acceso.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Calendar className="w-5 h-5 text-inforia-green mt-1 flex-shrink-0" />
              <div className="text-left">
                <p className="font-sans font-medium text-foreground">
                  Programa tu demo personalizada
                </p>
                <p className="font-sans text-sm text-muted-foreground">
                  Nuestro equipo te ayudará a configurar INFORIA según tus necesidades específicas.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Phone className="w-5 h-5 text-inforia-green mt-1 flex-shrink-0" />
              <div className="text-left">
                <p className="font-sans font-medium text-foreground">
                  Soporte dedicado
                </p>
                <p className="font-sans text-sm text-muted-foreground">
                  Contacta con nuestro equipo si necesitas ayuda durante la configuración inicial.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Button 
            size="lg"
            onClick={() => window.open('https://calendly.com/inforia-inforia/demo_inforia', '_blank')}
          >
            Programar Demo Personalizada
          </Button>
          
          <div>
            <Link to="/">
              <Button variant="outline" size="lg">
                Volver al Inicio
              </Button>
            </Link>
          </div>
        </div>

        {sessionId && (
          <p className="font-sans text-xs text-muted-foreground mt-8">
            ID de sesión: {sessionId}
          </p>
        )}
      </div>
    </div>
  );
};

export default Success;