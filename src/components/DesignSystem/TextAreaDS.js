import { FormLabel, styled, Typography } from "@mui/material";
import { Input } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { boolean } from "yup";

export default function TextAreaDS(props) {
  const { tittle, isRequired, placeholder, maxLength } = props;
  const { TextArea } = Input;
  const InputTextArea = styled(TextArea)`
    .ant-input {
      padding: 12px 16px 12px 12px;
      font-weight: 500;
      font-size: 14px;
      color: #172B4D;
    }
    .ant-input:hover {
      border-color: #a2aab7;
      border-inline-end-width: 1.5px;
    }
    .ant-input:placeholder {
      color: #8a94a5;
    }
    .ant-input:focus {
      border-color: #1976d2;
      border-inline-end-width: 1.5px;
      box-shadow: unset;
    }
    .ant-input::-webkit-scrollbar {
      width: 4px;
    }
    .ant-input::-webkit-scrollbar-thumb {
      background: #b9bfc9;
      border-radius: 30px;
    }
  `;

  return (
    <FormLabel>
      <Typography fontWeight={"600"} color="#5C6A82" mt="24px" mb="8px">
        {tittle} {isRequired ? <span style={{ color: "#E53935" }}>*</span> : ""}
      </Typography>
      <InputTextArea
        showCount
        maxLength={maxLength}
        style={{
          height: 120,
          resize: "none",
          "& :where(.css-dev-only-do-not-override-diro6f).ant-input:hover": {
            backgroundColor: "#000",
          },
        }}
        onChange={(e) => e.target.value}
        placeholder={placeholder}
      />
    </FormLabel>
  );
}

TextAreaDS.prototype = {
  tittle: PropTypes.any,
  isRequired: boolean,
  placeholder: PropTypes.any,
  maxLength: PropTypes.any,
};
