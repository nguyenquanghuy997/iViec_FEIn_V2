import {useEffect, useState} from "react";
import {yupResolver} from "@hookform/resolvers/yup";
import {Box, Divider, Stack, Typography} from "@mui/material";
import {useSnackbar} from "notistack";
import {useForm} from "react-hook-form";
import * as Yup from "yup";
import {get} from 'lodash';

import EditUpload from "./EditUpload";
import {FormProvider, RHFSelect, RHFTextField,} from "@/components/hook-form";
import RHFListImage from "@/components/hook-form/RHFListImage";
import RHFTinyEditor from "@/components/editor/RHFTinyEditor";
import MuiButton from "@/components/BaseComponents/MuiButton";

import {
  useGetDistrictByProvinceIdQuery,
  useGetProvinceQuery,
  useUploadImageCompanyMutation
} from "@/sections/companyinfor/companyInforSlice";
import {useGetJobCategoriesQuery, useUpdateCompanyInfoMutation,} from "@/sections/companyinfor/companyInforSlice";
import {LIST_ORGANIZATION_SIZE} from "@/utils/formatString";
import {LabelStyle} from "@/components/hook-form/style";
import {STYLE_CONSTANT as style} from "@/theme/palette";
import {DOMAIN_SERVER_API} from "@/config";

const InputStyle = {width: "100%", minHeight: 40};

