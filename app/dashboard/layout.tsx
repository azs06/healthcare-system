"use client"

import type React from "react"
import { DashboardNav } from "@/components/dashboard-nav"
import { ModeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, LogOut } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, profile, signOut, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    console.log({ user, loading })
    if (!loading && !user) {
      console.log("No user found, redirecting to login")
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user || !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-lg">Please log in to access the dashboard</p>
          <Button className="mt-4" onClick={() => router.push("/login")}>
            Go to Login
          </Button>
        </div>
      </div>
    )
  }

  const userInitials = profile.full_name
    ? profile.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
    : "U"

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <div className="grid gap-4 py-4">
              <div className="px-2 py-2">
                <h2 className="text-lg font-semibold tracking-tight">Healthcare Management</h2>
                <p className="text-sm text-muted-foreground">Manage your practice efficiently</p>
              </div>
              <DashboardNav role={profile.role} />
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex-1">
          <h1 className="text-lg font-semibold md:text-xl">Healthcare Management System</h1>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <div className="flex items-center gap-2">
            <span className="hidden text-sm md:inline-block">{profile.full_name}</span>
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt={profile.full_name || "User"} />
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
          </div>
          <Button variant="ghost" size="icon" onClick={signOut}>
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Logout</span>
          </Button>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-muted/40 md:block">
          <div className="flex h-full flex-col gap-4">
            <div className="px-6 py-4">
              <h2 className="text-lg font-semibold tracking-tight">Healthcare Management</h2>
              <p className="text-sm text-muted-foreground">Manage your practice efficiently</p>
            </div>
            <DashboardNav role={profile.role} />
          </div>
        </aside>
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
