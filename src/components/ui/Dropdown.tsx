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
        className=" w-full rounded-md shadow-sm px-4 py-2 bg-white"
      >
        <option value="" disabled className="text-gray-500">
          {placeholder}
        </option>
        {items.map((item, idx) => (
          <option key={idx} value={item.text}>
            {item.text}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
