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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Plus, Search, CalendarIcon, Clock, Check, X, MessageSquare } from "lucide-react"

// Mock data for patients
const patients = [
  { id: 1, name: "John Smith" },
  { id: 2, name: "Sarah Johnson" },
  { id: 3, name: "Robert Williams" },
  { id: 4, name: "Emily Davis" },
  { id: 5, name: "Michael Brown" },
]

// Mock data for appointments
const initialAppointments = [
  {
    id: 1,
    patientId: 1,
    patientName: "John Smith",
    date: "2023-05-15",
    time: "10:00 AM",
    duration: 30,
    type: "General Checkup",
    status: "Confirmed",
    notes: "Regular checkup",
  },
  {
    id: 2,
    patientId: 2,
    patientName: "Sarah Johnson",
    date: "2023-05-15",
    time: "11:00 AM",
    duration: 45,
    type: "Dental Cleaning",
    status: "Confirmed",
    notes: "Patient requested gentle cleaning",
  },
  {
    id: 3,
    patientId: 3,
    patientName: "Robert Williams",
    date: "2023-05-15",
    time: "1:30 PM",
    duration: 60,
    type: "Cardiology Consultation",
    status: "Pending",
    notes: "Follow-up on previous visit",
  },
  {
    id: 4,
    patientId: 4,
    patientName: "Emily Davis",
    date: "2023-05-16",
    time: "9:30 AM",
    duration: 45,
    type: "Therapy Session",
    status: "Confirmed",
    notes: "Weekly session",
  },
  {
    id: 5,
    patientId: 5,
    patientName: "Michael Brown",
    date: "2023-05-16",
    time: "2:00 PM",
    duration: 30,
    type: "Physical Therapy",
    status: "Cancelled",
    notes: "Patient called to cancel",
  },
]

// Appointment types
const appointmentTypes = [
  "General Checkup",
  "Dental Cleaning",
  "X-Ray",
  "Blood Test",
  "Cardiology Consultation",
  "Therapy Session",
  "Physical Therapy",
  "Follow-up",
  "Emergency",
]

// Time slots
const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
]

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState(initialAppointments)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedPatient, setSelectedPatient] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [duration, setDuration] = useState("30")
  const [notes, setNotes] = useState("")

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.status.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddAppointment = () => {
    if (!selectedPatient || !selectedTime || !selectedType) {
      alert("Please fill in all required fields")
      return
    }

    const id = appointments.length > 0 ? Math.max(...appointments.map((a) => a.id)) + 1 : 1
    const patient = patients.find((p) => p.id === Number.parseInt(selectedPatient))

    const newAppointment = {
      id,
      patientId: Number.parseInt(selectedPatient),
      patientName: patient ? patient.name : "",
      date: format(selectedDate, "yyyy-MM-dd"),
      time: selectedTime,
      duration: Number.parseInt(duration),
      type: selectedType,
      status: "Pending",
      notes,
    }

    setAppointments([...appointments, newAppointment])
    resetForm()
    setIsAddDialogOpen(false)
  }

  const resetForm = () => {
    setSelectedDate(new Date())
    setSelectedPatient("")
    setSelectedTime("")
    setSelectedType("")
    setDuration("30")
    setNotes("")
  }

  const handleStatusChange = (id, newStatus) => {
    setAppointments(
      appointments.map((appointment) => (appointment.id === id ? { ...appointment, status: newStatus } : appointment)),
    )
  }

  const getTodayAppointments = () => {
    const today = format(new Date(), "yyyy-MM-dd")
    return appointments.filter((appointment) => appointment.date === today)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Appointment Management</h2>
          <p className="text-muted-foreground">Schedule and manage patient appointments.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Schedule New Appointment</DialogTitle>
              <DialogDescription>Create a new appointment for a patient.</DialogDescription>
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger id="time">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Appointment Type</Label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {appointmentTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger id="duration">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                      <SelectItem value="90">90 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any additional notes about the appointment"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddAppointment}>Schedule Appointment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getTodayAppointments().length}</div>
            <p className="text-xs text-muted-foreground">
              {getTodayAppointments().filter((a) => a.status === "Confirmed").length} confirmed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Confirmation</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appointments.filter((a) => a.status === "Pending").length}</div>
            <p className="text-xs text-muted-foreground">Awaiting confirmation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
            <Check className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appointments.filter((a) => a.status === "Confirmed").length}</div>
            <p className="text-xs text-muted-foreground">Ready for service</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
            <X className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appointments.filter((a) => a.status === "Cancelled").length}</div>
            <p className="text-xs text-muted-foreground">In the last 30 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search appointments..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.id}</TableCell>
                  <TableCell className="font-medium">{appointment.patientName}</TableCell>
                  <TableCell>{appointment.date}</TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell>{appointment.type}</TableCell>
                  <TableCell>{appointment.duration} min</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        appointment.status === "Confirmed"
                          ? "bg-green-100 text-green-800"
                          : appointment.status === "Cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {appointment.status === "Pending" && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700"
                            onClick={() => handleStatusChange(appointment.id, "Confirmed")}
                          >
                            <Check className="mr-1 h-4 w-4" />
                            Confirm
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
                            onClick={() => handleStatusChange(appointment.id, "Cancelled")}
                          >
                            <X className="mr-1 h-4 w-4" />
                            Cancel
                          </Button>
                        </>
                      )}
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No appointments found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
