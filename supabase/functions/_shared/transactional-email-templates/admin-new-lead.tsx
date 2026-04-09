import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Button, Section, Link,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const ADMIN_EMAIL = Deno.env.get('ADMIN_EMAIL') || 'info@academiadetail.com'

const experienciaLabels: Record<string, string> = {
  sin_experiencia: 'No, soy nuevo',
  con_experiencia: 'Sí, tengo experiencia',
  sin_especificar: 'Sin especificar',
}

const centroLabels: Record<string, string> = {
  si: 'Sí', no: 'No', sin_especificar: 'Sin especificar',
}

const inversionLabels: Record<string, string> = {
  hasta_500: 'Hasta 500 EUR',
  '500_2000': '500 - 2.000 EUR',
  '2000_5000': '2.000 - 5.000 EUR',
  mas_5000: 'Más de 5.000 EUR',
  sin_especificar: 'Sin especificar',
}

const formacionLabels: Record<string, string> = {
  detailing: 'Detailing',
  wrapping: 'Car Wrapping',
  ppf: 'Paint Protection Film',
  restauracion: 'Restauración',
  negocio: 'Negocio',
  carrera_completa: 'Carrera Completa',
  general: 'Información General',
  sin_especificar: 'Sin especificar',
}

const sourceLabels: Record<string, string> = {
  contact_page: 'Página de Contacto',
  home_cta: 'CTA de la Home',
}

interface AdminNewLeadProps {
  nombre?: string
  apellidos?: string
  email?: string
  telefono?: string
  experiencia?: string
  centro_propio?: string
  inversion?: string
  tipo_formacion?: string
  mensaje?: string
  source?: string
}

const AdminNewLeadEmail = (props: AdminNewLeadProps) => {
  const {
    nombre = '', apellidos = '', email = '', telefono = '',
    experiencia = '', centro_propio = '', inversion = '',
    tipo_formacion = '', mensaje = '', source = '',
  } = props

  const fullName = `${nombre} ${apellidos}`.trim()
  const formLabel = formacionLabels[tipo_formacion] || tipo_formacion
  const expLabel = experienciaLabels[experiencia] || experiencia
  const centLabel = centroLabels[centro_propio] || centro_propio
  const invLabel = inversionLabels[inversion] || inversion
  const srcLabel = sourceLabels[source] || source

  return (
    <Html lang="es" dir="ltr">
      <Head />
      <Preview>Nuevo lead: {formLabel} — {fullName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={headerTitle}>Nuevo Lead de Contacto</Heading>
            <Text style={headerDate}>{new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Text>
          </Section>

          <Section style={content}>
            {/* Badges */}
            <Section style={{ marginBottom: '20px' }}>
              <Text style={badge}>{srcLabel}</Text>
              <Text style={{ ...badge, backgroundColor: '#8B2332' }}>{formLabel}</Text>
            </Section>

            {/* Contact Info */}
            <Section style={infoBox}>
              <Text style={infoLabel}>Nombre completo</Text>
              <Text style={infoValue}>{fullName}</Text>
              <Text style={infoLabel}>Email</Text>
              <Link href={`mailto:${email}`} style={infoLink}>{email}</Link>
              <Text style={infoLabel}>Teléfono</Text>
              <Link href={`tel:${telefono}`} style={infoLink}>{telefono}</Link>
            </Section>

            {/* Qualification */}
            <Heading style={sectionTitle}>Cualificación del Lead</Heading>
            <Section style={infoBox}>
              <Text style={infoLabel}>Experiencia en Detailing</Text>
              <Text style={infoValue}>{expLabel}</Text>
              <Text style={infoLabel}>Centro propio</Text>
              <Text style={infoValue}>{centLabel}</Text>
              <Text style={infoLabel}>Inversión en formación</Text>
              <Text style={infoValue}>{invLabel}</Text>
              <Text style={infoLabel}>Formación deseada</Text>
              <Text style={infoValue}>{formLabel}</Text>
            </Section>

            {mensaje && (
              <>
                <Heading style={sectionTitle}>Mensaje</Heading>
                <Section style={messageBox}>
                  <Text style={messageText}>{mensaje}</Text>
                </Section>
              </>
            )}

            <Section style={ctaSection}>
              <Button href={`mailto:${email}?subject=Re: Solicitud de información - Detail Park Academy`} style={ctaButton}>
                Responder a {nombre}
              </Button>
            </Section>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              Este mensaje fue enviado desde el formulario de contacto de Detail Park Academy
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: AdminNewLeadEmail,
  subject: (data: Record<string, any>) => {
    const form = formacionLabels[data.tipo_formacion] || data.tipo_formacion || 'General'
    return `Nuevo lead: ${form} - ${data.nombre || ''} ${data.apellidos || ''}`
  },
  displayName: 'Notificación admin — nuevo lead',
  to: ADMIN_EMAIL,
  previewData: {
    nombre: 'Carlos', apellidos: 'García', email: 'carlos@example.com',
    telefono: '+34 612 345 678', experiencia: 'con_experiencia', centro_propio: 'no',
    inversion: '2000_5000', tipo_formacion: 'detailing', mensaje: 'Me gustaría información sobre el curso.',
    source: 'contact_page',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif" }
const container = { maxWidth: '600px', margin: '0 auto' }
const header = { backgroundColor: '#8B2332', padding: '30px 40px' }
const headerTitle = { margin: '0', color: '#FFF', fontSize: '22px', fontWeight: '700' }
const headerDate = { margin: '8px 0 0', color: 'rgba(255,255,255,0.85)', fontSize: '14px' }
const content = { padding: '24px 40px' }
const badge = { display: 'inline-block' as const, backgroundColor: '#374151', color: '#FFF', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', marginRight: '8px' }
const infoBox = { backgroundColor: '#F9FAFB', borderRadius: '8px', border: '1px solid #E5E7EB', padding: '20px', marginBottom: '20px' }
const infoLabel = { color: '#6B7280', fontSize: '13px', margin: '8px 0 2px' }
const infoValue = { color: '#111827', fontSize: '16px', fontWeight: '500', margin: '0 0 8px' }
const infoLink = { color: '#8B2332', fontSize: '16px', fontWeight: '500', textDecoration: 'none', display: 'block' as const, marginBottom: '8px' }
const sectionTitle = { margin: '0 0 12px', color: '#111827', fontSize: '16px', fontWeight: '600' }
const messageBox = { backgroundColor: '#F9FAFB', borderRadius: '8px', padding: '20px', borderLeft: '4px solid #8B2332', marginBottom: '24px' }
const messageText = { margin: '0', color: '#374151', fontSize: '15px', lineHeight: '1.6' }
const ctaSection = { textAlign: 'center' as const, margin: '0 0 24px' }
const ctaButton = { backgroundColor: '#8B2332', color: '#FFF', padding: '14px 32px', borderRadius: '8px', fontSize: '15px', fontWeight: '600', textDecoration: 'none' }
const footer = { backgroundColor: '#F9FAFB', padding: '20px 40px', borderTop: '1px solid #E5E7EB', textAlign: 'center' as const }
const footerText = { margin: '0', color: '#6B7280', fontSize: '12px' }
