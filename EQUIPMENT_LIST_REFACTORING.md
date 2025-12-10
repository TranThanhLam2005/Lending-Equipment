# Equipment List Refactoring - Headless UI Architecture

## Overview

This document describes the refactoring of equipment list functionality to follow the **Headless UI Architecture** pattern, making the code more reusable, maintainable, and easier to debug.

## What Changed

### Before: Tightly Coupled Logic

- Modal logic mixed with page component
- API calls scattered throughout the page
- Difficult to reuse equipment list logic
- Hard to test individual pieces

### After: Headless UI Architecture

- **Separation of Concerns**: UI, Logic, and Event Handling are independent
- **Reusability**: Hook and handlers can be used in multiple places
- **Testability**: Each layer can be tested in isolation
- **Maintainability**: Clear boundaries and responsibilities

## Architecture Layers

```
┌─────────────────────────────────────────────────────────┐
│                StudentEquipment Page                     │
│         (Orchestrates hooks, handlers, UI)              │
└─────────────────────────────────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
┌───────▼────────┐  ┌──────▼─────┐  ┌────────▼────────┐
│ EquipmentList  │  │  Equipment │  │    Lending      │
│     View       │  │   Search   │  │     Modal       │
│  (Pure UI)     │  │  Handlers  │  │   Handlers      │
└───────┬────────┘  └──────┬─────┘  └────────┬────────┘
        │                  │                  │
        └──────────────────┼──────────────────┘
                           │
                  ┌────────▼────────┐
                  │useEquipmentList │
                  │   (Business     │
                  │     Logic)      │
                  └────────┬────────┘
                           │
                  ┌────────▼────────┐
                  │  Equipment API  │
                  │    Services     │
                  └─────────────────┘
```

## Key Components

### 1. Enhanced `useEquipmentList` Hook

**Location**: `src/hooks/equipment/useEquipmentList.tsx`

**Purpose**: Centralized business logic for equipment lists

**Features**:

- ✅ Support both loader-based and API-fetched data
- ✅ Client-side search, filter, and sort
- ✅ Loading and error states
- ✅ Refresh functionality
- ✅ Configurable API endpoints

**Usage**:

```typescript
// With loader data (recommended for route loaders)
const {displayData, isLoading, error, filters, setSearchTerm, refreshData} =
  useEquipmentList({
    initialData: loaderData,
  });

// With API fetching on mount (uses default service function)
const {displayData, isLoading} = useEquipmentList({
  fetchOnMount: true,
});

// With custom fetch function
const {displayData, isLoading} = useEquipmentList({
  fetchOnMount: true,
  fetchFn: equipmentService.getAll, // or any custom function
});
```

**Options**:

- `initialData`: Equipment[] - Initial data from route loader
- `fetchOnMount`: boolean - Whether to fetch on component mount
- `fetchFn`: () => Promise<{data: Equipment[]}> - Custom fetch function (defaults to `equipmentService.getParticipantEquipment`)

### 2. Equipment Handlers

**Location**: `src/handlers/equipment.handlers.ts`

**Purpose**: Reusable event handlers separated from UI

**New Functions**:

#### `prepareBorrowModalData(equipmentId, equipmentList)`

Prepares all data needed for the borrow modal:

- Loads supervisor information
- Loads current user information
- Combines equipment data

```typescript
const handleRequestBorrow = async (equipmentId: string) => {
  setIsLoadingModal(true);
  try {
    const {modalData, currentUser} = await prepareBorrowModalData(
      equipmentId,
      equipmentList
    );

    setModalData(modalData);
    setCurrentUser(currentUser);
    setIsModalOpen(true);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    setIsLoadingModal(false);
  }
};
```

#### `submitBorrowRequest(borrowData)`

Submits a borrow request to the API:

```typescript
await submitBorrowRequest(borrowData);
```

#### `createEquipmentSearchHandlers(...)`

Creates search/filter/sort handlers (unchanged):

```typescript
const searchHandlers = createEquipmentSearchHandlers(
  setSearchTerm,
  setSearchStatus,
  setSearchOrder
);
```

### 3. StudentEquipment Page

**Location**: `src/pages/student/StudentEquipment.tsx`

**Purpose**: Orchestrates hooks, handlers, and UI components

**Structure**:

```typescript
const StudentEquipment = () => {
  // GLOBAL STATE
  const {isSidebarOpen} = useStore();
  const navigate = useNavigate();

  // MODAL STATE
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // DATA LOADING - Load initial data from route loader
  const initialData = useLoaderData();

  // HOOKS - Equipment list with search, filter, sort
  const {displayData, filters, ...rest} = useEquipmentList({
    initialData: initialData,
  });

  // EVENT HANDLERS - Search, navigation, borrow
  const searchHandlers = createEquipmentSearchHandlers(...);
  const handleRequestBorrow = async (equipmentId) => {
    const {modalData, currentUser} =
      await prepareBorrowModalData(equipmentId, equipmentList);
    // ... set modal state
  };

  // RENDER - Main UI
  return (
    <>
      <EquipmentListView {...props} />
      {isModalOpen && <LendingModal {...modalProps} />}
    </>
  );
};
```

## Benefits

### 1. **Reusability**

The `useEquipmentList` hook can now be used in multiple places:

- ✅ `StudentEquipment.tsx` - Student equipment page
- ✅ `Visitor.tsx` - Public equipment catalog
- ✅ Future admin pages
- ✅ Equipment management pages

### 2. **Better Testing**

Each layer can be tested independently:

```typescript
// Test the hook
const {result} = renderHook(() => useEquipmentList({initialData}));

// Test the handlers
const modalData = await prepareBorrowModalData(id, list);

// Test the UI
render(<EquipmentListView {...props} />);
```

