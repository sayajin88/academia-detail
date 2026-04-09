import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Button, Section, Hr, Link, Img,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "Detail Park Academy"
const DOSSIER_URL = "https://drive.google.com/file/d/1BeEtAi-UzlQMsaCEeSiygjj8XWLv1sxN/view?usp=sharing"

interface ContactConfirmationProps {
  nombre?: string
  formacion?: string
}

const ContactConfirmationEmail = ({ nombre, formacion }: ContactConfirmationProps) => {
  const firstName = nombre ? nombre.split(' ')[0] : ''

  return (
    <Html lang="es" dir="ltr">
      <Head />
      <Preview>Tu Programa Formativo está listo para descargar — {SITE_NAME}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={headerTitle}>DETAIL PARK</Heading>
            <Text style={headerSubtitle}>Academy</Text>
          </Section>

          {/* Content */}
          <Section style={content}>
            <Heading style={h1}>
              Tu Programa Formativo está listo 📋
            </Heading>
            {formacion && (
              <Text style={formacionLabel}>
                Información detallada sobre <span style={{ color: '#8B2332', fontWeight: 700 }}>{formacion}</span>
              </Text>
            )}

            <Text style={text}>
              {firstName ? `Hola ${firstName},` : 'Hola,'}
            </Text>

            <Text style={text}>
              Gracias por tu interés en formarte con nosotros. Sabemos que elegir dónde invertir en tu futuro
              profesional es una decisión importante, y queremos que tengas toda la información para tomarla con confianza.
            </Text>

            <Text style={text}>
              Hemos preparado un <strong>dossier completo</strong> con todo lo que necesitas saber sobre nuestros
              programas formativos: contenido, metodología, certificaciones y mucho más.
            </Text>

            {/* CTA Button */}
            <Section style={ctaSection}>
              <Button href={DOSSIER_URL} style={ctaButton}>
                📥 Descargar Programa Formativo Completo
              </Button>
            </Section>

            {/* Value Props */}
            <Section style={valueBox}>
              <Text style={valueTitle}>¿Qué encontrarás en el dossier?</Text>
              <Text style={valueItem}>✅ Programa detallado de cada formación</Text>
              <Text style={valueItem}>✅ Metodología práctica en taller real con clientes</Text>
              <Text style={valueItem}>✅ Certificaciones profesionales incluidas</Text>
              <Text style={valueItem}>✅ Casos de éxito de alumnos anteriores</Text>
              <Text style={valueItem}>✅ Opciones de financiación sin intereses</Text>
            </Section>

            {/* Exclusivity */}
            <Section style={exclusivityBox}>
              <Text style={exclusivityText}>
                <strong>⚡ Recuerda:</strong> Nuestras ediciones son de <strong>máximo 3 alumnos</strong> para garantizar
                atención personalizada. Las plazas se cubren rápido, así que te recomendamos no demorarte.
              </Text>
            </Section>

            {/* Contact */}
            <Section style={contactBox}>
              <Text style={contactTitle}>¿Tienes preguntas? Estamos aquí para ti</Text>
              <Text style={contactItem}>📞 Llámanos: <Link href="tel:+34622773555" style={link}>+34 622 773 555</Link></Text>
              <Text style={contactItem}>💬 WhatsApp: <Link href="https://wa.me/34622773555" style={link}>+34 622 773 555</Link></Text>
              <Text style={contactItem}>📧 Email: <Link href="mailto:info@academiadetail.com" style={link}>info@academiadetail.com</Link></Text>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerTitle}>Tu futuro profesional empieza aquí</Text>
            <Text style={footerText}>El equipo de {SITE_NAME}</Text>
            <Link href="https://academiadetail.com" style={footerLink}>www.academiadetail.com</Link>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: ContactConfirmationEmail,
  subject: 'Tu Programa Formativo está listo para descargar 📋',
  displayName: 'Confirmación de contacto con dossier',
  previewData: { nombre: 'Carlos', formacion: 'Detailing Profesional' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif" }
const container = { maxWidth: '600px', margin: '0 auto' }
const header = { backgroundColor: '#8B2332', padding: '40px', textAlign: 'center' as const }
const headerTitle = { margin: '0 0 8px', color: '#FFF', fontSize: '28px', fontWeight: '700' }
const headerSubtitle = { margin: '0', color: 'rgba(255,255,255,0.9)', fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase' as const }
const content = { padding: '40px' }
const h1 = { margin: '0 0 8px', color: '#111827', fontSize: '24px', fontWeight: '700' }
const formacionLabel = { margin: '0 0 24px', color: '#6B7280', fontSize: '14px' }
const text = { margin: '0 0 20px', color: '#374151', fontSize: '16px', lineHeight: '1.7' }
const ctaSection = { textAlign: 'center' as const, margin: '0 0 32px' }
const ctaButton = { backgroundColor: '#8B2332', color: '#FFF', padding: '18px 48px', borderRadius: '10px', fontSize: '17px', fontWeight: '700', textDecoration: 'none' }
const valueBox = { backgroundColor: '#FDF2F4', borderRadius: '12px', border: '1px solid #F5C6CB', padding: '24px', margin: '0 0 32px' }
const valueTitle = { margin: '0 0 16px', color: '#111827', fontSize: '16px', fontWeight: '700' }
const valueItem = { margin: '0 0 6px', color: '#374151', fontSize: '15px', lineHeight: '1.5' }
const exclusivityBox = { backgroundColor: '#FEF3C7', borderRadius: '12px', border: '1px solid #FDE68A', padding: '20px', margin: '0 0 32px' }
const exclusivityText = { margin: '0', color: '#92400E', fontSize: '15px', lineHeight: '1.6' }
const contactBox = { backgroundColor: '#F9FAFB', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '24px' }
const contactTitle = { margin: '0 0 16px', color: '#111827', fontSize: '15px', fontWeight: '600' }
const contactItem = { margin: '0 0 8px', color: '#374151', fontSize: '14px' }
const link = { color: '#8B2332', textDecoration: 'none', fontWeight: '500' }
const footer = { backgroundColor: '#F9FAFB', padding: '30px 40px', borderTop: '1px solid #E5E7EB', textAlign: 'center' as const }
const footerTitle = { margin: '0 0 8px', color: '#111827', fontSize: '15px', fontWeight: '600' }
const footerText = { margin: '0 0 16px', color: '#6B7280', fontSize: '14px' }
const footerLink = { color: '#8B2332', fontSize: '13px', textDecoration: 'none' }
