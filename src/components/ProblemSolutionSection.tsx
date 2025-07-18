import { AlertTriangle, CheckCircle } from "lucide-react";

const ProblemSolutionSection = () => {
  return (
    <section className="py-16 px-6" id="problem-solution">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Problem Card */}
          <div className="bg-white rounded-2xl shadow-card p-8 border-l-4 border-inforia-burgundy">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-8 h-8 text-inforia-burgundy" />
                <h2 className="font-heading font-bold text-2xl text-inforia-burgundy">
                  El Desgaste Diario
                </h2>
              </div>
              
              <p className="font-sans text-lg leading-relaxed text-foreground">
                La carga mental del papeleo, el miedo a la burocracia y la soledad del emprendedor... El 'papeleo te come vivo' y te aleja de tu verdadera vocación.
              </p>

              <div className="space-y-3 text-muted-foreground font-sans">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-inforia-burgundy rounded-full mt-2"></div>
                  <span>Horas perdidas en informes repetitivos</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-inforia-burgundy rounded-full mt-2"></div>
                  <span>Ansiedad por posibles errores burocráticos</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-inforia-burgundy rounded-full mt-2"></div>
                  <span>Menos tiempo para lo que realmente importa</span>
                </div>
              </div>
            </div>
          </div>

          {/* Solution Card */}
          <div className="bg-white rounded-2xl shadow-card p-8 border-l-4 border-inforia-green">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-8 h-8 text-inforia-green" />
                <h2 className="font-heading font-bold text-2xl text-inforia-green">
                  La Transformación que Necesitas
                </h2>
              </div>
              
              <p className="font-sans text-lg leading-relaxed text-foreground">
                Un asistente inteligente que automatiza tus informes, te da soporte clínico y te devuelve el control, para que te centres en lo que de verdad importa: menos administración, más psicología.
              </p>

              <div className="space-y-3 text-muted-foreground font-sans">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-inforia-green rounded-full mt-2"></div>
                  <span>Informes automáticos en segundos</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-inforia-green rounded-full mt-2"></div>
                  <span>Tranquilidad total con LOPD</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-inforia-green rounded-full mt-2"></div>
                  <span>Más tiempo para tus pacientes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;