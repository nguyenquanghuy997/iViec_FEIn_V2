import React, { memo } from "react";
import { Box, Divider, Drawer, IconButton, Stack, Typography } from "@mui/material";
import Iconify from "@/components/Iconify";
import { ButtonDS } from "@/components/DesignSystem";
import DynamicFilterForm from "@/components/dynamic-filter/DynamicFilterForm";
import { FormProvider } from "@/components/hook-form";
import { useRouter } from "next/router";
import {
  ButtonCancelStyle,
  FilterModalFooterStyle,
  FilterModalHeadStyle,
  HelperTextTypography
} from "@/sections/applicant/style";
import { fDate } from "@/utils/formatTime";
import { LIST_STATUS } from "@/utils/formatString";
import { useGetAllUserFromOrganizationQuery } from "@/sections/applicant";
import { toRequestFilterData } from "@/utils/helper";

const columns = [
  {
    type: "date",
    label: "Ngày tạo",
    name: "createdTime",
    render: (date) => fDate(date),
    items: [
      {
        name: "createdTimeFrom",
        type: "date",
        placeholder: "Chọn ngày",
        startIcon: <span>Từ</span>,
        endIcon: <Iconify icon="material-symbols:calendar-today"/>,
      },
      {
        name: "createdTimeTo",
        type: "date",
        placeholder: "Chọn ngày",
        startIcon: <span>Đến</span>,
        endIcon: <Iconify icon="material-symbols:calendar-today"/>,
      },
    ],
  },
  {
    name: "creatorIds",
    label: "Người tạo",
    placeholder: "Chọn 1 hoặc nhiều người",
    type: "select",
    multiple: true,
  },
  {
    name: "isActive",
    type: "select",
    label: "Trạng thái",
    placeholder: "Chọn trạng thái",
  }
]

function OfferFormFilterModal({methods, isOpen, handleOpen, onSubmit}) {
  const router = useRouter();
  const {data: {items: ListUserFromOrganization = []} = {}} = useGetAllUserFromOrganizationQuery();

  const {
    handleSubmit,
    reset,
    formState: {isSubmitting},
  } = methods;
  
  const handleCloseModal = async () => {
    handleOpen(false);
    await router.push({
      pathname: router.pathname,
      query: {}
    }, undefined, {shallow: true});
    reset();
  }
  
  const handleValue = (values) => {
    onSubmit(toRequestFilterData(values));
  }
  
  return (
    <Drawer
      open={isOpen}
      onClose={() => handleOpen(false)}
      anchor="right"
      PaperProps={{
        sx: {
          width: {xs: 1, sm: 560, md: 384},
          boxShadow: '-3px 0px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)',
        }
      }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(handleValue)}>
        <FilterModalHeadStyle>
          <Typography variant="body1" sx={{fontSize: '20px', fontWeight: 600, color: "#455570"}}>
            Bộ lọc
          </Typography>
          <IconButton size="small" onClick={() => handleOpen(false)}>
            <Iconify icon="ic:baseline-close"/>
          </IconButton>
        </FilterModalHeadStyle>
        <Divider/>
        <Box sx={{py: 2, mt: 0}}>
          <HelperTextTypography variant="body2">Để thêm/bớt bộ lọc, vui lòng chọn cài đặt quản lý cột ở bảng dữ
            liệu</HelperTextTypography>
          <Stack sx={{pb: 3, px: 2}}>
            <DynamicFilterForm
              columns={columns}
              options={{
                isActive: LIST_STATUS,
                creatorIds: ListUserFromOrganization,
              }}
            />
          
          </Stack>
        </Box>
        <FilterModalFooterStyle>
          <Stack flexDirection="row">
            <ButtonDS
              type="submit"
              loading={isSubmitting}
              variant="contained"
              tittle="Áp dụng"
              onClick={handleSubmit(handleValue)}
            />
            <ButtonCancelStyle onClick={handleCloseModal}>Hủy</ButtonCancelStyle>
          </Stack>
        </FilterModalFooterStyle>
      </FormProvider>
    </Drawer>
  );
}

export default memo(OfferFormFilterModal);

