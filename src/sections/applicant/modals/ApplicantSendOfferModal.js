import React, {useMemo, useState} from "react";
import {useForm} from "react-hook-form";
import {isEmpty} from "lodash";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {Box, Divider, Drawer, IconButton, Stack, Typography} from "@mui/material";
import {FormProvider, RHFAutocomplete, RHFCheckbox, RHFSwitch, RHFTextField} from "@/components/hook-form";
import {ButtonCancelStyle, ButtonSaveStyle} from "@/sections/applicant/style";
import Iconify from "@/components/Iconify";
import {ButtonDS} from "@/components/DesignSystem";
import Scrollbar from "@/components/Scrollbar";
import {EMAIL_ACCOUNT_EDITOR_DEFAULT_TEXT} from "@/sections/emailform/config/EditorConfig";
import {useTheme} from "@mui/material/styles";
import {BoxFlex, EmailFormFooterStyle, EmailFormHeadStyle} from "@/sections/emailform/style";
import RHFEmailEditor from "@/sections/offer-form/component/editor/RHFEmailEditor";
import {LabelStyle} from "@/components/hook-form/style";
import CropImage from "@/sections/emailform/component/crop-image/CropImage";
import PreviewEmail from "@/sections/emailform/component/PreviewEmail";
import {styled} from "@mui/styles";
import {DeleteIcon} from "@/assets/ActionIcon";
import RHFDropdown from "@/components/hook-form/RHFDropdown";
import ChipDS from "@/components/DesignSystem/ChipDS";
import {calcFileSize, showIconByFileType} from "@/utils/function";
import { DOMAIN_SERVER_API } from "@/config";

const InputStyle = {
  minHeight: 44,
  minWidth: 752,
  marginBottom: 24
}

const SelectStyle = {
  minHeight: 44,
  minWidth: 752,
}

const BoxItemFileStyle = styled(Box)(({theme}) => ({
  '&.file-upload-item': {
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2),
    padding: theme.spacing(1, 2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: '1px solid #B9BFC9',
    borderRadius: 6,
    backgroundColor: theme.palette.background.paper
  }
}));

