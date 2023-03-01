import React, {useEffect, useState} from "react";
import {Box, Divider, Drawer, IconButton, Stack, Typography} from "@mui/material";
import {FormProvider, RHFTextField} from "@/components/hook-form";
import {ButtonCancelStyle} from "@/sections/applicant/style";
import Iconify from "@/components/Iconify";
import {ButtonDS} from "@/components/DesignSystem";
import Scrollbar from "@/components/Scrollbar";
import {useForm} from "react-hook-form";
import {OrganizationFromFooterStyle, OrganizationFromHeadStyle} from "@/sections/organization/style";
import RHFDropdown from "@/components/hook-form/RHFDropdown";
import {
  useGetDistrictByProvinceIdQuery,
  useGetProvinceQuery
} from "@/sections/companyinfor/companyInforSlice";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {convertViToEn} from "@/utils/function";
import {isEmpty} from 'lodash';
import {
  useCreateChildOrganizationMutation, useGetOrganizationBySlugQuery,
} from "@/sections/organization/OrganizationSlice";
import {useSnackbar} from "notistack";

const InputStyle = {
  minHeight: 44,
  minWidth: 552,
  marginBottom: 24
}

const SelectStyle = {
  minHeight: 44,
  width: 264,
}

const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const OrganizationForm = ({isOpen, onClose, parentNode, title}) => {

  const { data: organization } = useGetOrganizationBySlugQuery({
    Slug: parentNode?.slug
  }, { skip: !parentNode?.slug });

  const {enqueueSnackbar} = useSnackbar();

  const [createChildOrganization] = useCreateChildOrganizationMutation();

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
    name: Yup.string().required("Tên đơn vị không được bỏ trống").max(50, "Tên đơn vị tối đa 50 ký tự"),
    code: Yup.string().required("Mã đơn vị không được bỏ trống").max(20, "Mã đơn vị tối đa 20 ký tự"),
    email: Yup.string().required("Email không được bỏ trống").matches(regexEmail, "Email không đúng định dạng"),
    phoneNumber: Yup.string().required("Số điện thoại không được bỏ trống").matches(/\d+\b/, "Số điện thoại không đúng định dạng"),
    provinceId: Yup.string().required("Tỉnh/Thành phố không được bỏ trống"),
    districtId: Yup.string().required("Quận/Huyện không được bỏ trống"),
    address: Yup.string().max(255, "Địa chỉ đơn vị tối đa 255 ký tự"),
  });

  // form
  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(OrganizationFormSchema),
    defaultValues,
  });

  const {
    watch,
    reset,
    handleSubmit,
    formState: {isSubmitting},
  } = methods;

  const watchProvinceId = watch("provinceId");

  const {data: {items: ProvinceList = []} = {}} = useGetProvinceQuery();
  const {data: {items: DistrictList = []} = {}} = useGetDistrictByProvinceIdQuery(watchProvinceId, { skip: !watchProvinceId });

  useEffect(()=>{
    if (organization) reset(organization)
  }, [organization])

  const onSubmit = async (data) => {
    const body = {...data};
    body.parentOrganizationId = parentNode?.id ? parentNode.id : null;
    try {
      await createChildOrganization(body).unwrap();
      body.id ? enqueueSnackbar("Cập nhật đơn vị thành công!") : enqueueSnackbar("Thêm đơn vị thành công!");
      onClose();
    } catch (err) {
      console.log(err)
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
              },
              onScroll: handleScroll
            }}
        >
          <Scrollbar sx={{zIndex: 9999, "& label": {zIndex: 0}}}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <OrganizationFromHeadStyle className="organization-form-head">
                <Typography variant="body1" sx={{fontSize: '16px', fontWeight: 600, color: "#455570"}}>
                  {title}
                </Typography>
                <IconButton size="small" onClick={onClose}><Iconify icon="ic:baseline-close"/></IconButton>
              </OrganizationFromHeadStyle>
              <Divider/>
              {/* content form */}

              <Box sx={{py: 2, px: 2, mt: 8}}>
                {!isEmpty(organization) && !parentNode?.isRoot && <RHFTextField
                    name="parentOrganizationId"
                    title="Trực thuộc"
                    placeholder="Nhập tên đơn vị Trực thuộc"
                    isRequired
                    style={{...InputStyle, backgroundColor: '#EFF3F6'}}
                    value={organization?.name}
                    disabled
                />}
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
                    <RHFDropdown
                        options={
                          ProvinceList?.map((i) => ({
                            value: i.id,
                            label: i.name,
                            name: i.name,
                          }))
                        }
                        style={{...SelectStyle}}
                        name="provinceId"
                        placeholder="Chọn Tỉnh/Thành phố"
                        title="Tỉnh/Thành phố"
                        isRequired
                    />
                  </div>
                  <div style={{...SelectStyle}}>
                    <RHFDropdown
                        options={
                          DistrictList?.map((i) => ({
                            value: i.id,
                            label: i.name,
                            name: i.name,
                          }))
                        }
                        style={{...SelectStyle}}
                        name="districtId"
                        disabled={!watchProvinceId}
                        placeholder="Chọn Quận/Huyện"
                        title="Quận/Huyện"
                        isRequired
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
                  <ButtonDS
                      type="submit"
                      loading={isSubmitting}
                      variant="contained"
                      tittle="Lưu"
                  />
                  <ButtonCancelStyle onClick={onClose}>Hủy</ButtonCancelStyle>
                </Stack>
              </OrganizationFromFooterStyle>
            </FormProvider>
          </Scrollbar>
        </Drawer>
      </>
  )
}

export default React.memo(OrganizationForm);