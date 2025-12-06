# Headless UI Architecture - Visual Diagrams

## 1. Layer Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                          │
└─────────────────────────────────────────────────────────────────┘
                              ▲
                              │
┌─────────────────────────────────────────────────────────────────┐
│                    PAGES (Composition Layer)                     │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  - Compose hooks, handlers, and UI components              │ │
│  │  - Handle routing and navigation                           │ │
│  │  - Minimal business logic                                  │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
        │                    │                    │
        │                    │                    │
        ▼                    ▼                    ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  UI LAYER    │    │ HOOKS LAYER  │    │  HANDLERS    │
│              │    │              │    │    LAYER     │
│ Presentation │    │ Business     │    │              │
│  Components  │    │   Logic      │    │ Event        │
│              │    │              │    │  Handlers    │
│ - Props only │    │ - State mgmt │    │              │
│ - No logic   │    │ - Side effects│   │ - Pure fns   │
│ - Reusable   │    │ - Data flow  │    │ - Composable │
└──────────────┘    └──────┬───────┘    └──────────────┘
                           │
                           ▼
                  ┌──────────────┐
                  │  API LAYER   │
                  │              │
                  │ Data Fetching│
                  │              │
                  │ - Services   │
                  │ - HTTP calls │
                  │ - Type-safe  │
                  └──────┬───────┘
                         │
                         ▼
                  ┌──────────────┐
                  │   BACKEND    │
                  │     API      │
                  └──────────────┘
```

---

## 2. Data Flow Diagram

```
User Action
    │
    ▼
┌───────────────────┐
│  UI Component     │ ──── Triggers event
│  (Button click)   │
└───────────────────┘
    │
    ▼
┌───────────────────┐
│  Event Handler    │ ──── Processes event
│  (onClick)        │
└───────────────────┘
    │
    ▼
┌───────────────────┐
│  Hook Method      │ ──── Updates state
│  (setSearchTerm)  │      Calls API
└───────────────────┘
    │
    ▼
┌───────────────────┐
│  API Service      │ ──── Fetches data
│  (equipmentService)│
└───────────────────┘
    │
    ▼
┌───────────────────┐
│  Backend API      │ ──── Returns data
│  (REST endpoint)  │
└───────────────────┘
    │
    ▼
┌───────────────────┐
│  Hook State       │ ──── Stores data
│  (setEquipment)   │
└───────────────────┘
    │
    ▼
┌───────────────────┐
│  UI Component     │ ──── Re-renders
│  (Updated view)   │
└───────────────────┘
```

---

## 3. StudentEquipment Page Flow

```
┌──────────────────────────────────────────────────────────────┐
│                    StudentEquipment.tsx                       │
│                     (Page Component)                          │
│                                                               │
│  1. Load initial data from router                            │
│     const initialData = useLoaderData()                      │
│                                                               │
│  2. Use headless hook                                        │
│     const { displayData, filters, setters } =                │
│           useEquipmentList({ initialData })                  │
│                                                               │
│  3. Create event handlers                                    │
│     const handlers = createEquipmentSearchHandlers(...)      │
│                                                               │
│  4. Render UI component                                      │
│     return <EquipmentListView                                │
│              data={displayData}                              │
│              handlers={handlers} />                          │
└──────────────────────────────────────────────────────────────┘
         │                    │                    │
         ▼                    ▼                    ▼
┌───────────────┐  ┌──────────────────┐  ┌──────────────────┐
│EquipmentList  │  │ useEquipmentList │  │ Equipment        │
│    View       │  │      Hook        │  │   Handlers       │
│               │  │                  │  │                  │
│ - Search UI   │  │ - useState       │  │ - onSearchChange │
│ - Filter UI   │  │ - useEffect      │  │ - onStatusChange │
│ - Grid UI     │  │ - API calls      │  │ - onSortChange   │
│ - Cards       │  │ - Debounce       │  │                  │
└───────────────┘  └──────┬───────────┘  └──────────────────┘
                          │
                          ▼
                  ┌──────────────────┐
                  │ equipmentService │
                  │                  │
                  │ - getAll()       │
                  │ - query()        │
                  │ - getDetail()    │
                  └──────────────────┘
