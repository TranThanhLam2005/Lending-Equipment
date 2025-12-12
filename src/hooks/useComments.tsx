/**
 * Headless hook for managing comments
 * Handles comment CRUD operations and state
 */

import {useState, useEffect} from "react";
import {commentService} from "@/api";
import type {
  Comment,
  UseCommentsOptions,
  UseCommentsReturn,
} from "@/types/Type";

export type {UseCommentsOptions, UseCommentsReturn};

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

  // // Update comment
  // const updateComment = async (commentId: string, content: string) => {
  //   setIsLoading(true);
  //   setError(null);

  //   try {
  //     const response = await commentService.updateComment(commentId, {content});
  //     setComments((prev) =>
  //       prev.map((comment) =>
  //         comment.ID === commentId ? response.data : comment
  //       )
  //     );
  //   } catch (err) {
  //     setError(err instanceof Error ? err.message : "Failed to update comment");
  //     throw err;
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // // Delete comment
  // const deleteComment = async (commentId: string) => {
  //   setIsLoading(true);
  //   setError(null);

  //   try {
  //     await commentService.deleteComment(commentId);
  //     setComments((prev) => prev.filter((comment) => comment.ID !== commentId));
  //   } catch (err) {
  //     setError(err instanceof Error ? err.message : "Failed to delete comment");
  //     throw err;
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return {
    // Data
    comments,
    isLoading,
    error,

    // Actions
    addComment,
    // updateComment,
    // deleteComment,
    refreshComments,
  };
};
