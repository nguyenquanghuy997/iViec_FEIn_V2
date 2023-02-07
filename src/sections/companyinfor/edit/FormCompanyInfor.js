import SvgIcon from "@/components/SvgIcon";
import {
  FormProvider,
  RHFBasicSelect,
  RHFTextField,
} from "@/components/hook-form";
import {
  useGetBranchByIdMutation,
  useGetBranchByUserQuery,
  useGetJobCategoriesQuery,
  useLazyGetProvinceQuery,
  useUpdateBranchMutation,
} from "@/sections/companyinfor/companyInforSlice";
import { formatRemoteUrl, LIST_BRANCH_SIZE } from "@/utils/formatString";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Alert } from "@mui/material";
import dynamic from "next/dynamic";
import * as qs from "qs";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const Editor = dynamic(() => import("./editor"), {
  ssr: false,
});

const FormCompanyInfor = ({ defaultValues, onFinish, enqueueSnackbar }) => {
  const refAvatar = useRef(null);
  const refBackground = useRef(null);

  // state
  const [avatar, setAvatar] = useState(null);
  const [background, setBackground] = useState(null);
  const [introduce, setIntroduce] = useState(null);
  const [environment, setEnvironment] = useState(null);

  // form
  const ProfileSchema = Yup.object().shape({
    name: Yup.string(),
    city: Yup.number().required("Chưa chọn Tỉnh / Thành phố"),
    address: Yup.string().required("Chưa nhập Địa chỉ"),
    email: Yup.string()
      .email("Email không đúng định dạng")
      .required("Chưa nhập Email"),
    phone: Yup.string().required("Chưa nhập Số điện thoại"),
    type: Yup.number().required("Chưa chọn Nghành nghề"),
    size: Yup.string().required("Chưa chọn Quy mô nhân sự"),
    introduce: Yup.string().required("Chưa nhập Giới thiệu"),
    environment: Yup.string().nullable(),
  });
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(ProfileSchema),
  });
  const {
    setValue,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  // api
  const { data: { DataList: [{ ID } = {}] = [] } = {} } =
    useGetBranchByUserQuery();

  const [fetchData, { data: { Data } = {} }] = useGetBranchByIdMutation();
  const [updateData] = useUpdateBranchMutation();

  // const [fetchProvice, { data: { DataList: ProviceList = [] } = {} }] =
  //   useGetProviceMutation();

  const [fetchProvice, { data: { items: ProviceList = [] } = {} }] =
    useLazyGetProvinceQuery();

  const { data: { items: JobCategoryList = [] } = {} } =
    useGetJobCategoriesQuery();
  console.log("opbject", { ProviceList, JobCategoryList });
  const onSelectAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  const onSelectBackground = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackground(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (d) => {
    try {
      const res = await updateData(
        qs.stringify({
          ID,
          BranchName: Data.BranchName,
          Logo: refAvatar.current,
          CoverPhoto: refBackground.current,
          Description: d.introduce,
          DescriptionEN: d.environment,
          ProvinceId: d.city,
          BranchAddress: d.address,
          BranchEmail: d.email,
          BranchPhone: d.phone,
          JobCategoryId: d.type,
          BranchSize: d.size,
        })
      ).unwrap();

      if (!res.Succeeded) throw res;

      enqueueSnackbar("Chỉnh sửa thông tin công ty thành công!");
      onFinish();
    } catch (err) {
      const message =
        err?.Errors?.[0]?.Description || err?.data?.message || err?.message;
      setError("afterSubmit", { ...err, message });
    }
  };

  useEffect(() => {
    fetchProvice().unwrap();
  }, []);

  useEffect(() => {
    if (!ID) return;
    fetchData({ ID }).unwrap();
  }, [ID]);

  useEffect(() => {
    if (!Data) return;

    // ref set
    refAvatar.current = Data.Logo;
    refBackground.current = Data.CoverPhoto;

    // state set
    setAvatar(formatRemoteUrl(Data.Logo));
    setBackground(formatRemoteUrl(Data.CoverPhoto));
    setIntroduce(Data.Description);
    setEnvironment(Data.DescriptionEN);

    // method set
    setValue("name", Data.BranchName);
    setValue("city", Data.ProvinceId);
    setValue("address", Data.BranchAddress);
    setValue("email", Data.BranchEmail);
    setValue("phone", Data.BranchPhone);
    setValue("type", Data.JobCategoryId);
    setValue("size", Data.BranchSize);
    setValue("introduce", Data.Description);
    setValue("environment", Data.DescriptionEN);
  }, [JSON.stringify(Data)]);
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {!!errors.afterSubmit && (
        <Alert severity="error">{errors.afterSubmit?.message}</Alert>
      )}

      <div
        style={{
          flex: 1,
          padding: 24,
          borderRadius: 8,
          paddingBottom: 30,
          overflow: "hidden",
          background: "#fff",
          border: "1px solid #EBECF4",
        }}
      >
        {/* img des */}
        <span
          style={{
            color: "#393B3E",
            display: "block",
            fontStyle: "italic",
            marginBottom: 24,
          }}
        >
          {
            "Ảnh đại diện và Ảnh cover sẽ được hiển thị tại trang tuyển dụng để tăng sự uy tín cho công ty."
          }
        </span>

        {/* img */}
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              width: 120,
              height: 120,
              overflow: "hidden",
              borderRadius: 120,
              display: "flex",
              border: "1px dashed #C9D9E0",
              position: "relative",
            }}
          >
            {avatar ? (
              <img src={avatar} style={{ flex: 1, objectFit: "cover" }} />
            ) : (
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SvgIcon>
                  {`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.6 9.60001V12.3496C13.6 12.5138 13.5677 12.6764 13.5048 12.8281C13.442 12.9798 13.3499 13.1177 13.2338 13.2338C13.1177 13.3499 12.9798 13.442 12.8281 13.5048C12.6764 13.5677 12.5138 13.6 12.3496 13.6H3.64962C3.31814 13.5998 3.0003 13.468 2.76598 13.2335C2.53165 12.999 2.40002 12.6811 2.40002 12.3496V9.60001" stroke="#929292" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/><path d="M8 9.6V4" stroke="#929292" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/><path d="M4.77515 4.79439L7.99995 2.3752L11.1871 4.7752" stroke="#929292" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`}
                </SvgIcon>

                <span style={{ marginTop: 4, color: "#929292" }}>
                  {"Ảnh đại diện"}
                </span>
              </div>
            )}
            <div
              style={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                position: "absolute",
              }}
            >
              <label for="avatar" style={{ flex: 1, cursor: "pointer" }} />
              <input
                type="file"
                id="avatar"
                accept="image/*"
                style={{ display: "none", userSelect: "none" }}
                onChange={onSelectAvatar}
              />
            </div>
          </div>

          <div
            style={{
              flex: 1,
              marginLeft: 20,
              height: 220,
              overflow: "hidden",
              borderRadius: 8,
              display: "flex",
              border: "1px dashed #C9D9E0",
              position: "relative",
            }}
          >
            {background ? (
              <img src={background} style={{ flex: 1, objectFit: "cover" }} />
            ) : (
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SvgIcon>
                  {`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.6 9.60001V12.3496C13.6 12.5138 13.5677 12.6764 13.5048 12.8281C13.442 12.9798 13.3499 13.1177 13.2338 13.2338C13.1177 13.3499 12.9798 13.442 12.8281 13.5048C12.6764 13.5677 12.5138 13.6 12.3496 13.6H3.64962C3.31814 13.5998 3.0003 13.468 2.76598 13.2335C2.53165 12.999 2.40002 12.6811 2.40002 12.3496V9.60001" stroke="#929292" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/><path d="M8 9.6V4" stroke="#929292" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/><path d="M4.77515 4.79439L7.99995 2.3752L11.1871 4.7752" stroke="#929292" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`}
                </SvgIcon>

                <span style={{ marginTop: 4, color: "#929292" }}>
                  {"Ảnh cover"}
                </span>
              </div>
            )}
            <div
              style={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                position: "absolute",
              }}
            >
              <label
                for="background"
                style={{ flex: 1, cursor: "pointer", userSelect: "none" }}
              />
              <input
                type="file"
                id="background"
                accept="image/*"
                style={{ display: "none" }}
                onChange={onSelectBackground}
              />
            </div>
          </div>
        </div>

        <div
          style={{
            height: 1,
            marginTop: 24,
            marginLeft: -24,
            marginRight: -24,
            background: "#EBECF4",
          }}
        />

        <RHFTextField
          disabled
          name={"name"}
          label={"Tên công ty"}
          style={{ marginTop: 28 }}
        />

        <div style={{ display: "flex", flexDirection: "row", marginTop: 32 }}>
          <RHFBasicSelect
            name={"city"}
            label={"Địa chỉ công ty"}
            placeholder={"Chọn Tỉnh/Thành"}
            style={{ marginRight: 10 }}
            options={ProviceList.map((i) => ({
              value: i.id,
              label: i.name,
            }))}
          />

          <RHFTextField
            name={"address"}
            placeholder={"Nhập địa chỉ chi tiết"}
            style={{ marginLeft: 10 }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "row", marginTop: 32 }}>
          <RHFTextField
            name={"email"}
            label={"Email"}
            placeholder={"Nhập email công ty"}
            style={{ marginRight: 10 }}
          />

          <RHFTextField
            name={"phone"}
            label={"Số điện thoại"}
            placeholder={"Nhập số điện thoại công ty"}
            style={{ marginLeft: 10 }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "row", marginTop: 32 }}>
          <RHFBasicSelect
            name={"type"}
            label={"Ngành nghề"}
            placeholder={"Chọn ngành nghề"}
            style={{ marginRight: 
              20 }}
            options={JobCategoryList.map((i) => ({
              value: i.id,
              label: i.name,
            }))}
       
          />

          <RHFBasicSelect
            name={"size"}
            label={"Quy mô nhân sự"}
            placeholder={"Chọn quy mô nhân sự"}
            style={{ marginRight: 
              20 }}
            options={LIST_BRANCH_SIZE.map((i) => ({
              value: i.id,
              label: i.name,
            }))}
          />
        </div>

        <div style={{ marginTop: 32 }}>
          <span
            style={{
              color: "#393B3E",
              display: "block",
              marginBottom: 8,
              fontWeight: "600",
            }}
          >
            {"Giới thiệu công ty"}
          </span>

          <Editor
            data={introduce}
            onChange={(_, e) => {
              const text = e.getData();
              setValue("introduce", text);
            }}
          />

          <RHFTextField
            name={"introduce"}
            variant={"standard"}
            inputProps={{ style: { display: "none" } }}
          />
        </div>

        <div style={{ marginTop: 32 }}>
          <span
            style={{
              color: "#393B3E",
              display: "block",
              marginBottom: 8,
              fontWeight: "600",
            }}
          >
            {"Môi trường làm việc"}
          </span>

          <Editor
            data={environment}
            onChange={(_, e) => {
              const text = e.getData();
              setValue("environment", text);
            }}
          />

          <RHFTextField
            name={"environment"}
            variant={"standard"}
            inputProps={{ style: { display: "none" } }}
          />
        </div>

        <div
          style={{
            height: 1,
            marginTop: 24,
            marginLeft: -24,
            marginRight: -24,
            background: "#EBECF4",
          }}
        />

        <div style={{ display: "flex", flexDirection: "row", marginTop: 12 }}>
          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            {"Lưu"}
          </LoadingButton>
          <div style={{ width: 8 }} />

          <LoadingButton size="large" variant="text" onClick={onFinish}>
            {"Hủy"}
          </LoadingButton>
        </div>
      </div>
    </FormProvider>
  );
};
export default FormCompanyInfor;
