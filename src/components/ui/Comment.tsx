// import libraries
import {memo} from "react";
import {format, parseISO} from "date-fns";

// import icons
import {CalendarDays} from "lucide-react";

interface CommentProps {
  message: {
    content: string;
    createAt: string;
    sender?: {
      fullName: string;
      username: string;
      role: string;
    };
  };
  isMine: boolean;
}

const Comment = memo(({message, isMine}: CommentProps) => {
  const formatCreateAt = format(parseISO(message.createAt), "EEEE, HH:mm:ss");
  return (
    <div>
      {!isMine && (
        <div className="flex items-center gap-3">
          <img
            className="w-10 h-10 rounded-full"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg/250px-Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg"
          />
          <div>
            <div className="font-semibold text-gray-800">
              {message.sender?.fullName}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <CalendarDays className="inline mr-1 w-4 h-4" />
              {formatCreateAt}
            </div>
          </div>
        </div>
      )}
      <div
        className={`flex items-center ${
          isMine ? "justify-end" : "justify-start"
        }`}
      >
        <span
          className={` text-sm p-2 rounded-full ${
            isMine ? "bg-red-500 text-white" : "bg-gray-200 mt-2"
          } `}
        >
          {message.content}
        </span>
      </div>

      {isMine && (
        <div className="text-sm text-gray-500 text-right mt-1">
          {formatCreateAt}
        </div>
      )}
    </div>
  );
});
export default Comment;
