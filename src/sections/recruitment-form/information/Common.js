import {Box} from "@mui/material";
import DividerCard from "@/sections/recruitment-form/components/DividerCard";
import {LabelStyle} from "@/components/hook-form/style";
import {RHFSelect, RHFTextField} from "@/components/hook-form";
import RHFTreeSelect from "@/components/hook-form/RHFTreeSelect";
import MuiInputNumber from "@/components/form/MuiInputNumber";

import {LIST_EXPERIENCE_NUMBER, LIST_GENDER_RECRUITMENT, LIST_RECRUITMENT_WORKING_FORM} from "@/utils/formatString";

import useFetchDataCommon from "@/sections/recruitment-form/hooks/useFetchDataCommon";

import {BoxInnerStyle} from "@/sections/recruitment-form/style";
const Common = () => {
    const {ListOrganization, ListJobCategory, ListProvince, ListCandidateLevels, ListLanguage} = useFetchDataCommon();
    return (
        <BoxInnerStyle>
            <DividerCard title="THÔNG TIN CHUNG" sx={{borderTopRightRadius: '6px', borderTopLeftRadius: '6px'}}/>
            <Box sx={{px: 4, py: 3}}>
                {/* Tiêu đề tin tuyển dụng */}
                <Box sx={{mb: 2}}>
                    <LabelStyle required={true}>Tiêu đề tin tuyển dụng</LabelStyle>
                    <RHFTextField
                        name="name"
                        placeholder="Nhập tiêu đề tin hiển thị tại trang việc làm..."
                        fullWidth
                    />
                </Box>
                {/* Khu vực đăng tin */}
                <Box sx={{mb: 2}}>
                    <LabelStyle required>Khu vực đăng tin</LabelStyle>
                    <RHFSelect
                        options={ListProvince.map(i => ({value: i.id, label: i.name}))}
                        name="recruitmentAddressIds"
                        placeholder="Chọn tối đa 3 khu vực"
                        fullWidth
                        multiple
                        disabledOption={3}
                    />
                </Box>
                {/* Đơn vị & Chức danh */}
                <Box sx={{mb: 2, display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{flex: 1, marginRight: 8}}>
                        <RHFTreeSelect
                            name="organizationId"
                            title="Đơn vị"
                            placeholder="Chọn 1 đơn vị"
                            options={ListOrganization.map(item => ({
                                id: item.id,
                                value: item.id,
                                label: item.name,
                                parentOrganizationId: item.parentOrganizationId
                            }))}
                            isRequired
                        />
                    </div>
                    <div style={{flex: 1, marginLeft: 8}}>
                        <LabelStyle required>Chức danh</LabelStyle>
                        <RHFSelect
                            options={ListCandidateLevels}
                            name="candidateLevelId"
                            placeholder="Chọn 1 chức danh"
                            fullWidth
                        />
                    </div>
                </Box>
                {/* Địa điểm làm việc */}
                <Box sx={{mb: 2}}>
                    <LabelStyle required>Địa điểm làm việc</LabelStyle>
                    <RHFTextField
                        name="address"
                        placeholder="Ví dụ: Tầng 15, Tòa nhà FPT, Số 10 Phạm Văn Bạch, Cầu Giấy, Hà Nội"
                        fullWidth
                    />
                </Box>
                {/* Ngành nghề */}
                <Box sx={{mb: 2}}>
                    <LabelStyle required>Ngành nghề</LabelStyle>
                    <RHFSelect
                        options={ListJobCategory?.map(item => ({value: item?.id, label: item?.name}))}
                        name="recruitmentJobCategoryIds"
                        placeholder="Chọn tối đa 3 ngành nghề"
                        fullWidth
                        multiple
                        disabledOption={3}
                    />
                </Box>
                {/* Hình thức làm việc */}
                <Box sx={{mb: 2}}>
                    <LabelStyle required>Hình thức làm việc</LabelStyle>
                    <RHFSelect
                        options={LIST_RECRUITMENT_WORKING_FORM}
                        name="recruitmentWorkingForms"
                        placeholder="Chọn tối đa 3 hình thức làm việc"
                        fullWidth
                        multiple
                        disabledOption={3}
                    />
                </Box>
                {/* Số năm kinh nghiệm & Số lượng cần tuyển */}
                <Box sx={{mb: 2, display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{flex: 1, marginRight: 8}}>
                        <LabelStyle required>Số năm kinh nghiệm</LabelStyle>
                        <RHFSelect
                            name="workExperience"
                            placeholder="Chọn số năm kinh nghiệm yêu cầu"
                            fullWidth
                            options={LIST_EXPERIENCE_NUMBER}
                        />
                    </div>
                    <div style={{flex: 1, marginLeft: 8}}>
                        <MuiInputNumber
                            name="numberPosition"
                            title="Số lượng cần tuyển"
                            placeholder="Nhập số lượng cần tuyển"
                            isRequired
                            fullWidth
                        />
                    </div>
                </Box>
                {/* Giới tính & Ngôn ngữ làm việc */}
                <Box sx={{mb: 2, display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{flex: 1, marginRight: 8}}>
                        <LabelStyle>Giới tính</LabelStyle>
                        <RHFSelect
                            name="sex"
                            placeholder="Chọn giới tính"
                            fullWidth
                            options={LIST_GENDER_RECRUITMENT}
                        />
                    </div>
                    <div style={{flex: 1, marginLeft: 8}}>
                        <LabelStyle>Ngôn ngữ làm việc</LabelStyle>
                        <RHFSelect
                            name="recruitmentLanguageIds"
                            placeholder="Chọn ngôn ngữ"
                            fullWidth
                            multiple
                            options={ListLanguage?.map(item => ({value: item?.id, label: item?.name}))}
                            disabledOption={3}
                        />
                    </div>
                </Box>
            </Box>
        </BoxInnerStyle>
    )
}

export default Common;