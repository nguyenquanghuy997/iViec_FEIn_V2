import Page from "@/components/Page";
import { PAGES } from "@/config";
import SettingLayout from "@/layouts/setting";
import { CompanyInfor } from "@/sections/companyinfor";
import BusinessArea from "@/sections/companyinfor/components/BusinessArea";
import Ending from "@/sections/companyinfor/components/Ending";
import HireProcess from "@/sections/companyinfor/components/HireProcess";
import HumanCompany from "@/sections/companyinfor/components/HumanCompany";
import { getRolesByPage } from "@/utils/role";
import { Box, Typography } from "@mui/material";
import MuiButton from "@/components/BaseComponents/MuiButton";
import EnvironmentWorkplace from "@/sections/companyinfor/components/EnvironmentWorkplace";
import {useGetCompanyInfoQuery} from "@/sections/companyinfor/companyInforSlice";
import LoadingScreen from "@/components/LoadingScreen";

Setting.getLayout = function getLayout({ roles = [] }, page) {
  return <SettingLayout roles={roles}>{page}</SettingLayout>;
};

export default function Setting() {

  const {data: Data, isLoading} = useGetCompanyInfoQuery();

  if (isLoading) {
    return (
        <LoadingScreen/>
    )
  }

  return (
    <Page title={"Thông tin công ty"}>
      <Box sx={{width: "100%", display: "flex", justifyContent: "space-between", py: 3, pt: 0,}}>
        <Typography variant="h6" gutterBottom>
          Thông tin công ty và cấu hình trang công ty
        </Typography>
        <Box>
          <MuiButton
              variant="outlined"
              title={"Xem trang công ty"}
              sx={{fontWeight: 600}}
          />
        </Box>
      </Box>
      <CompanyInfor data={Data}/>
      <HumanCompany data={Data}/>
      <BusinessArea data={Data}/>
      <EnvironmentWorkplace data={Data} />
      <HireProcess data={Data}/>
      <Ending data={Data}/>
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
