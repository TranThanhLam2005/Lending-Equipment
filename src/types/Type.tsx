/**
 * Central type definitions for the Lending Book application
 * Organized by domain: API Models, UI Props, Hooks, Handlers, and Store
 */

// ============================================================================
// API MODELS - Data structures from backend
// ============================================================================

/**
 * Equipment entity
 */
export interface Equipment {
  ID: string;
  Name: string;
  Type: string;
  Status: "Available" | "Borrowed" | "Maintenance";
  Condition: "Good" | "Fair" | "Needs Repair";
  PurchaseDate: string;
  DateAvailable?: string;
  Venue?: string;
  Description?: string;
}

/**
 * Course entity
 */
export interface Course {
  CourseID: string;
  CourseName: string;
  Description: string;
  DateStart: string;
  DateEnd: string;
  LectureDate: string;
  Room: string;
  AcademicStaffName: string;
  Equipments?: Equipment[];
}

/**
 * User entity
 */
export interface User {
  ID: string;
  Username: string;
  Email: string;
  Role: "Student" | "Staff" | "Admin";
  Name: string;
}

/**
 * Comment entity
 */
export interface Comment {
  ID: string;
  Content: string;
  UserID: string;
  EquipmentID: string;
  CreatedAt: string;
  UpdatedAt?: string;
  User?: {
    Username: string;
    Name?: string;
  };
}

// ============================================================================
// API REQUEST/RESPONSE TYPES
// ============================================================================

/**
 * Login credentials
 */
export interface LoginCredentials {
  Username: string;
  Password: string;
}

/**
 * Authentication response
 */
export interface AuthResponse {
  message: string;
  user?: User;
}

/**
 * Comment creation data
 */
export interface CreateCommentData {
  content: string;
  equipmentId: string;
}

/**
 * Comment update data
 */
export interface UpdateCommentData {
  content: string;
}

/**
 * Equipment query parameters
 */
export interface EquipmentQueryParams {
  searchValue?: string;
  searchStatus?: string;
  searchOrder?: string;
}

// ============================================================================
// FILTER TYPES - For search and filtering
// ============================================================================

/**
 * Equipment filters
 */
export interface EquipmentFilters {
  searchTerm: string;
  searchStatus: string;
  searchOrder: string;
}

/**
 * Course filters
 */
export interface CourseFilters {
  searchTerm: string;
  status: string;
  sortOrder: string;
}

// ============================================================================
// HANDLER TYPES - Event handler interfaces
// ============================================================================

/**
 * Equipment search handlers
 */
export interface EquipmentSearchHandlers {
  onSearchChange: (value: string) => void;
  onStatusChange: (status: string) => void;
  onSortChange: (sort: string) => void;
}

/**
 * Equipment action handlers
 */
export interface EquipmentActionHandlers {
  onRequestBorrow?: (equipmentId: string) => void;
  onViewDetails?: (equipmentId: string) => void;
}

/**
 * Equipment comment handlers
 */
export interface EquipmentCommentHandlers {
  onCommentSubmit: (content: string, equipmentId: string) => void;
  onCommentEdit: (commentId: string, content: string) => void;
  onCommentDelete: (commentId: string) => void;
}

/**
 * Course search handlers
 */
export interface CourseSearchHandlers {
  onSearchChange: (value: string) => void;
  onStatusChange: (status: string) => void;
  onSortChange: (sort: string) => void;
}

/**
 * Course action handlers
 */
export interface CourseActionHandlers {
  onEnroll?: (courseId: string) => void;
  onViewDetails: (courseId: string) => void;
  onUnenroll?: (courseId: string) => void;
  onRefresh?: () => void;
}

/**
 * Modal handlers
 */
export interface ModalHandlers {
  onOpen: () => void;
  onClose: () => void;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
}

/**
 * Form handlers
 */
export interface FormHandlers<T = any> {
  onSubmit: (data: T) => void;
  onChange: (field: string, value: any) => void;
  onReset: () => void;
}

// ============================================================================
// HOOK OPTION TYPES - For custom hooks
// ============================================================================

/**
 * Equipment list hook options
 */
export interface UseEquipmentListOptions {
  initialData?: Equipment[];
}

/**
 * Equipment detail hook options
 */
export interface UseEquipmentDetailOptions {
  equipmentId: string;
  initialEquipment?: Equipment;
  initialUser?: User;
}

/**
 * Course list hook options
 */
export interface UseCourseListOptions {
  initialData?: Course[];
}

/**
 * Course detail hook options
 */
export interface UseCourseDetailOptions {
  initialData: Course;
}

/**
 * Comments hook options
 */
export interface UseCommentsOptions {
  equipmentId: string;
  initialComments?: Comment[];
}

