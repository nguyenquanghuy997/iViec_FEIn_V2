import Iconify from "@/components/Iconify";
import { FormProvider, RHFTextField } from "@/components/hook-form";
import { ButtonAddStyle } from "@/sections/emailform/style";
import { Box, InputAdornment, Stack } from "@mui/material";

export default ({ methods, onSubmit, handleSubmit }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px",
          marginTop: "16px",
          borderRadius: "6px",
          border: "1px solid #E7E9ED",
          background: "#FDFDFD",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <RHFTextField
              name="searchKey"
              placeholder="Tìm kiếm nhóm câu hỏi..."
              sx={{
                height: "36px",
                minWidth: "360px",
                "&.MuiInput-root": { height: "36px" },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ ml: 1.5 }}>
                    <Iconify
                      icon={"eva:search-fill"}
                      sx={{ color: "text.disabled", width: 20, height: 20 }}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </FormProvider>
        </Box>
        <Stack flexDirection="row" alignItems="center">
          <ButtonAddStyle
            className="button-add"
            startIcon={<Iconify icon="material-symbols:add" />}
          >
            Thêm nhóm câu hỏi
          </ButtonAddStyle>

          <ButtonAddStyle
            className="button-add"
            startIcon={<Iconify icon="material-symbols:add" />}
            style={{ marginLeft: 16 }}
          >
            Thêm câu hỏi
          </ButtonAddStyle>
        </Stack>
      </Box>
    </>
  );
};
