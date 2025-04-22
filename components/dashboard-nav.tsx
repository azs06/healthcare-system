"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Users,
  CreditCard,
  BarChart3,
  Calendar,
  Settings,
  MessageSquare,
  LogOut,
  Home,
  FileText,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
  roles: string[]
}

const items: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <Home className="h-5 w-5" />,
    roles: ["doctor", "admin", "receptionist"],
  },
  {
    title: "Patients",
    href: "/dashboard/patients",
    icon: <Users className="h-5 w-5" />,
    roles: ["doctor", "admin", "receptionist"],
  },
  {
    title: "Billing",
    href: "/dashboard/billing",
    icon: <CreditCard className="h-5 w-5" />,
    roles: ["admin", "receptionist"],
  },
  {
    title: "Appointments",
    href: "/dashboard/appointments",
    icon: <Calendar className="h-5 w-5" />,
    roles: ["doctor", "admin", "receptionist"],
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: <BarChart3 className="h-5 w-5" />,
    roles: ["admin"],
  },
  {
    title: "Due Management",
    href: "/dashboard/dues",
    icon: <FileText className="h-5 w-5" />,
    roles: ["admin", "receptionist"],
  },
  {
    title: "SMS",
    href: "/dashboard/sms",
    icon: <MessageSquare className="h-5 w-5" />,
    roles: ["admin", "receptionist"],
  },
  {
    title: "User Management",
    href: "/dashboard/users",
    icon: <User className="h-5 w-5" />,
    roles: ["admin"],
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: <Settings className="h-5 w-5" />,
    roles: ["admin"],
  },
]

export function DashboardNav({ role = "admin" }: { role?: string }) {
  const pathname = usePathname()
  const { signOut } = useAuth()

  const filteredItems = items.filter((item) => item.roles.includes(role))

  return (
    <nav className="grid gap-2 px-2">
      {filteredItems.map((item) => (
        <Link key={item.href} href={item.href}>
          <Button
            variant="ghost"
            className={cn("w-full justify-start gap-2 font-normal", pathname === item.href && "bg-muted font-medium")}
          >
            {item.icon}
            {item.title}
          </Button>
        </Link>
      ))}
      <Button
        variant="ghost"
        className="w-full justify-start gap-2 font-normal text-red-500 hover:text-red-600 hover:bg-red-50"
        onClick={signOut}
      >
        <LogOut className="h-5 w-5" />
        Logout
      </Button>
    </nav>
  )
}
