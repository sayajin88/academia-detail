import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Button, Section, Link, Row, Column, Hr,
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

// Lead temperature derived only from data already collected in the form.
const getTemperature = (inversion: string, experiencia: string, centro: string) => {
  let score = 0
  if (inversion === 'mas_5000') score += 3
  else if (inversion === '2000_5000') score += 2
  else if (inversion === '500_2000') score += 1
  if (experiencia === 'con_experiencia') score += 1
  if (centro === 'si') score += 2

  if (score >= 4) return { label: 'Lead caliente', color: '#8B2332', bg: '#FBEAEC' }
  if (score >= 2) return { label: 'Lead templado', color: '#8A5A16', bg: '#FDF3E3' }
  return { label: 'Lead inicial', color: '#3F4551', bg: '#EEF0F3' }
}

const cleanPhone = (t: string) => t.replace(/[^\d+]/g, '')

const AdminNewLeadEmail = (props: AdminNewLeadProps) => {
  const {
    nombre = '', apellidos = '', email = '', telefono = '',
    experiencia = '', centro_propio = '', inversion = '',
    tipo_formacion = '', mensaje = '', source = '',
  } = props

  const fullName = `${nombre} ${apellidos}`.trim() || 'Sin nombre'
  const formLabel = formacionLabels[tipo_formacion] || tipo_formacion || 'Sin especificar'
  const expLabel = experienciaLabels[experiencia] || experiencia || '—'
  const centLabel = centroLabels[centro_propio] || centro_propio || '—'
  const invLabel = inversionLabels[inversion] || inversion || '—'
  const srcLabel = sourceLabels[source] || source || 'Web'
  const temp = getTemperature(inversion, experiencia, centro_propio)
  const phone = cleanPhone(telefono)

  const now = new Date()
  const dateLabel = now.toLocaleDateString('es-ES', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Madrid',
  })
  const timeLabel = now.toLocaleTimeString('es-ES', {
    hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Madrid',
  })

  return (
    <Html lang="es" dir="ltr">
      <Head />
      <Preview>{`${formLabel} · ${fullName} · ${invLabel}`}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Accent rule */}
          <Section style={accentBar} />

          {/* Header */}
          <Section style={header}>
            <Row>
              <Column style={{ width: '46px', verticalAlign: 'middle' }}>
                <Text style={monogram}>AD</Text>
              </Column>
              <Column style={{ verticalAlign: 'middle', paddingLeft: '14px' }}>
                <Text style={brandKicker}>DETAIL PARK · ACADEMIA DETAIL</Text>
                <Heading style={headerTitle}>Nuevo lead de contacto</Heading>
              </Column>
            </Row>
            <Text style={headerMeta}>{dateLabel} · {timeLabel} h (Madrid)</Text>
          </Section>

          {/* Hero: name + training */}
          <Section style={hero}>
            <Text style={{ ...chip, color: temp.color, backgroundColor: temp.bg }}>{temp.label}</Text>
            <Heading as="h2" style={leadName}>{fullName}</Heading>
            <Text style={leadInterest}>
              Interesado en <span style={leadInterestStrong}>{formLabel}</span>
            </Text>
            <Text style={sourceLine}>Origen: {srcLabel}</Text>
          </Section>

          {/* Contact + actions */}
          <Section style={block}>
            <Text style={eyebrow}>Contacto directo</Text>
            <Section style={card}>
              <Row style={contactRow}>
                <Column style={contactKeyCol}><Text style={contactKey}>Email</Text></Column>
                <Column><Link href={`mailto:${email}`} style={contactValue}>{email || '—'}</Link></Column>
              </Row>
              <Hr style={hairline} />
              <Row style={contactRow}>
                <Column style={contactKeyCol}><Text style={contactKey}>Teléfono</Text></Column>
                <Column><Link href={`tel:${phone}`} style={contactValue}>{telefono || '—'}</Link></Column>
              </Row>
            </Section>

            <Row style={{ marginTop: '16px' }}>
              <Column style={{ paddingRight: '6px' }}>
                <Button
                  href={`mailto:${email}?subject=${encodeURIComponent(`Re: ${formLabel} - Detail Park Academia Detail`)}`}
                  style={btnPrimary}
                >
                  Responder por email
                </Button>
              </Column>
              {phone && (
                <Column style={{ paddingLeft: '6px' }}>
                  <Button href={`https://wa.me/${phone.replace(/\D/g, '')}`} style={btnSecondary}>
                    WhatsApp
                  </Button>
                </Column>
              )}
            </Row>
            {phone && (
              <Text style={callLine}>
                O llama directamente: <Link href={`tel:${phone}`} style={callLink}>{telefono}</Link>
              </Text>
            )}
          </Section>

          {/* Qualification grid */}
          <Section style={block}>
            <Text style={eyebrow}>Cualificación</Text>
            <Section style={card}>
              <Row>
                <Column style={gridCell}>
                  <Text style={gridKey}>EXPERIENCIA</Text>
                  <Text style={gridValue}>{expLabel}</Text>
                </Column>
                <Column style={gridCell}>
                  <Text style={gridKey}>CENTRO PROPIO</Text>
                  <Text style={gridValue}>{centLabel}</Text>
                </Column>
              </Row>
              <Hr style={hairline} />
              <Row>
                <Column style={gridCell}>
                  <Text style={gridKey}>INVERSIÓN PREVISTA</Text>
                  <Text style={gridValue}>{invLabel}</Text>
                </Column>
                <Column style={gridCell}>
                  <Text style={gridKey}>FORMACIÓN DESEADA</Text>
                  <Text style={gridValue}>{formLabel}</Text>
                </Column>
              </Row>
            </Section>
          </Section>

          {/* Message */}
          {mensaje && (
            <Section style={block}>
              <Text style={eyebrow}>Mensaje del lead</Text>
              <Section style={quoteBox}>
                <Text style={quoteMark}>&ldquo;</Text>
                <Text style={quoteText}>{mensaje}</Text>
              </Section>
            </Section>
          )}

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerBrand}>Detail Park · Academia Detail</Text>
            <Text style={footerText}>
              Notificación automática del formulario de contacto.{' '}
              <Link href="https://academiadetail.com/admin/contacts" style={footerLink}>
                Ver todos los leads
              </Link>
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
    return `Nuevo lead: ${form} - ${data.nombre || ''} ${data.apellidos || ''}`.trim()
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

