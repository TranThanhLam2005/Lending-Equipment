/**
 * Headless hook for managing comments
 * Handles comment CRUD operations and state
 */

import {useState, useEffect} from "react";
import {commentService} from "@/api";
import type {Comment} from "@/api";

export interface UseCommentsOptions {
  equipmentId: string;
  initialComments?: Comment[];
}

export interface UseCommentsReturn {
  // Data
  comments: Comment[];
  isLoading: boolean;
  error: string | null;

  // Actions
  addComment: (content: string) => Promise<void>;
  updateComment: (commentId: string, content: string) => Promise<void>;
  deleteComment: (commentId: string) => Promise<void>;
  refreshComments: () => Promise<void>;
}

export const useComments = (options: UseCommentsOptions): UseCommentsReturn => {
  const {equipmentId, initialComments = []} = options;

  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch comments on mount if not provided
  useEffect(() => {
    if (initialComments.length > 0) {
      return;
    }

    refreshComments();
  }, [equipmentId]);

  // Refresh comments
  const refreshComments = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await commentService.getCommentsByEquipment(equipmentId);
      setComments(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch comments");
    } finally {
      setIsLoading(false);
    }
  };

  // Add new comment
  const addComment = async (content: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await commentService.createComment({
        content,
        equipmentId,
      });
      setComments((prev) => [response.data, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add comment");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Update comment
  const updateComment = async (commentId: string, content: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await commentService.updateComment(commentId, {content});
      setComments((prev) =>
        prev.map((comment) =>
          comment.ID === commentId ? response.data : comment
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update comment");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete comment
  const deleteComment = async (commentId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await commentService.deleteComment(commentId);
      setComments((prev) => prev.filter((comment) => comment.ID !== commentId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete comment");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // Data
    comments,
    isLoading,
    error,

    // Actions
    addComment,
    updateComment,
    deleteComment,
    refreshComments,
  };
};
