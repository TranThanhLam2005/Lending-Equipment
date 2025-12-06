// import libraries
import {useState} from "react";

// import icons
import {Search, Send, Text} from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  search?: boolean;
  inbox?: boolean;
  onSend?: (value: string) => void;
}

function Input({
  className,
  search,
  inbox,
  onSend,
  value: propValue,
  onChange: propOnChange,
  ...props
}: InputProps) {
  const [internalValue, setInternalValue] = useState("");

  // Use controlled value if provided, otherwise use internal state
  const isControlled = propValue !== undefined;
  const value = isControlled ? propValue : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
    if (propOnChange) {
      propOnChange(e);
    }
  };

  const handleSend = () => {
    if (value && typeof value === "string" && value.trim() && onSend) {
      onSend(value);
      if (!isControlled) {
        setInternalValue("");
      }
    }
  };

  return (
    <div className={`w-full`}>
      <div className="flex items-center bg-white border-2 border-gray-200 rounded-lg focus-within:ring-2 focus-within:ring-gray-900 focus-within:border-gray-900 px-4 py-1 transition-all">
        {search && (
          <span className="text-gray-400 hover:text-gray-900 transition-colors">
            <Search className="w-5 h-5 mr-2" />
          </span>
        )}
        {inbox && (
          <span className="text-gray-400 hover:text-gray-900 transition-colors">
            <Text className="w-5 h-5 mr-2" />
          </span>
        )}
        <input
          value={value}
          onChange={handleChange}
          className={`flex-1 py-2 bg-transparent focus:outline-none text-gray-900 placeholder:text-gray-400 ${className}`}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          {...props}
        />
        {inbox && (
          <span
            className="text-gray-400 hover:text-gray-900 transition-colors cursor-pointer"
            onClick={handleSend}
          >
            <Send className="w-5 h-5" />
          </span>
        )}
      </div>
    </div>
  );
}

export default Input;
