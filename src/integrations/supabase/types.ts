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
          apellidos: string
          centro_propio: string
          created_at: string
          email: string
          experiencia: string
          id: string
          inversion: string
          mensaje: string | null
          nombre: string
          telefono: string
          tipo_formacion: string
        }
        Insert: {
          acepto_privacidad?: boolean
          apellidos: string
          centro_propio: string
          created_at?: string
          email: string
          experiencia: string
          id?: string
          inversion: string
          mensaje?: string | null
          nombre: string
          telefono: string
          tipo_formacion: string
        }
        Update: {
          acepto_privacidad?: boolean
          apellidos?: string
          centro_propio?: string
          created_at?: string
          email?: string
          experiencia?: string
          id?: string
          inversion?: string
          mensaje?: string | null
          nombre?: string
          telefono?: string
          tipo_formacion?: string
        }
        Relationships: []
      }
      detailer_profiles: {
        Row: {
          address: string | null
          business_name: string
          city: string
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
          phone: string | null
          province: string
          services: string[] | null
          slug: string
          website_url: string | null
          whatsapp_number: string | null
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          business_name: string
          city: string
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
          phone?: string | null
          province: string
          services?: string[] | null
          slug: string
          website_url?: string | null
          whatsapp_number?: string | null
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          business_name?: string
          city?: string
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
          phone?: string | null
          province?: string
          services?: string[] | null
          slug?: string
          website_url?: string | null
          whatsapp_number?: string | null
          zip_code?: string | null
        }
        Relationships: []
      }
      directory_applications: {
        Row: {
          business_name: string
          city: string
          course_name: string | null
          created_at: string
          email: string
          experience_level: string | null
          has_taken_course: boolean | null
          id: string
          message: string | null
          owner_name: string
          phone: string
          province: string
          services: string[] | null
          status: string
        }
        Insert: {
          business_name: string
          city: string
          course_name?: string | null
          created_at?: string
          email: string
          experience_level?: string | null
          has_taken_course?: boolean | null
          id?: string
          message?: string | null
          owner_name: string
          phone: string
          province: string
          services?: string[] | null
          status?: string
        }
        Update: {
          business_name?: string
          city?: string
          course_name?: string | null
          created_at?: string
          email?: string
          experience_level?: string | null
          has_taken_course?: boolean | null
          id?: string
          message?: string | null
          owner_name?: string
          phone?: string
          province?: string
          services?: string[] | null
          status?: string
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
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
      payment_status: ["pending", "completed", "cancelled", "expired"],
    },
  },
} as const
