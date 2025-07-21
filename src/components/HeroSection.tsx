import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-psychologist.jpg";

const HeroSection = () => {
  const requestDemo = () => {
    window.open('https://calendly.com/inforia-inforia/demo_inforia', '_blank');
  };

  return (
    <section className="pt-40 pb-32 px-6 min-h-screen flex items-center">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="font-heading font-bold text-4xl lg:text-6xl text-inforia-green leading-tight">
                Recupera tu vocación.
                <br />
                <span className="text-foreground">Nosotros nos encargamos del papeleo.</span>
              </h1>
              
              <p className="font-sans text-lg lg:text-xl text-muted-foreground leading-relaxed">
                INFORIA es el asistente clínico con IA diseñado para psicólogos que quieren dedicar su tiempo a los pacientes, no a la burocracia. Recupera tu paz mental y eleva tu confianza profesional.
              </p>
            </div>

            <Button 
              variant="cta" 
              size="xl" 
              onClick={requestDemo}
              className="font-sans"
            >
              Empieza a Ahorrar Tiempo Ahora
            </Button>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-elegant">
              <img 
                src={heroImage} 
                alt="Psicóloga profesional trabajando en un despacho moderno"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-inforia-green/10 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;