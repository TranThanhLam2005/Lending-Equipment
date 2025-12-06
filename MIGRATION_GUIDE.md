# Migration Guide - Converting Existing Pages to Headless UI

This guide helps you migrate existing pages to the new headless UI architecture.

## Overview

The migration process involves extracting:

1. API calls → API services
2. Business logic → Custom hooks
3. Event handlers → Handler functions
4. UI rendering → Presentational components

---

## Step-by-Step Migration Process

### Example: Migrating MyCourse.tsx

Let's say you have this existing component:

```typescript
// BEFORE: src/pages/student/MyCourse.tsx
const MyCourse = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      `http://192.168.1.6:3000/user/get_participant_courses?search=${search}`
    )
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .finally(() => setLoading(false));
  }, [search]);

  const handleEnroll = async (courseId) => {
    await fetch(`http://192.168.1.6:3000/courses/enroll/${courseId}`, {
      method: "POST",
      credentials: "include",
    });
    // Refresh courses
  };

  return (
    <div>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      {loading && <div>Loading...</div>}
      {courses.map((course) => (
        <div key={course.ID}>
          <h3>{course.Name}</h3>
          <button onClick={() => handleEnroll(course.ID)}>Enroll</button>
        </div>
      ))}
    </div>
  );
};
```

---

### Step 1: Create API Service

Extract all API calls into a service:

```typescript
// NEW: src/api/course.service.ts
export const courseService = {
  async getParticipantCourses(searchTerm?: string) {
    const params = searchTerm ? `?search=${searchTerm}` : "";
    return apiClient.get<Course[]>(
      `${API_ENDPOINTS.COURSES.GET_PARTICIPANT}${params}`
    );
  },

  async enrollCourse(courseId: string) {
    return apiClient.post(`/courses/enroll/${courseId}`);
  },
};
```

---

### Step 2: Create Custom Hook

Extract business logic and state management:

```typescript
// NEW: src/hooks/useMyCourses.tsx
import {useState, useEffect} from "react";
import {courseService} from "@/api";
import type {Course} from "@/api";

