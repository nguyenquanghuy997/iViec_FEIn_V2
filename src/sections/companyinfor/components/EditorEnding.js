import { FormProvider, RHFTextField } from "@/components/hook-form";
import { LoadingButton } from "@mui/lab";
import { InputLabel, Stack } from "@mui/material";
import dynamic from "next/dynamic";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useUpdateCompanyEndingMutation } from "../companyInforSlice";
const Editor = dynamic(() => import("../edit/editor"), {
  ssr: false,
});

const EditorEnding = ({ data, onClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [description, setDescription] = useState(null);
  const defaultValues = { ...data?.organizationInformation };
  const [ updateEnding] = useUpdateCompanyEndingMutation()
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

  const methods = useForm({
    // resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  const {
    setValue,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (d) => {
    try {
      const res = {
        id: data?.organizationInformation?.id,

        description: d.description,
      };
      try {
        await updateEnding(res).unwrap();
        enqueueSnackbar("Chỉnh sửa Lời kết công ty thành công!", {
          autoHideDuration: 2000,
        });
        onClose();
        // location.reload()
      } catch (err) {
        enqueueSnackbar(errors.afterSubmit?.message, {
          autoHideDuration: 1000,
          variant: "error",
        });
      }
    } catch (err) {
      const message =
        err?.Errors?.[0]?.Description || err?.data?.message || err?.message;
      setError("afterSubmit", { ...err, message });
      enqueueSnackbar(errors.afterSubmit?.message);
    }
  };

  useEffect(() => {
    if (!data) return;
    setDescription(data.description);
    setValue("description", data.description);
  }, [JSON.stringify(data)]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="text"
        render={() => (
          <Stack sx={{ px:3, py:2 }}>
            <InputLabel
              sx={{
                color: "#5C6A82",
                fontSize: 14,
                fontWeight: 500,
                mt: 2,
                mb: 1,
              }}
            >
              Lời kết
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
export default EditorEnding;
