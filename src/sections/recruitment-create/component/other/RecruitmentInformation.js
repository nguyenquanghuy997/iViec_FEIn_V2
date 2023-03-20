import {Box, InputAdornment} from "@mui/material";
import {BoxInnerStyle, BoxWrapperStyle} from "@/sections/recruitment-create/style";
import DividerCard from "@/sections/recruitment-create/component/DividerCard";
import RightNoteText from "@/sections/recruitment-create/component/RightNoteText";
import {RHFAutocomplete, RHFTextField} from "@/components/hook-form";
import RHFDropdown from "@/components/hook-form/RHFDropdown";
import DateFilter from "@/sections/dynamic-filter/DateFilter";
import {LabelStyle} from "@/components/hook-form/style";
import {useGetOrganizationsDataWithChildQuery} from "@/sections/organization/OrganizationSlice";
import {useGetJobCategoriesQuery, useGetProvinceQuery} from "@/sections/companyinfor/companyInforSlice";
import {useGetAllJobTypeQuery} from "@/sections/jobtype";
import {
  LIST_CURRENCY_TYPE,
  LIST_EXPERIENCE_NUMBER,
  LIST_GENDER,
  LIST_RECRUITMENT_SALARY_DISPLAY_TYPE,
  LIST_RECRUITMENT_WORKING_FORM
} from "@/utils/formatString";
import {useGetListCandidateLevelsQuery, useGetListLanguagesQuery} from "@/redux/slice/masterDataSlice";
import InputNumberFormatFilter from "@/sections/dynamic-filter/InputNumberFormatFilter";
import {useGetAllUserFromOrganizationQuery} from "@/sections/applicant";
import OrganizationSelect from "@/sections/recruitment-create/component/form/OrganizationSelect";
import RHFDropdownMultiple from "@/sections/recruitment-create/component/form/RHFDropdownMultiple";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import('@/sections/recruitment-create/component/editor/RHFEditor'), {
  ssr: false,
});