const FormCompanyInfor = ({data, onClose}) => {
  const [image, setImage] = useState(null);
  const [bg, setBg] = useState(null);
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
  const {enqueueSnackbar} = useSnackbar();
  const defaultValues = {
    phoneNumber: '',
    email: '',
    jobCategoryIds: [],
    organizationSize: '',
    provinceId: '',
    districtId: '',
    description: ''
  };
  const ProfileSchema = Yup.object().shape({
    // avatar: Yup.mixed().required("Tải lên hình ảnh đại diện"),
    // coverPhoto: Yup.mixed().required("Tải lên hình ảnh đại diện"),
    phoneNumber: Yup.number().required("Số điện thoại không được bỏ trống"),
    email: Yup.string().email("Email không đúng định dạng").required("Email không được bỏ trống"),
    jobCategoryIds: Yup.array().min(1, "Ngành nghề không được bỏ trống").max(3, "Chọn tối đa 3 ngành nghê"),
    organizationSize: Yup.string().required("Quy mô nhân sự không được bỏ trống"),
    provinceId: Yup.string().required("Tỉnh/Thành phố không được bỏ trống"),
    districtId: Yup.string().required("Quận/Huyện không được bỏ trống"),
    description: Yup.string().required("Giới thiệu công ty không được bỏ trống"),
  });

  const [updateCompanyInfo] = useUpdateCompanyInfoMutation();
  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  const {
    setValue,
    setError,
    register,
    handleSubmit,
    watch,
    formState: {errors, isSubmitting},
  } = methods;
  const provinceId = watch("provinceId");

  const {data: {items: JobCategoryList = []} = {}} = useGetJobCategoriesQuery();
  const {data: {items: ProvinceList = []} = {}} = useGetProvinceQuery();
  const {data: {items: DistrictList = []} = {}} = useGetDistrictByProvinceIdQuery(provinceId, {skip: !provinceId});

  const onSubmit = async (d) => {

    console.log(d)

    const imageRes = await uploadImage({File: imageFile, OrganizationId: d?.id,});
    const bgRes = await uploadImage({File: imageBg, OrganizationId: d.id,});

    try {
      if (imageRes) {
        const res = {
          id: get(data, 'organizationInformation.id'),
          avatar: imageRes?.data || get(data, 'organizationInformation.avatar'),
          coverPhoto: bgRes?.data || get(data, 'organizationInformation.coverPhoto'),
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
          onClose();
        } catch (err) {
          enqueueSnackbar(errors.afterSubmit?.message, {
            autoHideDuration: 1000,
            variant: "error",
          });
        }
      }
    } catch (err) {
      const message = err?.Errors?.[0]?.Description || err?.data?.message || err?.message;
      setError("afterSubmit", {...err, message});
      enqueueSnackbar(errors.afterSubmit?.message);
    }
  };

  useEffect(() => {
    if (!data) return;
    setImage(`${DOMAIN_SERVER_API}/Image/GetImage?imagePath=${get(data, 'organizationInformation.avatar')}`);
    setBg(`${DOMAIN_SERVER_API}/Image/GetImage?imagePath=${get(data, 'organizationInformation.coverPhoto')}`);
    setValue("phoneNumber", get(data, 'organizationInformation.phoneNumber'));
    setValue("email", get(data, 'organizationInformation.email'));
    setValue("jobCategoryIds", get(data, 'organizationInformation.jobCategories')?.map(item => item.jobCategoryId));
    setValue("organizationSize", get(data, 'organizationInformation.organizationSize'));
    setValue("provinceId", get(data, 'organizationInformation.provinceId'));
    setValue("districtId", get(data, 'organizationInformation.districtId'));
    setValue("address", get(data, 'organizationInformation.address'));
    setValue("description", get(data, 'conclusion'));
  }, [JSON.stringify(data)]);

  return (
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{
          flex: 1,
          borderRadius: 8,
          paddingBottom: 36,
          overflow: "hidden",
          background: style.BG_WHITE,
          padding: 3,
          mb: 4
        }}>
          <Box sx={{ mb: 3 }}>
            <Typography sx={{fontSize: style.FONT_XL, fontWeight: style.FONT_BOLD, color: style.COLOR_TEXT_BLACK}}>
              {get(data, 'name') || 'Tập đoàn Giáo dục và Đào tạo Quốc tế Đại Tây Dương (Atlantic Group)'}
            </Typography>
            <Typography sx={{mt: 0.5, color: style.COLOR_TEXT_PRIMARY, fontSize: style.FONT_SM, fontWeight: style.FONT_NORMAL}}>
              Để chỉnh sửa tên công ty, vui lòng liên hệ admin qua email Support@iviec.com.vn
            </Typography>
          </Box>

          <Stack>
            <Typography sx={{fontSize: style.FONT_SM, fontWeight: style.FONT_MEDIUM, color: style.COLOR_TEXT_BLACK}}>
              Ảnh đại diện <span style={{color: style.COLOR_TEXT_SECONDARY}}>(142x142px)</span>
            </Typography>
            <Box>
              <EditUpload
                  image={image}
                  imageHandler={imageHandler}
                  ref={{...register("avatar")}}
                  type="avatar"
                  style={{width: 120, height: 120, borderRadius: '50%', backgroundColor: '#EFF3F6', marginTop: "16px", marginRight: "24px"}}
              />
            </Box>
          </Stack>
          <Stack sx={{py: 3}}>
            <Typography sx={{fontSize: style.FONT_SM, fontWeight: style.FONT_MEDIUM, color: style.COLOR_TEXT_BLACK}}>
              Ảnh nền <span style={{color: style.COLOR_TEXT_SECONDARY}}>(1372x249px)</span>
            </Typography>
            <Box>
              <EditUpload
                  image={bg}
                  ref={{...register("coverPhoto")}}
                  imageHandler={handleImage}
                  style={{width: "100%", height: 136, background: "#EFF3F7", margin: "16px 0 24px 0"}}
              />
            </Box>
          </Stack>
          <Divider/>
          <Stack direction="row" justifyContent="space-between" sx={{my: 2.5}}>
            <Box sx={{mb: 2, width: "100%", mr: "4%"}}>
              <LabelStyle required>Số điện thoại</LabelStyle>
              <RHFTextField
                  sx={{minHeight: 44, width: "100%"}}
                  name="phoneNumber"
                  placeholder="Nhập SĐT doanh nghiệp"
              />
            </Box>
            <Box sx={{mb: 2, width: "100%"}}>
              <LabelStyle required>Email</LabelStyle>
              <RHFTextField
                  sx={{minHeight: 44, width: "100%"}}
                  name="email"
                  placeholder="Nhập email doanh nghiệp"
              />
            </Box>
          </Stack>

          <Stack direction="row" justifyContent="space-between" sx={{my: 2.5}}>
            <div style={{width: "100%", minHeight: 40}}>
              <LabelStyle required>Ngành nghề</LabelStyle>
              <RHFSelect
                  options={JobCategoryList?.map((i) => ({value: i?.id, label: i?.name}))}
                  name="jobCategoryIds"
                  placeholder="Chọn tối đa 3 ngành nghề (bắt buộc)"
                  multiple
              />
            </div>
          </Stack>
          <Stack direction="row" sx={{my: 2.5, width: "50%"}}>
            <div style={{...InputStyle}}>
              <LabelStyle required>Quy mô nhân sự</LabelStyle>
              <RHFSelect
                  options={LIST_ORGANIZATION_SIZE.map((i) => ({value: i.value, label: i.name}))}
                  style={{...InputStyle}}
                  name="organizationSize"
                  placeholder="Chọn quy mô nhân sự"
              />
            </div>
          </Stack>
          <Divider/>
          <Stack direction="row" justifyContent="space-between" sx={{my: 2.5}}>
            <Stack sx={{minHeight: "44px", width: "49%"}}>
              <LabelStyle required>Tỉnh/Thành phố</LabelStyle>
              <RHFSelect
                  options={ProvinceList.map((i) => ({value: i.id, label: i.name,}))}
                  name="provinceId"
                  placeholder="Chọn Tỉnh/Thành phố"
              />
            </Stack>
            <Stack sx={{minHeight: "44px !important", width: "49%"}}>
              <LabelStyle required>Quận/Huyện</LabelStyle>
              <RHFSelect
                  options={DistrictList.map((i) => ({value: i.id, label: i.name,}))}
                  name="districtId"
                  disabled={!provinceId}
                  placeholder="Chọn Quận/Huyện"
              />
            </Stack>
          </Stack>

          <Stack direction="row" justifyContent="space-between" width={"100%"} sx={{mb: 3}}>
            <Stack sx={{width: "100%"}}>
              <LabelStyle required>Địa chỉ chi tiết</LabelStyle>
              <RHFTextField
                  name="address"
                  placeholder="Số nhà, tên đường, xã/phường..."
              />
            </Stack>
          </Stack>

          <Divider/>

          <Box sx={{mt: 3}}>
            <LabelStyle required>Giới thiệu công ty</LabelStyle>
            <RHFTinyEditor
                name="description"
                placeholder={"Nhập nội dung giới thiệu công ty..."}
            />
          </Box>

          <RHFListImage name="organizationImages"/>
          <Divider sx={{pt: 3}}/>
        </Box>
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
              zIndex: 1001,
            }}
        >
          <MuiButton
            title={"Lưu"}
            type="submit"
            loading={isSubmitting}
          />
          <MuiButton
              title={"Hủy"}
              color={"basic"}
              loading={isSubmitting}
              onClick={onClose}
          />
        </div>
      </FormProvider>
  );
};
export default FormCompanyInfor;