```

---

## 4. Equipment Detail Page Flow

```
┌──────────────────────────────────────────────────────────────┐
│                    EquipmentDetail.tsx                        │
│                     (Page Component)                          │
│                                                               │
│  const { equipment, user, modals, actions } =                │
│         useEquipmentDetail({ equipmentId, initial... })      │
│                                                               │
│  return <EquipmentDetailView                                 │
│           equipment={equipment}                              │
│           user={user}                                        │
│           isModalOpen={modals.isLendingModalOpen}           │
│           onRequestBorrow={actions.requestBorrow} />        │
└──────────────────────────────────────────────────────────────┘
         │                                        │
         ▼                                        ▼
┌──────────────────┐                    ┌──────────────────┐
│EquipmentDetail   │                    │useEquipmentDetail│
│     View         │                    │      Hook        │
│                  │                    │                  │
│ - Header         │                    │ - Equipment data │
│ - Image          │                    │ - User data      │
│ - Info cards     │                    │ - Modal states   │
│ - Request btn    │                    │ - Request action │
│ - Comments       │                    │ - Refresh data   │
└──────────────────┘                    └────────┬─────────┘
                                                 │
                              ┌──────────────────┴──────────────────┐
                              ▼                                     ▼
                    ┌──────────────────┐              ┌──────────────────┐
                    │ equipmentService │              │   userService    │
                    │                  │              │                  │
                    │ - getDetail()    │              │ - getBySession() │
                    │ - requestBorrow()│              └──────────────────┘
                    └──────────────────┘
```

---

## 5. API Layer Structure

```
┌────────────────────────────────────────────────────────────┐
│                       API Layer                             │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐                                          │
│  │  client.ts   │ ◄───── Generic HTTP client               │
│  └──────┬───────┘                                          │
│         │                                                   │
│         │ Used by all services                             │
│         │                                                   │
│  ┌──────▼────────────────────────────────────────┐        │
│  │                Services                        │        │
│  ├────────────────────────────────────────────────┤        │
│  │                                                │        │
│  │  equipment.service.ts                         │        │
│  │  ├─ getAll()                                  │        │
│  │  ├─ getParticipantEquipment()                │        │
│  │  ├─ getEquipmentDetail(id)                   │        │
│  │  ├─ queryEquipment(params)                   │        │
│  │  └─ requestBorrow(id, data)                  │        │
│  │                                                │        │
│  │  course.service.ts                            │        │
│  │  ├─ getParticipantCourses()                  │        │
│  │  └─ getCourseDetail(id)                      │        │
│  │                                                │        │
│  │  user.service.ts                              │        │
│  │  └─ getUserBySession()                        │        │
│  │                                                │        │
│  │  comment.service.ts                           │        │
│  │  ├─ getCommentsByEquipment(equipmentId)      │        │
│  │  ├─ createComment(data)                      │        │
│  │  ├─ updateComment(id, data)                  │        │
│  │  └─ deleteComment(id)                        │        │
│  │                                                │        │
│  └────────────────────────────────────────────────┘        │
│                                                             │
│  ┌──────────────┐                                          │
│  │  config.ts   │ ◄───── API endpoints & configuration     │
│  └──────────────┘                                          │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

---

## 6. Hooks Layer Structure

```
┌────────────────────────────────────────────────────────────┐
│                      Hooks Layer                            │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  useEquipmentList                                          │
│  ├─ State: equipmentList, filteredList, filters           │
│  ├─ Effects: Fetch filtered data on filter change         │
│  ├─ Returns: displayData, filters, setters, options       │
│  └─ Uses: equipmentService, useDebounce                    │
│                                                             │
│  useEquipmentDetail                                        │
│  ├─ State: equipment, user, modals, isLoading             │
│  ├─ Effects: Fetch equipment & user on mount              │
│  ├─ Returns: data, modals, actions                        │
│  └─ Uses: equipmentService, userService                    │
│                                                             │
│  useComments                                               │
│  ├─ State: comments, isLoading, error                     │
│  ├─ Effects: Fetch comments on mount                      │
│  ├─ Returns: comments, CRUD methods                       │
│  └─ Uses: commentService                                   │
│                                                             │
│  useCourseList                                             │
│  ├─ State: courses, isLoading, error                      │
│  ├─ Effects: Fetch courses on mount                       │
│  ├─ Returns: courses, methods                             │
│  └─ Uses: courseService                                    │
│                                                             │
│  useDebounce (utility)                                     │
│  ├─ State: debouncedValue                                 │
│  ├─ Effects: Delay value update                           │
│  └─ Returns: debouncedValue                               │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

---

## 7. Component Hierarchy

```
StudentEquipment (Page)
│
└── EquipmentListView (UI Component)
    │
    ├── Search Controls
    │   ├── Input (search)
    │   └── Dropdown (filters)
    │
    └── Equipment Grid
        │
        └── EquipmentCard (repeating)
            ├── Image
            ├── Type badge
            ├── Name
            ├── Status
            ├── Condition
            ├── Purchase date
            └── Action buttons


