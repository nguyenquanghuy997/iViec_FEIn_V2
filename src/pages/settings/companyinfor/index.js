import Page from "@/components/Page";
import { PERMISSION_PAGES } from "@/config";
import SettingLayout from "@/layouts/setting";
import { CompanyInfor } from "@/sections/companyinfor";
import BusinessArea from "@/sections/companyinfor/components/BusinessArea";
import Ending from "@/sections/companyinfor/components/Ending";
// import EnviromentWorkplace from "@/sections/companyinfor/components/EnviromentWorkplace";
import HireProcess from "@/sections/companyinfor/components/HireProcess";
import HumanCompany from "@/sections/companyinfor/components/HumanCompany";
import { Box, Button, Typography } from "@mui/material";

Setting.getLayout = function getLayout(pageProps, page) {
  return <SettingLayout
    permissions={PERMISSION_PAGES.organization}
    {...pageProps}
  >{page}</SettingLayout>;
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
          pt: 0,
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

