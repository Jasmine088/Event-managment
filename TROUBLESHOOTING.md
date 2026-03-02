# 🔧 Troubleshooting Guide

## 🚨 Common Issues & Solutions

---

## Installation & Setup Issues

### Problem: "Node.js is not installed"
**Solution:**
1. Download Node.js from https://nodejs.org/
2. Install the LTS version
3. Verify installation: `node --version` and `npm --version`
4. Restart terminal and try again

---

### Problem: "npm install fails with permission error"
**Solution (macOS/Linux):**
```bash
# Option 1: Use sudo (not recommended)
sudo npm install

# Option 2: Fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

**Solution (Windows):**
- Run terminal as Administrator
- Or delete node_modules and try again

---

### Problem: "Cannot find module" after npm install
**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

---

## Backend Issues

### Problem: "Error: listen EADDRINUSE :::5000"
**Port 5000 is already in use**

**Solution (Windows):**
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID)
taskkill /PID <PID> /F

# Or use different port
PORT=5001 npm run dev
```

**Solution (macOS/Linux):**
```bash
# Find and kill process
lsof -i :5000
kill -9 <PID>

# Or use different port
PORT=5001 npm run dev
```

---

### Problem: "Backend server crashes on startup"
**Check for errors:**
```bash
# Run with verbose logging
DEBUG=* npm run dev

# Check .env file exists
cat .env

# Verify Node version (need 16+)
node --version
```

**Common causes:**
- Missing .env file (should exist with defaults)
- ES6 imports not supported (update Node.js)
- Port already in use

---

### Problem: "Cannot POST /api/auth/login (404 error)"
**Backend not running or route issue**

**Solution:**
1. Check backend is running: `npm run dev` in backend folder
2. Verify port 5000 is open
3. Check routes are registered in server.js
4. Verify route path is correct

---

### Problem: "JWT token error - 'invalid token'"
**Token is corrupted or expired**

**Solution:**
1. Clear localStorage and login again
2. Check token format (Bearer <token>)
3. Verify JWT_SECRET in .env hasn't changed
4. Check token expiration (set to 7 days)

---

### Problem: "CORS error - Access blocked by CORS policy"
**Frontend can't reach backend due to CORS**

**Solution in backend/server.js:**
```javascript
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

**Verify:**
- Cross-Origin Resource Sharing is enabled
- Frontend origin is allowed
- Credentials are true for auth requests

---

## Frontend Issues

### Problem: "Error: listen EADDRINUSE :::3000"
**Port 3000 is already in use**

**Solution (Windows):**
```powershell
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Solution (macOS/Linux):**
```bash
lsof -i :3000
kill -9 <PID>
```

---

### Problem: "Cannot GET / - Page shows 404"
**Frontend build issue**

**Solution:**
1. Ensure Vite dev server is running: `npm run dev`
2. Navigate to http://localhost:3000
3. Check terminal for Vite output
4. Verify vite.config.js exists

---

### Problem: "Blank screen or white page"
**React app not rendering**

**Solution:**
1. Open DevTools Console (F12)
2. Check for JavaScript errors
3. Verify `<div id="root">` in index.html
4. Check main.jsx is correct
5. Clear browser cache: Ctrl+Shift+Delete

---

### Problem: "API call returns 401 Unauthorized"
**Token missing or invalid**

**Solution:**
1. Check localStorage has token (DevTools → Storage → localStorage)
2. Verify token format: `Bearer <token>`
3. Check Authorization header in Network tab
4. Re-login if token expired
5. Check token is being sent: look at Request Headers

---

### Problem: "Event cards not showing properly"
**Styling or image issue**

**Solution:**
1. Check Tailwind CSS compiling: `class="..."` in DevTools
2. Verify image URL is valid (open in new tab)
3. Check z-index conflicts
4. Clear Tailwind cache: delete node_modules, reinstall

---

### Problem: "Animations not smooth or stuttering"
**GSAP performance issue**

**Solution:**
1. Open DevTools Performance tab
2. Record animation, check for dropped frames
3. Reduce animation duration
4. Check GPU acceleration: DevTools → Rendering
5. Close other browser tabs

