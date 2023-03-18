import {ButtonDS, SwitchStatusDS, TextAreaDS} from "@/components/DesignSystem";
import {Text, View} from "@/components/DesignSystem/FlexStyled";
import Iconify from "@/components/Iconify";
import {FormProvider, RHFTextField} from "@/components/hook-form";
import {Label} from "@/components/hook-form/style";
import {
    useAddApproveProcessMutation,
    useUpdateApproveProcessMutation,
    useGetPreviewApproveProcessQuery
} from "@/sections/approve-process/ApproveProcessSlice";
import {ViewModel} from "@/utils/cssStyles";
import {yupResolver} from "@hookform/resolvers/yup";
import {Box, Button, CircularProgress, Divider, Grid, IconButton, Modal, Typography} from "@mui/material";
import {useSnackbar} from "notistack";
import React, {useEffect, useState} from "react";
import {useFieldArray, useForm} from "react-hook-form";
import * as Yup from "yup";
import {ButtonCancelStyle} from "@/sections/applicant/style";
import {MinusIcon} from "@/assets/ActionIcon";
import {ApproveProcessFormLevelItem} from "@/sections/approve-process/Items/ApproveProcessFormLevelItem";
import {styled} from "@mui/styles";
import {formatDataGet, formatDataPush} from "@/sections/approve-process/config";
import ApproveProcessDialog from "@/sections/approve-process/ApproveProcessDialog";

const defaultValues = {
    name: undefined,
    description: undefined,
    approvalProcessType: undefined,
    isAvailable: false,
    approvalProcessLevels: [
        {
            approvalProcessLevelDetails: [
                {
                    roleGroupId: undefined,
                    personInChargeIds: [],
                    processLevelDetailType: undefined
                }
            ]
        }
    ]
};

const ButtonStyle = {
    fontSize: 14,
    fontWeight: 600,
    minWidth: '56px',
    borderRadius: 6,
    padding: '8px 12px'
}

const ButtonAddInviteStyle = styled(Button)(({}) => ({
    "&.button-add-invite": {
        ...ButtonStyle,
        backgroundColor: '#FDFDFD',
        width: '100%',
        color: '#1976D2',
        ":hover": {
            color: '#455570',
            backgroundColor: '#FDFDFD',
        }
    }
}));

