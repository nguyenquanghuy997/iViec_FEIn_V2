import React, {useMemo, useState} from "react";
import {useForm} from "react-hook-form";
import {isEmpty} from "lodash";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {Box, Button, Divider, Drawer, IconButton, Stack, Typography} from "@mui/material";
import {FormProvider, RHFCheckbox, RHFSwitch, RHFTextField} from "@/components/hook-form";
import {ButtonCancelStyle} from "@/sections/applicant/style";
import Iconify from "@/components/Iconify";
import {ButtonDS} from "@/components/DesignSystem";
import Scrollbar from "@/components/Scrollbar";
import {EMAIL_ACCOUNT_EDITOR_DEFAULT_TEXT} from "@/sections/emailform/config/EditorConfig";
import {useTheme} from "@mui/material/styles";
import {BoxFlex, EmailFormFooterStyle, EmailFormHeadStyle} from "@/sections/emailform/style";
import RHFEmailEditor from "@/sections/offerform/component/editor/RHFEmailEditor";
import {LabelStyle} from "@/components/hook-form/style";
import CropImage from "@/sections/emailform/component/crop-image/CropImage";
import PreviewEmail from "@/sections/emailform/component/PreviewEmail";
import {ExcelIcon, PdfIcon, WordIcon} from "@/sections/offerform/component/editor/Icon";
import {styled} from "@mui/styles";
import {DeleteIcon} from "@/assets/ActionIcon";

const InputStyle = {
  minHeight: 44,
  minWidth: 752,
  marginBottom: 24
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
    backgroundColor: '#FDFDFD'
  }
}));

const showIconByFileType = (fileType) => {
  let icon = null;
  switch (fileType) {
    case ".doc":
      icon = <WordIcon />;
      break;
    case "doc":
      icon = <WordIcon />;
      break;
    case ".docx":
      icon = <WordIcon />;
      break;
    case "docx":
      icon = <WordIcon />;
      break;
    case ".pdf":
      icon = <PdfIcon />;
      break;
    case "pdf":
      icon = <PdfIcon />;
      break;
    case ".xlsx":
      icon = <ExcelIcon />;
      break;
    case "xlsx":
      icon = <ExcelIcon />;
      break;
    case ".xls":
      icon = <ExcelIcon />;
      break;
    case "xls":
      icon = <ExcelIcon />;
      break;
    default:
      break;
  }
  return icon;
}

const calcFileSize = (fileSize) => {
  let fileSizeStr = fileSize.toString();
  if(fileSizeStr.length < 7) return `${(+fileSizeStr/1024).toFixed(2)} KB`
  return `${(Math.round(+fileSizeStr/1024)/1000).toFixed(2)} MB`
}
const renderFileUploadItem = (file, index, removeFileUpload) => {
  if(!file) return;
  let fileType = file.name.slice(file.name.lastIndexOf('.'));
  return (
      <BoxItemFileStyle className="file-upload-item" key={index}>
        {showIconByFileType(fileType)}
        <Stack sx={{ mx: 1 }}>
          <Typography sx={{ color: '#455570', fontSize: 13, fontWeight: 600 }}>{file.name}</Typography>
          <Typography sx={{ color: '#455570', fontSize: 12, fontWeight: 400 }}>{calcFileSize(file.size)}</Typography>
        </Stack>
        <IconButton
            size='small'
            sx={{ color: '#1976D2', mx: 0.5 }}
            onClick={() => {
              removeFileUpload(index)
            }}
        ><DeleteIcon /></IconButton>
      </BoxItemFileStyle>
  )
}
const OfferFormModal = ({isOpen, onClose, item, title, showUploadFile}) => {
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
          title = '',
          contentEmail = defaultEmailEditorConfig.contentEmail,
          contentSignature = defaultEmailEditorConfig.contentSignature,
          isActive = true,
        } = item || {};
        return {
          title,
          contentEmail,
          contentSignature,
          isActive,
        }
      },
      [item, theme]
  )

  const Schema = Yup.object().shape({
    title: Yup.string().required("Tên mẫu email không được bỏ trống"),
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
    console.log(data)
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
                <RHFTextField
                    name="title"
                    title="Tên mẫu email"
                    placeholder="Nhập tên mẫu email"
                    isRequired
                    style={{...InputStyle}}
                />
                <Box sx={{marginTop: 0, marginBottom: 0}}>
                  <BoxFlex>
                    <LabelStyle>
                      Nội dung email
                    </LabelStyle>
                    {showUploadFile && <Button
                        component="label"
                        sx={{
                          width: '150px',
                          height: '44px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          "&:hover": {
                            backgroundColor: 'transparent'
                          }
                        }}
                    >
                      <Iconify icon='eva:attach-fill' sx={{width: 20, height: 20}}/>
                      <Typography component="span" sx={{color: '#455570', fontSize: 14, fontWeight: 600, ml: 0.5}}>Đình kèm file</Typography>
                      <input hidden accept=".doc,.docx,.pdf,.xlsx,.xls" multiple type="file" onChange={handleFileChange}/>
                    </Button>}
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
                        sx={{ width: '596px', minHeight: '230px'}}
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
            logo={'http://103.176.149.158:5001/api/Image/GetImage?imagePath=01000000-ac12-0242-b3cd-08db10c50f70/20230224082523894.png'}
        />}
      </>
  )
}

export default React.memo(OfferFormModal);