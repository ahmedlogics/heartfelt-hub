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
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      order_status_events: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          note: string | null
          order_id: string
          status: Database["public"]["Enums"]["order_status"]
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          note?: string | null
          order_id: string
          status: Database["public"]["Enums"]["order_status"]
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          note?: string | null
          order_id?: string
          status?: Database["public"]["Enums"]["order_status"]
        }
        Relationships: [
          {
            foreignKeyName: "order_status_events_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          base_fare: number
          care_fee: number
          created_at: string
          customer_id: string
          distance_fare: number
          distance_km: number
          dropoff_address: string
          dropoff_lat: number
          dropoff_lng: number
          handle_with_care: boolean
          id: string
          parcel_description: string
          pickup_address: string
          pickup_lat: number
          pickup_lng: number
          priority: Database["public"]["Enums"]["order_priority"]
          recipient_name: string
          recipient_phone: string
          rider_id: string | null
          service_area_id: string
          status: Database["public"]["Enums"]["order_status"]
          total_fare: number
          updated_at: string
          vehicle_type: Database["public"]["Enums"]["vehicle_type"]
        }
        Insert: {
          base_fare: number
          care_fee: number
          created_at?: string
          customer_id: string
          distance_fare: number
          distance_km: number
          dropoff_address: string
          dropoff_lat: number
          dropoff_lng: number
          handle_with_care?: boolean
          id?: string
          parcel_description: string
          pickup_address: string
          pickup_lat: number
          pickup_lng: number
          priority?: Database["public"]["Enums"]["order_priority"]
          recipient_name: string
          recipient_phone: string
          rider_id?: string | null
          service_area_id: string
          status?: Database["public"]["Enums"]["order_status"]
          total_fare: number
          updated_at?: string
          vehicle_type: Database["public"]["Enums"]["vehicle_type"]
        }
        Update: {
          base_fare?: number
          care_fee?: number
          created_at?: string
          customer_id?: string
          distance_fare?: number
          distance_km?: number
          dropoff_address?: string
          dropoff_lat?: number
          dropoff_lng?: number
          handle_with_care?: boolean
          id?: string
          parcel_description?: string
          pickup_address?: string
          pickup_lat?: number
          pickup_lng?: number
          priority?: Database["public"]["Enums"]["order_priority"]
          recipient_name?: string
          recipient_phone?: string
          rider_id?: string | null
          service_area_id?: string
          status?: Database["public"]["Enums"]["order_status"]
          total_fare?: number
          updated_at?: string
          vehicle_type?: Database["public"]["Enums"]["vehicle_type"]
        }
        Relationships: [
          {
            foreignKeyName: "orders_service_area_id_fkey"
            columns: ["service_area_id"]
            isOneToOne: false
            referencedRelation: "service_areas"
            referencedColumns: ["id"]
          },
        ]
      }
      pricing_rules: {
        Row: {
          base_fare: number
          care_fee: number
          id: string
          is_active: boolean
          per_km_rate: number
          updated_at: string
          vehicle_type: Database["public"]["Enums"]["vehicle_type"]
        }
        Insert: {
          base_fare: number
          care_fee?: number
          id?: string
          is_active?: boolean
          per_km_rate: number
          updated_at?: string
          vehicle_type: Database["public"]["Enums"]["vehicle_type"]
        }
        Update: {
          base_fare?: number
          care_fee?: number
          id?: string
          is_active?: boolean
          per_km_rate?: number
          updated_at?: string
          vehicle_type?: Database["public"]["Enums"]["vehicle_type"]
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string
          id: string
          is_active: boolean
          phone: string | null
        }
        Insert: {
          created_at?: string
          full_name?: string
          id: string
          is_active?: boolean
          phone?: string | null
        }
        Update: {
          created_at?: string
          full_name?: string
          id?: string
          is_active?: boolean
          phone?: string | null
        }
        Relationships: []
      }
      service_areas: {
        Row: {
          center_lat: number
          center_lng: number
          created_at: string
          id: string
          is_active: boolean
          name: string
          radius_km: number
        }
        Insert: {
          center_lat: number
          center_lng: number
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          radius_km: number
        }
        Update: {
          center_lat?: number
          center_lng?: number
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          radius_km?: number
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_order: {
        Args: {
          p_care: boolean
          p_dropoff_address: string
          p_dropoff_lat: number
          p_dropoff_lng: number
          p_parcel_description: string
          p_pickup_address: string
          p_pickup_lat: number
          p_pickup_lng: number
          p_recipient_name: string
          p_recipient_phone: string
          p_vehicle: Database["public"]["Enums"]["vehicle_type"]
        }
        Returns: string
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      haversine_km: {
        Args: { lat1: number; lat2: number; lng1: number; lng2: number }
        Returns: number
      }
      quote_order: {
        Args: {
          p_care: boolean
          p_dropoff_lat: number
          p_dropoff_lng: number
          p_pickup_lat: number
          p_pickup_lng: number
          p_vehicle: Database["public"]["Enums"]["vehicle_type"]
        }
        Returns: Json
      }
    }
    Enums: {
      app_role: "admin" | "customer" | "rider"
      order_priority: "NORMAL" | "HIGH" | "URGENT"
      order_status:
        | "PENDING"
        | "ACCEPTED"
        | "PICKED_UP"
        | "IN_TRANSIT"
        | "DELIVERED"
        | "CANCELLED"
      vehicle_type: "BIKE" | "CARGO"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
      app_role: ["admin", "customer", "rider"],
      order_priority: ["NORMAL", "HIGH", "URGENT"],
      order_status: [
        "PENDING",
        "ACCEPTED",
        "PICKED_UP",
        "IN_TRANSIT",
        "DELIVERED",
        "CANCELLED",
      ],
      vehicle_type: ["BIKE", "CARGO"],
    },
  },
} as const
