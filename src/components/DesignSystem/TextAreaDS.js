import { FormHelperText, FormLabel, styled } from "@mui/material";
import { Input } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

export default function TextAreaDS(props) {
  const { name, placeholder, maxLength, ...other} = props;
  const { TextArea } = Input;

  const InputTextArea = styled(TextArea)(({ maxLength }) => ({
    ".ant-input": {
    padding: "12px 16px",
    fontWeight: 400,
    fontSize: "14px",
    color: "#172b4d",
    fontFamily: "Inter",
    border: '1px solid #D0D4DB'
    },
    ".ant-input:hover": {
      borderColor: "#a2aab7",
      borderInlineEndWidth: "1.5px",
    },
    ".ant-input::placeholder": {
      color: "#A2AAB7",
      fontWeight: 400,
      fontSize: "14px",
    },
    ".ant-input:focus": {
      borderColor: "#1976d2",
      borderInlineEndWidth: "1.5px",
      boxShadow: "unset",
    },
    ".ant-input::-webkit-scrollbar": {
      width: "4px",
    },
    ".ant-input::-webkit-scrollbar-thumb": {
      background: "#b9bfc9",
      borderRadius: "30px",
    },
    ".ant-input-data-count":{
      display:maxLength ?'':'none'
    }
  }));
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <FormLabel>
            <InputTextArea
              showCount
              maxLength={maxLength}
              style={{
                height: 120,
                resize: "none",
              }}
              value={field.value}
              onChange={field.onChange}
              placeholder={placeholder}
              {...other}
            />
          </FormLabel>

          {error && (
            <FormHelperText error sx={{ px: 2 }}>
              {error?.message}
            </FormHelperText>
          )}
        </>
      )}
    />
  );
}

TextAreaDS.prototype = {
  name: PropTypes.string,
  placeholder: PropTypes.any,
  maxLength: PropTypes.any,
};
