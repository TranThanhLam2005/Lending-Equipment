# Equipment Headless UI Architecture - Visual Guide

## 📊 Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     StudentEquipment Page                        │
│                   (Orchestration Layer)                          │
│                                                                  │
│  Responsibilities:                                               │
│  • Compose hooks, handlers, and UI                              │
│  • Manage modal state                                           │
│  • Handle navigation                                            │
│  • Coordinate data flow                                         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ Uses
                              ▼
        ┌─────────────────────┴─────────────────────┐
        │                                           │
        ▼                                           ▼
┌───────────────────┐                    ┌──────────────────────┐
│ useEquipmentList  │                    │  Equipment Handlers  │
│                   │                    │                      │
│ (Business Logic)  │                    │  (Event Processing)  │
├───────────────────┤                    ├──────────────────────┤
│ • equipmentList   │                    │ • Search handlers    │
│ • displayData     │                    │ • Prepare modal data │
│ • isLoading       │                    │ • Submit borrow req  │
│ • error           │                    │ • Navigation         │
│ • filters         │                    │                      │
│ • setSearchTerm   │                    │ Functions:           │
│ • setSearchStatus │                    │ ✓ createEquipment    │
│ • setSearchOrder  │                    │   SearchHandlers     │
│ • refreshData()   │                    │ ✓ prepareBorrowModal │
│                   │                    │   Data               │
│ Data Sources:     │                    │ ✓ submitBorrowRequest│
│ ✓ Route loader    │                    └──────────────────────┘
│ ✓ API fetch       │                                │
│ ✓ Both (hybrid)   │                                │
└───────────────────┘                                │
        │                                             │
        │ Provides data                               │ Calls APIs
        │                                             │
        ▼                                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    EquipmentListView                             │
│                  (Presentation Layer)                            │
│                                                                  │
│  • Pure UI component                                            │
│  • No business logic                                            │
│  • Receives data and callbacks                                  │
│  • Renders equipment cards with search/filter UI                │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow

### Search/Filter Flow

```
User types in search → onSearchChange(value) → setSearchTerm(value)
                                                       │
                                                       ▼
                                         useEquipmentList hook
                                                       │
                                         Filters equipment list
                                                       │
                                                       ▼
                                              displayData updated
                                                       │
                                                       ▼
                                         EquipmentListView re-renders
                                                       │
                                                       ▼
                                            User sees filtered results
```

### Borrow Request Flow

```
User clicks "Request Borrow"
         │
         ▼
handleRequestBorrow(equipmentId) called
         │
         ├─ setIsLoadingModal(true)
         │
         ├─ prepareBorrowModalData(equipmentId, equipmentList)
         │        │
         │        ├─ Load supervisor data (API call)
         │        ├─ Load user data (API call)
         │        └─ Combine with equipment data
         │        │
         │        ▼
         │   Returns: {modalData, currentUser}
         │
         ├─ setModalData(modalData)
         ├─ setCurrentUser(currentUser)
         ├─ setIsModalOpen(true)
         │
         └─ setIsLoadingModal(false)
                  │
                  ▼
         LendingModal opens with data
                  │
         User enters purpose
                  │
         User clicks "Accept"
                  │
                  ▼
         lendingModalHandlers.onAccept()
                  │
                  ▼
         submitBorrowRequest(borrowData) → API call
                  │
                  ▼
         Modal closes on success
```

---

## 📁 File Structure and Responsibilities

```
src/
│
├── pages/student/StudentEquipment.tsx
│   └── 📄 Orchestrates everything
│       • Imports hook and handlers
│       • Manages modal state
│       • Coordinates UI rendering
│       • ~170 lines, well-organized
│
├── hooks/equipment/useEquipmentList.tsx
│   └── 🔧 Business logic for equipment lists
│       • Data fetching (loader or API)
│       • Client-side filtering & sorting
│       • Loading & error states
│       • Refresh capability
│       • ~150 lines
│
├── handlers/equipment.handlers.ts
│   └── ⚡ Event handlers and utilities
│       • createEquipmentSearchHandlers()
│       • prepareBorrowModalData()
│       • submitBorrowRequest()
│       • createEquipmentCommentHandlers()
│       • ~130 lines
│
├── components/ui/equipment/EquipmentListView.tsx
│   └── 🎨 Pure presentation component
│       • Receives props
│       • Renders UI
│       • No business logic
│       • Highly reusable
│
├── api/equipment.service.ts
│   └── 🌐 API service layer
│       • getAll()
│       • getParticipantEquipment()
│       • getSupervisorByEquipmentID()
│       • requestBorrow()
│
└── types/Type.tsx
    └── 📝 TypeScript interfaces
        • Equipment
        • UseEquipmentListOptions
        • UseEquipmentListReturn
        • EquipmentSearchHandlers
```

