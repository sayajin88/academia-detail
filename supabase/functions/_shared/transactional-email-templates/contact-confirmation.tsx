import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Button, Section, Hr, Link, Img, Row, Column,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "Detail Park Academy"
const DOSSIER_URL = "https://drive.google.com/file/d/1BeEtAi-UzlQMsaCEeSiygjj8XWLv1sxN/view?usp=sharing"
const TRACKING_PIXEL_BASE = "https://ncsatssbhqicptmivmqk.supabase.co/functions/v1/track-email-open"
const ACADEMY_LOGO_URL = "https://ncsatssbhqicptmivmqk.supabase.co/storage/v1/object/public/blog-images/email-assets/academia-detail-logo.png"
const WEB_URL = "https://detailpark.com"
const INSTAGRAM_URL = "https://instagram.com/danidetailoficial"

interface ContactConfirmationProps {
  nombre?: string
  formacion?: string
  trackingToken?: string
}

const ContactConfirmationEmail = ({ nombre, formacion, trackingToken }: ContactConfirmationProps) => {
  const firstName = nombre ? nombre.split(' ')[0] : ''
  const pixelUrl = trackingToken ? `${TRACKING_PIXEL_BASE}?token=${encodeURIComponent(trackingToken)}` : null

  return (
    <Html lang="es" dir="ltr">
      <Head />
      <Preview>Tu Programa Formativo está listo — Academia Detail · Detail Park</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header con logo + wordmark */}
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

          {/* Banda de acento granate */}
          <Section style={accentBar} />

          {/* Hero / Heading */}
          <Section style={heroSection}>
            <Heading style={h1}>Tu Programa Formativo está listo</Heading>
            {formacion && (
              <Text style={formacionLabel}>
                Información sobre <span style={formacionHighlight}>{formacion}</span>
              </Text>
            )}
          </Section>

          {/* Cuerpo */}
          <Section style={contentSection}>
            <Text style={greeting}>
              {firstName ? `Hola ${firstName},` : 'Hola,'}
            </Text>

            <Text style={paragraph}>
              Gracias por tu interés en formarte con nosotros. Sabemos que elegir dónde invertir
              en tu futuro profesional es una decisión importante, y queremos que tengas toda la
              información para tomarla con confianza.
            </Text>

            <Text style={paragraph}>
              Hemos preparado un <strong>dossier completo</strong> con todo lo que necesitas saber
              sobre nuestros programas: contenido, metodología, certificaciones, precios y mucho más.
            </Text>

            {/* CTA principal */}
            <Section style={ctaSection}>
              <Button href={DOSSIER_URL} style={ctaButton}>
                Ver tipos de formación y precios
              </Button>
              <Text style={ctaHint}>📥 Acceso inmediato — sin registro</Text>
            </Section>

            {/* Value box */}
            <Section style={valueBox}>
              <Text style={valueTitle}>¿Qué encontrarás dentro?</Text>
              <ValueItem text="Programa detallado de cada formación" />
              <ValueItem text="Metodología práctica en taller real con clientes" />
              <ValueItem text="Certificaciones profesionales incluidas" />
              <ValueItem text="Casos de éxito de alumnos anteriores" />
              <ValueItem text="Opciones de financiación sin intereses" />
            </Section>

            {/* Callout exclusividad */}
            <Section style={calloutBox}>
              <Text style={calloutText}>
                <strong style={calloutStrong}>Plazas limitadas.</strong> Nuestras ediciones son
                de <strong>máximo 3 alumnos</strong> para garantizar atención personalizada.
                Las plazas se cubren rápido — no demores tu decisión.
              </Text>
            </Section>
          </Section>

          {/* Síguenos / Conoce más */}
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
            <Text style={contactTitle}>¿Tienes preguntas? Hablemos</Text>
            <Text style={contactItem}>
              📞 <Link href="tel:+34622773555" style={link}>+34 622 773 555</Link>
              {'  ·  '}
              💬 <Link href="https://wa.me/34622773555" style={link}>WhatsApp</Link>
            </Text>
            <Text style={contactItem}>
              📧 <Link href="mailto:info@detailpark.com" style={link}>info@detailpark.com</Link>
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerTitle}>Tu futuro profesional empieza aquí</Text>
            <Text style={footerText}>El equipo de Academia Detail · Detail Park</Text>
            <Link href="https://academiadetail.com" style={footerLink}>www.academiadetail.com</Link>
          </Section>

          {/* Tracking pixel */}
          {pixelUrl && (
            <Img src={pixelUrl} alt="" width="1" height="1" style={pixelStyle} />
          )}
        </Container>
      </Body>
    </Html>
  )
}

// Componente reutilizable para items del value box (con check SVG)
const ValueItem = ({ text }: { text: string }) => (
  <Row style={valueItemRow}>
    <Column style={valueCheckCol}>
      <Img
        src="https://img.icons8.com/color/24/checkmark--v1.png"
        alt="✓"
        width="20"
        height="20"
        style={{ display: 'block' }}
      />
    </Column>
    <Column>
      <Text style={valueItemText}>{text}</Text>
    </Column>
  </Row>
)

