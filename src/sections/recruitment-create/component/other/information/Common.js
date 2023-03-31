import DividerCard from "@/sections/recruitment-create/component/DividerCard";
import {Box} from "@mui/material";
import {LabelStyle} from "@/components/hook-form/style";
import {RHFAutocomplete, RHFSelect, RHFTextField} from "@/components/hook-form";
import RHFTreeSelect from "@/components/hook-form/RHFTreeSelect";
import {LIST_EXPERIENCE_NUMBER, LIST_GENDER_RECRUITMENT, LIST_RECRUITMENT_WORKING_FORM} from "@/utils/formatString";
import InputNumberFormatFilter from "@/sections/dynamic-filter/InputNumberFormatFilter";
import {BoxInnerStyle} from "@/sections/recruitment-create/style";
import React, {useEffect} from "react";
import useFetchDataCommon from "@/sections/recruitment-create/hooks/useFetchDataCommon";
import RHFMuiAutocomplete from "@/components/hook-form/RHFMuiAutocomplete";
import {useGetOrganizationInfoQuery} from "@/sections/organizationdetail/OrganizationDetailSlice";
import {isEmpty} from "lodash";
import {useFormContext} from "react-hook-form";
import {RecruitmentWorkingForm} from "@/utils/enum";

const Common = ({recruitment}) => {
    const {setValue} = useFormContext();
    const {ListOrganization, ListJobCategory, ListProvince, ListCandidateLevels, ListLanguage} = useFetchDataCommon();
    const {data: OrganizationOfUser = {}} = useGetOrganizationInfoQuery();
    useEffect(() => {
        if (isEmpty(recruitment) && !isEmpty(OrganizationOfUser)) {
            setValue('organizationId', OrganizationOfUser?.id);
        } else {
            setValue('name', recruitment?.name);
            setValue('organizationId', recruitment?.organizationId);
            setValue('recruitmentAddressIds', recruitment?.recruitmentAddresses?.map(item => ({...item, value: item?.provinceId, label: item?.provinceName})))
            setValue('recruitmentJobCategoryIds', recruitment?.recruitmentJobCategories?.map(item => ({...item, value: item?.jobCategoryId, label: item?.name})));
            setValue('recruitmentWorkingForms', recruitment?.recruitmentWorkingForms?.map(item => ({value: item?.workingForm, label: RecruitmentWorkingForm(item?.workingForm)})))
            setValue('jobPositionId', recruitment?.jobPosition?.id);
            setValue('candidateLevelId', recruitment?.candidateLevelId);
            setValue('address', recruitment?.address);
            setValue('workExperience', recruitment?.workExperience);
            setValue('numberPosition', recruitment?.numberPosition);
            setValue('sex', recruitment?.sex);
            setValue('recruitmentLanguageIds', recruitment?.recruitmentLanguages?.map(item => ({...item, value: item?.languageId, label: item?.name})))
        }
    }, [OrganizationOfUser, recruitment])

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
                    <RHFMuiAutocomplete
                        options={ListProvince.map(i => ({value: i.id, label: i.name}))}
                        name="recruitmentAddressIds"
                        title="Khu vực đăng tin"
                        placeholder="Chọn tối đa 3 khu vực"
                        fullWidth
                        multiple
                        isRequired
                        showCheckbox
                        disabledOption={3}
                        AutocompleteProps={{
                            disableCloseOnSelect: true
                        }}
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
                    <RHFMuiAutocomplete
                        options={ListJobCategory?.map(item => ({value: item?.id, label: item?.name}))}
                        name="recruitmentJobCategoryIds"
                        title="Ngành nghề"
                        placeholder="Chọn tối đa 3 ngành nghề"
                        fullWidth
                        multiple
                        isRequired
                        showCheckbox
                        disabledOption={3}
                        AutocompleteProps={{
                            disableCloseOnSelect: true
                        }}
                    />
                </Box>
                {/* Hình thức làm việc */}
                <Box sx={{mb: 2}}>
                    <RHFAutocomplete
                        options={LIST_RECRUITMENT_WORKING_FORM}
                        name="recruitmentWorkingForms"
                        title="Hình thức làm việc"
                        placeholder="Chọn tối đa 3 hình thức làm việc"
                        fullWidth
                        multiple
                        isRequired
                        showCheckbox
                        disabledOption={3}
                        AutocompleteProps={{
                            disableCloseOnSelect: true
                        }}
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
                        <InputNumberFormatFilter
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
                        <LabelStyle required>Giới tính</LabelStyle>
                        <RHFSelect
                            name="sex"
                            placeholder="Chọn giới tính"
                            fullWidth
                            options={LIST_GENDER_RECRUITMENT}
                        />
                    </div>
                    <div style={{flex: 1, marginLeft: 8}}>
                        <RHFMuiAutocomplete
                            name="recruitmentLanguageIds"
                            title="Ngôn ngữ làm việc"
                            placeholder="Chọn ngôn ngữ"
                            fullWidth
                            multiple
                            options={ListLanguage?.map(item => ({value: item?.id, label: item?.name}))}
                            isRequired
                            showCheckbox
                            disabledOption={3}
                            limitTags={2}
                            AutocompleteProps={{
                                disableCloseOnSelect: true
                            }}
                        />
                    </div>
                </Box>
            </Box>
        </BoxInnerStyle>
    )
}

export default Common;