---

### Problem: "Form inputs not responding or stuck"
**React state issue**

**Solution:**
1. Check React DevTools for state updates
2. Verify onChange handlers are attached
3. Check for console errors
4. Clear form state manually: `setFormData({})`
5. Verify input value prop binding

---

## API & Data Issues

### Problem: "API returns 201 but data not appearing"
**Response received but UI not updated**

**Solution:**
1. Check response in Network tab
2. Verify state update call: `setData(response.data)`
3. Check component re-render (React DevTools)
4. Verify return statement includes new data
5. Check conditional rendering logic

---

### Problem: "Data persists after logout"
**State not clearing on logout**

**Solution:**
```javascript
// AuthContext logout function should:
const logout = () => {
  setUser(null);           // Clear user
  setToken(null);          // Clear token
  localStorage.removeItem('token');  // Clear storage
  navigate('/');           // Redirect home
}
```

Verify all three steps occur.

---

### Problem: "Get request works but user can't register for event"
**POST request failing**

**Check:**
1. Request method is POST (not GET)
2. Content-Type header is application/json
3. Request body contains eventId
4. User is authenticated (has token)
5. User role is 'student'

**Debug:**
```javascript
console.log('Request:', {
  method: 'POST',
  url: '/api/events/register',
  data: { eventId },
  headers: { 'Authorization': `Bearer ${token}` }
});
```

---

### Problem: "'Cannot read property of undefined'" error"
**Accessing data that doesn't exist**

**Solution:**
```javascript
// Unsafe - will crash if event is undefined:
<h1>{event.title}</h1>

// Safe - check first:
{event && <h1>{event.title}</h1>}

// Or with optional chaining:
<h1>{event?.title}</h1>
```

---

## Authentication Issues

### Problem: "Login always fails, 'Invalid credentials'"
**Credentials incorrect or case-sensitive**

**Verify:**
1. Email is lowercase: `student@college.edu`
2. Password exact match: `student123`
3. Role matches: `student`, not `Student`
4. Check database hasn't been reset

Demo credentials:
- Student: `student@college.edu` / `student123`
- Organizer: `organizer@college.edu` / `org123`
- Admin: `admin@college.edu` / `admin123`

---

### Problem: "Token valid but still shows 'Unauthorized' (401)"
**Token not being sent or expired**

**Check headers:**
1. Open Network tab → click API request
2. Check Request Headers
3. Verify: `Authorization: Bearer eyJ...`
4. If missing, axios interceptor may not be working

**Solution:**
```javascript
// backend/utils/api.js
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

### Problem: "Can't access student dashboard as admin"
**Role-based access denied**

**Verify:**
1. Login with correct role
2. Check user.role in localStorage
3. Protected route checks role: `requiredRole={['student']}`
4. Admin role might not be in allowed array

---

## Database Issues (In-Memory)

### Problem: "Data disappears after server restart"
**This is expected behavior**

In-memory database doesn't persist. This is normal.

**For persistent storage:**
1. Setup MongoDB or PostgreSQL
2. Update controllers to use database queries
3. Follow DEPLOYMENT_GUIDE.md

---

### Problem: "Created event not appearing in admin dashboard"
**Event not in database or wrong status**

**Debug:**
1. Check event.status === 'pending' (not approved)
2. Check organizer ID matches
3. Verify admin is logged in
4. Check admin route: GET /api/events/admin/all

**Solution:**
```javascript
// In browser console:
fetch('http://localhost:5000/api/events/admin/all', {
  headers: { 'Authorization': `Bearer ${token}` }
})
.then(r => r.json())
.then(data => console.log(data))
```

---

## Styling Issues

### Problem: "Dark mode not applying or colors wrong"
**Tailwind CSS not compiling**

**Solution:**
1. Verify tailwind.config.js exists in frontend root
2. Check content paths include all .jsx files
3. Verify globals.css is imported in main.jsx
4. Clear Tailwind cache: `rm -rf node_modules/.bin`
5. Restart dev server

---

### Problem: "Grid layout broken on mobile"
**Responsive classes not applied**

**Verify:**
1. Using Tailwind breakpoints: `md:`, `lg:`, `xl:`
2. Mobile-first approach: start with mobile, then md:
3. DevTools device toolbar shows correct viewport
4. Zoom level is 100% (not scaled)

**Example fix:**
```jsx
// Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

