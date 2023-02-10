import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Page from "@/components/Page";
import { PAGES } from "@/config";
import useSettings from "@/hooks/useSettings";
import SettingLayout from "@/layouts/setting";
import { CompanyInfor } from "@/sections/companyinfor";
import { getRolesByPage } from "@/utils/role";
import { Container } from "@mui/material";

Setting.getLayout = function getLayout({ roles = [] }, page) {
  return (
    <SettingLayout roles={roles}>
      {page}
    </SettingLayout>
  );
};

export default function Setting() {
  const { themeStretch } = useSettings();
  return (
    <Page
      title={"Thông tin công ty"}
      style={{ height: "100%", background: "#FAFBFD" }}
    >
      <Container maxWidth={themeStretch ? false : "xl"}>
        <HeaderBreadcrumbs heading={"Thông tin công ty"} />

        <div
          style={{
            paddingLeft: "25%",
            paddingRight: "25%",
          }}
        >
          <div
            style={{
              flex: 1,
              borderRadius: 8,
              paddingBottom: 30,
              overflow: "hidden",
              background: "#fff",
              border: "1px solid #EBECF4",
            }}
          >
            <CompanyInfor />
          </div>
        </div>
      </Container>
    </Page>
  );
}

export async function getStaticProps() {
  return {
    props: {
      roles: getRolesByPage(PAGES.Industry),
    },
  };
}
