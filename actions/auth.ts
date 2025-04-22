"use server"

import { createServerSupabaseClient } from "@/lib/supabase"

export async function createUserWithProfile(email: string, password: string, fullName: string, role: string) {
  const supabase = createServerSupabaseClient()

  // Create the user in Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: false, // Auto-confirm the email
  })

  if (authError) {
    console.error("Error creating user:", authError)
    return { success: false, error: authError.message }
  }

  // Create the profile using the service role (bypasses RLS)
  if (authData.user) {
    const { error: profileError } = await supabase.from("profiles").insert({
      id: authData.user.id,
      email,
      full_name: fullName,
      role,
    })

    if (profileError) {
      console.error("Error creating profile:", profileError)
      // Try to clean up the auth user since profile creation failed
      await supabase.auth.admin.deleteUser(authData.user.id)
      return { success: false, error: profileError.message }
    }
  }

  return { success: true }
}
