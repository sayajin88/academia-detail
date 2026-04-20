/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface RecoveryEmailProps {
  siteName: string
  confirmationUrl: string
}

export const RecoveryEmail = ({ siteName, confirmationUrl }: RecoveryEmailProps) => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>Restablece tu contraseña en {siteName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={brand}>DETAIL PARK</Heading>
          <Text style={brandSub}>Academy</Text>
        </Section>
        <Section style={content}>
          <Heading style={h1}>Restablece tu contraseña</Heading>
          <Text style={text}>
            Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en {siteName}. Haz clic en el botón para elegir una nueva contraseña.
          </Text>
          <Section style={ctaSection}>
            <Button style={button} href={confirmationUrl}>Restablecer contraseña</Button>
          </Section>
          <Text style={footer}>
            Si no solicitaste este cambio, ignora este email. Tu contraseña no se modificará.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default RecoveryEmail

const main = { backgroundColor: '#ffffff', fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif" }
const container = { maxWidth: '600px', margin: '0 auto' }
const header = { backgroundColor: '#8B2332', padding: '32px 40px', textAlign: 'center' as const }
const brand = { margin: '0 0 4px', color: '#FFFFFF', fontSize: '24px', fontWeight: 'bold' as const, letterSpacing: '1px' }
const brandSub = { margin: 0, color: 'rgba(255,255,255,0.9)', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase' as const }
const content = { padding: '40px' }
const h1 = { fontSize: '22px', fontWeight: 'bold' as const, color: '#1a1a1f', margin: '0 0 20px' }
const text = { fontSize: '15px', color: '#374151', lineHeight: '1.6', margin: '0 0 20px' }
const ctaSection = { textAlign: 'center' as const, margin: '0 0 24px' }
const button = { backgroundColor: '#8B2332', color: '#FFFFFF', fontSize: '15px', fontWeight: 'bold' as const, borderRadius: '8px', padding: '14px 28px', textDecoration: 'none', display: 'inline-block' }
const footer = { fontSize: '12px', color: '#999999', margin: '30px 0 0' }
