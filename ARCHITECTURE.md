# 🏗️ System Architecture Diagram

## Complete System Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          USER DEVICES                                   │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  Desktop (Chrome, Firefox, Safari, Edge)                         │  │
│  │  Tablet (iPad, Android Tablets)                                  │  │
│  │  Mobile (iPhone, Android Phones)                                 │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└──────────────────────────┬──────────────────────────────────────────────┘
                           │
                           │ HTTP/HTTPS
                           │
        ┌──────────────────▼──────────────────┐
        │   FRONTEND - React + Vite           │
        │   Port: 3000                        │
        │   ────────────────────────────────  │
        │   App.jsx (Router + AuthProvider)   │
        │   │                                  │
        │   ├─ LandingPage                    │
        │   │  ├─ Hero Component              │
        │   │  ├─ Featured Events             │
        │   │  └─ Stats Section               │
        │   │                                  │
        │   ├─ AuthPage                       │
        │   │  ├─ Login Form                  │
        │   │  └─ Registration Form           │
        │   │                                  │
        │   ├─ StudentDashboard               │
        │   │  ├─ Browse Events               │
        │   │  └─ My Registrations            │
        │   │                                  │
        │   ├─ OrganizerDashboard             │
        │   │  ├─ Create Event Modal          │
        │   │  └─ My Events List              │
        │   │                                  │
        │   ├─ AdminDashboard                 │
        │   │  ├─ Pending Events              │
        │   │  ├─ Approve/Reject              │
        │   │  └─ Statistics                  │
        │   │                                  │
        │   └─ EventDetailsPage               │
        │      ├─ Event Info                  │
        │      └─ Registration CTA            │
        │                                      │
        │   ────────────────────────────────  │
        │   Shared Components                 │
        │   ├─ Header (Navigation)            │
        │   ├─ UI Components (Buttons, etc)   │
        │   ├─ EventCard                      │
        │   ├─ AnimatedBackground             │
        │   └─ Hero Section                   │
        │                                      │
        │   ────────────────────────────────  │
        │   State Management                  │
        │   ├─ AuthContext (User, Token)      │
        │   ├─ useAuth Hook                   │
        │   └─ Component Local State          │
        │                                      │
        │   ────────────────────────────────  │
        │   Styling & Effects                 │
        │   ├─ TailwindCSS Classes            │
        │   ├─ Custom CSS (globals.css)       │
        │   ├─ GSAP Animations                │
        │   └─ ScrollTrigger Effects          │
        └──────────────────┬──────────────────┘
                           │
            ┌──────────────┴──────────────┐
            │                             │
            ▼                             ▼
   ┌─────────────────────┐     ┌─────────────────────┐
   │  api.js (Client)    │     │  localStorage       │
   │  ───────────────    │     │  ───────────────    │
   │ • Axios instance    │     │ • JWT token         │
   │ • Request Intercept │     │ • User info         │
   │ • Auth methods      │     │ • Preferences       │
   │ • Event methods     │     └─────────────────────┘
   └──────────┬──────────┘
              │
              │ REST API Calls (JSON)
              │ + JWT in Authorization header
              │
        ┌─────▼──────────────────────────────┐
        │   BACKEND - Express + Node.js       │
        │   Port: 5000                        │
        │   ────────────────────────────────  │
        │   server.js                         │
        │   ├─ Express Setup                  │
        │   ├─ Middleware Setup               │
        │   ├─ CORS Configuration             │
        │   └─ Route Registration             │
        │                                      │
        │   ────────────────────────────────  │
        │   Routes                            │
        │   ├─ /api/auth/login                │
        │   ├─ /api/auth/register             │
        │   ├─ /api/events/*                  │
        │   │  ├─ GET /approved               │
        │   │  ├─ GET /:id                    │
        │   │  ├─ POST / (Organizer)          │
        │   │  ├─ POST /register (Student)    │
        │   │  └─ PUT /:id/approve (Admin)    │
        │   └─ ... (more routes)              │
        │                                      │
        │   ────────────────────────────────  │
        │   Middleware Pipeline               │
        │   ├─ request logger                 │
        │   ├─ body parser (JSON)             │
        │   ├─ CORS handler                   │
        │   ├─ authMiddleware (JWT verify)    │
        │   ├─ roleMiddleware (permission)    │
        │   └─ error handler                  │
        │                                      │
        │   ────────────────────────────────  │
        │   Controllers                       │
        │   │                                  │
        │   ├─ authController.js              │
        │   │  ├─ login()                     │
        │   │  ├─ register()                  │
        │   │  └─ getCurrentUser()            │
        │   │                                  │
        │   └─ eventController.js             │
        │      ├─ getAllApprovedEvents()      │
        │      ├─ getEventById()              │
        │      ├─ createEvent()               │
        │      ├─ updateEvent()               │
        │      ├─ deleteEvent()               │
        │      ├─ approveEvent()              │
        │      ├─ rejectEvent()               │
        │      ├─ registerForEvent()          │
        │      └─ unregisterFromEvent()       │
        │                                      │
        │   ────────────────────────────────  │
        │   Utilities                         │
        │   ├─ tokenUtils.js                  │
        │   │  ├─ generateToken()             │
        │   │  ├─ verifyToken()               │
        │   │  └─ generateId()                │
        │   └─ database.js                    │
        │      ├─ users[]                     │
        │      ├─ events[]                    │
        │      └─ eventRegistrations[]        │
        └──────────────┬───────────────────────┘
                       │
        ┌──────────────▼──────────────────────┐
        │   IN-MEMORY DATABASE                │
        │   ────────────────────────────────  │
        │                                      │
        │   db.users                          │
        │   ├─ id, email, password            │
        │   ├─ name, role                     │
        │   └─ createdAt                      │
        │                                      │
        │   db.events                         │
        │   ├─ id, title, description         │
        │   ├─ date, time, location           │
        │   ├─ capacity, registrations        │
        │   ├─ status, organizerId            │
        │   └─ image, createdAt               │
        │                                      │
        │   db.eventRegistrations             │
        │   ├─ id, eventId, studentId         │
        │   └─ registeredAt                   │
        └──────────────────────────────────────┘
```

---

## Authentication Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      USER LOGIN                             │
└────┬────────────────────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────────────────────────┐
│ Frontend: AuthPage Component                                │
│ • Email input: student@college.edu                          │
│ • Password input: student123                                │
│ • Role select: student (or organizer/admin)                 │
│                                                             │
│ User clicks "Sign In"                                       │
└────┬────────────────────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────────────────────────┐
│ API Call: POST /api/auth/login                              │
│ {                                                           │
│   "email": "student@college.edu",                           │
│   "password": "student123",                                 │
│   "role": "student"                                         │
│ }                                                           │
└────┬────────────────────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────────────────────────┐
│ Backend: authController.login()                             │
│ 1. Validate input (email, password, role present)           │
│ 2. Find user in db.users by email & password & role        │
│ 3. User found? Continue : Return 401                        │
└────┬────────────────────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────────────────────────┐
│ Backend: tokenUtils.generateToken()                         │
│ 1. Create JWT payload:                                      │
│    {                                                        │
│      "id": "user123",                                       │
│      "email": "student@college.edu",                        │
│      "name": "John Doe",                                    │
│      "role": "student"                                      │
│    }                                                        │
│ 2. Sign with JWT_SECRET                                     │
│ 3. Return token string                                      │
└────┬────────────────────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────────────────────────┐
│ Backend Response (200 OK)                                   │
│ {                                                           │
│   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",    │
│   "user": {                                                 │
│     "id": "user123",                                        │
│     "email": "student@college.edu",                         │
│     "name": "John Doe",                                     │
│     "role": "student"                                       │
│   }                                                         │
│ }                                                           │
└────┬────────────────────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────────────────────────┐
│ Frontend: API call successful                               │
│ • Store token in localStorage                               │
│ • Update AuthContext (user, token)                          │
│ • Redirect to /student-dashboard                            │
└────┬────────────────────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────────────────────────┐
│ Protected Route (StudentDashboard)                          │
│ • ProtectedRoute checks user exists & has role              │
│ • Render StudentDashboard                                   │
└────┬────────────────────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────────────────────────┐
│ Subsequent API Calls                                         │
│ • axios interceptor adds Authorization header               │
│ Authorization: Bearer <token>                               │
│ • Backend authMiddleware verifies token                      │
│ • Continue with request                                      │
└─────────────────────────────────────────────────────────────┘
```

---

## Event Registration Flow

```
STUDENT VIEWS EVENTS
         │
         ▼
[Frontend] GET /api/events/approved
         │
         ▼
[Backend] Controller returns approved events list
         │
         ▼
Display EventCard for each event
  (Click card → navigate to /event/:id)
         │
         ▼
STUDENT VIEWS EVENT DETAILS
         │
         ▼
[Frontend] GET /api/events/:id
         │
         ▼
[Backend] Return event details + isRegistered flag
         │
         ▼
Display event details & "Register Now" button
         │
         ▼
STUDENT CLICKS REGISTER
         │
         ▼
[Frontend] POST /api/events/register
  (with token in Authorization header)
  {
    "eventId": "evt1"
  }
         │
         ▼
[Backend] authMiddleware validates token
         │
         ▼
[Backend] roleMiddleware checks role === "student"
         │
         ▼
[Backend] eventController.registerForEvent()
  1. Check event exists
  2. Check event status === "approved"
  3. Check capacity not full
  4. Check not already registered
  5. Add to db.eventRegistrations
  6. Increment event.registrations
         │
         ▼
[Frontend] Success response
   • Update component state
   • Show success message
   • Update button to "Unregister"
   • Increment capacity counter
         │
         ▼
STUDENT UNREGISTERS
         │
         ▼
[Frontend] POST /api/events/unregister
  (with token)
         │
         ▼
Similar flow, but:
  • Remove from db.eventRegistrations
  • Decrement event.registrations
         │
         ▼
[Frontend] Update UI
   • Back to "Register Now"
   • Remove from My Registrations tab
   • Decrement capacity counter
```

---

## Role-Based Access Control (RBAC)

```
┌─────────────────────────────────────────────────────────────┐
│                    STUDENT ROLE                              │
├─────────────────────────────────────────────────────────────┤
│ Dashboard: /student-dashboard                               │
│ Permissions:                                                │
│ ✅ View approved events                                     │
│ ✅ Register for events                                      │
│ ✅ View event details                                       │
│ ✅ Unregister from events                                   │
│ ❌ Cannot create events                                     │
│ ❌ Cannot approve/reject events                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  ORGANIZER ROLE                              │
├─────────────────────────────────────────────────────────────┤
│ Dashboard: /organizer-dashboard                             │
│ Permissions:                                                │
│ ✅ Create new events (status = pending)                     │
│ ✅ Edit own pending events                                  │
│ ✅ Delete own events                                        │
│ ✅ View own events with status                              │
│ ❌ Cannot approve own events                                │
│ ❌ Cannot view student registration details                 │
│ ❌ Cannot register for events                               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    ADMIN ROLE                                │
├─────────────────────────────────────────────────────────────┤
│ Dashboard: /admin-dashboard                                 │
│ Permissions:                                                │
│ ✅ View all events (any status)                             │
│ ✅ Approve pending events                                   │
│ ✅ Reject events with reason                                │
│ ✅ View statistics                                          │
│ ✅ Filter by status                                         │
│ ✅ See rejection reasons                                    │
│ ❌ Cannot create/edit events directly                       │
│ ❌ Cannot register for events                               │
└─────────────────────────────────────────────────────────────┘

         ┌────────────────────────────────┐
         │   Middleware Protection Layer   │
         ├────────────────────────────────┤
         │ authMiddleware                  │
         │ • Verify JWT token              │
         │ • Extract user data             │
         │ • Attach to req.user            │
         │                                 │
         │ requireRole(['student'])        │
         │ • Check req.user.role           │
         │ • Verify in allowed array       │
         │ • Return 403 if denied          │
         └────────────────────────────────┘
```

---

## Data Relationships

```
┌──────────────┐
│    USERS     │
├──────────────┤                  ┌──────────────────────────┐
│ id           │◄─────┐           │   EVENTS                 │
│ email        │      │           ├──────────────────────────┤
│ password     │      │           │ id                       │
│ name         │      └───────────┤ organizerId              │
│ role         │                  │ title                    │
│ createdAt    │                  │ description              │
└──────────────┘                  │ date, time, location     │
       △                          │ capacity, registrations  │
       │                          │ status                   │
       │                          │ image                    │
       │                          │ createdAt                │
       │                          └────────────┬─────────────┘
       │                                       │
       │                          ┌────────────▼──────────────┐
       │                          │ EVENT REGISTRATIONS       │
       │                          ├───────────────────────────┤
       │      ┌────────────────────┤ id                       │
       │      │                    │ eventId                  │
       │      │                    │ studentId                │
       │      └───────────────────►│ registeredAt             │
       │                           └──────────────────────────┘
       └───────────────────────────────────────────────────────

Relationships:
Event.organizerId → User.id
EventRegistration.eventId → Event.id
EventRegistration.studentId → User.id (role=student)
```

---

## Deployment Architecture (Example: Vercel + Heroku)

```
┌─────────────────────────────────────────────────────────────┐
│ Client Browser                                              │
│ https://eventhub.vercel.app                                │
└──────┬──────────────────────────────────────────────────────┘
       │
       │ HTTPS (TLS)
       │
┌──────▼──────────────────────────────────────────────────────┐
│ CDN (Vercel Serverless)                                     │
│ /index.html, /main.jsx, /styles.css (cached)               │
│ React App bundled & minified (150KB)                        │
└──────┬──────────────────────────────────────────────────────┘
       │
       │ API Calls to
       │ https://eventhub-api.herokuapp.com
       │
┌──────▼──────────────────────────────────────────────────────┐
│ Heroku Dyno (Node.js)                                       │
│ Express Server                                              │
│ • Routes                                                    │
│ • Controllers                                              │
│ • Middleware                                                │
└──────┬──────────────────────────────────────────────────────┘
       │
       │ (In production, add database here)
       │ MongoDB Atlas or PostgreSQL
       │
└─ In-Memory Database (for this demo)
```

---

## Performance Optimization Path

```
Current State (Development)
↓
Add Caching Layer (Redis)
↓
Implement Database (MongoDB/PostgreSQL)
↓
Add Search & Filtering
↓
Implement Pagination
↓
Add Service Worker (PWA)
↓
Setup CDN for Static Assets
↓
Database Query Optimization (Indexes)
↓
Load Testing & Scaling
↓
Production Ready ✅
```

---

**This architecture is designed for scalability and maintainability! 🏗️**
