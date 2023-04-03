import { ButtonDS } from "@/components/DesignSystem";
import Iconify from "@/components/Iconify";
import { FormProvider, RHFTextField } from "@/components/hook-form";
import { ButtonFilterStyle } from "@/sections/applicant/style";
import { Box, InputAdornment } from "@mui/material";
import React from "react";

const EvaluationFormHeader = ({
  methods,
  onOpenFilterForm,
  onSubmit,
  handleSubmit,
  onOpenForm,
}) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#FDFDFD",
          padding: "16px",
          borderRadius: "6px",
          marginBottom: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <RHFTextField
              name="searchKey"
              placeholder="Tìm kiếm mẫu đánh giá"
              sx={{
                minWidth: "360px",
                borderRadius: "6px",
                background: "#F2F4F5",
                height: "36px",
                ".MuiInput-root": {
                  height: "36px",
                  minHeight: "36px",
                  border: "none",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ ml: 0.5, mr: 0 }}>
                    <Iconify
                      icon={"eva:search-fill"}
                      sx={{ color: "#5C6A82", width: 20, height: 20 }}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </FormProvider>
          <ButtonFilterStyle
            style={{ height: 36 }}
            onClick={onOpenFilterForm}
            startIcon={
              <Iconify
                sx={{ height: "18px", width: "18px" }}
                icon="material-symbols:filter-alt-outline"
              />
            }
          >
            Bộ lọc
          </ButtonFilterStyle>
        </Box>

        <ButtonDS
          tittle={"Thêm mẫu đánh giá"}
          onClick={(e) => onOpenForm(e,null,"form")}
          icon={
            <Iconify
              icon={"material-symbols:add"}
              width={20}
              height={20}
              color="#fff"
              mr={1}
            />
          }
        />
      </Box>
    </>
  );
};

export default EvaluationFormHeader;
