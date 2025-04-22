"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import type { User } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]

type AuthContextType = {
  user: User | null
  profile: Profile | null
  signIn: (
    email: string,
    password: string,
  ) => Promise<{
    error: any | null
    data: any | null
  }>
  signOut: () => Promise<void>
  loading: boolean,
  signUp: (email: string, password: string, name: string, role: any) => Promise<{
    error: any | null
    data: any | null
  }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [initialized, setInitialized] = useState(false)
  const router = useRouter()

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        console.log("Initializing auth state...")
        const { data, error } = await supabase.auth.getUser()

        if (error) {
          console.error("Error getting user:", error)
          setLoading(false)
          setInitialized(true)
          return
        }

        console.log("Current user:", data.user)
        setUser(data.user)

        if (data.user) {
          console.log("Fetching user profile...")
          const { data: profileData, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", data.user.id)
            .single()

          if (profileError) {
            console.error("Error fetching profile:", profileError)
          } else {
            console.log("User profile:", profileData)
            setProfile(profileData)
          }
        }
      } catch (error) {
        console.error("Unexpected error in initializeAuth:", error)
      } finally {
        setLoading(false)
        setInitialized(true)
      }
    }

    initializeAuth()

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.id)
      setUser(session?.user ?? null)

      if (session?.user) {
        try {
          console.log("Fetching profile after auth state change...")
          const { data: profileData, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single()

          if (profileError) {
            console.error("Error fetching profile after auth change:", profileError)
          } else {
            console.log("Profile after auth change:", profileData)
            setProfile(profileData)
          }
        } catch (error) {
          console.error("Unexpected error fetching profile:", error)
        }
      } else {
        setProfile(null)
      }

      setLoading(false)
    })

    return () => {
      console.log("Cleaning up auth listener")
      authListener.subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    console.log("Signing in with email:", email)
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    console.log("Sign in response:", data, error)

    if (data.user) {
      console.log("Updating last login time")
      try {
        const { error: updateError } = await supabase
          .from("profiles")
          .update({ last_login: new Date().toISOString() })
          .eq("id", data.user.id)

        if (updateError) {
          console.error("Error updating last login:", updateError)
        }
      } catch (updateError) {
        console.error("Unexpected error updating last login:", updateError)
      }
    }

    return { data, error }
  }

  const signOut = async () => {
    console.log("Signing out")
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
    router.push("/")
  }

  const signUp = async (email: string, password: string, name: string, role: string) => {
    console.log("Signing up with email:", email)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (data.user) {
      console.log("Creating profile for new user")
      try {
        const { error: profileError } = await supabase
          .from("profiles")
          .insert({
            id: data.user.id,
            full_name: name,
            role,
          })

        if (profileError) {
          console.error("Error creating profile:", profileError)
        }
      } catch (profileError) {
        console.error("Unexpected error creating profile:", profileError)
      }
    }

    return { data, error }
  }

  const value = {
    user,
    profile,
    signIn,
    signOut,
    signUp,
    loading,
  }

  // Only render children after initialization to avoid hydration mismatch
  if (!initialized) {
    return null
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
