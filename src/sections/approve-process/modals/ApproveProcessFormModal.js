import { ButtonDS, SwitchStatusDS, TextAreaDS } from "@/components/DesignSystem";
import { Text, View } from "@/components/DesignSystem/FlexStyled";
import Iconify from "@/components/Iconify";
import { RHFTextField } from "@/components/hook-form";
import { Label } from "@/components/hook-form/style";
import {
  useAddApproveProcessMutation,
  useGetPreviewApproveProcessQuery,
  useUpdateApproveProcessMutation
} from "@/sections/approve-process/ApproveProcessSlice";
import { ViewModel } from "@/utils/cssStyles";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, CircularProgress, Divider, Grid, IconButton, Modal, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import * as Yup from "yup";
import { ButtonCancelStyle } from "@/sections/applicant/style";
import { MinusIcon } from "@/assets/ActionIcon";
import { ApproveProcessFormLevelItem } from "@/sections/approve-process/Items/ApproveProcessFormLevelItem";
import { styled } from "@mui/styles";
import { formatDataGet, formatDataPush, getNumberUser } from "@/sections/approve-process/config";
import ApproveProcessDialog from "@/sections/approve-process/ApproveProcessDialog";
import { useTheme } from "@mui/material/styles";
import { RiTimerFlashLine } from "react-icons/ri";

