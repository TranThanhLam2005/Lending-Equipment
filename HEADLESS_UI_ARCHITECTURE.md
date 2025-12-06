# Headless UI Architecture

This document explains the headless UI pattern implementation in this project, which separates concerns into distinct layers for better maintainability, testability, and reusability.

## Architecture Overview

The project follows a **Headless UI Pattern** with three main layers:

```
┌─────────────────────────────────────────────────────────┐
│                    Pages/Containers                      │
│  (Compose hooks, handlers, and UI components)           │
└─────────────────────────────────────────────────────────┘
                           ▲
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
┌───────▼────────┐  ┌──────▼─────┐  ┌────────▼────────┐
│   UI Layer     │  │ Hooks Layer│  │ Handlers Layer  │
│ (Presentation) │  │  (Logic)   │  │    (Events)     │
└───────┬────────┘  └──────┬─────┘  └────────┬────────┘
        │                  │                  │
        └──────────────────┼──────────────────┘
                           ▼
                  ┌────────────────┐
                  │   API Layer    │
                  │ (Data Fetching)│
                  └────────────────┘
```

## Layer Breakdown

### 1. API Layer (`src/api/`)

Responsible for all data fetching and API communication.

**Structure:**

```
api/
├── client.ts              # Generic API client with fetch wrapper
├── config.ts              # API endpoints and configuration
├── equipment.service.ts   # Equipment-related API calls
├── course.service.ts      # Course-related API calls
├── user.service.ts        # User-related API calls
├── comment.service.ts     # Comment-related API calls
└── index.ts              # Barrel export
```

**Example:**

```typescript
// equipment.service.ts
export const equipmentService = {
  async getAll() {
    return apiClient.get<Equipment[]>(API_ENDPOINTS.EQUIPMENT.GET_ALL);
  },

  async queryEquipment(params: EquipmentQueryParams) {
    return apiClient.get<Equipment[]>(endpoint);
  },
};
```

**Benefits:**

- Centralized API logic
- Easy to mock for testing
- Type-safe with TypeScript interfaces
- Reusable across the application

---

### 2. Hooks Layer (`src/hooks/`)

Contains custom hooks that encapsulate business logic and state management. These hooks use the API layer and return data + methods.

**Key Hooks:**

#### `useEquipmentList.tsx`

Manages equipment list with search, filter, and sort functionality.

```typescript
const {
  displayData, // Filtered or original data
  filters, // Current filter values
  isLoading, // Loading state
  error, // Error state
  setSearchTerm, // Update search term
  setSearchStatus, // Update status filter
  setSearchOrder, // Update sort order
  statusOptions, // Available status options
  sortOptions, // Available sort options
} = useEquipmentList({initialData});
```

#### `useEquipmentDetail.tsx`

Manages equipment detail page state and actions.

```typescript
const {
  equipment, // Equipment data
  user, // User data
  isLoading, // Loading state
  isLendingModalOpen, // Modal state
  openLendingModal, // Open modal action
  requestBorrow, // Submit borrow request
  refreshEquipment, // Refresh data
} = useEquipmentDetail({equipmentId, initialEquipment, initialUser});
```

#### `useComments.tsx`

Manages comment CRUD operations.

```typescript
const {
  comments, // Comment list
  addComment, // Create new comment
  updateComment, // Update existing comment
  deleteComment, // Delete comment
  refreshComments, // Refresh list
} = useComments({equipmentId, initialComments});
```

**Benefits:**

- Separates business logic from UI
- Reusable across multiple components
- Easy to test in isolation
- Manages complex state internally

---

### 3. Handlers Layer (`src/handlers/`)

Pure functions that create event handlers. They bridge UI events with hook actions.

**Structure:**

```
handlers/
├── equipment.handlers.ts  # Equipment-related event handlers
├── course.handlers.ts     # Course-related event handlers
├── common.handlers.ts     # Generic handlers (modals, forms)
└── index.ts              # Barrel export
```

**Example:**

```typescript
// Create search handlers
const searchHandlers = createEquipmentSearchHandlers(
  setSearchTerm,
  setSearchStatus,
  setSearchOrder
);

// Usage in component
<Input onChange={(e) => searchHandlers.onSearchChange(e.target.value)} />;
```

**Benefits:**

- Separates event handling from UI
- Easy to test
- Provides a consistent interface
- Can be composed and reused

---

### 4. UI Layer (`src/components/ui/`)

Pure presentational components that receive all data and handlers as props.

**Key Components:**

#### `EquipmentListView.tsx`

Displays a list of equipment with search/filter controls.

```typescript
<EquipmentListView
  equipmentList={displayData}
  searchTerm={filters.searchTerm}
  onSearchChange={searchHandlers.onSearchChange}
  onRequestBorrow={handleRequestBorrow}
  // ... other props
/>
```

#### `EquipmentDetailView.tsx`

Displays detailed equipment information.

```typescript
<EquipmentDetailView
  equipment={equipment}
  user={user}
  isLendingModalOpen={isLendingModalOpen}
  onOpenLendingModal={openLendingModal}
  onConfirmBorrow={handleConfirmBorrow}
  // ... other props
/>
```

#### `EquipmentCard.tsx`

Reusable card component for displaying equipment.

```typescript
<EquipmentCard
  id={item.ID}
  name={item.Name}
  type={item.Type}
  onRequestBorrow={onRequestBorrow}
  onViewDetails={onViewDetails}
/>
```

**Benefits:**

- Highly reusable
- Easy to style and modify UI
- Testable with props
- No business logic

---

### 5. Pages Layer (`src/pages/`)

Containers that compose hooks, handlers, and UI components.

