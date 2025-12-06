# Headless UI Implementation Examples

This guide provides practical examples of implementing new features using the headless UI pattern.

## Example 1: Adding a Course List Feature

### Step 1: Define API Service

```typescript
// src/api/course.service.ts
import {apiClient} from "./client";
import {API_ENDPOINTS} from "./config";

export interface Course {
  ID: string;
  Name: string;
  Description: string;
  StartDate: string;
  EndDate: string;
  Instructor: string;
}

export const courseService = {
  async getAllCourses() {
    return apiClient.get<Course[]>(API_ENDPOINTS.COURSES.GET_ALL);
  },

  async getCoursesByCategory(category: string) {
    return apiClient.get<Course[]>(
      `${API_ENDPOINTS.COURSES.GET_ALL}?category=${category}`
    );
  },

  async enrollCourse(courseId: string) {
    return apiClient.post(`${API_ENDPOINTS.COURSES.ENROLL}/${courseId}`);
  },
};
```

### Step 2: Create Headless Hook

```typescript
// src/hooks/useCourseList.tsx
import {useState, useEffect} from "react";
import {courseService, Course} from "@/api";

export interface UseCourseListOptions {
  initialData?: Course[];
  category?: string;
}

export const useCourseList = (options: UseCourseListOptions = {}) => {
  const {initialData = [], category} = options;

  const [courses, setCourses] = useState<Course[]>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  // Fetch courses
  useEffect(() => {
    if (initialData.length > 0) return;

    const fetchCourses = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = category
          ? await courseService.getCoursesByCategory(category)
          : await courseService.getAllCourses();
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
  }, [category, initialData.length]);

  // Enroll in course
  const enrollCourse = async (courseId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await courseService.enrollCourse(courseId);
      // Refresh courses after enrollment
      const response = await courseService.getAllCourses();
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
    isLoading,
    error,
    selectedCourse,
    setSelectedCourse,
    enrollCourse,
  };
};
```

### Step 3: Create Event Handlers

```typescript
// src/handlers/course.handlers.ts
export interface CourseActionHandlers {
  onEnroll: (courseId: string) => void;
  onViewDetails: (courseId: string) => void;
  onSelect: (courseId: string) => void;
}

export const createCourseActionHandlers = (
  navigate: (path: string) => void,
  onEnrollAction: (courseId: string) => Promise<void>,
  setSelectedCourse: (courseId: string | null) => void
): CourseActionHandlers => ({
  onEnroll: async (courseId: string) => {
    await onEnrollAction(courseId);
  },

  onViewDetails: (courseId: string) => {
    navigate(`/courses/${courseId}`);
  },

  onSelect: (courseId: string) => {
    setSelectedCourse(courseId);
  },
});
```

### Step 4: Create UI Component

```typescript
// src/components/ui/CourseListView.tsx
import {Course} from "@/api";
import CourseCard from "./CourseCard";

export interface CourseListViewProps {
  courses: Course[];
  isLoading: boolean;
  selectedCourse: string | null;
  onEnroll: (courseId: string) => void;
  onViewDetails: (courseId: string) => void;
  onSelect: (courseId: string) => void;
}

const CourseListView = ({
  courses,
  isLoading,
  selectedCourse,
  onEnroll,
  onViewDetails,
  onSelect,
}: CourseListViewProps) => {
  if (isLoading) {
    return <div className="text-center py-12">Loading courses...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl md:text-4xl font-medium mb-4">
        Available Courses
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <CourseCard
            key={course.ID}
            course={course}
            isSelected={selectedCourse === course.ID}
            onEnroll={() => onEnroll(course.ID)}
            onViewDetails={() => onViewDetails(course.ID)}
            onSelect={() => onSelect(course.ID)}
          />
        ))}
      </div>

      {courses.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No courses available
        </div>
      )}
    </div>
  );
};

export default CourseListView;
```

### Step 5: Compose in Page Component

```typescript
// src/pages/BrowseCourse.tsx
import {useNavigate} from "react-router-dom";
import {useCourseList} from "@/hooks/useCourseList";
import {createCourseActionHandlers} from "@/handlers";
import CourseListView from "@/components/ui/CourseListView";

const BrowseCourse = () => {
  const navigate = useNavigate();

  // Use headless hook
  const {
    courses,
    isLoading,
    error,
    selectedCourse,
    setSelectedCourse,
    enrollCourse,
  } = useCourseList();

  // Create handlers
  const courseHandlers = createCourseActionHandlers(
    navigate,
    enrollCourse,
    setSelectedCourse
  );

  // Handle errors
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // Render UI
  return (
    <CourseListView
      courses={courses}
      isLoading={isLoading}
      selectedCourse={selectedCourse}
      onEnroll={courseHandlers.onEnroll}
      onViewDetails={courseHandlers.onViewDetails}
      onSelect={courseHandlers.onSelect}
    />
  );
};

export default BrowseCourse;
```

