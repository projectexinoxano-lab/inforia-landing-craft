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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      patients: {
        Row: {
          birth_date: string | null
          created_at: string | null
          direccion_fisica: string | null
          email: string | null
          google_sheet_id: string | null
          id: string
          name: string
          notes: string | null
          persona_rescate_email: string | null
          persona_rescate_nombre: string | null
          persona_rescate_telefono: string | null
          phone: string | null
          sexo: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          birth_date?: string | null
          created_at?: string | null
          direccion_fisica?: string | null
          email?: string | null
          google_sheet_id?: string | null
          id?: string
          name: string
          notes?: string | null
          persona_rescate_email?: string | null
          persona_rescate_nombre?: string | null
          persona_rescate_telefono?: string | null
          phone?: string | null
          sexo?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          birth_date?: string | null
          created_at?: string | null
          direccion_fisica?: string | null
          email?: string | null
          google_sheet_id?: string | null
          id?: string
          name?: string
          notes?: string | null
          persona_rescate_email?: string | null
          persona_rescate_nombre?: string | null
          persona_rescate_telefono?: string | null
          phone?: string | null
          sexo?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          billing_address: string | null
          billing_city: string | null
          billing_country: string | null
          billing_email: string | null
          billing_name: string | null
          billing_postal_code: string | null
          clinic_name: string | null
          collegiate_number: string | null
          created_at: string | null
          credits_limit: number | null
          credits_used: number | null
          email: string | null
          full_name: string | null
          id: string
          nif_dni: string | null
          onboarding_completed: boolean | null
          phone: string | null
          physical_address: string | null
          plan_type: string | null
          professional_license: string | null
          specialties: string | null
          subscription_status: string | null
          tax_id: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          billing_address?: string | null
          billing_city?: string | null
          billing_country?: string | null
          billing_email?: string | null
          billing_name?: string | null
          billing_postal_code?: string | null
          clinic_name?: string | null
          collegiate_number?: string | null
          created_at?: string | null
          credits_limit?: number | null
          credits_used?: number | null
          email?: string | null
          full_name?: string | null
          id: string
          nif_dni?: string | null
          onboarding_completed?: boolean | null
          phone?: string | null
          physical_address?: string | null
          plan_type?: string | null
          professional_license?: string | null
          specialties?: string | null
          subscription_status?: string | null
          tax_id?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          billing_address?: string | null
          billing_city?: string | null
          billing_country?: string | null
          billing_email?: string | null
          billing_name?: string | null
          billing_postal_code?: string | null
          clinic_name?: string | null
          collegiate_number?: string | null
          created_at?: string | null
          credits_limit?: number | null
          credits_used?: number | null
          email?: string | null
          full_name?: string | null
          id?: string
          nif_dni?: string | null
          onboarding_completed?: boolean | null
          phone?: string | null
          physical_address?: string | null
          plan_type?: string | null
          professional_license?: string | null
          specialties?: string | null
          subscription_status?: string | null
          tax_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      reports: {
        Row: {
          audio_file_id: string | null
          audio_transcription: string | null
          content: string | null
          created_at: string | null
          google_drive_file_id: string | null
          id: string
          input_type: string
          patient_id: string
          report_type: string
          status: string | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          audio_file_id?: string | null
          audio_transcription?: string | null
          content?: string | null
          created_at?: string | null
          google_drive_file_id?: string | null
          id?: string
          input_type: string
          patient_id: string
          report_type: string
          status?: string | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          audio_file_id?: string | null
          audio_transcription?: string | null
          content?: string | null
          created_at?: string | null
          google_drive_file_id?: string | null
          id?: string
          input_type?: string
          patient_id?: string
          report_type?: string
          status?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reports_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_credits_used: {
        Args: { user_id: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
