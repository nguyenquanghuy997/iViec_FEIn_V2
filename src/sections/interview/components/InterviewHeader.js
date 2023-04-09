import HeadingBar from "../../../components/heading-bar/HeadingBar";
import { AddIcon } from "@/assets/ActionIcon";
import { FilterIcon } from "@/assets/FilterIcon";
import { SearchIcon } from "@/assets/SearchIcon";
import MuiButton from "@/components/BaseComponents/MuiButton";
import { FormProvider, RHFTextField } from "@/components/hook-form";
import { PERMISSIONS } from "@/config";
import useRole from "@/hooks/useRole";
import { BoxFlex } from "@/sections/emailform/style";
import { InputAdornment, Stack } from "@mui/material";
import { useMemo } from "react";

const InterviewHeader = ({
  methods,
  handleOpen,
  onOpenFilterForm,
  onSubmit,
  handleSubmit,
}) => {
  const { canAccess } = useRole();
  const canEdit = useMemo(() => canAccess(PERMISSIONS.CRUD_INTV_SCHE), []);

  return (
    <HeadingBar sx={{ mb: "28px", position: "fixed", top: 8 }}>
      <BoxFlex>
        <Stack flexDirection="row" alignItems="center">
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <RHFTextField
              name="searchKey"
              placeholder="Tìm kiếm lịch phỏng vấn..."
              sx={{
                minWidth: "510px",
                background: "#F2F4F5",
                borderRadius: "6px",
                mb:1,
                ".MuiInput-root": {
                  border: "none",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ ml: 1.5 }}>
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </FormProvider>
          <MuiButton
            title="Bộ lọc"
            color="default"
            onClick={onOpenFilterForm}
            startIcon={<FilterIcon />}
            sx={{ fontWeight: 600, ml: 2,mb:1 }}
          />
        </Stack>
        <Stack flexDirection={"row"} mb={1}>
          {
            canEdit && <MuiButton
              title="Đặt lịch phỏng vấn"
              startIcon={<AddIcon />}
              onClick={handleOpen}
            />
          }
        </Stack>
      </BoxFlex>
    </HeadingBar>
  );
};

export default InterviewHeader;
