import Iconify from "@/components/Iconify";
import { FormProvider, RHFTextField } from "@/components/hook-form";
import { ButtonFilterStyle } from "@/sections/applicant/style";
import { Box, InputAdornment, Stack } from "@mui/material";
import React from "react";
import { ButtonAddStyle } from "@/sections/emailform/style";
import useRole from "@/hooks/useRole";
import { useMemo } from "react";
import { PERMISSIONS } from "@/config";

const OfferFormFilterHeader = ({ methods, onOpenFilterForm, onSubmit, handleSubmit, onOpenForm }) => {

  const { canAccess } = useRole();
  const canEdit = useMemo(() => canAccess(PERMISSIONS.CRUD_OFFER_TPL), []);

  return (
    <>
      <Box sx={{
        display: 'flex',
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: '#FDFDFD',
        padding: '16px',
        marginBottom: 3
      }}>
        <Box sx={{ display: 'flex', alignItems: "center" }}>
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
        {
          canEdit && <Stack flexDirection="row" alignItems="center">
            <ButtonAddStyle
              className="button-add"
              startIcon={<Iconify icon="material-symbols:add" />}
              onClick={() => onOpenForm(null)}
            >Thêm mẫu email</ButtonAddStyle>
          </Stack>
        }
      </Box>
    </>
  );
};

export default OfferFormFilterHeader;
