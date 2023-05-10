import { ButtonDS } from "@/components/DesignSystem";
import Iconify from "@/components/Iconify";
import Scrollbar from "@/components/Scrollbar";
import {
  FormProvider,
  RHFCheckbox,
  RHFSwitch,
  RHFTextField,
} from "@/components/hook-form";
import { LabelStyle } from "@/components/hook-form/style";
import { DOMAIN_SERVER_API } from "@/config";
import { ButtonCancelStyle } from "@/sections/applicant/style";
import { useGetCompanyInfoQuery } from "@/sections/companyinfor/companyInforSlice";
import PreviewEmail from "@/sections/emailform/component/PreviewEmail";
import CropImage from "@/sections/emailform/component/crop-image/CropImage";
import RHFEmailEditor from "@/sections/emailform/component/editor/RHFEmailEditor";
import { EMAIL_ACCOUNT_EDITOR_DEFAULT_TEXT } from "@/sections/emailform/config/EditorConfig";
import {
  BoxFlex,
  EmailFormFooterStyle,
  EmailFormHeadStyle,
} from "@/sections/emailform/style";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const InputStyle = {
  minHeight: 44,
  minWidth: 752,
  marginBottom: 24,
};
const FormModal = ({ isOpen, onClose, item, title, showUploadFile }) => {
  const theme = useTheme();

  const reactQuillContentRef = useRef(null);
  const reactQuillSignatureRef = useRef(null);

  const { data: info } = useGetCompanyInfoQuery();

  const [logo, setLogo] = useState("");
  const [isOpenPreview, setIsOpenPreview] = useState(false);

  const defaultValues = useMemo(() => {
    const primaryMainColor = theme.palette.primary.main;
    const defaultEmailEditorConfig =
      EMAIL_ACCOUNT_EDITOR_DEFAULT_TEXT(primaryMainColor);
    const {
      title = "",
      contentEmail = defaultEmailEditorConfig.contentEmail,
      contentSignature = defaultEmailEditorConfig.contentSignature,
      isActive = true,
    } = item || {};
    return {
      title,
      contentEmail,
      contentSignature,
      isActive,
    };
  }, [item, theme]);

  const Schema = Yup.object().shape({
    name: Yup.string().required("Tên mẫu email không được bỏ trống"),
  });

  const methods = useForm({
    mode: "all",
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const {
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const watchIsActive = watch("isActive");
  const watchTitle = watch("title");
  const watchContent = watch("contentEmail");
  const watchSignature = watch("contentSignature");

  const handleOpenPreviewEmail = () => {
    setIsOpenPreview(true);
  };

  const handleClosePreviewEmail = () => {
    setIsOpenPreview(false);
  };

  const onSubmit = async (data) => {
    return data;
  };

  useEffect(() => {
    setLogo(info?.organizationInformation?.avatar || "");
  }, [info]);

  return (
    <>
      <Drawer
        open={isOpen}
        onClose={onClose}
        anchor="right"
        PaperProps={{
          sx: {
            width: { xs: 1, sm: 560, md: 800 },
            boxShadow:
              "-3px 0px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)",
          },
        }}
      >
        <Scrollbar sx={{ zIndex: 9999, "& label": { zIndex: 0 } }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <EmailFormHeadStyle className="email-form-head">
              <Typography
                variant="body1"
                sx={{ fontSize: "16px", fontWeight: 600, color: "#455570" }}
              >
                {title}
              </Typography>
              <IconButton size="small" onClick={onClose}>
                <Iconify icon="ic:baseline-close" />
              </IconButton>
            </EmailFormHeadStyle>
            <Divider />
            {/* content form */}

            <Box sx={{ py: 2, px: 2, my: 8, minWidth: "800px" }}>
              <RHFTextField
                name="title"
                title="Tên mẫu email"
                placeholder="Nhập tên mẫu email"
                isRequired
                style={{ ...InputStyle }}
              />
              <RHFEmailEditor
                title="Nội dung email"
                style={{ ...InputStyle }}
                defaultValue={item?.content || "Default value"}
                name="contentEmail"
                placeholder="Nhập nội dung email..."
                showPreview
                showUploadFile={showUploadFile}
                onOpenPreview={handleOpenPreviewEmail}
                sx={{ width: "752px", minHeight: "370px" }}
                ref={reactQuillContentRef}
              />

              <Box sx={{ marginTop: 2, marginBottom: 2 }}>
                <BoxFlex>
                  <LabelStyle>Chữ ký email</LabelStyle>
                  <RHFCheckbox
                    name="isDefault"
                    label="Đặt làm chữ ký mặc định"
                  />
                </BoxFlex>
              </Box>

              {/* Logo & Signature  */}
              <BoxFlex alignItems="flex-start">
                <Stack>
                  <CropImage id={info?.id} logo={logo} handleSubmit={setLogo} />
                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 400,
                      color: "#5C6A82",
                      mt: 2,
                    }}
                  >
                    Logo công ty
                  </Typography>
                </Stack>
                <Box>
                  <RHFEmailEditor
                    style={{ ...InputStyle }}
                    defaultValue={item?.content || "Default value"}
                    name="contentSignature"
                    placeholder="Nhập nội dung email..."
                    sx={{ width: "596px", minHeight: "230px" }}
                    ref={reactQuillSignatureRef}
                  />
                </Box>
              </BoxFlex>
            </Box>

            {/* end content form */}
            <EmailFormFooterStyle className="email-form-footer">
              <Stack flexDirection="row">
                <ButtonDS
                  type="submit"
                  loading={isSubmitting}
                  variant="contained"
                  tittle="Lưu"
                />
                <ButtonCancelStyle onClick={onClose}>Hủy</ButtonCancelStyle>
              </Stack>
              <Stack>
                <RHFSwitch
                  name="isActive"
                  label={watchIsActive ? "Áp dụng" : "Không áp dụng"}
                />
              </Stack>
            </EmailFormFooterStyle>
          </FormProvider>
        </Scrollbar>
      </Drawer>
      {isOpenPreview && (
        <PreviewEmail
          isOpen={isOpenPreview}
          logo={`${DOMAIN_SERVER_API}/Image/GetImage?imagePath=${logo}`}
          title={watchTitle}
          content={watchContent}
          signature={watchSignature}
          onClose={handleClosePreviewEmail}
        />
      )}
    </>
  );
};

export default React.memo(FormModal);
