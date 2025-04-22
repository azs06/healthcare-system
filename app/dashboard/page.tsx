import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, DollarSign, Users, Clock, AlertCircle } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Overview of your practice performance and activity.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,420</div>
            <p className="text-xs text-muted-foreground">+5% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Appointments Today</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">8 completed, 16 remaining</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding Dues</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,325</div>
            <p className="text-xs text-muted-foreground">From 32 patients</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="appointments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="appointments">Today's Appointments</TabsTrigger>
          <TabsTrigger value="recent-patients">Recent Patients</TabsTrigger>
          <TabsTrigger value="due-payments">Due Payments</TabsTrigger>
        </TabsList>
        <TabsContent value="appointments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>You have 16 appointments scheduled for today.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-4 rounded-lg border p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="font-medium">Sarah Johnson</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>General Checkup</span>
                        <span className="mx-2">•</span>
                        <span>{`${10 + i}:00 AM`}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-800">
                        Confirmed
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="recent-patients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recently Added Patients</CardTitle>
              <CardDescription>5 new patients added in the last 7 days.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-4 rounded-lg border p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="font-medium">{`Patient ${i}`}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>{`35 years • Male`}</span>
                        <span className="mx-2">•</span>
                        <span>Added yesterday</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="rounded-full px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800">New</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="due-payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Outstanding Payments</CardTitle>
              <CardDescription>Patients with pending payments.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-4 rounded-lg border p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <DollarSign className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="font-medium">{`Michael Brown`}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>{`Due: $${i * 100}`}</span>
                        <span className="mx-2">•</span>
                        <span>Due in 7 days</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="rounded-full px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800">
                        Pending
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
