import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Page from "@/components/Page";
import { PERMISSION_PAGES } from "@/config";
import useSettings from "@/hooks/useSettings";
import Layout from "@/layouts";
import FormCompanyInfor from "@/sections/companyinfor/edit/FormCompanyInfor";
import { Container } from "@mui/material";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

Setting.getLayout = function getLayout(pageProps, page) {
  return <Layout permissions={PERMISSION_PAGES.editOrganization} {...pageProps}>{page}</Layout>;
};

const defaultValues = {
  name: "",
  city: "",
  address: "",
  email: "",
  phone: "",
  type: "",
  size: "",
  introduce: "",
  environment: "",
};

export default function Setting() {
  const { themeStretch } = useSettings();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const onFinish = () => {
    router.replace("/settings/companyinfor");
  };
  return (
    <Page
      title={"Chỉnh sửa thông tin công ty"}
      style={{ height: "100%", background: "#FAFBFD" }}
    >
      <Container maxWidth={themeStretch ? false : "xl"}>
        <HeaderBreadcrumbs heading={"Chỉnh sửa thông tin công ty"} />

        <div
          style={{
            paddingLeft: "25%",
            paddingRight: "25%",
          }}
        >
          <FormCompanyInfor
            onFinish={onFinish}
            defaultValues={defaultValues}
            enqueueSnackbar={enqueueSnackbar}
          />
        </div>
      </Container>
    </Page>
  );
}
