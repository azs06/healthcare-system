"use server"

import { createServerSupabaseClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"
import type { Database } from "@/types/supabase"

type Patient = Database["public"]["Tables"]["patients"]["Insert"]
type PatientUpdate = Database["public"]["Tables"]["patients"]["Update"]

export async function getPatients() {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("patients").select("*").order("id", { ascending: true })

  if (error) {
    console.error("Error fetching patients:", error)
    return []
  }

  return data
}

export async function getPatientById(id: number) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("patients").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching patient:", error)
    return null
  }

  return data
}

export async function createPatient(patient: Patient) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("patients").insert(patient).select()

  if (error) {
    console.error("Error creating patient:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/dashboard/patients")
  return { success: true, data: data[0] }
}

export async function updatePatient(id: number, patient: PatientUpdate) {
  const supabase = createServerSupabaseClient()

  const { error } = await supabase.from("patients").update(patient).eq("id", id)

  if (error) {
    console.error("Error updating patient:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/dashboard/patients")
  return { success: true }
}

export async function deletePatient(id: number) {
  const supabase = createServerSupabaseClient()

  const { error } = await supabase.from("patients").delete().eq("id", id)

  if (error) {
    console.error("Error deleting patient:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/dashboard/patients")
  return { success: true }
}
