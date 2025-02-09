import React from "react";

function FormInput({
  className,
  id,
  value,
  onChange,
  type,
  label,
  placeholder,
}: Readonly<{
  className?: string;
  id: string;
  type?: React.HTMLInputTypeAttribute;
  value?: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
}>) {
  return (
    <div className={className ?? ""}>
      <label
        htmlFor={id}
        className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 lg:text-base"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full text-xs sm:text-sm px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base lg:py-3"
      />
    </div>
  );
}

export default FormInput;
