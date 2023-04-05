import { useState } from "react";
import { useRouter } from "next/router";
import { get } from "lodash";
import HeadingBar from "../../components/heading-bar/HeadingBar";
import { FormProvider, RHFTextField } from "@/components/hook-form";
import { InputAdornment, Stack } from "@mui/material";
import { BoxFlex } from "@/sections/emailform/style";
import { PATH_DASHBOARD } from "@/routes/paths";
import { useGetOrganizationQuery } from "@/sections/report/reportSlice";
import OrganizationSettingModal from "@/sections/recruitment/modals/OrganizationSettingModal";
import MuiButton from "@/components/BaseComponents/MuiButton";
import { FilterIcon } from "@/assets/FilterIcon";
import { AddIcon } from "@/assets/ActionIcon";
import { SearchIcon } from "@/assets/SearchIcon";

const RecruitmentHeader = ({ methods, onOpenFilterForm, onSubmit, handleSubmit }) => {
  const router = useRouter();
  const { data: Organization = {} } = useGetOrganizationQuery();

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
              sx={{
                minWidth: '510px',
                background: '#F2F4F5',
                borderRadius: '6px',
                '.MuiInput-root': {
                  border: 'none'
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start' sx={{ ml: 1.5 }}>
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </FormProvider>
          <MuiButton
            title="Bộ lọc"
            color="default"
            onClick={onOpenFilterForm}
            startIcon={<FilterIcon />}
            sx={{ fontWeight: 600, ml: 2 }}
          />
        </Stack>
        <Stack flexDirection={"row"}>
          <MuiButton
            title="Đăng tin tuyển dụng"
            startIcon={<AddIcon />}
            onClick={handleCheckNavigate}
          />
        </Stack>
      </BoxFlex>

      <OrganizationSettingModal
        onClose={() => setIsOpenSettingOrganization(false)}
        isOpenSettingOrganization={isOpenSettingOrganization}
      />

    </HeadingBar>
  );
};

export default RecruitmentHeader;
