# 🚀 Deployment Guide

---

## 📋 Pre-Deployment Checklist

- [ ] Change `JWT_SECRET` in backend `.env`
- [ ] Set `NODE_ENV=production`
- [ ] Hash passwords with bcrypt
- [ ] Add database (MongoDB/PostgreSQL)
- [ ] Setup HTTPS/SSL certificates
- [ ] Configure CORS for your domain
- [ ] Add rate limiting middleware
- [ ] Setup error logging service
- [ ] Configure email notifications
- [ ] Setup monitoring/alerting
- [ ] Test all features in production mode
- [ ] Backup database regularly
- [ ] Document deployment steps

---

## Backend Deployment

### Option 1: Heroku

**Prerequisites:**
- Heroku account
- Git installed
- Heroku CLI installed

**Steps:**

1. Create Heroku app
```bash
heroku create your-event-backend
```

2. Set environment variables
```bash
heroku config:set JWT_SECRET=your_production_secret
heroku config:set NODE_ENV=production
```

3. Deploy
```bash
git push heroku main
```

4. View logs
```bash
heroku logs --tail
```

---

### Option 2: Render

**Prerequisites:**
- Render account
- GitHub repository connected

**Steps:**

1. Create new Web Service on Render
2. Connect GitHub repo
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables
6. Deploy

---

### Option 3: DigitalOcean App Platform

**Prerequisites:**
- DigitalOcean account
- GitHub repository connected

**Steps:**

1. Create new App
2. Connect GitHub repository
3. Configure build specs
4. Set environment variables
5. Deploy

---

## Frontend Deployment

### Option 1: Vercel (Recommended)

**Prerequisites:**
- Vercel account
- GitHub repository connected

**Steps:**

1. Connect GitHub repo to Vercel
2. Install `vercel` CLI:
```bash
npm install -g vercel
```

3. Deploy from project root:
```bash
cd frontend
vercel
```

4. Configure environment variables in Vercel dashboard:
```
VITE_API_URL=https://your-backend.com
```

5. Deploy production:
```bash
vercel --prod
```

---

### Option 2: Netlify

**Prerequisites:**
- Netlify account
- GitHub repository connected

**Steps:**

1. Build production files
```bash
cd frontend
npm run build
```

2. Drag `dist` folder to Netlify

Or connect GitHub:
1. Create new site from Git
2. Choose your repository
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Configure environment variable: `VITE_API_URL`

---

### Option 3: GitHub Pages

**Prerequisites:**
- GitHub account with repository

**Steps:**

1. Update `vite.config.js`:
```js
export default {
  base: '/event-management-portal/', // your repo name
  // ... rest of config
}
```

2. Add to `package.json` scripts:
```json
{
  "deploy": "npm run build && gh-pages -d dist"
}
```

3. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

4. Deploy:
```bash
npm run deploy
```

---

## Database Migration

### From In-Memory to MongoDB

1. Install dependency:
```bash
npm install mongoose
```

2. Create models in `backend/models/`:
```javascript
// User.js, Event.js, Registration.js
```

3. Replace database access in controllers
4. Update environment variables
5. Test all endpoints

---

### From In-Memory to PostgreSQL

1. Install dependency:
```bash
npm install pg sequelize
```

2. Setup Sequelize
3. Create migrations
4. Update controllers
5. Test all endpoints

---

## Security Configuration

### HTTPS/SSL

**Using Certbot (Let's Encrypt):**
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot certonly --standalone -d yourdomain.com
```

**In Express:**
```javascript
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('/path/to/key.pem'),
  cert: fs.readFileSync('/path/to/cert.pem')
};

https.createServer(options, app).listen(443);
```

---

### Rate Limiting

```javascript
// backend/middleware/rateLimit.js
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.'
});

app.use('/api/', limiter);
```

---

### Password Hashing

```javascript
// backend/utils/passwordUtils.js
const bcrypt = require('bcrypt');

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};
```

---

### CORS Configuration

```javascript
// backend/server.js
const cors = require('cors');

const allowedOrigins = [
  'https://yourdomain.com',
  'https://www.yourdomain.com'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

---

## Environment Variables (Production)

### Backend `.env`
```
PORT=5000
NODE_ENV=production
JWT_SECRET=your_long_random_secret_key_minimum_32_characters
DATABASE_URL=your_database_url
CORS_ORIGIN=https://yourdomain.com
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
LOG_LEVEL=info
```

### Frontend `.env`
```
VITE_API_URL=https://api.yourdomain.com
VITE_ENVIRONMENT=production
```

---

## CI/CD Pipeline

### GitHub Actions Example

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: cd backend && npm install && npm test
      
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: cd frontend && npm install && npm run build
```

---

## Monitoring & Analytics

### Error Tracking (Sentry)

```javascript
// backend/server.js
import * as Sentry from "@sentry/node";

Sentry.init({ dsn: "your_sentry_dsn" });
app.use(Sentry.Handlers.errorHandler());
```

### Application Performance Monitoring

- **New Relic**
- **DataDog**
- **Grafana**

---

## Backup Strategy

### Database Backup

**MongoDB:**
```bash
# Daily backup
mongodump --uri="mongodb+srv://user:pass@cluster.mongodb.net/dbname"
```

**PostgreSQL:**
```bash
# Daily backup
pg_dump -h localhost -U user dbname > backup.sql
```

---

## Scaling Considerations

### Horizontal Scaling
- Use load balancer (nginx, AWS ALB)
- Multiple backend instances
- Sticky sessions for WebSocket

### Caching Layer
- Redis for session storage
- Redis for event cache
- Cache invalidation strategy

### Database Optimization
- Add indexes
- Query optimization
- Connection pooling

---

## Rollback Plan

1. Keep previous version deployed
2. Use blue-green deployment
3. Database migration safety
4. Quick rollback scripts

---

## Post-Deployment

1. Setup monitoring alerts
2. Monitor error logs
3. Track performance metrics
4. User feedback collection
5. Regular security audits
6. Database backups automated
7. Regular updates schedule

---

## Useful Commands

```bash
# Build frontend for production
npm run build

# Analyze bundle size
npm run build -- --profile

# Test in production mode
NODE_ENV=production npm start

# Database backups
mongodump, pg_dump

# SSL certificate check
openssl x509 -in cert.pem -text

# DNS propagation check
nslookup yourdomain.com
```

---

## Performance Targets

- **Page Load:** < 2 seconds (with 3G)
- **API Response:** < 200ms (95th percentile)
- **Uptime:** > 99.5%
- **Bundle Size:** < 100KB gzipped
- **Lighthouse Score:** > 90

---

## Support & Resources

- **Heroku Docs:** https://devcenter.heroku.com
- **Vercel Docs:** https://vercel.com/docs
- **Netlify Docs:** https://docs.netlify.com
- **Let's Encrypt:** https://letsencrypt.org
- **Security Best Practices:** https://owasp.org

---

**Congratulations! Your event management portal is production-ready! 🎉**
