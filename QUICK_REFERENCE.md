# Headless UI Pattern - Quick Reference

## 🚀 Quick Start

### Adding a New Feature in 5 Steps

1. **API Service** - Define data operations
2. **Hook** - Implement business logic
3. **Handlers** - Create event handlers (optional)
4. **UI Component** - Build presentational view
5. **Page** - Compose everything together

---

## 📁 File Templates

### 1. API Service Template

```typescript
// src/api/your-feature.service.ts
import {apiClient} from "./client";
import {API_ENDPOINTS} from "./config";

export interface YourEntity {
  ID: string;
  Name: string;
  // ... other fields
}

export const yourFeatureService = {
  async getAll() {
    return apiClient.get<YourEntity[]>(API_ENDPOINTS.YOUR_FEATURE.GET_ALL);
  },

  async getById(id: string) {
    return apiClient.get<YourEntity>(API_ENDPOINTS.YOUR_FEATURE.GET_BY_ID(id));
  },

  async create(data: Partial<YourEntity>) {
    return apiClient.post<YourEntity>(API_ENDPOINTS.YOUR_FEATURE.CREATE, data);
  },

  async update(id: string, data: Partial<YourEntity>) {
    return apiClient.put<YourEntity>(
      API_ENDPOINTS.YOUR_FEATURE.UPDATE(id),
      data
    );
  },

  async delete(id: string) {
    return apiClient.delete(API_ENDPOINTS.YOUR_FEATURE.DELETE(id));
  },
};
```

### 2. Hook Template

```typescript
// src/hooks/useYourFeature.tsx
import {useState, useEffect} from "react";
import {yourFeatureService} from "@/api";
import type {YourEntity} from "@/api";

export interface UseYourFeatureOptions {
  initialData?: YourEntity[];
}

export const useYourFeature = (options: UseYourFeatureOptions = {}) => {
  const {initialData = []} = options;

  const [data, setData] = useState<YourEntity[]>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await yourFeatureService.getAll();
      setData(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialData.length === 0) {
      fetchData();
    }
  }, []);

  const createItem = async (item: Partial<YourEntity>) => {
    setIsLoading(true);
    try {
      const response = await yourFeatureService.create(item);
      setData((prev) => [...prev, response.data]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    isLoading,
    error,
    createItem,
    refreshData: fetchData,
  };
};
```

### 3. Handler Template

```typescript
// src/handlers/your-feature.handlers.ts
export interface YourFeatureHandlers {
  onCreate: (data: any) => void;
  onEdit: (id: string, data: any) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}

export const createYourFeatureHandlers = (
  navigate: (path: string) => void,
  createAction: (data: any) => Promise<void>,
  editAction: (id: string, data: any) => Promise<void>,
  deleteAction: (id: string) => Promise<void>
): YourFeatureHandlers => ({
  onCreate: async (data: any) => {
    await createAction(data);
  },

  onEdit: async (id: string, data: any) => {
    await editAction(id, data);
  },

  onDelete: async (id: string) => {
    if (confirm("Are you sure?")) {
      await deleteAction(id);
    }
  },

  onView: (id: string) => {
    navigate(`/your-feature/${id}`);
  },
});
```

### 4. UI Component Template

```typescript
// src/components/ui/YourFeatureView.tsx
import type {YourEntity} from "@/api";

export interface YourFeatureViewProps {
  data: YourEntity[];
  isLoading: boolean;
  error: string | null;
  onCreate: (data: any) => void;
  onEdit: (id: string, data: any) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}

const YourFeatureView = ({
  data,
  isLoading,
  error,
  onCreate,
  onEdit,
  onDelete,
  onView,
}: YourFeatureViewProps) => {
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Your Feature</h1>

      <button onClick={() => onCreate({})}>Create New</button>

      <div>
        {data.map((item) => (
          <div key={item.ID}>
            <h3>{item.Name}</h3>
            <button onClick={() => onView(item.ID)}>View</button>
            <button onClick={() => onEdit(item.ID, {})}>Edit</button>
            <button onClick={() => onDelete(item.ID)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourFeatureView;
```

