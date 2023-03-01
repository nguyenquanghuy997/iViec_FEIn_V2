import HeadingBar from "../../components/heading-bar/HeadingBar";
import Iconify from "@/components/Iconify";
import {FormProvider, RHFTextField} from "@/components/hook-form";
import {InputAdornment, Stack} from "@mui/material";
import {ButtonFilterStyle} from "@/sections/applicant/style";
import { Text, View } from "@/components/FlexStyled";
import SvgIcon from "@/components/SvgIcon";
import {  useState } from "react";
import {
    JobTypeFormModal,
  } from "@/sections/jobtype";
const JobTypeHeader = ({methods, onOpenFilterForm, onSubmit, handleSubmit}) => {
    const [showForm, setShowForm] = useState(false);
    return (<HeadingBar>
        <Stack flexDirection="row" alignItems="center">
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <RHFTextField
                    name="searchKey"
                    placeholder="Tìm kiếm quy trình tuyển dụng"
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
              onPress={() => setShowForm(true)}
          >
            <SvgIcon>
              {
                '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.9167 9H3.58333C3.26444 9 3 8.66 3 8.25C3 7.84 3.26444 7.5 3.58333 7.5H12.9167C13.2356 7.5 13.5 7.84 13.5 8.25C13.5 8.66 13.2356 9 12.9167 9Z" fill="white"/><path d="M8.24994 13.5C7.83994 13.5 7.49994 13.2356 7.49994 12.9167V3.58333C7.49994 3.26444 7.83994 3 8.24994 3C8.65994 3 8.99994 3.26444 8.99994 3.58333V12.9167C8.99994 13.2356 8.65994 13.5 8.24994 13.5Z" fill="white"/></svg>'
              }
            </SvgIcon>

            <Text
                ml={12}
                color={"#fff"}
                fontSize={15}
                lineHeight={20 / 15}
                fontWeight={"600"}
            >
              {"Thêm vị trí công việc"}
            </Text>
          </View>
        </Stack>
             <JobTypeFormModal
            show={showForm}
            setShow={setShowForm}
        />
    </HeadingBar>);
};

export default JobTypeHeader;
