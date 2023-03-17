import { Stack, InputLabel } from "@mui/material";
import { Input } from "antd";
import React from "react";
import { Controller } from "react-hook-form";

const { TextArea } = Input;

function OptionComponent({ type }) {
console.log(type == "00001")
  return (
    <Stack sx={{ display: type == "00001" ? "none!important" : "block" }}>
      <Controller
        name="address"
        render={({ field }) => (
          <Stack>
            <InputLabel
              required
              sx={{
                color: "#172B4D",
                fontSize: 14,
                fontWeight: 500,
                mb: 1,
              }}
            >
              Địa điểm phỏng vấn
            </InputLabel>

            <TextArea
              value={field?.value}
              placeholder="Nội dung ..."
              style={{
                height: 80,
                width: "100%",
                resize: "none",
                marginBottom: "20px",
              }}
              onChange={() => {}}
            />
          </Stack>
        )}
      />
    </Stack>
  );
}

export default OptionComponent;
