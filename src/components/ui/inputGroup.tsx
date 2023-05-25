import { Label, LabelProps } from "@radix-ui/react-label";
import { Input, InputProps } from "./input";
import { useId } from "react";

export interface InputGroupProps extends InputProps {
  error?: string;
  label?: string;
  labelProps?: LabelProps;
}

export const InputGroup = ({ error, label, id, labelProps, ...props }: InputGroupProps) => {
  const inputId = useId();

  return (
    <div className="flex flex-col w-full gap-1.5">
      {label && (
        <Label htmlFor={inputId} {...labelProps}>
          {label}
        </Label>
      )}
      <Input id={inputId} {...props} />
      {error && <p className="text-sm text-red-500 font-semibold">{error}</p>}
    </div>
  );
};
