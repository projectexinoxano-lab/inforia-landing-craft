import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'legal' | 'cookies';
}

const legalContent = {
  privacy: {
    title: "Política de Privacidad",
    content: `
      <h3>1. INFORMACIÓN AL USUARIO</h3>
      <p>INFORIA, S.L., como Responsable del Tratamiento, le informa que según lo dispuesto en el Reglamento (UE) 2016/679 de 27 de abril de 2016 (RGPD) y la Ley Orgánica 3/2018 de 5 de diciembre (LOPDGDD), trataremos sus datos tal y como reflejamos en la presente Política de Privacidad.</p>

      <h3>2. FINALIDAD DEL TRATAMIENTO DE DATOS</h3>
      <p>En INFORIA tratamos la información que nos facilita con el fin de prestarle el servicio solicitado y realizar la facturación del mismo. Los datos proporcionados se conservarán mientras se mantenga la relación comercial o durante el tiempo necesario para cumplir con las obligaciones legales.</p>

      <h3>3. LEGITIMACIÓN</h3>
      <p>La base legal para el tratamiento de sus datos es: el consentimiento del interesado al solicitar la información y/o al aceptar las condiciones requeridas para la prestación del servicio, el interés legítimo del responsable y el cumplimiento de una obligación legal.</p>

      <h3>4. COMUNICACIÓN DE DATOS A TERCEROS</h3>
      <p>Los datos no se comunicarán a terceros, salvo en los casos en que exista una obligación legal. No obstante, podrán ser comunicados a terceros ligados a INFORIA por una relación de prestación de servicios.</p>

      <h3>5. DERECHOS DEL INTERESADO</h3>
      <p>Los derechos que asisten al interesado son: derecho a retirar el consentimiento en cualquier momento, derecho de acceso, rectificación, portabilidad y supresión de sus datos, y de limitación u oposición a su tratamiento, así como a no ser objeto de decisiones basadas únicamente en el tratamiento automatizado de sus datos.</p>

      <h3>6. CONTACTO</h3>
      <p>Para ejercitar sus derechos de acceso, rectificación, supresión, portabilidad, limitación u oposición deberá dirigirse a info@inforia.cat. Del mismo modo, en caso de que sienta vulnerados sus derechos en materia de protección de datos, especialmente cuando no haya obtenido satisfacción en el ejercicio de sus derechos, puede presentar una reclamación ante la Autoridad de Control en materia de Protección de Datos competente.</p>
    `
  },
  legal: {
    title: "Aviso Legal",
    content: `
      <h3>1. DATOS IDENTIFICATIVOS</h3>
      <p>En cumplimiento del artículo 10 de la Ley 34/2002 de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico, se exponen los siguientes datos: la empresa titular de dominio web es INFORIA, S.L., con domicilio a estos efectos en [Dirección], y N.I.F [NIF]. Correo electrónico de contacto: info@inforia.cat.</p>

      <h3>2. OBJETO</h3>
      <p>El presente aviso legal regula el uso del sitio web inforia.cat (en adelante, LA WEB), del que es titular INFORIA, S.L. (en adelante, EL TITULAR).</p>

      <h3>3. CONDICIONES DE USO</h3>
      <p>La utilización de LA WEB le otorga la condición de usuario, e implica la aceptación completa de todas las cláusulas y condiciones de uso incluidas en las páginas:</p>
      <ul>
        <li>Si no está conforme con todas y cada una de estas cláusulas y condiciones absténgase de utilizar esta WEB.</li>
        <li>El acceso a esta WEB es responsabilidad exclusiva de los usuarios.</li>
        <li>EL TITULAR se reserva el derecho a modificar cualquier tipo de información que pudiera aparecer en LA WEB, sin que exista obligación de preavisar o poner en conocimiento de los usuarios dichas obligaciones, entendiéndose como suficiente la publicación en LA WEB de EL TITULAR.</li>
      </ul>

      <h3>4. RESPONSABILIDAD</h3>
      <p>EL TITULAR se exime de cualquier tipo de responsabilidad derivada de la información publicada en LA WEB siempre que esta información haya sido manipulada o introducida por un tercero ajeno al mismo.</p>

      <h3>5. PROPIEDAD INTELECTUAL E INDUSTRIAL</h3>
      <p>LA WEB, incluyendo a título enunciativo pero no limitativo su programación, edición, compilación y demás elementos necesarios para su funcionamiento, los diseños, logotipos, texto y/o gráficos, son propiedad de EL TITULAR o, en su caso, dispone de licencia o autorización expresa por parte de los autores.</p>
    `
  },
  cookies: {
    title: "Política de Cookies",
    content: `
      <h3>1. ¿QUÉ SON LAS COOKIES?</h3>
      <p>Las cookies son archivos que se pueden descargar en su equipo a través de las páginas web. Son herramientas que tienen un papel esencial para la prestación de numerosos servicios de la sociedad de la información.</p>

      <h3>2. TIPOS DE COOKIES</h3>
      <p>Según quien sea la entidad que gestione el dominio desde donde se envían las cookies y trate los datos que se obtengan se pueden distinguir dos tipos:</p>
      <ul>
        <li><strong>Cookies propias:</strong> aquéllas que se envían al equipo terminal del usuario desde un equipo o dominio gestionado por el propio editor y desde el que se presta el servicio solicitado por el usuario.</li>
        <li><strong>Cookies de terceros:</strong> aquéllas que se envían al equipo terminal del usuario desde un equipo o dominio que no es gestionado por el editor, sino por otra entidad que trata los datos obtenidos través de las cookies.</li>
      </ul>

      <h3>3. COOKIES UTILIZADAS EN EL WEB</h3>
      <p>Las cookies que se utilizan en este sitio web son de identificación, autenticación, navegación, seguridad y de geolocalización; no son utilizadas con fines publicitarios.</p>

      <h3>4. DESACTIVACIÓN O ELIMINACIÓN DE COOKIES</h3>
      <p>En cualquier momento podrá ejercer su derecho de desactivación o eliminación de cookies de este sitio web. Estas acciones se realizan de forma diferente en función del navegador que esté usando.</p>

      <h3>5. CONTACTO</h3>
      <p>Para resolver cualquier duda sobre esta Política de Cookies puede contactar con nosotros en la dirección info@inforia.cat.</p>
    `
  }
};

const LegalModal = ({ isOpen, onClose, type }: LegalModalProps) => {
  const content = legalContent[type];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl text-inforia-green">
            {content.title}
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[60vh] pr-4">
          <div 
            className="font-sans text-sm text-foreground leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: content.content.replace(/\n\s*/g, '') }}
            style={{
              fontSize: '14px',
              lineHeight: '1.6'
            }}
          />
        </ScrollArea>

        <div className="flex justify-end pt-4 border-t">
          <Button variant="demo" onClick={onClose}>
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LegalModal;