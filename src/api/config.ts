// Backend API Configuration
// Update these values based on your environment
const API_HOST = "lendingequipment-backend.onrender";
const API_PORT = ".com";

// Constructed Backend Base URL
export const API_BASE_URL = `https://${API_HOST}${API_PORT}`;

// Backend Service URLs (relative paths)
const USER_SERVICE_URL = `/user`;
const AUTH_SERVICE_URL = `/auth`;
const VISITOR_SERVICE_URL = `/visitor`;

// Export service URLs for backward compatibility
export const SERVICE_URLS = {
  USER_SERVICE_URL,
  AUTH_SERVICE_URL,
  VISITOR_SERVICE_URL,
} as const;

// Frontend Route Configuration
export const ROUTES = {
  // Public Routes
  HOME: "/",
  LOGIN: "/login",
  FORGOT_PASSWORD: "/forgot-password",
  VISITOR: "/visitor",

  // Student Routes
  STUDENT_DASHBOARD: "/student_dashboard",
  STUDENT_EQUIPMENT: "/student_equipment",
  STUDENT_EQUIPMENT_DETAIL: (id: string | number) => `/student_equipment/${id}`,
  STUDENT_RECORD: "/student_record",
  ACCOUNT: "/account",

  // Course Routes
  MY_COURSE: "/course/my_course",
  MY_COURSE_DETAIL: (id: string | number) => `/course/my_course/${id}`,
  BROWSE_COURSE: "/course/browse_course",
} as const;

// API Endpoints Configuration for backend services
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    VERIFY_SESSION: `${AUTH_SERVICE_URL}/verify-session`,
    LOGIN: `${AUTH_SERVICE_URL}/login`,
    LOGOUT: `${AUTH_SERVICE_URL}/logout`,
    FORGOT_PASSWORD: `${AUTH_SERVICE_URL}/forgot-password`,
  },
  // Equipment endpoints
  EQUIPMENT: {
    GET_ALL: `${VISITOR_SERVICE_URL}/get_equipment`,
    GET_PARTICIPANT: `${USER_SERVICE_URL}/get_participant_equipment`,
    GET_DETAIL: (id: string) =>
      `${USER_SERVICE_URL}/get_participant_equipment_detail/${id}`,
    QUERY: `${USER_SERVICE_URL}/query_participant_equipment`,
    QUERY_VISITOR: `${VISITOR_SERVICE_URL}/query_equipment`,
    GET_SUPERVISOR_BY_EQUIPMENT: (equipmentID: string) =>
      `${USER_SERVICE_URL}/get_supervise_info?equipmentID=${equipmentID}`,
  },
  // Course endpoints
  COURSES: {
    GET_PARTICIPANT: `${USER_SERVICE_URL}/get_participant_courses`,
    GET_DETAIL: (id: string) =>
      `${USER_SERVICE_URL}/get_participant_course_detail/${id}`,
  },
  // User endpoints
  USER: {
    GET_BY_SESSION: `${USER_SERVICE_URL}/get_user_by_session`,
  },
  // Comment endpoints
  COMMENTS: {
    GET_BY_EQUIPMENT: (equipmentId: string) =>
      `/comments/equipment/${equipmentId}`,
    CREATE: "/comments/create",
    UPDATE: (id: string) => `/comments/${id}`,
    DELETE: (id: string) => `/comments/${id}`,
  },
  // Lending Record endpoints
  LENDING_RECORDS: {
    ADD_LENDING_RECORD: `${USER_SERVICE_URL}/add_lending_record`,
    GET_LENDINGS_BY_USER: `${USER_SERVICE_URL}/get_lending_records`,
  },
} as const;

// HTTP Configuration
export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

export const DEFAULT_OPTIONS = {
  credentials: "include" as RequestCredentials,
};

// Export individual parts for flexibility
export {API_HOST, API_PORT};
