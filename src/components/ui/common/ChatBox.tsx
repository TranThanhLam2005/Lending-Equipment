// import libraries
import {useState, useEffect, useMemo, memo, useRef} from "react";

// import components
import Input from "@/components/ui/common/Input";
import Comment from "@/components/ui/common/Comment";
import {socket} from "@/utils/socket";

interface ChatBoxProps {
  equipmentId: string;
  commentHistory: any[];
  user: {
    ID: string;
    Username: string;
    Name?: string;
    FullName?: string;
    Role?: string;
  };
}

const ChatBox = memo(({equipmentId, commentHistory, user}: ChatBoxProps) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

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

  const [messages, setMessages] = useState<
    {
      content: string;
      groupID: string;
      createAt: string;
      sender?: {
        username: string;
        fullName: string;
        role: string;
      };
    }[]
  >(historyComments);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    socket.connect();

    // Join the equipment-specific room
    socket.emit("join-room", equipmentId);

    // Listen for messages
    socket.on("receive-message", (msg) => {
      return setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Clean up on unmount
    return () => {
      socket.off("receive-message");
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = (msg: string) => {
    if (msg.trim() && user) {
      socket.emit("send-message", {
        content: msg,
        groupID: equipmentId,
        createAt: new Date().toISOString(),
      });

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          content: msg,
          groupID: equipmentId,
          createAt: new Date().toISOString(),
          sender: {
            username: user.Username,
            fullName: user.FullName || user.Name || user.Username,
            role: user.Role || "Student",
          },
        },
      ]);
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Forum Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur-sm p-2 rounded-lg">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm sm:text-base">
                Discussion
              </h3>
              <p className="text-gray-400 text-xs">
                {messages.length}{" "}
                {messages.length === 1 ? "comment" : "comments"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto max-h-[450px] sm:max-h-[550px] bg-gray-50 px-3 sm:px-4 md:px-6 py-4 sm:py-5 space-y-3 sm:space-y-4"
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-16 text-center">
            <div className="bg-gray-100 p-4 rounded-full mb-4">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <p className="text-gray-600 font-medium text-sm sm:text-base mb-1">
              No comments yet
            </p>
            <p className="text-gray-500 text-xs sm:text-sm">
              Start the conversation below
            </p>
          </div>
        ) : (
          messages.map((msg, index) => {
            const isMine = msg.sender?.username === user?.Username;
            return (
              <Comment key={index} message={msg} isMine={isMine} user={user} />
            );
          })
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white px-3 sm:px-4 md:px-6 py-3 sm:py-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-gray-900 text-white w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
            {user?.Name?.charAt(0)?.toUpperCase() ||
              user?.Username?.charAt(0)?.toUpperCase() ||
              "U"}
          </div>
          <span className="text-sm text-gray-600 font-medium">
            Share your thoughts...
          </span>
        </div>
        <Input
          type="text"
          placeholder="Type your comment here..."
          inbox
          onSend={handleSendMessage}
        />
      </div>
    </div>
  );
});

export default ChatBox;
