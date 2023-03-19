import { useUploadImageCompanyMutation } from "../companyInforSlice";
import EditUpload from "./EditUpload";
import {
  FormProvider,
  RHFAutocomplete,
  RHFTextField,
} from "@/components/hook-form";
import RHFDropdown from "@/components/hook-form/RHFDropdown";
import RHFListImage from "@/components/hook-form/RHFListImage";
import {
  useGetJobCategoriesQuery,
  useLazyGetDistrictByProvinceIdQuery,
  useLazyGetProvinceQuery,
  useUpdateCompanyInfoMutation,
} from "@/sections/companyinfor/companyInforSlice";
import { LIST_ORGANIZATION_SIZE } from "@/utils/formatString";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Divider,
  InputLabel,
  Stack,
  Typography,
} from "@mui/material";
import dynamic from "next/dynamic";
import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const InputStyle = { width: 265, minHeight: 40 };
const Editor = dynamic(() => import("./editor"), {
  ssr: false,
});

const FormCompanyInfor = ({ data, onClose }) => {
  const refAvatar = useRef(null);
  const refBackground = useRef(null);

  const [image, setImage] = useState(data?.organizationInformation.avatar);
  const [bg, setBg] = useState(data?.organizationInformation.coverPhoto);
  const [imageFile, setImageFile] = useState(null);
  const [imageBg, setImageBg] = useState(null);
  const imageHandler = (e) => {
    setImageFile(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleImage = (e) => {
    setImageBg(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setBg(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const [uploadImage] = useUploadImageCompanyMutation();
  const { enqueueSnackbar } = useSnackbar();
  const [description, setDescription] = useState(null);
  const defaultValues = { ...data?.organizationInformation };
  // const ProfileSchema = Yup.object().shape({
  //   provinceId: Yup.string().required("Chưa chọn Tỉnh / Thành phố"),
  //   districtId: Yup.string().required("Chưa chọn Quận / Huyện"),
  //   address: Yup.string().required("Chưa nhập Địa chỉ"),
  //   email: Yup.string()
  //     .email("Email không đúng định dạng")
  //     .matches(CHECK_EMAIL, "Email không đúng định dạng")
  //     .required("Email không được bỏ trống"),
  //   phoneNumber: Yup.number().required("Chưa nhập Số điện thoại"),
  //   jobCategoryIds: Yup.array()
  //     .min(1, "Ngành nghề không được bỏ trống")
  //     .max(3, "Chọn tối đa 3 ngành nghê"),
  //   organizationSize: Yup.string().required("Chưa chọn Quy mô nhân sự"),
  //   description: Yup.string(),
  //   avatar: Yup.mixed().required("Tải lên hình ảnh đại diện"),
  //   coverPhoto: Yup.mixed().required("Tải lên hình ảnh đại diện"),
  // });

  const [updateCompanyInfo] = useUpdateCompanyInfoMutation();
  const { data: { items: JobCategoryList = [] } = {} } =
    useGetJobCategoriesQuery();

  const [fetchProvice, { data: { items: ProviceList = [] } = {} }] =
    useLazyGetProvinceQuery();
  const [getDistrictByProvinceId, { data: { items: DistrictList = [] } = {} }] =
    useLazyGetDistrictByProvinceIdQuery();

  const methods = useForm({
    // resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  const {
    setValue,
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
    const imageRes = await uploadImage({
      File: imageFile,
      OrganizationId: d?.id,
    });

    const bgRes = await uploadImage({
      File: imageBg,
      OrganizationId: d.id,
    });
    try {
      if (imageRes) {
        const res = {
          id: data?.organizationInformation?.id,
          avatar: imageRes?.data,
          coverPhoto: bgRes?.data,
          provinceId: d.provinceId,
          districtId: d.districtId,
          address: d.address,
          email: d.email,
          description: d.description,
          phoneNumber: d.phoneNumber,
          jobCategoryIds: d.jobCategoryIds?.map((item) => item?.value),
          organizationSize: d.organizationSize,
        };
        try {
          await updateCompanyInfo(res).unwrap();
          enqueueSnackbar("Chỉnh sửa thông tin công ty thành công!", {
            autoHideDuration: 2000,
          });
          onClose()
          // location.reload()
        } catch (err) {
          enqueueSnackbar(errors.afterSubmit?.message, {
            autoHideDuration: 1000,
            variant: "error",
          });
        }
      }
    } catch (err) {
      const message =
        err?.Errors?.[0]?.Description || err?.data?.message || err?.message;
      setError("afterSubmit", { ...err, message });
      enqueueSnackbar(errors.afterSubmit?.message);
    }
  };

  // const EmptyImage = () => {
  //   const obj = [];
  //   let i = 0;
  //   while (i < 6 - itemData.length) {
  //     obj.push(<FileUpload />);
  //     i++;
  //   }

  useEffect(() => {
    if (!data) return;

    refAvatar.current = data.avatar;
    refBackground.current = data.coverPhoto;

    setDescription(data.description);

    setValue("description", data.description);
  }, [JSON.stringify(data)]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {/* {!!errors.afterSubmit && (
            <Alert severity="error">{errors.afterSubmit?.message}</Alert>
        )} */}
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
        <Box sx={{ py: 3 }}>
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: "600",
              color: "#393B3E",
              mr: 1,
            }}
          >
            {data?.name}
          </Typography>
          <Typography sx={{ color: "#455570", fontSize: 14 }}>
            Để chỉnh sửa tên công ty, vui lòng liên hệ admin qua email
            Support@iviec.com.vn
          </Typography>
        </Box>
        <Stack>
          <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
            Ảnh đại diện
          </Typography>

          <Box>
            <EditUpload
              image={image}
              imageHandler={imageHandler}
              ref={refAvatar}
              type="avatar"
              style={{
                width: 120,
                height: 120,
                borderRadius: 120,
                marginTop: "16px",
                marginRight: "24px",
              }}
            />
          </Box>
        </Stack>
        <Stack sx={{ py: 3 }}>
          <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
            Ảnh nền
          </Typography>
          <Box>
            <EditUpload
              image={bg}
              ref={refBackground}
              imageHandler={handleImage}
              style={{
                width: "100%",
                height: 136,
                background: "#EFF3F7",
                margin: "16px 0 24px 0",
              }}
            />
          </Box>
        </Stack>
        <Divider />
        <Stack direction="row" justifyContent="space-between" sx={{ my: 2.5 }}>
          <Box sx={{ mb: 2, width: "100%", mr: "4%" }}>
            <Typography sx={{ fontSize: 14 }}>
              Số điện thoại <span style={{ color: "red" }}> *</span>
            </Typography>
            <RHFTextField
              isRequired
              sx={{ minHeight: 44, width: "100%" }}
              name="phoneNumber"
              placeholder="Nhập SĐT doanh nghiệp"
            />
          </Box>
          <Box sx={{ mb: 2, width: "100%" }}>
            <Typography sx={{ fontSize: 14 }}>
              Email <span style={{ color: "red" }}> *</span>
            </Typography>
            <RHFTextField
              isRequired
              sx={{ minHeight: 44, width: "100%" }}
              name="email"
              placeholder="Nhập email doanh nghiệp"
            />
          </Box>
        </Stack>

        <Stack direction="row" justifyContent="space-between" sx={{ my: 2.5 }}>
          <div style={{ width: "100%", minHeight: 40 }}>
            <RHFAutocomplete
              options={JobCategoryList?.map((i) => ({
                value: i?.id,
                label: i?.name,
                name: i?.name,
              }))}
              name="jobCategoryIds"
              title="Ngành nghề"
              isRequired
              placeholder="Chọn tối đa 3 ngành nghề (bắt buộc)"
              multiple
              AutocompleteProps={{
                multiple: true,
              }}
            />
          </div>
        </Stack>
        <Stack direction="row" justifyContent="space-between" sx={{ my: 2.5 }}>
          <div style={{ ...InputStyle }}>
            <Typography sx={{ fontSize: 14 }}>
              Quy mô nhân sự <span style={{ color: "red" }}> *</span>
            </Typography>
            <RHFDropdown
              options={LIST_ORGANIZATION_SIZE.map((i) => ({
                value: i.id,
                label: i.name,
                name: i.name,
              }))}
              style={{ ...InputStyle }}
              name="organizationSize"
              multiple={false}
              placeholder="Chọn quy mô nhân sự"
              required
            />
          </div>
        </Stack>
        <Divider />

        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ mb: 2.5, mt: 2.5 }}
        >
          <Stack>
            <div style={{ ...InputStyle }}>
              <Typography sx={{ fontSize: 14 }}>
                Tỉnh/Thành phố <span style={{ color: "red" }}> *</span>
              </Typography>
              <RHFDropdown
                options={ProviceList.map((i) => ({
                  value: i.id,
                  label: i.name,
                  name: i.name,
                }))}
                name="provinceId"
                multiple={false}
                placeholder="Chọn Tỉnh/Thành phố"
                required
              />
            </div>
          </Stack>
          <Stack>
            <div style={{ ...InputStyle }}>
              <Typography sx={{ fontSize: 14 }}>
                Quận/Huyện <span style={{ color: "red" }}> *</span>
              </Typography>
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
            <Typography sx={{ fontSize: 14 }}>Địa chỉ chi tiết</Typography>
            <RHFTextField
              name="address"
              placeholder="Số nhà, tên đường, xã/phường..."
            />
          </Stack>
        </Stack>
        <Divider />

        <Controller
          name="text"
          render={() => (
            <Stack sx={{ mb: 4 }}>
              <InputLabel
                sx={{
                  color: "#5C6A82",
                  fontSize: 14,
                  fontWeight: 500,
                  mt: 2,
                  mb: 1,
                }}
              >
                Giới thiệu công ty
              </InputLabel>
              <Editor
                data={description}
                onChange={(_, e) => {
                  const text = e.getData();
                  setValue("description", text);
                }}
              />
              <RHFTextField
                name={"introduce"}
                variant={"standard"}
                sx={{ display: "none" }}
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

        <LoadingButton variant="text" sx={{ color: "#455570" }}>
          {"Hủy"}
        </LoadingButton>
      </div>
    </FormProvider>
  );
};
export default FormCompanyInfor;
