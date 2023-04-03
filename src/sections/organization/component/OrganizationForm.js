import React, {useEffect, useState} from "react";
import {Box, Divider, Drawer, IconButton, Stack, Typography} from "@mui/material";
import {FormProvider, RHFSelect, RHFTextField} from "@/components/hook-form";
import Iconify from "@/components/Iconify";
import Scrollbar from "@/components/Scrollbar";
import {useForm} from "react-hook-form";
import {OrganizationFromFooterStyle, OrganizationFromHeadStyle} from "@/sections/organization/style";
import {useGetDistrictByProvinceIdQuery, useGetProvinceQuery} from "@/sections/companyinfor/companyInforSlice";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {convertViToEn} from "@/utils/function";
import {isEmpty, pick} from 'lodash';
import {useSnackbar} from "notistack";
import {LabelStyle, TextFieldStyle} from "@/components/hook-form/style";
import {
  useCreateChildOrganizationMutation,
  useGetOrganizationByIdQuery,
  useUpdateOrganizationMutation
} from "@/sections/organization/override/OverrideOrganizationSlice";
import MuiButton from "@/components/BaseComponents/MuiButton";

const InputStyle = {
  minHeight: 44,
  minWidth: 552,
  marginBottom: 24
}

const SelectStyle = {
  minHeight: 44,
  width: 264,
}