const defaultValues = {
  name: undefined,
  description: undefined,
  approvalProcessType: undefined,
  isAvailable: false,
  isApprovalAuto: false,
  approvalProcessLevels: [
    {
      approvalProcessLevelDetails: [
        {
          roleGroupId: undefined,
          personInChargeIds: [],
          processLevelDetailType: undefined
        }
      ],
      autoApprovedTime: undefined
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

const ButtonAddInviteStyle = styled(Button)(({theme}) => ({
  "&.button-add-invite": {
    ...ButtonStyle,
    backgroundColor: theme.palette.common.white,
    border: '1px solid ' + theme.palette.common.blue700,
    width: '100%',
    color: theme.palette.common.blue700,
    ":hover": {
      color: theme.palette.common.neutral700,
      backgroundColor: theme.palette.common.white,
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
    const theme = useTheme();
    // form
    const Schema = Yup.object().shape({
      name: Yup.string().required("Chưa nhập tên quy trình phê duyệt").max(150, "Tên quy trình không dài quá 150 ký tự"),
      description: Yup.string(),
      isAvailable: Yup.bool(),
      isApprovalAuto: Yup.bool(),
      approvalProcessLevels: Yup.array().of(
        Yup.object().shape({
          approvalProcessLevelDetails: Yup.array().of(
            Yup.object().shape({
              processLevelDetailType: Yup.string().required("Chưa chọn loại vai trò"),
              roleGroupId: Yup.string().when("processLevelDetailType", {
                is: "0",
                then: (schema) => schema.required("Chưa chọn nhóm phê duyệt")
              }),
              personInChargeIds: Yup.lazy(val => (Array.isArray(val) ? Yup.array().min(1, "Chưa chọn người phê duyệt") : Yup.string().required("Chưa chọn người phê duyệt"))),
            })
          ),
          autoApprovedTimeInHours: Yup.string().transform((value) => (isNaN(value) ? undefined : value)).nullable()
        })
      ).when("isApprovalAuto", {
        is: true,
        then: Yup.array().of(
          Yup.object().shape({
            autoApprovedTimeInHours: Yup.string().transform((value) => (isNaN(value) ? undefined : value)).required("Chưa nhập thời gian tự động phê duyệt")
          })
        )
      }),
    });
    
    const methods = useForm({
      defaultValues,
      resolver: yupResolver(Schema),
    });
    
    const {
      reset,
      control,
      watch,
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
        setValue("isApprovalAuto", false);
      }
    }, [show]);
    
    useEffect(() => {
      if (!data?.id) return;
      let body = preview;
      body = formatDataGet(body);
      setValue("name", body.name);
      setValue("description", body.description);
      setValue("isAvailable", body.isAvailable);
      setValue("isApprovalAuto", body.isApprovalAuto);
      setValue("approvalProcessLevels", body.approvalProcessLevels);
    }, [isEditMode, data, preview]);
    
    return (
      <FormProvider {...methods}>
        <Modal
          open={show}
          onClose={pressHide}
          sx={{display: "flex", justifyContent: "flex-end", ".MuiModal-backdrop": {background: "rgba(9, 30, 66, 0.25)"}}}
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
                  ? `Chỉnh sửa ${title.toLowerCase()}`
                  : `Thêm mới ${title.toLowerCase()}`}
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
                onClick={pressHide}
                icon={
                  <Iconify
                    icon={"mi:close"}
                    width={20}
                    height={20}
                    color={theme.palette.common.neutral600}
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
                    height={90}
                    placeholder="Nhập nội dung mô tả..."
                    name={"description"}
                  />
                </View>
                <View mb={24}>
                  <SwitchStatusDS
                    name={"isApprovalAuto"}
                    colorLabel={theme.palette.text.primary}
                    label={<Typography variant={"body1"}>Phê duyệt tự động</Typography>}
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                        backgroundColor: theme.palette.common.blue200,
                      },
                      "& .MuiSwitch-switchBase.Mui-checked .MuiSwitch-thumb": {
                        backgroundColor: theme.palette.common.blue700,
                      },
                    }}
                  />
                  <Typography variant={"body2"} color={theme.palette.text.search}>
                    Hệ thống sẽ tự động phê duyệt tin tuyển dụng sau khoảng thời gian đã được cài đặt
                  </Typography>
                </View>
                <Divider sx={{mt: 1, mb: 3}}/>
                {fields.map((item, index) => {
                  return (<View
                    style={{
                      marginBottom: 24,
                      borderRadius: 6,
                      border: '1.5px solid ' + theme.palette.common.neutral200,
                    }}
                    key={item.id}>
                    <Grid container direction="row"
                          justifyContent="center"
                          alignItems="center"
                          p={2}
                          sx={{
                            backgroundColor: theme.palette.background.MasterBg,
                            borderTopLeftRadius: '6px',
                            borderTopRightRadius: '6px'
                          }}
                    >
                      <Grid item xs>
                        <Typography variant="subtitle1">
                          Cấp {index + 1}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="textSize13500">
                          Đã chọn: {getNumberUser(watch(`approvalProcessLevels.${index}.approvalProcessLevelDetails`))}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        {watch("isApprovalAuto") &&
                          <RHFTextField
                            name={`approvalProcessLevels.${index}.autoApprovedTimeInHours`}
                            placeholder="Nhập số"
                            type={"number"}
                            startIcon={<RiTimerFlashLine size={20}/>}
                            endIcon={"Giờ"}
                            sx={{backgroundColor: theme.palette.common.white}}
                          />
                        }
                      </Grid>
                      <Grid item xs={2} container direction="row" justifyContent="flex-end">
                        {fields.length > 1 &&
                          <IconButton onClick={() => setOpenDialogConfirm(true)}>
                            <MinusIcon/>
                          </IconButton>
                        }
                      </Grid>
                    </Grid>
                    <Box className="box-content-wrapper" p={2} sx={{width: '100%'}}>
                      <ApproveProcessFormLevelItem
                        isEditMode={isEditMode}
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
              jcbetween="true"
              pv={12}
              ph={16}
              boxshadow={"inset 0px 1px 0px #EBECF4"}
            >
              <View flexrow="true">
                <ButtonDS
                  type="submit"
                  loading={isSubmitting}
                  variant="contained"
                  tittle={"Lưu"}
                  onClick={pressSave}
                />
                <ButtonCancelStyle onClick={pressHide}>Hủy</ButtonCancelStyle>
              </View>
              {!isLoading ? (
                <SwitchStatusDS
                  name={"isAvailable"}
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
