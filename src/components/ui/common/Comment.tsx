// import libraries
import {memo} from "react";
import {format, parseISO} from "date-fns";

// import types
import type {CommentProps} from "@/types/Type";

// import icons
import {CalendarDays} from "lucide-react";

const Comment = memo(({message, isMine, user}: CommentProps) => {
  const formatCreateAt = format(
    parseISO(message.createAt),
    "MMM dd, yyyy 'at' HH:mm"
  );

  // Generate initials from full name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 animate-fadeIn">
      <div className="p-3 sm:p-4">
        {/* Header with Avatar and User Info */}
        <div className="flex items-start gap-3 mb-3">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                isMine ? "bg-gray-900" : "bg-gray-700"
              } shadow-md`}
            >
              {isMine
                ? getInitials(
                    user?.FullName || user?.Name || user?.Username || "Me"
                  )
                : getInitials(message.sender?.fullName || "U")}
            </div>
          </div>

          {/* User Info and Metadata */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-sm sm:text-base text-gray-900">
                  {isMine
                    ? user?.FullName || user?.Name || user?.Username || "You"
                    : message.sender?.fullName || "Anonymous"}
                </span>
                {isMine && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-gray-900 text-white">
                    You
                  </span>
                )}
                {!isMine && message.sender?.role && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                    {message.sender.role}
                  </span>
                )}
              </div>
            </div>

            {/* Timestamp */}
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <CalendarDays className="w-3.5 h-3.5" />
              <span>{formatCreateAt}</span>
            </div>
          </div>
        </div>

        {/* Message Content */}
        <div className="pl-0 sm:pl-12">
          <div className="bg-gray-50 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-100">
            <p className="text-sm sm:text-base text-gray-800 leading-relaxed break-words whitespace-pre-wrap">
              {message.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});
export default Comment;
