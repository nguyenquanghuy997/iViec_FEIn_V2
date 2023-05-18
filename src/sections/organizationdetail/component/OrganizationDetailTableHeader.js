import { View } from "@/components/FlexStyled";
import Iconify from "@/components/Iconify";
import { FormProvider, RHFTextField } from "@/components/hook-form";
import { InputAdornment, Stack } from "@mui/material";
import MuiButton from "@/components/BaseComponents/MuiButton";
import { AddIcon } from "@/assets/ActionIcon";
import React from "react";
import { FilterIcon } from "@/assets/FilterIcon";
import {useTheme} from "@mui/material/styles";
const theme = useTheme();
const OrganizationDetailTableHeader = ({ methods, onOpenFilterForm, onSubmit, handleSubmit, onOpenInviteForm, onOpenListInvite }) => {
    return (
        <>
            <Stack
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                padding="16px"
                backgroundColor={theme.palette.common.white}
            >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                        <RHFTextField
                            name="searchKey"
                            placeholder="Tìm kiếm theo tên, email hoặc SĐT..."
                            sx={{
                                minWidth: "360px",
                                backgroundColor: theme.palette.common.bgrMaster,
                                borderRadius: '6px',
                                '.MuiInput-root': {
                                    border: 'none'
                                }
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start" sx={{ ml: 1.5 }}>
                                        <Iconify
                                            icon={"eva:search-fill"}
                                            sx={{ color: "text.disabled", width: 20, height: 20 }}
                                        />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </FormProvider>
                    <MuiButton
                        color={"default"}
                        startIcon={<FilterIcon />}
                        title={"Bộ lọc"}
                        onClick={onOpenFilterForm}
                        sx={{ fontWeight: 550, ml: 2, height: '44px', "&:hover": { boxShadow: 'none' } }}
                    />
                </View>
                <Stack flexDirection="row" alignItems="center">
                    <MuiButton
                        title={"Danh sách mời"}
                        color={"default"}
                        onClick={() => onOpenListInvite()}
                        startIcon={<Iconify icon="mdi:folder-upload-outline" />}
                        sx={{ fontWeight: 550, marginRight: 1, "&:hover": { boxShadow: 'none' } }}
                    />
                    <MuiButton
                        title={"Mời người dùng"}
                        color={"primary"}
                        onClick={() => onOpenInviteForm()}
                        startIcon={<AddIcon />}
                        sx={{ fontWeight: 550 }}
                    />
                </Stack>
            </Stack>
        </>
    );
};

export default OrganizationDetailTableHeader;
