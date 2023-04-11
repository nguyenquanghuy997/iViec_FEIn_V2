import MuiButton from "@/components/BaseComponents/MuiButton";
import { ButtonDS } from "@/components/DesignSystem";
import { View, Text } from "@/components/DesignSystem/FlexStyled";
import Iconify from "@/components/Iconify";
import { FormProvider, RHFSelect, RHFTextField } from "@/components/hook-form";
import {
  Label,
  TextFieldStyle,
} from "@/components/hook-form/style";
import {
  useGetDistrictByProvinceIdQuery,
  useGetProvinceQuery,
} from "@/sections/companyinfor/companyInforSlice";
import {
  useCreateChildOrganizationMutation,
  useGetOrganizationByIdQuery,
  useUpdateOrganizationMutation,
} from "@/sections/organization/override/OverrideOrganizationSlice";
import { ViewModel } from "@/utils/cssStyles";
import { convertViToEn } from "@/utils/function";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Divider, Modal, Stack } from "@mui/material";
import { isEmpty, pick } from "lodash";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const InputStyle = {
  minHeight: 44,
  minWidth: 552,
  marginBottom: 24,
};

// const SelectStyle = {
//   minHeight: 44,
//   width: 264,
// };

const OrganizationForm = ({ isOpen, onClose, parentNode, actionType }) => {
  const { data: organization } = useGetOrganizationByIdQuery(
    {
      OrganizationId: parentNode?.id,
    },
    { skip: !parentNode?.id || actionType === 0 }
  );

  const { enqueueSnackbar } = useSnackbar();

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
    formState: { isSubmitting },
  } = methods;

  const watchProvinceId = watch("provinceId");

  const { data: { items: ProvinceList = [] } = {} } = useGetProvinceQuery();
  const { data: { items: DistrictList = [] } = {} } =
    useGetDistrictByProvinceIdQuery(watchProvinceId, {
      skip: !watchProvinceId,
    });

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
    const body = { ...data };
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
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Modal
        open={isOpen}
        onClose={onClose}
        sx={{ display: "flex", justifyContent: "flex-end" }}
      >
        <ViewModel>
          {/* header */}
          <View
            flexrow="true"
            atcenter="center"
            pv={12}
            ph={24}
            bgcolor={"#FDFDFD"}
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
          <Divider />
          {/* body */}
          <View flex="true" p={24} pb={28} style={{ overflowY: "scroll" }}>
            {!isEmpty(parentNode) && (
              <View>
                <Label required={true}>Trực thuộc</Label>
                <TextFieldStyle
                  name="parentOrganizationId"
                  placeholder="Nhập tên đơn vị Trực thuộc"
                  style={{ ...InputStyle, backgroundColor: "#EFF3F6" }}
                  value={
                    actionType === 0
                      ? parentNode?.name
                      : organization?.parentOrganizationName
                  }
                  disabled
                  variant="standard"
                  InputProps={{ disableUnderline: true }}
                />
              </View>
            )}
            <View>
              <Label required={true}>Tên đơn vị</Label>

              <RHFTextField
                name="name"
                placeholder="Nhập tên đơn vị"
                isRequired
                style={{ ...InputStyle }}
              />
            </View>

            <View>
              <Label required={true}>Mã đơn vị</Label>

              <RHFTextField
                name="code"
                placeholder="Nhập mã đơn vị"
                isRequired
                style={{ ...InputStyle }}
              />
            </View>

            <View>
              <Label required={true}>Email đơn vị</Label>

              <RHFTextField
                name="email"
                placeholder="Nhập email đơn vị"
                beforeChange={() => convertViToEn(watch("email"), false)}
                style={{ ...InputStyle }}
              />
            </View>

            <View>
              <Label required={true}>Số điện thoại đơn vị</Label>

              <RHFTextField
                name="phoneNumber"
                placeholder="Nhập SĐT đơn vị"
                style={{ ...InputStyle }}
              />
            </View>

            <Divider sx={{ mb: 2 }} />
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ my: 2.5 }}
            >
              <Box sx={{ mb: 2, width: "100%", mr: "4%" }}>
                <Label>Tỉnh/Thành phố</Label>
                <RHFSelect
                  options={ProvinceList?.map((i) => ({
                    value: i.id,
                    label: i.name,
                  }))}
                  name="provinceId"
                  placeholder="Chọn Tỉnh/Thành phố"
                />
              </Box>
              <Box sx={{ mb: 2, width: "100%" }}>
                <Label>Quận/Huyện</Label>
                <RHFSelect
                  options={DistrictList?.map((i) => ({
                    value: i.id,
                    label: i.name,
                  }))}
                  name="districtId"
                  disabled={!watchProvinceId}
                  placeholder="Chọn Quận/Huyện"
                />
              </Box>
            </Stack>
            <View>
              <Label>Địa chỉ chi tiết</Label>

              <RHFTextField
                name="address"
                placeholder="Số nhà, Tên đường, Xã/Phường ...."
                style={{ ...InputStyle }}
              />
            </View>
          </View>
          {/* footer */}
          <View
            flexrow="true"
            pv={16}
            ph={24}
            boxshadow={"inset 0px 1px 0px #EBECF4"}
          >
            <ButtonDS
              type="submit"
              loading={isSubmitting}
              variant="contained"
              onClick={handleSubmit(onSubmit)}
              tittle={actionType == 0  ? "Thêm" : "Sửa"}
            />
            <View width={8} />
            <MuiButton
              title={"Hủy"}
              color={"basic"}
              onClick={onClose}
              sx={{
                height: 36,
              }}
            />
            <View width={8} />
            <View flex="true" />
          </View>
        </ViewModel>
      </Modal>
    </FormProvider>
  );
};

export default OrganizationForm;
