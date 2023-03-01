import React from "react";
import {Box, Button, Dialog, DialogActions, DialogContent, Divider, IconButton, Typography} from "@mui/material";
import Iconify from "@/components/Iconify";
import {styled} from "@mui/styles";
import {FormProvider, RHFTextField} from "@/components/hook-form";
import {useFieldArray, useForm} from "react-hook-form";
import RHFDropdown from "@/components/hook-form/RHFDropdown";
import {useGetRoleGroupQuery} from "@/sections/organization/OrganizationSlice";
import OrganizationDialogTitle from "@/sections/organization/component/OrganizationDialogTitle";
import {DeleteIcon} from "@/assets/ActionIcon";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

const DialogStyle = styled(Dialog)(({theme}) => ({
  "& .dialog-invite": {
    boxShadow: ' 0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)',
    backgroundColor: "#FDFDFD",
    padding: theme.spacing(2),
  },
  "& .MuiDialog-container": {
    "& .MuiPaper-root": {
      borderRadius: '6px',
      width: "100%",
      maxWidth: '1000px !important',
    },
  },
}))

const OrganizationInviteForm = ({ListOrganization, isOpenInviteForm, setIsOpenInviteForm}) => {

  const FieldSchema = {
    email: Yup.string().email("Email không đúng định dạng").required("Email không được bỏ trống"),
    name: Yup.string().required("Ten không được bỏ trống"),
    roleGroup: Yup.string().required("Vai tro không được bỏ trống"),
    organization: Yup.string().required("To chuc không được bỏ trống"),
  };

  const OrganizationFormInviteSchema = Yup.object().shape({
    invite: Yup.array().of( Yup.object().shape(FieldSchema))
  });

  // form
  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(OrganizationFormInviteSchema),
  });

  const {
    handleSubmit,
    control,
    // formState: {isSubmitting},
  } = methods;

  const {fields, append, remove} = useFieldArray({
    control,
    name: "invite"
  });

  const onSubmit = (data) => console.log("data", data);

  const {data: {items: ListRoleGroup} = []} = useGetRoleGroupQuery();

  return (
      <DialogStyle
          open={isOpenInviteForm}
          onClose={() => setIsOpenInviteForm(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="dialog-invite"
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <OrganizationDialogTitle onClose={() => setIsOpenInviteForm(false)}>
            <Typography variant="body1" sx={{fontSize: '16px', fontWeight: 600, color: "#455570"}}>
              Mời người dùng
            </Typography>
          </OrganizationDialogTitle>
          <Divider/>
          <DialogContent sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            padding: 3
          }}>
            <Box className="box-content-wrapper" sx={{width: '100%'}}>
              {fields.map((item, index) => {
                return (
                    <Box key={item.id} sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                      backgroundColor: '#F2F4F5',
                      padding: 2,
                      mb: 2
                    }}>
                      <Box className="box-content-inner" sx={{flex: 1}}>
                        <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 2}}>
                          <div>
                            <RHFTextField
                                name={`invite.${index}.email`}
                                isRequired
                                title="Email"
                                placeholder="Nhập email người được mời"
                                sx={{minWidth: '276px', backgroundColor: '#FDFDFD'}}
                            />
                          </div>
                          <div>
                            <RHFTextField
                                name={`invite.${index}.name`}
                                isRequired
                                title="Họ và tên"
                                placeholder="Họ và tên người được mời"
                                sx={{minWidth: '276px', backgroundColor: '#FDFDFD'}}
                            />
                          </div>
                          <div>
                            <RHFDropdown
                                options={[...ListRoleGroup, { id: "", name: "" },  { id: "1", name: "ABC" }]?.map(item => ({...item, value: item?.id, label: item?.name}))}
                                name={`invite.${index}.roleGroup`}
                                isRequired
                                title="Vai trò"
                                placeholder="Chọn 1 vai trò"
                                sx={{minWidth: '276px', backgroundColor: '#FDFDFD'}}
                            />
                          </div>
                        </Box>
                        <RHFDropdown
                            options={[...ListOrganization, { id: "", name: "" }]?.map(item => ({...item, value: item?.id, label: item?.name}))}
                            name={`invite.${index}.organization`}
                            isRequired
                            title="Đơn vị"
                            placeholder="Chọn 1 hoặc nhiều đơn vị"
                            sx={{minWidth: '276px', backgroundColor: '#FDFDFD'}}
                        />
                      </Box>
                      <span
                          style={{ marginLeft: 16, display: 'block', padding: 8, cursor: 'pointer'}}
                          onClick={() => remove(index)}
                      ><DeleteIcon/>
                      </span>
                    </Box>
                );
              })}
              <Button variant="outlined"
                      onClick={() => {append({ email: "", name: "", roleGroup: "", organization: "" })}}
                      sx={{width: '100%', color: '#1976D2', fontSize: 14, fontWeight: 600, borderRadius: 0.75}}
                      startIcon={<Iconify icon="material-symbols:add"/>}>
                Thêm lời mời
              </Button>
            </Box>
          </DialogContent>
          <DialogActions sx={{padding: 2}}>
            <Button onClick={() => setIsOpenInviteForm(false)} sx={{
              color: '#455570',
              fontSize: 14,
              backgroundColor: '#FDFDFD',
              minWidth: '56px',
              borderRadius: 0.75,
              padding: '8px 12px'
            }}>Hủy</Button>
            <Button type="submit" sx={{
              color: '#FDFDFD',
              fontSize: 14,
              backgroundColor: '#1976D2',
              minWidth: '56px',
              borderRadius: 0.75,
              padding: '8px 12px'
            }}>Gửi lời mời</Button>
          </DialogActions>
        </FormProvider>
      </DialogStyle>
  )
}

export default React.memo(OrganizationInviteForm);