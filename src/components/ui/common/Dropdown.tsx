interface DropdownProps<
  T extends string | number | readonly string[] | undefined
> {
  placeholder: string;
  items: {text: string}[];
  valueSetter: React.Dispatch<React.SetStateAction<T>> | ((value: T) => void);
  value: T;
}

function Dropdown<T extends string | number | readonly string[] | undefined>({
  placeholder,
  items,
  valueSetter,
  value,
}: DropdownProps<T>) {
  return (
    <div>
      <select
        value={value}
        onChange={(e) => {
          const newValue = e.target.value as T;
          if (typeof valueSetter === "function") {
            valueSetter(newValue);
          }
        }}
        className="w-full rounded-lg border-2 border-gray-200 shadow-sm px-4 py-2.5 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all cursor-pointer hover:border-gray-400"
      >
        <option value="" disabled className="text-gray-400">
          {placeholder}
        </option>
        {items.map((item, idx) => (
          <option key={idx} value={item.text} className="text-gray-900">
            {item.text}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
