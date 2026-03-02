# 📡 API Documentation

Base URL: `http://localhost:5000/api`

---

## 🔐 Authentication Endpoints

### POST /auth/login
Login with email, password, and role.

**Request:**
```json
{
  "email": "student@college.edu",
  "password": "student123",
  "role": "student"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user123",
    "email": "student@college.edu",
    "name": "John Doe",
    "role": "student"
  }
}
```

**Errors:**
- `401` - Invalid credentials or role mismatch
- `400` - Missing email, password, or role

---

### POST /auth/register
Register a new student account.

**Request:**
```json
{
  "email": "newstudent@college.edu",
  "password": "password123",
  "name": "Jane Smith"
}
```

**Response (201):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user456",
    "email": "newstudent@college.edu",
    "name": "Jane Smith",
    "role": "student"
  }
}
```

**Errors:**
- `400` - User already exists or invalid input
- `400` - Only students can self-register

---

## 📅 Event Endpoints

### GET /events/approved
Get all approved events (public).

**Request:**
```
GET /api/events/approved
```

**Response (200):**
```json
[
  {
    "id": "evt1",
    "title": "Annual Tech Summit 2024",
    "description": "Join us for...",
    "category": "Technology",
    "date": "2024-04-15T00:00:00.000Z",
    "time": "10:00 AM",
    "location": "Main Auditorium",
    "capacity": 200,
    "registrations": 45,
    "status": "approved",
    "organizerId": "organizer1",
    "image": "https://...",
    "createdAt": "2024-03-01T00:00:00.000Z"
  },
  ...
]
```

---

### GET /events/:id
Get event details by ID.

**Request:**
```
GET /api/events/evt1
```

**Response (200):**
```json
{
  "id": "evt1",
  "title": "Annual Tech Summit 2024",
  "description": "...",
  "category": "Technology",
  "date": "2024-04-15T00:00:00.000Z",
  "time": "10:00 AM",
  "location": "Main Auditorium",
  "capacity": 200,
  "registrations": 45,
  "status": "approved",
  "organizerId": "organizer1",
  "image": "https://...",
  "createdAt": "2024-03-01T00:00:00.000Z",
  "isRegistered": false
}
```

**Notes:**
- `isRegistered` field is populated if user is authenticated
- 404 if event not found

---

## 👥 Student Event Endpoints

**Requires Authentication:** Yes
**Allowed Roles:** student

### POST /events/register
Register student for an event.

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "eventId": "evt1"
}
```

**Response (200):**
```json
{
  "message": "Registered successfully",
  "event": { ...event object }
}
```

**Errors:**
- `401` - Not authenticated
- `403` - Not a student
- `400` - Already registered or event full
- `404` - Event not found

---

### POST /events/unregister
Unregister student from an event.

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "eventId": "evt1"
}
```

**Response (200):**
```json
{
  "message": "Unregistered successfully"
}
```

**Errors:**
- `401` - Not authenticated
- `403` - Not a student
- `404` - Registration not found

---

### GET /events/student/registrations
Get all events student is registered for.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
[
  {
    "id": "evt1",
    "title": "Annual Tech Summit 2024",
    ...
  },
  ...
]
```

**Errors:**
- `401` - Not authenticated
- `403` - Not a student

---

## 📝 Organizer Event Endpoints

**Requires Authentication:** Yes
**Allowed Roles:** organizer

### POST /events
Create a new event.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request:**
```json
{
  "title": "Web Development Workshop",
  "description": "Learn modern web dev",
  "category": "Technology",
  "date": "2024-05-20",
  "time": "2:00 PM",
  "location": "Room 101",
  "capacity": "100",
  "image": "https://..."
}
```

**Response (201):**
```json
{
  "id": "evt123",
  "title": "Web Development Workshop",
  "description": "Learn modern web dev",
  "category": "Technology",
  "date": "2024-05-20T00:00:00.000Z",
  "time": "2:00 PM",
  "location": "Room 101",
  "capacity": 100,
  "registrations": 0,
  "status": "pending",
  "organizerId": "organizer1",
  "image": "https://...",
  "createdAt": "2024-03-15T10:30:00.000Z"
}
```

**Errors:**
- `401` - Not authenticated
- `403` - Not an organizer
- `400` - Missing required fields

---

