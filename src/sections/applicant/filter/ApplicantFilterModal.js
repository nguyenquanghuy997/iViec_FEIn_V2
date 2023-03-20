import {memo, useEffect, useMemo, useState} from "react";
import {isEmpty} from "lodash";
import {Box, ClickAwayListener, Divider, IconButton, Stack, Drawer, Typography} from "@mui/material";
import PropTypes from "prop-types";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {alpha, styled} from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Iconify from "@/components/Iconify";
import {ButtonDS} from "@/components/DesignSystem";
import DynamicFilterForm from "@/sections/dynamic-filter/DynamicFilterForm";
import {yupResolver} from "@hookform/resolvers/yup";
import {FormProvider} from "@/components/hook-form";
import {
  ApplicantModalFooterStyle,
  ApplicantModalHeadStyle,
  ButtonCancelStyle,
  HelperTextTypography
} from "@/sections/applicant/style";
import {useDispatch, useSelector} from "@/redux/store";
import {filterSlice} from "@/redux/common/filterSlice";
import {useDebounce} from "@/hooks/useDebounce";
import {useGetOrganizationsDataWithChildQuery} from "@/sections/organization/OrganizationSlice";
import {useGetAllJobSourcesQuery, useGetAllUserFromOrganizationQuery, useGetSkillsQuery,} from "@/sections/applicant";
import {
  useGetDistrictByProvinceIdQuery,
  useGetJobCategoriesQuery,
  useGetProvinceQuery
} from "@/sections/companyinfor/companyInforSlice";
import {LIST_EXPERIENCE_NUMBER, LIST_GENDER, LIST_MARITAL_STATUSES, LIST_STEP_RECRUITMENT} from "@/utils/formatString";
import {useGetRecruitmentByOrganizationIdQuery} from "@/sections/applicant/ApplicantFormSlice";

const GreenSwitch = styled(Switch)(({theme}) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#388E3C",
    "&:hover": {
      backgroundColor: alpha("#A5D6A7", theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#388E3C",
  },
}));

ApplicantFilterModal.propTypes = {
  columns: PropTypes.array, isOpen: PropTypes.bool, onClose: PropTypes.func, onSubmit: PropTypes.func,
};

const defaultValues = {
  organizationIds: [],                                                        // đơn vị                   select mul            // 1
  recruitmentIds: [],                                                         // tin tuyển dụng           select mul            // 1
  createdTimeFrom: null,                                                      // ngày ứng tuyển           date from - to        // 1
  createdTimeTo: null,                                                                                                          // 1
  recruitmentPipelineStates: [],                                              // bước tuyển dụng          select mul            // 1
  jobSourceIds: [],                                                           // nguồn                    select mul            // 1
  ownerIds: [],                                                               // cán bộ tuyển dụng        select mul            // 1
  creatorIds: [],                                                             // người tạo ứng viên       select mul            // 1
  councilIds: [],                                                             // hội đồng tuyển dụng      select mul            // 1
  jobCategoryIds: [],                                                         // ngành nghề               select mul            // 1
  yearsOfExperience: "",                                                    // số năm kinh nghiệm         select                // 1
  applicantSkillIds: [],                                                      // kỹ năng                  select mul            // 1
  experience: "",                                                           // kinh nghiệm làm việc     text                    // 1
  educations: "",                                                           // học vấn                  text                    // 1
  expectWorkingAddressProvinceIds: [],                                        // nơi làm viêc mong muốn    select mul           // 1
  expectSalaryFrom: "",                                                     // mức lương mong muốn      number from - to        // 1
  expectSalaryTo: "",                                                                                                           // 1
  sexs: "",                                                                 // giới tính                radio                   // 1
  maritalStatuses: "",                                                      // tình trạng hôn nhân      select                  // 1
  heightFrom: "",                                                           // chiều cao                number from - to        // 1
  heightTo: "",                                                                                                                 // 1
  weightFrom: "",                                                           // cân nặng                 number from - to        // 1
  weightTo: "",                                                                                                                 // 1
  livingAddressProvinceIds: "",                                               // nơi ở hiện tại           selct province - district   // 1
  homeTowerProvinceIds: "",                                                   // quê quán                 select province - district  // 1
  livingAddressDistrictIds: "",                                               // nơi ở hiện tại           selct province - district   // 1
  homeTowerDistrictIds: "",                                                   // quê quán                 select province - district  // 1
};

