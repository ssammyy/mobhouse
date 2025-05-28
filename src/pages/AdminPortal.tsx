import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const AdminPortal = () => {
    const [activeTab, setActiveTab] = useState("djs");

    // Mock data
    const [djs, setDjs] = useState([
        { id: 1, name: "DJ MZEE", bio: "Master of Afro House...", specialties: ["Afro House", "Deep House"] },
        { id: 2, name: "DJ AMANI", bio: "Amapiano pioneer...", specialties: ["Amapiano", "Afro Tech"] },
    ]);

    const [mixes, setMixes] = useState([
        { id: 1, title: "Sunset Vibes", artist: "DJ MZEE", genre: "Afro House", duration: "45:30" },
        { id: 2, title: "Amapiano Nights", artist: "DJ AMANI", genre: "Amapiano", duration: "52:15" },
    ]);

    const [events, setEvents] = useState([
        { id: 1, title: "Rooftop Sunset Sessions", date: "2024-01-15", venue: "Sky Lounge", price: 2500, ticketsSold: 45 },
        { id: 2, title: "Amapiano Night Live", date: "2024-01-22", venue: "Garden City Mall", price: 3000, ticketsSold: 67 },
    ]);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Mob House DJs - Admin Portal</h1>
                    <p className="text-gray-600 mt-2">Manage your DJ collective's content and events</p>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-4 mb-8">
                        <TabsTrigger value="djs">DJ Profiles</TabsTrigger>
                        <TabsTrigger value="mixes">Mixes</TabsTrigger>
                        <TabsTrigger value="events">Events</TabsTrigger>
                        <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    </TabsList>

                    {/* DJ Management */}
                    <TabsContent value="djs">
                        <div className="grid lg:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Add New DJ</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label htmlFor="dj-name">DJ Name</Label>
                                        <Input id="dj-name" placeholder="DJ NAME" />
                                    </div>
                                    <div>
                                        <Label htmlFor="dj-bio">Biography</Label>
                                        <Textarea id="dj-bio" placeholder="Enter DJ biography..." rows={4} />
                                    </div>
                                    <div>
                                        <Label htmlFor="dj-specialties">Specialties (comma separated)</Label>
                                        <Input id="dj-specialties" placeholder="Afro House, Amapiano" />
                                    </div>
                                    <div>
                                        <Label htmlFor="dj-photo">Photo Upload</Label>
                                        <Input id="dj-photo" type="file" accept="image/*" />
                                    </div>
                                    <Button className="w-full">Add DJ</Button>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Current DJs</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {djs.map((dj) => (
                                            <div key={dj.id} className="flex items-center justify-between p-4 border rounded-lg">
                                                <div>
                                                    <h3 className="font-semibold">{dj.name}</h3>
                                                    <p className="text-sm text-gray-600">{dj.bio.substring(0, 50)}...</p>
                                                    <div className="flex gap-2 mt-2">
                                                        {dj.specialties.map((specialty, index) => (
                                                            <Badge key={index} variant="secondary">{specialty}</Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button size="sm" variant="outline">Edit</Button>
                                                    <Button size="sm" variant="destructive">Delete</Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Mix Management */}
                    <TabsContent value="mixes">
                        <div className="grid lg:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Upload New Mix</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label htmlFor="mix-title">Mix Title</Label>
                                        <Input id="mix-title" placeholder="Enter mix title" />
                                    </div>
                                    <div>
                                        <Label htmlFor="mix-artist">Artist</Label>
                                        <Input id="mix-artist" placeholder="DJ Name" />
                                    </div>
                                    <div>
                                        <Label htmlFor="mix-genre">Genre</Label>
                                        <Input id="mix-genre" placeholder="Afro House" />
                                    </div>
                                    <div>
                                        <Label htmlFor="mix-file">Audio File</Label>
                                        <Input id="mix-file" type="file" accept="audio/*" />
                                    </div>
                                    <div>
                                        <Label htmlFor="mix-cover">Cover Art</Label>
                                        <Input id="mix-cover" type="file" accept="image/*" />
                                    </div>
                                    <Button className="w-full">Upload Mix</Button>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Current Mixes</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {mixes.map((mix) => (
                                            <div key={mix.id} className="flex items-center justify-between p-4 border rounded-lg">
                                                <div>
                                                    <h3 className="font-semibold">{mix.title}</h3>
                                                    <p className="text-sm text-gray-600">{mix.artist} • {mix.genre}</p>
                                                    <p className="text-sm text-gray-500">{mix.duration}</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button size="sm" variant="outline">Edit</Button>
                                                    <Button size="sm" variant="destructive">Delete</Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Event Management */}
                    <TabsContent value="events">
                        <div className="grid lg:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Create New Event</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label htmlFor="event-title">Event Title</Label>
                                        <Input id="event-title" placeholder="Event name" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="event-date">Date</Label>
                                            <Input id="event-date" type="date" />
                                        </div>
                                        <div>
                                            <Label htmlFor="event-time">Time</Label>
                                            <Input id="event-time" type="time" />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="event-venue">Venue</Label>
                                        <Input id="event-venue" placeholder="Venue name and location" />
                                    </div>
                                    <div>
                                        <Label htmlFor="event-price">Ticket Price (KES)</Label>
                                        <Input id="event-price" type="number" placeholder="2500" />
                                    </div>
                                    <div>
                                        <Label htmlFor="event-description">Description</Label>
                                        <Textarea id="event-description" placeholder="Event description..." rows={3} />
                                    </div>
                                    <Button className="w-full">Create Event</Button>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Current Events</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {events.map((event) => (
                                            <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                                                <div>
                                                    <h3 className="font-semibold">{event.title}</h3>
                                                    <p className="text-sm text-gray-600">{event.date} • {event.venue}</p>
                                                    <p className="text-sm text-gray-500">KES {event.price} • {event.ticketsSold} tickets sold</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button size="sm" variant="outline">Edit</Button>
                                                    <Button size="sm" variant="destructive">Cancel</Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Analytics */}
                    <TabsContent value="analytics">
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <Card>
                                <CardContent className="p-6">
                                    <div className="text-2xl font-bold">1,247</div>
                                    <p className="text-sm text-gray-600">Total Mix Plays</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-6">
                                    <div className="text-2xl font-bold">156</div>
                                    <p className="text-sm text-gray-600">Tickets Sold</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-6">
                                    <div className="text-2xl font-bold">89</div>
                                    <p className="text-sm text-gray-600">Registered Users</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-6">
                                    <div className="text-2xl font-bold">12</div>
                                    <p className="text-sm text-gray-600">Active Mixes</p>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Popular Mixes</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {mixes.map((mix, index) => (
                                            <div key={mix.id} className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                                                    <div>
                                                        <p className="font-semibold">{mix.title}</p>
                                                        <p className="text-sm text-gray-600">{mix.artist}</p>
                                                    </div>
                                                </div>
                                                <span className="text-sm text-gray-500">{Math.floor(Math.random() * 500) + 100} plays</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Upcoming Events Revenue</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {events.map((event) => (
                                            <div key={event.id} className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-semibold">{event.title}</p>
                                                    <p className="text-sm text-gray-600">{event.ticketsSold} tickets sold</p>
                                                </div>
                                                <span className="text-lg font-bold">KES {(event.price * event.ticketsSold).toLocaleString()}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default AdminPortal;
