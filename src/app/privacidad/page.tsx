import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Política de Protección de Datos Personales de Gestar Salud S.R.L. (Proactiva Salud), conforme a la Ley 25.326 de Protección de Datos Personales.',
  alternates: { canonical: '/privacidad' },
  openGraph: { url: '/privacidad', title: 'Política de Privacidad — Proactiva Salud' },
}

const EFFECTIVE_DATE = '1 de septiembre de 2026'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-display text-xl text-ink font-semibold">{title}</h2>
      <div className="font-body text-base text-ink-mid leading-relaxed flex flex-col gap-3">
        {children}
      </div>
    </section>
  )
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="font-display text-base text-ink font-semibold mt-2">{children}</h3>
}

export default function PrivacidadPage() {
  return (
    <>
      <Header />
      <main id="main">
        {/* ── Hero ── */}
        <section className="pt-40 pb-16 lg:pt-48 lg:pb-20 bg-surface">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="h-px w-10 bg-brand" aria-hidden="true" />
              <span className="font-body font-semibold text-sm tracking-widest uppercase text-brand">
                Legal
              </span>
            </div>
            <h1 className="font-display text-3xl lg:text-4xl text-ink leading-snug tracking-tight">
              Políticas de Privacidad y Uso de la Plataforma Proactiva Salud
            </h1>
            <p className="font-body text-sm text-muted">
              Vigente desde: {EFFECTIVE_DATE}
            </p>
          </div>
        </section>

        {/* ── Content ── */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 flex flex-col gap-10">

            {/* Datos del responsable */}
            <section className="flex flex-col gap-1.5 p-6 rounded-2xl bg-sage-pale/40 border border-sage-pale">
              <p className="font-body text-sm text-ink-mid"><strong className="font-semibold text-ink">Razón Social:</strong> Gestar Salud S.R.L.</p>
              <p className="font-body text-sm text-ink-mid"><strong className="font-semibold text-ink">CUIT:</strong> 30-71466105-8</p>
              <p className="font-body text-sm text-ink-mid">
                <strong className="font-semibold text-ink">Correo Electrónico:</strong>{' '}
                <a href="mailto:administracion@proactivasalud.com" className="text-brand font-semibold hover:underline">
                  administracion@proactivasalud.com
                </a>
              </p>
            </section>

            <p>
              En cumplimiento de la normativa vigente en materia de protección de datos personales,
              Gestar Salud S.R.L., CUIT 30-71466105-8, que opera digitalmente y comercialmente bajo el
              nombre Proactiva Salud &mdash;en adelante, &ldquo;Proactiva Salud&rdquo;&mdash;, reconoce la importancia de
              preservar la privacidad y proteger la información de las personas que utilizan su sitio
              web, aplicación y demás servicios digitales &mdash;en conjunto, la &ldquo;Plataforma&rdquo;.
            </p>
            <p>
              Por este motivo, Proactiva Salud adopta la presente Política de Protección de Datos
              Personales &mdash;en adelante, la &ldquo;Política&rdquo;&mdash;, cuya finalidad es explicar de manera clara:
            </p>
            <ul className="list-[lower-roman] pl-5 flex flex-col gap-1.5">
              <li>Qué datos personales pueden recopilarse y con qué propósitos serán tratados.</li>
              <li>Qué medidas técnicas y organizativas se aplican para preservar la seguridad y confidencialidad de la información.</li>
              <li>Cómo pueden las personas titulares ejercer sus derechos de acceso, rectificación, actualización, supresión y, cuando corresponda, revocación del consentimiento.</li>
              <li>Cuáles son los canales disponibles para realizar consultas, solicitudes o reclamos relacionados con el tratamiento de sus datos personales.</li>
            </ul>

            <Section title="1. Marco jurídico">
              <p>
                La presente Política se rige por lo dispuesto en la Ley de Protección de Datos
                Personales N.º 25.326, sus normas complementarias (Disposición 07/2010 de la Dirección
                Nacional de Protección de Datos Personales, el Decreto 1558/2001 y la Resolución
                255/2022 de la Agencia de Acceso a la Información Pública) y toda aquella legislación
                que en un futuro complemente o derogue a estas (en adelante la &ldquo;Normativa aplicable&rdquo;).
              </p>
            </Section>

            <Section title="2. Definiciones">
              <p>
                Para la interpretación de la presente Política, los términos que se mencionan en la
                misma se entenderán acorde a las definiciones establecidas en la Normativa actual
                aplicable.
              </p>
            </Section>

            <Section title="3. Consentimiento y su derecho de acceso">
              <p>
                El consentimiento de los titulares de Datos Personales es requisito indispensable para
                que Proactiva Salud recolecte, almacene, consulte, use, procese su información
                personal, ya sean datos personales o sensibles. Se entenderá que el titular ha
                concedido el consentimiento de manera expresa e inequívoca a Proactiva Salud para
                recolectar, almacenar, procesar o transferir sus datos cuando usa o se registra en la
                plataforma de Proactiva Salud, entendiendo que acepta los términos de esta Política,
                así como también los Términos y Condiciones y la Política de Cookies.
              </p>
              <p>El consentimiento del Titular no será necesario cuando se trate de:</p>
              <ul className="list-[lower-roman] pl-5 flex flex-col gap-1.5">
                <li>entrega de información requerida por una entidad pública o administrativa en ejercicio de sus funciones legales o por orden judicial;</li>
                <li>tratamiento sobre datos públicos;</li>
                <li>del tratamiento de información autorizado por la ley para fines históricos, estadísticos o científicos.</li>
              </ul>
            </Section>

            <Section title="4. Ámbito de aplicación">
              <p>
                La presente Política aplica al tratamiento y actividad sobre los datos cuya
                responsabilidad corresponde a Proactiva Salud. Por lo tanto, esta Política no cubre el
                tratamiento que hagan terceros:
              </p>
              <ul className="list-[lower-alpha] pl-5 flex flex-col gap-1.5">
                <li>Información recopilada en páginas, plataformas y/o aplicaciones que no controla Proactiva Salud.</li>
                <li>Información recopilada por terceras partes.</li>
              </ul>
            </Section>

            <Section title="5. Tratamiento de los datos personales">
              <p>
                Las finalidades para las cuales Proactiva Salud tratará los Datos Personales y que
                aplicarán de manera general a todos los titulares son:
              </p>
              <ul className="list-[lower-alpha] pl-5 flex flex-col gap-1.5">
                <li>Cumplir el objeto social de Proactiva Salud.</li>
                <li>Gestionar, administrar y usar toda la información necesaria para el cumplimiento de las obligaciones legales y contractuales de Proactiva Salud, así como las obligaciones tributarias, comerciales, corporativas y contables.</li>
                <li>Realizar análisis sobre los datos recolectados, con fines estadísticos, incluyendo la posibilidad de realizar publicaciones de divulgación educativa, asegurando siempre que se evita la identificación de titulares.</li>
                <li>Guarda de los datos para el cumplimiento de los deberes que como responsable de datos personales le corresponden a Proactiva Salud.</li>
                <li>Recolectar datos para el cumplimiento de los deberes que como responsable de la información y datos personales le corresponden a Proactiva Salud.</li>
                <li>Buscar la satisfacción y el bienestar integral de los titulares respecto de los productos y servicios ofrecidos por Proactiva Salud.</li>
                <li>Prestar mejores beneficios y servicios a los usuarios.</li>
                <li>Personalizar la experiencia de los usuarios en la plataforma de Proactiva Salud.</li>
                <li>Realizar procesos operativos al interior de Proactiva Salud, con fines de desarrollo y/o de administración de sistemas.</li>
                <li>Mantener comunicación con el usuario.</li>
                <li>Dar respuesta a (PQRS) preguntas, quejas, reclamos, consultas, solicitudes o comentarios de los usuarios.</li>
                <li>Realizar seguimiento y rastreo de actividad del usuario a través de la Plataforma, a fin de analizar métricas de comportamiento mediante la utilización de herramientas y software que permitan la mejora y optimización de la experiencia de usuario a través de la Plataforma.</li>
                <li>Identificar y mantener un registro y control de los visitantes, potenciales usuarios y futuros colaboradores, tanto profesionales como administrativos.</li>
                <li>Informar sobre nuevos servicios y/o sobre cambios en los mismos.</li>
                <li>Cumplir con la normativa vigente relacionada con el archivo y custodia de la información.</li>
                <li>Registrar y almacenar la información de los usuarios en las Bases de Datos.</li>
                <li>Transmitir la información y los datos personales a profesionales involucrados en la prestación del servicio ofrecido.</li>
                <li>Transmitir y/o transferir los datos personales del usuario, en Argentina y al exterior, a empresas vinculadas o relacionadas, a proveedores de bienes y servicios y aliados comerciales de la Sociedad, según sea requerido para el cumplimiento de las obligaciones derivadas de las relaciones comerciales, civiles o laborales existentes con los Titulares.</li>
                <li>Evaluar el uso de la Plataforma (de manera anónima e integral), así como realizar estadísticas de las actividades de los visitantes y/o usuarios &mdash;por ejemplo, horas de visitas, frecuencia con las que se visita y sitio web que transfirió a la plataforma&mdash;, de manera que se personalice la experiencia de los titulares en la plataforma.</li>
                <li>Cumplir con aquellos requerimientos hechos por autoridades competentes dentro del marco legislativo nacional.</li>
              </ul>

              <div className="flex flex-col gap-3 mt-2">
                <SubHeading>¿Qué datos personales recopilamos y utilizamos para estas finalidades?</SubHeading>
                <p>
                  Según las funcionalidades utilizadas, el tipo de cuenta y los permisos otorgados,
                  Proactiva Salud podrá recopilar y tratar las siguientes categorías de datos. Hay
                  datos que se le solicitarán a todos los usuarios, y otros datos a los específicamente
                  seleccionados. Esto no significa que todos los datos sean solicitados a todos los
                  usuarios.
                </p>

                <SubHeading>a. Datos de identificación a todos los usuarios</SubHeading>
                <ul className="list-disc pl-5 flex flex-col gap-1.5">
                  <li>Nombre y apellido.</li>
                  <li>Fecha de nacimiento.</li>
                  <li>Nacionalidad.</li>
                  <li>Tipo y número de documento de identidad.</li>
                  <li>Sexo consignado al nacer y/o género, cuando resulte necesario para brindar o personalizar el servicio.</li>
                </ul>

                <SubHeading>b. Datos de contacto a todos los usuarios</SubHeading>
                <ul className="list-disc pl-5 flex flex-col gap-1.5">
                  <li>Domicilio particular.</li>
                  <li>Dirección de correo electrónico.</li>
                  <li>Número de teléfono.</li>
                  <li>Otros medios de contacto proporcionados voluntariamente.</li>
                </ul>

                <SubHeading>c. Datos técnicos, de navegación y uso de la Plataforma</SubHeading>
                <p>
                  Podremos recopilar automáticamente determinada información técnica mediante cookies y
                  tecnologías similares, con el propósito de operar la Plataforma, mejorar su
                  funcionamiento y reforzar su seguridad:
                </p>
                <ul className="list-disc pl-5 flex flex-col gap-1.5">
                  <li>Tipo y modelo del dispositivo electrónico.</li>
                  <li>Sistema operativo e identificadores técnicos.</li>
                  <li>Dirección IP, navegador y versión de la aplicación.</li>
                  <li>Páginas o pantallas visitadas.</li>
                  <li>Tiempo de utilización y recorridos de navegación.</li>
                  <li>Registros de errores, fallos y rendimiento.</li>
                  <li>Ubicación aproximada o precisa, únicamente cuando la funcionalidad lo requiera y el usuario haya otorgado el permiso correspondiente.</li>
                  <li>Identificadores generados mediante cookies o tecnologías similares.</li>
                </ul>
                <p>
                  El uso de estas tecnologías se encontrará detallado en la correspondiente Política de
                  Cookies.
                </p>

                <SubHeading>d. Datos sensibles relacionados con la salud y el bienestar</SubHeading>
                <p>
                  Cuando resulte necesario para brindar los servicios solicitados, Proactiva Salud
                  podrá tratar información relacionada con:
                </p>
                <ul className="list-disc pl-5 flex flex-col gap-1.5">
                  <li>Peso, frecuencia cardíaca, presión arterial y patrones de sueño.</li>
                  <li>Síntomas, antecedentes y observaciones de salud registradas voluntariamente.</li>
                  <li>Notas incorporadas durante consultas o seguimientos profesionales.</li>
                  <li>Actividad física, cantidad de pasos y ejercicios realizados.</li>
                  <li>Alimentación, comidas, hidratación y preferencias alimentarias.</li>
                  <li>Medicamentos, dosis y frecuencia de administración.</li>
                  <li>Cumplimiento y seguimiento de programas o indicaciones profesionales.</li>
                  <li>Estado de ánimo, bienestar emocional y salud mental.</li>
                  <li>Cualquier otra información de salud o bienestar que el usuario decida proporcionar voluntariamente mediante la plataforma, para su mejor evaluación y seguimiento.</li>
                </ul>
              </div>
            </Section>

            <Section title="6. ¿Cómo recopilamos tu información?">
              <p>Recopilamos información personal desde nuestra plataforma y servicios:</p>
              <ul className="list-disc pl-5 flex flex-col gap-1.5">
                <li><strong className="font-semibold text-ink">Información que entrega el usuario directamente.</strong> Esto ocurre cuando te registrás, completás nuestros formularios, o cuando ingresás manualmente datos en la aplicación (como comidas, actividades, estado de ánimo o peso). También incluye las comunicaciones que tenés con nuestro equipo operativo.</li>
                <li><strong className="font-semibold text-ink">Aplicaciones y dispositivos de terceros.</strong> Información que decidís compartir desde otras plataformas que ya usás, como Apple, Google, u otros rastreadores de actividad.</li>
                <li><strong className="font-semibold text-ink">Información de tu proveedor de salud.</strong> Si accedés a Proactiva Salud a través de una empresa, plan de salud, cobertura médica o aseguradora, podemos recibir de ellos la información básica necesaria para confirmar tu elegibilidad y accesos.</li>
                <li><strong className="font-semibold text-ink">Información que recopilamos automáticamente.</strong> Al usar nuestro sitio web o aplicación, recopilamos información técnica (como dirección IP, tipo de dispositivo y datos de navegación) mediante cookies y tecnologías similares. Esto nos ayuda a que la plataforma funcione correctamente, a mejorar tu experiencia y a mantener el servicio seguro.</li>
              </ul>
            </Section>

            <Section title="7. Ejercicio de los derechos sobre los datos personales">
              <p>
                Las personas titulares podrán conocer qué datos personales conserva Proactiva Salud y
                solicitar su acceso, rectificación, actualización, supresión o tratamiento confidencial,
                de acuerdo con la Ley N.º 25.326 y demás normativa aplicable.
              </p>
              <p>
                Cuando corresponda, también podrán solicitar la revocación del consentimiento
                previamente otorgado. Dicha revocación no afectará la legalidad del tratamiento
                realizado con anterioridad ni aquellos tratamientos que deban mantenerse para cumplir
                obligaciones contractuales o legales.
              </p>

              <SubHeading>Presentación de solicitudes</SubHeading>
              <p>Para ejercer estos derechos, la persona titular deberá presentar una solicitud mediante:</p>
              <ul className="list-disc pl-5 flex flex-col gap-1.5">
                <li>
                  Correo electrónico:{' '}
                  <a href="mailto:administracion@proactivasalud.com" className="text-brand font-semibold hover:underline">
                    administracion@proactivasalud.com
                  </a>
                </li>
                <li>Cualquier otro canal que Proactiva Salud habilite e informe en la plataforma.</li>
              </ul>
              <p>La solicitud deberá contener:</p>
              <ul className="list-disc pl-5 flex flex-col gap-1.5">
                <li>Nombre y apellido de la persona titular.</li>
                <li>Tipo y número de documento de identidad.</li>
                <li>Correo electrónico, domicilio u otro medio para recibir la respuesta.</li>
                <li>Indicación clara del derecho que desea ejercer.</li>
                <li>Descripción de los datos personales involucrados.</li>
                <li>Documentación que permita respaldar la solicitud, cuando resulte necesaria.</li>
              </ul>
              <p>
                Para ejercer cualquiera de sus derechos, deberá presentar la solicitud completando el
                formulario disponible escribiendo a{' '}
                <a href="mailto:administracion@proactivasalud.com" className="text-brand font-semibold hover:underline">
                  administracion@proactivasalud.com
                </a>. Se le solicitará la información necesaria para acreditar su identidad y describir
                su petición.
              </p>
              <p>
                Proactiva Salud podrá solicitar información adicional razonable para comprobar la
                identidad y evitar que los datos sean entregados, modificados o eliminados a pedido de
                una persona no autorizada.
              </p>
              <p>
                Cuando la solicitud sea presentada por un representante, este deberá acreditar su
                identidad y acompañar la documentación que demuestre su representación o autorización.
              </p>

              <SubHeading>Plazos de respuesta</SubHeading>
              <p>
                Las solicitudes de acceso serán respondidas dentro de los diez (10) días hábiles desde
                su recepción. Este derecho podrá ejercerse gratuitamente en intervalos no inferiores a
                seis meses, salvo que exista un interés legítimo que justifique solicitarlo antes.
              </p>
              <p>
                Las solicitudes de rectificación, actualización o supresión serán atendidas dentro de
                los cinco (5) días hábiles desde su recepción.
              </p>
              <p>
                Cuando se cuestione la exactitud de un dato, Proactiva Salud podrá bloquearlo o indicar
                que se encuentra en proceso de revisión hasta completar su verificación.
              </p>
              <p>
                La supresión podrá ser rechazada cuando exista una obligación legal de conservar la
                información o cuando eliminarla pudiera perjudicar derechos legítimos de la persona
                titular o de terceros. En ese caso, se comunicarán los motivos correspondientes.
              </p>

              <SubHeading>Reclamos ante la autoridad de control</SubHeading>
              <p>
                Si la persona titular no recibe una respuesta dentro de los plazos indicados, o
                considera que la contestación resulta insuficiente, podrá presentar un reclamo ante la
                Agencia de Acceso a la Información Pública (AAIP) o ejercer la acción judicial de
                hábeas data.
              </p>
              <p>
                La Agencia de Acceso a la Información Pública, en su carácter de órgano de control de la
                Ley N.º 25.326, tiene la atribución de atender las denuncias y reclamos relacionados con
                el incumplimiento de las normas sobre protección de datos personales.
              </p>

              <SubHeading>Disconformidad con las políticas</SubHeading>
              <p>
                Si una persona no desea proporcionar los datos necesarios para registrarse o utilizar
                determinadas funcionalidades, podrá abstenerse de crear una cuenta o solicitar su
                cancelación. La falta de determinados datos podría impedir la prestación de aquellos
                servicios que necesariamente dependan de esa información.
              </p>
            </Section>

            <Section title="8. Medidas de seguridad para la protección de los datos personales y otra información">
              <p>
                Proactiva Salud tomará las medidas necesarias para mantener seguros los datos personales
                de los titulares. Para ello implementa varias medidas de seguridad y privacidad, entre
                las que se incluyen:
              </p>
              <ul className="list-disc pl-5 flex flex-col gap-1.5">
                <li><strong className="font-semibold text-ink">Minimización de datos:</strong> se limita la recopilación y el uso de datos personales a lo estrictamente necesario para proporcionar los servicios.</li>
                <li><strong className="font-semibold text-ink">Ocultación:</strong> se emplean estándares de la industria para proteger los datos confidenciales, incluyendo técnicas de cifrado durante su transmisión y almacenamiento.</li>
                <li><strong className="font-semibold text-ink">Control de acceso:</strong> se restringe el acceso a la información personal, permitiendo su tratamiento únicamente a personal autorizado de Proactiva Salud.</li>
                <li><strong className="font-semibold text-ink">Autenticación:</strong> Proactiva Salud protege las cuentas en línea de los usuarios con métodos de autenticación robustos.</li>
                <li><strong className="font-semibold text-ink">Transparencia:</strong> se informa a los usuarios sobre las prácticas de recopilación y uso de datos de manera clara y accesible.</li>
                <li><strong className="font-semibold text-ink">Cumplimiento:</strong> Proactiva Salud se adhiere a todas las leyes y regulaciones de privacidad aplicables en los territorios donde opera.</li>
              </ul>
              <p>
                Estas medidas se implementan a través de controles técnicos, administrativos y físicos,
                siguiendo los estándares de la industria. Además, Proactiva Salud exige que todo su
                personal cumpla con sus políticas y procedimientos de seguridad. En caso de incluir a
                terceros que ayuden a proporcionar los servicios, estos deberán adoptar medidas de
                seguridad comparables.
              </p>
              <p>
                A pesar de los esfuerzos por proteger la información personal, ningún sistema de
                seguridad es completamente impenetrable. Proactiva Salud no puede garantizar la absoluta
                seguridad de sus sistemas operativos, ni que la información suministrada no será
                interceptada mientras se transmite a través de internet.
              </p>
              <p>
                Se recomienda a los titulares de los datos tomar recaudos para proteger su información
                personal, como mantener la confidencialidad de sus nombres de usuario y contraseñas, y
                cerrar sesión después de usar un dispositivo compartido.
              </p>
              <p>
                En caso de que un usuario hubiera eliminado su cuenta y luego solicitara recuperarla,
                Proactiva Salud seguirá el siguiente procedimiento:
              </p>
              <ul className="list-[lower-alpha] pl-5 flex flex-col gap-1.5">
                <li>Una vez eliminada la cuenta, Proactiva Salud conservará durante 30 días (&ldquo;Plazo de Recupero&rdquo;) la información correspondiente a datos de usuario, en caso de que éste desee reactivar la cuenta.</li>
                <li>Los datos de la cuenta quedarán almacenados durante el Plazo de Recupero, en caso de que el usuario desee reactivar su cuenta.</li>
                <li>
                  En ese caso, el usuario deberá enviar una solicitud a Proactiva Salud desde el correo
                  electrónico de la cuenta asociada. Dicha solicitud debe incluir:
                  <ul className="list-disc pl-5 mt-1.5 flex flex-col gap-1.5">
                    <li>Nombre completo.</li>
                    <li>Nombre de usuario.</li>
                    <li>Fecha aproximada de eliminación de cuenta.</li>
                    <li>Motivo de eliminación y/o recuperación de cuenta.</li>
                    <li>Otro dato de interés a fin de hacer efectivo el recupero.</li>
                  </ul>
                </li>
              </ul>
              <ul className="list-[upper-roman] pl-5 flex flex-col gap-1.5">
                <li>Proactiva Salud se pondrá en contacto con el usuario a fin de solicitar información y/o documentación adicional, a los efectos de verificar la identidad, antes de procesar la solicitud de recupero. Esta información se utilizará exclusivamente para verificar la identidad y no se conservará más allá de este propósito.</li>
                <li>Procesamiento de solicitud: una vez verificados los datos y la identidad, se procederá a restaurar la cuenta y los datos asociados.</li>
                <li>Proactiva Salud se reserva el derecho de aceptar o rechazar el recupero de la cuenta eliminada.</li>
                <li>El recupero de la cuenta eliminada está sujeto a las siguientes limitaciones:</li>
              </ul>
              <ul className="list-disc pl-5 flex flex-col gap-1.5">
                <li><strong className="font-semibold text-ink">Disponibilidad de datos:</strong> si los datos han sido eliminados permanentemente debido al cumplimiento de las políticas de retención de datos, no será posible recuperar la cuenta.</li>
                <li><strong className="font-semibold text-ink">Cambios en la cuenta:</strong> las modificaciones o eliminaciones en datos asociados a la cuenta eliminada son de imposible restauración por parte de Proactiva Salud.</li>
                <li><strong className="font-semibold text-ink">Confirmación de recupero:</strong> una vez procesada la solicitud, el usuario recibirá una confirmación por parte de Proactiva Salud, y podrá acceder a su cuenta o recibir instrucciones para restablecer el acceso.</li>
                <li>Vencido el plazo de recuperación de datos, los datos personales del usuario serán eliminados de nuestra base de datos.</li>
              </ul>
            </Section>

            <Section title="9. Vigencia y modificaciones de la política de tratamiento de datos personales">
              <p>
                La presente Política de Protección de Datos se encuentra vigente a partir del {EFFECTIVE_DATE}.
              </p>
              <p>
                Una vez se cumpla(n) la(s) finalidad(es), y siempre que no exista un deber legal o
                contractual de conservar su información, sus datos serán eliminados de nuestras bases de
                datos. El plazo máximo de conservación de los datos será de 5 años.
              </p>
              <p>
                Cualquier cambio o modificación sustancial de la presente Política será comunicado
                oportunamente a los titulares mediante la publicación en el sitio web de
                proactivasalud.com, donde se pondrá a disposición de los titulares la última versión de
                la misma, indicando la fecha de entrada en vigencia de la correspondiente modificación.
              </p>
            </Section>

          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
