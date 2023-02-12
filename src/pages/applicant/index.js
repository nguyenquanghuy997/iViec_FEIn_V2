import Page from "@/components/Page";
import { PAGES } from "@/config";
import Layout from "@/layouts";
import {
  ApplicantItem,
} from "@/sections/applicant";
import { getRolesByPage } from "@/utils/role";
import SearchBar from './SearchBar'



Setting.getLayout = function getLayout({ roles = [] }, page) {
  return <Layout roles={roles}>{page}</Layout>;
};

export async function getStaticProps() {
  return {
    props: {
      roles: getRolesByPage(PAGES.Industry),
    },
  };
}

export default function Setting() {
  return (
    <Page
      title={"Ứng viên"}
      style={{ height: "100%", background: "#FAFBFD" }}
    >
      {/* header */}
        <SearchBar/>
        {/* table option */}
        <ApplicantItem />

    </Page>
  );
}
