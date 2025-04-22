"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, CreditCard, AlertCircle, Clock, Send } from "lucide-react"

// Mock data for dues
const initialDues = [
  {
    id: 1,
    patientId: 3,
    patientName: "Robert Williams",
    billId: 3,
    originalAmount: 300.0,
    paidAmount: 150.0,
    dueAmount: 150.0,
    dueDate: "2023-05-15",
    status: "Pending",
    lastReminder: "2023-05-01",
  },
  {
    id: 2,
    patientId: 4,
    patientName: "Emily Davis",
    billId: 4,
    originalAmount: 120.0,
    paidAmount: 0,
    dueAmount: 120.0,
    dueDate: "2023-05-18",
    status: "Pending",
    lastReminder: "2023-05-03",
  },
  {
    id: 3,
    patientId: 6,
    patientName: "James Wilson",
    billId: 6,
    originalAmount: 200.0,
    paidAmount: 50.0,
    dueAmount: 150.0,
    dueDate: "2023-05-20",
    status: "Pending",
    lastReminder: "2023-05-05",
  },
  {
    id: 4,
    patientId: 7,
    patientName: "Olivia Martinez",
    billId: 7,
    originalAmount: 180.0,
    paidAmount: 0,
    dueAmount: 180.0,
    dueDate: "2023-05-22",
    status: "Overdue",
    lastReminder: "2023-05-08",
  },
  {
    id: 5,
    patientId: 8,
    patientName: "William Johnson",
    billId: 8,
    originalAmount: 250.0,
    paidAmount: 100.0,
    dueAmount: 150.0,
    dueDate: "2023-05-25",
    status: "Pending",
    lastReminder: "2023-05-10",
  },
]