export const useMyCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch courses when search changes
  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await courseService.getParticipantCourses(search);
        setCourses(response.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch courses"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [search]);

  // Enroll in course
  const enrollCourse = async (courseId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await courseService.enrollCourse(courseId);
      // Refresh courses after enrollment
      const response = await courseService.getParticipantCourses(search);
      setCourses(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to enroll");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    courses,
    search,
    setSearch,
    isLoading,
    error,
    enrollCourse,
  };
};
```

---

### Step 3: Create Presentational Component

Extract UI into a pure component:

```typescript
// NEW: src/components/ui/MyCoursesView.tsx
import type {Course} from "@/api";

export interface MyCoursesViewProps {
  courses: Course[];
  isLoading: boolean;
  error: string | null;
  search: string;
  onSearchChange: (value: string) => void;
  onEnroll: (courseId: string) => void;
}

const MyCoursesView = ({
  courses,
  isLoading,
  error,
  search,
  onSearchChange,
  onEnroll,
}: MyCoursesViewProps) => {
  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search courses..."
        className="border rounded px-3 py-2 mb-4"
      />

      {isLoading && <div>Loading courses...</div>}

      <div className="grid gap-4">
        {courses.map((course) => (
          <div key={course.ID} className="border rounded p-4">
            <h3 className="text-xl font-semibold">{course.Name}</h3>
            <p className="text-gray-600">{course.Description}</p>
            <button
              onClick={() => onEnroll(course.ID)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Enroll
            </button>
          </div>
        ))}
      </div>

      {courses.length === 0 && !isLoading && (
        <div className="text-center text-gray-500 py-8">No courses found</div>
      )}
    </div>
  );
};

export default MyCoursesView;
```

---

### Step 4: Refactor Page Component

Compose everything together:

```typescript
// AFTER: src/pages/student/MyCourse.tsx
import {useMyCourses} from "@/hooks/useMyCourses";
import MyCoursesView from "@/components/ui/MyCoursesView";

const MyCourse = () => {
  // Use headless hook
  const {courses, search, setSearch, isLoading, error, enrollCourse} =
    useMyCourses();

  // Handle enrollment with confirmation
  const handleEnroll = async (courseId: string) => {
    if (confirm("Are you sure you want to enroll in this course?")) {
      try {
        await enrollCourse(courseId);
        alert("Successfully enrolled!");
      } catch (err) {
        alert("Failed to enroll. Please try again.");
      }
    }
  };

  // Render presentational component
  return (
    <MyCoursesView
      courses={courses}
      isLoading={isLoading}
      error={error}
      search={search}
      onSearchChange={setSearch}
      onEnroll={handleEnroll}
    />
  );
};

export default MyCourse;
```

---

## Migration Checklist

For each page you migrate, complete these steps:

### 1. API Layer

- [ ] Identify all API calls (fetch, axios, etc.)
- [ ] Create service file in `src/api/`
- [ ] Define TypeScript interfaces
- [ ] Use `apiClient` for HTTP calls
- [ ] Add error handling

### 2. Hook Layer

- [ ] Extract state variables
- [ ] Extract side effects (useEffect)
- [ ] Extract business logic functions
- [ ] Return data and methods
- [ ] Add loading/error states

### 3. UI Layer

- [ ] Extract JSX into new component
- [ ] Define props interface
- [ ] Remove all business logic
- [ ] Remove state management
- [ ] Make component pure

### 4. Page Layer

- [ ] Import hook
- [ ] Call hook with options
- [ ] Define page-specific handlers
- [ ] Pass props to UI component
- [ ] Handle navigation

---

## Common Migration Patterns

### Pattern 1: Fetch on Mount

**Before:**

```typescript
useEffect(() => {
  fetch("/api/data")
    .then((res) => res.json())
    .then(setData);
}, []);
```

**After:**

```typescript
// In hook
useEffect(() => {
  const fetchData = async () => {
    const response = await dataService.getAll();
    setData(response.data);
  };
  fetchData();
}, []);
```

---

### Pattern 2: Search/Filter

**Before:**

```typescript
const [search, setSearch] = useState('');
useEffect(() => {
  fetch(`/api/data?search=${search}`).then(...);
}, [search]);
```

**After:**

```typescript
// In hook
const debouncedSearch = useDebounce(search, 500);
useEffect(() => {
  if (debouncedSearch) {
    const fetchFiltered = async () => {
      const response = await dataService.query({search: debouncedSearch});
      setData(response.data);
    };
    fetchFiltered();
  }
}, [debouncedSearch]);
```

---

### Pattern 3: Form Submission

**Before:**

```typescript
const handleSubmit = async (e) => {
  e.preventDefault();
  await fetch("/api/submit", {
    method: "POST",
    body: JSON.stringify(formData),
  });
};
```

**After:**

```typescript
// In hook
const submitForm = async (data: FormData) => {
  setIsLoading(true);
  try {
    await formService.submit(data);
    setFormData(initialValues);
  } catch (err) {
    setError(err.message);
    throw err;
  } finally {
    setIsLoading(false);
  }
};
```

---

### Pattern 4: Modal Management

**Before:**

```typescript
const [isOpen, setIsOpen] = useState(false);
```

**After:**

```typescript
// In hook
const [isModalOpen, setIsModalOpen] = useState(false);

return {
  isModalOpen,
  openModal: () => setIsModalOpen(true),
  closeModal: () => setIsModalOpen(false),
};
```

---

## Troubleshooting Common Issues

### Issue 1: Infinite Loop in useEffect

**Problem:**

```typescript
useEffect(() => {
  fetchData();
}, [fetchData]); // fetchData changes every render!
```

**Solution:**

```typescript
useEffect(() => {
  fetchData();
}, []); // Or use useCallback for fetchData
```

---

### Issue 2: Stale Closure in Event Handler

**Problem:**

```typescript
const handleClick = () => {
  console.log(data); // Uses old value
};
```

**Solution:**

```typescript
const handleClick = useCallback(() => {
  console.log(data);
}, [data]);
```

---

### Issue 3: Props Not Updating in Child

**Problem:**

```typescript
const MemoizedComponent = React.memo(Component);
// Props change but component doesn't re-render
```

**Solution:**

```typescript
const MemoizedComponent = React.memo(Component, (prev, next) => {
  return prev.data === next.data; // Custom comparison
});
```

---

## Testing After Migration

After migrating each page, test:

1. **Functionality**

   - [ ] All features work as before
   - [ ] No broken interactions
   - [ ] Forms submit correctly
   - [ ] Data displays properly

2. **Error Handling**

   - [ ] Loading states show correctly
   - [ ] Errors display properly
   - [ ] Network errors handled
   - [ ] Validation works

3. **Performance**

   - [ ] No unnecessary re-renders
   - [ ] API calls optimized
   - [ ] Debouncing works
   - [ ] Loading is smooth

4. **Code Quality**
   - [ ] No TypeScript errors
   - [ ] ESLint passes
   - [ ] Code is readable
   - [ ] Follows conventions

---

## Migration Priority

Suggested order for migrating remaining pages:

1. **Simple Pages First**

   - `BrowseCourse.tsx` - Simple list view
   - `StudentDashboard.tsx` - Display only
   - `Account.tsx` - Basic form

2. **Medium Complexity**

   - `MyCourse.tsx` - List with actions
   - `StudentRecord.tsx` - Data display + filter

3. **Complex Pages**
   - `MyCourseDetail.tsx` - Multiple data sources
   - Pages with real-time features

---

## Getting Help

If you're stuck during migration:

1. **Look at examples:**

   - `StudentEquipment.tsx` - List with search/filter
   - `EquipmentDetail.tsx` - Detail page with actions

2. **Check documentation:**

   - `HEADLESS_UI_ARCHITECTURE.md` - Architecture overview
   - `IMPLEMENTATION_EXAMPLES.md` - Complete examples
   - `QUICK_REFERENCE.md` - Templates and patterns

3. **Common patterns:**
   - Copy existing hook structure
   - Reuse handler factories
   - Follow UI component patterns

---

## Benefits After Migration

Once migrated, you'll enjoy:

✅ **Testable** - Each layer can be tested independently
✅ **Reusable** - Hooks and components work anywhere
✅ **Maintainable** - Changes isolated to one layer
✅ **Type-safe** - Full TypeScript support
✅ **Scalable** - Easy to add new features

---

## Quick Migration Script

For each page, follow this workflow:

```bash
# 1. Create API service
touch src/api/your-feature.service.ts

# 2. Create hook
touch src/hooks/useYourFeature.tsx

# 3. Create UI component
touch src/components/ui/YourFeatureView.tsx

# 4. Refactor page
# Edit src/pages/YourFeaturePage.tsx

# 5. Test
npm run dev
# Test all functionality
```

---

Remember: Migration is incremental. Migrate one page at a time, test thoroughly, and commit when it works!
