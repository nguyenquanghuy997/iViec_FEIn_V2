import HeadingBar from "../../components/heading-bar/HeadingBar";
import Iconify from "@/components/Iconify";
import {FormProvider, RHFSearchTextField} from "@/components/hook-form";
import {Button, IconButton, Stack} from "@mui/material";

const ApplicantHeader = ({methods, onOpenFilterForm}) => {
    return (<HeadingBar>
        <Stack flexDirection="row">
            <FormProvider methods={methods}>
                <RHFSearchTextField
                    hasLabel={false}
                    name="search"
                    placeholder="Tìm kiếm theo họ tên, email, SĐT ứng viên..."
                    sx={{minWidth: '510px'}}
                />
            </FormProvider>
            <Button
                onClick={onOpenFilterForm}
                sx={{
                    marginLeft: 1,
                    backgroundColor: "#F3F4F6",
                    padding: "12px 16px 12px 0",
                    height: "44px",
                    borderRadius: "6px",
                    color: '#455570'
                }}
            >
                <IconButton>
                    <Iconify icon="material-symbols:filter-alt-outline"/>
                </IconButton>
                Bộ lọc
            </Button>
        </Stack>
    </HeadingBar>);
};

export default ApplicantHeader;
