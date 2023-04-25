import {styled} from "@mui/material";
import {Input} from "antd";

const { TextArea } = Input;

const InputTextArea = styled(TextArea)`
    .ant-input {
      padding: 12px 16px 12px 12px;
      font-weight: 400;
      font-size: 14px;
      color: #172b4d;
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

export default function AntdTextArea(props) {
  const { name, value, onChange, placeholder, maxLength } = props;
  return (
        <InputTextArea
            showCount
            maxLength={maxLength}
            style={{
              height: 120,
              resize: "none",
            }}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
  );
}