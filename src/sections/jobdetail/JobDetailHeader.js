import HeadingBar from "../../components/heading-bar/HeadingBar";
import Iconify from "@/components/Iconify";
import {FormProvider, RHFTextField} from "@/components/hook-form";
import {InputAdornment, Stack} from "@mui/material";
import {ButtonFilterStyle} from "@/sections/applicant/style";
import { Text, View } from "@/components/FlexStyled";
const JobDetailHeader = ({methods, onOpenFilterForm, onSubmit, handleSubmit}) => {
    return (<HeadingBar sx={{ mb: '28px', position: 'fixed', top: 8 }}>
        <Stack flexDirection="row" alignItems="center">
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
            <View
          flexRow
          atCenter
          pv={8}
          ph={12}
          borderRadius={4}
          bgColor={"#1976D2"}
        //   onPress={() => setShowForm(true)}
        >

          <Text
            ml={12}
            color={"#fff"}
            fontSize={15}
            lineHeight={20 / 15}
            fontWeight={"600"}
          >
            {"Thêm ứng viên"}
          </Text>
        </View>
        </Stack>
    </HeadingBar>);
};

export default JobDetailHeader;