EquipmentDetail (Page)
│
└── EquipmentDetailView (UI Component)
    │
    ├── Header (Equipment name)
    │
    ├── Equipment Info Section
    │   ├── Image
    │   └── Detail Info Grid
    │       ├── DetailInfo (ID)
    │       ├── DetailInfo (Purchase date)
    │       ├── DetailInfo (Type)
    │       ├── DetailInfo (Condition)
    │       ├── DetailInfo (Date available)
    │       ├── DetailInfo (Status)
    │       └── DetailInfo (Venue)
    │
    ├── Request Button
    │
    ├── Comments Section
    │   └── ChatBox
    │
    └── Modals
        ├── LendingModal
        └── ConfirmModal
```

---

## 8. Testing Strategy

```
┌────────────────────────────────────────────────────────────┐
│                    Testing Pyramid                          │
│                                                             │
│                        E2E Tests                            │
│                      ┌─────────────┐                       │
│                      │  Playwright │                       │
│                      │   Cypress   │                       │
│                      └─────────────┘                       │
│                                                             │
│                  Integration Tests                          │
│              ┌───────────────────────┐                     │
│              │  Testing Library      │                     │
│              │  Component + Hook     │                     │
│              └───────────────────────┘                     │
│                                                             │
│                    Unit Tests                               │
│        ┌─────────────────────────────────┐                │
│        │  Jest + Testing Library          │                │
│        │  - API Services                  │                │
│        │  - Hooks                         │                │
│        │  - Handlers                      │                │
│        │  - Components                    │                │
│        └─────────────────────────────────┘                │
│                                                             │
└────────────────────────────────────────────────────────────┘

Test Coverage by Layer:

API Layer        → Unit tests (mock fetch)
Hooks Layer      → Unit tests (renderHook)
Handlers Layer   → Unit tests (pure functions)
UI Layer         → Unit tests (render, fireEvent)
Pages Layer      → Integration tests
Full Flow        → E2E tests
```

---

## 9. State Management Flow

```
┌──────────────────────────────────────────────────────────┐
│                  State Management                         │
└──────────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ▼                 ▼                 ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  Local State │  │  Hook State  │  │ Global State │
│              │  │              │  │              │
│ - UI state   │  │ - Data       │  │ - User auth  │
│ - Form input │  │ - Loading    │  │ - Theme      │
│ - Visibility │  │ - Error      │  │ - Sidebar    │
│              │  │              │  │              │
│ useState     │  │ useState in  │  │ Context API  │
│ in component │  │ custom hooks │  │ (existing)   │
└──────────────┘  └──────────────┘  └──────────────┘

State Flow:
1. User interaction → Update local/hook state
2. Hook state → Trigger API call
3. API response → Update hook state
4. Hook state → UI re-renders with new data
```

---

## 10. File Organization

```
src/
│
├── api/                    # API Layer
│   ├── client.ts          # ← HTTP client
│   ├── config.ts          # ← Endpoints
│   ├── *.service.ts       # ← Service modules
│   └── index.ts           # ← Exports
│
├── handlers/              # Event Handlers Layer
│   ├── *.handlers.ts      # ← Handler factories
│   └── index.ts           # ← Exports
│
├── hooks/                 # Business Logic Layer
│   ├── use*.tsx           # ← Custom hooks
│   └── hooks.tsx          # ← Existing
│
├── components/
│   └── ui/                # Presentational Layer
│       ├── *View.tsx      # ← Page views
│       ├── *Card.tsx      # ← Card components
│       ├── *.tsx          # ← Generic UI
│       └── ...
│
├── pages/                 # Composition Layer
│   ├── student/           # ← Student pages
│   ├── auth/              # ← Auth pages
│   ├── other/             # ← Other pages
│   └── visitor/           # ← Visitor pages
│
├── utils/                 # Utilities
├── types/                 # Type definitions
├── routes/                # Route config
└── ...
```

---

These diagrams provide a visual understanding of the headless UI architecture implemented in the project. Use them as reference when:

1. Understanding the overall architecture
2. Implementing new features
3. Debugging data flow
4. Planning tests
5. Onboarding new developers
