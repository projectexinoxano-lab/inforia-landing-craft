import { Clock, Shield, FileCheck, Target, TrendingUp, DollarSign } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Ahorra hasta un 80% de tu tiempo",
    description: "Automatiza la creación de informes, historiales y documentación clínica. Lo que antes te llevaba horas, ahora son minutos.",
    color: "text-inforia-gold"
  },
  {
    icon: Shield,
    title: "Eleva tu Confianza Clínica",
    description: "Acceso instantáneo a protocolos actualizados, DSM-5 y CIE-10. Toma decisiones respaldadas por la evidencia más reciente.",
    color: "text-inforia-green"
  },
  {
    icon: FileCheck,
    title: "Duerme con Tranquilidad",
    description: "Cumplimiento total con LOPD y normativas. Todos tus datos están protegidos con los más altos estándares de seguridad.",
    color: "text-inforia-gold"
  },
  {
    icon: Target,
    title: "Consistencia Documental",
    description: "Plantillas profesionales basadas en DSM-5 y CIE-10. Garantiza coherencia y calidad en toda tu documentación.",
    color: "text-inforia-green"
  },
  {
    icon: TrendingUp,
    title: "Trazabilidad Completa",
    description: "Seguimiento detallado de cada sesión y evolución del paciente. Historial completo siempre disponible.",
    color: "text-inforia-gold"
  },
  {
    icon: DollarSign,
    title: "ROI Inmediato",
    description: "El tiempo que ahorras se traduce directamente en más horas disponibles para pacientes, formación o descanso. La inversión se recupera en menos de dos meses.",
    color: "text-inforia-burgundy",
    highlighted: true
  }
];

const BenefitsSection = () => {
  return (
    <section className="py-16 px-6 bg-muted/20" id="benefits">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-inforia-green mb-4">
            Transforma tu Práctica Clínica
          </h2>
          <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubre cómo INFORIA puede revolucionar tu trabajo diario y devolverte el tiempo que necesitas para lo que realmente importa.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className={`bg-white rounded-2xl p-8 shadow-card hover:shadow-elegant transition-all duration-300 ${
                benefit.highlighted ? 'ring-2 ring-inforia-burgundy ring-opacity-20 transform scale-105' : ''
              }`}
            >
              <div className="space-y-4">
                <div className={`w-12 h-12 ${benefit.color} bg-opacity-10 rounded-xl flex items-center justify-center`}>
                  <benefit.icon className={`w-6 h-6 ${benefit.color}`} />
                </div>
                
                <h3 className="font-heading font-semibold text-xl text-foreground">
                  {benefit.title}
                </h3>
                
                <p className="font-sans text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>

                {benefit.highlighted && (
                  <div className="inline-block px-3 py-1 bg-inforia-burgundy/10 text-inforia-burgundy rounded-full text-sm font-medium">
                    Destacado
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;