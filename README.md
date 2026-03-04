# 🚀 EventHub - College Event Management Portal

A production-level event management system with role-based access

## 📋 Features

### User Roles
- **Admin** - Approve/reject events submitted by organizers
- **Organizer** - Create, edit, and manage events
- **Student** - Browse and register for approved events

### Pages
- ✨ **Landing Page** - Animated hero with featured events
- 🔐 **Authentication** - Role-based login/registration
- 📚 **Student Dashboard** - Browse events, manage registrations
- 📅 **Organizer Dashboard** - Create and manage your events
- ⚙️ **Admin Dashboard** - Review and approve/reject events
- 📄 **Event Details** - Detailed view with registration

### Tech Stack

**Frontend:**
- React 18 with Vite
- TailwindCSS for styling
- GSAP for animations (ScrollTrigger, timelines)
- React Router for navigation
- Axios for API calls

**Backend:**
- Node.js + Express
- JWT authentication
- Role-based middleware
- In-memory database

### Design Features
- 🌙 Dark theme with neon accents (cyan & pink)
- 🎨 Glassmorphism cards
- ✨ Smooth GSAP animations
- 📱 Fully responsive design
- 🎯 Modern SaaS aesthetic

## 🛠️ Installation & Setup

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend runs on **http://localhost:5000**

**Demo Credentials:**
- Admin: `admin@college.edu` / `admin123`
- Organizer: `organizer@college.edu` / `org123`
- Student: `student@college.edu` / `student123`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on **http://localhost:3000**

## 📁 Project Structure

```
project/
├── backend/
│   ├── config/
│   │   └── database.js          # In-memory data store
│   ├── middleware/
│   │   └── auth.js              # JWT & role-based middleware
│   ├── controllers/
│   │   ├── authController.js
│   │   └── eventController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── eventRoutes.js
│   ├── utils/
│   │   └── tokenUtils.js        # JWT utilities
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── UI.jsx            # Reusable UI components
    │   │   ├── Header.jsx
    │   │   ├── EventCard.jsx
    │   │   ├── AnimatedBackground.jsx
    │   │   └── Hero.jsx
    │   ├── pages/
    │   │   ├── LandingPage.jsx
    │   │   ├── AuthPage.jsx
    │   │   ├── StudentDashboard.jsx
    │   │   ├── OrganizerDashboard.jsx
    │   │   ├── AdminDashboard.jsx
    │   │   └── EventDetailsPage.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── hooks/
    │   │   └── useAuth.js
    │   ├── utils/
    │   │   └── api.js            # API client
    │   ├── styles/
    │   │   └── globals.css
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── postcss.config.js
```

## 🔐 Authentication Flow

1. User logs in with email, password, and role
2. Backend validates credentials and returns JWT token
3. Token stored in localStorage
4. All API requests include token in Authorization header
5. Protected routes check user role before rendering

## 📡 API Endpoints

### Auth
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - Student registration

### Events
- `GET /api/events/approved` - Get all approved events
- `GET /api/events/:id` - Get event details
- `POST /api/events/register` - Register for event (Student)
- `POST /api/events/unregister` - Unregister from event (Student)
- `GET /api/events/student/registrations` - Get my registrations (Student)
- `POST /api/events` - Create event (Organizer)
- `PUT /api/events/:id` - Update event (Organizer)
- `DELETE /api/events/:id` - Delete event (Organizer)
- `GET /api/events/organizer/events` - Get my events (Organizer)
- `GET /api/events/admin/all` - Get all events (Admin)
- `PUT /api/events/:id/approve` - Approve event (Admin)
- `PUT /api/events/:id/reject` - Reject event (Admin)

## ✨ Animation Features

### GSAP Animations
- Page entrance animations with stagger
- Scroll-triggered card animations (ScrollTrigger)
- Smooth transitions and hover effects
- Animated background blobs
- Modal open/close animations
- Button ripple effects

### Tailwind Utilities
- Custom glassmorphism styling
- Neon glow effects
- Gradient text
- Smooth transitions
- Responsive grid layouts

## 🎨 Color Palette

- **Primary (Dark):** `#0f172a`
- **Secondary:** `#1e293b`
- **Accent (Warm Amber):** `#d97706`
- **Accent Light:** `#f59e0b`
- **Neon (Deep Purple):** `#8b5cf6`
- **Warm (Copper):** `#ea580c`

## 🚀 Deployment

### Backend
1. Set `NODE_ENV=production`
2. Update `JWT_SECRET` in `.env`
3. Deploy to Heroku, Render, or similar

### Frontend
```bash
npm run build
```
Deploy the `dist` folder to Vercel, Netlify, or similar

## 📝 Features Implemented

✅ Role-based authentication & authorization
✅ Event CRUD operations
✅ Event approval/rejection system
✅ Student event registration
✅ Protected routes
✅ Glassmorphism UI design
✅ GSAP animations & scroll triggers
✅ Responsive design
✅ Error handling
✅ Loading states
✅ Success/error notifications
✅ Form validation
✅ Sticky sidebars
✅ Animated background
✅ Event capacity management
✅ Registration status tracking

## ⚠️ Important Notes

- **Database:** Currently uses in-memory arrays. Data resets on server restart.
- **Password Hashing:** Passwords are NOT hashed for demo purposes. Hash passwords in production using bcrypt.
- **JWT Secret:** Change the JWT_SECRET in `.env` for production.
- **CORS:** Configure CORS properly for production.

## 🔧 Future Enhancements

- MongoDB/PostgreSQL database
- Email notifications
- Event search & filtering
- User reviews & ratings
- Event analytics
- QR code check-in
- Payment integration
- Real-time notifications with WebSocket

## 📧 Support

For issues or questions, refer to the code comments or contact the development team.

---

**Built with ❤️ using React, Node.js, TailwindCSS, and GSAP**
