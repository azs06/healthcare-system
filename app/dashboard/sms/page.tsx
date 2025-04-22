"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Send, MessageSquare, Users, Clock } from "lucide-react"

// Mock data for patients
const patients = [
  { id: 1, name: "John Smith", phone: "+1 555-123-4567" },
  { id: 2, name: "Sarah Johnson", phone: "+1 555-987-6543" },
  { id: 3, name: "Robert Williams", phone: "+1 555-456-7890" },
  { id: 4, name: "Emily Davis", phone: "+1 555-789-0123" },
  { id: 5, name: "Michael Brown", phone: "+1 555-234-5678" },
]

// Mock data for message templates
const templates = [
  {
    id: 1,
    name: "Appointment Reminder",
    content:
      "Hello {patient_name}, this is a reminder about your appointment on {appointment_date} at {appointment_time}. Please call us if you need to reschedule.",
  },
  {
    id: 2,
    name: "Payment Due",
    content:
      "Hello {patient_name}, this is a reminder that you have a payment of ${amount} due on {due_date}. Please contact our office for payment options.",
  },
  {
    id: 3,
    name: "Appointment Confirmation",
    content:
      "Hello {patient_name}, your appointment has been confirmed for {appointment_date} at {appointment_time}. We look forward to seeing you!",
  },
  {
    id: 4,
    name: "Prescription Ready",
    content: "Hello {patient_name}, your prescription is ready for pickup. Our office hours are Monday-Friday 9am-5pm.",
  },
  {
    id: 5,
    name: "Follow-up",
    content:
      "Hello {patient_name}, this is a follow-up message regarding your recent visit. Please let us know if you have any questions or concerns.",
  },
]

// Mock data for sent messages
const sentMessages = [
  {
    id: 1,
    recipient: "John Smith",
    phone: "+1 555-123-4567",
    message:
      "Hello John, this is a reminder about your appointment on May 15, 2023 at 10:00 AM. Please call us if you need to reschedule.",
    date: "2023-05-10 09:15 AM",
    status: "Delivered",
  },
  {
    id: 2,
    recipient: "Sarah Johnson",
    phone: "+1 555-987-6543",
    message:
      "Hello Sarah, your appointment has been confirmed for May 16, 2023 at 2:30 PM. We look forward to seeing you!",
    date: "2023-05-10 10:30 AM",
    status: "Delivered",
  },
  {
    id: 3,
    recipient: "Robert Williams",
    phone: "+1 555-456-7890",
    message:
      "Hello Robert, this is a reminder that you have a payment of $150 due on May 20, 2023. Please contact our office for payment options.",
    date: "2023-05-10 11:45 AM",
    status: "Delivered",
  },
  {
    id: 4,
    recipient: "Emily Davis",
    phone: "+1 555-789-0123",
    message: "Hello Emily, your prescription is ready for pickup. Our office hours are Monday-Friday 9am-5pm.",
    date: "2023-05-10 01:20 PM",
    status: "Delivered",
  },
  {
    id: 5,
    recipient: "Michael Brown",
    phone: "+1 555-234-5678",
    message:
      "Hello Michael, this is a follow-up message regarding your recent visit. Please let us know if you have any questions or concerns.",
    date: "2023-05-10 03:05 PM",
    status: "Failed",
  },
]

export default function SMSPage() {
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [messageContent, setMessageContent] = useState("")
  const [selectedPatients, setSelectedPatients] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  const handleTemplateChange = (templateId) => {
    setSelectedTemplate(templateId)
    const template = templates.find((t) => t.id.toString() === templateId)
    if (template) {
      setMessageContent(template.content)
    }
  }

  const handleSendMessage = () => {
    alert(`Message would be sent to ${selectedPatients.length} patients`)
    // In a real app, you would send the message to the selected patients
    setSelectedPatients([])
    setMessageContent("")
    setSelectedTemplate("")
  }

  const filteredPatients = patients.filter(
    (patient) => patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || patient.phone.includes(searchTerm),
  )

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">SMS Management</h2>
        <p className="text-muted-foreground">Send SMS notifications to patients.</p>
      </div>

      <Tabs defaultValue="compose" className="space-y-4">
        <TabsList>
          <TabsTrigger value="compose">Compose Message</TabsTrigger>
          <TabsTrigger value="history">Message History</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="compose" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Compose Message</CardTitle>
                <CardDescription>Create and send SMS messages to patients</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="template">Message Template</Label>
                  <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
                    <SelectTrigger id="template">
                      <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.map((template) => (
                        <SelectItem key={template.id} value={template.id.toString()}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message Content</Label>
                  <Textarea
                    id="message"
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    rows={6}
                    placeholder="Enter your message here..."
                  />
                  <p className="text-xs text-muted-foreground">Character count: {messageContent.length} / 160</p>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div>
                    <p className="text-sm font-medium">Selected Recipients: {selectedPatients.length}</p>
                  </div>
                  <Button onClick={handleSendMessage} disabled={!messageContent || selectedPatients.length === 0}>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Select Recipients</CardTitle>
                <CardDescription>Choose patients to receive the message</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search patients..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedPatients(filteredPatients.map((p) => p.id.toString()))
                              } else {
                                setSelectedPatients([])
                              }
                            }}
                            checked={selectedPatients.length === filteredPatients.length && filteredPatients.length > 0}
                          />
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Phone</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPatients.length > 0 ? (
                        filteredPatients.map((patient) => (
                          <TableRow key={patient.id}>
                            <TableCell>
                              <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300"
                                value={patient.id}
                                checked={selectedPatients.includes(patient.id.toString())}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedPatients([...selectedPatients, patient.id.toString()])
                                  } else {
                                    setSelectedPatients(selectedPatients.filter((id) => id !== patient.id.toString()))
                                  }
                                }}
                              />
                            </TableCell>
                            <TableCell className="font-medium">{patient.name}</TableCell>
                            <TableCell>{patient.phone}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} className="h-24 text-center">
                            No patients found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Message History</CardTitle>
              <CardDescription>View previously sent messages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Recipient</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sentMessages.map((message) => (
                      <TableRow key={message.id}>
                        <TableCell>{message.id}</TableCell>
                        <TableCell className="font-medium">{message.recipient}</TableCell>
                        <TableCell>{message.phone}</TableCell>
                        <TableCell className="max-w-xs truncate">{message.message}</TableCell>
                        <TableCell>{message.date}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              message.status === "Delivered" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                          >
                            {message.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Message Templates</CardTitle>
              <CardDescription>Manage your message templates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Template Name</TableHead>
                      <TableHead>Content</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {templates.map((template) => (
                      <TableRow key={template.id}>
                        <TableCell>{template.id}</TableCell>
                        <TableCell className="font-medium">{template.name}</TableCell>
                        <TableCell className="max-w-xs truncate">{template.content}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages Sent</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">152</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recipients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98</div>
            <p className="text-xs text-muted-foreground">Unique patients</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivery Rate</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.7%</div>
            <p className="text-xs text-muted-foreground">2 failed messages</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
