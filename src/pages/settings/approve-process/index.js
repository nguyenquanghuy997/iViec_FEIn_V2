import { PAGES } from "@/config";
import SettingLayout from "@/layouts/setting";
import { getRolesByPage } from "@/utils/role";
import { Container } from "@mui/material";
import ApproveProcessCard from "@/sections/approve-process/ApproveProcessCard";
import useSettings from "@/hooks/useSettings";

ApproveProcess.getLayout = function getLayout({ roles = [] }, page) {
  return <SettingLayout roles={roles}>{page}</SettingLayout>;
};

export async function getStaticProps() {
  return {
    props: {
      roles: getRolesByPage(PAGES.Board),
    },
  };
}

const itemData = [
  {
    img: "https://ogimgs.apkcombo.org/eyJsb2dvIjoiaHR0cHM6Ly9wbGF5LWxoLmdvb2dsZXVzZXJjb250ZW50LmNvbS9xYVR2WUhidC1GVy1vY3FEYnhMSXRHNlgzVE1aSl9zY19oVUNMLXptY0QwS3M1emdCSUJjT1E4c1pUOWoxQXZSVERRPXMyMDAiLCJ0aXRsZSI6ICJGUFQgaVZJRUMgQVBLIn0=/fpt-iviec-apk",
    title: "IViec FPT",
  },
];

export default function ApproveProcess() {
  const { themeStretch } = useSettings();

  return (
    <Container maxWidth={themeStretch ? false : "xl"}>
      <ApproveProcessCard
          accounts={itemData}
          color={"#1E88E5"}
          title="QUY TRÌNH PHÊ DUYỆT TIN TUYỂN DỤNG NỘI BỘ"
          type='inside'
      />
      <ApproveProcessCard
          accounts={itemData}
          color={"#1E88E5"}
          title="QUY TRÌNH PHÊ DUYỆT LỜI MỜI NGƯỜI DÙNG"
          type='inside'
      />
      <ApproveProcessCard
          accounts={itemData}
          color={"#1E88E5"}
          title="QUY TRÌNH PHÊ DUYỆT THƯ MỜI NHẬN VIỆC"
          type='inside'
      />
    </Container>
  );
}
