import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";
import ContactModal from "./ContactModal";

const plans = [
  {
    name: "Plan Profesional",
    price: "99€",
    period: "/mes",
    reports: "100 informes",
    popular: true,
    features: [
      "100 informes mensuales",
      "Plantillas DSM-5 y CIE-10",
      "Cumplimiento LOPD completo",
      "Soporte por email",
      "Backup automático",
      "Acceso a actualizaciones"
    ]
  },
  {
    name: "Plan Clínica",
    price: "149€",
    period: "/mes",
    reports: "170 informes",
    popular: false,
    features: [
      "170 informes mensuales",
      "Plantillas DSM-5 y CIE-10",
      "Cumplimiento LOPD completo",
      "Soporte prioritario",
      "Backup automático",
      "Gestión multi-usuario",
      "Reportes de productividad",
      "Integración con calendarios"
    ]
  }
];

const PricingSection = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const requestContact = () => {
    setIsContactModalOpen(true);
  };

  return (
    <section className="py-16 px-6 bg-muted/30" id="pricing">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-inforia-green mb-4">
            Planes que se Adaptan a tu Práctica
          </h2>
          <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto">
            Elige el plan que mejor se ajuste a tu volumen de trabajo. Sin permanencia, sin sorpresas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`bg-white rounded-2xl p-8 shadow-card hover:shadow-elegant transition-all duration-300 relative ${
                index === 0 ? 'ring-2 ring-inforia-green ring-opacity-20' : 'ring-2 ring-inforia-burgundy ring-opacity-20'
              }`}
            >

              <div className="space-y-6">
                {/* Header */}
                <div className="text-center space-y-2">
                  <h3 className="font-heading font-bold text-2xl text-foreground">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center space-x-1">
                    <span className="font-heading font-bold text-4xl text-inforia-green">
                      {plan.price}
                    </span>
                    <span className="font-sans text-muted-foreground">
                      {plan.period}
                    </span>
                  </div>
                  <p className="font-sans text-inforia-gold font-medium">
                    {plan.reports}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-inforia-green mt-0.5 flex-shrink-0" />
                      <span className="font-sans text-foreground">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Button 
                  variant={index === 0 ? "demo" : "cta"}
                  size="lg"
                  className="w-full font-sans"
                >
                  Contratar
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="font-sans text-muted-foreground mb-4">
            ¿Necesitas un plan personalizado para tu clínica o centro?
          </p>
          <Button variant="cta" size="lg" onClick={requestContact}>
            Contactar para Plan Empresarial
          </Button>
        </div>
      </div>

      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </section>
  );
};

export default PricingSection;