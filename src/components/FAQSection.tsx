import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "¿Están realmente seguros los datos confidenciales de mis pacientes? ¿Cumple INFORIA con la LOPD/GDPR?",
    answer: "Absolutamente. La seguridad y la soberanía de tus datos son el pilar fundamental de nuestra arquitectura. A diferencia de otros softwares, INFORIA funciona como una \"pasarela\" inteligente: no almacenamos los datos clínicos de tus pacientes en nuestros servidores. Toda la información, desde la grabación de la sesión hasta el informe final, reside siempre en tu propio ecosistema de Google (Drive, Docs), bajo tu control exclusivo. Cumplimos con la LOPD/GDPR por diseño, dándote la máxima tranquilidad."
  },
  {
    question: "Ya estoy desbordado/a, ¿es otra herramienta complicada que me dará más trabajo?",
    answer: "Todo lo contrario. INFORIA ha sido diseñado específicamente para aliviar la carga, no para añadir una más. Nuestra filosofía es la simplicidad radical. La interfaz, que llamamos \"Puesto de Mando Clínico\", te presenta en una sola pantalla tu calendario y las herramientas para redactar y buscar informes, imitando tu flujo de trabajo natural. El objetivo es que, desde el primer día, sientas que tienes un asistente que te quita trabajo, no que te lo da."
  },
  {
    question: "¿Son fiables los informes que genera la IA? ¿Puedo personalizarlos?",
    answer: "Sí, son fiables y 100% personalizables. Nuestra \"Inteligencia Clínica Aplicada\" no es una IA genérica. Usamos prompts entrenados para mantener un lenguaje técnico-profesional y, lo más importante, te ofrecemos una sugerencia de diagnóstico diferencial para darte una \"seguridad clínica\" adicional que otras herramientas no ofrecen. El resultado final es siempre un documento de Google Docs totalmente editable, para que tengas siempre la última palabra y puedas ajustar cada detalle a tu criterio profesional."
  },
  {
    question: "¿Cómo funciona exactamente el proceso para generar un informe?",
    answer: "Hemos simplificado el flujo al máximo para que sea rápido e intuitivo:\n\n1. Seleccionas al paciente en el módulo de redacción.\n2. Subes el archivo de voz de la sesión y/o tus notas.\n3. Haces clic en \"Generar Informe\". Nuestro sistema detecta automáticamente si es una primera visita o un seguimiento y realiza el análisis evolutivo si procede.\n4. En segundos, recibes un enlace al borrador del informe en tu Google Docs, listo para revisar."
  },
  {
    question: "¿Qué valor real obtengo por el precio? ¿Merece la pena la inversión?",
    answer: "Sí, y queremos que lo veas no como un gasto, sino como la inversión más importante que puedes hacer en ti y en tu vocación. El retorno es inmediato y se mide en la moneda más valiosa que tienes: tu paz mental.\n\nPiénsalo de esta manera: el Plan Profesional se alquila por el equivalente a poco más de una de tus sesiones al mes. Por esa cuota, no solo estás alquilando un software; estás alquilando el final de la jornada laboral a una hora decente. Estás alquilando fines de semana sin la sombra del \"papeleo\" pendiente. Estás alquilando la energía mental y emocional para estar 100% presente con tus pacientes, y también contigo mismo y con tu familia.\n\nAl recuperar horas cada semana, la cuota mensual se paga sola desde el primer paciente al que puedes atender en ese tiempo liberado. Pero el verdadero ROI no es solo económico: es la diferencia entre terminar el día agotado y frustrado, y terminarlo con la satisfacción de haber hecho tu mejor trabajo clínico y aún tener energía para vivir tu vida.\n\nINFORIA es la herramienta que te cuida a ti, para que tú puedas seguir cuidando de los demás."
  }
];

const FAQSection = () => {
  return (
    <section className="py-16 px-6 bg-background" id="faqs">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-inforia-green mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="font-sans text-lg text-muted-foreground">
            Resolvemos las dudas más comunes sobre INFORIA
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg shadow-card border border-border">
              <AccordionTrigger className="font-heading font-semibold text-left text-foreground px-6 py-4 hover:no-underline hover:text-inforia-green">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="font-sans text-muted-foreground px-6 pb-4 leading-relaxed whitespace-pre-line">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;