export const ApproveProcessFormModal = ({type, title, data, setData, show, setShow}) => {
        const isEditMode = !!data?.id;
        const [openDialogConfirm, setOpenDialogConfirm] = useState(false);
        // api
        const [addForm] = useAddApproveProcessMutation();
        const [updateForm] = useUpdateApproveProcessMutation();
        let {data: preview = {}} = useGetPreviewApproveProcessQuery({Id: data?.id}, {skip: !data?.id});
        const isLoading = isEditMode && !preview.id;
        // form
        const Schema = Yup.object().shape({
            name: Yup.string().required("Chưa nhập tên quy trình phê duyệt"),
            description: Yup.string(),
            isAvailable: Yup.bool(),
            approvalProcessLevels: Yup.array().of(
                Yup.object().shape({
                    approvalProcessLevelDetails: Yup.array().of(
                        Yup.object().shape({
                            processLevelDetailType: Yup.string().required("Chưa chọn loại vai trò"),
                            roleGroupId: Yup.string().when("processLevelDetailType", {
                                is: "0",
                                then: (schema) => schema.required("Chưa chọn nhóm phê duyệt")
                            }),
                            personInChargeIds: Yup.lazy(val => (Array.isArray(val) ? Yup.array().required("321321zzz") : Yup.string().required("32321321"))),
                        })
                    )
                })
            )
        });

        const methods = useForm({
            defaultValues,
            resolver: yupResolver(Schema),
        });

        const {
            reset,
            control,
            setValue,
            handleSubmit,
            formState: {isSubmitting},
        } = methods;

        const {fields, append, remove} = useFieldArray({
            control,
            name: "approvalProcessLevels"
        });
// action
        const pressHide = () => {
            setData(null);
            setShow(false);
        };
        const {enqueueSnackbar} = useSnackbar();
        const pressSave = handleSubmit(async (e) => {
            let body = {
                id: isEditMode ? data.id : 0,
                name: e.name,
                description: e.description,
                approvalProcessType: type,
                isAvailable: e.isAvailable,
                approvalProcessLevels: e.approvalProcessLevels
            };
            body = formatDataPush(body);

            if (isEditMode) {
                try {
                    await updateForm(body).unwrap();
                    enqueueSnackbar("Thực hiện thành công!", {
                        autoHideDuration: 2000,
                    });
                    pressHide();
                } catch (err) {
                    enqueueSnackbar("Thực hiện thất bại!", {
                        autoHideDuration: 1000,
                        variant: "error",
                    });
                }
            } else {
                try {
                    await addForm(body).unwrap();
                    enqueueSnackbar("Thực hiện thành công!", {
                        autoHideDuration: 1000,
                    });
                    pressHide();
                } catch (err) {
                    enqueueSnackbar("Thực hiện thất bại!", {
                        autoHideDuration: 1000,
                        variant: "error",
                    });
                }
            }
        });

        // render
        const renderTitle = (title, required) => {
            return <Label required={required}>{title}</Label>;
        };

        // effect
        useEffect(() => {
            if (!show) {
                reset();
                setValue("name", "");
                setValue("description", "");
                setValue("isAvailable", false);
            }
        }, [show]);

        useEffect(() => {
            if (!data?.id) return;
            let body = preview;
            body = formatDataGet(body);
            setValue("name", body.name);
            setValue("description", body.description);
            setValue("isAvailable", body.isAvailable);
            setValue("approvalProcessLevels", body.approvalProcessLevels);
        }, [isEditMode, data, preview]);

        return (
            <FormProvider methods={methods}>
                <Modal
                    open={show}
                    onClose={pressHide}
                    sx={{display: "flex", justifyContent: "flex-end"}}
                >
                    <ViewModel>
                        {/* header */}
                        <View
                            flexrow="true"
                            atcenter="center"
                            pv={12}
                            ph={24}
                            bgcolor={"#FDFDFD"}
                        >
                            <Text flex="true" fontsize={16} fontweight={"600"}>
                                {isEditMode
                                    ? `Chỉnh sửa ${title.toLowerCase()}`
                                    : `Thêm mới ${title.toLowerCase()}`}
                            </Text>
                            <ButtonDS
                                type="submit"
                                sx={{
                                    backgroundColor: "#fff",
                                    boxShadow: "none",
                                    ":hover": {
                                        backgroundColor: "#EFF3F7",
                                    },
                                    textTransform: "none",
                                    padding: "12px",
                                    minWidth: "unset",
                                }}
                                onClick={pressHide}
                                icon={
                                    <Iconify
                                        icon={"mi:close"}
                                        width={20}
                                        height={20}
                                        color="#5C6A82"
                                    />
                                }
                            />
                        </View>
                        <Divider/>
                        {/* body */}
                        {isLoading ? (
                            <View flex="true" contentcenter="true">
                                <CircularProgress/>
                            </View>
                        ) : (
                            <View flex="true" p={24} pb={28} style={{overflowY: "scroll"}}>
                                {/* code & name */}
                                <View mb={24}>
                                    {renderTitle("Tên quy trình phê duyệt", true)}
                                    <RHFTextField
                                        name={"name"}
                                        placeholder="Nhập tên quy trình phê duyệt"
                                    />
                                </View>
                                <View mb={24}>
                                    {renderTitle("Mô tả")}
                                    <TextAreaDS
                                        maxLength={255}
                                        placeholder="Nhập nội dung mô tả..."
                                        name={"description"}
                                    />
                                </View>
                                <Divider sx={{mt: 1, mb: 3}}/>
                                {fields.map((item, index) => {
                                    return (<View
                                        style={{
                                            padding: 16,
                                            marginBottom: 24,
                                            borderRadius: 6,
                                            backgroundColor: "#F2F4F5"
                                        }}
                                        key={item.id}>
                                        <Grid container direction="row"
                                              justifyContent="center"
                                              alignItems="center"
                                              mb={2}>
                                            <Grid item xs>
                                                <Typography variant="subtitle1">
                                                    Cấp {index + 1}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Typography variant="textSize13500">
                                                    Đã chọn: ...
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={9} container direction="row" justifyContent="flex-end">
                                                <IconButton onClick={() => setOpenDialogConfirm(true)}>
                                                    <MinusIcon/>
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                        <Box className="box-content-wrapper" sx={{width: '100%'}}>
                                            <ApproveProcessFormLevelItem
                                                index={index}
                                                key={item.id}
                                            />
                                        </Box>
                                        <ApproveProcessDialog open={openDialogConfirm} onAccept={() => remove(index)}
                                                              onClose={() => setOpenDialogConfirm(false)}
                                                              type='approveProcessLevelDelete'/>
                                    </View>)
                                })}
                                <ButtonAddInviteStyle
                                    variant="outlined"
                                    className='button-add-invite'
                                    onClick={() => {
                                        append({...defaultValues.approvalProcessLevels[0]})
                                    }}
                                    startIcon={<Iconify icon="material-symbols:add"/>}>
                                    Thêm cấp phê duyệt
                                </ButtonAddInviteStyle>
                            </View>
                        )}
                        {/* footer */}
                        <View
                            flexrow="true"
                            pv={12}
                            ph={16}
                            boxshadow={"inset 0px 1px 0px #EBECF4"}
                        >
                            <ButtonDS
                                type="submit"
                                loading={isSubmitting}
                                variant="contained"
                                tittle={"Lưu"}
                                onClick={pressSave}
                            />
                            <View width={8}/>
                            <ButtonCancelStyle onClick={pressHide}>Hủy</ButtonCancelStyle>
                            <View width={8}/>
                            <View flex="true"/>
                            {!isLoading ? (
                                <SwitchStatusDS
                                    name={"isAvailable"}
                                    disabled={!isEditMode}
                                    label={methods.watch("isAvailable") ? "Đang áp dụng" : "Không áp dụng"}
                                />
                            ) : null}
                        </View>
                    </ViewModel>
                </Modal>
            </FormProvider>
        );
    }
;
