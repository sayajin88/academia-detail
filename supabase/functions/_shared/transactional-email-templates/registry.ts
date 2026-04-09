/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'

export interface TemplateEntry {
  component: React.ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  to?: string
  displayName?: string
  previewData?: Record<string, any>
}

import { template as contactConfirmation } from './contact-confirmation.tsx'
import { template as contactFollowup } from './contact-followup.tsx'
import { template as adminNewLead } from './admin-new-lead.tsx'

export const TEMPLATES: Record<string, TemplateEntry> = {
  'contact-confirmation': contactConfirmation,
  'contact-followup': contactFollowup,
  'admin-new-lead': adminNewLead,
}