---

## 🎯 Layer Responsibilities

### 1️⃣ Page Layer (StudentEquipment.tsx)

```typescript
// ✅ DOES:
✓ Load initial data
✓ Use hooks
✓ Create handlers
✓ Manage local UI state (modal)
✓ Coordinate between layers
✓ Render UI components

// ❌ DOES NOT:
✗ Make direct API calls
✗ Implement search logic
✗ Process filter logic
✗ Render raw HTML (uses components)
```

### 2️⃣ Hook Layer (useEquipmentList.tsx)

```typescript
// ✅ DOES:
✓ Manage equipment state
✓ Fetch data from API
✓ Filter and sort data
✓ Track loading states
✓ Handle errors
✓ Provide refresh function

// ❌ DOES NOT:
✗ Know about UI components
✗ Handle UI events directly
✗ Manage modal state
✗ Navigate between routes
```

### 3️⃣ Handler Layer (equipment.handlers.ts)

```typescript
// ✅ DOES:
✓ Create reusable event handlers
✓ Prepare data for modals
✓ Submit API requests
✓ Process user actions

// ❌ DOES NOT:
✗ Manage state directly
✗ Render UI
✗ Know about React components
✗ Store data
```

### 4️⃣ UI Layer (EquipmentListView.tsx)

```typescript
// ✅ DOES:
✓ Render equipment cards
✓ Display search inputs
✓ Show filter dropdowns
✓ Call callback props

// ❌ DOES NOT:
✗ Fetch data
✗ Process filters
✗ Make API calls
✗ Manage complex state
```

---

## 🔌 Hook Usage Patterns

### Pattern 1: Loader Data (Recommended)

```typescript
// In route config
loader: async () => {
  const res = await equipmentService.getParticipantEquipment();
  return res.data;
};

// In component
const initialData = useLoaderData();
const {displayData} = useEquipmentList({initialData});
```

**Best for**: Initial page loads, SEO, faster first render

---

### Pattern 2: Fetch on Mount

```typescript
const {displayData, isLoading} = useEquipmentList({
  fetchOnMount: true,
  apiEndpoint: "getParticipantEquipment",
});

if (isLoading) return <LoadingPage />;
```

**Best for**: Dynamic content, client-side navigation, real-time data

---

### Pattern 3: Hybrid (Loader + Refresh)

```typescript
const initialData = useLoaderData();
const {displayData, refreshData} = useEquipmentList({initialData});

// Later...
const handleRefresh = async () => {
  await refreshData(); // Fetches fresh data
};
```

**Best for**: Interactive pages, real-time updates, refresh buttons

---

## 🎨 Component Communication

```
┌────────────────────────────────────────────────────────┐
│                 StudentEquipment                       │
└────────────────────────────────────────────────────────┘
    │
    │ Props ↓
    ├──────────────────────────────────────────┐
    │                                           │
    ▼                                           ▼
┌───────────────────┐                 ┌─────────────────┐
│ EquipmentListView │                 │  LendingModal   │
└───────────────────┘                 └─────────────────┘
    │                                           │
    │ Callbacks ↑                               │ Callbacks ↑
    │                                           │
    ├─ onSearchChange(value)                   ├─ onAccept(data)
    ├─ onStatusChange(status)                  └─ onCancel()
    ├─ onRequestBorrow(id)
    └─ onViewDetails(id)
```

---

## ✅ Benefits Visualization

### Before Refactoring

