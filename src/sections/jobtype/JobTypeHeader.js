import {ButtonDS} from "@/components/DesignSystem";
import {View} from "@/components/FlexStyled";
import Iconify from "@/components/Iconify";
import {FormProvider, RHFTextField} from "@/components/hook-form";
import {ButtonFilterStyle} from "@/sections/applicant/style";
import {JobTypeFormModal} from "@/sections/jobtype";
import {InputAdornment, Stack} from "@mui/material";
import {useState} from "react";

const JobTypeHeader = ({
                           methods,
                           onOpenFilterForm,
                           onSubmit,
                           handleSubmit,
                           onRefreshData
                       }) => {
    const [showForm, setShowForm] = useState(false);
    return (
        <>
            <Stack
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                padding="16px 16px 4px 16px"
            >
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                        <RHFTextField
                            name="searchKey"
                            placeholder="Tìm kiếm quy trình tuyển dụng"
                            sx={{
                                minWidth: "360px", height: '36px', '.MuiInput-root': {
                                    height: '36px', minHeight:"36px"
                                }
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start" sx={{ml: 1.5}}>
                                        <Iconify
                                            icon={"eva:search-fill"}
                                            sx={{color: "text.disabled", width: 20, height: 20}}
                                        />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </FormProvider>
                    <ButtonFilterStyle
                        style={{height: 36}}
                        onClick={onOpenFilterForm}
                        startIcon={
                            <Iconify
                                sx={{height: "18px", width: "18px"}}
                                icon="material-symbols:filter-alt-outline"
                            />
                        }
                    >
                        Bộ lọc
                    </ButtonFilterStyle>
                </View>
                <ButtonDS
                    tittle={"Thêm vị trí công việc"}
                    type="submit"
                    sx={{
                        textTransform: "none",
                        boxShadow: "none",
                    }}
                    onClick={() => setShowForm(true)}
                    icon={
                        <Iconify
                            icon={"material-symbols:add"}
                            width={20}
                            height={20}
                            color="#fff"
                            mr={1}
                        />
                    }
                />
            </Stack>
            <JobTypeFormModal show={showForm} setShow={setShowForm} onRefreshData={onRefreshData}/>
        </>
    );
};

export default JobTypeHeader;
