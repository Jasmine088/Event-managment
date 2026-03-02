// In-memory database
export const db = {
  users: [
    {
      id: "admin1",
      email: "admin@college.edu",
      password: "admin123", // In production, this would be hashed
      name: "Admin User",
      role: "admin",
      createdAt: new Date(),
    },
    {
      id: "organizer1",
      email: "organizer@college.edu",
      password: "org123",
      name: "Event Organizer",
      role: "organizer",
      createdAt: new Date(),
    },
    {
      id: "student1",
      email: "student@college.edu",
      password: "student123",
      name: "John Doe",
      role: "student",
      createdAt: new Date(),
    },
  ],
  events: [
    {
      id: "evt1",
      title: "Annual Tech Summit 2024",
      description: "Join us for an incredible journey through the latest in tech innovation",
      category: "Technology",
      date: new Date("2024-04-15"),
      time: "10:00 AM",
      location: "Main Auditorium",
      capacity: 200,
      registrations: 45,
      status: "approved",
      organizerId: "organizer1",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop",
      createdAt: new Date("2024-03-01"),
    },
    {
      id: "evt2",
      title: "Cultural Fest",
      description: "Celebrate diversity and culture with performances from around the world",
      category: "Cultural",
      date: new Date("2024-04-20"),
      time: "2:00 PM",
      location: "Open Grounds",
      capacity: 500,
      registrations: 120,
      status: "approved",
      organizerId: "organizer1",
      image: "https://images.unsplash.com/photo-1540575467063-178f50002200?w=500&h=300&fit=crop",
      createdAt: new Date("2024-03-02"),
    },
  ],
  eventRegistrations: [
    {
      id: "reg1",
      eventId: "evt1",
      studentId: "student1",
      registeredAt: new Date(),
    },
  ],
};
