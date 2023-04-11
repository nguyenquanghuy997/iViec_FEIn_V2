import {View} from "@/components/DesignSystem/FlexStyled";
import {FormProvider, RHFSelect, RHFTextField} from "@/components/hook-form";
import {Label, TextFieldStyle,} from "@/components/hook-form/style";
import {useGetDistrictByProvinceIdQuery, useGetProvinceQuery,} from "@/sections/companyinfor/companyInforSlice";
import {
  useCreateChildOrganizationMutation,
  useGetOrganizationByIdQuery,
  useUpdateOrganizationMutation,
} from "@/sections/organization/override/OverrideOrganizationSlice";
import {convertViToEn} from "@/utils/function";
import {yupResolver} from "@hookform/resolvers/yup";
import {Box, CircularProgress, Divider, Drawer, Stack, useTheme} from "@mui/material";
import {isEmpty, pick} from "lodash";
import {useSnackbar} from "notistack";
import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import * as Yup from "yup";
import FormModalHead from "@/components/BaseComponents/form-modal/FormModalHead";
import {drawerPaperStyle} from "@/components/drawer-edit-form/styles";
import FormModalBottom from "@/components/BaseComponents/form-modal/FormModalBottom";

const InputStyle = {
  minHeight: 44,
  maxWidth: 552,
  marginBottom: 24,
};

const SelectStyle = {
  minHeight: 44,
  maxWidth: 264,
};

