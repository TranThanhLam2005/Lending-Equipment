/**
 * useChatBox Hook
 * Manages chat functionality including socket connections, messages, and send operations
 */

import {useState, useEffect, useMemo, useRef} from "react";
import {socket} from "@/utils/socket";
import type {
  UseChatBoxOptions,
  UseChatBoxReturn,
  ChatMessage,
} from "@/types/Type";

export const useChatBox = ({
  equipmentId,
  commentHistory,
  user,
}: UseChatBoxOptions): UseChatBoxReturn => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Transform comment history to chat messages
  const historyComments = useMemo(() => {
    return commentHistory.map((comment) => ({
      content: comment.content,
      groupID: equipmentId,
      createAt: comment.createAt,
      sender: {
        username: comment.userName,
        fullName: comment.fullName,
        role: comment.role,
      },
    }));
  }, [commentHistory, equipmentId]);

  const [messages, setMessages] = useState<ChatMessage[]>(historyComments);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Socket connection and event listeners
  useEffect(() => {
    socket.connect();

    // Join the equipment-specific room
    socket.emit("join-room", equipmentId);

    // Listen for messages
    socket.on("receive-message", (msg: ChatMessage) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Clean up on unmount
    return () => {
      socket.off("receive-message");
      socket.disconnect();
    };
  }, [equipmentId]);

  // Send message handler
  const handleSendMessage = (msg: string) => {
    if (msg.trim() && user) {
      const newMessage: ChatMessage = {
        content: msg,
        groupID: equipmentId,
        createAt: new Date().toISOString(),
        sender: {
          username: user.Username,
          fullName: user.FullName || user.Name || user.Username,
          role: user.Role || "Student",
        },
      };

      socket.emit("send-message", {
        content: msg,
        groupID: equipmentId,
        createAt: new Date().toISOString(),
      });

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
  };

  return {
    messages,
    messagesContainerRef,
    handleSendMessage,
  };
};
