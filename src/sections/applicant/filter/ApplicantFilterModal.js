import {memo, useEffect, useState} from "react";
import Scrollbar from "@/components/Scrollbar";
import {Box, Divider, Drawer, IconButton, Stack, Typography} from "@mui/material";
import PropTypes from "prop-types";
import Iconify from "@/components/Iconify";
import {ButtonDS} from "@/components/DesignSystem";
import DynamicFilterForm from "@/sections/dynamic-filter/DynamicFilterForm";
import {useGetOrganizationsDataWithChildQuery} from "@/sections/organization/OrganizationSlice";
import {convertFlatDataToTree} from "@/utils/function";
import * as Yup from "yup";
import {isArray, isEmpty} from 'lodash';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {FormProvider} from "@/components/hook-form";
import {
  useGetAllJobSourcesQuery,
  useGetSkillsQuery,
  useLazyGetAllUserFromOrganizationQuery,
  useLazyGetRecruitmentByOrganizationQuery
} from "@/sections/applicant";
import {LIST_EXPERIENCE_NUMBER, LIST_GENDER, LIST_MARITAL_STATUSES, LIST_STEP_RECRUITMENT} from "@/utils/formatString";
import {
  useGetJobCategoriesQuery,
  useLazyGetDistrictByProvinceIdQuery,
  useLazyGetProvinceQuery
} from "@/sections/companyinfor/companyInforSlice";
import {useRouter} from "next/router";
import {
  ApplicantModalFooterStyle,
  ApplicantModalHeadStyle,
  ButtonCancelStyle,
  HelperTextTypography
} from "@/sections/applicant/style";

ApplicantFilterModal.propTypes = {
  columns: PropTypes.array, isOpen: PropTypes.bool, onClose: PropTypes.func, onSubmit: PropTypes.func,
};

