import PipelineDrawer from "./PipeLineDrawer";
import Iconify from "@/components/Iconify";
import SvgIcon from "@/components/SvgIcon";
import { FormProvider, RHFTextField } from "@/components/hook-form";
import { ButtonFilterStyle } from "@/sections/applicant/style";
import { InputAdornment, Stack, Button } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";

const PipelineHeader = ({
  methods,
  onOpenFilterForm,
  onSubmit,
  handleSubmit,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container
      sx={{
        background: "white",
        p: 2,
        transform: "translateY(43px)",
      }}
    >
      <Stack flexDirection="row">
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <RHFTextField
            name="searchKey"
            placeholder="Tìm kiếm quy trình tuyển dụng"
            sx={{ minWidth: "510px" }}
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

        <ButtonFilterStyle
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

        <Button
          style={{
            padding: "8px 12px 8px 14px",
            marginLeft: "16px",
            display: "flex",
            justifyContent: "end",
            borderRadius: 4,
            background: "#1976D2",
            textDecoration: "none",
          }}
          onClick={handleOpen}
        >
          <SvgIcon>
            {`
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.16669 9.16667V4.16667H10.8334V9.16667H15.8334V10.8333H10.8334V15.8333H9.16669V10.8333H4.16669V9.16667H9.16669Z" fill="#FDFDFD"/>
        </svg>
          `}
          </SvgIcon>

          <span
            style={{
              fontSize: 15,
              fontWeight: "600",
              lineHeight: 20 / 15,
              marginLeft: 8,
              color: "white",
            }}
          >
            {"Thêm vai trò"}
          </span>
        </Button>
      </Stack>

      <PipelineDrawer open={open} onClose={handleClose} onOpen={handleOpen} />
      {/* <PipelineFormModal show={showForm} setShow={setShowForm} /> */}
    </Container>
  );
};

export default PipelineHeader;
