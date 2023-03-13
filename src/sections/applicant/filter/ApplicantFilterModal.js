import {memo, useEffect} from "react";
import Scrollbar from "@/components/Scrollbar";
import {Box, Divider, Drawer, IconButton, Stack, Typography} from "@mui/material";
import PropTypes from "prop-types";
import Iconify from "@/components/Iconify";
import {ButtonDS} from "@/components/DesignSystem";
import DynamicFilterForm from "@/sections/dynamic-filter/DynamicFilterForm";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {FormProvider} from "@/components/hook-form";
import {LIST_EXPERIENCE_NUMBER, LIST_GENDER, LIST_MARITAL_STATUSES, LIST_STEP_RECRUITMENT} from "@/utils/formatString";
import {
  ApplicantModalFooterStyle,
  ApplicantModalHeadStyle,
  ButtonCancelStyle,
  HelperTextTypography
} from "@/sections/applicant/style";
import {useDispatch, useSelector} from "@/redux/store";
import {filterSlice} from "@/redux/common/filterSlice";

ApplicantFilterModal.propTypes = {
  columns: PropTypes.array, isOpen: PropTypes.bool, onClose: PropTypes.func, onSubmit: PropTypes.func,
};

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

function ApplicantFilterModal({columns, isOpen, onClose, onSubmit}) {
  const dispatch = useDispatch();

  const dataFilter = useSelector((state) => state.filterReducer.data);

  console.log(dataFilter)

  // yup & handle form
  const ApplicantFormSchema = Yup.object().shape({
    heightTo: Yup.number().transform(value => (isNaN(value) ? undefined : value)).min(Yup.ref('heightFrom'), 'Chiều cao cần lớn hơn hoặc bằng chiều cao bắt đầu'),
    weightTo: Yup.number().transform(value => (isNaN(value) ? undefined : value)).min(Yup.ref('weightFrom'), 'Cân nặng cần lớn hơn hoặc bằng cân nặng bắt đầu'),
    expectSalaryTo: Yup.number().transform(value => (isNaN(value) ? undefined : value)).min(Yup.ref('expectSalaryFrom'), 'Mức lương cần lớn hơn hoặc bằng mức lương bắt đầu'),
  });

  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(ApplicantFormSchema),
    defaultValues: { ...defaultValues, ...dataFilter },
  });

  const {watch, handleSubmit, formState: {isSubmitting}} = methods;

  const watchProvinceId = watch("livingAddressProvinceIds");
  const watchProvinceHomeTownId = watch("homeTowerProvinceIds");
  // const watchOrganizationIds = watch("organizationIds");

  const handleCloseModal = (data) => dispatch(filterSlice.actions.clearDataFilter(data));

  // options select
  // organization
  // const {data: {items: ListOrganization} = []} = useGetOrganizationsDataWithChildQuery();
  // job sources
  // const {data: {items: ListJobSources} = []} = useGetAllJobSourcesQuery();  // nguồn job
  // job category
  // const {data: {items: ListJobCategory = []} = {}} = useGetJobCategoriesQuery();
  // skills
  // const {data: {items: ListSkills = []} = {}} = useGetSkillsQuery();
  // province
  // const {data: {items: ListProvince = []} = {}} = useGetProvinceQuery();

  // console.log(watchProvinceId)

  // const {data: {items: ListDistrictLiving = []} = {}} = useGetDistrictByProvinceIdQuery(watchProvinceId, { skip: !watchProvinceId });
  // const {data: {items: ListDistrictHomeTower = []} = {}} = useGetDistrictByProvinceIdQuery(watchProvinceHomeTownId, { skip: !watchProvinceHomeTownId });

  // owner, creator, council
  // const {data: {items: ListUserFromOrganization} = []} = useGetAllUserFromOrganizationQuery({Id: watchOrganizationIds[0]});
  // recruitment
  // const {data: {items: ListRecruitmentByOrganization} = []} = useGetRecruitmentByOrganizationQuery({Id: watchOrganizationIds[0]});

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

  return (
      <Drawer
          open={isOpen}
          onClose={onClose}
          anchor="right"
          variant="temporary"
          hideBackdrop
          PaperProps={{
            sx: {
              width: {xs: 1, sm: 560, md: 384},
              boxShadow: '-3px 0px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)',
              zIndex: 999,
              position: 'fixed',
              height: 'calc(100% - 92px - 64px - 1px)',
              top: '157px',
              right: 0,
            }
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
                      // organizationIds: convertFlatDataToTree(ListOrganization?.map((item) => ({...item, title: item.name, key: item.id,  value: item.id}))),
                      // jobSourceIds: ListJobSources,
                      // recruitmentIds: ListRecruitmentByOrganization,
                      recruitmentPipelineStates: LIST_STEP_RECRUITMENT,
                      // ownerIds: ListUserFromOrganization && ListUserFromOrganization?.map(i => ({...i, value: i?.id, name: `${i?.lastName} ${i?.firstName}`})),
                      // creatorIds: ListUserFromOrganization && ListUserFromOrganization?.map(i => ({...i, value: i?.id, name: `${i?.lastName} ${i?.firstName}`})),
                      // councilIds: ListUserFromOrganization && ListUserFromOrganization?.map(i => ({...i, value: i?.id, name: `${i?.lastName} ${i?.firstName}`})),
                      // jobCategoryIds: ListJobCategory,
                      yearsOfExperience: LIST_EXPERIENCE_NUMBER,
                      // applicantSkillIds: ListSkills,
                      // expectWorkingAddressProvinceIds: ListProvince,
                      sexs: LIST_GENDER,
                      maritalStatuses: LIST_MARITAL_STATUSES,
                      // livingAddressProvinceIds: ListProvince,
                      // homeTowerProvinceIds: ListProvince,
                      // livingAddressDistrictIds: ListDistrictLiving,
                      // homeTowerDistrictIds: ListDistrictHomeTower
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

export default memo(ApplicantFilterModal);