### 5. Page Component Template

```typescript
// src/pages/YourFeaturePage.tsx
import {useNavigate} from "react-router-dom";
import {useYourFeature} from "@/hooks/useYourFeature";
import {createYourFeatureHandlers} from "@/handlers";
import YourFeatureView from "@/components/ui/YourFeatureView";

const YourFeaturePage = () => {
  const navigate = useNavigate();

  const {data, isLoading, error, createItem, refreshData} = useYourFeature();

  const handlers = createYourFeatureHandlers(
    navigate,
    createItem,
    (id, data) => {
      /* edit logic */
    },
    (id) => {
      /* delete logic */
    }
  );

  return (
    <YourFeatureView
      data={data}
      isLoading={isLoading}
      error={error}
      onCreate={handlers.onCreate}
      onEdit={handlers.onEdit}
      onDelete={handlers.onDelete}
      onView={handlers.onView}
    />
  );
};

export default YourFeaturePage;
```

---

## 🎯 Common Patterns

### Pattern 1: List with Search/Filter

```typescript
// Hook
const {displayData, filters, setSearchTerm, setFilter} = useListWithFilter();

// UI
<ListView
  data={displayData}
  searchTerm={filters.searchTerm}
  onSearchChange={setSearchTerm}
/>;
```

### Pattern 2: Detail Page with Actions

```typescript
// Hook
const {item, isLoading, update, delete: deleteItem} = useItemDetail({id});

// UI
<DetailView item={item} onUpdate={update} onDelete={deleteItem} />;
```

### Pattern 3: Form with Validation

```typescript
// Hook
const {values, errors, handleChange, handleSubmit} = useForm({
  initialValues,
  onSubmit,
  validate,
});

// UI
<FormView
  values={values}
  errors={errors}
  onChange={handleChange}
  onSubmit={handleSubmit}
/>;
```

### Pattern 4: Modal Management

```typescript
// Hook
const {isOpen, open, close} = useModal();

// UI
<>
  <Button onClick={open}>Open Modal</Button>
  {isOpen && <Modal onClose={close} />}
</>;
```

---

## 📦 Import Patterns

### Organized Imports

```typescript
// Libraries (external)
import {useState, useEffect} from "react";
import {useNavigate, useLoaderData} from "react-router-dom";

// API & Types
import {yourService} from "@/api";
import type {YourType} from "@/api";

// Hooks
import {useYourHook} from "@/hooks/useYourHook";

// Handlers
import {createYourHandlers} from "@/handlers";

// Components
import YourView from "@/components/ui/YourView";
import {Button} from "@/components/ui/Button";

// Utils
import {formatDate} from "@/utils/helpers";
```

---

## 🔧 Common Utilities

### Error Handling

```typescript
try {
  await apiCall();
  // Success notification
} catch (err) {
  const message = err instanceof Error ? err.message : "Unknown error";
  setError(message);
  // Error notification
}
```

### Loading States

```typescript
const handleAction = async () => {
  setIsLoading(true);
  try {
    await action();
  } finally {
    setIsLoading(false);
  }
};
```

### Optimistic Updates

```typescript
const optimisticUpdate = async (id: string) => {
  const backup = data;
  setData(data.filter((item) => item.id !== id));

  try {
    await deleteService(id);
  } catch (err) {
    setData(backup);
    setError("Failed to delete");
  }
};
```

---

## 🧪 Testing Quick Reference

### Test API Service

```typescript
import {yourService} from "@/api";

jest.mock("@/api/client");

test("fetches data", async () => {
  const mockData = [{ID: "1", Name: "Test"}];
  apiClient.get.mockResolvedValue({data: mockData});

  const result = await yourService.getAll();
  expect(result.data).toEqual(mockData);
});
```

