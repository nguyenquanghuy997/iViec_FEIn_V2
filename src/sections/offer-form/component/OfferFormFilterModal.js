import React, {memo, useEffect} from "react";
import {Box, Divider, Drawer, IconButton, Stack, Typography} from "@mui/material";
import Iconify from "@/components/Iconify";
import {ButtonDS} from "@/components/DesignSystem";
import DynamicFilterForm from "@/components/dynamic-filter/DynamicFilterForm";
import {isArray} from 'lodash';
import {useForm} from "react-hook-form";
import {FormProvider} from "@/components/hook-form";
import {useRouter} from "next/router";
import {
  FilterModalFooterStyle,
  FilterModalHeadStyle,
  ButtonCancelStyle,
  HelperTextTypography
} from "@/sections/applicant/style";
import {fDate} from "@/utils/formatTime";
import {LIST_STATUS} from "@/utils/formatString";
import {useGetAllUserFromOrganizationQuery} from "@/sections/applicant";

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
        endIcon: <Iconify icon="material-symbols:calendar-today" />,
      },
      {
        name: "createdTimeTo",
        type: "date",
        placeholder: "Chọn ngày",
        startIcon: <span>Đến</span>,
        endIcon: <Iconify icon="material-symbols:calendar-today" />,
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

const defaultValues = {
  createdTimeFrom: null,                                                      // ngày ứng tuyển           date from - to
  createdTimeTo: null,
  creatorIds: [],                                                             // người tạo ứng viên       select mul
  isActive: "",
};

function OfferFormFilterModal({isOpen, onClose, onSubmit}) {

  const router = useRouter();
  const {query} = router;

  const {data: {items: ListUserFromOrganization = []} = {}} = useGetAllUserFromOrganizationQuery();

  const methods = useForm({
    mode: 'all',
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    formState: {isSubmitting},
  } = methods;

  useEffect(() => {
    for (let item in query) {
      if (query[item]) {
        if (isArray(defaultValues[item]))
          setValue(item, isArray(query[item]) ? query[item] : [query[item]])
        else setValue(item, query[item])
      } else setValue(item, defaultValues[item])
    }
  }, [query])

  const handleCloseModal = async () => {
    onClose();
    await router.push({
      pathname: router.pathname,
      query: {}
    }, undefined, {shallow: true})
  }


  return (
      <Drawer
          open={isOpen}
          onClose={onClose}
          anchor="right"
          PaperProps={{
            sx: {
              width: {xs: 1, sm: 560, md: 384},
              boxShadow: '-3px 0px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)',
            }
          }}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <FilterModalHeadStyle>
            <Typography variant="body1" sx={{fontSize: '20px', fontWeight: 600, color: "#455570"}}>
              Bộ lọc
            </Typography>
            <IconButton size="small" onClick={onClose}>
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
                  onClick={handleSubmit(onSubmit)}
              />
              <ButtonCancelStyle onClick={handleCloseModal}>Hủy</ButtonCancelStyle>
            </Stack>
          </FilterModalFooterStyle>
        </FormProvider>
      </Drawer>
  );
}

export default memo(OfferFormFilterModal);

