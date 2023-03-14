import {useForm} from "react-hook-form";
import {Box, InputAdornment} from "@mui/material";
import {BoxInnerStyle, BoxWrapperStyle} from "@/sections/recruitment-create/style";
import DividerCard from "@/sections/recruitment-create/component/DividerCard";
import RightNoteText from "@/sections/recruitment-create/component/RightNoteText";
import {FormProvider, RHFAutocomplete, RHFTextField} from "@/components/hook-form";
import RHFDropdown from "@/components/hook-form/RHFDropdown";
import RHFRecruitmentEditor from "@/sections/recruitment-create/component/form/RHRRecruitmentEditor";
import DateFilter from "@/sections/dynamic-filter/DateFilter";
import {LabelStyle} from "@/components/hook-form/style";
import OrganizationTreeSelect from "@/sections/recruitment-create/component/form/TreeSelect";
import {useGetOrganizationsDataWithChildQuery} from "@/sections/organization/OrganizationSlice";
import {useGetJobCategoriesQuery, useGetProvinceQuery} from "@/sections/companyinfor/companyInforSlice";
import {useGetAllJobTypeQuery} from "@/sections/jobtype";
import {
    LIST_CURRENCY_TYPE,
    LIST_EXPERIENCE_NUMBER,
    LIST_GENDER,
    LIST_RECRUITMENT_WORKING_FORM
} from "@/utils/formatString";
import {useGetListLanguagesQuery} from "@/redux/slice/masterDataSlice";
import InputNumberFormatFilter from "@/sections/dynamic-filter/InputNumberFormatFilter";
import {useGetAllUserFromOrganizationQuery} from "@/sections/applicant";
import {useState} from "react";

