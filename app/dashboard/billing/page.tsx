"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Printer, FileText, CreditCard } from "lucide-react"

// Mock data for billing
const initialBills = [
  {
    id: 1,
    patientId: 1,
    patientName: "John Smith",
    date: "2023-04-15",
    services: "General Checkup, Blood Test",
    amount: 150.0,
    discount: 0,
    paid: 150.0,
    due: 0,
    status: "Paid",
  },
  {
    id: 2,
    patientId: 2,
    patientName: "Sarah Johnson",
    date: "2023-04-16",
    services: "Dental Cleaning, X-Ray",
    amount: 220.0,
    discount: 20.0,
    paid: 200.0,
    due: 0,
    status: "Paid",
  },
  {
    id: 3,
    patientId: 3,
    patientName: "Robert Williams",
    date: "2023-04-17",
    services: "Cardiology Consultation",
    amount: 300.0,
    discount: 0,
    paid: 150.0,
    due: 150.0,
    status: "Partial",
  },
  {
    id: 4,
    patientId: 4,
    patientName: "Emily Davis",
    date: "2023-04-18",
    services: "Therapy Session",
    amount: 120.0,
    discount: 0,
    paid: 0,
    due: 120.0,
    status: "Unpaid",
  },
  {
    id: 5,
    patientId: 5,
    patientName: "Michael Brown",
    date: "2023-04-19",
    services: "Physical Therapy",
    amount: 180.0,
    discount: 30.0,
    paid: 150.0,
    due: 0,
    status: "Paid",
  },
]

// Mock data for patients
const patients = [
  { id: 1, name: "John Smith" },
  { id: 2, name: "Sarah Johnson" },
  { id: 3, name: "Robert Williams" },
  { id: 4, name: "Emily Davis" },
  { id: 5, name: "Michael Brown" },
]

// Mock data for services
const services = [
  { id: 1, name: "General Checkup", price: 50.0 },
  { id: 2, name: "Blood Test", price: 100.0 },
  { id: 3, name: "Dental Cleaning", price: 120.0 },
  { id: 4, name: "X-Ray", price: 100.0 },
  { id: 5, name: "Cardiology Consultation", price: 300.0 },
  { id: 6, name: "Therapy Session", price: 120.0 },
  { id: 7, name: "Physical Therapy", price: 180.0 },
]