---

## Example 2: Adding Comment Functionality

### Step 1: API Service

```typescript
// Already created in src/api/comment.service.ts
// Refer to the existing implementation
```

### Step 2: Headless Hook

```typescript
// Already created in src/hooks/useComments.tsx
// Usage example:
const {comments, isLoading, addComment, updateComment, deleteComment} =
  useComments({equipmentId: "123"});
```

### Step 3: Event Handlers

```typescript
// src/handlers/comment.handlers.ts
export interface CommentHandlers {
  onSubmit: (content: string) => void;
  onEdit: (commentId: string, content: string) => void;
  onDelete: (commentId: string) => void;
}

export const createCommentHandlers = (
  addComment: (content: string) => Promise<void>,
  updateComment: (id: string, content: string) => Promise<void>,
  deleteComment: (id: string) => Promise<void>
): CommentHandlers => ({
  onSubmit: async (content: string) => {
    await addComment(content);
  },

  onEdit: async (commentId: string, content: string) => {
    await updateComment(commentId, content);
  },

  onDelete: async (commentId: string) => {
    if (confirm("Are you sure you want to delete this comment?")) {
      await deleteComment(commentId);
    }
  },
});
```

### Step 4: UI Component

```typescript
// src/components/ui/CommentSection.tsx
import {Comment} from "@/api";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";

export interface CommentSectionProps {
  comments: Comment[];
  isLoading: boolean;
  currentUserId: string;
  onSubmit: (content: string) => void;
  onEdit: (commentId: string, content: string) => void;
  onDelete: (commentId: string) => void;
}

const CommentSection = ({
  comments,
  isLoading,
  currentUserId,
  onSubmit,
  onEdit,
  onDelete,
}: CommentSectionProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Comments</h2>

      <CommentForm onSubmit={onSubmit} isLoading={isLoading} />

      <div className="space-y-2">
        {comments.map((comment) => (
          <CommentItem
            key={comment.ID}
            comment={comment}
            isOwner={comment.UserID === currentUserId}
            onEdit={(content) => onEdit(comment.ID, content)}
            onDelete={() => onDelete(comment.ID)}
          />
        ))}
      </div>

      {comments.length === 0 && (
        <p className="text-gray-500 text-center py-4">
          No comments yet. Be the first to comment!
        </p>
      )}
    </div>
  );
};

export default CommentSection;
```

### Step 5: Usage in Page

```typescript
// src/pages/student/EquipmentDetail.tsx
import {useComments} from "@/hooks/useComments";
import {createCommentHandlers} from "@/handlers";
import CommentSection from "@/components/ui/CommentSection";

const EquipmentDetail = () => {
  const {equipment, user} = useLoaderData();

  // Use comment hook
  const {
    comments,
    isLoading: isCommentsLoading,
    addComment,
    updateComment,
    deleteComment,
  } = useComments({
    equipmentId: equipment.ID,
    initialComments: equipment.historyComments,
  });

  // Create handlers
  const commentHandlers = createCommentHandlers(
    addComment,
    updateComment,
    deleteComment
  );

  return (
    <div>
      {/* ... equipment details ... */}

      <CommentSection
        comments={comments}
        isLoading={isCommentsLoading}
        currentUserId={user.ID}
        onSubmit={commentHandlers.onSubmit}
        onEdit={commentHandlers.onEdit}
        onDelete={commentHandlers.onDelete}
      />
    </div>
  );
};
```

---

## Example 3: Adding Form with Validation

### Step 1: Create Form Hook

```typescript
// src/hooks/useForm.tsx
import {useState, useCallback} from "react";

export interface UseFormOptions<T> {
  initialValues: T;
  onSubmit: (values: T) => void | Promise<void>;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
}

export const useForm = <T extends Record<string, any>>({
  initialValues,
  onSubmit,
  validate,
}: UseFormOptions<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const handleChange = useCallback(
    (field: keyof T, value: any) => {
      setValues((prev) => ({...prev, [field]: value}));

      // Clear error for this field
      if (errors[field]) {
        setErrors((prev) => {
          const newErrors = {...prev};
          delete newErrors[field];
          return newErrors;
        });
      }
    },
    [errors]
  );

  const handleBlur = useCallback((field: keyof T) => {
    setTouched((prev) => ({...prev, [field]: true}));
  }, []);

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();

      // Validate if validator provided
      if (validate) {
        const validationErrors = validate(values);
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }
      }

      setIsSubmitting(true);

      try {
        await onSubmit(values);
        // Reset form after successful submission
        setValues(initialValues);
        setTouched({});
      } catch (error) {
        console.error("Form submission error:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, validate, onSubmit, initialValues]
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  };
};
```

### Step 2: Create Form Component

