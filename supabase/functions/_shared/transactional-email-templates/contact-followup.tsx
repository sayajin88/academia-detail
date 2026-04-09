import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Button, Section, Link,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "Detail Park Academy"

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
      <Preview>¿Has podido revisar el programa{firstName ? `, ${firstName}` : ''}?</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={headerTitle}>DETAIL PARK</Heading>
            <Text style={headerSubtitle}>Academy</Text>
          </Section>

          <Section style={content}>
            <Heading style={h1}>
              ¿Has podido revisar el programa{firstName ? `, ${firstName}` : ''}?
            </Heading>

            <Text style={text}>
              Hace un par de días te enviamos toda la información sobre nuestro programa
              {formacion ? <> de <strong style={{ color: '#8B2332' }}>{formacion}</strong></> : ''}.
              Queríamos saber si has tenido ocasión de revisarlo.
            </Text>

            <Text style={text}>
              Sabemos que tomar la decisión de invertir en tu formación es importante, así que
              queremos que tengas toda la información que necesites para dar el paso con confianza.
            </Text>

            <Section style={financingBox}>
              <Text style={financingTitle}>¿Sabías que puedes financiar tu formación?</Text>
              <Text style={financingItem}>💳 <strong>Paga a plazos sin intereses</strong> gracias a nuestra colaboración con ViaBill.</Text>
              <Text style={financingItem}>📅 Elige el plan que mejor se adapte a ti: <strong>3, 6 o 12 meses</strong>.</Text>
              <Text style={financingItem}>🎓 Y recuerda: nuestras plazas son limitadas a <strong>3 alumnos por edición</strong> para garantizar atención 1:1.</Text>
            </Section>

            <Text style={text}>
              Si tienes alguna duda, estaremos encantados de resolverla. Puedes reservar una
              llamada informativa sin compromiso:
            </Text>

            <Section style={ctaSection}>
              <Button href={`https://wa.me/34622773555?text=${waText}`} style={whatsappButton}>
                💬 Hablar por WhatsApp
              </Button>
            </Section>
            <Section style={ctaSection}>
              <Button href="https://academiadetail.com/contacto" style={ctaButton}>
                📋 Reservar mi plaza
              </Button>
            </Section>
          </Section>

          <Section style={footer}>
            <Text style={footerTitle}>Estamos aquí para ayudarte</Text>
            <Text style={footerContact}>
              📞 <Link href="tel:+34622773555" style={link}>+34 622 773 555</Link> ·
              📧 <Link href="mailto:info@academiadetail.com" style={link}>info@academiadetail.com</Link>
            </Text>
            <Link href="https://academiadetail.com" style={footerLink}>www.academiadetail.com</Link>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: ContactFollowupEmail,
  subject: (data: Record<string, any>) =>
    data.nombre
      ? `¿Has podido revisar el programa, ${data.nombre.split(' ')[0]}?`
      : '¿Has podido revisar el programa?',
  displayName: 'Seguimiento de contacto (2 días)',
  previewData: { nombre: 'Carlos García', formacion: 'Detailing Profesional' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif" }
const container = { maxWidth: '600px', margin: '0 auto' }
const header = { backgroundColor: '#8B2332', padding: '40px', textAlign: 'center' as const }
const headerTitle = { margin: '0 0 8px', color: '#FFF', fontSize: '28px', fontWeight: '700' }
const headerSubtitle = { margin: '0', color: 'rgba(255,255,255,0.9)', fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase' as const }
const content = { padding: '40px' }
const h1 = { margin: '0 0 24px', color: '#111827', fontSize: '22px', fontWeight: '600' }
const text = { margin: '0 0 20px', color: '#374151', fontSize: '16px', lineHeight: '1.7' }
const financingBox = { backgroundColor: '#FDF2F4', borderRadius: '12px', border: '1px solid #F5C6CB', padding: '24px', margin: '24px 0' }
const financingTitle = { margin: '0 0 16px', color: '#111827', fontSize: '16px', fontWeight: '700' }
const financingItem = { margin: '0 0 12px', color: '#374151', fontSize: '15px', lineHeight: '1.6' }
const ctaSection = { textAlign: 'center' as const, margin: '0 0 12px' }
const whatsappButton = { backgroundColor: '#25D366', color: '#FFF', padding: '16px 40px', borderRadius: '8px', fontSize: '16px', fontWeight: '700', textDecoration: 'none' }
const ctaButton = { backgroundColor: '#8B2332', color: '#FFF', padding: '16px 40px', borderRadius: '8px', fontSize: '16px', fontWeight: '700', textDecoration: 'none' }
const link = { color: '#8B2332', textDecoration: 'none' }
const footer = { backgroundColor: '#F9FAFB', padding: '30px 40px', borderTop: '1px solid #E5E7EB', textAlign: 'center' as const }
const footerTitle = { margin: '0 0 8px', color: '#111827', fontSize: '15px', fontWeight: '600' }
const footerContact = { margin: '0 0 16px', color: '#6B7280', fontSize: '14px' }
const footerLink = { color: '#8B2332', fontSize: '13px', textDecoration: 'none' }