// ============================================================================
// HOOK RETURN TYPES - What hooks return
// ============================================================================

/**
 * Equipment list hook return
 */
export interface UseEquipmentListReturn {
  equipmentList: Equipment[];
  displayData: Equipment[];
  isLoading: boolean;
  error: string | null;
  filters: EquipmentFilters;
  setSearchTerm: (term: string) => void;
  setSearchStatus: (status: string) => void;
  setSearchOrder: (order: string) => void;
  statusOptions: {text: string}[];
  sortOptions: {text: string}[];
  setEquipmentList: (list: Equipment[]) => void;
  setError: (error: string | null) => void;
  refreshData: () => void;
}

/**
 * Equipment detail hook return
 */
export interface UseEquipmentDetailReturn {
  equipment: Equipment | null;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isLendingModalOpen: boolean;
  isConfirmModalOpen: boolean;
  openLendingModal: () => void;
  closeLendingModal: () => void;
  openConfirmModal: () => void;
  closeConfirmModal: () => void;
  requestBorrow: (borrowData: any) => Promise<void>;
  refreshEquipment: () => Promise<void>;
}

/**
 * Course list hook return
 */
export interface UseCourseListReturn {
  courses: Course[];
  displayData: Course[];
  filters: CourseFilters;
  isLoading: boolean;
  error: string | null;
  setSearchTerm: (term: string) => void;
  setSearchStatus: (status: string) => void;
  setSearchOrder: (order: string) => void;
  refreshCourses: () => Promise<void>;
  statusOptions: string[];
  sortOptions: string[];
}

/**
 * Course detail hook return
 */
export interface UseCourseDetailReturn {
  courseData: Course;
  refreshCourse: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

/**
 * Comments hook return
 */
export interface UseCommentsReturn {
  comments: Comment[];
  isLoading: boolean;
  error: string | null;
  addComment: (content: string) => Promise<void>;
  updateComment: (commentId: string, content: string) => Promise<void>;
  deleteComment: (commentId: string) => Promise<void>;
  refreshComments: () => Promise<void>;
}

// ============================================================================
// COMPONENT PROPS - For UI components
// ============================================================================

/**
 * Course card props
 */
export interface CourseCardProps {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  description?: string;
  lectureDate?: string;
  room?: string;
  academicName?: string;
  onViewDetails?: (courseId: string) => void;
}

/**
 * Course list view props
 */
export interface CourseListViewProps {
  courses: Course[];
  displayData: Course[];
  filters: CourseFilters;
  isLoading?: boolean;
  error?: string | null;
  statusOptions: string[];
  sortOptions: string[];
  searchHandlers: CourseSearchHandlers;
  actionHandlers: CourseActionHandlers;
  searchPlaceholder?: string;
  emptyMessage?: string;
  showTotalCount?: boolean;
}

/**
 * Course detail view props
 */
export interface CourseDetailViewProps {
  courseId: string;
  courseName: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  lectureDate: string;
  room: string;
  instructorName: string;
  imageUrl?: string;
  children?: React.ReactNode;
}

/**
 * Equipment list view props
 */
export interface EquipmentListViewProps {
  equipmentList: Equipment[];
  allEquipment?: Equipment[];
  isSidebarOpen?: boolean;
  searchTerm: string;
  searchStatus: string;
  searchOrder: string;
  statusOptions: {text: string}[];
  sortOptions: {text: string}[];
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onRequestBorrow?: (equipmentId: string) => void;
  onViewDetails?: (equipmentId: string) => void;
  isRequest?: boolean;
  title?: string;
  showStatistics?: boolean;
}

/**
 * Equipment card props
 */
export interface EquipmentCardProps {
  id: string;
  name: string;
  type: string;
  status: string;
  condition: string;
  purchaseDate: string;
  imageUrl?: string;
  isRequest?: boolean;
  onRequestBorrow?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

// ============================================================================
// STORE TYPES - Application state management
// ============================================================================

/**
 * Application state
 */
export interface AppState {
  isSidebarOpen: boolean;
}

/**
 * Store action types
 */
export type ActionType = {
  type: "SET_SIDEBAR_OPEN";
  payload: boolean;
};

/**
 * Store context value
 */
export interface StoreContextValue {
  state: AppState;
  dispatch: React.Dispatch<ActionType>;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * API response wrapper
 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

/**
 * Dropdown item
 */
export interface DropdownItem {
  text: string;
  value?: string;
}

/**
 * Sort option
 */
export type SortOrder =
  | "Default"
  | "Most Recent"
  | "Oldest"
  | "Name (A-Z)"
  | "Name (Z-A)";

/**
 * Status option
 */
export type StatusOption =
  | "All"
  | "Available"
  | "Borrowed"
  | "Active"
  | "Completed"
  | "Upcoming";