export default function DuesPage() {
  const [dues, setDues] = useState(initialDues)
  const [searchTerm, setSearchTerm] = useState("")
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false)
  const [currentDue, setCurrentDue] = useState(null)
  const [paymentAmount, setPaymentAmount] = useState("")

  const filteredDues = dues.filter(
    (due) =>
      due.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      due.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handlePayment = () => {
    const amount = Number.parseFloat(paymentAmount)
    if (isNaN(amount) || amount <= 0 || amount > currentDue.dueAmount) {
      alert("Please enter a valid payment amount")
      return
    }

    const updatedDues = dues.map((due) => {
      if (due.id === currentDue.id) {
        const newPaidAmount = due.paidAmount + amount
        const newDueAmount = due.dueAmount - amount
        const newStatus = newDueAmount <= 0 ? "Paid" : "Pending"

        return {
          ...due,
          paidAmount: newPaidAmount,
          dueAmount: newDueAmount,
          status: newStatus,
        }
      }
      return due
    })

    setDues(updatedDues)
    setIsPaymentDialogOpen(false)
    setCurrentDue(null)
    setPaymentAmount("")
  }

  const handleSendReminder = (dueId) => {
    // In a real app, you would send an SMS or email reminder
    alert("Reminder sent to patient")

    const updatedDues = dues.map((due) => {
      if (due.id === dueId) {
        return {
          ...due,
          lastReminder: new Date().toISOString().split("T")[0],
        }
      }
      return due
    })

    setDues(updatedDues)
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Due Management</h2>
        <p className="text-muted-foreground">Track and manage outstanding payments.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Due Amount</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${dues.reduce((total, due) => total + due.dueAmount, 0).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">From {dues.length} patients</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Payments</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {dues
                .filter((due) => due.status === "Overdue")
                .reduce((total, due) => total + due.dueAmount, 0)
                .toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              {dues.filter((due) => due.status === "Overdue").length} overdue payments
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Due This Week</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {dues
                .filter((due) => due.status === "Pending")
                .reduce((total, due) => total + due.dueAmount, 0)
                .toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              {dues.filter((due) => due.status === "Pending").length} pending payments
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Dues</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="overdue">Overdue</TabsTrigger>
        </TabsList>

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search dues..."
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
                  <TableHead>Original Amount</TableHead>
                  <TableHead>Paid</TableHead>
                  <TableHead>Due</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Reminder</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDues.length > 0 ? (
                  filteredDues.map((due) => (
                    <TableRow key={due.id}>
                      <TableCell>{due.id}</TableCell>
                      <TableCell className="font-medium">{due.patientName}</TableCell>
                      <TableCell>${due.originalAmount.toFixed(2)}</TableCell>
                      <TableCell>${due.paidAmount.toFixed(2)}</TableCell>
                      <TableCell>${due.dueAmount.toFixed(2)}</TableCell>
                      <TableCell>{due.dueDate}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            due.status === "Paid"
                              ? "bg-green-100 text-green-800"
                              : due.status === "Overdue"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {due.status}
                        </span>
                      </TableCell>
                      <TableCell>{due.lastReminder}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setCurrentDue(due)
                              setPaymentAmount("")
                              setIsPaymentDialogOpen(true)
                            }}
                            disabled={due.status === "Paid"}
                          >
                            Pay
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSendReminder(due.id)}
                            disabled={due.status === "Paid"}
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center">
                      No dues found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Original Amount</TableHead>
                  <TableHead>Paid</TableHead>
                  <TableHead>Due</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Reminder</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDues.filter((due) => due.status === "Pending").length > 0 ? (
                  filteredDues
                    .filter((due) => due.status === "Pending")
                    .map((due) => (
                      <TableRow key={due.id}>
                        <TableCell>{due.id}</TableCell>
                        <TableCell className="font-medium">{due.patientName}</TableCell>
                        <TableCell>${due.originalAmount.toFixed(2)}</TableCell>
                        <TableCell>${due.paidAmount.toFixed(2)}</TableCell>
                        <TableCell>${due.dueAmount.toFixed(2)}</TableCell>
                        <TableCell>{due.dueDate}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800">
                            {due.status}
                          </span>
                        </TableCell>
                        <TableCell>{due.lastReminder}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setCurrentDue(due)
                                setPaymentAmount("")
                                setIsPaymentDialogOpen(true)
                              }}
                            >
                              Pay
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleSendReminder(due.id)}>
                              <Send className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center">
                      No pending dues found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="overdue" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Original Amount</TableHead>
                  <TableHead>Paid</TableHead>
                  <TableHead>Due</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Reminder</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDues.filter((due) => due.status === "Overdue").length > 0 ? (
                  filteredDues
                    .filter((due) => due.status === "Overdue")
                    .map((due) => (
                      <TableRow key={due.id}>
                        <TableCell>{due.id}</TableCell>
                        <TableCell className="font-medium">{due.patientName}</TableCell>
                        <TableCell>${due.originalAmount.toFixed(2)}</TableCell>
                        <TableCell>${due.paidAmount.toFixed(2)}</TableCell>
                        <TableCell>${due.dueAmount.toFixed(2)}</TableCell>
                        <TableCell>{due.dueDate}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-100 text-red-800">
                            {due.status}
                          </span>
                        </TableCell>
                        <TableCell>{due.lastReminder}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setCurrentDue(due)
                                setPaymentAmount("")
                                setIsPaymentDialogOpen(true)
                              }}
                            >
                              Pay
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleSendReminder(due.id)}>
                              <Send className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center">
                      No overdue dues found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Record Payment</DialogTitle>
            <DialogDescription>Record a payment for the outstanding due.</DialogDescription>
          </DialogHeader>
          {currentDue && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Patient:</p>
                  <p className="text-sm">{currentDue.patientName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Due Amount:</p>
                  <p className="text-sm">${currentDue.dueAmount.toFixed(2)}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Due Date:</p>
                  <p className="text-sm">{currentDue.dueDate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Status:</p>
                  <p className="text-sm">{currentDue.status}</p>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="payment-amount">Payment Amount</Label>
                <Input
                  id="payment-amount"
                  type="number"
                  placeholder="Enter amount"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePayment}>Record Payment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