const RecruitmentInformation = ({organizationId, salaryDisplayType}) => {
  const {data: {items: ListOrganization = []} = {}, isLoading: loadingOrganization} = useGetOrganizationsDataWithChildQuery();
  const {data: {items: JobCategoryList = []} = {}, isLoading: loadingCategory} = useGetJobCategoriesQuery();
  const {data: {items: ListProvince = []} = {}, isLoading: loadingProvince} = useGetProvinceQuery();
  const {data: ListCandidateLevels = [], isLoading: loadingCadidateLevel} = useGetListCandidateLevelsQuery();
  const {data: {items: ListJobType = []} = {}, isLoading: loadingJobType} = useGetAllJobTypeQuery();
  const {data: ListLanguage = [], isLoading: loadingLanguage} = useGetListLanguagesQuery();
  const {data: ListUserFromOrganization = [], isLoading: loadingUser} = useGetAllUserFromOrganizationQuery({Id: organizationId});

  if(loadingOrganization || loadingCategory || loadingProvince || loadingCadidateLevel || loadingJobType || loadingLanguage || loadingUser) return null;

  return (
      <BoxWrapperStyle className="wrapper">
        {/* THÔNG TIN CHUNG */}
        <Box className="box-item" sx={{width: '100%', backgroundColor: 'transparent', display: 'flex',}}>
          <BoxInnerStyle>
            <DividerCard title="THÔNG TIN CHUNG" sx={{borderTopRightRadius: '6px', borderTopLeftRadius: '6px'}}/>
            <Box sx={{px: 4, py: 3}}>
              {/* Tiêu đề tin tuyển dụng */}
              <Box sx={{mb: 2}}>
                <RHFTextField
                    name="name"
                    title="Tiêu đề tin tuyển dụng"
                    placeholder="Nhập tiêu đề tin hiển thị tại trang việc làm..."
                    isRequired
                    fullWidth
                />
              </Box>
              {/* Khu vực đăng tin */}
              <Box sx={{mb: 2}}>
                <RHFDropdownMultiple
                    options={ListProvince.map(i => ({
                      value: i.id,
                      label: i.name,
                      name: i.name,
                    }))}
                    name="recruitmentAddressIds"
                    title="Khu vực đăng tin"
                    placeholder="Chọn tối đa 3 khu vực"
                    fullWidth
                    multiple
                    isRequired
                />
              </Box>
              {/* Đơn vị & Chức danh */}
              <Box sx={{mb: 2, display: 'flex', justifyContent: 'space-between'}}>
                <div style={{flex: 1, marginRight: 8}}>
                  <OrganizationSelect
                      name="organizationId"
                      title="Đơn vị"
                      placeholder="Chọn 1 đơn vị"
                      options={ListOrganization}
                      isRequired
                      // defaultValue={OrganizationOfUser.id}
                  />
                </div>
                <div style={{flex: 1, marginLeft: 8}}>
                  <RHFDropdown
                      options={ListCandidateLevels}
                      name="candidateLevelId"
                      title="Chức danh"
                      placeholder="Chọn 1 chức danh"
                      isRequired
                      fullWidth
                  />
                </div>
              </Box>
              {/* Địa điểm làm việc */}
              <Box sx={{mb: 2}}>
                <RHFTextField
                    name="address"
                    title="Địa điểm làm việc"
                    placeholder="Ví dụ: Tầng 15, Tòa nhà FPT, Số 10 Phạm Văn Bạch, Cầu Giấy, Hà Nội"
                    isRequired
                    fullWidth
                />
              </Box>
              {/* Ngành nghề */}
              <Box sx={{mb: 2}}>
                <RHFDropdownMultiple
                    options={JobCategoryList?.map((i) => ({
                      value: i.id,
                      label: i.name,
                      name: i?.name,
                    }))}
                    name="recruitmentJobCategoryIds"
                    title="Ngành nghề"
                    placeholder="Chọn tối đa 3 ngành nghề"
                    fullWidth
                    multiple
                    isRequired
                />
              </Box>
              {/* Hình thức làm việc */}
              <Box sx={{mb: 2}}>
                <RHFDropdownMultiple
                    options={LIST_RECRUITMENT_WORKING_FORM}
                    name="recruitmentWorkingForms"
                    title="Hình thức làm việc"
                    placeholder="Chọn 1 hoặc nhiều hình thức làm việc"
                    fullWidth
                    multiple
                    isRequired
                />
              </Box>
              {/* Số năm kinh nghiệm & Số lượng cần tuyển */}
              <Box sx={{mb: 2, display: 'flex', justifyContent: 'space-between'}}>
                <div style={{flex: 1, marginRight: 8}}>
                  <RHFDropdown
                      name="workExperience"
                      title="Số năm kinh nghiệm"
                      placeholder="Chọn số năm kinh nghiệm yêu cầu"
                      isRequired
                      fullWidth
                      options={LIST_EXPERIENCE_NUMBER}
                  />
                </div>
                <div style={{flex: 1, marginLeft: 8}}>
                  <RHFTextField
                      name="numberPosition"
                      title="Số lượng cần tuyển"
                      placeholder="Nhập số lượng cần tuyển"
                      isRequired
                      fullWidth
                      type="number"
                  />
                </div>
              </Box>
              {/* Giới tính & Ngôn ngữ làm việc */}
              <Box sx={{mb: 2, display: 'flex', justifyContent: 'space-between'}}>
                <div style={{flex: 1, marginRight: 8}}>
                  <RHFDropdown
                      name="sex"
                      title="Giới tính"
                      placeholder="Chọn giới tính"
                      fullWidth
                      isRequired
                      options={LIST_GENDER}
                  />
                </div>
                <div style={{flex: 1, marginLeft: 8}}>
                  <RHFDropdown
                      name="workingLanguageId"
                      title="Ngôn ngữ làm việc"
                      placeholder="Chọn ngôn ngữ"
                      fullWidth
                      options={ListLanguage}
                      isRequired
                      defaultValue={ListLanguage[0]?.id}
                  />
                </div>
              </Box>
            </Box>
          </BoxInnerStyle>
          <RightNoteText
              title="Lưu ý:"
              texts={[
                'Tiêu đề tin tuyển dụng chỉ bao gồm tên vị trí tuyển dụng và khu vực cần tuyển'
              ]}
          />
        </Box>

        {/* THỜI GIAN TUYỂN DỤNG */}
        <Box sx={{width: '100%', backgroundColor: 'transparent', display: 'flex',}}>
          <BoxInnerStyle>
            <DividerCard title="THỜI GIAN TUYỂN DỤNG"/>
            <Box sx={{px: 4, py: 3}}>
              {/* Đơn vị & Chức danh */}
              <Box sx={{mb: 2, display: 'flex', justifyContent: 'space-between'}}>
                <div style={{flex: 1, marginRight: 8}}>
                  <LabelStyle required={true}>Ngày bắt đầu</LabelStyle>
                  <DateFilter
                      name='startDate'
                      placeholder='Chọn ngày'
                  />
                </div>
                <div style={{flex: 1, marginLeft: 8}}>
                  <LabelStyle required={true}>Ngày kết thúc</LabelStyle>
                  <DateFilter
                      name='endDate'
                      placeholder='Chọn ngày'
                  />
                </div>
              </Box>
            </Box>
          </BoxInnerStyle>
          <RightNoteText/>
        </Box>

        {/* MỨC LƯƠNG */}
        <Box sx={{width: '100%', backgroundColor: 'transparent', display: 'flex',}}>
          <BoxInnerStyle>
            <DividerCard title="MỨC LƯƠNG"/>
            <Box sx={{px: 4, py: 3}}>
              <Box sx={{mb: 2, display: 'flex', justifyContent: 'space-between'}}>
                <div style={{flex: 1, marginRight: 8}}>
                  <RHFDropdown
                      name="salaryDisplayType"
                      title="Cách hiển thị"
                      placeholder="Chọn 1 cách hiển thị"
                      fullWidth
                      isRequired
                      options={LIST_RECRUITMENT_SALARY_DISPLAY_TYPE}
                  />
                </div>
                {salaryDisplayType > 0 && (
                    <div style={{flex: 1, marginLeft: 8}}>
                      <RHFDropdown
                          name="currencyUnit"
                          title="Loại tiền tệ"
                          defaultValue={0}
                          placeholder="VNĐ"
                          fullWidth
                          isRequired
                          options={LIST_CURRENCY_TYPE}
                      />
                    </div>
                )}
              </Box>
              {
                  salaryDisplayType === 2 && (
                      <Box sx={{mb: 2, display: 'flex', justifyContent: 'space-between'}}>
                        <div style={{flex: 1, marginRight: 8}}>
                          <InputNumberFormatFilter
                              name="minSalary"
                              title="Mức lương tối thiểu"
                              placeholder="Nhập số tiền"
                              isRequired
                              fullWidth
                              InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                      VNĐ
                                    </InputAdornment>
                                ),
                              }}
                          />
                        </div>
                        <div style={{flex: 1, marginLeft: 8}}>
                          <InputNumberFormatFilter
                              name="maxSalary"
                              title="Mức lương tối đa"
                              placeholder="Nhập số tiền"
                              isRequired
                              fullWidth
                              InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                      VNĐ
                                    </InputAdornment>
                                ),
                              }}
                          />
                        </div>
                      </Box>
                  )
              }
            </Box>
          </BoxInnerStyle>
          <RightNoteText/>
        </Box>

        {/* MÔ TẢ CÔNG VIỆC */}
        <Box sx={{width: '100%', backgroundColor: 'transparent', display: 'flex',}}>
          <BoxInnerStyle>
            <DividerCard title="MÔ TẢ CÔNG VIỆC"/>
            <Box sx={{px: 4, py: 3}}>
              <RHFDropdown
                  options={ListJobType.map(i => ({
                    id: i.id,
                    value: i.id,
                    name: i.name,
                    label: i.name,
                  }))}
                  name="jobPositionId"
                  title="Vị trí công việc có sẵn"
                  placeholder="Chọn vị trí công việc có sẵn"
              />
            </Box>
            <Box sx={{px: 4, py: 0}}>
              <LabelStyle required={true}>Mô tả công việc</LabelStyle>
              <Editor
                  name="description"
                  placeholder="Nhập mô tả công việc..."
              />
            </Box>
            <Box sx={{px: 4, py: 3}}>
              <LabelStyle required={true}>Yêu cầu công việc</LabelStyle>
              <Editor
                  name="requirement"
                  placeholder="Nhập yêu cầu công việc..."
              />
            </Box>
            <Box sx={{px: 4, py: 0}}>
              <LabelStyle required={true}>Quyền lợi</LabelStyle>
              <Editor
                  name="benefit"
                  placeholder="Nhập quyền lợi..."
              />
            </Box>
            <Box sx={{px: 4, py: 3, pt: 2}}>
              <RHFAutocomplete
                  options={[]}
                  name="tags"
                  title="Từ khóa"
                  placeholder="Nhập từ khóa và bấm enter để thêm"
                  fullWidth
                  multiple
                  AutocompleteProps={{freeSolo: true}}
              />
            </Box>
          </BoxInnerStyle>
          <RightNoteText
              title="Lưu ý:"
              texts={[
                'Vui lòng chọn vị trí công việc đã tạo sẵn trong phần thiết lập hoặc nhập tên vị trí công việc để thêm mới.',
                'Hệ thống sẽ tự động lưu trữ vị trí công việc vừa được thiết lập sẵn.'
              ]}
          />
        </Box>

        {/* CÁN BỘ TUYỂN DỤNG VÀ HỘI ĐỒNG TUYỂN DỤNG */}
        <Box className="box-item" sx={{width: '100%', backgroundColor: 'transparent', display: 'flex'}}>
          <BoxInnerStyle>
            <DividerCard title="CÁN BỘ TUYỂN DỤNG VÀ HỘI ĐỒNG TUYỂN DỤNG"/>
            <Box sx={{
              px: 4,
              py: 3,
              boxShadow: ' 0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)',
            }}>
              {/*Cán bộ tuyển dụng */}
              <Box sx={{mb: 2, width: '50%'}}>
                <RHFDropdown
                    options={ListUserFromOrganization.map(item => ({
                      ...item,
                      label: item?.email,
                      name: item?.lastName
                    }))}
                    name="ownerId"
                    title="Cán bộ tuyển dụng"
                    placeholder="Chọn 1 cán bộ"
                    fullWidth
                    isRequired
                    keyObj={"email"}
                    type={"avatar"}
                />
              </Box>
              <Box sx={{mb: 2}}>
                <RHFDropdownMultiple
                    options={ListUserFromOrganization.map(item => ({
                      id: item.id,
                      value: item.value,
                      name: item?.email || item.lastName,
                      label: item?.email || item.lastName
                    }))}
                    name="coOwnerIds"
                    title="Đồng phụ tráchh"
                    placeholder="Chọn 1 hoặc nhiều cán bộ"
                    fullWidth
                    multiple
                    type={"avatar"}
                />
              </Box>
              <Box sx={{mb: 2}}>
                <RHFDropdownMultiple
                    options={ListUserFromOrganization.map(item => ({
                      id: item.id,
                      value: item.value,
                      name: item?.email || item.lastName,
                      label: item?.email || item.lastName
                    }))}
                    name="recruitmentCouncilIds"
                    title="Thành viên hội đồng tuyển dụng"
                    placeholder="Chọn 1 hoặc nhiều cán bộ"
                    fullWidth
                    multiple
                    showAvatar
                    type={"avatar"}
                />
              </Box>
            </Box>
          </BoxInnerStyle>
          <RightNoteText
              title="Lưu ý:"
              texts={[
                'Cán bộ tuyển dụng và Đồng phụ trách có toàn quyền thao tác với tin tuyển dụng.',
                'Hội đồng tuyển dụng là hội đồng chuyên môn, có quyền nhận các thông báo về ứng viên ứng tuyển và tham gia phỏng vấn. Trường hợp, Đơn vị chuyên môn không có nhu cầu nhận thông báo về ứng viên ứng tuyển, vui lòng bỏ qua cài đặt này, và thiết lập danh sách hội đồng ở bước đặt lịch phỏng vấn.'
              ]}
          />
        </Box>
      </BoxWrapperStyle>
  )
}

export default RecruitmentInformation;