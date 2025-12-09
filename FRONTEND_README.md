# DayHub - Frontend Only Package

## 📦 What's Included

This package contains **ONLY the frontend** (client-side) code for the DayHub interpreter database application.

### ✅ Frontend Components
- **Location**: `client/`
- **Technology**: React 19 + TypeScript + Vite + Tailwind CSS 4

### 📁 Directory Structure

```
client/
├── src/
│   ├── pages/                    # All page components
│   │   ├── Home.tsx              # Main search page
│   │   ├── InterpreterDetail.tsx # Interpreter profile page
│   │   ├── Admin.tsx             # Admin dashboard
│   │   ├── InterpreterLogin.tsx  # Interpreter portal login
│   │   └── ... (14 total pages)
│   │
│   ├── components/               # Reusable UI components
│   │   ├── InterpreterMap.tsx    # Map view component
│   │   ├── PasswordLogin.tsx     # Password protection
│   │   ├── RequestAvailabilityDialog.tsx
│   │   ├── SavedSearchSidebar.tsx
│   │   ├── ui/                   # shadcn/ui components (50+ components)
│   │   └── ... (15+ custom components)
│   │
│   ├── contexts/                 # React contexts
│   │   ├── PasswordContext.tsx   # Password protection logic
│   │   └── ThemeContext.tsx      # Dark/light theme
│   │
│   ├── hooks/                    # Custom React hooks
│   │   └── useMobile.tsx         # Mobile detection
│   │
│   ├── lib/                      # Utilities
│   │   ├── trpc.ts               # tRPC client setup
│   │   └── utils.ts              # Helper functions
│   │
│   ├── App.tsx                   # Main app with routing
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Global styles
│
├── public/                       # Static assets
├── index.html                    # HTML template
│
shared/                           # Shared code (types, constants)
├── types.ts                      # TypeScript types
├── const.ts                      # Constants
└── validationData.ts             # Language/state lists

package.json                      # Dependencies
tsconfig.json                     # TypeScript config
vite.config.ts                    # Vite build config
```

## 🎨 Key Features

### Pages Included
1. **Home.tsx** - Main search interface with advanced filters
2. **InterpreterDetail.tsx** - Detailed interpreter profiles
3. **Admin.tsx** - Admin dashboard layout
4. **AdminDashboard.tsx** - Statistics and overview
5. **AdminInterpreters.tsx** - Interpreter management
6. **AdminReviews.tsx** - Review moderation
7. **AdminImport.tsx** - CSV import wizard
8. **InterpreterLogin.tsx** - Interpreter portal login
9. **InterpreterProfile.tsx** - Interpreter profile editor
10. **PublicProfile.tsx** - Public shareable profiles
11. **MyBookings.tsx** - User bookings
12. **MyFavorites.tsx** - Saved interpreters
13. **NotFound.tsx** - 404 page
14. **ComponentShowcase.tsx** - UI component demo

### Components Included
- **InterpreterMap.tsx** - Interactive Google Maps with pins
- **PasswordLogin.tsx** - Password protection screen
- **RequestAvailabilityDialog.tsx** - Booking request form
- **SavedSearchSidebar.tsx** - Saved search presets
- **FileUpload.tsx** - Drag-and-drop file uploader
- **StarRating.tsx** - 5-star rating display
- **WeeklyAvailabilityCalendar.tsx** - Schedule editor
- **50+ shadcn/ui components** - Buttons, dialogs, forms, etc.

