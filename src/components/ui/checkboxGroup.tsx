import type { CheckboxProps } from "@radix-ui/react-checkbox";
import { Checkbox } from "./checkbox";
import { Label, LabelProps } from "@radix-ui/react-label";
import { useId } from "react";

interface Props extends CheckboxProps {
  label?: string;
  labelProps?: LabelProps;
}

export const CheckboxGroup = ({ label, id, labelProps, ...props }: Props) => {
  const checkboxId = useId();

  return (
    <div className="flex items-center gap-2">
      <Checkbox id={checkboxId} {...props} />
      {label && (
        <Label htmlFor={checkboxId} {...labelProps}>
          {label}
        </Label>
      )}
    </div>
  );
};
