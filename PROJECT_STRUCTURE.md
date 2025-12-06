# Project Folder Structure

## 📁 Complete Directory Tree

```
Lending-Book/
│
├── 📄 README.md                              # Main project documentation
├── 📄 HEADLESS_UI_ARCHITECTURE.md            # Architecture guide
├── 📄 IMPLEMENTATION_EXAMPLES.md             # Code examples
├── 📄 ARCHITECTURE_DIAGRAMS.md               # Visual diagrams
├── 📄 QUICK_REFERENCE.md                     # Quick templates
├── 📄 REFACTORING_SUMMARY.md                 # What was changed
├── 📄 MIGRATION_GUIDE.md                     # How to migrate
├── 📄 DOCUMENTATION_INDEX.md                 # This file
│
├── 📄 package.json                           # Dependencies
├── 📄 tsconfig.json                          # TypeScript config
├── 📄 vite.config.ts                         # Vite config
├── 📄 components.json                        # Shadcn config
│
├── public/                                   # Static assets
│
└── src/                                      # Source code
    │
    ├── 🆕 api/                               # ⭐ NEW: API Layer
    │   ├── client.ts                         # Generic HTTP client
    │   ├── config.ts                         # API endpoints
    │   ├── equipment.service.ts              # Equipment APIs
    │   ├── course.service.ts                 # Course APIs
    │   ├── user.service.ts                   # User APIs
    │   ├── comment.service.ts                # Comment APIs
    │   └── index.ts                          # Barrel exports
    │
    ├── 🆕 handlers/                          # ⭐ NEW: Event Handlers
    │   ├── equipment.handlers.ts             # Equipment events
    │   ├── course.handlers.ts                # Course events
    │   ├── common.handlers.ts                # Generic handlers
    │   └── index.ts                          # Barrel exports
    │
    ├── hooks/                                # ✨ ENHANCED: Business Logic
    │   ├── 🆕 useEquipmentList.tsx           # Equipment list hook
    │   ├── 🆕 useEquipmentDetail.tsx         # Equipment detail hook
    │   ├── 🆕 useComments.tsx                # Comments hook
    │   ├── 🆕 useCourseList.tsx              # Course list hook
    │   ├── useDebounce.tsx                   # Debounce utility
    │   ├── useSearchAndFilter.tsx            # Legacy (can deprecate)
    │   └── hooks.tsx                         # Store hooks
    │
    ├── components/                           # UI Components
    │   └── ui/                               # ✨ REFACTORED: UI Layer
    │       ├── 🆕 EquipmentListView.tsx      # Equipment list UI
    │       ├── 🆕 EquipmentDetailView.tsx    # Equipment detail UI
    │       ├── 🆕 DetailInfo.tsx             # Info component
    │       ├── ✏️ EquipmentCard.tsx          # Refactored card
    │       ├── Button.tsx                    # Button component
    │       ├── Input.tsx                     # Input component
    │       ├── Dropdown.tsx                  # Dropdown component
    │       ├── ChatBox.tsx                   # Chat component
    │       ├── Comment.tsx                   # Comment component
    │       ├── ConfirmModal.tsx              # Confirm modal
    │       ├── CourseCard.tsx                # Course card
    │       ├── LendingModal.tsx              # Lending modal
    │       ├── LoadingPage.tsx               # Loading state
    │       ├── LoginForm.tsx                 # Login form
    │       ├── Notification.tsx              # Notifications
    │       └── FadeInSection.tsx             # Animation
    │
    ├── pages/                                # Page Components
    │   ├── student/                          # ✨ REFACTORED: Student Pages
    │   │   ├── ✏️ StudentEquipment.tsx       # Equipment list (refactored)
    │   │   ├── ✏️ EquipmentDetail.tsx        # Equipment detail (refactored)
    │   │   ├── StudentDashBoard.tsx          # Dashboard (to migrate)
    │   │   ├── BrowseCourse.tsx              # Browse courses (to migrate)
    │   │   ├── MyCourse.tsx                  # My courses (to migrate)
    │   │   ├── MyCourseDetail.tsx            # Course detail (to migrate)
    │   │   └── StudentRecord.tsx             # Records (to migrate)
    │   │
    │   ├── auth/                             # Authentication Pages
    │   │   ├── Login.tsx                     # Login page
    │   │   └── ForgotPassword.tsx            # Password reset
    │   │
    │   ├── other/                            # Other Pages
    │   │   ├── LandingPage.tsx               # Landing page
    │   │   └── ErrorPage.tsx                 # Error page
    │   │
    │   ├── visitor/                          # Visitor Pages
    │   │   └── Visitor.tsx                   # Visitor view
    │   │
    │   └── Account.tsx                       # Account page
    │
    ├── layouts/                              # Layout Components
    │   ├── DefaultLayout.tsx                 # Default layout
    │   └── components/                       # Layout sub-components
    │       ├── Header.tsx                    # Header
    │       ├── Footer.tsx                    # Footer
    │       └── Sidebar.tsx                   # Sidebar
    │
    ├── routes/                               # Routing
    │   └── Route.tsx                         # Route configuration
    │
    ├── store/                                # State Management
    │   ├── Context.tsx                       # React Context
    │   ├── Provider.tsx                      # Context Provider
    │   ├── actions.tsx                       # Actions
    │   ├── reducer.tsx                       # Reducer
    │   └── constants.tsx                     # Constants
    │
    ├── utils/                                # Utilities
    │   ├── auth.tsx                          # Auth utilities
    │   ├── loaders.tsx                       # Route loaders
    │   └── socket.tsx                        # Socket utilities
    │
    ├── types/                                # Type Definitions
    │   └── Type.tsx                          # Common types
    │
    ├── service_url/                          # URL Configuration
    │   ├── BackendUrlConfig.tsx              # Backend URLs
    │   └── RouteUrlConfig.tsx                # Route URLs
    │
    ├── http_call/                            # Legacy HTTP (can deprecate)
    │   └── HttpRequest.tsx                   # Old HTTP client
    │
    ├── lib/                                  # Libraries
    │   └── utils.ts                          # Utility functions
    │
    ├── assets/                               # Assets
    │
    ├── App.tsx                               # Main App component
    ├── main.tsx                              # App entry point
    ├── index.css                             # Global styles
    └── vite-env.d.ts                         # Vite types
```

