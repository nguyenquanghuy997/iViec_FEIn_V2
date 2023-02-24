import ChipDS from "@/components/DesignSystem/ChipDS";
// import ImageUpload from "../ImageUpload";
import Image from "@/components/Image";
import {
  FormProvider,
  RHFAutocomplete,
  RHFTextField,
} from "@/components/hook-form";
import RHFDropdown from "@/components/hook-form/RHFDropdown";
import RHFListImage from "@/components/hook-form/RHFListImage";
import { DOMAIN_SERVER_API } from "@/config";
import {
  useUpdateCompanyInfoMutation,
  useGetJobCategoriesQuery,
  useLazyGetProvinceQuery,
  useLazyGetDistrictByProvinceIdQuery,
  useGetImageQuery,
} from "@/sections/companyinfor/companyInforSlice";
import { LIST_ORGANIZATION_SIZE } from "@/utils/formatString";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Alert, Stack } from "@mui/material";
import { Box, Typography, Divider, InputLabel } from "@mui/material";
import { Input } from "antd";
import qs from "query-string";
import { React, useEffect } from "react";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useSnackbar } from 'notistack'

const InputStyle = { width: 265, minHeight: 40 };
const { enqueueSnackbar } = useSnackbar()

const FormCompanyInfor = ({ data }) => {
  const defaultValues = { ...data };
  const ProfileSchema = Yup.object().shape({
    name: Yup.string(),
    provinceId: Yup.string().required("Chưa chọn Tỉnh / Thành phố"),
    districtId: Yup.string().required("Chưa chọn Quận / Huyện"),
    address: Yup.string().required("Chưa nhập Địa chỉ"),
    email: Yup.string()
      .email("Email không đúng định dạng")
      .required("Chưa nhập Email"),
    phoneNumber: Yup.number().required("Chưa nhập Số điện thoại"),
    jobCategories: Yup.array().min(1, "Ngành nghề không được bỏ trống"),
    organizationSize: Yup.string().required("Chưa chọn Quy mô nhân sự"),
    workingEnvironment: Yup.string().required("Chưa nhập Giới thiệu"),
  });

  const { TextArea } = Input;
  const [updateCompanyInfo] = useUpdateCompanyInfoMutation();
  const { data: { items: JobCategoryList = [] } = {} } =
    useGetJobCategoriesQuery();
  const [fetchProvice, { data: { items: ProviceList = [] } = {} }] =
    useLazyGetProvinceQuery();
  const [getDistrictByProvinceId, { data: { items: DistrictList = [] } = {} }] =
    useLazyGetDistrictByProvinceIdQuery();
  const { data: avatar } = useGetImageQuery(data?.avatar);

  const methods = useForm({
    mode: "all",
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  const {
    // setValue,
    setError,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = methods;
  const watchProvinceId = watch("provinceId");

  useEffect(() => {
    fetchProvice().unwrap();
  }, []);

  useEffect(() => {
    if (watchProvinceId) {
      getDistrictByProvinceId(watchProvinceId).unwrap();
      methods.resetField("organizationDistrictId");
    }
  }, [watchProvinceId]);

  const onSubmit = async (d) => {
    try {
      const res = await updateCompanyInfo(
        qs.stringify({
          name: data.name,
          avatar: data.avatar,
          workingEnvironment: d.workingEnvironment,
          workingEnvironmentImages: d.workingEnvironmentImages,
          organizationImages: d.organizationImages,
          provinceId: d.provinceId,
          districtId: d.districtId,
          address: d.address,
          email: d.email,
          phoneNumber: d.phoneNumber,
          jobCategories: d.jobCategories,
          organizationSize: d.organizationSize,
        })
      ).unwrap();

      if (!res.Succeeded) throw res;

      enqueueSnackbar("Chỉnh sửa thông tin công ty thành công!");
      // onFinish();
    } catch (err) {
      const message =
        err?.Errors?.[0]?.Description || err?.data?.message || err?.message;
      setError("afterSubmit", { ...err, message });
    }
  };
  console.log("hih", avatar);

  // const EmptyImage = () => {
  //   const obj = [];
  //   let i = 0;
  //   while (i < 6 - itemData.length) {
  //     obj.push(<FileUpload />);
  //     i++;
  //   }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {!!errors.afterSubmit && (
        <Alert severity="error">{errors.afterSubmit?.message}</Alert>
      )}

      <div
        style={{
          flex: 1,
          paddingLeft: "24px",
          paddingRight: "24px",
          borderRadius: 8,
          paddingBottom: 30,
          overflow: "hidden",
          background: "#fff",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            mb: "28px",
            mt: 2,
          }}
        >
          <Image
            disabledEffect
            visibleByDefault
            src={`${DOMAIN_SERVER_API}/Image/GetImage?imagePath=${data.avatar}`}
            sx={{
              width: 60,
              height: 60,
              borderRadius: 120,
              border: "3px solid #fff",
            }}
          />

          <Box
            sx={{
              pl: 2,
              width: "90%",
            }}
          >
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: "600",
                color: "#393B3E",
                mr: 1,
              }}
            >
              {data?.name}
            </Typography>
            <Typography sx={{ color: "#455570", fontSize: 12 }}>
              Để chỉnh sửa tên công ty, vui lòng liên hệ admin qua email
              Support@iviec.com.vn
            </Typography>
          </Box>
        </Box>
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 2.5 }}>
          <Stack>
            <RHFTextField
              name="phoneNumber"
              label="Số điện thoại"
              placeholder="Nhập SĐT doanh nghiệp"
              required
              style={{ ...InputStyle }}
            />
          </Stack>
          <Stack>
            <RHFTextField
              name="email"
              label="Email"
              placeholder="Nhập Email doanh nghiệp"
              required
              style={{ ...InputStyle }}
            />
          </Stack>
        </Stack>

        <Stack direction="row" justifyContent="space-between" sx={{ mb: 2.5 }}>
          <div style={{ ...InputStyle }}>
            <RHFAutocomplete
              options={JobCategoryList?.map((i) => ({
                value: i.id,
                label: `${i.name[0].toUpperCase()}${i.name.slice(1)}`,
                name: i?.name,
              }))}
              name="jobCategories"
              label="Ngành nghề"
              required={true}
              placeholder="Chọn ngành nghề"
              AutocompleteProps={{
                multiple: true,
                limitTags: 2,
                sx: {
                  "&.MuiAutocomplete-root .MuiAutocomplete-inputRoot": {
                    padding: "4.5px 14px 4.5px 8px!important",
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: "#1E5EF3",
                    fontWeight: 500,
                    borderRadius: "6px",
                  },
                  ".MuiFormHelperText-root": {
                    marginTop: 1,
                    marginLeft: 0,
                  },
                },
                isOptionEqualToValue: (option, value) =>
                  option.value === value.value,
                renderTags: (value, getTagProps) =>
                  value.map(({ label, id }, index) => (
                    <ChipDS
                      {...getTagProps({ index })}
                      key={`${id}-${index}`}
                      size="medium"
                      label={label}
                    />
                  )),
              }}
            />
          </div>

          <div style={{ ...InputStyle }}>
            <RHFDropdown
              options={LIST_ORGANIZATION_SIZE.map((i) => ({
                value: i.value,
                label: i.name,
                name: i.name,
              }))}
              style={{ ...InputStyle }}
              name="organizationSize"
              multiple={false}
              placeholder="Chọn quy mô nhân sự"
              label="Quy mô nhân sự"
              required
            />
          </div>
        </Stack>

        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ mb: 2.5, mt: 2.5 }}
        >
          <Stack>
            <div style={{ ...InputStyle }}>
              <RHFDropdown
                options={ProviceList.map((i) => ({
                  value: i.id,
                  label: i.name,
                  name: i.name,
                }))}
                name="provinceId"
                multiple={false}
                placeholder="Chọn Tỉnh/Thành phố"
                label="Tỉnh/Thành phố"
                required
              />
            </div>
          </Stack>
          <Stack>
            <div style={{ ...InputStyle }}>
              <RHFDropdown
                options={DistrictList.map((i) => ({
                  value: i.id,
                  label: i.name,
                  name: i.name,
                }))}
                style={{ ...InputStyle }}
                name="districtId"
                multiple={false}
                disabled={!watchProvinceId}
                placeholder="Chọn Quận/Huyện"
                label="Quận/Huyện"
                required
              />
            </div>
          </Stack>
        </Stack>

        <Stack
          direction="row"
          justifyContent="space-between"
          width={"100%"}
          sx={{ mb: 2.5 }}
        >
          <Stack sx={{ width: "100%" }}>
            <RHFTextField
              name="address"
              placeholder="Số nhà, tên đường, xã/phường..."
              label="Địa chỉ chi tiết"
            />
          </Stack>
        </Stack>
        <Divider />

        <Controller
          name="workingEnvironment"
          render={({ field}) => (
            <Stack>
              <InputLabel
                required={true}
                sx={{
                  color: "#5C6A82",
                  fontSize: 14,
                  fontWeight: 500,
                  mt: 2,
                  mb: 1,
                }}
              >
                Môi trường làm việc
              </InputLabel>

              <TextArea
                showCount
                value={field?.value}
                maxLength={150}
                style={{
                  height: 180,
                  width: "556px",
                  resize: "none",
                  marginBottom: "20px",
                }}
                onChange={() => {}}
              />
            </Stack>
          )}
        />

        <RHFListImage name="workingEnvironmentImages" />

        <Divider sx={{ mt: 2 }} />

        <Controller
          name="text"
          render={() => (
            <Stack>
              <InputLabel
                required={true}
                sx={{
                  color: "#5C6A82",
                  fontSize: 14,
                  fontWeight: 500,
                  mt: 2,
                  mb: 1,
                }}
              >
                Giới thiệu
              </InputLabel>

              <TextArea
                showCount
                maxLength={150}
                style={{
                  height: 180,
                  width: "556px",
                  resize: "none",
                  marginBottom: "20px",
                }}
                onChange={() => {}}
              />
            </Stack>
          )}
        />
        <RHFListImage name="organizationImages" />
        <Divider sx={{ pt: 3 }} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: 12,
          position: "fixed",
          bottom: 0,
          background: "#FDFDFD",
          width: "100%",
          padding: "16px 24px",
          border: "1px solid #EFF3F6",
        }}
      >
        <LoadingButton
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{ backgroundColor: "#1976D2", p: 1, fontSize: 14 }}
        >
          {"Lưu"}
        </LoadingButton>
        <div style={{ width: 8 }} />

        <LoadingButton
          variant="text"
          // onClick={onFinish}
          sx={{ color: "#455570" }}
        >
          {"Hủy"}
        </LoadingButton>
      </div>
    </FormProvider>
  );
};
export default FormCompanyInfor;
