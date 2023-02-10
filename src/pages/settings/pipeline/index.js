import { Text, View } from "@/components/FlexStyled";
import Page from "@/components/Page";
import SvgIcon from "@/components/SvgIcon";
import { PAGES } from "@/config";
import SettingLayout from "@/layouts/setting";
import {
  PipelineFormModal,
  PipelineItem,
  useGetAllReviewFormMutation,
} from "@/sections/pipeline";
import { getRolesByPage } from "@/utils/role";
import { useRef, useState } from "react";

Setting.getLayout = function getLayout({ roles = [] }, page) {
  return (
    <SettingLayout roles={roles}>
      {page}
    </SettingLayout>
  );
};

export async function getStaticProps() {
  return {
    props: {
      roles: getRolesByPage(PAGES.Industry),
    },
  };
}

export default function Setting() {
  // ref
  const refRequest = useRef({});

  // state
  const [showForm, setShowForm] = useState(false);

  // api
  const [fetchData] = useGetAllReviewFormMutation();

  const refreshData = () => {
    fetchData(refRequest.current).unwrap();
  };

  return (
    <Page
      title={"Quy trình tuyển dụng"}
      style={{ height: "100%", background: "#FAFBFD" }}
    >
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
          {"Quy trình tuyển dụng"}
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
          onPress={() => setShowForm(true)}
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
            {"Thêm quy trình"}
          </Text>
        </View>
      </View>
        {/* table option */}
        <PipelineItem />

        <PipelineFormModal
          show={showForm}
          setShow={setShowForm}
          onRefreshData={refreshData}
        />
    </Page>
  );
}
