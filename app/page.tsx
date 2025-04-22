import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-800">Healthcare Management System</h1>
        </div>
      </header>
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Complete Patient and Practice Management</h2>
            <p className="mt-4 text-lg text-gray-600">
              Streamline your healthcare practice with our comprehensive management system. Handle patients, billing,
              appointments, and more in one place.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/register">Register</Link>
              </Button>
            </div>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">Patient Management</h3>
              <p className="mt-2 text-gray-600">
                Add, edit, and manage patient records with ease. Track medical history and appointments.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">Billing System</h3>
              <p className="mt-2 text-gray-600">
                Manage billing, payments, discounts, and dues. Generate detailed financial reports.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">Role-Based Access</h3>
              <p className="mt-2 text-gray-600">
                Secure access for doctors, administrators, and receptionists with customized permissions.
              </p>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-white border-t">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-600">© {new Date().getFullYear()} Healthcare Management System</p>
        </div>
      </footer>
    </div>
  )
}
