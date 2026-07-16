import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Términos de Uso — Proactiva Salud',
  description: 'Términos y condiciones de uso de la plataforma Proactiva Salud.',
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
              Términos de Uso
            </h1>
            <p className="font-body text-sm text-muted">
              Última actualización: {LAST_UPDATED}
            </p>
          </div>
        </section>

        {/* ── Content ── */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 flex flex-col gap-10">

            <Section title="1. Aceptación de los términos">
              <p>
                Estos Términos de Uso ("Términos") regulan el acceso y uso del sitio web, la plataforma
                y los servicios ofrecidos por Proactiva Salud ("Proactiva Salud", "nosotros" o "la
                Plataforma"). Al acceder o utilizar nuestros servicios, aceptás quedar sujeto a estos
                Términos y a nuestra{' '}
                <a href="/privacidad" className="text-brand font-semibold hover:underline">
                  Política de Privacidad
                </a>. Si no estás de acuerdo con alguna de estas condiciones, te pedimos que no utilices
                la Plataforma.
              </p>
            </Section>

            <Section title="2. Descripción del servicio">
              <p>
                Proactiva Salud es una plataforma de salud preventiva y acompañamiento humano orientada
                a personas mayores de 50 años y a organizaciones (empresas, obras sociales y aseguradoras)
                que ofrecen servicios de salud o bienestar a sus miembros. La Plataforma brinda información,
                programas de prevención, seguimiento de hábitos, contenidos educativos y, cuando corresponda,
                acceso a instancias de teleconsulta con profesionales habilitados.
              </p>
              <p>
                <strong className="font-semibold text-ink">Proactiva Salud no reemplaza la atención médica
                profesional.</strong> La información y los programas disponibles en la Plataforma tienen
                fines preventivos, educativos y de acompañamiento, y no constituyen diagnóstico, tratamiento
                ni indicación médica. Ante una urgencia o emergencia de salud, comunicate de inmediato con
                un servicio de emergencias médicas o dirigite al centro de salud más cercano.
              </p>
            </Section>

            <Section title="3. Registro y cuenta de usuario">
              <p>
                Para acceder a determinadas funcionalidades puede requerirse la creación de una cuenta. Sos
                responsable de mantener la confidencialidad de tus credenciales de acceso y de toda actividad
                que ocurra bajo tu cuenta. Te comprometés a proporcionar información veraz, exacta y actualizada
                al registrarte, y a notificarnos ante cualquier uso no autorizado de tu cuenta.
              </p>
            </Section>

            <Section title="4. Uso permitido de la plataforma">
              <p>Al utilizar la Plataforma, te comprometés a no:</p>
              <ul className="list-disc pl-5 flex flex-col gap-1.5">
                <li>Utilizar el servicio con fines ilícitos o contrarios a estos Términos.</li>
                <li>Suplantar la identidad de terceros o proporcionar información falsa.</li>
                <li>Intentar acceder sin autorización a sistemas, cuentas o datos de otros usuarios.</li>
                <li>Interferir con el funcionamiento normal de la Plataforma (por ejemplo, mediante virus, bots o ataques de denegación de servicio).</li>
                <li>Reproducir, distribuir o explotar comercialmente contenidos de la Plataforma sin autorización previa por escrito.</li>
              </ul>
            </Section>

            <Section title="5. Contenido y propiedad intelectual">
              <p>
                Todos los textos, marcas, logotipos, diseños, gráficos y demás contenidos disponibles en la
                Plataforma son propiedad de Proactiva Salud o de terceros que nos han autorizado su uso, y
                están protegidos por la normativa vigente en materia de propiedad intelectual (Ley 11.723 y
                normas concordantes). Ningún elemento de la Plataforma puede ser copiado, reproducido o
                utilizado sin autorización expresa.
              </p>
            </Section>

            <Section title="6. Servicios de terceros">
              <p>
                La Plataforma puede incluir enlaces o integraciones con sitios y servicios operados por
                terceros (por ejemplo, portales para personas 50+ o para empresas, y proveedores de
                teleconsulta). Proactiva Salud no controla ni se responsabiliza por el contenido, las
                políticas ni las prácticas de dichos terceros; te recomendamos revisar sus propios términos
                y políticas antes de utilizarlos.
              </p>
            </Section>

            <Section title="7. Limitación de responsabilidad">
              <p>
                La Plataforma se ofrece "tal cual" y "según disponibilidad". En la medida permitida por la
                ley aplicable, Proactiva Salud no garantiza que el servicio sea ininterrumpido o esté libre
                de errores, y no será responsable por daños indirectos, incidentales o derivados del uso o
                la imposibilidad de uso de la Plataforma, salvo en los casos en que dicha limitación no sea
                admitida por la normativa vigente, en particular la Ley 24.240 de Defensa del Consumidor
                cuando resulte aplicable.
              </p>
            </Section>

            <Section title="8. Modificaciones del servicio y de los términos">
              <p>
                Podemos modificar, suspender o discontinuar total o parcialmente la Plataforma, así como
                actualizar estos Términos, en cualquier momento. Publicaremos la fecha de la última
                actualización al inicio de este documento. El uso continuado de la Plataforma luego de una
                modificación implica la aceptación de los nuevos Términos.
              </p>
            </Section>

            <Section title="9. Suspensión y cancelación de cuentas">
              <p>
                Podemos suspender o cancelar el acceso a tu cuenta ante un uso indebido de la Plataforma, el
                incumplimiento de estos Términos o por requerimiento de autoridad competente. Vos podés
                solicitar la baja de tu cuenta en cualquier momento a través de los medios de contacto
                indicados más abajo.
              </p>
            </Section>

            <Section title="10. Ley aplicable y jurisdicción">
              <p>
                Estos Términos se rigen por las leyes de la República Argentina. Para cualquier controversia
                derivada de la interpretación o aplicación de estos Términos, las partes se someten a la
                jurisdicción de los tribunales ordinarios competentes, sin perjuicio de los fueros que
                correspondan a los consumidores conforme a la Ley 24.240.
              </p>
            </Section>

            <Section title="11. Contacto">
              <p>
                Ante cualquier consulta sobre estos Términos, podés escribirnos a{' '}
                <a href="mailto:hola@proactivasalud.com" className="text-brand font-semibold hover:underline">
                  hola@proactivasalud.com
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
