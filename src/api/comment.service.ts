import {apiClient} from "./client";
import {API_ENDPOINTS} from "./config";

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

export interface CreateCommentData {
  content: string;
  equipmentId: string;
}

export interface UpdateCommentData {
  content: string;
}

export const commentService = {
  /**
   * Get comments by equipment ID
   */
  async getCommentsByEquipment(equipmentId: string) {
    return apiClient.get<Comment[]>(
      API_ENDPOINTS.COMMENTS.GET_BY_EQUIPMENT(equipmentId)
    );
  },

  /**
   * Create a new comment
   */
  async createComment(data: CreateCommentData) {
    return apiClient.post<Comment>(API_ENDPOINTS.COMMENTS.CREATE, data);
  },

  /**
   * Update a comment
   */
  async updateComment(id: string, data: UpdateCommentData) {
    return apiClient.put<Comment>(API_ENDPOINTS.COMMENTS.UPDATE(id), data);
  },

  /**
   * Delete a comment
   */
  async deleteComment(id: string) {
    return apiClient.delete(API_ENDPOINTS.COMMENTS.DELETE(id));
  },
};
