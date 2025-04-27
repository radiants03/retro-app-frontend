interface Props {
  label: string;
  className?: string;
  type?: "error" | "info" | "default" | "success" | "warning";
}

const Alert = ({ label, className = "", type = "default" }: Props) => {
  const backgroundColors: Record<NonNullable<Props["type"]>, string> = {
    error: "bg-red-200",
    info: "bg-blue-200",
    default: "bg-gray-100",
    success: "bg-green-100",
    warning: "bg-yellow-200",
  };

  const borderColors: Record<NonNullable<Props["type"]>, string> = {
    error: "border-red-300",
    info: "border-blue-300",
    default: "border-gray-200",
    success: "border-green-300",
    warning: "border-yellow-300",
  };

  if (!label) return null;

  return (
    <div
      className={`${backgroundColors[type]} border ${borderColors[type]} px-4 py-2 text-sm rounded w-full ${className}`}
    >
      {label}
    </div>
  );
};

export default Alert;
