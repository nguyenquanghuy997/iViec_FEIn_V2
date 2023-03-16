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
import React, {useEffect} from "react";
import {useFieldArray, useForm} from "react-hook-form";
import * as Yup from "yup";
import {ButtonCancelStyle} from "@/sections/applicant/style";
import {MinusIcon} from "@/assets/ActionIcon";
import {ApproveProcessFormLevelItem} from "@/sections/approve-process/Items/ApproveProcessFormLevelItem";
import {styled} from "@mui/styles";

const defaultValues = {
    name: "",
    description: "",
    approvalProcessType: 0,
    isAvailable: true,
    approvalProcessLevels: [
        {
            approvalProcessLevelDetails: [
                {
                    roleGroupId: "",
                    personInChargeIds: [],
                    personInChargeId: "",
                    processLevelDetailType: ""
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

export const ApproveProcessFormModal = ({type, title, data, show, setShow, onRefreshData}) => {
    const isEditMode = !!data?.id;
    // api
    const [addForm] = useAddApproveProcessMutation();
    const [updateForm] = useUpdateApproveProcessMutation();
    const {data: {items: preview = {}} = {}} = useGetPreviewApproveProcessQuery({Id: data?.id}, {skip: !data?.id});
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
                        roleGroupId: Yup.string().required("Chưa chọn nhóm phê duyệt"),
                        processLevelDetailType: Yup.string().required("Chưa chọn loại vai trò"),
                        personInChargeIds: Yup.array().when('processLevelDetailType', {is: "0", then: Yup.array().min(1, "Chưa chọn người phê duyệt")}),
                        personInChargeId: Yup.string().when('processLevelDetailType', {is: "1", then: Yup.string().required("Chưa chọn người phê duyệt")})
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
        setShow(false);
    };
    const {enqueueSnackbar} = useSnackbar();
    const pressSave = handleSubmit(async (e) => {
        const body = {
            id: isEditMode ? data.id : 0,
            name: e.name,
            description: e.description,
            approvalProcessType: type,
            isAvailable: e.isAvailable,
            approvalProcessLevels: e.approvalProcessLevels
        };

        if (isEditMode) {
            try {
                await updateForm(body).unwrap();
                enqueueSnackbar("Thực hiện thành công!", {
                    autoHideDuration: 2000,
                });
                pressHide();
                onRefreshData();
            } catch (err) {
                enqueueSnackbar("Thực hiện thất bại!", {
                    autoHideDuration: 1000,
                    variant: "error",
                });
            }
        } else {
            try {
                await addForm(body).unwrap();
                debugger
                enqueueSnackbar("Thực hiện thành công!", {
                    autoHideDuration: 1000,
                });
                pressHide();
                onRefreshData();
            } catch (err) {
                debugger
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
            setValue("isAvailable", true);
            return;
        }

        if (!isEditMode) return;


    }, [show]);

    useEffect(() => {
        if (!preview.id) return;
        setValue("name", preview.name);
        setValue("description", preview.description);
        setValue("isAvailable", !!preview.isAvailable);
    }, [isEditMode, preview.id]);

    const isAvailable = methods.watch("isAvailable");
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
                            {/*<ApproveProcessFormLevel objecValue={defaultValues.approvalProcessLevels}/>*/}
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
                                                Đã chọn: 12
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={9} container direction="row" justifyContent="flex-end">
                                            <IconButton onClick={() => remove(index)}>
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
                        {isLoading ? null : (
                            <SwitchStatusDS
                                name={"isAvailable"}
                                label={isAvailable ? "Đang hoạt động" : "Ngừng hoạt động"}
                            />
                        )}
                    </View>
                </ViewModel>
            </Modal>
        </FormProvider>
    );
};
