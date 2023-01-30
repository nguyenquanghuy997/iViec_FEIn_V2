import Page from "@/components/Page";
import { PAGES } from "@/config";
import useSettings from "@/hooks/useSettings";
import Layout from "@/layouts";
import { StoreHeader } from "@/sections/stores";
import { getRolesByPage } from "@/utils/role";
import { Card, Container } from "@mui/material";

Clients.getLayout = function getLayout({ roles = [] }, page) {
  return <Layout roles={roles}>{page}</Layout>;
};

export async function getStaticProps() {
  return {
    props: {
      roles: getRolesByPage(PAGES.Clients),
    },
  };
}

export default function Clients() {
  const { themeStretch } = useSettings();

  return (
    <Page title={"Kho iVIEC"}>
      <Container maxWidth={themeStretch ? false : "xl"} style={{ padding: 20 }}>
        <StoreHeader />

        <Card>
          <span
            style={{
              fontSize: 18,
              fontWeight: "600",
              display: "block",
              padding: "24px 20px",
            }}
          >
            {/* {title} */}
          </span>
        </Card>
      </Container>
    </Page>
  );
}
