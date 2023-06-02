import { Text, View } from "@/components/DesignSystem/FlexStyled";
import { RHFSelect, RHFTextField } from "@/components/hook-form";
import { Label, TextFieldStyle, } from "@/components/hook-form/style";
import { useGetDistrictByProvinceIdQuery, useGetProvinceQuery, } from "@/sections/companyinfor/companyInforSlice";
import {
  useCreateChildOrganizationMutation,
  useGetOrganizationByIdQuery,
  useUpdateOrganizationMutation,
} from "@/sections/organization/override/OverrideOrganizationSlice";
import { convertViToEn } from "@/utils/function";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, CircularProgress, Divider, Grid, Modal, Stack, useTheme } from "@mui/material";
import { isEmpty, pick } from "lodash";
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { ViewModel } from "@/utils/cssStyles";
import { ButtonDS } from "@/components/DesignSystem";
import Iconify from "@/components/Iconify";
import { ButtonCancelStyle } from "@/sections/applicant/style";

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
    parentOrganizationId: null,
    name: "",
    code: "",
    email: "",
    phoneNumber: "",
    provinceId: null,
    districtId: null,
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
    email: Yup.string().nullable().matches(/^$|^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/, 'Email không đúng định dạng'),
    phoneNumber: Yup.string()
    .matches(/^(?:[0-9]{5}|[0-9]{10}|)$/, "Số điện thoại không đúng định dạng").nullable(),
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
    <FormProvider {...methods} onSubmit={handleSubmit(onSubmit)}>
      <Modal
        open={isOpen}
        onClose={onClose}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          ".MuiModal-backdrop": {background: "rgba(9, 30, 66, 0.25)"},
        }}
      >
        <ViewModel
          sx={{
            width: "unset",
            justifyContent: "space-between",
          }}
        >
          {/* header */}
          <View style={{height: "calc(100% - 64px)"}}>
            <View
              flexrow
              atcenter
              pv={12}
              ph={24}
              bgcolor={theme.palette.common.white}
            >
              <Text flex="true" fontsize={16} fontweight={"600"}>
                {actionType === 0 ? "Thêm mới đơn vị" : "Chỉnh sửa đơn vị"}
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
            {isLoading ? (
              <>
                <View flex="true" contentcenter="true">
                  <CircularProgress/>
                </View>
              </>
            ) : (
              <Grid
                container
                flexDirection={"row"}
                height={"100%"}
                flexWrap={"nowrap"}
                overflow={"hidden"}
              >
                <Grid
                  container
                  sx={{width: "600px", overflowY: "auto", padding: "24px"}}
                  height={"100%"}
                  flexWrap={"nowrap"}
                  flexDirection={"column"}
                >
                  {!isEmpty(parentNode) && (
                    <View>
                      <Label required={true}>Trực thuộc</Label>
                      <TextFieldStyle
                        name="parentOrganizationId"
                        placeholder="Nhập tên đơn vị Trực thuộc"
                        style={{...InputStyle, backgroundColor: theme.palette.common.bgrObject}}
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
                    <Label>Email đơn vị</Label>
                    <RHFTextField
                      name="email"
                      placeholder="Nhập email đơn vị"
                      beforeChange={() => convertViToEn(watch("email"), false)}
                      style={{...InputStyle}}
                    />
                  </View>
                  <View>
                    <Label>Số điện thoại đơn vị</Label>
                    <RHFTextField
                      name="phoneNumber"
                      placeholder="Nhập SĐT đơn vị"
                      style={{...InputStyle}}
                    />
                  </View>
                  <Divider sx={{mb: 3}}/>
                  <Stack direction="row" justifyContent="space-between">
                    <Box sx={{mb: 3, width: "100%",}}>
                      <Label>Tỉnh/Thành phố</Label>
                      <RHFSelect
                        options={ProvinceList?.map((i) => ({value: i.id, label: i.name,}))}
                        name="provinceId"
                        placeholder="Chọn Tỉnh/Thành phố"
                        style={{...SelectStyle}}
                      />
                    </Box>
                    <Box sx={{mb: 3, width: "100%"}}>
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
                tittle={actionType == 0 ? "Thêm" : "Sửa"}
                onSubmit={() => handleSubmit(onSubmit)}
              />
              <ButtonCancelStyle onClick={onClose}>Hủy</ButtonCancelStyle>
            </View>
          </View>
        </ViewModel>
      </Modal>
    </FormProvider>
  );
};

export default OrganizationForm;
