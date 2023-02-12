import { RHFTextField } from "@/components/hook-form";
import React from "react";

const InputFilter = ({ name, placeholder, type, ...props }) => {
  return (
    <RHFTextField
      name={name}
      placeholder={placeholder || ""}
      type={type}
      {...props}
    />
  );
};

export default InputFilter;