### Styling
- **Tailwind CSS 4** with custom theme
- **Corporate navy blue** color scheme (#1e3a5f)
- **Responsive design** for mobile/tablet/desktop
- **Custom CSS variables** in index.css
- **Professional typography** (system fonts)

## 🚀 How to Use This Frontend

### Option 1: Use with Existing Backend
This frontend is designed to work with the DayHub backend via tRPC.

**Requirements:**
- Backend server running (from complete package)
- tRPC endpoints available
- CORS configured properly

**Setup:**
```bash
# Extract and install
unzip dayhub-frontend-only.zip
cd client
npm install

# Configure backend URL in vite.config.ts
# Update proxy target to your backend URL

# Run development server
npm run dev
```

### Option 2: Integrate into Your Own Project
You can integrate these React components into your own application.

**What you'll need:**
- React 19+
- TypeScript
- Tailwind CSS 4
- tRPC client (or adapt to your API)

**Steps:**
1. Copy `client/src/components/` to your project
2. Copy `client/src/pages/` to your project
3. Install dependencies from `package.json`
4. Adapt `lib/trpc.ts` to your API structure
5. Update routing in your app

## 📦 Dependencies

### Core Dependencies
```json
{
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-router-dom": "^7.1.1",
  "@tanstack/react-query": "^5.62.11",
  "@trpc/client": "^11.0.0-rc.690",
  "@trpc/react-query": "^11.0.0-rc.690"
}
```

### UI Libraries
```json
{
  "@radix-ui/react-*": "Various versions",
  "tailwindcss": "^4.0.0",
  "lucide-react": "^0.469.0",
  "sonner": "^1.7.1"
}
```

### Build Tools
```json
{
  "vite": "^6.0.3",
  "typescript": "^5.6.3",
  "@vitejs/plugin-react": "^4.3.4"
}
```

## 🔑 Important Files

### Password Protection
**File**: `client/src/contexts/PasswordContext.tsx`
**Line 4**: `const CORRECT_PASSWORD = "dayhub2025";`

Change this to update the password.

### API Connection
**File**: `client/src/lib/trpc.ts`

This configures the connection to the backend. Update the URL if needed.

### Routing
**File**: `client/src/App.tsx`

All routes are defined here:
- `/` - Home page
- `/interpreter/:id` - Interpreter detail
- `/admin` - Admin dashboard
- `/interpreter-login` - Interpreter portal
- etc.

### Styling
**File**: `client/src/index.css`

Global styles and CSS variables for theming.

## 🎯 Key Features in Frontend

### Search & Filtering
- Multi-language search (source → target)
- Location filters (state, metro, city)
- ZIP code proximity search
- Advanced filters (experience, rate, certification)
- Saved search presets

### Map View
- Interactive Google Maps
- Interpreter location pins
- Distance circles for ZIP search
- Clickable markers

### Interpreter Profiles
- Contact information display
- Language and specialty badges
- Vetted interpreter badges (golden ⭐)
- Rating and review display
- Profile photos and videos

### Admin Dashboard
- Interpreter management
- Search and filtering
- CSV export
- Statistics display
- Review moderation

### Responsive Design
- Mobile-first approach
- Tablet optimization
- Desktop full features
- Touch-friendly UI

## ⚠️ Important Notes

### This is Frontend Only
This package does **NOT** include:
- ❌ Backend API code
- ❌ Database schema
- ❌ Server-side logic
- ❌ Authentication backend
- ❌ File upload handling

### To Run This Frontend
You need either:
1. The complete DayHub backend (from complete package)
2. Your own backend with compatible API endpoints
3. Mock data for development/testing

### API Endpoints Required
The frontend expects these tRPC endpoints:
- `interpreters.search` - Search interpreters
- `interpreters.getById` - Get interpreter details
- `interpreters.getStats` - Get statistics
- `reviews.getByInterpreter` - Get reviews
- `bookings.create` - Create booking
- `favorites.toggle` - Toggle favorite
- `admin.*` - Admin operations
- etc.

## 🛠️ Build Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npm run tsc
```

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## 🎨 Customization

### Change Colors
Edit `client/src/index.css` and update CSS variables:
```css
:root {
  --primary: oklch(0.32 0.05 250); /* Navy blue */
  --secondary: oklch(0.45 0.02 250); /* Slate gray */
  /* ... etc */
}
```

### Change Password
Edit `client/src/contexts/PasswordContext.tsx`:
```typescript
const CORRECT_PASSWORD = "your-new-password";
```

### Change Branding
Edit `client/src/pages/Home.tsx`:
- Update "DayHub" title
- Update tagline
- Update hero section

## ✅ What Works Standalone

These components work without backend:
- UI components (buttons, dialogs, forms)
- Layout components
- Password protection screen
- Routing structure
- Responsive design
- Theme switching

## ❌ What Requires Backend

These features need backend API:
- Search functionality
- Interpreter data display
- Map with real locations
- Booking system
- Reviews and ratings
- Admin operations
- File uploads

---

**This is the frontend code only. For the complete application with backend and database, use the full deployment package.**