export const template = {
  component: ContactConfirmationEmail,
  subject: 'Tu Programa Formativo está listo para descargar',
  displayName: 'Confirmación de contacto con dossier',
  previewData: { nombre: 'Carlos', formacion: 'Detailing Profesional' },
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
const header = {
  padding: '40px 40px 20px',
  textAlign: 'center' as const,
  backgroundColor: '#ffffff',
}
const logoImg = { display: 'block', margin: '0 auto 12px', maxWidth: '180px', height: 'auto' }
const headerTagline = {
  margin: 0,
  color: '#6B7280',
  fontSize: '11px',
  letterSpacing: '2.5px',
  fontWeight: 600,
  textTransform: 'uppercase' as const,
}
const accentBar = {
  height: '4px',
  backgroundColor: '#8B2332',
  margin: '0 40px',
  borderRadius: '2px',
}

// Hero
const heroSection = { padding: '32px 40px 8px', textAlign: 'center' as const }
const h1 = {
  margin: '0 0 12px',
  color: '#111827',
  fontSize: '26px',
  fontWeight: 700,
  lineHeight: '1.3',
}
const formacionLabel = { margin: 0, color: '#6B7280', fontSize: '15px' }
const formacionHighlight = { color: '#8B2332', fontWeight: 700 }

// Content
const contentSection = { padding: '24px 40px 8px' }
const greeting = { margin: '0 0 16px', color: '#111827', fontSize: '17px', fontWeight: 600 }
const paragraph = { margin: '0 0 18px', color: '#374151', fontSize: '16px', lineHeight: '1.7' }

// CTA
const ctaSection = { textAlign: 'center' as const, margin: '28px 0 32px' }
const ctaButton = {
  backgroundColor: '#8B2332',
  color: '#FFFFFF',
  padding: '16px 36px',
  borderRadius: '10px',
  fontSize: '16px',
  fontWeight: 700,
  textDecoration: 'none',
  display: 'inline-block',
  boxShadow: '0 4px 12px rgba(139, 35, 50, 0.25)',
}
const ctaHint = { margin: '12px 0 0', color: '#6B7280', fontSize: '13px' }

// Value box
const valueBox = {
  backgroundColor: '#F9FAFB',
  borderRadius: '12px',
  border: '1px solid #E5E7EB',
  padding: '24px 24px 16px',
  margin: '0 0 24px',
}
const valueTitle = {
  margin: '0 0 16px',
  color: '#111827',
  fontSize: '16px',
  fontWeight: 700,
}
const valueItemRow = { marginBottom: '10px' }
const valueCheckCol = { width: '28px', verticalAlign: 'top' as const, paddingTop: '2px' }
const valueItemText = {
  margin: 0,
  color: '#374151',
  fontSize: '15px',
  lineHeight: '1.5',
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
const socialSection = {
  padding: '32px 40px 24px',
  textAlign: 'center' as const,
}
const socialTitle = {
  margin: '0 0 6px',
  color: '#111827',
  fontSize: '17px',
  fontWeight: 700,
}
const socialSubtitle = {
  margin: '0 0 20px',
  color: '#6B7280',
  fontSize: '14px',
}
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
const socialCardTitle = {
  margin: '0 0 2px',
  color: '#111827',
  fontSize: '15px',
  fontWeight: 700,
}
const socialCardSubtitle = {
  margin: 0,
  color: '#8B2332',
  fontSize: '13px',
  fontWeight: 500,
}

// Contact
const contactBox = {
  backgroundColor: '#F9FAFB',
  borderRadius: '12px',
  border: '1px solid #E5E7EB',
  padding: '20px 24px',
  margin: '0 40px 24px',
  textAlign: 'center' as const,
}
const contactTitle = {
  margin: '0 0 12px',
  color: '#111827',
  fontSize: '15px',
  fontWeight: 700,
}
const contactItem = {
  margin: '0 0 6px',
  color: '#374151',
  fontSize: '14px',
  lineHeight: '1.6',
}
const link = { color: '#8B2332', textDecoration: 'none', fontWeight: 600 }

// Divider & footer
const divider = { borderColor: '#E5E7EB', margin: '8px 40px 24px' }
const footer = {
  padding: '0 40px 40px',
  textAlign: 'center' as const,
}
const footerTitle = {
  margin: '0 0 6px',
  color: '#111827',
  fontSize: '15px',
  fontWeight: 600,
}
const footerText = { margin: '0 0 8px', color: '#6B7280', fontSize: '13px' }
const footerLink = { color: '#8B2332', fontSize: '13px', textDecoration: 'none', fontWeight: 600 }

// Tracking pixel
const pixelStyle = { display: 'block', width: '1px', height: '1px', border: 0 }
