import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Refresh & revalidate on every request
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  // If no user, redirect to /login
  if (!user && req.nextUrl.pathname.startsWith("/dashboard")) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = "/login"
    redirectUrl.searchParams.set("redirectedFrom", req.nextUrl.pathname)
    NextResponse.redirect(redirectUrl)
    return res
  }

  return res
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
}
