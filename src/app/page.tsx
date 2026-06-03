export const dynamic = 'force-dynamic'

import { Header }            from '@/components/Header'
import { HeroSection }        from '@/components/HeroSection'
import { FeatureStrip }       from '@/components/FeatureStrip'
import { DualSection }        from '@/components/DualSection'
import { MetricsStrip }       from '@/components/MetricsStrip'
import { PillarsSection }     from '@/components/PillarsSection'
import { TestimonialSection } from '@/components/TestimonialSection'
import { CtaSection }         from '@/components/CTASection'
import { NewsletterSection }  from '@/components/NewsletterSection'
import { FooterFeatures }     from '@/components/FooterFeatures'
import { Footer }             from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <HeroSection />
        <FeatureStrip />
        <DualSection />
        <MetricsStrip />
        <PillarsSection />
        <TestimonialSection />
        <NewsletterSection />
        <CtaSection />
        <FooterFeatures />
      </main>
      <Footer />
    </>
  )
}
