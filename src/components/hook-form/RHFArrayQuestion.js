import RHFTextField from "./RHFTextField";
import { IconPlus, IconSubstract } from "@/assets/icons";
import { alphabetPosition } from "@/utils/help";
import {
  IconButton,
  RadioGroup,
  Stack,
  Radio,
  FormControlLabel,
} from "@mui/material";
import React, { useCallback } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

export default function RHFArrayQuestion({ name }) {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: name,
  });

  const addNewQuestion = useCallback(() => {
    append({
      content: "",
      isCorrect: false,
    });
  }, []);

  const removeQuestion = useCallback((index) => {
    remove(index);
  }, []);

  return (
    <Controller
      name="answers"
      control={control}
      render={() => {
        return (
          <RadioGroup {...fields?.map((item) => item?.id)}>
            {fields?.map((item, index) => (
              <Stack
                key={item?.id}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
                sx={{ marginBottom: 4 }}
                bgcolor="#F2F4F5"
                p={2}
              >
                <FormControlLabel
                  key={item.id}
                  value={item.id}
                  control={<Radio />}
                  label={alphabetPosition(index) + ")"}
                />
                <RHFTextField
                  name={`${name}.${index}.content`}
                  fullWidth
                  placeholder="Nhập nội dung..."
                />
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignIIconButton
                  tems="center"
                  spacing={2}
                >
                  <IconButton
                    aria-label="add"
                    color="primary"
                    onClick={addNewQuestion}
                  >
                    <IconPlus />
                  </IconButton>
                  {index !== 0 && (
                    <IconButton
                      aria-label="remove"
                      color="primary"
                      onClick={() => removeQuestion(index)}
                    >
                      <IconSubstract />
                    </IconButton>
                  )}
                </Stack>
              </Stack>
            ))}
          </RadioGroup>
        );
      }}
    ></Controller>
  );
}
