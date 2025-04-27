interface Props {
  label: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const FilledButton = ({ label, onClick, className, disabled }: Props) => {
  return (
    <button
      className={`px-12 py-2 rounded-lg transition border 
        ${
          disabled
            ? "bg-gray-100 border-gray-400 cursor-not-allowed"
            : "bg-yellow-400 hover:bg-yellow-100 active:bg-yellow-200 border-black/50 cursor-pointer"
        } 
        ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
export default FilledButton;
