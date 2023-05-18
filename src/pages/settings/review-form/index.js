import { Text, View } from "@/components/FlexStyled";
import Page from "@/components/Page";
import SvgIcon from "@/components/SvgIcon";
import { PERMISSION_PAGES } from "@/config";
import SettingLayout from "@/layouts/setting";
// import {
//   useGetAllReviewFormMutation,
// } from "@/sections/pipeline";
// import { useRef } from "react";
import PageWrapper from "@/components/PageWrapper";
import {useTheme} from "@mui/material/styles";
Setting.getLayout = function getLayout(pageProps, page) {
  return (
    <SettingLayout permissions={PERMISSION_PAGES.evaluationTemplate} {...pageProps}>
      {page}
    </SettingLayout>
  );
};

export default function Setting() {
  const  theme = useTheme()
  // ref
  // const refRequest = useRef({});

  // state
  // const [showForm, setShowForm] = useState(false);

  // api
  // const [fetchData] = useGetAllReviewFormMutation();

  // const refreshData = () => {
  //   fetchData(refRequest.current).unwrap();
  // };

  return (
    <PageWrapper title={"Mẫu đánh giá"}>
      <Page>
        {/* header */}
        <View
            flexRow
            atCenter
            ph={24}
            pv={16}
            bgColor={theme.palette.background.paper}
            boxShadow={"inset 0px -1px 0px #DBE6EB"}
        >
          {/* title */}
          <Text fontSize={22} fontWeight={"600"}>
            {"Mẫu đánh giá"}
          </Text>
          <View flex1 />

          {/* button add */}
          <View
              flexRow
              atCenter
              pv={8}
              ph={12}
              borderRadius={4}
              bgColor={"#01B6A7"}
              // onPress={() => setShowForm(true)}
          >
            <SvgIcon>
              {
                '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.9167 9H3.58333C3.26444 9 3 8.66 3 8.25C3 7.84 3.26444 7.5 3.58333 7.5H12.9167C13.2356 7.5 13.5 7.84 13.5 8.25C13.5 8.66 13.2356 9 12.9167 9Z" fill="white"/><path d="M8.24994 13.5C7.83994 13.5 7.49994 13.2356 7.49994 12.9167V3.58333C7.49994 3.26444 7.83994 3 8.24994 3C8.65994 3 8.99994 3.26444 8.99994 3.58333V12.9167C8.99994 13.2356 8.65994 13.5 8.24994 13.5Z" fill="white"/></svg>'
              }
            </SvgIcon>

            <Text
                ml={12}
                color={theme.palette.background.paper}
                fontSize={15}
                lineHeight={20 / 15}
                fontWeight={"600"}
            >
              {"Thêm quy trình"}
            </Text>
          </View>
        </View>

      </Page>
    </PageWrapper>
  );
}
