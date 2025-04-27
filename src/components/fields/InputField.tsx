interface Props {
  id?: string;
  type?: "text" | "email" | "password";
  name?: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const InputField = ({
  id,
  type,
  name,
  className,
  placeholder,
  required,
  onBlur,
  onChange,
  disabled,
}: Props) => {
  return (
    <input
      id={id}
      type={type || "text"}
      name={name}
      placeholder={placeholder}
      onBlur={onBlur}
      onChange={onChange}
      className={`border-1 border-black/15 rounded px-5 py-2 outline-yellow-400 ${className}`}
      required={required}
      disabled={disabled}
    />
  );
};
export default InputField;
