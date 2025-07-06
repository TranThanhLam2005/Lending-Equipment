// import libraries
import { useState } from 'react';

// import icons
import { Search, Send, Text } from "lucide-react";

function Input({
  className,
  search,
  inbox,
  onSend,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  const [value, setValue] = useState('');

  const handleSend = () => {
    if (value.trim() && onSend) {
      onSend(value);
      setValue('');
    }
  };
  return (
    <div className={`w-full`}>
      <div className="flex items-center bg-white border rounded-md focus-within:ring-1 focus-within:ring-gray-300 px-3">
        {search && (
          <span className="text-gray-400 hover:text-gray-600">
            <Search className="w-5 h-5 mr-1" />
          </span>
        )}
        {inbox && (
          <span className="text-gray-400 hover:text-gray-600">
            <Text className="w-5 h-5 mr-1" />
          </span>
        )}
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={`flex-1 py-2 bg-transparent focus:outline-none ${className}`}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          {...props}
        />
        {inbox && (
          <span className="text-gray-400 hover:text-gray-600"  onClick={handleSend}>
            <Send className="w-5 h-5" />
          </span>
        )}
      </div>
    </div>
  );
}

export default Input;