const OrganizationForm = ({isOpen, onClose, parentNode, actionType}) => {

  const { data: organization } = useGetOrganizationByIdQuery({
    OrganizationId: parentNode?.id
  }, { skip: !parentNode?.id || actionType === 0 });

  const {enqueueSnackbar} = useSnackbar();

  const [createChildOrganization] = useCreateChildOrganizationMutation();
  const [updateOrganization] = useUpdateOrganizationMutation();

  const [, setIsScrolled] = useState(false);

  const defaultValues = {
    id: "",
    parentOrganizationId: "",
    name: "",
    code: "",
    email: "",
    phoneNumber: "",
    provinceId: "",
    districtId: "",
    address: "",
  };

  const handleScroll = (e) => {
    setIsScrolled(e.target.scrollTop > 10);
  };

  const OrganizationFormSchema = Yup.object().shape({
    name: Yup.string().nullable().required("Tên đơn vị không được bỏ trống").max(50, "Tên đơn vị tối đa 50 ký tự"),
    code: Yup.string().nullable().required("Mã đơn vị không được bỏ trống").max(20, "Mã đơn vị tối đa 20 ký tự"),
    email: Yup.string().nullable().email('Email không đúng định dạng').required("Email không được bỏ trống"),
    phoneNumber: Yup.string().nullable().required("Số điện thoại không được bỏ trống").matches(/\d+\b/, "Số điện thoại không đúng định dạng"),
    address: Yup.string().nullable().max(255, "Địa chỉ đơn vị tối đa 255 ký tự"),
  });

  // form
  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(OrganizationFormSchema),
    defaultValues,
  });

  const { watch, handleSubmit, formState: {isSubmitting} } = methods;

  const watchProvinceId = watch("provinceId");

  const {data: {items: ProvinceList = []} = {}} = useGetProvinceQuery();
  const {data: {items: DistrictList = []} = {}} = useGetDistrictByProvinceIdQuery(watchProvinceId, { skip: !watchProvinceId });

  useEffect(()=>{
    if (organization && actionType === 1) {
      for(let i in defaultValues) {
        methods.setValue(i, organization[i]);
      }
    } else {
      methods.reset(defaultValues)
    }
  }, [organization, actionType])

  const onSubmit = async (data) => {
    const body = {...data};
    if (actionType === 0) {
      try {
        body.parentOrganizationId = parentNode?.id ? parentNode.id : null;
        await createChildOrganization(body).unwrap();
        enqueueSnackbar("Thêm đơn vị thành công!", {
          autoHideDuration: 1000
        });
        onClose();
      } catch (err) {
        enqueueSnackbar("Thêm đơn vị không thành công!", {
          autoHideDuration: 1000,
          variant: 'error',
        });
        throw err;
      }
    } else {
      try {
        const dataSubmit = pick(body, ['id', 'name', 'code', 'email', 'phoneNumber', 'provinceId', 'districtId', 'address']);
        const { name, code, phoneNumber, email, provinceId, districtId, address} = dataSubmit;
        await updateOrganization({
          organizationId: organization?.id,
          name,
          code,
          phoneNumber,
          email,
          provinceId,
          districtId,
          address
        }).unwrap();
        enqueueSnackbar("Chỉnh sửa đơn vị thành công!");
        onClose();
      } catch (err) {
        enqueueSnackbar("Chỉnh sửa đơn vị không thành công!", {
          autoHideDuration: 1000,
          variant: 'error',
        });
        throw err;
      }
    }
  }

  return (
      <>
        <Drawer
            open={isOpen}
            onClose={onClose}
            anchor="right"
            PaperProps={{
              sx: {
                width: {xs: 1, sm: 560, md: 600},
                boxShadow: '-3px 0px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)',
                position: 'fixed',
                height: 'calc(100% - 92px - 1px)',
                top: '64px',
                right: 0
              },
              onScroll: handleScroll
            }}
            componentsProps={{
              backdrop: {
                sx: {
                  background: 'transparent !important',
                  boxShadow: 'none !important'
                }
              }
            }}
        >
          <Scrollbar sx={{zIndex: 9999, "& label": {zIndex: 0}}}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <OrganizationFromHeadStyle className="organization-form-head">
                <Typography variant="body1" sx={{fontSize: '16px', fontWeight: 600, color: "#455570"}}>
                  {actionType === 0 ? 'Thêm mới đơn vị' : 'Chỉnh sửa đơn vị'}
                </Typography>
                <IconButton size="small" onClick={onClose}><Iconify icon="ic:baseline-close"/></IconButton>
              </OrganizationFromHeadStyle>
              <Divider/>
              {/* content form */}
              <Box sx={{py: 2, px: 2, mb: 8}}>
                {!isEmpty(parentNode) && <>
                  <LabelStyle required={true}>
                    Trực thuộc
                  </LabelStyle>
                  <TextFieldStyle
                      name="parentOrganizationId"
                      placeholder="Nhập tên đơn vị Trực thuộc"
                      style={{...InputStyle, backgroundColor: '#EFF3F6'}}
                      value={actionType === 0 ? parentNode?.name : organization?.parentOrganizationName}
                      disabled
                      variant="standard"
                      InputProps={{ disableUnderline: true}}
                  />
                </>}
                <RHFTextField
                    name="name"
                    title="Tên đơn vị"
                    placeholder="Nhập tên đơn vị"
                    isRequired
                    style={{...InputStyle}}
                />
                <RHFTextField
                    name="code"
                    title="Mã đơn vị"
                    placeholder="Nhập mã đơn vị"
                    isRequired
                    style={{...InputStyle}}
                />
                <RHFTextField
                    name="email"
                    title="Email đơn vị"
                    placeholder="Nhập email đơn vị"
                    isRequired
                    beforeChange={() => convertViToEn(watch('email'), false)}
                    style={{...InputStyle}}
                />
                <RHFTextField
                    name="phoneNumber"
                    title="Số điện thoại đơn vị"
                    placeholder="Nhập SĐT đơn vị"
                    isRequired
                    style={{...InputStyle}}
                />

                <Divider sx={{mb: 2}}/>

                <Stack direction="row" justifyContent="space-between" maxWidth={'552px'} mb={3}>
                  <div style={{...SelectStyle}}>
                    <LabelStyle>
                      Tỉnh/Thành phố
                    </LabelStyle>
                    <RHFSelect
                        options={ProvinceList?.map((i) => ({value: i.id, label: i.name}))}
                        style={{...SelectStyle}}
                        name="provinceId"
                        placeholder="Chọn Tỉnh/Thành phố"
                    />
                  </div>
                  <div style={{...SelectStyle}}>
                    <LabelStyle>
                      Quận/Huyện
                    </LabelStyle>
                    <RHFSelect
                        options={DistrictList?.map((i) => ({value: i.id, label: i.name}))}
                        style={{...SelectStyle}}
                        name="districtId"
                        disabled={!watchProvinceId}
                        placeholder="Chọn Quận/Huyện"
                    />
                  </div>
                </Stack>

                <RHFTextField
                    name="address"
                    title="Địa chỉ chi tiết"
                    placeholder="Số nhà, Tên đường, Xã/Phường ...."
                    style={{...InputStyle}}
                />
              </Box>

              {/* end content form */}

              <OrganizationFromFooterStyle className="organization-form-footer">
                <Stack flexDirection="row">
                  <MuiButton
                      type="submit"
                      loading={isSubmitting}
                      title="Lưu"
                      sx={{ px: 2, py: 1, minWidth: 24 }}
                  />
                  <MuiButton
                    title={"Hủy"}
                    onClick={onClose}
                    color={"basic"}
                    sx={{ color: '#455570', fontWeight: 600, ml: 1 }}
                  />
                </Stack>
              </OrganizationFromFooterStyle>
            </FormProvider>
          </Scrollbar>
        </Drawer>
      </>
  )
}

export default React.memo(OrganizationForm);