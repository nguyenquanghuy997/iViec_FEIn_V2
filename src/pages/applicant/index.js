import { Text, View } from "@/components/FlexStyled";
import Page from "@/components/Page";
import PageWrapper from "@/components/PageWrapper";
import SvgIcon from "@/components/SvgIcon";
import { PAGES } from "@/config";
import Layout from "@/layouts";
import { PATH_DASHBOARD } from "@/routes/paths";
import { ApplicantItem } from "@/sections/applicant";
import ApplicantHeader from "@/sections/applicant/ApplicantHeader";
import palette from "@/theme/palette";
import { getRolesByPage } from "@/utils/role";
import { styled } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

Setting.getLayout = function getLayout({ roles = [] }, page) {
  return <Layout roles={roles}>{page}</Layout>;
};

const columns = [
  { name: "education", type: "text", placeholder: "Tìm kiếm...", label: "Học vấn" },
  // { name: "step", type: "select" },
  { name: "date", type: "date", placeholder: "Tìm kiếm...", label: "Ngày sinh" },
  { name: "gender", type: "radio" },
];

export async function getStaticProps() {
  return {
    props: {
      roles: getRolesByPage(PAGES.Industry),
    },
  };
}
const LinkRootStyle = styled("div")(() => ({
  "&:hover .MuiLink-root": {
    color: `${palette.light.warning.main} !important`,
    cursor: "pointer",
  },
}));

export default function Setting() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenFilterForm = () => {
    setIsOpen(true);
  };

  const handleCloseFilterForm = () => {
    setIsOpen(false);
  };

  return (
    <PageWrapper title={"Ứng viên"}>
      <ApplicantHeader
        columns={columns}
        isOpen={isOpen}
        onOpenFilterForm={handleOpenFilterForm}
        onCloseFilterForm={handleCloseFilterForm}
      />
      <Page>
        {/* header */}
        <View
          flexRow
          atCenter
          ph={24}
          pv={16}
          bgColor={"#fff"}
          boxShadow={"inset 0px -1px 0px #DBE6EB"}
        >
          {/* title */}
          <Text fontSize={22} fontWeight={"600"}>
            {"Ứng viên"}
          </Text>
          <View flex1 />

          {/* button add */}

          <Link href={PATH_DASHBOARD.applicant.view("123")} passHref>
            <LinkRootStyle>
              <View
                flexRow
                atCenter
                pv={8}
                ph={12}
                borderRadius={4}
                bgColor={"#01B6A7"}
              >
                <SvgIcon>
                  {
                    '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.9167 9H3.58333C3.26444 9 3 8.66 3 8.25C3 7.84 3.26444 7.5 3.58333 7.5H12.9167C13.2356 7.5 13.5 7.84 13.5 8.25C13.5 8.66 13.2356 9 12.9167 9Z" fill="white"/><path d="M8.24994 13.5C7.83994 13.5 7.49994 13.2356 7.49994 12.9167V3.58333C7.49994 3.26444 7.83994 3 8.24994 3C8.65994 3 8.99994 3.26444 8.99994 3.58333V12.9167C8.99994 13.2356 8.65994 13.5 8.24994 13.5Z" fill="white"/></svg>'
                  }
                </SvgIcon>

                <Text
                  ml={12}
                  color={"#fff"}
                  fontSize={15}
                  lineHeight={20 / 15}
                  fontWeight={"600"}
                >
                  {"Chi tiết ứng viên"}
                </Text>
              </View>
            </LinkRootStyle>
          </Link>
        </View>
        {/* table option */}
        <ApplicantItem />
      </Page>
    </PageWrapper>
  );
}