function ApplicantFilterModal({columns, isOpen, onClose, onSubmit}) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);

  const dataFilter = useSelector((state) => state.filterReducer.data);

  const handleSetDataFilter = (data) => dispatch(filterSlice.actions.setDataFilter(data));

  // yup & handle form
  const ApplicantFormSchema = Yup.object().shape({
    heightFrom: Yup.number().transform(value => (isNaN(value) ? undefined : value)),
    heightTo: Yup.number().transform(value => (isNaN(value) ? undefined : value)).min(Yup.ref('heightFrom'), 'Chiều cao cần lớn hơn hoặc bằng chiều cao bắt đầu'),
    weightFrom: Yup.number().transform(value => (isNaN(value) ? undefined : value)),
    weightTo: Yup.number().transform(value => (isNaN(value) ? undefined : value)).min(Yup.ref('weightFrom'), 'Cân nặng cần lớn hơn hoặc bằng cân nặng bắt đầu'),
    expectSalaryTo: Yup.number().transform(value => (isNaN(value) ? undefined : value)).min(Yup.ref('expectSalaryFrom'), 'Mức lương cần lớn hơn hoặc bằng mức lương bắt đầu'),
    sexs: Yup.number().transform(value => (isNaN(value) ? undefined : value)),
  });
  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(ApplicantFormSchema),
    defaultValues: useMemo(
        () => ({ ...defaultValues, ...dataFilter }),
        [dataFilter]
    )
  });
  const {watch, handleSubmit, formState: {isSubmitting}} = methods;
  const watchProvinceId = watch("livingAddressProvinceIds");
  const watchProvinceHomeTownId = watch("homeTowerProvinceIds");
  const watchOrganizationIds = watch("organizationIds");

  // organization & recruitment & pipeline & jobsource
  const watchRecruitment = watch("recruitmentIds");
  const watchPipeLine = watch("recruitmentPipelineStates");
  const watchJobSource = watch("jobSourceIds");

  // date
  const watchCreatedTimeFrom = watch('createdTimeFrom');
  const watchCreatedTimeTo = watch('createdTimeTo');

  // user
  const watchOwnerIds = watch("ownerIds");
  const watchCreatorIds = watch("creatorIds");
  const watchCouncilIds = watch("councilIds");

  // other
  const watchYearsOfExperience = watch('yearsOfExperience');
  const watchExpectWorkingAddressProvinceIds = watch('expectWorkingAddressProvinceIds');
  const watchApplicantSkillIds = watch('applicantSkillIds');
  const watchMaritalStatuses = watch('maritalStatuses');
  const watchSexs = watch('sexs');

  // address
  const watchlivingAddressProvinceIds = watch('livingAddressProvinceIds');
  const watchhomeTowerProvinceIds = watch('homeTowerProvinceIds');
  const watchlivingAddressDistrictIds = watch('livingAddressDistrictIds');
  const watchhomeTowerDistrictIds = watch('homeTowerDistrictIds');


  // weight & height & education & experience
  const watchHeightFrom = watch("heightFrom");
  const watchHeightFromDebounce = useDebounce(watchHeightFrom, 500);
  const watchHeightTo = watch("heightTo");
  const watchHeightToDebounce = useDebounce(watchHeightTo, 500);
  const watchWeightFrom = watch("weightFrom");
  const watchWeightFromDebounce = useDebounce(watchWeightFrom, 500);
  const watchWeightTo = watch("weightTo");
  const watchWeightToDebounce = useDebounce(watchWeightTo, 500);
  const watchEducations = watch("educations");
  const watchEducationsToDebounce = useDebounce(watchEducations, 500);
  const watchExperience = watch("experience");
  const watchExperienceToDebounce = useDebounce(watchExperience, 500);
  const watchExpectSalaryFrom = watch("expectSalaryFrom");
  const watchExpectSalaryFromDebounce = useDebounce(watchExpectSalaryFrom, 500);
  const watchExpectSalaryTo = watch("expectSalaryTo");
  const watchExpectSalaryToDebounce = useDebounce(watchExpectSalaryTo, 500);

  const handleCloseModal = () => dispatch(filterSlice.actions.clearDataFilter());

  const {data: {items: ListOrganization = []} = {}, isLoading: isLoadingOrganization} = useGetOrganizationsDataWithChildQuery();
  const {data: {items: ListJobSources = []} = {}, isLoading: isLoadingJobSource} = useGetAllJobSourcesQuery();  // nguồn job
  const {data: {items: ListJobCategory = []} = {}, isLoading: isLoadingJobCategory} = useGetJobCategoriesQuery();
  const {data: {items: ListSkills = []} = {}, isLoading: isLoadingSkill} = useGetSkillsQuery();
  const {data: {items: ListProvince = []} = {}, isLoading: isLoadingProvince} = useGetProvinceQuery();
  const {data: {items: ListDistrictLiving = []} = {}} = useGetDistrictByProvinceIdQuery(watchProvinceId, {skip: isEmpty(watchProvinceId)});
  const {data: {items: ListDistrictHomeTower = []} = {}} = useGetDistrictByProvinceIdQuery(watchProvinceHomeTownId, {skip: isEmpty(watchProvinceHomeTownId)});
  const {data: ListUserFromOrganization = [], isLoading: isLoadingUser} = useGetAllUserFromOrganizationQuery();
  const {data: {items: ListRecruitmentByOrganization = [] } = {}, isLoading: isLoadingRecruitment} = useGetRecruitmentByOrganizationIdQuery();

  useEffect(() => {
    if (checked) {
      // select
      !isEmpty(watchOrganizationIds) ? handleSetDataFilter({key: 'organizationIds', value: watchOrganizationIds}) : handleSetDataFilter({key: 'organizationIds', value: []});
      !isEmpty(watchRecruitment) ? handleSetDataFilter({key: 'recruitmentIds', value: watchRecruitment}) : handleSetDataFilter({key: 'recruitmentIds', value: []});
      !isEmpty(watchPipeLine) ? handleSetDataFilter({key: 'recruitmentPipelineStates', value: watchPipeLine?.map((pipe) => Number(pipe))}) : handleSetDataFilter({key: 'recruitmentPipelineStates', value: []});
      !isEmpty(watchJobSource) ? handleSetDataFilter({key: 'jobSourceIds', value: watchJobSource}) : handleSetDataFilter({key: 'jobSourceIds', value: []});
      !isEmpty(watchOwnerIds) ? handleSetDataFilter({key: 'ownerIds', value: watchOwnerIds}) : handleSetDataFilter({key: 'ownerIds', value: []});
      !isEmpty(watchCreatorIds) ? handleSetDataFilter({key: 'creatorIds', value: watchCreatorIds}) : handleSetDataFilter({key: 'creatorIds', value: []});
      !isEmpty(watchCouncilIds) ? handleSetDataFilter({key: 'councilIds', value: watchCouncilIds}) : handleSetDataFilter({key: 'councilIds', value: []});
      // date
      watchCreatedTimeFrom ? handleSetDataFilter({key: 'createdTimeFrom', value: new Date(watchCreatedTimeFrom).toISOString()}) : handleSetDataFilter({key: 'createdTimeFrom', value: null});
      watchCreatedTimeTo ? handleSetDataFilter({key: 'createdTimeTo', value: new Date(watchCreatedTimeTo).toISOString()}) : handleSetDataFilter({key: 'createdTimeTo', value: null});
      // other
      !isEmpty(watchExpectWorkingAddressProvinceIds) ? handleSetDataFilter({key: 'expectWorkingAddressProvinceIds', value: watchExpectWorkingAddressProvinceIds}) : handleSetDataFilter({key: 'expectWorkingAddressProvinceIds', value: []});
      !isEmpty(watchApplicantSkillIds) ? handleSetDataFilter({key: 'applicantSkillIds', value: watchApplicantSkillIds}) : handleSetDataFilter({key: 'applicantSkillIds', value: []});
      !isEmpty(watchYearsOfExperience) ? handleSetDataFilter({key: 'yearsOfExperience', value: [Number(watchYearsOfExperience)]}) : handleSetDataFilter({key: 'yearsOfExperience', value: ""});
      !isEmpty(watchMaritalStatuses) ? handleSetDataFilter({key: 'maritalStatuses', value: [Number(watchMaritalStatuses)]}) : handleSetDataFilter({key: 'maritalStatuses', value: ""});
      !isEmpty(watchSexs) ? handleSetDataFilter({key: 'sexs', value: [Number(watchSexs)]}) : handleSetDataFilter({key: 'sexs', value: ""});
      // address
      !isEmpty(watchlivingAddressProvinceIds) ? handleSetDataFilter({key: 'livingAddressProvinceIds', value: [watchlivingAddressProvinceIds]}) : handleSetDataFilter({key: 'livingAddressProvinceIds', value: ""});
      !isEmpty(watchlivingAddressDistrictIds) ? handleSetDataFilter({key: 'livingAddressDistrictIds', value: [watchlivingAddressDistrictIds]}) : handleSetDataFilter({key: 'livingAddressDistrictIds', value: ""});
      !isEmpty(watchhomeTowerProvinceIds) ? handleSetDataFilter({key: 'homeTowerProvinceIds', value: [watchhomeTowerProvinceIds]}) : handleSetDataFilter({key: 'homeTowerProvinceIds', value: ""});
      !isEmpty(watchhomeTowerDistrictIds) ? handleSetDataFilter({key: 'homeTowerDistrictIds', value: [watchhomeTowerDistrictIds]}) : handleSetDataFilter({key: 'homeTowerDistrictIds', value: ""});
      // input
      watchHeightFromDebounce ? handleSetDataFilter({key: 'heightFrom', value: Number(watchHeightFromDebounce)}) : handleSetDataFilter({key: 'heightFrom', value: ""});
      watchHeightToDebounce ? handleSetDataFilter({key: 'heightTo', value: Number(watchHeightToDebounce)}) : handleSetDataFilter({key: 'heightTo', value: ""});
      watchWeightFromDebounce ? handleSetDataFilter({key: 'weightFrom', value: Number(watchWeightFromDebounce)}) : handleSetDataFilter({key: 'weightFrom', value: ""});
      watchWeightToDebounce ? handleSetDataFilter({key: 'weightTo', value: Number(watchWeightToDebounce)}) : handleSetDataFilter({key: 'weightTo', value: ""});
      watchEducationsToDebounce ? handleSetDataFilter({key: 'educations', value: watchEducationsToDebounce}) : handleSetDataFilter({key: 'educations', value: ""});
      watchExperienceToDebounce ? handleSetDataFilter({key: 'experience', value: watchExperienceToDebounce}) : handleSetDataFilter({key: 'experience', value: ""});
      watchExpectSalaryFromDebounce ? handleSetDataFilter({key: 'expectSalaryFrom', value: watchExpectSalaryFromDebounce}) : handleSetDataFilter({key: 'expectSalaryFrom', value: ""});
      watchExpectSalaryToDebounce ? handleSetDataFilter({key: 'expectSalaryTo', value: watchExpectSalaryToDebounce}) : handleSetDataFilter({key: 'expectSalaryTo', value: ""});
    }
      }, [
        checked,
        watchOrganizationIds, watchRecruitment, watchPipeLine, watchJobSource,
        watchCreatedTimeFrom, watchCreatedTimeTo,
        watchExpectWorkingAddressProvinceIds, watchApplicantSkillIds, watchYearsOfExperience, watchMaritalStatuses, watchSexs,
        watchlivingAddressProvinceIds, watchlivingAddressDistrictIds, watchhomeTowerProvinceIds, watchhomeTowerDistrictIds,
        watchOwnerIds, watchCreatorIds, watchCouncilIds,
        watchHeightFromDebounce, watchHeightToDebounce, watchWeightFromDebounce, watchWeightToDebounce, watchEducationsToDebounce, watchExperienceToDebounce, watchExpectSalaryToDebounce, watchExpectSalaryFromDebounce,
      ]
  )

  useEffect(() => {
    if (watchProvinceId) {
      methods.resetField('livingAddressDistrictIds')
    }
  }, [watchProvinceId]);

  useEffect(() => {
    if (watchProvinceHomeTownId) {
      methods.resetField('homeTowerDistrictIds')
    }
  }, [watchProvinceHomeTownId]);


  if (isLoadingOrganization || isLoadingJobSource || isLoadingJobCategory || isLoadingSkill || isLoadingProvince || isLoadingUser || isLoadingRecruitment) return null;

  return (
      <ClickAwayListener
          mouseEvent="onMouseDown"
          touchEvent="onTouchStart"
          onClickAway={() => isOpen && onClose()}
      >
        <Drawer
            open={true}
            onClose={onClose}
            anchor="right"
            variant="persistent"
            PaperProps={{
              sx: {
                width: {xs: 1, sm: 560, md: 400},
                boxShadow: '-3px 0px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)',
                zIndex: 999,
                position: 'fixed',
                height: 'calc(100% - 92px - 64px - 1px)',
                top: '157px',
                right: 0,
                "::-webkit-scrollbar": {
                  display: 'none'
                }
              }
            }}
        >
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <ApplicantModalHeadStyle>
              <Typography variant="body1" sx={{fontSize: '20px', fontWeight: 600, color: "#455570"}}>
                Bộ lọc
              </Typography>
              <IconButton size="small" onClick={onClose} sx={{ mr: -1 }}>
                <Iconify icon="ic:baseline-close"/>
              </IconButton>
            </ApplicantModalHeadStyle>
            <Divider/>
            <Box sx={{py: 2, mt: 0}}>
              <HelperTextTypography variant="body2">Để thêm/bớt bộ lọc, vui lòng chọn cài đặt quản lý cột ở bảng dữ
                liệu</HelperTextTypography>
              <Stack sx={{pb: 3, px: 2}}>
                <DynamicFilterForm
                    columns={columns}
                    disabled={{
                      livingAddressDistrictIds: !watchlivingAddressProvinceIds,
                      homeTowerDistrictIds: !watchhomeTowerProvinceIds,
                    }}
                    options={{
                      organizationIds: ListOrganization,
                      jobSourceIds: ListJobSources,
                      recruitmentIds: ListRecruitmentByOrganization,
                      recruitmentPipelineStates: LIST_STEP_RECRUITMENT,
                      ownerIds: ListUserFromOrganization,
                      creatorIds: ListUserFromOrganization,
                      councilIds: ListUserFromOrganization,
                      jobCategoryIds: ListJobCategory,
                      yearsOfExperience: LIST_EXPERIENCE_NUMBER,
                      applicantSkillIds: ListSkills,
                      expectWorkingAddressProvinceIds: ListProvince,
                      sexs: LIST_GENDER,
                      maritalStatuses: LIST_MARITAL_STATUSES,
                      livingAddressProvinceIds: ListProvince,
                      homeTowerProvinceIds: ListProvince,
                      livingAddressDistrictIds: ListDistrictLiving,
                      homeTowerDistrictIds: ListDistrictHomeTower
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
              <FormControlLabel
                  // sx={{...style}}
                  label="Tự động"
                  control={
                    <GreenSwitch
                        checked={checked}
                        onChange={(e) => setChecked(e.target.checked)}
                        inputProps={{"aria-label": "controlled"}}
                    />
                  }
              />
            </ApplicantModalFooterStyle>
          </FormProvider>
        </Drawer>
      </ClickAwayListener>
  );
}

export default memo(ApplicantFilterModal);