function ApplicantFilterModal({columns, isOpen, onClose, onSubmit}) {

  const router = useRouter();
  const { query } = router;
  const defaultValues = {
    organizationIds: [],                                                        // đơn vị                   select mul
    recruitmentIds: [],                                                         // tin tuyển dụng           select mul
    createdTimeFrom: null,                                                      // ngày ứng tuyển           date from - to
    createdTimeTo: null,
    recruitmentPipelineStates: [],                                              // bước tuyển dụng          select mul
    jobSourceIds: [],                                                           // nguồn                    select mul
    ownerIds: [],                                                               // cán bộ tuyển dụng        select mul
    creatorIds: [],                                                             // người tạo ứng viên       select mul
    councilIds: [],                                                             // hội đồng tuyển dụng      select mul
    jobCategoryIds: [],                                                         // ngành nghề               select mul
    yearsOfExperience: "",                                                    // số năm kinh nghiệm       slect
    applicantSkillIds: [],                                                      // kỹ năng                  select mul
    experience: "",                                                           // kinh nghiệm làm việc     text
    educations: "",                                                           // học vấn                  text
    expectWorkingAddressProvinceIds: [],                                        // nơi làm viêc mong muốn    select mul
    expectSalaryFrom: "",                                                     // mức lương mong muốn      number from - to
    expectSalaryTo: "",
    sexs: "",                                                                 // giới tính                radio
    maritalStatuses: "",                                                      // tình trạng hôn nhân      select
    heightFrom: "",                                                           // chiều cao                number from - to
    heightTo: "",
    weightFrom: "",                                                           // cân nặng                 number from - to
    weightTo: "",
    livingAddressProvinceIds: "",                                               // nơi ở hiện tại           selct province - district
    homeTowerProvinceIds: "",                                                   // quê quán                 select province - district
    livingAddressDistrictIds: "",                                               // nơi ở hiện tại           selct province - district
    homeTowerDistrictIds: "",                                                   // quê quán                 select province - district
  };

  const [, setIsScrolled] = useState(false);

  // yup & handle form
  const ApplicantFormSchema = Yup.object().shape({
    // createdTimeTo: Yup.date().transform(value => (!value ? new Date().toISOString() : value)).min(
    //     Yup.ref('createdTimeFrom'),
    //     "Thời gian kết thúc phải lớn hơn thời gian bắt đầu"
    // ),
    heightTo: Yup.number().transform(value => (isNaN(value) ? undefined : value)).min(Yup.ref('heightFrom'), 'Chiều cao cần lớn hơn hoặc bằng chiều cao bắt đầu'),
    weightTo: Yup.number().transform(value => (isNaN(value) ? undefined : value)).min(Yup.ref('weightFrom'), 'Cân nặng cần lớn hơn hoặc bằng cân nặng bắt đầu'),
    expectSalaryTo: Yup.number().transform(value => (isNaN(value) ? undefined : value)).min(Yup.ref('expectSalaryFrom'), 'Mức lương cần lớn hơn hoặc bằng mức lương bắt đầu'),
  });

  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(ApplicantFormSchema),
    // defaultValues: useMemo(() => defaultValues, [query]),
    defaultValues,
  });

  const {
    watch,
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
    Object.entries(query).forEach(([key, value]) => {
      console.log(key, value)
    })
  }

  const handleScroll = (e) => {
    setIsScrolled(e.target.scrollTop > 10);
  };

  // options select
  // recruitment
  const [getRecruitmentByOrganization, {data: {items: ListRecruitmentByOrganization} = []}] = useLazyGetRecruitmentByOrganizationQuery();
  // organization
  const {data: {items: ListOrganization} = []} = useGetOrganizationsDataWithChildQuery();
  // job sources
  const {data: {items: ListJobSources} = []} = useGetAllJobSourcesQuery();  // nguồn job
  // owner, creator, council
  const [getAllUserFromOrganization, {data: {items: ListUserFromOrganization} = []}] = useLazyGetAllUserFromOrganizationQuery();
  // job category
  const {data: {items: ListJobCategory = []} = {}} = useGetJobCategoriesQuery();
  // skills
  const {data: {items: ListSkills = []} = {}} = useGetSkillsQuery();
  // province
  const [fetchProvice, {data: {items: ListProvince = []} = {}}] = useLazyGetProvinceQuery();
  // district
  const [getDistrictLiving, {data: {items: ListDistrictLiving = []} = {}}] = useLazyGetDistrictByProvinceIdQuery();
  const [getDistrictHomeTower, {data: {items: ListDistrictHomeTower = []} = {}}] = useLazyGetDistrictByProvinceIdQuery();

  const watchProvinceId = watch("livingAddressProvinceIds");
  const watchProvinceHomeTownId = watch("homeTowerProvinceIds");
  const watchOrganizationIds = watch("organizationIds");

  useEffect(() => {
    if (watchProvinceId && !isEmpty(watchProvinceId)) {
      getDistrictLiving(watchProvinceId).unwrap();
      methods.resetField('livingAddressDistrictIds')
    }
  }, [watchProvinceId]);

  useEffect(() => {
    if (watchProvinceHomeTownId && !isEmpty(watchProvinceHomeTownId)) {
      getDistrictHomeTower(watchProvinceHomeTownId).unwrap();
      methods.resetField('homeTowerDistrictIds')
    }
  }, [watchProvinceHomeTownId]);

  useEffect(() => {
    if (watchOrganizationIds && !isEmpty(watchOrganizationIds)) {
      getRecruitmentByOrganization({Id: watchOrganizationIds[watchOrganizationIds.length - 1]}).unwrap();
      getAllUserFromOrganization({Id: watchOrganizationIds[watchOrganizationIds.length - 1]}).unwrap();
    } else {
      getRecruitmentByOrganization().unwrap();
      getAllUserFromOrganization().unwrap();
    }
  }, [watchOrganizationIds])

  useEffect(() => {
    fetchProvice().unwrap();
  }, [])

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
              height: 'calc(100% - 92px - 64px)',
              top: '156px',
              right: 0,
            }, onScroll: handleScroll
          }}
      >
        <Scrollbar sx={{zIndex: 99, "& label": {zIndex: 0}}}>
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
                      organizationIds: convertFlatDataToTree(ListOrganization?.map((item) => ({...item, title: item.name, key: item.id,  value: item.id}))),
                      jobSourceIds: ListJobSources && [...ListJobSources, {id: "", name: "", value: ""}],
                      recruitmentIds: ListRecruitmentByOrganization && [...ListRecruitmentByOrganization, {id: "", name: "", value: ""}],
                      recruitmentPipelineStates: LIST_STEP_RECRUITMENT,
                      ownerIds: ListUserFromOrganization && [...ListUserFromOrganization?.map(i => ({...i, value: i?.id, name: `${i?.lastName} ${i?.firstName}`})), {id: "", value: "", name: ""}],
                      creatorIds: ListUserFromOrganization && [...ListUserFromOrganization?.map(i => ({...i, value: i?.id, name: `${i?.lastName} ${i?.firstName}`})), {id: "", value: "", name: ""}],
                      councilIds: ListUserFromOrganization && [...ListUserFromOrganization?.map(i => ({...i, value: i?.id, name: `${i?.lastName} ${i?.firstName}`})), {id: "", value: "", name: ""}],
                      jobCategoryIds: ListJobCategory && [...ListJobCategory, {id: "", value: "", name: ""}],
                      yearsOfExperience: LIST_EXPERIENCE_NUMBER,
                      applicantSkillIds: ListSkills && [...ListSkills, {id: "", value: "", name: ""}],
                      expectWorkingAddressProvinceIds: ListProvince && [...ListProvince, {id: "", value: "", name: ""}],
                      sexs: LIST_GENDER,
                      maritalStatuses: LIST_MARITAL_STATUSES,
                      livingAddressProvinceIds: ListProvince && [...ListProvince, {id: "", value: "", name: ""}],
                      homeTowerProvinceIds: ListProvince && [...ListProvince, {id: "", value: "", name: ""}],
                      livingAddressDistrictIds: ListDistrictLiving && [...ListDistrictLiving, {id: "", value: "", name: ""}],
                      homeTowerDistrictIds: ListDistrictHomeTower && [...ListDistrictHomeTower, {id: "", value: "", name: ""}]
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
                <ButtonCancelStyle onClick={handleCloseModal}>Bỏ lọc</ButtonCancelStyle>
              </Stack>
            </ApplicantModalFooterStyle>
          </FormProvider>
        </Scrollbar>
      </Drawer>
  );
}

export default memo(ApplicantFilterModal);

