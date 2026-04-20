/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface EmailChangeEmailProps {
  siteName: string
  email: string
  newEmail: string
  confirmationUrl: string
}

export const EmailChangeEmail = ({ siteName, email, newEmail, confirmationUrl }: EmailChangeEmailProps) => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>Confirma el cambio de email en {siteName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={brand}>DETAIL PARK</Heading>
          <Text style={brandSub}>Academy</Text>
        </Section>
        <Section style={content}>
          <Heading style={h1}>Confirma el cambio de email</Heading>
          <Text style={text}>
            Has solicitado cambiar tu email en {siteName} de{' '}
            <Link href={`mailto:${email}`} style={link}>{email}</Link>{' '}a{' '}
            <Link href={`mailto:${newEmail}`} style={link}>{newEmail}</Link>.
          </Text>
          <Text style={text}>Haz clic en el botón para confirmar el cambio:</Text>
          <Section style={ctaSection}>
            <Button style={button} href={confirmationUrl}>Confirmar cambio de email</Button>
          </Section>
          <Text style={footer}>
            Si no solicitaste este cambio, asegura tu cuenta inmediatamente.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default EmailChangeEmail

const main = { backgroundColor: '#ffffff', fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif" }
const container = { maxWidth: '600px', margin: '0 auto' }
const header = { backgroundColor: '#8B2332', padding: '32px 40px', textAlign: 'center' as const }
const brand = { margin: '0 0 4px', color: '#FFFFFF', fontSize: '24px', fontWeight: 'bold' as const, letterSpacing: '1px' }
const brandSub = { margin: 0, color: 'rgba(255,255,255,0.9)', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase' as const }
const content = { padding: '40px' }
const h1 = { fontSize: '22px', fontWeight: 'bold' as const, color: '#1a1a1f', margin: '0 0 20px' }
const text = { fontSize: '15px', color: '#374151', lineHeight: '1.6', margin: '0 0 20px' }
const link = { color: '#8B2332', textDecoration: 'underline' }
const ctaSection = { textAlign: 'center' as const, margin: '0 0 24px' }
const button = { backgroundColor: '#8B2332', color: '#FFFFFF', fontSize: '15px', fontWeight: 'bold' as const, borderRadius: '8px', padding: '14px 28px', textDecoration: 'none', display: 'inline-block' }
const footer = { fontSize: '12px', color: '#999999', margin: '30px 0 0' }