### 3. **Easier Debugging**

Clear separation makes it easy to identify issues:

- Data issues? → Check `useEquipmentList` hook
- API issues? → Check `equipment.handlers.ts`
- UI issues? → Check `EquipmentListView.tsx`
- Event issues? → Check handler functions

### 4. **Flexible Data Loading**

Multiple loading strategies:

```typescript
// Strategy 1: Route loader (best for SSR/initial load)
loader: async () => {
  const res = await equipmentService.getParticipantEquipment();
  return res.data;
};

// Strategy 2: Fetch on mount with default function
useEquipmentList({
  fetchOnMount: true,
});

// Strategy 3: Fetch on mount with custom function
useEquipmentList({
  fetchOnMount: true,
  fetchFn: equipmentService.getAll,
});

// Strategy 4: Hybrid (loader + refresh capability)
const {refreshData} = useEquipmentList({initialData: loaderData});
// Call refreshData() when needed
```

### 5. **Type Safety**

All interfaces are properly typed:

- `UseEquipmentListOptions` - Hook configuration
- `UseEquipmentListReturn` - Hook return values
- `EquipmentSearchHandlers` - Search handler types

## Migration Guide

### For New Pages Using Equipment List

```typescript
import {useEquipmentList} from "@/hooks/equipment/useEquipmentList";
import {createEquipmentSearchHandlers} from "@/handlers";
import EquipmentListView from "@/components/ui/equipment/EquipmentListView";

const MyEquipmentPage = () => {
  // 1. Get initial data (from loader or props)
  const initialData = useLoaderData();

  // 2. Use the hook
  const {
    displayData,
    filters,
    setSearchTerm,
    setSearchStatus,
    setSearchOrder,
    statusOptions,
    sortOptions,
  } = useEquipmentList({initialData});

  // 3. Create handlers
  const searchHandlers = createEquipmentSearchHandlers(
    setSearchTerm,
    setSearchStatus,
    setSearchOrder
  );

  // 4. Render UI
  return (
    <EquipmentListView
      equipmentList={displayData}
      searchTerm={filters.searchTerm}
      searchStatus={filters.searchStatus}
      searchOrder={filters.searchOrder}
      statusOptions={statusOptions}
      sortOptions={sortOptions}
      onSearchChange={searchHandlers.onSearchChange}
      onStatusChange={searchHandlers.onStatusChange}
      onSortChange={searchHandlers.onSortChange}
      // ... other props
    />
  );
};
```

### For Borrow Request Flow

```typescript
import {prepareBorrowModalData, submitBorrowRequest} from "@/handlers";
import {createLendingModalHandlers} from "@/handlers";

const MyPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const handleRequestBorrow = async (equipmentId: string) => {
    setIsLoadingModal(true);
    try {
      const {modalData, currentUser} = await prepareBorrowModalData(
        equipmentId,
        equipmentList
      );

      setModalData(modalData);
      setCurrentUser(currentUser);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoadingModal(false);
    }
  };

  const closeLendingModal = () => {
    setIsModalOpen(false);
    setModalData(null);
    setCurrentUser(null);
  };

  const lendingModalHandlers =
    modalData && currentUser
      ? createLendingModalHandlers(
          submitBorrowRequest,
          modalData,
          currentUser,
          closeLendingModal
        )
      : null;

  return (
    <>
      {/* Your UI */}
      {isModalOpen && modalData && lendingModalHandlers && (
        <LendingModal
          title="Request Equipment Borrow"
          data={modalData}
          onAccept={lendingModalHandlers.onAccept}
          onCancel={lendingModalHandlers.onCancel}
        />
      )}
    </>
  );
};
```

## File Structure

```
src/
├── hooks/
│   └── equipment/
│       └── useEquipmentList.tsx        ← Enhanced with API fetching
│
├── handlers/
│   └── equipment.handlers.ts           ← New helper functions
│
├── pages/
│   └── student/
│       └── StudentEquipment.tsx        ← Refactored to use helpers
│
├── components/
│   └── ui/
│       └── equipment/
│           └── EquipmentListView.tsx   ← Pure UI component (unchanged)
│
└── types/
    └── Type.tsx                        ← Updated interfaces
```

## Best Practices

1. **Always separate concerns**:

   - Hooks = Data & Logic
   - Handlers = Event processing
   - Components = UI rendering

2. **Use the hook consistently**:

   - Prefer `initialData` with route loaders
   - Use `fetchOnMount` for dynamic content
   - Call `refreshData()` when you need to reload

3. **Handle errors gracefully**:

   - Hook provides `error` state
   - Handlers catch and log errors
   - UI displays error messages

4. **Keep handlers pure**:

   - No side effects in handlers
   - Only process data and call callbacks
   - Easy to test and reuse

5. **Document your code**:
   - Use section comments (`// ============`)
   - Explain complex logic
   - Add JSDoc comments for exported functions

## Related Documentation

- [HEADLESS_UI_ARCHITECTURE.md](./HEADLESS_UI_ARCHITECTURE.md) - Overall architecture
- [IMPLEMENTATION_EXAMPLES.md](./IMPLEMENTATION_EXAMPLES.md) - More examples
- [LENDING_RECORD_ARCHITECTURE.md](./LENDING_RECORD_ARCHITECTURE.md) - Similar pattern for lending records

## Summary

This refactoring successfully:

- ✅ Made `useEquipmentList` reusable across different pages
- ✅ Extracted modal preparation logic to handlers
- ✅ Maintained clear separation between UI, logic, and events
- ✅ Improved code organization and readability
- ✅ Enhanced type safety
- ✅ Made the code easier to test and debug

The architecture is now more flexible, maintainable, and follows React best practices.
