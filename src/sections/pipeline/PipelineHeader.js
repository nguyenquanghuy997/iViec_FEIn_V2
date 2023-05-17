import { ButtonDS } from "@/components/DesignSystem";
import { View } from "@/components/FlexStyled";
import Iconify from "@/components/Iconify";
import { FormProvider, RHFTextField } from "@/components/hook-form";
import { ButtonFilterStyle } from "@/sections/applicant/style";
import { InputAdornment, Stack } from "@mui/material";
import { useState } from "react";
import { PipelineFormModal } from "./modals";
import {useTheme} from "@mui/material/styles";

const PipelineHeader = ({
  methods,
  onOpenFilterForm,
  onSubmit,
  handleSubmit,
}) => {
  const  theme = useTheme();
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        padding="16px 16px 4px 16px"
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <RHFTextField
              name="searchKey"
              placeholder="Tìm kiếm quy trình tuyển dụng"
              sx={{
                minWidth: "360px",
                height: '36px',
                background: 'rgb(243, 244, 246)',
                borderRadius: '6px',
                '.MuiInput-root': {
                  height: '36px',
                  minHeight: "36px",
                  border: 'none'
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ ml: 0.5, mr:0 }}>
                    <Iconify
                      icon={"eva:search-fill"}
                      sx={{ color: theme.palette.common.borderObject, width: 20, height: 20 }}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </FormProvider>
          <ButtonFilterStyle
            style={{
              height: 36,
              fontWeight: 500
            }}
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
        </View>
        <ButtonDS
          tittle={"Thêm quy trình tuyển dụng"}
          type="submit"
          sx={{
            textTransform: "none",
            boxShadow: "none",
          }}
          onClick={() => setShowForm(true)}
          icon={
            <Iconify
              icon={"material-symbols:add"}
              width={20}
              height={20}
              color={theme.palette.background.paper}
              mr={1}
            />
          }
        />
      </Stack>
      <PipelineFormModal show={showForm} onClose={() => setShowForm(false)} />
    </>
  );
};

export default PipelineHeader;
