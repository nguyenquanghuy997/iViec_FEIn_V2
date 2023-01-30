import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Page from "@/components/Page";
import { FormProvider, RHFTextField } from "@/components/hook-form";
import { PAGES } from "@/config";
import useAuth from "@/hooks/useAuth";
import useSettings from "@/hooks/useSettings";
import Layout from "@/layouts";
import {
  useGetProfileQuery,
  useUpdatePWMutation,
} from "@/sections/changepassword/changePasswordSlice";
import { getRolesByPage } from "@/utils/role";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Alert, Container } from "@mui/material";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import * as qs from "qs";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

Setting.getLayout = function getLayout({ roles = [] }, page) {
  return <Layout roles={roles}>{page}</Layout>;
};

export async function getStaticProps() {
  return {
    props: {
      roles: getRolesByPage(PAGES.Industry),
    },
  };
}

const defaultValues = {
  old_pw: "",
  new_pw: "",
  confirm_pw: "",
};

export default function Setting() {
  const router = useRouter();
  const { logout } = useAuth();
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();

  // form
  const ProfileSchema = Yup.object().shape({
    old_pw: Yup.string().required("Chưa nhập Mật khẩu cũ"),
    new_pw: Yup.string()
      .required("Chưa nhập Mật khẩu mới")
      .min(6, "Mật khẩu ít nhất 6 ký tự"),
    confirm_pw: Yup.string()
      .required("Chưa nhập Xác nhận mật khẩu mới")
      .oneOf([Yup.ref("new_pw"), null], "Mật khẩu xác nhận không khớp"),
  });
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(ProfileSchema),
  });
  const {
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  // api
  const [updatePW] = useUpdatePWMutation();
  const { data } = useGetProfileQuery();
  const Id = data?.Data?.PK_USER_ID;

  // handle
  const onSubmit = async (d) => {
    if (!Id) {
      setError("afterSubmit", {
        message: "Không tìm thấy thông tin tài khoản",
      });
      return;
    }

    try {
      const res = await updatePW(
        qs.stringify({
          Id,
          OldPassword: d.old_pw,
          NewPassword: d.new_pw,
          NewPasswordConfirm: d.new_pw,
        })
      ).unwrap();

      if (!res.Succeeded) throw res;

      enqueueSnackbar("Đổi mật khẩu thành công, đăng nhập lại!");
      process.env.NODE_ENV !== "development" && logout();
    } catch (err) {
      const message =
        err?.Errors?.[0]?.Description || err?.data?.message || err?.message;
      setError("afterSubmit", { ...err, message });
    }
  };

  return (
    <Page
      title={"Đổi mật khẩu"}
      style={{ height: "100%", background: "#FAFBFD" }}
    >
      <Container maxWidth={themeStretch ? false : "xl"}>
        <HeaderBreadcrumbs heading={"Đổi mật khẩu"} />

        <div
          style={{
            paddingLeft: "25%",
            paddingRight: "25%",
          }}
        >
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
              <RHFTextField
                type={"password"}
                name={"old_pw"}
                label={"Mật khẩu cũ"}
                style={{ marginTop: 28 }}
              />

              <RHFTextField
                type={"password"}
                name={"new_pw"}
                label={"Mật khẩu mới"}
                style={{ marginTop: 32 }}
              />

              <RHFTextField
                type={"password"}
                name={"confirm_pw"}
                label={"Xác nhận mật khẩu mới"}
                style={{ marginTop: 32 }}
              />

              <div
                style={{
                  height: 1,
                  marginTop: 24,
                  marginLeft: -24,
                  marginRight: -24,
                  background: "#EBECF4",
                }}
              />

              <div
                style={{ display: "flex", flexDirection: "row", marginTop: 12 }}
              >
                <LoadingButton
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  {"Lưu"}
                </LoadingButton>
                <div style={{ width: 8 }} />

                <LoadingButton
                  size="large"
                  variant="text"
                  onClick={router.back}
                >
                  {"Hủy"}
                </LoadingButton>
              </div>
            </div>
          </FormProvider>
        </div>
      </Container>
    </Page>
  );
}