/* ---------- styles ---------- */
const font = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif"

const main = { backgroundColor: '#ffffff', fontFamily: font, margin: '0', padding: '0' }
const container = { maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff' }

const accentBar = { height: '4px', backgroundColor: '#8B2332', lineHeight: '4px', fontSize: '0' }

const header = { backgroundColor: '#1a1a1f', padding: '28px 32px 24px' }
const monogram = {
  margin: '0',
  width: '46px',
  height: '46px',
  lineHeight: '44px',
  textAlign: 'center' as const,
  border: '1px solid rgba(255,255,255,0.28)',
  borderRadius: '10px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '700',
  letterSpacing: '1px',
}
const brandKicker = { margin: '0 0 4px', color: '#8B2332', fontSize: '10px', fontWeight: '700', letterSpacing: '1.6px' }
const headerTitle = { margin: '0', color: '#ffffff', fontSize: '20px', fontWeight: '700', letterSpacing: '-0.3px' }
const headerMeta = { margin: '18px 0 0', color: 'rgba(255,255,255,0.55)', fontSize: '12px', letterSpacing: '0.2px' }

const hero = { padding: '28px 32px 22px', borderBottom: '1px solid #ECEDEF' }
const chip = {
  display: 'inline-block' as const,
  margin: '0 0 12px',
  padding: '5px 12px',
  borderRadius: '999px',
  fontSize: '11px',
  fontWeight: '700',
  letterSpacing: '0.8px',
  textTransform: 'uppercase' as const,
}
const leadName = { margin: '0', color: '#1a1a1f', fontSize: '30px', lineHeight: '1.15', fontWeight: '700', letterSpacing: '-0.8px' }
const leadInterest = { margin: '10px 0 0', color: '#4B5261', fontSize: '15px' }
const leadInterestStrong = { color: '#8B2332', fontWeight: '700' }
const sourceLine = { margin: '6px 0 0', color: '#8A909C', fontSize: '12px' }

const block = { padding: '24px 32px 0' }
const eyebrow = { margin: '0 0 10px', color: '#8A909C', fontSize: '10px', fontWeight: '700', letterSpacing: '1.4px', textTransform: 'uppercase' as const }
const card = { border: '1px solid #ECEDEF', borderRadius: '12px', padding: '4px 18px', backgroundColor: '#FCFCFD' }

const contactRow = { padding: '0' }
const contactKeyCol = { width: '92px', verticalAlign: 'middle' as const }
const contactKey = { margin: '14px 0', color: '#8A909C', fontSize: '13px' }
const contactValue = { color: '#1a1a1f', fontSize: '15px', fontWeight: '600', textDecoration: 'none', display: 'inline-block' as const, margin: '14px 0' }
const hairline = { border: 'none', borderTop: '1px solid #ECEDEF', margin: '0' }

const btnPrimary = {
  display: 'block' as const,
  backgroundColor: '#8B2332',
  color: '#ffffff',
  padding: '13px 18px',
  borderRadius: '10px',
  fontSize: '14px',
  fontWeight: '700',
  textDecoration: 'none',
  textAlign: 'center' as const,
}
const btnSecondary = {
  display: 'block' as const,
  backgroundColor: '#1a1a1f',
  color: '#ffffff',
  padding: '13px 18px',
  borderRadius: '10px',
  fontSize: '14px',
  fontWeight: '700',
  textDecoration: 'none',
  textAlign: 'center' as const,
}
const callLine = { margin: '12px 0 0', color: '#8A909C', fontSize: '12px', textAlign: 'center' as const }
const callLink = { color: '#8B2332', fontWeight: '600', textDecoration: 'none' }

const gridCell = { width: '50%', verticalAlign: 'top' as const, padding: '14px 10px 14px 0' }
const gridKey = { margin: '0 0 4px', color: '#8A909C', fontSize: '10px', fontWeight: '700', letterSpacing: '1px' }
const gridValue = { margin: '0', color: '#1a1a1f', fontSize: '15px', fontWeight: '600', lineHeight: '1.35' }

const quoteBox = { backgroundColor: '#FBF7F7', borderLeft: '3px solid #8B2332', borderRadius: '0 12px 12px 0', padding: '16px 20px' }
const quoteMark = { margin: '0', color: '#8B2332', fontSize: '30px', lineHeight: '20px', fontWeight: '700' }
const quoteText = { margin: '6px 0 0', color: '#3F4551', fontSize: '15px', lineHeight: '1.65' }

const footer = { marginTop: '28px', backgroundColor: '#1a1a1f', padding: '22px 32px', textAlign: 'center' as const }
const footerBrand = { margin: '0 0 6px', color: '#ffffff', fontSize: '12px', fontWeight: '700', letterSpacing: '1px' }
const footerText = { margin: '0', color: 'rgba(255,255,255,0.5)', fontSize: '11px', lineHeight: '1.6' }
const footerLink = { color: '#C9707C', textDecoration: 'none', fontWeight: '600' }
