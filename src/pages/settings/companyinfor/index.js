import Page from "@/components/Page";
import { PAGES } from "@/config";
import SettingLayout from "@/layouts/setting";
import { CompanyInfor } from "@/sections/companyinfor";
import BusinessArea from "@/sections/companyinfor/components/BusinessArea";
import HireProcess from "@/sections/companyinfor/components/HireProcess";
import HumanCompany from "@/sections/companyinfor/components/HumanCompany";
import { getRolesByPage } from "@/utils/role";
import { Box, Button, Typography } from "@mui/material";
import Ending from "@/sections/companyinfor/components/Ending";

Setting.getLayout = function getLayout({ roles = [] }, page) {
  return <SettingLayout roles={roles}>{page}</SettingLayout>;
};

export default function Setting() {
  return (
    <Page title={"Thông tin công ty"}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          py: 3,
          pt: 0
        }}
      >
        <Typography variant="h6" gutterBottom>
          Thông tin công ty và cấu hình trang công ty
        </Typography>
        <Button variant="outlined">Xem trang công ty</Button>
      </Box>
      <CompanyInfor />
      <HumanCompany />
      <BusinessArea />
      {/* <EnviromentWorkplace /> */}
      <HireProcess />
      <Ending />
    </Page>
  );
}

export async function getStaticProps() {
  return {
    props: {
      roles: getRolesByPage(PAGES.CompanyInfor),
    },
  };
}