```
┌─────────────────────────────────────┐
│    StudentEquipment.tsx             │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ API Calls                     │ │
│  │ • equipmentService.getAll()   │ │
│  │ • userService.getUserBySession│ │
│  │ • lendingService.requestBorrow│ │
│  └───────────────────────────────┘ │
│  ┌───────────────────────────────┐ │
│  │ Business Logic                │ │
│  │ • Search filter               │ │
│  │ • Status filter               │ │
│  │ • Sort logic                  │ │
│  └───────────────────────────────┘ │
│  ┌───────────────────────────────┐ │
│  │ Modal Logic                   │ │
│  │ • Load supervisor             │ │
│  │ • Load user                   │ │
│  │ • Combine data                │ │
│  └───────────────────────────────┘ │
│  ┌───────────────────────────────┐ │
│  │ UI Rendering                  │ │
│  │ • Equipment cards             │ │
│  │ • Search inputs               │ │
│  └───────────────────────────────┘ │
│                                     │
│  ❌ Hard to reuse                  │
│  ❌ Hard to test                   │
│  ❌ Mixed concerns                 │
└─────────────────────────────────────┘
```

### After Refactoring

```
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│ useEquipmentList │  │  Handlers        │  │ EquipmentListView│
│                  │  │                  │  │                  │
│ • Data fetching  │  │ • Search events  │  │ • UI rendering   │
│ • Filter logic   │  │ • Modal prep     │  │ • User input     │
│ • Loading states │  │ • API submit     │  │ • Display cards  │
│                  │  │                  │  │                  │
│ ✅ Reusable      │  │ ✅ Testable      │  │ ✅ Pure UI       │
│ ✅ Testable      │  │ ✅ Reusable      │  │ ✅ Reusable      │
└──────────────────┘  └──────────────────┘  └──────────────────┘
         │                    │                      │
         └────────────────────┼──────────────────────┘
                              │
                   ┌──────────▼──────────┐
                   │  StudentEquipment   │
                   │                     │
                   │  • Orchestrates     │
                   │  • Coordinates      │
                   │  • Composes         │
                   │                     │
                   │  ✅ Clean & simple  │
                   └─────────────────────┘
```

---

## 🚀 Quick Reference

### Import Statements

```typescript
// Hook
import {useEquipmentList} from "@/hooks/equipment/useEquipmentList";

// Handlers
import {
  createEquipmentSearchHandlers,
  prepareBorrowModalData,
  submitBorrowRequest,
} from "@/handlers";

// Components
import EquipmentListView from "@/components/ui/equipment/EquipmentListView";
import LendingModal from "@/components/ui/common/LendingModal";
```

### Hook Usage

```typescript
const {
  equipmentList, // Full list
  displayData, // Filtered/sorted list
  isLoading, // Loading state
  error, // Error message
  filters, // Current filter values
  setSearchTerm, // Update search
  setSearchStatus, // Update status filter
  setSearchOrder, // Update sort
  statusOptions, // Available statuses
  sortOptions, // Available sorts
  refreshData, // Refresh function
} = useEquipmentList({
  initialData, // From loader
  fetchOnMount, // Optional: fetch on mount
  apiEndpoint, // Optional: which API
});
```

### Handler Usage

```typescript
// Search handlers
const searchHandlers = createEquipmentSearchHandlers(
  setSearchTerm,
  setSearchStatus,
  setSearchOrder
);

// Borrow modal
const {modalData, currentUser} = await prepareBorrowModalData(
  equipmentId,
  equipmentList
);

// Submit request
await submitBorrowRequest(borrowData);
```

---

## 📚 Documentation Links

- 📘 [EQUIPMENT_LIST_REFACTORING.md](./EQUIPMENT_LIST_REFACTORING.md) - Detailed guide
- 📘 [EQUIPMENT_REFACTORING_SUMMARY.md](./EQUIPMENT_REFACTORING_SUMMARY.md) - Quick summary
- 📘 [HEADLESS_UI_ARCHITECTURE.md](./HEADLESS_UI_ARCHITECTURE.md) - Overall architecture
- 📘 This file - Visual guide and diagrams

---

**Last Updated**: December 8, 2025
**Status**: ✅ Production Ready
