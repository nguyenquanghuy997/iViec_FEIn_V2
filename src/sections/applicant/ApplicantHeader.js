import HeadingBar from "../../components/heading-bar/HeadingBar";
import Iconify from "@/components/Iconify";
import {FormProvider, RHFSearchTextField} from "@/components/hook-form";
import {Button, Stack} from "@mui/material";

const ApplicantHeader = ({methods, onOpenFilterForm}) => {
    return (<HeadingBar>
        <Stack flexDirection="row" alignItems="center">
            <FormProvider methods={methods}>
                <RHFSearchTextField
                    name="search"
                    placeholder="Tìm kiếm theo họ tên, email, SĐT ứng viên..."
                    sx={{minWidth: '510px', marginTop: -1}}
                />
            </FormProvider>
            <Button
                onClick={onOpenFilterForm}
                sx={{
                    marginLeft: 1,
                    backgroundColor: "#F3F4F6",
                    padding: "12px 16px 12px 16px",
                    height: "44px",
                    borderRadius: "6px",
                    color: '#455570'
                }}
                startIcon={<Iconify sx={{ height: '18px', width: '18px' }} icon="material-symbols:filter-alt-outline"/>}
            >
                Bộ lọc
            </Button>
        </Stack>
    </HeadingBar>);
};

export default ApplicantHeader;