export default function BillingPage() {
  const [bills, setBills] = useState(initialBills)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState("")
  const [selectedServices, setSelectedServices] = useState([])
  const [discount, setDiscount] = useState("0")
  const [paidAmount, setPaidAmount] = useState("0")
  const [notes, setNotes] = useState("")

  const filteredBills = bills.filter(
    (bill) =>
      bill.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.services.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const calculateTotal = () => {
    const servicesTotal = selectedServices.reduce((total, serviceId) => {
      const service = services.find((s) => s.id === Number.parseInt(serviceId))
      return total + (service ? service.price : 0)
    }, 0)

    const discountValue = Number.parseFloat(discount) || 0
    return servicesTotal - discountValue
  }

  const calculateDue = () => {
    const total = calculateTotal()
    const paid = Number.parseFloat(paidAmount) || 0
    return total - paid
  }

  const handleAddBill = () => {
    const id = bills.length > 0 ? Math.max(...bills.map((b) => b.id)) + 1 : 1
    const patient = patients.find((p) => p.id === Number.parseInt(selectedPatient))

    const selectedServiceNames = selectedServices
      .map((serviceId) => {
        const service = services.find((s) => s.id === Number.parseInt(serviceId))
        return service ? service.name : ""
      })
      .join(", ")

    const total = calculateTotal()
    const paid = Number.parseFloat(paidAmount) || 0
    const due = calculateDue()

    const status = due === 0 ? "Paid" : paid === 0 ? "Unpaid" : "Partial"

    const newBill = {
      id,
      patientId: Number.parseInt(selectedPatient),
      patientName: patient ? patient.name : "",
      date: new Date().toISOString().split("T")[0],
      services: selectedServiceNames,
      amount: total,
      discount: Number.parseFloat(discount) || 0,
      paid,
      due,
      status,
      notes,
    }

    setBills([...bills, newBill])
    resetForm()
    setIsAddDialogOpen(false)
  }

  const resetForm = () => {
    setSelectedPatient("")
    setSelectedServices([])
    setDiscount("0")
    setPaidAmount("0")
    setNotes("")
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Billing Management</h2>
          <p className="text-muted-foreground">Create and manage patient bills and payments.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create New Bill
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Bill</DialogTitle>
              <DialogDescription>Create a new bill for a patient.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="patient">Patient</Label>
                <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                  <SelectTrigger id="patient">
                    <SelectValue placeholder="Select patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map((patient) => (
                      <SelectItem key={patient.id} value={patient.id.toString()}>
                        {patient.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Services</Label>
                <div className="grid gap-2 max-h-40 overflow-y-auto border rounded-md p-2">
                  {services.map((service) => (
                    <div key={service.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`service-${service.id}`}
                        value={service.id}
                        checked={selectedServices.includes(service.id.toString())}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedServices([...selectedServices, e.target.value])
                          } else {
                            setSelectedServices(selectedServices.filter((id) => id !== e.target.value))
                          }
                        }}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <label htmlFor={`service-${service.id}`} className="flex-1 text-sm">
                        {service.name}
                      </label>
                      <span className="text-sm font-medium">${service.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="discount">Discount ($)</Label>
                  <Input id="discount" type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paid">Paid Amount ($)</Label>
                  <Input id="paid" type="number" value={paidAmount} onChange={(e) => setPaidAmount(e.target.value)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm font-medium">Total: ${calculateTotal().toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">Due: ${calculateDue().toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">
                    Status: {calculateDue() === 0 ? "Paid" : Number.parseFloat(paidAmount) === 0 ? "Unpaid" : "Partial"}
                  </p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddBill}>Create Bill</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Bills</TabsTrigger>
          <TabsTrigger value="paid">Paid</TabsTrigger>
          <TabsTrigger value="unpaid">Unpaid</TabsTrigger>
          <TabsTrigger value="partial">Partial Payment</TabsTrigger>
        </TabsList>

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search bills..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Services</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Paid</TableHead>
                  <TableHead>Due</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBills.length > 0 ? (
                  filteredBills.map((bill) => (
                    <TableRow key={bill.id}>
                      <TableCell>{bill.id}</TableCell>
                      <TableCell className="font-medium">{bill.patientName}</TableCell>
                      <TableCell>{bill.date}</TableCell>
                      <TableCell>{bill.services}</TableCell>
                      <TableCell>${bill.amount.toFixed(2)}</TableCell>
                      <TableCell>${bill.discount.toFixed(2)}</TableCell>
                      <TableCell>${bill.paid.toFixed(2)}</TableCell>
                      <TableCell>${bill.due.toFixed(2)}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            bill.status === "Paid"
                              ? "bg-green-100 text-green-800"
                              : bill.status === "Unpaid"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {bill.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="icon">
                            <Printer className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <CreditCard className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} className="h-24 text-center">
                      No bills found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="paid" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Services</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Paid</TableHead>
                  <TableHead>Due</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBills.filter((bill) => bill.status === "Paid").length > 0 ? (
                  filteredBills
                    .filter((bill) => bill.status === "Paid")
                    .map((bill) => (
                      <TableRow key={bill.id}>
                        <TableCell>{bill.id}</TableCell>
                        <TableCell className="font-medium">{bill.patientName}</TableCell>
                        <TableCell>{bill.date}</TableCell>
                        <TableCell>{bill.services}</TableCell>
                        <TableCell>${bill.amount.toFixed(2)}</TableCell>
                        <TableCell>${bill.discount.toFixed(2)}</TableCell>
                        <TableCell>${bill.paid.toFixed(2)}</TableCell>
                        <TableCell>${bill.due.toFixed(2)}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                            {bill.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="icon">
                              <Printer className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                              <FileText className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} className="h-24 text-center">
                      No paid bills found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="unpaid" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Services</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Paid</TableHead>
                  <TableHead>Due</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBills.filter((bill) => bill.status === "Unpaid").length > 0 ? (
                  filteredBills
                    .filter((bill) => bill.status === "Unpaid")
                    .map((bill) => (
                      <TableRow key={bill.id}>
                        <TableCell>{bill.id}</TableCell>
                        <TableCell className="font-medium">{bill.patientName}</TableCell>
                        <TableCell>{bill.date}</TableCell>
                        <TableCell>{bill.services}</TableCell>
                        <TableCell>${bill.amount.toFixed(2)}</TableCell>
                        <TableCell>${bill.discount.toFixed(2)}</TableCell>
                        <TableCell>${bill.paid.toFixed(2)}</TableCell>
                        <TableCell>${bill.due.toFixed(2)}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-100 text-red-800">
                            {bill.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="icon">
                              <Printer className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                              <CreditCard className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} className="h-24 text-center">
                      No unpaid bills found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="partial" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Services</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Paid</TableHead>
                  <TableHead>Due</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBills.filter((bill) => bill.status === "Partial").length > 0 ? (
                  filteredBills
                    .filter((bill) => bill.status === "Partial")
                    .map((bill) => (
                      <TableRow key={bill.id}>
                        <TableCell>{bill.id}</TableCell>
                        <TableCell className="font-medium">{bill.patientName}</TableCell>
                        <TableCell>{bill.date}</TableCell>
                        <TableCell>{bill.services}</TableCell>
                        <TableCell>${bill.amount.toFixed(2)}</TableCell>
                        <TableCell>${bill.discount.toFixed(2)}</TableCell>
                        <TableCell>${bill.paid.toFixed(2)}</TableCell>
                        <TableCell>${bill.due.toFixed(2)}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800">
                            {bill.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="icon">
                              <Printer className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                              <CreditCard className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} className="h-24 text-center">
                      No partially paid bills found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Revenue</CardTitle>
            <CardDescription>Current month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${bills.reduce((total, bill) => total + bill.paid, 0).toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Outstanding Dues</CardTitle>
            <CardDescription>Total unpaid amount</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${bills.reduce((total, bill) => total + bill.due, 0).toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">From {bills.filter((bill) => bill.due > 0).length} patients</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Discounts</CardTitle>
            <CardDescription>Current month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${bills.reduce((total, bill) => total + bill.discount, 0).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Applied to {bills.filter((bill) => bill.discount > 0).length} bills
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
