export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      blog_newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_image: string | null
          author_name: string
          author_role: string
          category: string
          created_at: string
          created_by: string | null
          excerpt: string
          featured: boolean
          id: string
          image_alt: string
          image_url: string | null
          published_at: string
          readability_score: number | null
          reading_time: string
          related_slugs: string[]
          sections: Json
          seo_score: number | null
          slug: string
          status: string
          tags: string[]
          title: string
          updated_at: string
        }
        Insert: {
          author_image?: string | null
          author_name?: string
          author_role?: string
          category?: string
          created_at?: string
          created_by?: string | null
          excerpt?: string
          featured?: boolean
          id?: string
          image_alt?: string
          image_url?: string | null
          published_at?: string
          readability_score?: number | null
          reading_time?: string
          related_slugs?: string[]
          sections?: Json
          seo_score?: number | null
          slug: string
          status?: string
          tags?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          author_image?: string | null
          author_name?: string
          author_role?: string
          category?: string
          created_at?: string
          created_by?: string | null
          excerpt?: string
          featured?: boolean
          id?: string
          image_alt?: string
          image_url?: string | null
          published_at?: string
          readability_score?: number | null
          reading_time?: string
          related_slugs?: string[]
          sections?: Json
          seo_score?: number | null
          slug?: string
          status?: string
          tags?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      coming_soon_subscribers: {
        Row: {
          created_at: string
          email: string
          formation_slug: string
          id: string
          name: string | null
          notified: boolean | null
        }
        Insert: {
          created_at?: string
          email: string
          formation_slug: string
          id?: string
          name?: string | null
          notified?: boolean | null
        }
        Update: {
          created_at?: string
          email?: string
          formation_slug?: string
          id?: string
          name?: string | null
          notified?: boolean | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          acepto_privacidad: boolean
          admin_notes: string | null
          apellidos: string
          centro_propio: string
          contact_status: string
          contacted_at: string | null
          created_at: string
          dossier_clicked_at: string | null
          dossier_email_sent: boolean
          dossier_email_sent_at: string | null
          dossier_opened: boolean
          dossier_opened_at: string | null
          email: string
          experiencia: string
          followup_attempts: number
          followup_email_sent: boolean
          followup_email_sent_at: string | null
          id: string
          inversion: string
          mensaje: string | null
          nombre: string
          telefono: string
          tipo_formacion: string
          tracking_token: string | null
        }
        Insert: {
          acepto_privacidad?: boolean
          admin_notes?: string | null
          apellidos: string
          centro_propio: string
          contact_status?: string
          contacted_at?: string | null
          created_at?: string
          dossier_clicked_at?: string | null
          dossier_email_sent?: boolean
          dossier_email_sent_at?: string | null
          dossier_opened?: boolean
          dossier_opened_at?: string | null
          email: string
          experiencia: string
          followup_attempts?: number
          followup_email_sent?: boolean
          followup_email_sent_at?: string | null
          id?: string
          inversion: string
          mensaje?: string | null
          nombre: string
          telefono: string
          tipo_formacion: string
          tracking_token?: string | null
        }
        Update: {
          acepto_privacidad?: boolean
          admin_notes?: string | null
          apellidos?: string
          centro_propio?: string
          contact_status?: string
          contacted_at?: string | null
          created_at?: string
          dossier_clicked_at?: string | null
          dossier_email_sent?: boolean
          dossier_email_sent_at?: string | null
          dossier_opened?: boolean
          dossier_opened_at?: string | null
          email?: string
          experiencia?: string
          followup_attempts?: number
          followup_email_sent?: boolean
          followup_email_sent_at?: string | null
          id?: string
          inversion?: string
          mensaje?: string | null
          nombre?: string
          telefono?: string
          tipo_formacion?: string
          tracking_token?: string | null
        }
        Relationships: []
      }
      detailer_profiles: {
        Row: {
          address: string | null
          business_name: string
          city: string
          comunidad_autonoma: string | null
          created_at: string
          description: string | null
          email: string
          featured_image_url: string | null
          id: string
          instagram_handle: string | null
          is_published: boolean | null
          is_verified: boolean | null
          latitude: number | null
          level_badge: string
          longitude: number | null
          owner_name: string
          owner_photo_url: string | null
          phone: string | null
          profile_type: string
          province: string
          services: string[] | null
          skills: string[] | null
          slug: string
          specialty: string | null
          website_url: string | null
          whatsapp_number: string | null
          years_experience: number | null
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          business_name: string
          city: string
          comunidad_autonoma?: string | null
          created_at?: string
          description?: string | null
          email: string
          featured_image_url?: string | null
          id?: string
          instagram_handle?: string | null
          is_published?: boolean | null
          is_verified?: boolean | null
          latitude?: number | null
          level_badge?: string
          longitude?: number | null
          owner_name: string
          owner_photo_url?: string | null
          phone?: string | null
          profile_type?: string
          province: string
          services?: string[] | null
          skills?: string[] | null
          slug: string
          specialty?: string | null
          website_url?: string | null
          whatsapp_number?: string | null
          years_experience?: number | null
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          business_name?: string
          city?: string
          comunidad_autonoma?: string | null
          created_at?: string
          description?: string | null
          email?: string
          featured_image_url?: string | null
          id?: string
          instagram_handle?: string | null
          is_published?: boolean | null
          is_verified?: boolean | null
          latitude?: number | null
          level_badge?: string
          longitude?: number | null
          owner_name?: string
          owner_photo_url?: string | null
          phone?: string | null
          profile_type?: string
          province?: string
          services?: string[] | null
          skills?: string[] | null
          slug?: string
          specialty?: string | null
          website_url?: string | null
          whatsapp_number?: string | null
          years_experience?: number | null
          zip_code?: string | null
        }
        Relationships: []
      }
      directory_application_logs: {
        Row: {
          action: string
          admin_id: string
          application_id: string
          created_at: string | null
          id: string
          reason: string | null
        }
        Insert: {
          action: string
          admin_id: string
          application_id: string
          created_at?: string | null
          id?: string
          reason?: string | null
        }
        Update: {
          action?: string
          admin_id?: string
          application_id?: string
          created_at?: string | null
          id?: string
          reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "directory_application_logs_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "directory_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      directory_applications: {
        Row: {
          address: string | null
          brands: string[] | null
          business_name: string
          city: string
          course_name: string | null
          created_at: string
          description: string | null
          email: string
          experience_level: string | null
          gallery_urls: string[] | null
          has_insurance: boolean | null
          has_taken_course: boolean | null
          id: string
          instagram_handle: string | null
          logo_url: string | null
          message: string | null
          owner_name: string
          owner_photo_url: string | null
          phone: string
          portfolio_url: string | null
          profile_type: string
          province: string
          services: string[] | null
          skills: string[] | null
          specialty: string | null
          status: string
          value_proposition: string | null
          website_url: string | null
          whatsapp_number: string | null
          years_experience: number | null
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          brands?: string[] | null
          business_name: string
          city: string
          course_name?: string | null
          created_at?: string
          description?: string | null
          email: string
          experience_level?: string | null
          gallery_urls?: string[] | null
          has_insurance?: boolean | null
          has_taken_course?: boolean | null
          id?: string
          instagram_handle?: string | null
          logo_url?: string | null
          message?: string | null
          owner_name: string
          owner_photo_url?: string | null
          phone: string
          portfolio_url?: string | null
          profile_type?: string
          province: string
          services?: string[] | null
          skills?: string[] | null
          specialty?: string | null
          status?: string
          value_proposition?: string | null
          website_url?: string | null
          whatsapp_number?: string | null
          years_experience?: number | null
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          brands?: string[] | null
          business_name?: string
          city?: string
          course_name?: string | null
          created_at?: string
          description?: string | null
          email?: string
          experience_level?: string | null
          gallery_urls?: string[] | null
          has_insurance?: boolean | null
          has_taken_course?: boolean | null
          id?: string
          instagram_handle?: string | null
          logo_url?: string | null
          message?: string | null
          owner_name?: string
          owner_photo_url?: string | null
          phone?: string
          portfolio_url?: string | null
          profile_type?: string
          province?: string
          services?: string[] | null
          skills?: string[] | null
          specialty?: string | null
          status?: string
          value_proposition?: string | null
          website_url?: string | null
          whatsapp_number?: string | null
          years_experience?: number | null
          zip_code?: string | null
        }
        Relationships: []
      }
      email_send_log: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          message_id: string | null
          metadata: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email?: string
          status?: string
          template_name?: string
        }
        Relationships: []
      }
      email_send_state: {
        Row: {
          auth_email_ttl_minutes: number
          batch_size: number
          id: number
          retry_after_until: string | null
          send_delay_ms: number
          transactional_email_ttl_minutes: number
          updated_at: string
        }
        Insert: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Update: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Relationships: []
      }
      email_unsubscribe_tokens: {
        Row: {
          created_at: string
          email: string
          id: string
          token: string
          used_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          token: string
          used_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          token?: string
          used_at?: string | null
        }
        Relationships: []
      }
      portfolio_images: {
        Row: {
          after_image_url: string | null
          before_image_url: string | null
          created_at: string
          detailer_id: string
          id: string
          title: string | null
        }
        Insert: {
          after_image_url?: string | null
          before_image_url?: string | null
          created_at?: string
          detailer_id: string
          id?: string
          title?: string | null
        }
        Update: {
          after_image_url?: string | null
          before_image_url?: string | null
          created_at?: string
          detailer_id?: string
          id?: string
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_images_detailer_id_fkey"
            columns: ["detailer_id"]
            isOneToOne: false
            referencedRelation: "detailer_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      registrations: {
        Row: {
          accept_marketing: boolean
          accept_terms: boolean
          created_at: string
          email: string
          event_date: string
          first_name: string
          id: string
          last_name: string
          notes: string | null
          payment_link_sent_at: string | null
          payment_status: Database["public"]["Enums"]["payment_status"]
          phone: string
          reminder_sent: boolean | null
          reservation_expires_at: string | null
          updated_at: string
        }
        Insert: {
          accept_marketing?: boolean
          accept_terms?: boolean
          created_at?: string
          email: string
          event_date?: string
          first_name: string
          id?: string
          last_name: string
          notes?: string | null
          payment_link_sent_at?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"]
          phone: string
          reminder_sent?: boolean | null
          reservation_expires_at?: string | null
          updated_at?: string
        }
        Update: {
          accept_marketing?: boolean
          accept_terms?: boolean
          created_at?: string
          email?: string
          event_date?: string
          first_name?: string
          id?: string
          last_name?: string
          notes?: string | null
          payment_link_sent_at?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"]
          phone?: string
          reminder_sent?: boolean | null
          reservation_expires_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      suppressed_emails: {
        Row: {
          created_at: string
          email: string
          id: string
          metadata: Json | null
          reason: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          metadata?: Json | null
          reason: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          metadata?: Json | null
          reason?: string
        }
        Relationships: []
      }
      up_detail_preregistrations: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: string
          user_id: string
        }
        Insert: {
          id?: string
          role?: string
          user_id: string
        }
        Update: {
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_email: {
        Args: { message_id: number; queue_name: string }
        Returns: boolean
      }
      enqueue_email: {
        Args: { payload: Json; queue_name: string }
        Returns: number
      }
      has_role: { Args: { _role: string; _user_id: string }; Returns: boolean }
      move_to_dlq: {
        Args: {
          dlq_name: string
          message_id: number
          payload: Json
          source_queue: string
        }
        Returns: number
      }
      read_email_batch: {
        Args: { batch_size: number; queue_name: string; vt: number }
        Returns: {
          message: Json
          msg_id: number
          read_ct: number
        }[]
      }
    }
    Enums: {
      app_role: "admin" | "user"
      payment_status: "pending" | "completed" | "cancelled" | "expired"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      payment_status: ["pending", "completed", "cancelled", "expired"],
    },
  },
} as const
