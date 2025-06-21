import { Search, Send } from "lucide-react";

function Input({
  className,
  search,
  inbox,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={`w-full`}>
      <div className="flex items-center bg-white border rounded-md focus-within:ring-1 focus-within:ring-gray-300 px-3">
        {search && (
          <span className="text-gray-400 hover:text-gray-600">
            <Search className="w-5 h-5 mr-1" />
          </span>
        )}
        <input
          className={`flex-1 py-2 bg-transparent focus:outline-none ${className}`}
          {...props}
        />
        {inbox && (
          <span className="text-gray-400 hover:text-gray-600">
            <Send className="w-5 h-5" />
          </span>
        )}
      </div>
    </div>
  );
}

export default Input;
