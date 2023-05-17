import {ButtonDS, SwitchStatusDS} from "@/components/DesignSystem";
import {View, Text} from "@/components/DesignSystem/FlexStyled";
import Iconify from "@/components/Iconify";
import RHFTinyEditor from "@/components/editor/RHFTinyEditor";
import {FormProvider, RHFTextField} from "@/components/hook-form";
import {Label} from "@/components/hook-form/style";
import {ButtonCancelStyle} from "@/sections/applicant/style";
import {
    useCreateExamMutation,
    useUpdateExamMutation
} from "@/sections/exam/ExamSlice";
import {ViewModel} from "@/utils/cssStyles";
import {yupResolver} from "@hookform/resolvers/yup";
import {Divider, Modal} from "@mui/material";
import {useSnackbar} from "notistack";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import * as Yup from "yup";
import {useTheme} from "@mui/material/styles";


const defaultValues = {
    name: "",
    description: "",
    requirement: "",
    benefit: "",
    isActivated: true,
};
const theme = useTheme();
const ExamFormModal = ({data, show, onClose}) => {
    const isEditMode = !!data?.id;

    // api
    const [addForm] = useCreateExamMutation();
    const [updateForm] = useUpdateExamMutation();
    const [isDisabled, setIsDisabled] = useState(false);
    // form
    const Schema = Yup.object().shape({
        name: Yup.string().required("Chưa nhập tên đề thi"),
    });
    const methods = useForm({
        defaultValues,
        resolver: yupResolver(Schema),
    });
    const {
        reset,
        setValue,
        handleSubmit,
        formState: {isSubmitting},
    } = methods;

    const {enqueueSnackbar} = useSnackbar();
    const pressSave = handleSubmit(async (e) => {
        setIsDisabled(true);
        const param = {
            id: isEditMode ? data.id : 0,
            body: {
                name: e.name,
                description: e.description,
                requirement: e.requirement,
                benefit: e.benefit,
                isActivated: e.isActivated ? 1 : 0
            }
        };
        if (isEditMode) {
            try {
                await updateForm(param).unwrap();
                enqueueSnackbar("Thực hiện thành công!", {
                    autoHideDuration: 2000,
                });
                onClose();
            } catch (err) {
                setIsDisabled(false);
                if (err.status === "JPE_05") {
                    enqueueSnackbar("Đề thi đã tồn tại!", {
                        autoHideDuration: 1000,
                        variant: "error",
                    });
                } else {
                    enqueueSnackbar("Thực hiện thất bại!", {
                        autoHideDuration: 1000,
                        variant: "error",
                    });
                }
            }
        } else {
            try {
                await addForm(param.body).unwrap();
                enqueueSnackbar("Thực hiện thành công!", {
                    autoHideDuration: 1000,
                });
                onClose();
            } catch (err) {
                setIsDisabled(false);
                if (err.status === "JPE_05") {
                    enqueueSnackbar("Đề thi đã tồn tại!", {
                        autoHideDuration: 1000,
                        variant: "error",
                    });
                } else {
                    enqueueSnackbar("Thực hiện thất bại!", {
                        autoHideDuration: 1000,
                        variant: "error",
                    });
                }
            }
        }
    });

    // effect
    useEffect(() => {
        if (!show) {
            reset(defaultValues);
            setIsDisabled(false);
        }
    }, [show]);

    useEffect(() => {
        if (!isEditMode) return;
        setValue("name", data?.name);
        setValue("description", data?.description);
        setValue("requirement", data?.requirement);
        setValue("benefit", data?.benefit);
        setValue("isActivated", !!data?.isActivated);
    }, [isEditMode]);
    const isActivated = methods.watch("isActivated");
    return (
        <FormProvider methods={methods}>
            <Modal
                open={show}
                onClose={onClose}
                sx={{display: "flex", justifyContent: "flex-end"}}
            >
                <ViewModel>
                    {/* header */}
                    <View
                        flexrow="true"
                        atcenter="center"
                        pv={12}
                        ph={24}
                        bgcolor={theme.palette.common.white}
                    >
                        <Text flex="true" fontsize={16} fontweight={"600"}>
                            {isEditMode
                                ? "Chỉnh sửa đề thi"
                                : "Thêm mới đề thi"}
                        </Text>
                        <ButtonDS
                            type="submit"
                            sx={{
                                backgroundColor: theme.palette.background.paper,
                                boxShadow: "none",
                                ":hover": {
                                    backgroundColor: "#EFF3F7",
                                },
                                textTransform: "none",
                                padding: "12px",
                                minWidth: "unset",
                            }}
                            onClick={onClose}
                            icon={
                                <Iconify
                                    icon={"mi:close"}
                                    width={20}
                                    height={20}
                                    color={theme.palette.common.borderObject}
                                />
                            }
                        />
                    </View>
                    <Divider/>
                    {/* body */}

                    <View flex="true" p={24} pb={28} style={{overflowY: "scroll"}}>
                        {/* code & name */}

                        <View mb={24}>
                            <Label required>Tên đề thi</Label>
                            <RHFTextField
                                name={"name"}
                                placeholder="Nhập tên đề thi"
                                maxLength={150}
                            />
                        </View>

                        <Divider/>
                        {/* dept */}

                        {/* des */}
                        <View mt={28}>
                            <Label>Mô tả</Label>
                            <RHFTinyEditor
                                name="description"
                                placeholder="Nhập mô tả đề thi..."
                            />
                        </View>
                    </View>
                    {/* footer */}
                    <View
                        flexrow="true"
                        pv={16}
                        ph={24}
                        boxshadow={"inset 0px 1px 0px #EBECF4"}
                    >
                        <ButtonDS
                            type="submit"
                            loading={isSubmitting}
                            variant="contained"
                            tittle={isEditMode ? "Lưu" : "Thêm"}
                            onClick={pressSave}
                            isDisabled={isDisabled}
                        />
                        <View width={8}/>
                        <ButtonCancelStyle onClick={onClose}>Hủy</ButtonCancelStyle>
                        <View width={8}/>
                        <View flex="true"/>

                        <SwitchStatusDS
                            name={"isActivated"}
                            label={isActivated ? "Đang hoạt động" : "Không hoạt động"}
                        />
                    </View>
                </ViewModel>
            </Modal>
        </FormProvider>
    );
};
export default React.memo(ExamFormModal);
