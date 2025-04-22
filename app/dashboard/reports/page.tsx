"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Download, BarChart, PieChart, LineChart, Printer } from "lucide-react"

// Mock data for reports
const monthlyRevenue = [
  { month: "January", revenue: 12500, expenses: 8200, profit: 4300 },
  { month: "February", revenue: 13200, expenses: 8500, profit: 4700 },
  { month: "March", revenue: 14800, expenses: 9100, profit: 5700 },
  { month: "April", revenue: 15300, expenses: 9300, profit: 6000 },
  { month: "May", revenue: 16100, expenses: 9500, profit: 6600 },
  { month: "June", revenue: 17200, expenses: 9800, profit: 7400 },
]

const duePayments = [
  { patientName: "Robert Williams", amount: 150.0, dueDate: "2023-05-15" },
  { patientName: "Emily Davis", amount: 120.0, dueDate: "2023-05-18" },
  { patientName: "James Wilson", amount: 200.0, dueDate: "2023-05-20" },
  { patientName: "Olivia Martinez", amount: 180.0, dueDate: "2023-05-22" },
  { patientName: "William Johnson", amount: 250.0, dueDate: "2023-05-25" },
]

const serviceRevenue = [
  { service: "General Checkup", count: 120, revenue: 6000 },
  { service: "Blood Test", count: 85, revenue: 8500 },
  { service: "Dental Cleaning", count: 65, revenue: 7800 },
  { service: "X-Ray", count: 45, revenue: 4500 },
  { service: "Cardiology Consultation", count: 30, revenue: 9000 },
  { service: "Therapy Session", count: 55, revenue: 6600 },
  { service: "Physical Therapy", count: 40, revenue: 7200 },
]

export default function ReportsPage() {
  const [reportPeriod, setReportPeriod] = useState("monthly")
  const [date, setDate] = useState(new Date())

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Financial Reports</h2>
          <p className="text-muted-foreground">View and analyze your practice's financial performance.</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={reportPeriod} onValueChange={setReportPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>

          <Button>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$89,100</div>
            <p className="text-xs text-muted-foreground">+20.1% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$54,400</div>
            <p className="text-xs text-muted-foreground">+12.5% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$34,700</div>
            <p className="text-xs text-muted-foreground">+35.2% from last year</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Revenue Report</TabsTrigger>
          <TabsTrigger value="dues">Due Payments</TabsTrigger>
          <TabsTrigger value="services">Service Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue</CardTitle>
              <CardDescription>Revenue, expenses, and profit for the past 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Expenses</TableHead>
                      <TableHead>Profit</TableHead>
                      <TableHead>Profit Margin</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {monthlyRevenue.map((month) => (
                      <TableRow key={month.month}>
                        <TableCell className="font-medium">{month.month}</TableCell>
                        <TableCell>${month.revenue.toLocaleString()}</TableCell>
                        <TableCell>${month.expenses.toLocaleString()}</TableCell>
                        <TableCell>${month.profit.toLocaleString()}</TableCell>
                        <TableCell>{((month.profit / month.revenue) * 100).toFixed(1)}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dues" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Outstanding Payments</CardTitle>
              <CardDescription>Patients with pending payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient Name</TableHead>
                      <TableHead>Amount Due</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {duePayments.map((payment, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{payment.patientName}</TableCell>
                        <TableCell>${payment.amount.toFixed(2)}</TableCell>
                        <TableCell>{payment.dueDate}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800">
                            Pending
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4 text-right">
                <p className="text-sm font-medium">Total Due: $900.00</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Service Revenue Analysis</CardTitle>
              <CardDescription>Revenue breakdown by service type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Count</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Avg. Revenue</TableHead>
                      <TableHead>% of Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {serviceRevenue.map((service) => {
                      const totalRevenue = serviceRevenue.reduce((sum, item) => sum + item.revenue, 0)
                      const percentage = ((service.revenue / totalRevenue) * 100).toFixed(1)

                      return (
                        <TableRow key={service.service}>
                          <TableCell className="font-medium">{service.service}</TableCell>
                          <TableCell>{service.count}</TableCell>
                          <TableCell>${service.revenue.toLocaleString()}</TableCell>
                          <TableCell>${(service.revenue / service.count).toFixed(2)}</TableCell>
                          <TableCell>{percentage}%</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4 text-right">
                <p className="text-sm font-medium">
                  Total Revenue: ${serviceRevenue.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
