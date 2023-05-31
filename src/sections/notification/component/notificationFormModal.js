import { ButtonDS, SwitchStatusDS } from "@/components/DesignSystem";
import { Text, View } from "@/components/DesignSystem/FlexStyled";
import Iconify from "@/components/Iconify";
import RHFTinyEditor from "@/components/editor/RHFTinyEditor";
import { FormProvider, RHFTextField } from "@/components/hook-form";
import { Label } from "@/components/hook-form/style";
import { ButtonCancelStyle } from "@/sections/applicant/style";
import { ViewModel } from "@/utils/cssStyles";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Divider, Modal, styled, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useTheme } from "@mui/material/styles";
import {
  useGetNotifcationManagementQuery,
  useUpdateNotificationMutation
} from "@/sections/notification/NotificationManagementSlice";
import {
  convertNotificationType,
  convertNotificationTypeTitle,
  dataDefault,
  renderContent, renderDataDemo
} from "@/sections/notification/helper";
import NotificationResetModal from "@/sections/notification/component/notificationResetModal";

const PreviewNotification = styled(Box)(({theme}) => ({
  backgroundColor: theme.palette.common.bgrMaster,
  display: "flex",
  borderRadius: 6,
  padding: "16px 20px"
}));

const defaultValues = {
  id: undefined,
  title: undefined,
  content: undefined,
  isActive: undefined,
  notificationType: undefined
};
export const NotificationFormModal = ({data, show, onClose}) => {
  const isEditMode = !!data?.id;
  const theme = useTheme();
  const {enqueueSnackbar} = useSnackbar();
  // api
  const {data: preview} = useGetNotifcationManagementQuery({Id: data?.id}, {skip: !data?.id});
  const [updateForm] = useUpdateNotificationMutation();
  const [isDisabled, setIsDisabled] = useState(false);
  
  const [openReset, setOpenReset] = useState(false);
  // form
  const Schema = Yup.object().shape({
    id: Yup.string().required(),
    title: Yup.string().required("Chưa nhập tiêu đề thông báo"),
    content: Yup.string().required("Chưa nhập nội dung thông báo"),
    isActive: Yup.boolean(),
    notificationType: Yup.number(),
  });
  
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(Schema),
  });
  
  const {
    reset,
    setValue,
    handleSubmit,
    watch,
    formState: {isSubmitting},
  } = methods;
  
  // effect
  useEffect(() => {
    if (!show) {
      reset(defaultValues);
      setIsDisabled(false);
    }
  }, [show]);
  
  useEffect(() => {
    if (!isEditMode) return;
    if (!preview) return;
    setValue("id", preview?.id);
    setValue("title", preview?.title);
    setValue("content", renderContent(preview?.content, true));
    setValue("isActive", preview?.isActive);
    setValue("notificationType", preview?.notificationType);
  }, [isEditMode, preview]);
  
  const pressSave = handleSubmit(async (body) => {
    setIsDisabled(true);
    body.content = renderContent(body.content, false);
    if (isEditMode) {
      try {
        await updateForm(body).unwrap();
        enqueueSnackbar("Thực hiện thành công!", {
          autoHideDuration: 2000,
        });
        onClose();
      } catch (err) {
        enqueueSnackbar("Thực hiện thất bại!", {
          autoHideDuration: 1000,
          variant: "error",
        });
      }
    }
  });
  
  const resetData = () => {
    const item = dataDefault.find(item => item.notificationType === watch("notificationType"))
    setValue("title", item.title);
    setValue("content", renderContent(item.content, true));
  }
  
  return (
    <FormProvider methods={methods}>
      <Modal
        open={show}
        onClose={onClose}
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
              Chỉnh sửa thông báo
            </Text>
            <ButtonDS
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
            <View mb={28}>
              <Typography variant={"textSize13"} color={theme.palette.common.neutral500}>Ứng viên nhận được thông báo
                khi:</Typography>
              <Box mt={"4px"}>
                <Typography variant={"textSize18600"}
                            color={theme.palette.common.neutral800}>{convertNotificationTypeTitle(watch("notificationType"))}</Typography>
              </Box>
            </View>
            <View mb={28}>
              <Typography variant={"textSize13"} color={theme.palette.common.neutral500}>Kiểu thông báo:</Typography>
              <Box mt={"4px"}>
                <Typography variant={"textSize18600"}
                            color={theme.palette.common.neutral800}>{convertNotificationType(watch("notificationType"))}</Typography>
              </Box>
            </View>
            <View mb={28}>
              <Label required>Tiêu đề thông báo</Label>
              <RHFTextField
                name={"title"}
                placeholder="Nhập tiêu đề thông báo"
                maxLength={150}
              />
            </View>
            <View mb={28}>
              <Label>Nội dung thông báo</Label>
              <RHFTinyEditor
                name="content"
                enableTags={true}
                placeholder="Nhập nội dung thông báo..."
                toolbar={"menubutton selecttag | bold"}
                sx={{'> .tox-tinymce': {height: "180px !important"}}}
              />
            </View>
            <View mb={28}>
              <Label>Bản xem trước</Label>
              <PreviewNotification>
                <img alt={"iconIviec"} width={"32"} height={"32"} src="/assets/iconIviec.svg"/>
                <Box ml={"12px"} display={"flex"} flexDirection={"column"}>
                  <Typography variant={"textSize14600"}
                              color={theme.palette.common.neutral800}>{watch("title")}</Typography>
                  <Typography variant={"textSize12"} color={theme.palette.common.neutral700}>04/02/2023</Typography>
                  <Typography variant={"body2"} color={theme.palette.common.neutral700}>
                    <div dangerouslySetInnerHTML={{__html: renderDataDemo(watch("content"))}}/>
                  </Typography>
                </Box>
              </PreviewNotification>
            </View>
            <View mb={28} flex={"true"} flexrow={true} jcend={true}>
              <ButtonDS
                variant="text"
                tittle={"Đặt lại về mặc định"}
                onClick={() => setOpenReset(true)}
                sx={{
                  backgroundColor: theme.palette.common.white,
                  border: "1px solid " + theme.palette.common.neutral700,
                  color: theme.palette.common.neutral700,
                  '&:hover': {
                    backgroundColor: theme.palette.common.neutral100,
                  }
                }}
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
              tittle={"Lưu"}
              onClick={pressSave}
              isDisabled={isDisabled}
            />
            <View width={8}/>
            <ButtonCancelStyle onClick={onClose}>Hủy</ButtonCancelStyle>
            <View width={8}/>
            <View flex="true"/>
            
            <SwitchStatusDS
              name={"isActive"}
              label={watch("isActive") ? "Đang hoạt động" : "Không hoạt động"}
            />
          </View>
        </ViewModel>
      </Modal>
      <NotificationResetModal open={openReset} setOpen={setOpenReset} onSuccess={resetData}/>
    </FormProvider>
  );
};
