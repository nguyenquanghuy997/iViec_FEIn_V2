import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { isEmpty } from "lodash";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, CircularProgress, Divider, Grid, IconButton, Modal, Stack, Typography } from "@mui/material";
import { RHFCheckbox, RHFSwitch, RHFTextField } from "@/components/hook-form";
import { ButtonCancelStyle } from "@/sections/applicant/style";
import Iconify from "@/components/Iconify";
import { ButtonDS } from "@/components/DesignSystem";
import { EMAIL_ACCOUNT_EDITOR_DEFAULT_TEXT } from "@/sections/emailform/config/EditorConfig";
import { useTheme } from "@mui/material/styles";
import RHFEmailEditor from "@/sections/offer-form/component/editor/RHFEmailEditor";
import { LabelStyle } from "@/components/hook-form/style";
import CropImage from "@/sections/emailform/component/crop-image/CropImage";
import PreviewEmail from "@/sections/emailform/component/PreviewEmail";
import { styled } from "@mui/styles";
import { DeleteIcon } from "@/assets/ActionIcon";
import { calcFileSize, showIconByFileType } from "@/utils/function";
import { DOMAIN_SERVER_API } from "@/config";
import { ViewModel } from "@/utils/cssStyles";
import { Text, View } from "@/components/DesignSystem/FlexStyled";
import { useGetPreviewOfferTemplateQuery } from "@/sections/offer-form/OfferFormSlice";

