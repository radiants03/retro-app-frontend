import { useEffect, useRef } from "react";

interface Props {
  id?: string;
  name?: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  textType?: "board" | "card" | "comment";
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

const CardInput = ({
  id,
  name,
  className,
  placeholder,
  required,
  value,
  textType,
  onBlur,
  onChange,
  onKeyUp,
}: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
    onChange?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <textarea
      id={id}
      name={name}
      ref={textareaRef}
      placeholder={placeholder}
      onBlur={onBlur}
      onChange={handleInput}
      onKeyUp={onKeyUp}
      onKeyDown={handleKeyDown}
      autoComplete="off"
      value={value}
      className={`border-0 outline-0 resize-none overflow-hidden w-full ${className} ${
        textType === "board"
          ? "text-4xl"
          : textType === "card"
          ? "text-2xl"
          : textType === "comment"
          ? "text-lg"
          : "text-base"
      }`}
      required={required}
    />
  );
};

export default CardInput;