const RecruitmentInformation = () => {

    const [equipmentItem, setEquipmentItem] = useState("");
    const [equipmentId, setEquipmentId] = useState("");

    const {data: {items: ListOrganization} = []} = useGetOrganizationsDataWithChildQuery();
    const {data: {items: JobCategoryList = []} = {}} = useGetJobCategoriesQuery();
    const {data: {items: ListProvince = []} = {}} = useGetProvinceQuery();
    const {data: {items: ListJobType = []} = {}} = useGetAllJobTypeQuery();
    const {data: ListLanguage = []} = useGetListLanguagesQuery();
    const {data: ListUserFromOrganization = []} = useGetAllUserFromOrganizationQuery({ Id: equipmentId });

    const methods = useForm({
        mode: 'all',
    });

    return (
        <BoxWrapperStyle className="wrapper">
            <FormProvider methods={methods}>
                {/* THÔNG TIN CHUNG */}
                <Box className="box-item" sx={{width: '100%', backgroundColor: 'transparent', display: 'flex',}}>
                    <BoxInnerStyle>
                        <DividerCard title="THÔNG TIN CHUNG" sx={{borderTopRightRadius: '6px', borderTopLeftRadius: '6px'}}/>
                        <Box sx={{px: 4, py: 3}}>
                            {/* Tiêu đề tin tuyển dụng */}
                            <Box sx={{mb: 2}}>
                                <RHFTextField
                                    name="title"
                                    title="Tiêu đề tin tuyển dụng"
                                    placeholder="Nhập tiêu đề tin hiển thị tại trang việc làm..."
                                    isRequired
                                    fullWidth
                                />
                            </Box>
                            {/* Khu vực đăng tin */}
                            <Box sx={{mb: 2}}>
                                <RHFAutocomplete
                                    options={ListProvince.map(i => ({
                                        value: i.id,
                                        label: i.name,
                                        name: i.name,
                                    }))}
                                    name="locations"
                                    title="Khu vực đăng tin"
                                    placeholder="Chọn tối đa 3 khu vực"
                                    fullWidth
                                    multiple
                                />
                            </Box>
                            {/* Đơn vị & Chức danh */}
                            <Box sx={{mb: 2, display: 'flex', justifyContent: 'space-between'}}>
                                <div style={{flex: 1, marginRight: 8}}>
                                    <LabelStyle required={true}>Đơn vị</LabelStyle>
                                    <OrganizationTreeSelect
                                        placeholder="Chọn 1 đơn vị"
                                        treeData={ListOrganization}
                                        equipmentItem={equipmentItem}
                                        setEquipmentItem={setEquipmentItem}
                                        equipmentId={equipmentId}
                                        setEquipmentId={setEquipmentId}
                                    />
                                </div>
                                <div style={{flex: 1, marginLeft: 8}}>
                                    <RHFDropdown
                                        options={
                                            ListJobType.map(item => ({
                                                value: item.id,
                                                label: item.name,
                                                name: item.name
                                            }))
                                        }
                                        name="role"
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
                                    name="title"
                                    title="Địa điểm làm việc"
                                    placeholder="Ví dụ: Tầng 15, Tòa nhà FPT, Số 10 Phạm Văn Bạch, Cầu Giấy, Hà Nội"
                                    isRequired
                                    fullWidth
                                />
                            </Box>
                            {/* Ngành nghề */}
                            <Box sx={{mb: 2}}>
                                <RHFAutocomplete
                                    options={JobCategoryList?.map((i) => ({
                                        value: i.id,
                                        label: i.name,
                                        name: i?.name,
                                    }))}
                                    name="locations"
                                    title="Ngành nghề"
                                    placeholder="Chọn tối đa 3 ngành nghề"
                                    fullWidth
                                    multiple
                                />
                            </Box>
                            {/* Hình thức làm việc */}
                            <Box sx={{mb: 2}}>
                                <RHFAutocomplete
                                    options={LIST_RECRUITMENT_WORKING_FORM}
                                    name="locations"
                                    title="Hình thức làm việc"
                                    placeholder="Chọn 1 hoặc nhiều hình thức làm việc"
                                    fullWidth
                                    multiple
                                />
                            </Box>
                            {/* Số năm kinh nghiệm & Số lượng cần tuyển */}
                            <Box sx={{mb: 2, display: 'flex', justifyContent: 'space-between'}}>
                                <div style={{flex: 1, marginRight: 8}}>
                                    <RHFDropdown
                                        name="role"
                                        title="Số năm kinh nghiệm"
                                        placeholder="Chọn số năm kinh nghiệm yêu cầu"
                                        isRequired
                                        fullWidth
                                        options={LIST_EXPERIENCE_NUMBER}
                                    />
                                </div>
                                <div style={{flex: 1, marginLeft: 8}}>
                                    <RHFTextField
                                        name="title"
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
                                        name="gender"
                                        title="Giới tính"
                                        placeholder="-- Không yêu cầu --"
                                        fullWidth
                                        options={LIST_GENDER}
                                    />
                                </div>
                                <div style={{flex: 1, marginLeft: 8}}>
                                    <RHFDropdown
                                        name="language"
                                        title="Ngôn ngữ làm việc"
                                        placeholder="Tiếng Việt"
                                        fullWidth
                                        options={ListLanguage}
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
                                        name="displayType"
                                        title="Cách hiển thị"
                                        placeholder="Chọn 1 cách hiển thị"
                                        fullWidth
                                        options={LIST_CURRENCY_TYPE}
                                    />
                                </div>
                                <div style={{flex: 1, marginLeft: 8}}>
                                    <RHFDropdown
                                        name="moneyType"
                                        title="Loại tiền tệ"
                                        placeholder="VNĐ"
                                        fullWidth
                                        options={LIST_CURRENCY_TYPE}
                                    />
                                </div>
                            </Box>
                            <Box sx={{mb: 2, display: 'flex', justifyContent: 'space-between'}}>
                                <div style={{flex: 1, marginRight: 8}}>
                                    <InputNumberFormatFilter
                                        name="salaryMin"
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
                                        name="salaryMax"
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
                        </Box>
                    </BoxInnerStyle>
                    <RightNoteText/>
                </Box>

                {/* MÔ TẢ CÔNG VIỆC */}
                <Box sx={{width: '100%', backgroundColor: 'transparent', display: 'flex',}}>
                    <BoxInnerStyle>
                        <DividerCard title="MÔ TẢ CÔNG VIỆC"/>
                        <Box sx={{px: 4, py: 3}}>
                            <RHFAutocomplete
                                options={ListJobType.map(i => ({
                                    id: i.id,
                                    value: i.id,
                                    name: i.name,
                                    label: i.name,
                                }))}
                                name="bccEmails"
                                title="Vị trí công việc có sẵn"
                                placeholder="Chọn 1 vị trí công việc có sẵn hoặc nhập tên vị trí thêm mới"
                                isRequired
                                multiple
                                limitTags={3}
                                AutocompleteProps={{
                                    freeSolo: true,
                                }}
                            />
                        </Box>
                        <Box sx={{px: 4, py: 0}}>
                            <LabelStyle required={true}>Mô tả công việc</LabelStyle>
                            <RHFRecruitmentEditor
                                name="description"
                                placeholder="Nhập mô tả công việc..."
                                sx={{width: '780px', minHeight: '370px'}}
                            />
                        </Box>
                        <Box sx={{px: 4, py: 3}}>
                            <LabelStyle required={true}>Yêu cầu công việc</LabelStyle>
                            <RHFRecruitmentEditor
                                name="requirement"
                                placeholder="Nhập mô tả công việc..."
                                sx={{width: '780px', minHeight: '370px'}}
                            />
                        </Box>
                        <Box sx={{px: 4, py: 0}}>
                            <LabelStyle required={true}>Quyền lợi</LabelStyle>
                            <RHFRecruitmentEditor
                                name="benefit"
                                placeholder="Nhập quyền lợi..."
                                sx={{width: '780px', minHeight: '370px'}}
                            />
                        </Box>
                        <Box sx={{px: 4, py: 3, pt: 2}}>
                            <RHFAutocomplete
                                options={[]}
                                name="keywords"
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
                                    options={ListUserFromOrganization}
                                    name="owner"
                                    title="Cán bộ tuyển dụng"
                                    placeholder="Chọn 1 cán bộ"
                                    fullWidth
                                    isRequired
                                />
                            </Box>
                            <Box sx={{mb: 2}}>
                                <RHFAutocomplete
                                    options={ListUserFromOrganization}
                                    name="coOwner"
                                    title="Đồng phụ trách"
                                    placeholder="Chọn 1 hoặc nhiều cán bộ"
                                    fullWidth
                                    isRequired
                                    multiple
                                />
                            </Box>
                            <Box sx={{mb: 2}}>
                                <RHFAutocomplete
                                    options={ListUserFromOrganization}
                                    name="council"
                                    title="Thành viên hội đồng tuyển dụng"
                                    placeholder="Chọn 1 hoặc nhiều cán bộ"
                                    fullWidth
                                    isRequired
                                    multiple
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
            </FormProvider>
        </BoxWrapperStyle>
    )
}

export default RecruitmentInformation;