### GET /events/organizer/events
Get all events created by organizer.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
[
  {
    "id": "evt1",
    "title": "...",
    "status": "pending",
    ...
  },
  ...
]
```

**Errors:**
- `401` - Not authenticated
- `403` - Not an organizer

---

### PUT /events/:id
Update event (organizer can only edit pending events).

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request:**
```json
{
  "title": "Updated Workshop Title",
  "capacity": "150"
}
```

**Response (200):**
```json
{
  "id": "evt1",
  "title": "Updated Workshop Title",
  "capacity": 150,
  ...
}
```

**Errors:**
- `401` - Not authenticated
- `403` - Not event organizer
- `400` - Can only edit pending events
- `404` - Event not found

---

### DELETE /events/:id
Delete event (organizer can only delete own events).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Event deleted successfully"
}
```

**Errors:**
- `401` - Not authenticated
- `403` - Not event organizer
- `404` - Event not found

---

## ⚙️ Admin Event Endpoints

**Requires Authentication:** Yes
**Allowed Roles:** admin

### GET /events/admin/all
Get all events across all statuses.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
[
  {
    "id": "evt1",
    "title": "...",
    "status": "pending",
    ...
  },
  {
    "id": "evt2",
    "title": "...",
    "status": "approved",
    ...
  },
  ...
]
```

**Errors:**
- `401` - Not authenticated
- `403` - Not an admin

---

### PUT /events/:id/approve
Approve an event (make it visible to students).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "id": "evt1",
  "title": "...",
  "status": "approved",
  ...
}
```

**Errors:**
- `401` - Not authenticated
- `403` - Not an admin
- `404` - Event not found

---

### PUT /events/:id/reject
Reject an event with reason.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request:**
```json
{
  "reason": "Event description violates community guidelines"
}
```

**Response (200):**
```json
{
  "id": "evt1",
  "title": "...",
  "status": "rejected",
  "rejectionReason": "Event description violates community guidelines",
  ...
}
```

**Errors:**
- `401` - Not authenticated
- `403` - Not an admin
- `404` - Event not found

---

## 🔑 Authentication

All endpoints except `/auth/login`, `/auth/register`, and `/events/approved`, `/events/:id` require JWT authentication.

**Format:**
```
Authorization: Bearer <jwt_token>
```

**Token Structure (JWT):**
```json
{
  "id": "user123",
  "email": "student@college.edu",
  "name": "John Doe",
  "role": "student",
  "iat": 1234567890,
  "exp": 1234654290
}
```

**Token Expiration:** 7 days

---

## 🛠️ Testing with cURL

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@college.edu",
    "password": "student123",
    "role": "student"
  }'
```

### Create Event (Organizer)
```bash
curl -X POST http://localhost:5000/api/events \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Event",
    "description": "Event details",
    "category": "Technology",
    "date": "2024-05-20",
    "time": "2:00 PM",
    "location": "Room 101",
    "capacity": "100"
  }'
```

### Register for Event (Student)
```bash
curl -X POST http://localhost:5000/api/events/register \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "eventId": "evt1"
  }'
```

### Approve Event (Admin)
```bash
curl -X PUT http://localhost:5000/api/events/evt1/approve \
  -H "Authorization: Bearer <token>"
```

---

## 📊 Response Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success - Request processed |
| 201 | Created - New resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing/invalid token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 500 | Server Error - Unexpected error |

---

## ⚠️ Error Response Format

```json
{
  "error": "Error message describing what went wrong"
}
```

**Example:**
```json
{
  "error": "Only students can register for events"
}
```

---

## 🔄 Rate Limiting

Currently **not implemented**. Add in production:
```
- 100 requests per minute per IP
- 10 failed login attempts → temporary lock
```

---

## 📝 Data Models

### User Object
```json
{
  "id": "user123",
  "email": "student@college.edu",
  "password": "hashed_password",
  "name": "John Doe",
  "role": "student|organizer|admin",
  "createdAt": "2024-03-01T10:00:00Z"
}
```

### Event Object
```json
{
  "id": "evt1",
  "title": "Event Title",
  "description": "Event description",
  "category": "Technology|Cultural|Sports|Academic|Social",
  "date": "2024-04-15T00:00:00Z",
  "time": "10:00 AM",
  "location": "Main Auditorium",
  "capacity": 200,
  "registrations": 45,
  "status": "pending|approved|rejected",
  "organizerId": "organizer1",
  "rejectionReason": "Reason if rejected",
  "image": "https://image-url.com/pic.jpg",
  "createdAt": "2024-03-01T10:00:00Z"
}
```

### Registration Object
```json
{
  "id": "reg1",
  "eventId": "evt1",
  "studentId": "student1",
  "registeredAt": "2024-03-15T14:30:00Z"
}
```

---

**API is REST-compliant and ready for production!**
