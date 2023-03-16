import {PAGES} from "@/config";
import SettingLayout from "@/layouts/setting";
import {getRolesByPage} from "@/utils/role";
import {Container} from "@mui/material";
import ApproveProcessCard from "@/sections/approve-process/ApproveProcessCard";
import useSettings from "@/hooks/useSettings";
import Page from "@/components/Page";
//import {JobTypeItem, useLazyGetAllJobTypeQuery} from "@/sections/jobtype";
import PageWrapper from "@/components/PageWrapper";
//import {useGetAllApproveProcessQuery} from "@/sections/approve-process/ApproveProcessSlice";

ApproveProcess.getLayout = function getLayout({roles = []}, page) {
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
        createdTime: "17/02/2023",
        title: "Quy trình phê duyệt tin tuyển dụng tháng 2/2023",
        creator: "ThanhDT58",
        countApply: 15,
        approveLevel: 2,
        isActive: true
    },
    {
        createdTime: "17/02/2024",
        title: "Quy trình phê duyệt tin tuyển dụng tháng 2/2024",
        creator: "ThanhDT59",
        countApply: 20,
        approveLevel: 3,
        isActive: false
    },
];

export default function ApproveProcess() {
    // const {data: {items: DataInternal = []} = {}} = useGetAllApproveProcessQuery();
    // const {data: {items: DataUses = []} = {}} = useGetAllApproveProcessQuery();
    // const {data: {items: DataInvite = []} = {}} = useGetAllApproveProcessQuery();
    const {themeStretch} = useSettings();

    return (
        <PageWrapper title={"Quy trình phê duyệt"}>
            <Page title={"Quy trình phê duyệt"}>
                <Container maxWidth={themeStretch ? false : "xl"}>
                    <ApproveProcessCard
                        type={0}
                        approveProcesses={itemData}
                        color={"#1E88E5"}
                        title="QUY TRÌNH PHÊ DUYỆT TIN TUYỂN DỤNG NỘI BỘ"
                    />
                    <ApproveProcessCard
                        type={1}
                        approveProcesses={null}
                        color={"#1E88E5"}
                        title="QUY TRÌNH PHÊ DUYỆT LỜI MỜI NGƯỜI DÙNG"
                    />
                    <ApproveProcessCard
                        type={2}
                        approveProcesses={itemData}
                        color={"#1E88E5"}
                        title="QUY TRÌNH PHÊ DUYỆT THƯ MỜI NHẬN VIỆC"
                    />
                </Container>
            </Page>
        </PageWrapper>
    );
}