---

## 📊 Layer Distribution

### New Files (Headless UI Architecture)

```
🆕 API Layer (7 files)
   └── Complete API abstraction

🆕 Handlers Layer (4 files)
   └── Event handling functions

🆕 Hooks Layer (4 new files + existing)
   └── Business logic hooks

🆕 UI Components (3 new + 1 refactored)
   └── Presentational components
```

### Refactored Files

```
✏️ Pages (2 files)
   ├── StudentEquipment.tsx
   └── EquipmentDetail.tsx

✏️ Components (1 file)
   └── EquipmentCard.tsx
```

### Existing Files (Unchanged)

```
📦 All other files remain as-is
   └── Can be gradually migrated
```

---

## 🎯 File Purposes

### API Layer (`src/api/`)

**client.ts**

- Generic HTTP client wrapper
- Handles all fetch requests
- Centralized error handling
- Type-safe responses

**config.ts**

- API endpoint definitions
- Base URLs
- Common headers
- Request defaults

**\*.service.ts**

- Feature-specific API calls
- Type-safe methods
- Request/response interfaces
- Business domain grouping

**index.ts**

- Barrel export file
- Clean imports for consumers

---

### Handlers Layer (`src/handlers/`)

**equipment.handlers.ts**

- Equipment event factories
- Search handlers
- Action handlers
- Comment handlers

**course.handlers.ts**

- Course event factories
- Enrollment handlers
- Filter handlers

**common.handlers.ts**

- Modal handlers
- Form handlers
- Generic utilities

**index.ts**

- Barrel export file

---

### Hooks Layer (`src/hooks/`)

**useEquipmentList.tsx**

- Equipment list state
- Search/filter logic
- Data fetching
- Loading states

**useEquipmentDetail.tsx**

- Single equipment state
- Modal management
- Borrow request logic
- Data refresh

**useComments.tsx**

- Comment CRUD operations
- Comment state management
- Real-time updates

**useCourseList.tsx**

- Course list state
- Course enrollment
- Filter logic

**useDebounce.tsx**

- Debounce utility
- Delays state updates
- Performance optimization

---

### Components Layer (`src/components/ui/`)

**EquipmentListView.tsx**

- Equipment grid display
- Search/filter controls
- Empty states
- Responsive layout

**EquipmentDetailView.tsx**

