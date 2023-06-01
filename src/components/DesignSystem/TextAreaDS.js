import HelperText from "@/components/BaseComponents/HelperText";
import { FormLabel, styled } from "@mui/material";
import { Input } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const {TextArea} = Input;
const InputTextArea = styled(TextArea)(({theme}) => ({
  padding: "12px 16px 12px 12px",
  fontFamily: 'Inter',
  fontWeight: 400,
  fontSize: "14px",
  color: theme.palette.common.neutral800,
  ":focus": {
    borderColor: theme.palette.common.blue700,
    borderInlineEndWidth: "1.5px",
    boxShadow: "unset"
  },
  ":hover": {
    borderColor: theme.palette.common.neutral400,
  },
  "::placeholder": {
    color: theme.palette.common.neutral400,
  },
  ".::-webkit-scrollbar": {
    width: "4px",
  },
  "::-webkit-scrollbar-thumb": {
    background: theme.palette.common.neutral300,
    borderRadius: "30px"
  },
}));

export default function TextAreaDS(props) {
  const {name, placeholder, maxLength, height = 120, ...other} = props;
  const {control} = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState: {error}}) => (
        <>
          <FormLabel>
            <InputTextArea
              // showCount
              maxLength={maxLength}
              style={{
                height: height,
              }}
              value={field.value}
              onChange={field.onChange}
              placeholder={placeholder}
              {...other}
            />
          </FormLabel>
          {error && <HelperText errorText={error?.message}/>}
        </>
      )}
    />
  );
}

TextAreaDS.prototype = {
  name: PropTypes.string,
  placeholder: PropTypes.any,
  maxLength: PropTypes.any,
  height: PropTypes.number,
};