const OrganizationForm = ({isOpen, onClose, parentNode, actionType}) => {
  const theme = useTheme();
  const {data: organization, isLoading} = useGetOrganizationByIdQuery(
      {OrganizationId: parentNode?.id}, {skip: !parentNode?.id || actionType === 0}
  );

  const {enqueueSnackbar} = useSnackbar();

  const [createChildOrganization] = useCreateChildOrganizationMutation();
  const [updateOrganization] = useUpdateOrganizationMutation();

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

  const OrganizationFormSchema = Yup.object().shape({
    name: Yup.string()
        .nullable()
        .required("Tên đơn vị không được bỏ trống")
        .max(50, "Tên đơn vị tối đa 50 ký tự"),
    code: Yup.string()
        .nullable()
        .required("Mã đơn vị không được bỏ trống")
        .max(20, "Mã đơn vị tối đa 20 ký tự"),
    email: Yup.string().nullable().required("Email không đúng định dạng"),
    phoneNumber: Yup.string()
        .required("Số điện thoại không được bỏ trống")
        .matches(/(84|840|0)[3|5|7|8|9]+([0-9]{8})\b/, "Số điện thoại không đúng định dạng").nullable(),
    address: Yup.string()
        .nullable()
        .max(255, "Địa chỉ đơn vị tối đa 255 ký tự"),
  });

  // form
  const methods = useForm({
    mode: "onSubmit",
    resolver: yupResolver(OrganizationFormSchema),
    defaultValues,
  });

  const {
    watch,
    handleSubmit,
    formState: {isSubmitting},
  } = methods;

  const watchProvinceId = watch("provinceId");

  const {data: {items: ProvinceList = []} = {}} = useGetProvinceQuery();
  const {data: {items: DistrictList = []} = {}} = useGetDistrictByProvinceIdQuery(
      watchProvinceId, {skip: !watchProvinceId}
  );

  useEffect(() => {
    if (organization && actionType === 1) {
      for (let i in defaultValues) {
        methods.setValue(i, organization[i]);
      }
    } else {
      methods.reset(defaultValues);
    }
  }, [organization, actionType]);

  const onSubmit = async (data) => {
    const body = {...data};
    if (actionType === 0) {
      try {
        body.parentOrganizationId = parentNode?.id ? parentNode.id : null;
        await createChildOrganization(body).unwrap();
        enqueueSnackbar("Thêm đơn vị thành công!", {
          autoHideDuration: 1000,
        });
        onClose();
      } catch (err) {
        enqueueSnackbar("Thêm đơn vị không thành công!", {
          autoHideDuration: 1000,
          variant: "error",
        });
        throw err;
      }
    } else {
      try {
        const dataSubmit = pick(body, [
          "id",
          "name",
          "code",
          "email",
          "phoneNumber",
          "provinceId",
          "districtId",
          "address",
        ]);
        const {
          name,
          code,
          phoneNumber,
          email,
          provinceId,
          districtId,
          address,
        } = dataSubmit;
        await updateOrganization({
          organizationId: organization?.id,
          name,
          code,
          phoneNumber,
          email,
          provinceId,
          districtId,
          address,
        }).unwrap();
        enqueueSnackbar("Chỉnh sửa đơn vị thành công!");
        onClose();
      } catch (err) {
        enqueueSnackbar("Chỉnh sửa đơn vị không thành công!", {
          autoHideDuration: 1000,
          variant: "error",
        });
        throw err;
      }
    }
  };

  return (
      <Drawer
          open={isOpen}
          onClose={onClose}
          anchor="right"
          PaperProps={{
            sx: drawerPaperStyle({...theme, width: 600}),
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
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <FormModalHead
              title={actionType === 0 ? "Thêm mới đơn vị" : "Chỉnh sửa đơn vị"}
              onClose={onClose}
          />
          {isLoading ? (
              <>
                <Box textAlign="center" my={1}>
                  <CircularProgress size={18}/>
                </Box>
              </>
          ) : (
              <div className="edit-container">
                {!isEmpty(parentNode) && (
                    <View>
                      <Label required={true}>Trực thuộc</Label>
                      <TextFieldStyle
                          name="parentOrganizationId"
                          placeholder="Nhập tên đơn vị Trực thuộc"
                          style={{...InputStyle, backgroundColor: "#EFF3F6"}}
                          value={actionType === 0 ? parentNode?.name : organization?.parentOrganizationName}
                          disabled
                          variant="standard"
                          InputProps={{disableUnderline: true}}
                      />
                    </View>
                )}
                <View>
                  <Label required={true}>Tên đơn vị</Label>
                  <RHFTextField
                      name="name"
                      placeholder="Nhập tên đơn vị"
                      style={{...InputStyle}}
                  />
                </View>
                <View>
                  <Label required={true}>Mã đơn vị</Label>
                  <RHFTextField
                      name="code"
                      placeholder="Nhập mã đơn vị"
                      style={{...InputStyle}}
                  />
                </View>
                <View>
                  <Label required={true}>Email đơn vị</Label>
                  <RHFTextField
                      name="email"
                      placeholder="Nhập email đơn vị"
                      beforeChange={() => convertViToEn(watch("email"), false)}
                      style={{...InputStyle}}
                  />
                </View>
                <View>
                  <Label required={true}>Số điện thoại đơn vị</Label>
                  <RHFTextField
                      name="phoneNumber"
                      placeholder="Nhập SĐT đơn vị"
                      style={{...InputStyle}}
                  />
                </View>
                <Divider sx={{mb: 2}}/>
                <Stack direction="row" justifyContent="space-between" sx={{my: 2.5}}>
                  <Box sx={{mb: 2, width: "100%",}}>
                    <Label>Tỉnh/Thành phố</Label>
                    <RHFSelect
                        options={ProvinceList?.map((i) => ({value: i.id, label: i.name,}))}
                        name="provinceId"
                        placeholder="Chọn Tỉnh/Thành phố"
                        style={{...SelectStyle}}
                    />
                  </Box>
                  <Box sx={{mb: 2, width: "100%"}}>
                    <Label>Quận/Huyện</Label>
                    <RHFSelect
                        options={DistrictList?.map((i) => ({value: i.id, label: i.name,}))}
                        name="districtId"
                        disabled={!watchProvinceId}
                        placeholder="Chọn Quận/Huyện"
                        style={{...SelectStyle}}
                    />
                  </Box>
                </Stack>
                <View>
                  <Label>Địa chỉ chi tiết</Label>
                  <RHFTextField
                      name="address"
                      placeholder="Số nhà, Tên đường, Xã/Phường ...."
                      style={{...InputStyle}}/>
                </View>
              </div>
          )}
          <FormModalBottom
              onClose={onClose}
              onSubmit={handleSubmit(onSubmit)}
              loading={isSubmitting}
              btnConfirm={{
                title: actionType == 0 ? "Thêm" : "Sửa"
              }}
          />
        </FormProvider>
      </Drawer>
  );
};

export default OrganizationForm;
