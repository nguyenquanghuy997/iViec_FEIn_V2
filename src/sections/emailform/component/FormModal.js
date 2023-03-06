import React, {useMemo} from "react";
import {Box, Divider, Drawer, IconButton, Stack, Typography} from "@mui/material";
import {FormProvider, RHFSwitch, RHFTextField} from "@/components/hook-form";
import {ButtonCancelStyle} from "@/sections/applicant/style";
import Iconify from "@/components/Iconify";
import {ButtonDS} from "@/components/DesignSystem";
import Scrollbar from "@/components/Scrollbar";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {EMAIL_ACCOUNT_EDITOR_DEFAULT_TEXT} from "@/sections/emailform/config/EditorConfig";
import {useTheme} from "@mui/material/styles";
import {EmailFormFooterStyle, EmailFormHeadStyle} from "@/sections/emailform/style";
import RHFEmailEditor from "@/sections/emailform/component/editor/RHFEmailEditor";

const InputStyle = {
  minHeight: 44,
  minWidth: 752,
  marginBottom: 24
}
const FormModal = ({isOpen, onClose, item, title}) => {
  const theme = useTheme();
  const defaultValues = useMemo(
      () => {
        const primaryMainColor = theme.palette.primary.main;
        const defaultEmailEditorConfig = EMAIL_ACCOUNT_EDITOR_DEFAULT_TEXT(primaryMainColor);
        const {
          name = '',
          contentEmail = defaultEmailEditorConfig.contentEmail,
          isActive = true,
        } = item || {};
        return {
          name,
          contentEmail,
          isActive,
        }
      },
      [item, theme]
  )

  const Schema = Yup.object().shape({
    name: Yup.string().required("Tên mẫu email không được bỏ trống"),
  });

  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const { watch, handleSubmit, formState: {isSubmitting} } = methods;

  const watchIsActive = watch('isActive');

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
              {/* content form */}

              <Box sx={{py: 2, px: 2, mt: 8, minWidth: '800px'}}>
                <RHFTextField
                    name="name"
                    title="Tên mẫu email"
                    placeholder="Nhập tên mẫu email"
                    isRequired
                    style={{...InputStyle}}
                />
                <RHFEmailEditor title="Nội dung email" style={{...InputStyle}} initialValue={item?.content || ""} name="contentEmail" placeholder="Nhập nội dung email..." />
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
      </>
  )
}

export default React.memo(FormModal);