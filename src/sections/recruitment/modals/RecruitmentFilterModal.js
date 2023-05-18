import {memo, useEffect, useState} from "react";
import Scrollbar from "@/components/Scrollbar";
import {Box, Drawer, IconButton, Stack, Typography} from "@mui/material";
import PropTypes from "prop-types";
import Iconify from "@/components/Iconify";
import {ButtonDS} from "@/components/DesignSystem";
// import DynamicFilterForm from "@/sections/dynamic-filter/DynamicFilterForm";
import {isArray} from 'lodash';
import {useForm} from "react-hook-form";
import {FormProvider} from "@/components/hook-form";
// import {LIST_STATUS} from "@/utils/formatString";

import {useRouter} from "next/router";
import {
  FilterModalFooterStyle,
  FilterModalHeadStyle,
  ButtonCancelStyle,
  HelperTextTypography
} from "@/sections/applicant/style";
import DynamicFilterForm from "@/components/dynamic-filter/DynamicFilterForm";
import {useTheme} from "@mui/material/styles";



RecruitmentFilterModal.propTypes = {
  columns: PropTypes.array, isOpen: PropTypes.bool, onClose: PropTypes.func, onSubmit: PropTypes.func,
};

function RecruitmentFilterModal({ columns, isOpen, onClose, onSubmit}) {
  const  theme = useTheme();
  const router = useRouter();
  const { query } = router;
  const defaultValues = {
    isActive: "",                                                               // Trạng thái         select
    createdTimeFrom: null,                                                      // ngày tạo           date from - to
    createdTimeTo: null,
    creatorIds: [],                                                             // người tạo          select mul
  };

  const [, setIsScrolled] = useState(false);



  const methods = useForm({
    mode: 'all',
    // defaultValues: useMemo(() => defaultValues, [query]),
    defaultValues,
  });

  const {
    // watch,
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
    }, undefined, { shallow: true })
  }

  const handleScroll = (e) => {
    setIsScrolled(e.target.scrollTop > 10);
  };

  // options select
  // owner, creator, council
  // const [getAllUserFromOrganization, {data: {items: ListUserFromOrganization} = []}] = useLazyGetApplicantUsersOnJobtypeQuery();

  // const watchOrganizationIds = watch("organizationIds");



  // useEffect(() => {
  //   if (watchOrganizationIds && !isEmpty(watchOrganizationIds)) {
  //     getAllUserFromOrganization({Id: watchOrganizationIds[watchOrganizationIds.length - 1]}).unwrap();
  //   } else {
  //     getAllUserFromOrganization().unwrap();
  //   }
  // }, [watchOrganizationIds])


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
              height: 'calc(100% - 156px)',
              top: '156px',
              right: 0,
            }, onScroll: handleScroll
          }}
      >
        <Scrollbar sx={{zIndex: 9999, "& label": {zIndex: 0}}}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <FilterModalHeadStyle>
              <Typography variant="body1" sx={{fontSize: '20px', fontWeight: 600, color: theme.palette.common.neutral700}}>
                Bộ lọc
              </Typography>
              <IconButton size="small" onClick={onClose}>
                <Iconify icon="ic:baseline-close"/>
              </IconButton>
            </FilterModalHeadStyle>
            <Box sx={{py: 2, mt: 0}}>
              <HelperTextTypography variant="body2">Để thêm/bớt bộ lọc, vui lòng chọn cài đặt quản lý cột ở bảng dữ liệu</HelperTextTypography>
              <Stack sx={{pb: 3, px: 2}}>
                 <DynamicFilterForm
                    columns={columns}
                   
                /> 
                {/* <DynamicFilterForm
                    columns={columns}
                    options={{
                      creatorIds: ListUserFromOrganization && [...ListUserFromOrganization?.map(i => ({...i, value: i?.id, name: `${i?.email}`, item: `${i?.lastName} ${i?.firstName}`})), {id: "", value: "", name: "", item: ""}],
                      isActive: LIST_STATUS,
                    }}
                /> */}
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
                <ButtonCancelStyle onClick={handleCloseModal}>Bỏ lọc</ButtonCancelStyle>
              </Stack>
            </FilterModalFooterStyle>
          </FormProvider>
        </Scrollbar>
      </Drawer>
  );
}

export default memo(RecruitmentFilterModal);

