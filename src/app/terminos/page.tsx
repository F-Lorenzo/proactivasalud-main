import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Términos y Condiciones',
  description: 'Términos y Condiciones de uso de la plataforma Proactiva Salud, operada por Gestar Salud S.R.L.',
  alternates: { canonical: '/terminos' },
  openGraph: { url: '/terminos', title: 'Términos y Condiciones — Proactiva Salud' },
}

const LAST_UPDATED = '1 de septiembre de 2026'

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

export default function TerminosPage() {
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
              Términos y Condiciones de Uso de la Plataforma Proactiva Salud
            </h1>
            <p className="font-body text-sm text-muted">
              Última actualización: {LAST_UPDATED}
            </p>
          </div>
        </section>

        {/* ── Content ── */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 flex flex-col gap-10">

            <Section title="1. Aspectos generales">
              <p>
                Proactiva Salud es una plataforma digital de bienestar, prevención y acompañamiento
                humano o inteligente, que permite a los usuarios mejorar su calidad de vida, con un
                monitoreo permanente y la promoción de hábitos saludables. En este sentido, el usuario
                entiende y acepta que Proactiva Salud no es una plataforma de telemedicina, sino un
                medio alternativo que, según el plan elegido, brinda acompañamiento personalizado con
                profesionales a través de la app o asistencia digital mediante un procesador
                inteligente. El secreto profesional y la intangibilidad de los datos recopilados por el
                profesional tienen absoluta confidencialidad de información y de los datos personales de
                los usuarios.
              </p>
              <p>
                Estos Términos y Condiciones de uso de la Plataforma digital reflejan todos los términos
                y condiciones aplicables al uso de nuestro sitio web{' '}
                <Link href="/" className="text-brand font-semibold hover:underline">
                  www.proactivasalud.com
                </Link>
                , regulando el uso que cualquier persona que acceda y utilice la plataforma.
              </p>
              <p>
                Es responsabilidad del usuario leer atentamente estos Términos y Condiciones antes de
                comenzar a usar la plataforma. Al acceder se entiende que el usuario ha leído, entendido
                y aceptado estos Términos y Condiciones, que son legalmente vinculantes. Queda
                expresamente establecido que, si el usuario no acepta estos Términos y Condiciones o si
                es menor de 18 años, no debe usar de ninguna manera la Plataforma de Proactiva Salud.
              </p>
              <p>
                Este documento contiene información legal, de carácter obligatorio y vinculante, que
                debe ser leída y aceptada completamente en conjunto con la{' '}
                <a href="/privacidad" className="text-brand font-semibold hover:underline">
                  Política de Protección de Datos Personales
                </a>{' '}
                disponible en la Plataforma.
              </p>
            </Section>

            <Section title="2. De la información">
              <p>
                La Plataforma digital es operada por Gestar Salud S.R.L., CUIT 30-71466105-8, con
                domicilio en Sarmiento 4340, Piso 5º, Ciudad Autónoma de Buenos Aires, cuyo único
                propietario de la marca Proactiva Salud es Hugo Daniel Lorenzo, DNI 13.799.321, que
                para los efectos de los presentes términos se denominará Proactiva Salud, y se encuentra
                constituida bajo la legislación de la República Argentina.
              </p>
            </Section>

            <Section title="3. Naturaleza jurídica">
              <p>
                Los presentes Términos y Condiciones de uso regulan la relación contractual de carácter
                comercial que vincula al usuario con Proactiva Salud, controlada por Gestar Salud S.R.L.
              </p>
            </Section>

            <Section title="4. Aceptación de términos y condiciones, consentimiento del usuario">
              <p>
                Toda vez que el usuario use los servicios de Proactiva Salud, da su conformidad,
                manifiesta y admite haber leído y entendido los presentes Términos y Condiciones, y está
                de acuerdo con sujetarse a los mismos y cumplir con todas las leyes y reglamentos
                aplicables que hagan parte de la legislación de la República Argentina. En caso de que el
                usuario no esté de acuerdo con estos Términos y Condiciones, deberá abstenerse y
                descartar por completo la posibilidad de usar la Plataforma de Proactiva Salud, por
                cuanto esta se reserva el derecho a actualizar o cambiar los Términos y Condiciones en
                cualquier momento sin aviso previo al usuario y/o visitante.
              </p>
              <p>
                La plataforma puede ser utilizada únicamente bajo los presentes Términos y Condiciones.
                El uso de los servicios que brinda la plataforma se realizará bajo la única y exclusiva
                responsabilidad del usuario. La plataforma de Proactiva Salud puede ser utilizada
                únicamente de manera lícita, no pudiendo hacerlo por fuera de lo previsto en la
                legislación. Están prohibidas las actividades que impliquen el uso indebido de la
                plataforma, tales como falsear la identidad del usuario, como así también llevar a cabo
                actividades ilícitas a través de la misma.
              </p>
              <p>
                Proactiva Salud se reserva el derecho de negar o suspender el acceso a la plataforma por
                parte de cualquier usuario que desconozca los Términos y Condiciones expresados en el
                presente, sin necesidad de notificación previa y sin que ello genere algún derecho a
                indemnización o resarcimiento.
              </p>
              <p>
                Al usar los servicios de la Plataforma y aceptar estos Términos y Condiciones, el usuario
                brinda consentimiento expreso a Proactiva Salud para:
              </p>
              <ul className="list-[lower-alpha] pl-5 flex flex-col gap-1.5">
                <li>Tratar documentación que el usuario brinde a los profesionales.</li>
                <li>Usar tecnología para la prestación de servicios ofrecidos.</li>
                <li>Proporcionar información a los profesionales.</li>
                <li>Coordinar videollamadas, video o grabaciones.</li>
                <li>Acceder a la identidad del usuario, brindando sus datos y su ubicación geográfica.</li>
                <li>Enviar publicidad sobre servicios de Proactiva Salud.</li>
              </ul>
            </Section>

            <Section title="5. Condiciones de uso de la plataforma digital">
              <p>
                El ingreso y/o uso de la Plataforma por parte del usuario deberá hacerse teniendo en
                cuenta las siguientes condiciones particulares, por las cuales este último se obliga a
                mantener indemne de toda acción a Proactiva Salud, por lo que se obliga a:
              </p>
              <ul className="list-[lower-alpha] pl-5 flex flex-col gap-1.5">
                <li>Respetar estos Términos y Condiciones de uso, así como cualquier otra condición establecida en la plataforma.</li>
                <li>Cumplir con todas las leyes, normas y reglamentos aplicables al acceso, uso y consulta de sitios en internet.</li>
                <li>Mantener indemne a Proactiva Salud por reclamos de terceros que surjan por cualquier acto ilícito o lesivo contra la plataforma, que pueda generar o causar perjuicio legal o impedir el normal funcionamiento de esta.</li>
                <li>Facilitar y proporcionar información real solicitada, actualizada, completa y verdadera.</li>
                <li>Mantener actualizada la información proporcionada.</li>
                <li>Aceptar todos los riesgos de acceso no autorizado a su cuenta.</li>
                <li>Recibir y aceptar las comunicaciones enviadas por Proactiva Salud, disponible en la Plataforma.</li>
              </ul>
              <p>
                El usuario brinda total consentimiento y facultad a Proactiva Salud para tratar sus datos
                personales y sensibles cuando se requiera y sea necesario, para el correcto
                funcionamiento de la Plataforma, con la finalidad de brindar una correcta prestación de
                servicios.
              </p>
              <p>
                El usuario se compromete a utilizar la plataforma, sus servicios y contenidos en un todo
                de acuerdo con la legislación aplicable de la República Argentina, para su uso personal,
                atendiendo la buena fe y el orden público.
              </p>
              <p>
                El usuario puede informar su deseo de no ser contactado a los efectos de envíos de
                información publicitaria, enviando un correo electrónico a la cuenta{' '}
                <a href="mailto:administracion@proactivasalud.com" className="text-brand font-semibold hover:underline">
                  administracion@proactivasalud.com
                </a>. En todo caso, los datos personales del usuario serán utilizados por Proactiva Salud
                para fines exclusivamente operativos y logísticos que incluyan la respectiva facturación
                por suscripción u otra circunstancia que así lo amerite.
              </p>
              <p>
                El usuario de la plataforma responderá por cualquier perjuicio o daño causado a Proactiva
                Salud por el uso indebido de esta y por cualquier violación e incumplimiento de estos
                Términos y Condiciones de uso.
              </p>
              <p>
                Proactiva Salud no confiere al usuario ninguna licencia para descargar, reproducir,
                copiar, compilar, publicar, adaptar, modificar, transmitir, vender ni comunicar al
                público, total o parcialmente, ninguna de las herramientas y/o contenido de la
                Plataforma. Cualquiera de estas circunstancias requiere de la autorización previa y
                expresa por escrito de Proactiva Salud. En caso de incurrir en algún acto de violación a
                los derechos de propiedad industrial y derechos de autor, deberá someterse a los efectos
                civiles y penales de tal evento.
              </p>
              <p>
                La entrega de información por parte del usuario, para la creación de su perfil y/o la
                información necesaria para acceder a cualquier producto y/o servicio, será
                responsabilidad únicamente del usuario. Errores en la escritura y veracidad de la
                información no generarán responsabilidad alguna a Proactiva Salud, y el usuario será el
                único responsable por las consecuencias que la indebida proporción de información pueda
                generar en la prestación del servicio. El usuario tiene el derecho de solicitar el cambio
                de los datos personales introducidos en la plataforma, siguiendo el proceso descrito en
                la{' '}
                <a href="/privacidad" className="text-brand font-semibold hover:underline">
                  Política de Privacidad de Datos
                </a>{' '}
                de Proactiva Salud, publicada en la plataforma.
              </p>
              <p>
                Toda vez que navegue por el sitio y utilice los servicios de la plataforma, y exprese sus
                opiniones y comentarios, y/o participe en forma interactiva de alguno de los servicios
                ofrecidos en el mismo, el usuario se compromete a no enviar o transmitir contenido alguno
                que:
              </p>
              <ul className="list-[lower-alpha] pl-5 flex flex-col gap-1.5">
                <li>Induzca a actuar en forma ilegal o constituya en sí mismo infracciones a la legislación vigente en la República Argentina.</li>
                <li>Perjudique, impida o dañe de cualquier forma la utilización y normal funcionamiento de la plataforma, directa o indirectamente, o atente contra los mismos o contra cualquier derecho de un tercero.</li>
                <li>No está permitido incorporar elementos, contenidos, mensajes, formatos o fotografías de contenido ilícito, violento, difamatorio, pornográfico, degradante o irrespetuoso de los miembros de la comunidad o de terceros. Tampoco está permitido realizar estas actividades con fines publicitarios o comerciales.</li>
              </ul>
              <p>
                Proactiva Salud se reserva el derecho de suspender, interrumpir, suprimir contenidos o
                prohibir el acceso a quienes infrinjan estas normas, pudiendo hacerlo sin previo aviso en
                aquellos casos en que lo considere especialmente necesario por la gravedad del caso.
              </p>
            </Section>

            <Section title="6. Cuenta de usuario">
              <p>
                Para poder acceder a algunas funcionalidades de la plataforma es necesario el registro
                por parte del usuario. El perfil o cuenta de usuario creado es la cuenta personal y única
                que acredita el registro en la plataforma, cuya información personal proporcionada por el
                usuario a Proactiva Salud puede llegar a incluir nombre y apellido/s, número de
                documento, fecha de nacimiento, dirección, teléfono, correo electrónico, estado de salud
                previo y demás información requerida para la correcta identificación y atención
                profesional del mismo.
              </p>
              <p>
                Asimismo, cuando el usuario esté dentro de su perfil, y deba completar los datos
                requeridos por la plataforma para configurar su estado de salud, los mismos deberán ser
                fidedignos, no pudiendo incorporar datos falsos, a los efectos de obtener objetivos
                desacertados que afecten la eficaz evolución del usuario. Por cuanto es responsabilidad
                absoluta del usuario, los datos incorporados a dicho perfil.
              </p>
            </Section>

            <Section title="7. Condiciones de acceso">
              <p>
                El acceso a la plataforma permite acceder a toda la información, productos y servicios
                contenidos en ella. El acceso a los servicios requiere una autenticación del usuario
                identificado, previo diligenciamiento de un formulario básico de conocimiento del mismo
                para usar la plataforma.
              </p>
            </Section>

            <Section title="8. Reservas y responsabilidad de Proactiva Salud">
              <p>
                El uso de la Plataforma será bajo el propio riesgo del usuario. Proactiva Salud no
                garantiza que las funciones técnicas y de operación de la Plataforma se brinden sin
                interrupciones o libres de errores; no obstante, llevará a cabo las acciones que, de
                acuerdo a sus posibilidades, le permitan mantener el buen funcionamiento de la
                Plataforma. Proactiva Salud no será responsable por ningún perjuicio que resulte de la
                imposibilidad de acceso o defectuoso funcionamiento de la misma. Proactiva Salud no es ni
                será responsable por las caídas de la Plataforma y la falla en el suministro del
                servicio, quedando exonerada por cualquier tipo de daño o perjuicio causado debido a la
                no disponibilidad y/o interrupción del servicio que sean ajenos a su voluntad.
              </p>
              <p>
                Los daños y perjuicios causados por virus informáticos, troyanos, código malicioso o
                cualesquiera otros sistemas físicos o lógicos a los sistemas de los usuarios no serán
                responsabilidad de Proactiva Salud.
              </p>
            </Section>

            <Section title="9. Proactiva Salud no proporciona asesoramiento médico ni brinda telemedicina">
              <p>
                Proactiva Salud no realiza asesoramiento médico, no prescribe medicamentos, no realiza
                diagnósticos ni tratamientos médicos. La plataforma tiene como objetivo acercar a
                usuarios profesionales de la salud para brindar información acerca de cómo llevar una
                vida más saludable y activa. Proactiva Salud ofrece dentro de sus servicios teleasistencia
                virtual, información y seguimiento relacionado con el bienestar integral y la prevención,
                con acompañamiento humano o inteligente según el plan al cual accede el usuario. El
                acceso a la plataforma y el uso de los servicios no crea una relación profesional con
                licencia entre el usuario y Proactiva Salud.
              </p>
              <p>
                Proactiva Salud no ofrece garantía alguna de que la plataforma satisfaga las necesidades
                y expectativas del usuario. Cualquier información que obtenga a través de la plataforma
                debido a los servicios es proporcionada únicamente por los profesionales. Proactiva Salud
                actúa simplemente como un conducto y coordinación para dicha información. La Plataforma
                NO es una vía de contacto para emergencias médicas; en esos casos el usuario deberá
                llamar a su cobertura médica o al 911, siendo el usuario el único responsable de
                determinar la idoneidad del proveedor de servicios de salud para sus necesidades.
              </p>
            </Section>

            <Section title="10. Profesionales, cumplimiento con leyes y regulación aplicables">
              <p>
                Proactiva Salud y el profesional han pactado que el cumplimiento de sus obligaciones en
                virtud del convenio de prestación de servicios profesionales que los une no constituye ni
                crea relación alguna entre ellos que pudiera exceder del mismo y/o implicar la existencia
                de una sociedad de personas o cualquier otra clase de asociación temporal o permanente,
                no pudiendo ninguno de ellos pretender la representación del otro, salvo que exista
                permiso explícito notificado de forma fehaciente.
              </p>
              <p>
                Proactiva Salud pone a disposición de los usuarios un espacio virtual de autogestión para
                acceder a diversos servicios. Proactiva Salud actúa únicamente como coordinador operativo
                en el perfeccionamiento de las operaciones realizadas entre los usuarios y los
                prestadores de salud, quienes conocen y aceptan ser los exclusivos responsables de los
                datos personales ingresados y de los servicios ofrecidos y/o prestados. Los profesionales
                asumen la responsabilidad y obligación de contar con las credenciales habilitantes para
                el ejercicio profesional, además de cumplir con toda la normativa vigente y aplicable al
                desempeño de su profesión.
              </p>
              <p>
                Al brindar el consentimiento, el usuario permite que Proactiva Salud proporcione
                información a los profesionales para asegurar una correcta prestación de servicios.
                Proactiva Salud no proporciona asesoramiento legal, comercial o de cualquier otro tipo a
                los profesionales. Proactiva Salud no participa en la relación entre los profesionales y
                los usuarios. El profesional reconoce y acepta que Proactiva Salud no es parte en ninguna
                relación de servicios, ni tiene control sobre la calidad, la veracidad o exactitud de los
                servicios prestados por este último.
              </p>
              <p>
                Si en la Plataforma de Proactiva Salud los profesionales comparten casos concretos con
                resultados positivos, al usuario se le informa que Proactiva Salud no garantiza tales
                resultados, sino los que el usuario esté dispuesto a conseguir adhiriendo de manera
                correcta a la propuesta presentada por el profesional. &ldquo;Los resultados referidos
                pertenecen a casos particulares, pueden variar entre personas y no constituyen una
                garantía de resultados similares.&rdquo; Proactiva Salud no tiene la capacidad de garantizar
                que el profesional cumplirá con las expectativas del usuario. El usuario y el profesional
                asumen la responsabilidad de cumplir con la programación y el cumplimiento de los
                programas establecidos, citas u obligaciones que surjan del uso estricto de los servicios
                que brinda la Plataforma.
              </p>
            </Section>

            <Section title="11. Cookies">
              <p>
                Se entiende por cookies, a los efectos de estos Términos y Condiciones, a pequeños
                archivos de texto enviados por un sitio y que se guardan en el disco duro del dispositivo
                electrónico a través del cual se accede al mismo. La mayoría de los navegadores aceptan
                cookies automáticamente.
              </p>
              <p>
                La plataforma hace uso de cookies propias y de terceros a los efectos de optimizar la
                experiencia de navegación del usuario.
              </p>
              <p>
                Proactiva Salud hará uso de cookies para determinar las preferencias de navegación del
                usuario para efectos promocionales, comerciales y publicitarios, para efectos
                estadísticos, entre otros fines. Al aceptar estos Términos y Condiciones, el usuario
                acepta que Proactiva Salud utilice cookies para los fines aquí mencionados. El uso y
                navegación continua en la Plataforma se entenderá como aceptación de los Términos y
                Condiciones y, como consecuencia, del uso de las cookies.
              </p>
              <p>
                No obstante, el usuario podrá configurar su navegador para que notifique y rechace la
                instalación de las cookies enviadas por la plataforma. Sin embargo, tenga en cuenta que
                al desactivar el uso de cookies usted podrá experimentar una disminución en el correcto
                funcionamiento de la plataforma.
              </p>
            </Section>

            <Section title="12. Herramientas de análisis y rastreo">
              <p>
                Proactiva Salud utiliza herramientas tecnológicas de análisis y rastreo de terceros, para
                mejorar la experiencia del usuario, optimizar el rendimiento de la plataforma y analizar
                el comportamiento de los usuarios.
              </p>
              <p>
                Estas herramientas pueden recopilar información sobre su dispositivo, su navegación
                dentro de la aplicación y otras interacciones con nuestro servicio. Esto puede incluir:
              </p>
              <ul className="list-disc pl-5 flex flex-col gap-1.5">
                <li>Dirección IP.</li>
                <li>Tipo de dispositivo.</li>
                <li>Sistema operativo.</li>
                <li>Páginas visitadas y duración de la visita.</li>
                <li>Acciones realizadas dentro de la aplicación (por ejemplo, clics, desplazamientos).</li>
                <li>Información de ubicación aproximada.</li>
              </ul>
              <p>
                Proactiva Salud, a su vez, utiliza distintas herramientas tecnológicas para realizar el
                seguimiento del comportamiento del usuario a partir del servidor. El usuario, al aceptar
                estos Términos y Condiciones, declara conocer y aceptar que, aun en el caso en que se
                desactive la utilización de cookies, Proactiva Salud podrá continuar registrando su
                actividad a través de la Plataforma.
              </p>
              <p>Los datos recopilados pueden ser utilizados, entre otros fines, para:</p>
              <ul className="list-disc pl-5 flex flex-col gap-1.5">
                <li>Analizar el comportamiento de los usuarios respecto a la plataforma.</li>
                <li>Mejorar las funcionalidades de la plataforma.</li>
                <li>Identificar y corregir errores y problemas de rendimiento.</li>
                <li>Desarrollar y probar nuevas funciones o aplicaciones.</li>
              </ul>
              <p>
                Proactiva Salud podrá compartir la información con otras empresas de servicios o sitios
                de internet o similares, a los fines de cumplir con las finalidades antes descritas.
                Generalmente, las empresas o sitios de internet poseen sus propias políticas de
                privacidad de datos y protección. De todas maneras, Proactiva Salud dedicará el trabajo
                necesario para que la privacidad de la información compartida sea protegida conforme a
                la legalidad vigente en cada momento.
              </p>
              <p>
                En los casos que corresponda, Proactiva Salud intentará firmar acuerdos expresos en
                materia de protección de datos y de privacidad de la información con las empresas que
                correspondan. Sin perjuicio de ello, Proactiva Salud no será responsable por los daños
                provocados por tales empresas y/o sitios de internet en cuanto a su deber de protección,
                confidencialidad y privacidad de los datos que ellas manejan.
              </p>
              <p>
                Las herramientas de rastreo y seguimiento establecen cookies en el navegador de un
                visitante cuando este accede a un sitio web que carga el código de seguimiento de estas.
                Estas cookies permiten que el código de seguimiento de las herramientas funcione
                correctamente. Además de las cookies, el código de seguimiento también utiliza
                almacenamiento local y de sesión.
              </p>
              <p>
                Al aceptar los Términos y Condiciones, el usuario acepta y declara conocer los alcances y
                las funcionalidades de las herramientas de rastreo y seguimiento.
              </p>
            </Section>

            <Section title="13. Enlaces y sitios de servicios a terceros">
              <p>
                La plataforma podrá contener enlaces o accesos a sitios web, aplicaciones, contenidos o
                servicios administrados por terceros, incorporados únicamente para ampliar la
                información disponible o facilitar el acceso de los usuarios.
              </p>
              <p>
                Al ingresar a dichos sitios, el usuario abandona el entorno controlado por Proactiva
                Salud. En consecuencia, la navegación y el uso de esos servicios estarán sujetos a sus
                propios Términos y Condiciones y Políticas de Privacidad, cuya lectura se recomienda
                antes de proporcionar información personal. Proactiva Salud no administra ni controla los
                sitios externos y, por lo tanto, no garantiza su disponibilidad, seguridad, exactitud,
                legalidad o actualización. La inclusión de un enlace no supone asociación, patrocinio,
                recomendación ni conformidad con sus contenidos.
              </p>
              <p>
                Los textos, imágenes, marcas y demás materiales disponibles en esos sitios pertenecen a
                sus respectivos titulares. Cada tercero será responsable por sus contenidos, servicios y
                prácticas de tratamiento de datos personales. Proactiva Salud no responderá por daños
                derivados del acceso o utilización de sitios externos, excepto por aquellas
                responsabilidades que no puedan excluirse conforme a la legislación vigente.
              </p>
            </Section>

            <Section title="14. Datos de dispositivos móviles">
              <p>
                Cuando los usuarios descargan, instalan o utilizan la plataforma en sus teléfonos
                celulares u otros dispositivos, Proactiva Salud recopila automáticamente información que
                incluye, sin limitación, los proveedores de telefonía, un identificador de dispositivo
                único, información de geolocalización (si el usuario lo permite), los tipos de
                dispositivos móviles que acceden a la Plataforma, y el tipo de sistemas operativos que
                acceden a la Plataforma (conjuntamente, &ldquo;Datos de dispositivos móviles&rdquo;). Un
                identificador de dispositivo único es una cadena de caracteres alfanuméricos (similar a
                un número de serie) utilizada para identificar y distinguir en forma única cada teléfono
                móvil u otro dispositivo de comunicación inalámbrico. Los servicios de ubicación se
                pueden habilitar o deshabilitar en cualquier momento, a través de los ajustes de los
                dispositivos móviles. Proactiva Salud utiliza los Datos de dispositivos móviles para
                comprender los patrones de uso y mejorar la Plataforma.
              </p>
            </Section>

            <Section title="15. Política de privacidad">
              <p>
                El tratamiento de la información y de los datos personales proporcionados por usuarios se
                regirá por la{' '}
                <a href="/privacidad" className="text-brand font-semibold hover:underline">
                  Política de Protección de Datos Personales
                </a>. Al registrarse, acceder o utilizar la plataforma, el usuario declara haber leído la
                forma en que sus datos son recopilados, utilizados, almacenados y protegidos, así como
                sobre los derechos que puede ejercer respecto de ellos.
              </p>
            </Section>

            <Section title="16. Reportes y denuncias">
              <p>
                Los usuarios podrán reportar a Proactiva Salud cualquier conducta o contenido que pueda
                infringir estos Términos y Condiciones, la{' '}
                <a href="/privacidad" className="text-brand font-semibold hover:underline">
                  Política de Protección de Datos Personales
                </a>{' '}
                o la legislación aplicable. Para tal efecto, la plataforma contará con los canales
                idóneos para formular la respectiva PQRS (Peticiones, Quejas, Reclamos y Sugerencias).
                Recibida la solicitud, Proactiva Salud determinará si corresponde la eliminación o
                modificación del contenido.
              </p>
            </Section>

            <Section title="17. Modificaciones, suspensión y finalización de los servicios">
              <p>
                Proactiva Salud podrá actualizar, incorporar, sustituir o retirar funcionalidades y
                contenidos de la plataforma cuando existan razones técnicas, operativas, comerciales,
                legales o de seguridad. Estas modificaciones no afectarán los derechos adquiridos ni las
                prestaciones ya contratadas por los usuarios, salvo cuando resulte indispensable por
                motivos legales o de fuerza mayor.
              </p>
              <p>
                Los cambios sustanciales realizados en estos Términos y Condiciones serán informados
                mediante la Plataforma, por correo electrónico o a través de otro medio de contacto
                registrado. La comunicación indicará la fecha de entrada en vigencia y, cuando
                corresponda, se solicitará una nueva aceptación.
              </p>
              <p>
                Si el usuario no estuviera de acuerdo con las modificaciones, podrá dejar de utilizar la
                plataforma y solicitar la cancelación de su cuenta o suscripción, conforme a las
                condiciones del servicio contratado.
              </p>
              <p>
                Proactiva Salud podrá suspender o finalizar servicios por razones justificadas,
                procurando comunicarlo con una anticipación razonable de treinta (30) días, excepto
                cuando resulte necesaria una actuación inmediata por motivos de seguridad,
                incumplimiento, fraude, exigencias legales o fuerza mayor.
              </p>
              <p>
                La cancelación de una cuenta no generará automáticamente un derecho a indemnización, sin
                perjuicio de los reintegros que correspondan por servicios pagados y no prestados, y de
                los demás derechos reconocidos por la legislación vigente.
              </p>
            </Section>

            <Section title="18. Procesamiento de pagos y protección de la información financiera">
              <p>
                <strong className="font-semibold text-ink">Medios de pago.</strong> Proactiva Salud podrá
                habilitar diferentes medios y proveedores para el cobro de sus servicios. Las opciones
                disponibles serán informadas al usuario antes de confirmar cada contratación. Las
                operaciones estarán sujetas, además, a los términos, condiciones y políticas de
                privacidad del proveedor de pagos seleccionado.
              </p>
              <p>
                <strong className="font-semibold text-ink">Procesamiento de las operaciones.</strong> Los
                pagos podrán ser gestionados por plataformas externas, debidamente habilitadas. La
                autorización, acreditación, rechazo o demora de cada operación dependerá del proveedor
                utilizado y de la entidad financiera correspondiente.
              </p>
              <p>
                <strong className="font-semibold text-ink">Conservación del medio de pago.</strong> Cuando
                esta función se encuentre disponible, el usuario podrá solicitar que su medio de pago
                quede asociado a su cuenta, para facilitar compras o cobros recurrentes. Los datos serán
                almacenados o tokenizados por el proveedor de pagos, conforme a sus medidas de seguridad
                y a los estándares aplicables de la industria, incluido PCI DSS. Proactiva Salud no
                almacenará ni tendrá acceso al número completo de la tarjeta ni a su código de seguridad
                &mdash;CVV o CVC&mdash;. Para futuras operaciones podrá utilizarse una credencial digital
                o token suministrado por el procesador de pagos.
              </p>
              <p>
                <strong className="font-semibold text-ink">Pagos recurrentes.</strong> Al contratar una
                suscripción, el usuario autoriza el cobro total anual de la misma, o periódico si así lo
                dispone e informa previamente, correspondiente al plan, precio y frecuencia informados
                antes de completar la contratación. Esta autorización permanecerá vigente hasta que se
                cancele la suscripción según las condiciones aplicables.
              </p>
              <p>
                <strong className="font-semibold text-ink">Responsabilidad del usuario.</strong> El
                usuario deberá proporcionar información de pago verdadera, completa y actualizada, y
                utilizar únicamente medios de pago habilitados sobre los cuales tenga autorización.
                Asimismo, deberá comunicar cualquier operación desconocida o utilización no autorizada a
                su entidad financiera, al proveedor de pagos y a Proactiva Salud.
              </p>
              <p>
                <strong className="font-semibold text-ink">Seguridad.</strong> Proactiva Salud adoptará
                medidas técnicas y organizativas razonables para proteger los datos que se encuentren
                bajo su responsabilidad. Sin embargo, ningún sistema informático o transmisión realizada
                por internet puede garantizar una seguridad absoluta.
              </p>
              <p>
                <strong className="font-semibold text-ink">Uso de la información.</strong> La información
                vinculada con los pagos será utilizada únicamente para gestionar cobros, renovaciones,
                reintegros, facturación, prevención de fraudes y cumplimiento de obligaciones legales.
                Podrá comunicarse a proveedores de pagos habilitados, entidades financieras o autoridades
                cuando resulte necesario para dichas finalidades o sea exigido legalmente.
              </p>
              <p>
                <strong className="font-semibold text-ink">Eliminación del medio de pago.</strong> El
                usuario podrá desvincular un medio de pago desde su cuenta, cuando la funcionalidad esté
                disponible, o solicitar asistencia a través de los canales de contacto de Proactiva
                Salud. La eliminación no afectará las operaciones ya procesadas ni los comprobantes que
                deban conservarse por obligaciones contables, fiscales o legales.
              </p>
            </Section>

            <Section title="19. Suscripciones y cobros recurrentes">
              <p>
                Proactiva Salud ofrece servicios bajo suscripción periódica (mensual, trimestral, anual u
                otros), con cobros recurrentes automáticos mediante proveedor de pago debidamente
                habilitado. Al contratar una suscripción, el usuario autoriza estos cobros recurrentes en
                su tarjeta o medio registrado al efecto.
              </p>
              <p>
                <strong className="font-semibold text-ink">Renovación automática.</strong> Al aceptar
                estos Términos y Condiciones, el usuario brinda su consentimiento expreso para la
                renovación automática de su suscripción y el cobro periódico correspondiente al medio de
                pago registrado. La suscripción se renovará automáticamente al final de cada ciclo, salvo
                comunicación y/o cancelación con al menos 72 hs de antelación. La gestión podrá hacerse
                desde la cuenta del usuario o por contacto directo con soporte.
              </p>
              <p>
                <strong className="font-semibold text-ink">Modificación de precios.</strong> Los usuarios
                reconocen y aceptan que Proactiva Salud podrá modificar los precios de los planes. Estos
                cambios serán informados previamente al usuario con una antelación de 15 días y por
                correo electrónico registrado por el usuario en la plataforma. Toda vez que el usuario
                continúe utilizando el servicio luego de dicho aviso, y de no cancelarlo por el mismo
                medio, se considerará que acepta el nuevo precio del plan.
              </p>
              <p>
                <strong className="font-semibold text-ink">Fallos en el cobro.</strong> En caso de fallo
                en el cobro (por ejemplo, tarjeta vencida o fondos insuficientes), se podrán realizar
                nuevos intentos. Si no se regulariza el pago, Proactiva Salud podrá suspender
                automáticamente el acceso al servicio del usuario.
              </p>
              <p>
                <strong className="font-semibold text-ink">Cancelaciones y reembolsos.</strong> El
                usuario podrá cancelar su suscripción en cualquier momento avisando a Proactiva Salud con
                72 hs de anticipación. La cancelación tendrá efecto al finalizar el período ya abonado, y
                no dará lugar a reembolsos, salvo excepciones definidas en políticas específicas a
                criterio de Proactiva Salud.
              </p>
              <p>
                <strong className="font-semibold text-ink">Declaración de conformidad.</strong> Al
                confirmar el proceso de pago o contratar una suscripción, el usuario declara expresamente
                haber leído, comprendido y aceptado en su totalidad los presentes Términos y Condiciones,
                prestando igualmente su consentimiento expreso para la autorización de débitos
                recurrentes en el medio de pago registrado, así como para la aplicación de la política de
                renovación automática previamente estipulada.
              </p>
            </Section>

            <Section title="20. Términos y condiciones legales">
              <p>
                Los presentes Términos y Condiciones serán administrados e interpretados de acuerdo con
                las leyes de la República Argentina, sin dar efecto a ningún principio de conflicto de
                leyes.
              </p>
              <p>
                <strong className="font-semibold text-ink">De los usuarios extranjeros.</strong> Si usted
                contrata los servicios de Proactiva Salud y está radicado fuera de Argentina, su
                información será transferida a la República Argentina y procesada aquí, en los términos y
                condiciones establecidos a tal efecto. Al proporcionar sus datos personales utilizando la
                plataforma, usted da su consentimiento para que Proactiva Salud realice las acciones
                descriptas en el presente documento y en su{' '}
                <a href="/privacidad" className="text-brand font-semibold hover:underline">
                  Política de Protección de Datos Personales
                </a>.
              </p>
              <p>
                Los usuarios de Proactiva Salud se someten a la jurisdicción de los Tribunales Ordinarios
                de la Ciudad Autónoma de Buenos Aires, República Argentina, renunciando a cualquier otro
                fuero o jurisdicción que pudiera corresponderles.
              </p>
              <p>
                Estos Términos y Condiciones y la{' '}
                <a href="/privacidad" className="text-brand font-semibold hover:underline">
                  Política de Protección de Datos Personales
                </a>{' '}
                constituyen el acuerdo completo entre el usuario y Proactiva Salud, con respecto a los
                servicios, productos, uso y contenido de la plataforma. Si alguna disposición de estos
                Términos y Condiciones es declarada ilegal, presenta un vacío o por cualquier razón
                resulta inaplicable, la misma deberá ser interpretada dentro del marco del mismo y, en
                cualquier caso, no afectará la validez y aplicabilidad de las disposiciones restantes.
              </p>
            </Section>

            <Section title="21. Domicilio">
              <p>
                Por infracciones cometidas por Proactiva Salud, se fija domicilio en Sarmiento 4340, Piso
                5º, Ciudad Autónoma de Buenos Aires, República Argentina.
              </p>
            </Section>

          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
