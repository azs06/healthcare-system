export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: "doctor" | "admin" | "receptionist"
          status: "active" | "inactive"
          created_at: string
          updated_at: string
          last_login: string | null
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role: "doctor" | "admin" | "receptionist"
          status?: "active" | "inactive"
          created_at?: string
          updated_at?: string
          last_login?: string | null
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: "doctor" | "admin" | "receptionist"
          status?: "active" | "inactive"
          created_at?: string
          updated_at?: string
          last_login?: string | null
        }
      }
      patients: {
        Row: {
          id: number
          name: string
          age: number | null
          gender: "Male" | "Female" | "Other" | null
          contact: string | null
          email: string | null
          address: string | null
          medical_history: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          age?: number | null
          gender?: "Male" | "Female" | "Other" | null
          contact?: string | null
          email?: string | null
          address?: string | null
          medical_history?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          age?: number | null
          gender?: "Male" | "Female" | "Other" | null
          contact?: string | null
          email?: string | null
          address?: string | null
          medical_history?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: number
          name: string
          description: string | null
          price: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          description?: string | null
          price: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          description?: string | null
          price?: number
          created_at?: string
          updated_at?: string
        }
      }
      appointments: {
        Row: {
          id: number
          patient_id: number
          date: string
          time: string
          duration: number
          type: string
          status: "Pending" | "Confirmed" | "Cancelled" | "Completed"
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          patient_id: number
          date: string
          time: string
          duration?: number
          type: string
          status?: "Pending" | "Confirmed" | "Cancelled" | "Completed"
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          patient_id?: number
          date?: string
          time?: string
          duration?: number
          type?: string
          status?: "Pending" | "Confirmed" | "Cancelled" | "Completed"
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      bills: {
        Row: {
          id: number
          patient_id: number
          date: string
          amount: number
          discount: number
          paid_amount: number
          due_amount: number
          status: "Paid" | "Unpaid" | "Partial"
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          patient_id: number
          date?: string
          amount: number
          discount?: number
          paid_amount?: number
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          patient_id?: number
          date?: string
          amount?: number
          discount?: number
          paid_amount?: number
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      bill_items: {
        Row: {
          id: number
          bill_id: number
          service_id: number
          quantity: number
          price: number
          total: number
          created_at: string
        }
        Insert: {
          id?: number
          bill_id: number
          service_id: number
          quantity?: number
          price: number
          created_at?: string
        }
        Update: {
          id?: number
          bill_id?: number
          service_id?: number
          quantity?: number
          price?: number
          created_at?: string
        }
      }
      payments: {
        Row: {
          id: number
          bill_id: number
          amount: number
          payment_date: string
          payment_method: string
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: number
          bill_id: number
          amount: number
          payment_date?: string
          payment_method?: string
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          bill_id?: number
          amount?: number
          payment_date?: string
          payment_method?: string
          notes?: string | null
          created_at?: string
        }
      }
      due_payments: {
        Row: {
          id: number
          bill_id: number
          due_date: string
          amount: number
          status: "Pending" | "Paid" | "Overdue"
          last_reminder_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          bill_id: number
          due_date: string
          amount: number
          status?: "Pending" | "Paid" | "Overdue"
          last_reminder_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          bill_id?: number
          due_date?: string
          amount?: number
          status?: "Pending" | "Paid" | "Overdue"
          last_reminder_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      sms_messages: {
        Row: {
          id: number
          recipient_id: number | null
          recipient_phone: string
          message: string
          status: "Pending" | "Sent" | "Delivered" | "Failed"
          sent_at: string | null
          created_at: string
        }
        Insert: {
          id?: number
          recipient_id?: number | null
          recipient_phone: string
          message: string
          status?: "Pending" | "Sent" | "Delivered" | "Failed"
          sent_at?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          recipient_id?: number | null
          recipient_phone?: string
          message?: string
          status?: "Pending" | "Sent" | "Delivered" | "Failed"
          sent_at?: string | null
          created_at?: string
        }
      }
      settings: {
        Row: {
          id: number
          setting_key: string
          setting_value: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          setting_key: string
          setting_value?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          setting_key?: string
          setting_value?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
