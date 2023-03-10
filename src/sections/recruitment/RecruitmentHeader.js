import HeadingBar from "../../components/heading-bar/HeadingBar";
import Iconify from "@/components/Iconify";
import {FormProvider, RHFTextField} from "@/components/hook-form";
import {InputAdornment, Stack} from "@mui/material";
import {ButtonFilterStyle} from "@/sections/applicant/style";
import {BoxFlex} from "@/sections/emailform/style";
import {ButtonInviteStyle} from "@/sections/organization/style";
import React, {useState} from "react";
import {PATH_DASHBOARD} from "@/routes/paths";
import {useGetOrganizationQuery} from "@/sections/report/reportSlice";
import {useRouter} from "next/router";
import {get} from "lodash";
import OrganizationSettingModal from "@/sections/recruitment/modals/OrganizationSettingModal";

const RecruitmentHeader = ({methods, onOpenFilterForm, onSubmit, handleSubmit}) => {
  const router = useRouter();
  const {data: Organization = {}} = useGetOrganizationQuery();

  const [isOpenSettingOrganization, setIsOpenSettingOrganization] = useState(false);

  const handleCheckNavigate = () => {
    if (get(Organization, 'isActivated')) {
      return router.push(PATH_DASHBOARD.recruitment.create);
    } else {
      setIsOpenSettingOrganization(true)
    }
  }

  return (
      <HeadingBar sx={{ mb: '28px', position: 'fixed', top: 8 }}>
        <BoxFlex>
          <Stack flexDirection="row" alignItems="center">
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <RHFTextField
                  name="searchKey"
                  placeholder="Tìm kiếm theo tiêu đề tin tuyển dụng..."
                  sx={{minWidth: '510px'}}
                  InputProps={{
                    startAdornment: (
                        <InputAdornment position='start' sx={{ ml: 1.5 }}>
                          <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }}/>
                        </InputAdornment>
                    ),
                  }}
              />
            </FormProvider>
            <ButtonFilterStyle onClick={onOpenFilterForm} startIcon={<Iconify sx={{ height: '18px', width: '18px' }} icon="material-symbols:filter-alt-outline"/>}>
              Bộ lọc
            </ButtonFilterStyle>
          </Stack>
          <ButtonInviteStyle className="button-invite" startIcon={<Iconify icon="material-symbols:add"/>} onClick={handleCheckNavigate}>
            Đăng tin tuyển dụng
          </ButtonInviteStyle>
        </BoxFlex>

        <OrganizationSettingModal
            onClose={() => setIsOpenSettingOrganization(false)}
            isOpenSettingOrganization={isOpenSettingOrganization}
        />

      </HeadingBar>
  );
};

export default RecruitmentHeader;