const renderFileUploadItem = (file, index, removeFileUpload) => {
  if (!file) return;
  let fileType = file.name.slice(file.name.lastIndexOf('.'));
  return (
      <BoxItemFileStyle className="file-upload-item" key={index}>
        {showIconByFileType(fileType)}
        <Stack sx={{mx: 1}}>
          <Typography sx={{color: '#455570', fontSize: 13, fontWeight: 600}}>{file.name}</Typography>
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
const ApplicantSendOfferModal = ({isOpen, onClose, item, title, showUploadFile}) => {
  const theme = useTheme();

  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [fileList, setFileList] = useState([]);
  const handleFileChange = (e) => {
    setFileList(prev => [...prev, ...e.target.files]);
  };

  const removeFileUpload = (index) => {
    const newFileList = [...fileList].filter((item, idx) => idx !== index);
    setFileList(newFileList);
  }

  const defaultValues = useMemo(
      () => {
        const primaryMainColor = theme.palette.primary.main;
        const defaultEmailEditorConfig = EMAIL_ACCOUNT_EDITOR_DEFAULT_TEXT(primaryMainColor);
        const {
          title = '', ccEmails = [], bccEmails = [],
          contentEmail = defaultEmailEditorConfig.contentEmail,
          contentSignature = defaultEmailEditorConfig.contentSignature,
          isActive = true
        } = item || {};
        return {title, ccEmails, bccEmails, contentEmail, contentSignature, isActive}
      },
      [item, theme]
  )

  const Schema = Yup.object().shape({
    title: Yup.string().required("Tên mẫu email không được bỏ trống"),
    // ccEmails: Yup.array()
    //     .transform(function(value, originalValue) {
    //       if (this.isType(value) && value !== null) {
    //         return value;
    //       }
    //       return originalValue ? originalValue.split(/[\s,]+/) : [];
    //     })
    //     .of(Yup.string().email(({ value }) => `Email ${value} không đúng định dạng.`)),
  });

  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const {watch, handleSubmit, formState: {isSubmitting}} = methods;

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

  const onSubmit = async (data) => {
    return data;
  }

  return (
      <>
        <Drawer
            open={isOpen}
            onClose={onClose}
            anchor="right"
            PaperProps={{
              sx: {
                width: {xs: 1, sm: 560, md: 800},
                boxShadow: '-3px 0px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)',
              },
            }}
        >
          <Scrollbar sx={{zIndex: 9999, "& label": {zIndex: 0}}}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <EmailFormHeadStyle className="email-form-head">
                <Typography variant="body1" sx={{fontSize: '16px', fontWeight: 600, color: "#455570"}}>
                  {title}
                </Typography>
                <IconButton size="small" onClick={onClose}><Iconify icon="ic:baseline-close"/></IconButton>
              </EmailFormHeadStyle>
              <Divider/>
              <Box sx={{py: 2, px: 3, my: 8, maxWidth: '800px'}}>
                <div style={{...SelectStyle}}>
                  <RHFDropdown
                      options={[]}
                      sx={{...InputStyle}}
                      name="templateOffer"
                      placeholder="Chọn mẫu thư mời nhận việc có sẵn"
                      title="Chọn mẫu thư mời nhận việc có sẵn"
                      isRequired
                  />
                </div>
                <RHFTextField
                    name="userName"
                    title="Gửi tới"
                    placeholder="Gửi tới"
                    value="dinhtienthanh1702tt@gmail.com"
                    disabled
                    isRequired
                    style={{...InputStyle}}
                />

                <RHFAutocomplete
                    options={[]}
                    name="ccEmails"
                    title="CC"
                    placeholder="CC"
                    style={{...InputStyle}}
                    AutocompleteProps={{
                      multiple: true,
                      freeSolo: true,
                      renderTags: (value, getTagProps) => value.map((item, index) => (
                          <ChipDS
                              {...getTagProps({index})}
                              key={`${index}`}
                              size="small"
                              label={item}
                              variant="filled"
                              className="input-chip"
                              sx={{
                                "&.input-chip": {}
                              }}
                          />
                      )),
                    }}
                />

                <RHFAutocomplete
                    options={[]}
                    name="bccEmails"
                    title="BCC"
                    placeholder="BCC"
                    style={{...InputStyle}}
                    AutocompleteProps={{
                      multiple: true,
                      freeSolo: true,
                      renderTags: (value, getTagProps) => value.map((item, index) => (
                          <ChipDS
                              {...getTagProps({index})}
                              key={`${index}`}
                              size="small"
                              label={item}
                              variant="filled"
                              className="input-chip"
                              sx={{
                                "&.input-chip": {}
                              }}
                          />
                      )),
                    }}
                />
                <RHFTextField
                    name="title"
                    title="Tiêu đề email"
                    placeholder="Nhập tiêu đề email"
                    isRequired
                    sx={{...InputStyle}}
                />
                <Box sx={{marginTop: 0, marginBottom: 0}}>
                  <BoxFlex>
                    <LabelStyle>
                      Nội dung email
                    </LabelStyle>
                  </BoxFlex>
                  <BoxFlex justifyContent="flex-start">
                    {
                        !isEmpty(fileList) && fileList.map((file, index) => renderFileUploadItem(file, index, removeFileUpload))
                    }

                  </BoxFlex>

                </Box>
                <RHFEmailEditor
                    style={{...InputStyle}}
                    name="contentEmail"
                    placeholder="Nhập nội dung email..."
                    showPreview
                    showUploadFile={showUploadFile}
                    handleFileChange={handleFileChange}
                    onOpenPreview={handleOpenPreviewEmail}
                    sx={{width: '752px', minHeight: '370px'}}
                />

                <Box sx={{marginTop: 2, marginBottom: 2}}>
                  <BoxFlex>
                    <LabelStyle>
                      Chữ ký email
                    </LabelStyle>
                    <RHFCheckbox name='isDefault' label='Đặt làm chữ ký mặc định'/>
                  </BoxFlex>
                </Box>

                {/* Logo & Signature  */}
                <BoxFlex alignItems="flex-start">
                  <Stack>
                    <CropImage data={'01000000-ac12-0242-b3cd-08db10c50f70/20230224082523894.png'}/>
                    <Typography sx={{fontSize: 13, fontWeight: 400, color: '#5C6A82', mt: 2}}>Logo công ty</Typography>
                  </Stack>
                  <Box>
                    <RHFEmailEditor
                        style={{...InputStyle}}
                        name="contentSignature"
                        placeholder="Nhập nội dung email..."
                        sx={{width: '596px', minHeight: '230px'}}
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
                      tittle="Gửi email"
                      sx={{marginRight: 2}}
                  />
                  <ButtonSaveStyle onClick={onClose}>Lưu và không gửi</ButtonSaveStyle>
                  <ButtonCancelStyle onClick={onClose}>Hủy</ButtonCancelStyle>
                </Stack>
                <Stack>
                  <RHFSwitch
                      name="isActive"
                      label={watchIsActive ? 'Áp dụng' : 'Không áp dụng'}
                  />
                </Stack>
              </EmailFormFooterStyle>
            </FormProvider>
          </Scrollbar>
        </Drawer>
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

export default React.memo(ApplicantSendOfferModal);