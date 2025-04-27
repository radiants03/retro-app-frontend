import { useState, useEffect } from "react";

interface Props {
  label: string;
  onChange?: (value: boolean) => void;
  className?: string;
  disabled?: boolean;
  value?: boolean;
}

const Switch = ({
  label,
  onChange,
  className = "",
  disabled = false,
  value,
}: Props) => {
  const [enabled, setEnabled] = useState(value);

  useEffect(() => {
    setEnabled(value);
  }, [value]);

  const handleToggle = () => {
    if (disabled) return;
    const newValue = !enabled;
    setEnabled(newValue);
    onChange?.(newValue);
  };

  return (
    <div
      className={`flex items-center space-x-3 mb-3 justify-between ${className}`}
    >
      {label && <span className="text-gray-700">{label}</span>}
      <button
        onClick={handleToggle}
        disabled={disabled}
        className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
          enabled ? "bg-yellow-500" : "bg-gray-300"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
            enabled ? "translate-x-6" : ""
          }`}
        />
      </button>
    </div>
  );
};

export default Switch;