```typescript
// src/components/ui/BorrowRequestForm.tsx
export interface BorrowRequestFormProps {
  equipmentId: string;
  values: {
    startDate: string;
    endDate: string;
    purpose: string;
  };
  errors: {
    startDate?: string;
    endDate?: string;
    purpose?: string;
  };
  touched: {
    startDate?: boolean;
    endDate?: boolean;
    purpose?: boolean;
  };
  isSubmitting: boolean;
  onChange: (field: string, value: any) => void;
  onBlur: (field: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const BorrowRequestForm = ({
  values,
  errors,
  touched,
  isSubmitting,
  onChange,
  onBlur,
  onSubmit,
  onCancel,
}: BorrowRequestFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Start Date</label>
        <input
          type="date"
          value={values.startDate}
          onChange={(e) => onChange("startDate", e.target.value)}
          onBlur={() => onBlur("startDate")}
          className="w-full border rounded px-3 py-2"
        />
        {touched.startDate && errors.startDate && (
          <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">End Date</label>
        <input
          type="date"
          value={values.endDate}
          onChange={(e) => onChange("endDate", e.target.value)}
          onBlur={() => onBlur("endDate")}
          className="w-full border rounded px-3 py-2"
        />
        {touched.endDate && errors.endDate && (
          <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Purpose</label>
        <textarea
          value={values.purpose}
          onChange={(e) => onChange("purpose", e.target.value)}
          onBlur={() => onBlur("purpose")}
          className="w-full border rounded px-3 py-2"
          rows={3}
        />
        {touched.purpose && errors.purpose && (
          <p className="text-red-500 text-sm mt-1">{errors.purpose}</p>
        )}
      </div>

      <div className="flex space-x-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default BorrowRequestForm;
```

### Step 3: Usage in Page

```typescript
// src/pages/student/EquipmentDetail.tsx
import {useForm} from "@/hooks/useForm";
import BorrowRequestForm from "@/components/ui/BorrowRequestForm";

const EquipmentDetail = () => {
  const {equipment} = useEquipmentDetail({equipmentId: "123"});
  const [showForm, setShowForm] = useState(false);

  // Form validation
  const validateBorrowRequest = (values: any) => {
    const errors: any = {};

    if (!values.startDate) {
      errors.startDate = "Start date is required";
    }

    if (!values.endDate) {
      errors.endDate = "End date is required";
    }

    if (
      values.startDate &&
      values.endDate &&
      values.startDate > values.endDate
    ) {
      errors.endDate = "End date must be after start date";
    }

    if (!values.purpose || values.purpose.length < 10) {
      errors.purpose = "Purpose must be at least 10 characters";
    }

    return errors;
  };

  // Form hook
  const form = useForm({
    initialValues: {
      startDate: "",
      endDate: "",
      purpose: "",
    },
    onSubmit: async (values) => {
      await equipmentService.requestBorrow(equipment.ID, values);
      setShowForm(false);
      alert("Borrow request submitted successfully!");
    },
    validate: validateBorrowRequest,
  });

  return (
    <div>
      {/* ... equipment details ... */}

      {showForm && (
        <BorrowRequestForm
          equipmentId={equipment.ID}
          values={form.values}
          errors={form.errors}
          touched={form.touched}
          isSubmitting={form.isSubmitting}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          onSubmit={form.handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};
```

---

## Quick Checklist for New Features

When adding a new feature, follow these steps:

- [ ] **API Layer**: Create service methods in `src/api/`
- [ ] **Hooks Layer**: Create custom hook in `src/hooks/`
- [ ] **Handlers Layer**: Create event handlers in `src/handlers/`
- [ ] **UI Layer**: Create presentational component in `src/components/ui/`
- [ ] **Page Layer**: Compose everything in page component
- [ ] **Types**: Define TypeScript interfaces
- [ ] **Tests**: Write tests for each layer
- [ ] **Documentation**: Update architecture docs

---

## Common Patterns

### Loading States

```typescript
if (isLoading && !data) return <LoadingPage />;
if (error) return <ErrorPage error={error} />;
if (!data) return <EmptyState />;
return <YourComponent data={data} />;
```

### Error Handling

```typescript
try {
  await apiCall();
  showSuccessNotification();
} catch (err) {
  setError(err.message);
  showErrorNotification(err.message);
}
```

### Optimistic Updates

```typescript
const deleteItem = async (id: string) => {
  // Optimistically update UI
  setItems(items.filter((item) => item.id !== id));

  try {
    await apiService.delete(id);
  } catch (err) {
    // Revert on error
    setItems(originalItems);
    setError(err.message);
  }
};
```

---

## Additional Resources

- See `HEADLESS_UI_ARCHITECTURE.md` for architecture overview
- Check existing implementations in `src/pages/student/`
- Review API services in `src/api/`
- Study hooks in `src/hooks/`