### Test Hook

```typescript
import {renderHook, act} from "@testing-library/react-hooks";
import {useYourHook} from "@/hooks/useYourHook";

test("updates state", async () => {
  const {result} = renderHook(() => useYourHook());

  act(() => {
    result.current.updateAction("new value");
  });

  expect(result.current.value).toBe("new value");
});
```

### Test Component

```typescript
import {render, fireEvent} from "@testing-library/react";
import YourView from "@/components/ui/YourView";

test("calls handler on click", () => {
  const mockHandler = jest.fn();
  const {getByText} = render(<YourView onClick={mockHandler} />);

  fireEvent.click(getByText("Click me"));
  expect(mockHandler).toHaveBeenCalled();
});
```

---

## 📚 Existing Implementations

### Reference Examples in This Project:

**✅ Equipment List**

- Hook: `src/hooks/useEquipmentList.tsx`
- View: `src/components/ui/EquipmentListView.tsx`
- Page: `src/pages/student/StudentEquipment.tsx`

**✅ Equipment Detail**

- Hook: `src/hooks/useEquipmentDetail.tsx`
- View: `src/components/ui/EquipmentDetailView.tsx`
- Page: `src/pages/student/EquipmentDetail.tsx`

**✅ Comments**

- Hook: `src/hooks/useComments.tsx`
- Service: `src/api/comment.service.ts`

---

## ⚡ Performance Tips

1. **Memoize expensive computations**

```typescript
const expensiveValue = useMemo(() => computeExpensive(data), [data]);
```

2. **Debounce search inputs**

```typescript
const debouncedSearch = useDebounce(searchTerm, 500);
```

3. **Use React.memo for pure components**

```typescript
export default React.memo(YourComponent);
```

4. **Lazy load routes**

```typescript
const YourPage = lazy(() => import("./pages/YourPage"));
```

---

## 🐛 Debugging Tips

### Check Data Flow

1. Console log in hook
2. React DevTools to check props
3. Network tab for API calls
4. Add error boundaries

### Common Issues

- **Props not updating**: Check memo/dependencies
- **Infinite loop**: Check useEffect dependencies
- **Type errors**: Verify interface matches
- **API errors**: Check network tab + backend logs

---

## 📝 Naming Conventions

### Files

- Hook: `useFeatureName.tsx`
- Service: `feature-name.service.ts`
- Handler: `feature-name.handlers.ts`
- View: `FeatureNameView.tsx`
- Card: `FeatureNameCard.tsx`

### Functions

- Hook: `useFeatureName`
- Service method: `getFeatures`, `createFeature`
- Handler factory: `createFeatureHandlers`
- Event handler: `onFeatureAction`

### Types

- Interface: `FeatureName`
- Props: `FeatureNameProps`
- Options: `FeatureNameOptions`
- Return type: `UseFeatureNameReturn`

---

## 🎓 Learning Path

1. Read `HEADLESS_UI_ARCHITECTURE.md` for overview
2. Study `StudentEquipment.tsx` implementation
3. Review `IMPLEMENTATION_EXAMPLES.md` for patterns
4. Try refactoring a simple page
5. Implement a new feature from scratch

---

## 🆘 Need Help?

1. Check existing implementations first
2. Review the architecture documentation
3. Look at the diagrams in `ARCHITECTURE_DIAGRAMS.md`
4. Follow the templates in this guide
5. Test each layer independently

---

## ✅ Pre-commit Checklist

- [ ] API service has proper error handling
- [ ] Hook manages loading/error states
- [ ] Component is purely presentational
- [ ] Types are properly defined
- [ ] No business logic in components
- [ ] Handlers are pure functions
- [ ] Code follows naming conventions
- [ ] Added necessary documentation

---

**Remember**: The goal is separation of concerns. Keep each layer focused on its responsibility!
