import {memo, useEffect} from "react";
import Scrollbar from "@/components/Scrollbar";
import {Box, Divider, Drawer, IconButton, Stack, Typography} from "@mui/material";
import Iconify from "@/components/Iconify";
import {ButtonDS} from "@/components/DesignSystem";
import DynamicFilterForm from "@/sections/dynamic-filter/DynamicFilterForm";
import * as Yup from "yup";
import {isArray} from 'lodash';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {FormProvider} from "@/components/hook-form";
import {LIST_STATUS} from "@/utils/formatString";
import {useRouter} from "next/router";
import {
  ApplicantModalFooterStyle,
  ApplicantModalHeadStyle,
  ButtonCancelStyle,
  HelperTextTypography
} from "@/sections/applicant/style";

function OrganizationUserFilterModal({columns, isOpen, onClose, onSubmit}) {

  const router = useRouter();
  const { query } = router;
  const defaultValues = {
    isActive: "",
  };
  // yup & handle form
  const ApplicantFormSchema = Yup.object().shape({
    // createdTimeTo: Yup.date().transform(value => (!value ? new Date().toISOString() : value)).min(
    //     Yup.ref('createdTimeFrom'),
    //     "Thời gian kết thúc phải lớn hơn thời gian bắt đầu"
    // ),
  });

  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(ApplicantFormSchema),
    defaultValues,
  });

  const { handleSubmit, setValue, formState: {isSubmitting} } = methods;

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
    }, undefined, { shallow: true })
    Object.entries(query).forEach(([key, value]) => {
      console.log(key, value)
    })
  }

  // options select

  return (
      <Drawer
          open={isOpen}
          onClose={onClose}
          anchor="right"
          variant="persistent"
          PaperProps={{
            sx: {
              width: {xs: 1, sm: 560, md: 384},
              boxShadow: '-3px 0px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)',
              zIndex: 999,
              position: 'fixed',
              height: 'calc(100% - 64px)',
              top: '64px',
              right: 0,
            }
          }}
      >
        <Scrollbar sx={{zIndex: 9999, "& label": {zIndex: 0}}}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <ApplicantModalHeadStyle>
              <Typography variant="body1" sx={{fontSize: '20px', fontWeight: 600, color: "#455570"}}>
                Bộ lọc
              </Typography>
              <IconButton size="small" onClick={onClose}>
                <Iconify icon="ic:baseline-close"/>
              </IconButton>
            </ApplicantModalHeadStyle>
            <Divider/>
            <Box sx={{py: 2, mt: 0}}>
              <HelperTextTypography variant="body2">Để thêm/bớt bộ lọc, vui lòng chọn cài đặt quản lý cột ở bảng dữ liệu</HelperTextTypography>
              <Stack sx={{pb: 3, px: 2}}>
                <DynamicFilterForm
                    columns={columns}
                    options={{
                      isActive: LIST_STATUS,
                    }}
                />

              </Stack>
            </Box>

            <Divider/>
            <ApplicantModalFooterStyle>
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
            </ApplicantModalFooterStyle>
          </FormProvider>
        </Scrollbar>
      </Drawer>
  );
}

export default memo(OrganizationUserFilterModal);

