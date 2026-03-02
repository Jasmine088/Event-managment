## 🎯 Quick Start Guide

### Prerequisites
- Node.js 16+ (Download from https://nodejs.org/)
- npm (comes with Node.js)
- Git (optional, for version control)

---

## ⚡ Automatic Setup (Recommended)

### Windows
```bash
cd project
setup.bat
```

### macOS/Linux
```bash
cd project
chmod +x setup.sh
./setup.sh
```

---

## 🔧 Manual Setup

### Step 1: Install Backend

```bash
cd backend
npm install
```

**Environment:** The `.env` file is already configured with:
- `PORT=5000`
- `JWT_SECRET=your_super_secret_jwt_key_change_in_production`
- `NODE_ENV=development`

### Step 2: Start Backend Server

```bash
# From the backend folder
npm run dev
```

You should see:
```
🚀 Server running on http://localhost:5000
```

---

### Step 3: Install Frontend

```bash
cd ../frontend
npm install
```

### Step 4: Start Frontend Server

```bash
# From the frontend folder
npm run dev
```

You should see:
```
VITE v5.0.0  ready in XXX ms

➜  Local:   http://localhost:3000/
```

---

## 🌐 Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

---

## 👤 Demo Login Credentials

### Student Account
- **Email:** `student@college.edu`
- **Password:** `student123`
- **Features:** Browse events, register/unregister

### Organizer Account
- **Email:** `organizer@college.edu`
- **Password:** `org123`
- **Features:** Create, edit, delete events (pending approval)

### Admin Account
- **Email:** `admin@college.edu`
- **Password:** `admin123`
- **Features:** Approve/reject events, view all submissions

---

## 🎨 Exploring Features

### 1. Landing Page
- Animated hero section with GSAP
- Featured events grid
- Scroll-triggered animations
- Statistics section
- Call-to-action buttons

### 2. Authentication
- Role-based login
- New student registration
- Form validation
- Error/success messages

### 3. Student Dashboard
- Browse all approved events
- Register/unregister from events
- View your registrations
- Event capacity tracking
- Smooth card animations

### 4. Organizer Dashboard
- Create new events with modal form
- View your submitted events
- Edit pending events
- Delete events
- Status tracking (pending/approved/rejected)

### 5. Admin Dashboard
- Review all submissions
- Approve events to make them public
- Reject with reason details
- View approval statistics
- Filter by status

### 6. Event Details
- Large hero image
- Full event information
- Registration status
- Capacity progress bar
- Quick registration button
- Sticky sidebar with CTA

---

## 🎬 Key Features to Try

### ✨ Animations
1. **Page Load:** Watch title and content fade in with stagger
2. **Scroll Animations:** Scroll down to see cards animate in
3. **Hover Effects:** Hover over cards to see scale & glow effects
4. **Modal Animations:** Open forms to see smooth entrance
5. **Background:** Animated mesh background on all pages

### 🔐 Authentication
1. Try logging in with different roles
2. Notice how dashboard changes based on role
3. Try accessing routes without login (redirects to auth)
4. Try accessing admin dashboard as student (denied)

### 📅 Event Management (Organizer)
1. Create a new event with all details
2. Upload custom image URL
3. Try editing a pending event
4. Submit event for approval
5. Check admin dashboard for approval

### ✅ Approval Flow (Admin)
1. Login as admin
2. View pending events
3. Approve an event to make it public
4. Reject with reason (appears in organizer dashboard)

### 📝 Registration (Student)
1. Login as student
2. Browse approved events on dashboard
3. Click event card to see details
4. Register for an event (capacity updates)
5. View in "My Registrations" tab
6. Try unregistering

---

## 🛠️ Development Tips

### Adding New Pages
1. Create file in `frontend/src/pages/`
2. Import in `frontend/src/App.jsx`
3. Add route in Routes component

### Adding New Components
1. Create file in `frontend/src/components/`
2. Import and use in pages
3. Follow the glassmorphism style pattern

### Styling
- Use Tailwind classes for styling
- Custom colors in `tailwind.config.js`
- CSS animations in `frontend/src/styles/globals.css`

### API Calls
- All API utilities in `frontend/src/utils/api.js`
- Create new methods/functions as needed
- Request interceptor adds auth token automatically

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Backend (5000)
# Kill process using port 5000
# Windows: netstat -ano | findstr :5000, taskkill /PID <PID> /F
# macOS/Linux: lsof -i :5000, kill -9 <PID>

# Frontend (3000)
# Similar process for port 3000
```

### Dependencies Not Installing
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules
rm -rf node_modules

# Reinstall
npm install
```

### CORS Issues
The vite config has a proxy setup that handles CORS. If issues persist, check:
1. Backend CORS middleware in `backend/server.js`
2. Vite proxy config in `frontend/vite.config.js`

### API Not Connecting
1. Ensure backend is running on `http://localhost:5000`
2. Check frontend `.env` file has `VITE_API_URL=http://localhost:5000`
3. Check browser console for specific errors

---

## 📦 Project Size

- **Backend:** ~20 files, ~500 lines of code
- **Frontend:** ~40 files, ~2000+ lines of code
- **Dependencies:** ~50 npm packages total

---

## 🚀 Production Deployment

### Backend Deployment (Heroku/Render)
1. Create account and connect repository
2. Set environment variables
3. Deploy - CI/CD will install & build automatically

### Frontend Deployment (Vercel/Netlify)
1. Connect GitHub repository
2. Set `VITE_API_URL` to your backend URL
3. Deploy - automatic on every push

---

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [TailwindCSS](https://tailwindcss.com)
- [GSAP Animation](https://gsap.com)
- [Express.js](https://expressjs.com)
- [JWT Auth](https://jwt.io)

---

## ✅ Checklist Before Going to Production

- [ ] Change `JWT_SECRET` in `.env`
- [ ] Hash passwords with bcrypt
- [ ] Set `NODE_ENV=production`
- [ ] Configure CORS for your domain
- [ ] Add database (MongoDB/PostgreSQL)
- [ ] Setup HTTPS/SSL certificates
- [ ] Add rate limiting
- [ ] Configure email notifications
- [ ] Setup error logging
- [ ] Test all user flows

---

**Need help? Check the README.md for more details!**
