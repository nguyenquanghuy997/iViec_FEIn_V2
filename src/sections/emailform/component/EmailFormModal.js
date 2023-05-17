import {
  useAddEmailTemplateMutation,
  useUpdateEmailTemplateMutation,
} from "../EmailFormSlice";
import CropImage from "./crop-image/CropImage";
import RHFEmailEditor from "./editor/RHFEmailEditor";
import { ButtonDS } from "@/components/DesignSystem";
import { Text, View } from "@/components/DesignSystem/FlexStyled";
import Iconify from "@/components/Iconify";
import { RHFCheckbox, RHFSwitch, RHFTextField } from "@/components/hook-form";
import { LabelStyle } from "@/components/hook-form/style";
import { ButtonCancelStyle } from "@/sections/applicant/style";
import PreviewEmail from "@/sections/emailform/component/PreviewEmail";
import { ViewModel } from "@/utils/cssStyles";
import { getFileUrl } from "@/utils/helper";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  CircularProgress,
  Divider,
  FormHelperText,
  Grid,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";

const defaultValues = {
  id: undefined,
  name: undefined,
  content: undefined,
  signatureLogo: undefined,
  signatureContent: undefined,
  templateOrganizationType: undefined,
  isDefaultSignature: undefined,
  isActive: undefined,
};

const EmailFormModal = ({ isOpen, type, data, title, onClose }) => {
  // props
  const isEditMode = !!data?.id;
  const isLoading = isEditMode && !data?.id;

  // other
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  // api
  const [addForm] = useAddEmailTemplateMutation();
  const [updateForm] = useUpdateEmailTemplateMutation();

  // state
  const [isOpenPreview, setIsOpenPreview] = useState(false);

  // form
  const Schema = Yup.object().shape({
    id: Yup.string(),
    name: Yup.string().required("Tên mẫu email không được bỏ trống"),
    content: Yup.string().required("Nội dung email không được bỏ trống"),
    signatureLogo: Yup.string().required("Logo chữ ký không được bỏ trống"),
    signatureContent: Yup.string().required(
      "Nội dung chữ ký không được bỏ trống"
    ),
    templateOrganizationType: Yup.number(),
    isDefaultSignature: Yup.boolean(),
    isActive: Yup.boolean(),
  });

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(Schema),
  });

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  // effect
  useEffect(() => {
    setValue("templateOrganizationType", type);
  }, [type]);

  useEffect(() => {
    if (!data?.id) return;

    setValue("id", data.id);
    setValue("name", data.name);
    setValue("content", data.content);
    setValue("signatureLogo", data.signatureLogo);
    setValue("signatureContent", data.signatureContent);
    setValue("isDefaultSignature", data.isDefaultSignature);
    setValue("isActive", data.isActive);
  }, [data]);

  // handle
  const handleOpenPreviewEmail = () => {
    setIsOpenPreview(true);
  };

  const handleClosePreviewEmail = () => {
    setIsOpenPreview(false);
  };

  const handleSetSignatureLogo = (e) => {
    setValue("signatureLogo", e.fileTemplates[0].path);
  };

  const pressSave = handleSubmit(async (body) => {
    await (isEditMode ? updateForm : addForm)(body)
      .unwrap()
      .then(() => {
        enqueueSnackbar("Thực hiện thành công!", {
          autoHideDuration: 2000,
        });
        onClose();
      })
      .catch(() => {
        enqueueSnackbar("Thực hiện thất bại!", {
          autoHideDuration: 1000,
          variant: "error",
        });
      });
  });

  return (
    <>
      <FormProvider {...methods}>
        <Modal
          open={isOpen}
          onClose={onClose}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <ViewModel
            sx={{
              width: "unset",
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <View>
              <View
                flexrow="true"
                atcenter="center"
                pv={12}
                ph={24}
                bgcolor={theme.palette.background.whiteBg}
              >
                <Text flex="true" fontsize={16} fontweight={"600"}>
                  {title}
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
                  onClick={onClose}
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
              <Divider />
            </View>
            <View
              style={{
                minWidth: "800px",
                overflow: "hidden",
                flex: 1,
              }}
            >
              {isLoading ? (
                <View flex="true" contentcenter="true">
                  <CircularProgress />
                </View>
              ) : (
                <Grid
                  container
                  sx={{ width: "800px", overflowY: "auto" }}
                  height={"100%"}
                  flexWrap={"nowrap"}
                  flexDirection={"column"}
                >
                  <Grid item p={3}>
                    <Grid mb={3}>
                      <RHFTextField
                        name="name"
                        title="Tên mẫu email"
                        placeholder="Nhập tên mẫu email"
                        isRequired
                      />
                    </Grid>
                    <Grid mb={3}>
                      <LabelStyle required={true}>Nội dung email</LabelStyle>
                      <RHFEmailEditor
                        name="content"
                        placeholder="Nhập nội dung email..."
                        showPreview
                        showUploadFile={true}
                        onOpenPreview={handleOpenPreviewEmail}
                        sx={{ width: "752px", minHeight: "370px" }}
                      />
                    </Grid>
                    <Grid mb={3}>
                      <Box
                        display={"flex"}
                        mb={2}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <LabelStyle sx={{ mb: "unset" }} required={true}>
                          Chữ ký email
                        </LabelStyle>
                        <RHFCheckbox
                          name="isDefaultSignature"
                          label="Đặt làm chữ ký mặc định"
                        />
                      </Box>
                      <Box display={"flex"}>
                        <Stack>
                          <CropImage
                            logo={watch("signatureLogo")}
                            handleSubmit={handleSetSignatureLogo}
                          />
                          <Typography
                            variant={"textSize13"}
                            sx={{ mt: 1 }}
                            color={theme.palette.text.secondary}
                          >
                            Logo công ty
                          </Typography>
                          {errors.signatureLogo && (
                            <FormHelperText
                              error
                              sx={{ textTransform: "capitalize" }}
                            >
                              {errors.signatureLogo.message}
                            </FormHelperText>
                          )}
                        </Stack>
                        <Box flex={1} pl={2}>
                          <RHFEmailEditor
                            name="signatureContent"
                            placeholder="Nhập chữ ký email..."
                            sx={{ minHeight: "230px" }}
                          />
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </View>
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
                  sx={{ mr: 1 }}
                  onClick={pressSave}
                />
                <ButtonCancelStyle onClick={onClose}>Hủy</ButtonCancelStyle>
              </View>
              <RHFSwitch
                name="isActive"
                label={watch("isActive") ? "Áp dụng" : "Không áp dụng"}
              />
            </View>
          </ViewModel>
        </Modal>
      </FormProvider>
      {isOpenPreview && (
        <PreviewEmail
          isOpen={isOpenPreview}
          onClose={handleClosePreviewEmail}
          title={watch("title")}
          content={watch("content")}
          signature={watch("signatureContent")}
          logo={getFileUrl(watch("signatureLogo"))}
        />
      )}
    </>
  );
};

export default React.memo(EmailFormModal);
