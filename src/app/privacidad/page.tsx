import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Política de Privacidad — Proactiva Salud',
  description: 'Cómo Proactiva Salud recolecta, utiliza y protege tus datos personales, conforme a la Ley 25.326 de Protección de Datos Personales.',
}

const LAST_UPDATED = '16 de julio de 2026'

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
              Política de Privacidad
            </h1>
            <p className="font-body text-sm text-muted">
              Última actualización: {LAST_UPDATED}
            </p>
          </div>
        </section>

        {/* ── Content ── */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 flex flex-col gap-10">

            <Section title="1. Responsable del tratamiento">
              <p>
                Proactiva Salud ("nosotros") es responsable del tratamiento de los datos personales que
                recolectamos a través de este sitio web y de nuestra plataforma (en conjunto, la
                "Plataforma"). Esta Política de Privacidad describe qué datos recolectamos, con qué
                finalidad los utilizamos, con quién los compartimos y qué derechos tenés como titular
                de esos datos.
              </p>
            </Section>

            <Section title="2. Marco normativo">
              <p>
                Tratamos tus datos personales de conformidad con la Ley 25.326 de Protección de Datos
                Personales y su Decreto Reglamentario 1558/2001, bajo el control de la Agencia de Acceso
                a la Información Pública (AAIP), autoridad de aplicación en la República Argentina.
              </p>
            </Section>

            <Section title="3. Qué datos recolectamos">
              <p>Según cómo interactúes con la Plataforma, podemos recolectar:</p>
              <ul className="list-disc pl-5 flex flex-col gap-1.5">
                <li><strong className="font-semibold text-ink">Datos de identificación y contacto:</strong> nombre, apellido, correo electrónico, teléfono.</li>
                <li><strong className="font-semibold text-ink">Datos de cuenta:</strong> credenciales de acceso y preferencias de uso de la Plataforma.</li>
                <li><strong className="font-semibold text-ink">Datos de salud:</strong> información sobre hábitos, bienestar físico y emocional, nutrición y otros datos que voluntariamente compartas al utilizar programas de prevención o instancias de teleconsulta. Estos son datos sensibles conforme a la Ley 25.326 y reciben un nivel de protección reforzado.</li>
                <li><strong className="font-semibold text-ink">Datos de uso y navegación:</strong> dirección IP, tipo de dispositivo y navegador, páginas visitadas y tiempo de permanencia, recolectados mediante cookies y tecnologías similares.</li>
                <li><strong className="font-semibold text-ink">Datos provistos por empresas u organizaciones:</strong> cuando accedés a la Plataforma a través de un convenio corporativo, podemos recibir datos básicos de contacto de parte de tu empleador u organización.</li>
              </ul>
            </Section>

            <Section title="4. Finalidad del tratamiento">
              <p>Utilizamos tus datos personales para:</p>
              <ul className="list-disc pl-5 flex flex-col gap-1.5">
                <li>Brindarte acceso a la Plataforma y a los programas de prevención y bienestar.</li>
                <li>Coordinar instancias de teleconsulta con profesionales habilitados.</li>
                <li>Personalizar contenidos y recomendaciones según tus hábitos y preferencias.</li>
                <li>Enviarte comunicaciones vinculadas al servicio, novedades y contenidos de valor (podés darte de baja en cualquier momento).</li>
                <li>Elaborar métricas de impacto agregadas y anónimas para empresas u organizaciones convenio, sin identificar a personas individuales salvo consentimiento expreso.</li>
                <li>Cumplir con obligaciones legales y responder ante requerimientos de autoridades competentes.</li>
              </ul>
            </Section>

            <Section title="5. Base legal y consentimiento">
              <p>
                El tratamiento de tus datos se basa en tu consentimiento libre, expreso e informado, otorgado
                al registrarte o al utilizar la Plataforma. Para el tratamiento de datos sensibles (como
                datos de salud), requerimos tu consentimiento explícito, el que podés retirar en cualquier
                momento sin que ello afecte la licitud del tratamiento previo.
              </p>
            </Section>

            <Section title="6. Con quién compartimos tus datos">
              <p>
                No vendemos tus datos personales. Podemos compartir datos con:
              </p>
              <ul className="list-disc pl-5 flex flex-col gap-1.5">
                <li>Profesionales de la salud habilitados que participan en instancias de teleconsulta.</li>
                <li>Proveedores tecnológicos que nos brindan servicios de hosting, almacenamiento e infraestructura (por ejemplo, servicios de nube), sujetos a obligaciones de confidencialidad.</li>
                <li>Empresas u organizaciones convenio, únicamente con datos agregados y anonimizados, salvo que hayas consentido expresamente compartir información individual.</li>
                <li>Autoridades públicas, cuando así lo exija la normativa aplicable.</li>
              </ul>
            </Section>

            <Section title="7. Transferencia internacional de datos">
              <p>
                Algunos de nuestros proveedores tecnológicos pueden almacenar o procesar datos en servidores
                ubicados fuera de la República Argentina. En esos casos, adoptamos los recaudos exigidos por
                la normativa vigente para garantizar un nivel de protección adecuado de tus datos personales.
              </p>
            </Section>

            <Section title="8. Cookies y tecnologías similares">
              <p>
                Utilizamos cookies propias y de terceros para mejorar tu experiencia de navegación, recordar
                tus preferencias y analizar el uso de la Plataforma. Podés configurar tu navegador para
                rechazar cookies, aunque esto podría limitar algunas funcionalidades del sitio.
              </p>
            </Section>

            <Section title="9. Seguridad de la información">
              <p>
                Implementamos medidas técnicas y organizativas razonables para proteger tus datos personales
                contra accesos no autorizados, pérdida, alteración o divulgación indebida. Sin embargo,
                ningún sistema es completamente infalible, por lo que no podemos garantizar la seguridad
                absoluta de la información transmitida por internet.
              </p>
            </Section>

            <Section title="10. Plazo de conservación">
              <p>
                Conservamos tus datos personales durante el tiempo necesario para cumplir con las finalidades
                descriptas en esta Política, o mientras mantengas una cuenta activa en la Plataforma, salvo
                que la normativa vigente exija un plazo de conservación mayor.
              </p>
            </Section>

            <Section title="11. Tus derechos como titular de los datos">
              <p>
                De acuerdo con la Ley 25.326, tenés derecho a acceder, rectificar, actualizar y suprimir tus
                datos personales, así como a solicitar información sobre su tratamiento (derecho de "Habeas
                Data"). También podés retirar tu consentimiento en cualquier momento.
              </p>
              <p>
                Para ejercer estos derechos, escribinos a{' '}
                <a href="mailto:info@proactivasalud.com" className="text-brand font-semibold hover:underline">
                  info@proactivasalud.com
                </a>. La Agencia de Acceso a la Información Pública, en su carácter de Órgano de Control de la
                Ley 25.326, tiene la atribución de atender las denuncias y reclamos que se interpongan con
                relación al incumplimiento de las normas sobre protección de datos personales.
              </p>
            </Section>

            <Section title="12. Menores de edad">
              <p>
                La Plataforma está dirigida a personas mayores de 18 años y a organizaciones. No recolectamos
                intencionalmente datos personales de menores de edad sin el consentimiento de sus padres,
                madres o tutores legales.
              </p>
            </Section>

            <Section title="13. Cambios a esta política">
              <p>
                Podemos actualizar esta Política de Privacidad para reflejar cambios en nuestras prácticas o
                en la normativa aplicable. Publicaremos la fecha de la última actualización al inicio de este
                documento, y te notificaremos los cambios relevantes cuando corresponda.
              </p>
            </Section>

            <Section title="14. Contacto">
              <p>
                Ante cualquier consulta sobre esta Política de Privacidad o sobre el tratamiento de tus datos
                personales, podés escribirnos a{' '}
                <a href="mailto:info@proactivasalud.com" className="text-brand font-semibold hover:underline">
                  info@proactivasalud.com
                </a>.
              </p>
            </Section>

          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