---

### Problem: "Animations not working or lag"
**GSAP or CSS animation issue**

**Check:**
1. GSAP library is imported: `import gsap from 'gsap'`
2. Element exists in DOM when animation runs
3. Check browser console for animation errors
4. Verify hardware acceleration: DevTools → Rendering
5. Test in different browser

---

## Performance Issues

### Problem: "App is slow or unresponsive"
**Check:**
1. Network tab - API responses < 200ms
2. React DevTools Profiler - component renders
3. DevTools Performance - frame rate drops
4. Browser memory usage

**Solutions:**
- Reduce animation complexity
- Implement pagination
- Add loading states
- Optimize images
- Split code with dynamic imports

---

### Problem: "High bundle size or slow load"
**Need to optimize**

**Check:**
```bash
npm run build
# Check dist folder size
ls -lh dist/
```

**Solutions:**
```bash
# Analyze bundle
npm install --save-dev webpack-bundle-analyzer

# Lazy load routes
const StudentDashboard = lazy(() => import('./pages/StudentDashboard'))
```

---

## Browser-Specific Issues

### Problem: "Works in Chrome but not Firefox"
**Compatibility issue**

**Common causes:**
1. ES6 features not supported in older Firefox
2. CSS vendor prefixes missing
3. Different CORS behavior
4. localStorage API differences

**Solution:**
- Test in multiple browsers regularly
- Use autoprefixer for CSS
- Check feature support on caniuse.com

---

### Problem: "Mobile Safari shows black screen"
**iOS compatibility issue**

**Check:**
1. Use modern CSS (no old vendor prefixes)
2. Verify EventListener compatibility
3. Check localStorage quota (limited on iOS)
4. Test in iOS DevTools / Safari Developer

---

## Development Tools

### Using DevTools Console

```javascript
// Get current user
const token = localStorage.getItem('token');
const user = JSON.parse(atob(token.split('.')[1]));
console.log(user);

// Fetch events
fetch('http://localhost:5000/api/events/approved')
  .then(r => r.json())
  .then(data => console.log(data))

// Test API
fetch('http://localhost:5000/api/events/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({ eventId: 'evt1' })
})
.then(r => r.json())
.then(data => console.log(data))
```

---

### Network Debugging

1. Open DevTools → Network tab
2. Filter by Fetch/XHR
3. Click request to see:
   - Request Headers (check Authorization)
   - Request Body (check JSON)
   - Response Headers (check status code)
   - Response Body (check error message)

---

### React DevTools

1. Install React DevTools extension
2. Components tab → inspect component tree
3. Props tab → check prop values
4. Track renders → see re-render triggers
5. Console → use `$r` to access component

---

## Getting Help

If issue persists:

1. **Check console for errors**
   - Open DevTools (F12)
   - Go to Console tab
   - Look for red error messages

2. **Check Network tab**
   - See if API calls are succeeding
   - Check status codes (200, 400, 401, 403, 404, 500)
   - Check response body for error messages

3. **Check backend logs**
   - Terminal where `npm run dev` runs
   - Look for error stack traces

4. **Search documentation**
   - README.md - Feature overview
   - SETUP_GUIDE.md - Installation
   - API_DOCUMENTATION.md - Endpoint details
   - PROJECT_STRUCTURE.md - Code architecture

5. **Create minimal test case**
   - Isolate the problem
   - Test one feature at a time
   - Check if other features work

6. **Restart everything**
   - Kill both terminals (Ctrl+C)
   - Start backend: `npm run dev`
   - Start frontend: `npm run dev`
   - Clear browser cache and reload

---

**Most issues resolve with a server restart! 🔄**

If you're still stuck, check the specific documentation file for that feature or check if there are error messages in the console or network tab.

Good luck debugging! 🐛
