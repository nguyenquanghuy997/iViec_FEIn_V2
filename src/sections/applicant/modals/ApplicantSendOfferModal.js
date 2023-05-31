import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { isEmpty } from "lodash";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Divider, FormHelperText, Grid, Modal, Stack, Typography } from "@mui/material";
import { RHFCheckbox, RHFTextField } from "@/components/hook-form";
import { ButtonCancelStyle } from "@/sections/applicant/style";
import Iconify from "@/components/Iconify";
import { ButtonDS } from "@/components/DesignSystem";
import { useTheme } from "@mui/material/styles";
import RHFEmailEditor from "@/sections/offer-form/component/editor/RHFEmailEditor";
import { LabelStyle } from "@/components/hook-form/style";
import PreviewEmail from "@/sections/emailform/component/PreviewEmail";
import { ViewModel } from "@/utils/cssStyles";
import { Text, View } from "@/components/DesignSystem/FlexStyled";
import {
  useGetAllOfferTemplateQuery,
  useGetInfoDataOfferQuery,
  useLazyGetPreviewOfferTemplateQuery,
  useSendOfferTemplateMutation,
  useUploadImageOfferMutation
} from "@/sections/offer-form/OfferFormSlice";
import { useSnackbar } from "notistack";
import CropImage from "@/sections/offer-form/component/crop-image/CropImage";
import { getFileUrl, replaceValueOffer } from "@/utils/helper";
import { renderFileUploadItem } from "@/sections/offer-form/component/OfferFormModal";
import RHFDropdown from "@/components/hook-form/RHFDropdown";
import RHFMuiAutocomplete from "@/components/hook-form/RHFMuiAutocomplete";
import { useGetRecruitmentPersonInChargeIdsQuery } from "@/sections/interview";

const defaultValues = {
  offerTemplateId: undefined,
  recruitmentId: undefined,
  applicantId: undefined,
  applicantEmail: undefined,
  cc: undefined,
  bcc: undefined,
  name: undefined,
  title: undefined,
  content: undefined,
  signatureLogo: undefined,
  signatureContent: undefined,
  isDefaultSignature: undefined,
  isActive: undefined,
  offerTemplateApplicantAttachFiles: undefined,
};

