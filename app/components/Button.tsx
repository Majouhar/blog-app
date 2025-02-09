import React from "react";

function Button({
  className,
  onClick,
  label,
  disabled,
}: Readonly<{
  className: string;
  onClick: () => void;
  label: string;
  disabled?: boolean;
}>) {
  return (
    <button
      className={`text-xs md:text-lg px-2 py-1  sm:px-4 sm:py-2 rounded-lg   ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

export default Button;
