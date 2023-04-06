import HeadingBar from "../../components/heading-bar/HeadingBar";
import Iconify from "@/components/Iconify";
import {FormProvider, RHFTextField} from "@/components/hook-form";
import {InputAdornment, Stack} from "@mui/material";
import {ButtonFilterStyle} from "@/sections/applicant/style";
import {BoxFlex} from "@/sections/emailform/style";

const RecruitmentAdHeader = ({ methods, onOpenFilterForm, onSubmit, handleSubmit}) => {
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
                    '.MuiInput-root':{
                       border: 'none'
                    }
                  }}
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
        </BoxFlex>
      </HeadingBar>
  );
};

export default RecruitmentAdHeader;