const ApplicantSendOfferModal = ({isOpen, onClose, item, title}) => {
  const theme = useTheme();
  const [addForm] = useSendOfferTemplateMutation();
  const {data: {items: dataOffer = []} = {}} = useGetAllOfferTemplateQuery({IsActive: true});
  const {data: dataInfo} = useGetInfoDataOfferQuery({ApplicantId: item.applicantId, RecruitmentId: item.recruitmentId});
  const [getDataOffer, {data: Data}] = useLazyGetPreviewOfferTemplateQuery();
  const {data: {items: dataPersons = []} = {}} = useGetRecruitmentPersonInChargeIdsQuery(item.recruitmentId);
  const [uploadFiles] = useUploadImageOfferMutation();
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
    offerTemplateId: Yup.string().required("Chưa chọn mẫu thư mời nhận việc có sẵn"),
    recruitmentId: Yup.string(),
    applicantId: Yup.string(),
    applicantEmail: Yup.string(),
    cc: Yup.array(),
    bcc: Yup.array(),
    title: Yup.string().required("Tiêu đề mail không được bỏ trống"),
    content: Yup.string().required("Nội dung mail không được bỏ trống"),
    signatureLogo: Yup.string().required("Logo chữ ký không được bỏ trống"),
    signatureContent: Yup.string().required("Nội dung chữ ký không được bỏ trống"),
    isDefaultSignature: Yup.boolean(),
    isActive: Yup.boolean(),
    offerTemplateApplicantAttachFiles: Yup.array().of(Yup.string()),
  });
  
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(Schema),
  });
  
  const {watch, setValue, handleSubmit, formState: {isSubmitting, errors}} = methods;
  useEffect(() => {
    if (!item?.applicantId) return;
    setValue("applicantId", item.applicantId);
    setValue("applicantEmail", item.applicantEmail);
    setValue("recruitmentId", item.recruitmentId);
  }, [item]);
  
  useEffect(async () => {
    if (!watch("offerTemplateId")) return;
    await getDataOffer({id: watch("offerTemplateId")}).unwrap();
  }, [watch("offerTemplateId")])
  
  useEffect(() => {
    if (Data && dataInfo) {
      setValue("title", Data.title);
      setValue("content", replaceValueOffer(Data.content, dataInfo));
      setValue("signatureLogo", Data.signatureLogo);
      setValue("signatureContent", replaceValueOffer(Data.signatureContent, dataInfo));
      setFileList(Data.templateAttachFiles);
    }
  }, [Data, dataInfo])
  
  const handleOpenPreviewEmail = () => {
    setIsOpenPreview(true);
  };
  
  const handleClosePreviewEmail = () => {
    setIsOpenPreview(false);
  }
  
  const handleSetSignatureLogo = (e) => {
    setValue("signatureLogo", e.fileTemplates[0].path);
  };
  
  const pressSave = async (body, action) => {
    if (fileList.length > 0) {
      const file = new FormData();
      fileList.forEach(item => {
        if (item.id) return
        file.append("Files", item);
      });
      const fileResult = file.has("Files") ? await uploadFiles(file).unwrap() : {fileTemplates: []};
      body.offerTemplateApplicantAttachFiles = fileResult.fileTemplates.concat(fileList.filter(item => item.id));
    }
    body.isSendMail = action;
    body.bcc = body.bcc?.map(item => item.value ? item.value : item);
    body.cc = body.cc?.map(item => item.value ? item.value : item);
    body.contents = [
      body.content,
      getFileUrl(body.signatureLogo),
      body.signatureContent
    ];
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
  };
  
  return (
    <>
      <FormProvider {...methods}>
        <Modal
          open={isOpen}
          onClose={onClose}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            ".MuiModal-backdrop": {background: "rgba(9, 30, 66, 0.25)"}
          }}
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
              <Grid
                container
                sx={{width: "800px", overflowY: "auto"}}
                height={"100%"}
                flexWrap={"nowrap"}
                flexDirection={"column"}
              >
                <Grid item p={3}>
                  <Grid mb={3}>
                    <RHFDropdown
                      title={"Chọn mẫu thư mời nhận việc"}
                      isRequired={true}
                      options={dataOffer.map((i) => ({
                        value: i.id,
                        label: i.name,
                        name: i.name,
                      }))}
                      name={"offerTemplateId"}
                      placeholder="Chọn mẫu mời nhận việc"
                    />
                  </Grid>
                  <Divider/>
                  <Grid mt={3} mb={3}>
                    <RHFTextField
                      name="applicantEmail"
                      title="Gửi tới"
                      placeholder="Nhập tiêu đề mail"
                      isRequired
                      disabled
                    />
                  </Grid>
                  <Grid mb={3}>
                    <RHFMuiAutocomplete
                      options={dataPersons.map((i) => ({
                        value: i.email,
                        label: i.email,
                      }))}
                      name="cc"
                      title="Cc"
                      freeSolo
                      placeholder="Chọn hoặc nhập người CC"
                      multiple
                    />
                  </Grid>
                  <Grid mb={3}>
                    <RHFMuiAutocomplete
                      options={dataPersons.map((i) => ({
                        value: i.email,
                        label: i.email,
                      }))}
                      name="bcc"
                      title="BCC"
                      freeSolo
                      placeholder="Chọn hoặc nhập người BCC"
                      multiple
                    />
                  </Grid>
                  <Grid mb={3}>
                    <RHFTextField
                      name="title"
                      title="Tiêu đề email"
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
                    {dataInfo &&
                      <RHFEmailEditor
                        name="content"
                        placeholder="Nhập nội dung email..."
                        showPreview
                        dataTagShow={true}
                        dataTag={dataInfo}
                        showUploadFile={true}
                        handleFileChange={handleFileChange}
                        onOpenPreview={handleOpenPreviewEmail}
                        sx={{width: '752px', minHeight: '370px'}}
                      />
                    }
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
                        {dataInfo &&
                          <RHFEmailEditor
                            name="signatureContent"
                            placeholder="Nhập nội dung email..."
                            sx={{minHeight: '230px'}}
                            dataTagShow={true}
                            dataTag={dataInfo}
                          />
                        }
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
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
                  onClick={handleSubmit(data => pressSave(data, true))}
                />
                <ButtonDS
                  type="submit"
                  loading={isSubmitting}
                  variant="contained"
                  tittle={"Gửi và lưu thành mẫu"}
                  onClick={handleSubmit(data => pressSave(data, false))}
                />
                <ButtonCancelStyle onClick={onClose}>Hủy</ButtonCancelStyle>
              </View>
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
export default React.memo(ApplicantSendOfferModal);