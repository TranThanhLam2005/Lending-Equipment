// Export all services
export * from "./client";
export * from "./config";
export * from "./auth.service";
export * from "./equipment.service";
export * from "./course.service";
export * from "./user.service";
export * from "./comment.service";
export * from "./lending.service";

// Re-export types from central type definition
export type {
  Equipment,
  Course,
  User,
  Comment,
  LendingRecord,
  LoginCredentials,
  AuthResponse,
  CreateCommentData,
  UpdateCommentData,
  EquipmentQueryParams,
} from "@/types/Type";