const BoxItemFileStyle = styled(Box)(({theme}) => ({
  '&.file-upload-item': {
    marginRight: theme.spacing(2),
    marginBottom: 8,
    padding: theme.spacing(1, 2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: '1px solid #B9BFC9',
    borderRadius: 6,
  }
}));

const defaultEmailEditorConfig = EMAIL_ACCOUNT_EDITOR_DEFAULT_TEXT();

const defaultValues = {
  id: undefined,
  name: undefined,
  title: undefined,
  content: defaultEmailEditorConfig.contentEmail,
  signatureLogo: undefined,
  signatureContent: defaultEmailEditorConfig.contentSignature,
  isDefaultSignature: undefined,
  isDefault: undefined,
  isActive: undefined,
  attachFiles: undefined,
};

const renderFileUploadItem = (file, index, removeFileUpload) => {
  if (!file) return;
  let fileType = file.name.slice(file.name.lastIndexOf('.'));
  return (
    <BoxItemFileStyle className="file-upload-item" key={index}>
      {showIconByFileType(fileType)}
      <Stack sx={{mx: 1}}>
        <Typography
          sx={{
            color: '#455570',
            fontSize: 13,
            fontWeight: 600,
            whiteSpace: "nowrap",
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '125px',
          }}>{file.name}</Typography>
        <Typography sx={{color: '#455570', fontSize: 12, fontWeight: 400}}>{calcFileSize(file.size)}</Typography>
      </Stack>
      <IconButton
        size='small'
        sx={{color: '#1976D2', mx: 0.5}}
        onClick={() => {
          removeFileUpload(index)
        }}
      ><DeleteIcon/></IconButton>
    </BoxItemFileStyle>
  )
}
const OfferFormModal = ({isOpen, onClose, item, title}) => {
  const theme = useTheme();
  const isEditMode = !!item?.id;
  let {data: preview = {}} = useGetPreviewOfferTemplateQuery(
    {applicantId: item?.id},
    {skip: !item?.id}
  );
  const isLoading = isEditMode && !preview?.id;
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [fileList, setFileList] = useState([]);
  
  const handleFileChange = (e) => {
    setFileList(prev => [...prev, ...e.target.files]);
  };
  
  const removeFileUpload = (index) => {
    const newFileList = [...fileList].filter((item, idx) => idx !== index);
    setFileList(newFileList);
  }
  
  const Schema = Yup.object().shape({
    name: Yup.string().required("Tên mẫu mời nhận việc không được bỏ trống"),
    title: Yup.string().required("Tiêu đề mail không được bỏ trống"),
    content: Yup.string().required("Nội dung mail không được bỏ trống"),
    signatureLogo: Yup.string().required("Logo chữ ký không được bỏ trống"),
    signatureContent: Yup.string().required("Nội dung chữ ký không được bỏ trống"),
    isDefaultSignature: Yup.boolean(),
    isDefault: Yup.boolean(),
    isActive: Yup.boolean(),
    attachFiles: Yup.array().of(Yup.string()),
  });
  
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(Schema),
  });
  
  const {watch, setValue, handleSubmit, formState: {isSubmitting}} = methods;
  
  const watchIsActive = watch('isActive');
  const watchTitle = watch('title');
  const watchContent = watch('contentEmail');
  const watchSignature = watch('contentSignature');
  
  const handleOpenPreviewEmail = () => {
    setIsOpenPreview(true);
  };
  
  const handleClosePreviewEmail = () => {
    setIsOpenPreview(false);
  }
  
  const handleSetSignatureLogo = (e) => {
    setValue("signatureLogo", e);
  };
  
  const pressSave = handleSubmit(async (body) => {
    return body
  });
  
  return (
    <>
      <FormProvider {...methods}>
        <Modal
          open={isOpen}
          onClose={onClose}
          sx={{display: "flex", justifyContent: "flex-end"}}
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
              <Divider/>
            </View>
            <View
              style={{
                minWidth: "800px",
                overflow: "hidden",
                flex: 1
              }}
            >
              {isLoading ? (
                <View flex="true" contentcenter="true">
                  <CircularProgress/>
                </View>
              ) : (
                <Grid
                  container
                  sx={{width: "800px", overflowY: "auto"}}
                  height={"100%"}
                  flexWrap={"nowrap"}
                  flexDirection={"column"}
                >
                  <Grid item p={3}>
                    <Grid mb={3}>
                      <RHFTextField
                        name="name"
                        title="Tên mẫu mời nhận việc"
                        placeholder="Nhập tên mẫu mời nhận việc"
                        isRequired
                      />
                    </Grid>
                    <Grid mb={3}>
                      <RHFTextField
                        name="title"
                        title="Tiêu đề mail"
                        placeholder="Nhập tiêu đề mail"
                        isRequired
                      />
                    </Grid>
                    <Grid mb={3}>
                      <LabelStyle required={true}>
                        Nội dung email
                      </LabelStyle>
                      <Box display={"flex"} sx={{overflowX: 'auto'}}>
                        {!isEmpty(fileList) && fileList.map((file, index) => renderFileUploadItem(file, index, removeFileUpload))}
                      </Box>
                      <RHFEmailEditor
                        name="contentEmail"
                        placeholder="Nhập nội dung email..."
                        showPreview
                        showUploadFile={true}
                        handleFileChange={handleFileChange}
                        onOpenPreview={handleOpenPreviewEmail}
                        sx={{width: '752px', minHeight: '370px'}}
                      />
                    </Grid>
                    <Grid mb={3}>
                      <Box display={"flex"} mb={2} justifyContent={"space-between"} alignItems={"center"}>
                        <LabelStyle sx={{mb: 'unset'}} required={true}>
                          Chữ ký email
                        </LabelStyle>
                        <RHFCheckbox name='isDefault' label='Đặt làm chữ ký mặc định'/>
                      </Box>
                      <Box display={"flex"}>
                        <Stack>
                          <CropImage data={''} handleSubmit={handleSetSignatureLogo}/>
                          <Typography variant={"textSize13"} sx={{mt: 1}} color={theme.palette.text.secondary}>
                            Logo công ty
                          </Typography>
                        </Stack>
                        <Box flex={1} pl={2}>
                          <RHFEmailEditor
                            name="contentSignature"
                            placeholder="Nhập nội dung email..."
                            sx={{minHeight: '230px'}}
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
                  sx={{mr: 1}}
                  onClick={pressSave}
                />
                <ButtonCancelStyle onClick={onClose}>Hủy</ButtonCancelStyle>
              </View>
              <RHFSwitch
                name="isActive"
                label={watchIsActive ? 'Áp dụng' : 'Không áp dụng'}
              />
            </View>
          </ViewModel>
        </Modal>
      </FormProvider>
      {isOpenPreview && <PreviewEmail
        isOpen={isOpenPreview}
        onClose={handleClosePreviewEmail}
        title={watchTitle}
        content={watchContent}
        signature={watchSignature}
        logo={DOMAIN_SERVER_API + '/Image/GetImage?imagePath=01000000-ac12-0242-b3cd-08db10c50f70/20230224082523894.png'}
      />}
    </>
  )
}

export default React.memo(OfferFormModal);