**Example: StudentEquipment.tsx**

```typescript
const StudentEquipment = () => {
  // 1. Get initial data from router
  const initialData = useLoaderData();

  // 2. Use headless hook for state management
  const {
    displayData,
    filters,
    setSearchTerm,
    setSearchStatus,
    setSearchOrder,
    statusOptions,
    sortOptions,
  } = useEquipmentList({initialData});

  // 3. Create event handlers
  const searchHandlers = createEquipmentSearchHandlers(
    setSearchTerm,
    setSearchStatus,
    setSearchOrder
  );

  // 4. Define page-specific handlers
  const handleViewDetails = (id: string) => navigate(`/equipment/${id}`);
  const handleRequestBorrow = (id: string) => navigate(`/equipment/${id}`);

  // 5. Render presentational component
  return (
    <EquipmentListView
      equipmentList={displayData}
      searchTerm={filters.searchTerm}
      statusOptions={statusOptions}
      onSearchChange={searchHandlers.onSearchChange}
      onRequestBorrow={handleRequestBorrow}
      onViewDetails={handleViewDetails}
    />
  );
};
```

---

## Benefits of This Architecture

### 1. **Separation of Concerns**

- API calls isolated in service layer
- Business logic in hooks
- Event handling in handlers
- UI rendering in presentational components

### 2. **Testability**

- Each layer can be tested independently
- Mock API responses easily
- Test hooks without rendering UI
- Test UI components with props

### 3. **Reusability**

- Hooks can be used in multiple pages
- Handlers can be composed
- UI components are highly reusable
- API services shared across features

### 4. **Maintainability**

- Clear separation makes changes easier
- Update API without touching UI
- Change UI without affecting logic
- Add features without refactoring

### 5. **Type Safety**

- TypeScript interfaces for all layers
- Compile-time error catching
- Better IDE autocomplete
- Safer refactoring

---

## Migration Guide

### Before (Coupled Code)

```typescript
const MyComponent = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/data?search=" + search)
      .then((res) => res.json())
      .then(setData);
  }, [search]);

  return (
    <div>
      <input onChange={(e) => setSearch(e.target.value)} />
      {data.map((item) => (
        <div>{item.name}</div>
      ))}
    </div>
  );
};
```

### After (Headless Pattern)

**1. Create API Service:**

```typescript
// api/data.service.ts
export const dataService = {
  async query(search: string) {
    return apiClient.get("/api/data", {params: {search}});
  },
};
```

**2. Create Hook:**

```typescript
// hooks/useDataList.tsx
export const useDataList = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dataService.query(search).then((res) => setData(res.data));
  }, [search]);

  return {data, search, setSearch};
};
```

**3. Create UI Component:**

```typescript
// components/DataListView.tsx
export const DataListView = ({data, search, onSearchChange}) => (
  <div>
    <input value={search} onChange={onSearchChange} />
    {data.map((item) => (
      <div key={item.id}>{item.name}</div>
    ))}
  </div>
);
```

**4. Compose in Page:**

```typescript
// pages/MyPage.tsx
const MyPage = () => {
  const {data, search, setSearch} = useDataList();

  return (
    <DataListView
      data={data}
      search={search}
      onSearchChange={(e) => setSearch(e.target.value)}
    />
  );
};
```

---

## Best Practices

### 1. **Hooks Should:**

- Return data and methods
- Handle side effects
- Manage state
- NOT render UI

### 2. **Components Should:**

- Receive all data as props
- Be purely presentational
- NOT fetch data
- NOT contain business logic

### 3. **Handlers Should:**

- Be pure functions
- Take setters as parameters
- Return handler objects
- Be composable

### 4. **API Services Should:**

- Use the shared client
- Return typed responses
- Handle errors consistently
- NOT manage state

---

## Testing Examples

### Test API Service

```typescript
import {equipmentService} from "@/api";

jest.mock("@/api/client");

test("fetches equipment list", async () => {
  const mockData = [{ID: "1", Name: "Test"}];
  apiClient.get.mockResolvedValue({data: mockData});

  const result = await equipmentService.getAll();
  expect(result.data).toEqual(mockData);
});
```

### Test Hook

```typescript
import {renderHook, act} from "@testing-library/react-hooks";
import {useEquipmentList} from "@/hooks/useEquipmentList";

test("filters equipment by search term", async () => {
  const {result} = renderHook(() => useEquipmentList());

  act(() => {
    result.current.setSearchTerm("laptop");
  });

  await waitFor(() => {
    expect(result.current.displayData).toMatchSnapshot();
  });
});
```

### Test Component

```typescript
import {render, fireEvent} from "@testing-library/react";
import EquipmentListView from "@/components/ui/EquipmentListView";

test("calls onSearchChange when input changes", () => {
  const mockOnChange = jest.fn();
  const {getByPlaceholderText} = render(
    <EquipmentListView onSearchChange={mockOnChange} {...props} />
  );

  fireEvent.change(getByPlaceholderText("Search..."), {
    target: {value: "laptop"},
  });

  expect(mockOnChange).toHaveBeenCalledWith("laptop");
});
```

---

## Future Enhancements

1. **Add State Management Library** (e.g., Zustand, Redux Toolkit)
2. **Implement React Query** for better data fetching
3. **Add Error Boundaries** for better error handling
4. **Create Storybook** for component documentation
5. **Add E2E Tests** with Playwright/Cypress
6. **Implement Optimistic Updates** for better UX
7. **Add Caching Strategy** for API responses

---

## References

- [Headless UI Pattern](https://www.patterns.dev/posts/headless-ui-pattern)
- [React Hooks Best Practices](https://react.dev/reference/react)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
