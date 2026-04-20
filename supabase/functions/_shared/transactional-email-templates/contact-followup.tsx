import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Button, Section, Hr, Link, Img, Row, Column,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const DOSSIER_URL = "https://ncsatssbhqicptmivmqk.supabase.co/storage/v1/object/public/blog-images/dossiers/programa-formativo-academia-detail.pdf"
const ACADEMY_LOGO_URL = "https://ncsatssbhqicptmivmqk.supabase.co/storage/v1/object/public/blog-images/email-assets/academia-detail-logo.png"
const WEB_URL = "https://detailpark.com"
const INSTAGRAM_URL = "https://instagram.com/danidetailoficial"

interface ContactFollowupProps {
  nombre?: string
  formacion?: string
}

const ContactFollowupEmail = ({ nombre, formacion }: ContactFollowupProps) => {
  const firstName = nombre ? nombre.split(' ')[0] : ''
  const waText = formacion
    ? `Hola%2C%20estoy%20interesado%20en%20el%20programa%20de%20${encodeURIComponent(formacion)}`
    : 'Hola%2C%20estoy%20interesado%20en%20vuestros%20programas'

  return (
    <Html lang="es" dir="ltr">
      <Head />
      <Preview>
        {firstName
          ? `${firstName}, ¿tienes alguna duda sobre el programa?`
          : '¿Tienes alguna duda sobre el programa?'}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header con logo */}
          <Section style={header}>
            <Img
              src={ACADEMY_LOGO_URL}
              alt="Academia Detail by Detail Park"
              width="180"
              height="auto"
              style={logoImg}
            />
            <Text style={headerTagline}>FORMACIÓN PROFESIONAL EN DETAILING</Text>
          </Section>

          {/* Banda de acento */}
          <Section style={accentBar} />

          {/* Hero */}
          <Section style={heroSection}>
            <Heading style={h1}>
              {firstName ? `${firstName}, ¿pudiste echarle un vistazo?` : '¿Pudiste echarle un vistazo?'}
            </Heading>
            {formacion && (
              <Text style={formacionLabel}>
                Sobre el programa de <span style={formacionHighlight}>{formacion}</span>
              </Text>
            )}
          </Section>

          {/* Cuerpo */}
          <Section style={contentSection}>
            <Text style={paragraph}>
              Hace un par de días te enviamos el programa formativo. Quería pasarme por aquí para
              asegurarme de que te llegó bien y por si te ha quedado alguna duda.
            </Text>

            <Text style={paragraph}>
              Sé que decidir dónde formarte es importante. Si quieres, puedo resolverte cualquier
              cuestión sin compromiso — desde el contenido del curso hasta opciones de financiación.
            </Text>

            {/* CTA WhatsApp */}
            <Section style={ctaSection}>
              <Button href={`https://wa.me/34622773555?text=${waText}`} style={ctaWhatsapp}>
                Hablar por WhatsApp
              </Button>
              <Text style={ctaHint}>Respondemos en menos de 1 hora · L–S</Text>
            </Section>

            {/* Recordatorio dossier */}
            <Section style={dossierBox}>
              <Text style={dossierTitle}>¿No encuentras el programa formativo?</Text>
              <Text style={dossierText}>
                Aquí lo tienes de nuevo, por si lo necesitas:
              </Text>
              <Section style={{ textAlign: 'center', marginTop: '12px' }}>
                <Link href={DOSSIER_URL} style={dossierLink}>
                  Ver tipos de formación y precios →
                </Link>
              </Section>
            </Section>

            {/* Callout exclusividad */}
            <Section style={calloutBox}>
              <Text style={calloutText}>
                <strong style={calloutStrong}>Recordatorio:</strong> nuestras ediciones son
                de <strong>máximo 3 alumnos</strong> para garantizar atención personalizada.
                Si tienes una fecha en mente, mejor reservar pronto.
              </Text>
            </Section>
          </Section>

          {/* Conócenos */}
          <Section style={socialSection}>
            <Text style={socialTitle}>Conócenos antes de decidir</Text>
            <Text style={socialSubtitle}>Visita nuestra web o sigue el día a día del taller</Text>

            <Row style={socialRow}>
              <Column style={socialCol}>
                <Link href={WEB_URL} style={socialCard}>
                  <Text style={socialIcon}>🌐</Text>
                  <Text style={socialCardTitle}>Detail Park</Text>
                  <Text style={socialCardSubtitle}>detailpark.com</Text>
                </Link>
              </Column>
              <Column style={socialCol}>
                <Link href={INSTAGRAM_URL} style={socialCard}>
                  <Text style={socialIcon}>📷</Text>
                  <Text style={socialCardTitle}>Instagram</Text>
                  <Text style={socialCardSubtitle}>@danidetailoficial</Text>
                </Link>
              </Column>
            </Row>
          </Section>

          {/* Contacto */}
          <Section style={contactBox}>
            <Text style={contactTitle}>¿Prefieres otro canal?</Text>
            <Text style={contactItem}>
              📞 <Link href="tel:+34622773555" style={link}>+34 622 773 555</Link>
              {'  ·  '}
              📧 <Link href="mailto:info@detailpark.com" style={link}>info@detailpark.com</Link>
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerTitle}>Estamos aquí para ayudarte</Text>
            <Text style={footerText}>El equipo de Academia Detail · Detail Park</Text>
            <Link href="https://academiadetail.com" style={footerLink}>www.academiadetail.com</Link>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: ContactFollowupEmail,
  subject: (data: Record<string, any>) => {
    const first = data.nombre ? String(data.nombre).split(' ')[0] : ''
    return first
      ? `${first}, ¿te ha llegado bien el programa?`
      : '¿Te ha llegado bien el programa?'
  },
  displayName: 'Seguimiento de contacto (2 días)',
  previewData: { nombre: 'Carlos García', formacion: 'Detailing Profesional' },
} satisfies TemplateEntry

