import { Search, Send } from "lucide-react"

function Input({
    className,
    search,
    inbox,
    ...props
  }: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
      <div>
        <div className="relative">
          {search && (
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" />
          )}
          <input
            className={`w-full py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white ${
              search ? 'pl-10' : 'pl-4'
            } ${inbox ? 'pr-10' : 'pr-4'} ${className}`}
            {...props}
          />
          {inbox && (
            <Send className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" />
          )}
        </div>
      </div>
    );
  }
  

export default Input;