import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { isEmpty } from "lodash";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  CircularProgress,
  Divider,
  FormHelperText,
  Grid,
  IconButton,
  Modal,
  Stack,
  Typography
} from "@mui/material";
import { RHFCheckbox, RHFSwitch, RHFTextField } from "@/components/hook-form";
import { ButtonCancelStyle } from "@/sections/applicant/style";
import Iconify from "@/components/Iconify";
import { ButtonDS } from "@/components/DesignSystem";
import { useTheme } from "@mui/material/styles";
import RHFEmailEditor from "@/sections/offer-form/component/editor/RHFEmailEditor";
import { LabelStyle } from "@/components/hook-form/style";
import PreviewEmail from "@/sections/emailform/component/PreviewEmail";
import { styled } from "@mui/styles";
import { DeleteIcon } from "@/assets/ActionIcon";
import { calcFileSize, showIconByFileType } from "@/utils/function";
import { ViewModel } from "@/utils/cssStyles";
import { Text, View } from "@/components/DesignSystem/FlexStyled";
import {
  useAddOfferTemplateMutation, useGetDefaultOfferTemplateQuery,
  useGetPreviewOfferTemplateQuery,
  useUpdateOfferTemplateMutation,
  useUploadImageOfferMutation
} from "@/sections/offer-form/OfferFormSlice";
import { useSnackbar } from "notistack";
import CropImage from "@/sections/offer-form/component/crop-image/CropImage";
import { getFileUrl } from "@/utils/helper";
import useAuth from "@/hooks/useAuth";

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
const defaultValues = {
  id: undefined,
  name: undefined,
  title: undefined,
  content: undefined,
  signatureLogo: undefined,
  signatureContent: undefined,
  isDefaultSignature: undefined,
  isActive: undefined,
  templateAttachFiles: undefined,
};
export const renderFileUploadItem = (file, index, removeFileUpload, displayButtonDelete) => {
  if (!file) return;
  let fileType = file.name.slice(file.name.lastIndexOf('.'));
  const theme= useTheme();
  
  return (
    <BoxItemFileStyle className="file-upload-item" key={index}>
      {showIconByFileType(fileType)}
      <Stack sx={{mx: 1}}>
        <Typography
          sx={{
            color: theme.palette.common.neutral700,
            fontSize: 13,
            fontWeight: 600,
            whiteSpace: "nowrap",
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '125px',
          }}>{file.name}</Typography>
        <Typography sx={{color: theme.palette.common.neutral700, fontSize: 12, fontWeight: 400}}>{calcFileSize(file.size)}</Typography>
      </Stack>
      {!displayButtonDelete &&
        <IconButton
          size='small'
          sx={{color: theme.palette.common.blue700, mx: 0.5}}
          onClick={() => {
            removeFileUpload(index)
          }}
        ><DeleteIcon/></IconButton>
      }
    </BoxItemFileStyle>
  )
}
const OfferFormModal = ({isOpen, onClose, item, title}) => {
  const theme = useTheme();
  const auth = useAuth();
  const isEditMode = !!item?.id;
  const {data: preview = {}} = useGetPreviewOfferTemplateQuery(
    {Id: item?.id},
    {skip: !item?.id}
  );
  const {data: dataDefault} = useGetDefaultOfferTemplateQuery(
    {OrganizationId: auth.user.organizationId},
    {skip: item?.id}
  );
  const [addForm] = useAddOfferTemplateMutation();
  const [updateForm] = useUpdateOfferTemplateMutation();
  const [uploadFiles] = useUploadImageOfferMutation();
  const isLoading = isEditMode && !preview?.id;
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [fileList, setFileList] = useState([]);
  const {enqueueSnackbar} = useSnackbar();
  const handleFileChange = (e) => {
    setFileList(prev => [...prev, ...e.target.files]);
  };
  
  const removeFileUpload = (index) => {
    const newFileList = [...fileList].filter((item, idx) => idx !== index);
    setFileList(newFileList);
  }
  
  const Schema = Yup.object().shape({
    id: Yup.string(),
    name: Yup.string().required("Tên mẫu mời nhận việc không được bỏ trống"),
    title: Yup.string().required("Tiêu đề mail không được bỏ trống"),
    content: Yup.string().required("Nội dung mail không được bỏ trống"),
    signatureLogo: Yup.string().required("Logo chữ ký không được bỏ trống"),
    signatureContent: Yup.string().required("Nội dung chữ ký không được bỏ trống"),
    isDefaultSignature: Yup.boolean(),
    isActive: Yup.boolean(),
    templateAttachFiles: Yup.array().of(Yup.string()),
  });
  
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(Schema),
  });
  
  const {watch, setValue, handleSubmit, formState: {isSubmitting, errors}} = methods;
  
  useEffect(() => {
    if (!item?.id) return;
    setValue("id", preview.id);
    setValue("name", preview.name);
    setValue("title", preview.title);
    setValue("content", preview.content);
    setValue("signatureLogo", preview.signatureLogo);
    setValue("signatureContent", preview.signatureContent);
    setValue("isDefaultSignature", preview.isDefaultSignature);
    setValue("isActive", preview.isActive);
    setFileList(preview.templateAttachFiles);
  }, [isEditMode, item, preview]);
  
  useEffect(() => {
    if(!dataDefault) return;
    setValue("signatureLogo", dataDefault.signatureLogo);
    setValue("signatureContent", dataDefault.signatureContent);
  }, [dataDefault])

  const handleOpenPreviewEmail = () => {
    setIsOpenPreview(true);
  };
  
  const handleClosePreviewEmail = () => {
    setIsOpenPreview(false);
  }
  
  const handleSetSignatureLogo = (e) => {
    setValue("signatureLogo", e.fileTemplates[0].path);
  };
  
  const pressSave = handleSubmit(async (body) => {
    if (fileList.length > 0) {
      const file = new FormData();
      fileList.forEach(item => {
        if (item.id) return
        file.append("Files", item);
      });
      const fileResult = await uploadFiles(file).unwrap();
      body.templateAttachFiles = fileResult.fileTemplates.concat(fileList.filter(item => item.id));
    }
    if (isEditMode) {
      await updateForm(body).unwrap().then(() => {
        enqueueSnackbar("Thực hiện thành công!", {
          autoHideDuration: 2000,
        });
        onClose();
      }).catch(() => {
        enqueueSnackbar("Thực hiện thất bại!", {
          autoHideDuration: 1000,
          variant: "error",
        });
      });
    } else {
      await addForm(body).unwrap().then(() => {
        enqueueSnackbar("Thực hiện thành công!", {
          autoHideDuration: 2000,
        });
        onClose();
      }).catch(() => {
        enqueueSnackbar("Thực hiện thất bại!", {
          autoHideDuration: 1000,
          variant: "error",
        });
      });
    }
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
                    backgroundColor: theme.palette.background.paper,
                    boxShadow: "none",
                    ":hover": {
                      backgroundColor: theme.palette.common.neutral100,
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
                        name="content"
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
                        <RHFCheckbox name='isDefaultSignature' label='Đặt làm chữ ký mặc định'/>
                      </Box>
                      <Box display={"flex"}>
                        <Stack>
                          <CropImage logo={watch('signatureLogo')} handleSubmit={handleSetSignatureLogo}/>
                          <Typography variant={"textSize13"} sx={{mt: 1}} color={theme.palette.text.secondary}>
                            Logo công ty
                          </Typography>
                          {errors.signatureLogo &&
                            <FormHelperText error sx={{textTransform: 'capitalize'}}>
                              {errors.signatureLogo.message}
                            </FormHelperText>
                          }
                        </Stack>
                        <Box flex={1} pl={2}>
                          <RHFEmailEditor
                            name="signatureContent"
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
                  onClick={pressSave}
                />
                <ButtonCancelStyle onClick={onClose}>Hủy</ButtonCancelStyle>
              </View>
              <RHFSwitch
                name="isActive"
                label={watch("isActive") ? 'Áp dụng' : 'Không áp dụng'}
              />
            </View>
          </ViewModel>
        </Modal>
      </FormProvider>
      {isOpenPreview && <PreviewEmail
        isOpen={isOpenPreview}
        onClose={handleClosePreviewEmail}
        title={watch("title")}
        content={watch("content")}
        signature={watch("signatureContent")}
        logo={getFileUrl(watch('signatureLogo'))}
      />}
    </>
  )
}

export default React.memo(OfferFormModal);