// ===== Styles =====
const main = {
  backgroundColor: '#ffffff',
  fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
  margin: 0,
  padding: 0,
}
const container = { maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff' }

// Header
const header = { padding: '40px 40px 20px', textAlign: 'center' as const, backgroundColor: '#ffffff' }
const logoImg = { display: 'block', margin: '0 auto 12px', maxWidth: '180px', height: 'auto' }
const headerTagline = {
  margin: 0,
  color: '#6B7280',
  fontSize: '11px',
  letterSpacing: '2.5px',
  fontWeight: 600,
  textTransform: 'uppercase' as const,
}
const accentBar = { height: '4px', backgroundColor: '#8B2332', margin: '0 40px', borderRadius: '2px' }

// Hero
const heroSection = { padding: '32px 40px 8px', textAlign: 'center' as const }
const h1 = { margin: '0 0 12px', color: '#111827', fontSize: '24px', fontWeight: 700, lineHeight: '1.3' }
const formacionLabel = { margin: 0, color: '#6B7280', fontSize: '15px' }
const formacionHighlight = { color: '#8B2332', fontWeight: 700 }

// Content
const contentSection = { padding: '24px 40px 8px' }
const paragraph = { margin: '0 0 18px', color: '#374151', fontSize: '16px', lineHeight: '1.7' }

// CTA
const ctaSection = { textAlign: 'center' as const, margin: '28px 0 32px' }
const ctaWhatsapp = {
  backgroundColor: '#25D366',
  color: '#FFFFFF',
  padding: '16px 36px',
  borderRadius: '10px',
  fontSize: '16px',
  fontWeight: 700,
  textDecoration: 'none',
  display: 'inline-block',
  boxShadow: '0 4px 12px rgba(37, 211, 102, 0.25)',
}
const ctaHint = { margin: '12px 0 0', color: '#6B7280', fontSize: '13px' }

// Dossier reminder
const dossierBox = {
  backgroundColor: '#F9FAFB',
  borderRadius: '12px',
  border: '1px solid #E5E7EB',
  padding: '20px 24px',
  margin: '0 0 20px',
  textAlign: 'center' as const,
}
const dossierTitle = { margin: '0 0 6px', color: '#111827', fontSize: '15px', fontWeight: 700 }
const dossierText = { margin: 0, color: '#6B7280', fontSize: '14px' }
const dossierLink = {
  color: '#8B2332',
  fontSize: '15px',
  fontWeight: 700,
  textDecoration: 'none',
}

// Callout
const calloutBox = {
  backgroundColor: '#FDF2F4',
  borderLeft: '4px solid #8B2332',
  borderRadius: '8px',
  padding: '18px 20px',
  margin: '0 0 8px',
}
const calloutText = { margin: 0, color: '#374151', fontSize: '15px', lineHeight: '1.6' }
const calloutStrong = { color: '#8B2332' }

// Social
const socialSection = { padding: '32px 40px 24px', textAlign: 'center' as const }
const socialTitle = { margin: '0 0 6px', color: '#111827', fontSize: '17px', fontWeight: 700 }
const socialSubtitle = { margin: '0 0 20px', color: '#6B7280', fontSize: '14px' }
const socialRow = { width: '100%' }
const socialCol = { width: '50%', padding: '0 6px', verticalAlign: 'top' as const }
const socialCard = {
  display: 'block',
  backgroundColor: '#F9FAFB',
  border: '1px solid #E5E7EB',
  borderRadius: '12px',
  padding: '20px 12px',
  textAlign: 'center' as const,
  textDecoration: 'none',
  color: '#111827',
}
const socialIcon = { margin: '0 0 6px', fontSize: '24px', lineHeight: '1' }
const socialCardTitle = { margin: '0 0 2px', color: '#111827', fontSize: '15px', fontWeight: 700 }
const socialCardSubtitle = { margin: 0, color: '#8B2332', fontSize: '13px', fontWeight: 500 }

// Contact
const contactBox = {
  backgroundColor: '#F9FAFB',
  borderRadius: '12px',
  border: '1px solid #E5E7EB',
  padding: '18px 24px',
  margin: '0 40px 24px',
  textAlign: 'center' as const,
}
const contactTitle = { margin: '0 0 10px', color: '#111827', fontSize: '15px', fontWeight: 700 }
const contactItem = { margin: 0, color: '#374151', fontSize: '14px', lineHeight: '1.6' }
const link = { color: '#8B2332', textDecoration: 'none', fontWeight: 600 }

// Divider & footer
const divider = { borderColor: '#E5E7EB', margin: '8px 40px 24px' }
const footer = { padding: '0 40px 40px', textAlign: 'center' as const }
const footerTitle = { margin: '0 0 6px', color: '#111827', fontSize: '15px', fontWeight: 600 }
const footerText = { margin: '0 0 8px', color: '#6B7280', fontSize: '13px' }
const footerLink = { color: '#8B2332', fontSize: '13px', textDecoration: 'none', fontWeight: 600 }
