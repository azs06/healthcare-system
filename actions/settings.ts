"use server"

import { createServerSupabaseClient } from "@/lib/supabase"

export async function getSystemSettings() {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("settings").select("*")

  if (error) {
    console.error("Error fetching settings:", error)
    return null
  }

  // Convert array of settings to an object
  const settingsObject = data.reduce(
    (acc, setting) => {
      acc[setting.setting_key] = setting.setting_value
      return acc
    },
    {} as Record<string, string | null>,
  )

  return settingsObject
}

export async function updateSystemSetting(key: string, value: string) {
  const supabase = createServerSupabaseClient()

  const { error } = await supabase.from("settings").update({ setting_value: value }).eq("setting_key", key)

  if (error) {
    console.error("Error updating setting:", error)
    return { success: false, error: error.message }
  }

  return { success: true }
}
