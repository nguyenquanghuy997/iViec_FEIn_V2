import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import HeadingBar from "../../components/heading-bar/HeadingBar";
import Iconify from "@/components/Iconify";
import {FormProvider, RHFTextField} from "@/components/hook-form";
import {ButtonFilterStyle} from "@/sections/applicant/style";

const ApplicantHeader = ({methods, onOpenFilterForm, onSubmit, handleSubmit}) => {
   

    return (<HeadingBar sx={{ mb: '28px', position: 'fixed', top: 8 }}>
        <Stack flexDirection="row" alignItems="center" padding="0 24px">
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <RHFTextField
                    name="searchKey"
                    placeholder="Tìm kiếm theo họ tên, email, SĐT ứng viên..."
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
    </HeadingBar>);
};

export default ApplicantHeader;
