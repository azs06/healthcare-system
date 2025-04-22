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
import { Plus, Search, Pencil, Trash2, FileText } from "lucide-react"

// Mock data for patients
const initialPatients = [
  {
    id: 1,
    name: "John Smith",
    age: 45,
    gender: "Male",
    contact: "+1 555-123-4567",
    email: "john.smith@example.com",
    address: "123 Main St, Anytown, USA",
    medicalHistory: "Hypertension, Diabetes Type 2",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    age: 32,
    gender: "Female",
    contact: "+1 555-987-6543",
    email: "sarah.j@example.com",
    address: "456 Oak Ave, Somewhere, USA",
    medicalHistory: "Asthma, Allergies",
  },
  {
    id: 3,
    name: "Robert Williams",
    age: 58,
    gender: "Male",
    contact: "+1 555-456-7890",
    email: "robert.w@example.com",
    address: "789 Pine St, Nowhere, USA",
    medicalHistory: "Heart Disease, Arthritis",
  },
  {
    id: 4,
    name: "Emily Davis",
    age: 27,
    gender: "Female",
    contact: "+1 555-789-0123",
    email: "emily.d@example.com",
    address: "321 Elm St, Elsewhere, USA",
    medicalHistory: "Migraine, Anxiety",
  },
  {
    id: 5,
    name: "Michael Brown",
    age: 41,
    gender: "Male",
    contact: "+1 555-234-5678",
    email: "michael.b@example.com",
    address: "654 Maple Dr, Anyplace, USA",
    medicalHistory: "High Cholesterol",
  },
]

export default function PatientsPage() {
  const [patients, setPatients] = useState(initialPatients)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentPatient, setCurrentPatient] = useState(null)
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "Male",
    contact: "",
    email: "",
    address: "",
    medicalHistory: "",
  })

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.contact.includes(searchTerm),
  )

  const handleAddPatient = () => {
    const id = patients.length > 0 ? Math.max(...patients.map((p) => p.id)) + 1 : 1
    setPatients([...patients, { ...newPatient, id, age: Number.parseInt(newPatient.age) }])
    setNewPatient({
      name: "",
      age: "",
      gender: "Male",
      contact: "",
      email: "",
      address: "",
      medicalHistory: "",
    })
    setIsAddDialogOpen(false)
  }

  const handleEditPatient = () => {
    setPatients(patients.map((p) => (p.id === currentPatient.id ? currentPatient : p)))
    setIsEditDialogOpen(false)
    setCurrentPatient(null)
  }

  const handleDeletePatient = (id) => {
    if (confirm("Are you sure you want to delete this patient?")) {
      setPatients(patients.filter((p) => p.id !== id))
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Patient Management</h2>
          <p className="text-muted-foreground">Add, edit, and manage your patients.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Patient
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Patient</DialogTitle>
              <DialogDescription>Enter the patient details below to add them to your system.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={newPatient.name}
                    onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={newPatient.age}
                      onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      value={newPatient.gender}
                      onValueChange={(value) => setNewPatient({ ...newPatient, gender: value })}
                    >
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Number</Label>
                  <Input
                    id="contact"
                    value={newPatient.contact}
                    onChange={(e) => setNewPatient({ ...newPatient, contact: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newPatient.email}
                    onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={newPatient.address}
                  onChange={(e) => setNewPatient({ ...newPatient, address: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="medicalHistory">Medical History</Label>
                <Textarea
                  id="medicalHistory"
                  value={newPatient.medicalHistory}
                  onChange={(e) => setNewPatient({ ...newPatient, medicalHistory: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddPatient}>Add Patient</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search patients..."
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
              <TableHead>Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>{patient.id}</TableCell>
                  <TableCell className="font-medium">{patient.name}</TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>{patient.gender}</TableCell>
                  <TableCell>{patient.contact}</TableCell>
                  <TableCell>{patient.email}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setCurrentPatient(patient)
                          setIsEditDialogOpen(true)
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDeletePatient(patient.id)}>
                        <Trash2 className="h-4 w-4" />
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
                <TableCell colSpan={7} className="h-24 text-center">
                  No patients found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Patient</DialogTitle>
            <DialogDescription>Update the patient details below.</DialogDescription>
          </DialogHeader>
          {currentPatient && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Full Name</Label>
                  <Input
                    id="edit-name"
                    value={currentPatient.name}
                    onChange={(e) => setCurrentPatient({ ...currentPatient, name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-age">Age</Label>
                    <Input
                      id="edit-age"
                      type="number"
                      value={currentPatient.age}
                      onChange={(e) => setCurrentPatient({ ...currentPatient, age: Number.parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-gender">Gender</Label>
                    <Select
                      value={currentPatient.gender}
                      onValueChange={(value) => setCurrentPatient({ ...currentPatient, gender: value })}
                    >
                      <SelectTrigger id="edit-gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-contact">Contact Number</Label>
                  <Input
                    id="edit-contact"
                    value={currentPatient.contact}
                    onChange={(e) => setCurrentPatient({ ...currentPatient, contact: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={currentPatient.email}
                    onChange={(e) => setCurrentPatient({ ...currentPatient, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-address">Address</Label>
                <Input
                  id="edit-address"
                  value={currentPatient.address}
                  onChange={(e) => setCurrentPatient({ ...currentPatient, address: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-medicalHistory">Medical History</Label>
                <Textarea
                  id="edit-medicalHistory"
                  value={currentPatient.medicalHistory}
                  onChange={(e) => setCurrentPatient({ ...currentPatient, medicalHistory: e.target.value })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditPatient}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