- Equipment detail display
- Information cards
- Modal integration
- Comment section

**DetailInfo.tsx**

- Reusable info display
- Icon + label + value
- Consistent formatting

**EquipmentCard.tsx**

- Equipment card display
- Image, metadata
- Action buttons
- Link wrapper

---

### Pages Layer (`src/pages/`)

**StudentEquipment.tsx**

- Composes equipment list
- Router integration
- Navigation handling
- Error handling

**EquipmentDetail.tsx**

- Composes equipment detail
- Modal management
- Borrow flow
- Comment integration

**Other pages (to migrate)**

- Follow same pattern
- Gradual migration
- One page at a time

---

## 🔄 Migration Status

### ✅ Completed

- API Layer infrastructure
- Handler factories
- Core hooks
- UI components
- StudentEquipment page
- EquipmentDetail page

### 🚧 In Progress

- Documentation complete
- Examples provided
- Templates ready

### 📋 To Do

- Migrate BrowseCourse
- Migrate MyCourse
- Migrate StudentDashboard
- Migrate Account
- Migrate StudentRecord
- Add unit tests
- Add E2E tests

---

## 📦 File Size Estimate

```
api/                  ~2 KB per service
handlers/             ~1 KB per handler
hooks/                ~3-5 KB per hook
components/ui/        ~2-4 KB per component
pages/                ~1-2 KB per page (after refactor)
```

**Total New Code:** ~50 KB
**Documentation:** ~100 KB

---

## 🎨 Code Style Guide

### File Naming

```
PascalCase:    Components, Pages
camelCase:     Functions, variables
kebab-case:    Files with utilities
UPPER_CASE:    Constants
```

### Import Order

```typescript
// 1. External libraries
import {useState} from "react";

// 2. API & Types
import {service} from "@/api";
import type {Type} from "@/api";

// 3. Hooks
import {useCustomHook} from "@/hooks/useCustomHook";

// 4. Handlers
import {createHandlers} from "@/handlers";

// 5. Components
import Component from "@/components/ui/Component";

// 6. Utils
import {helper} from "@/utils/helpers";

// 7. Styles (if any)
import "./styles.css";
```

### File Structure

```typescript
// 1. Imports
import ...

// 2. Types/Interfaces
export interface Props {}

// 3. Constants
const CONSTANT = 'value';

// 4. Component/Hook/Service
export const MyComponent = () => {
  // Implementation
};

// 5. Helper functions (if any)
const helper = () => {};

// 6. Default export
export default MyComponent;
```

---

## 🔍 Finding Files Quickly

### By Feature

```
Equipment → api/equipment.service.ts
         → hooks/useEquipmentList.tsx
         → hooks/useEquipmentDetail.tsx
         → handlers/equipment.handlers.ts
         → components/ui/EquipmentListView.tsx
         → components/ui/EquipmentCard.tsx
         → pages/student/StudentEquipment.tsx
```

### By Layer

```
API calls       → api/*.service.ts
Business logic  → hooks/use*.tsx
Event handling  → handlers/*.handlers.ts
UI rendering    → components/ui/*View.tsx
Composition     → pages/**/*.tsx
```

### By Type

```
Services   → api/*.service.ts
Hooks      → hooks/use*.tsx
Handlers   → handlers/*.handlers.ts
Views      → components/ui/*View.tsx
Cards      → components/ui/*Card.tsx
Modals     → components/ui/*Modal.tsx
Pages      → pages/**/*.tsx
```

---

## 🚀 Quick Navigation

**Working on equipment features?**
→ `src/api/equipment.service.ts`
→ `src/hooks/useEquipmentList.tsx`
→ `src/pages/student/StudentEquipment.tsx`

**Adding new API?**
→ `src/api/config.ts` (add endpoint)
→ `src/api/your-feature.service.ts` (create service)
→ `src/api/index.ts` (export it)

**Creating new hook?**
→ `src/hooks/useYourFeature.tsx`
→ Study `src/hooks/useEquipmentList.tsx` as example

**Building new UI?**
→ `src/components/ui/YourFeatureView.tsx`
→ Study `src/components/ui/EquipmentListView.tsx` as example

**Need documentation?**
→ Root level `*.md` files
→ Start with `DOCUMENTATION_INDEX.md`

---

This structure is designed for **scalability** and **maintainability**. Each layer has a clear purpose, making it easy to find and modify code!
