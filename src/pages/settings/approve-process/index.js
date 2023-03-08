import {PAGES} from "@/config";
import SettingLayout from "@/layouts/setting";
import {getRolesByPage} from "@/utils/role";
import {Container} from "@mui/material";
import ApproveProcessCard from "@/sections/approve-process/ApproveProcessCard";
import useSettings from "@/hooks/useSettings";

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
    },
];

export default function ApproveProcess() {
    const {themeStretch} = useSettings();

    return (
        <Container maxWidth={themeStretch ? false : "xl"}>
            <ApproveProcessCard
                approveProcesses={itemData}
                color={"#1E88E5"}
                title="QUY TRÌNH PHÊ DUYỆT TIN TUYỂN DỤNG NỘI BỘ"
            />
            <ApproveProcessCard
                approveProcesses={itemData}
                color={"#1E88E5"}
                title="QUY TRÌNH PHÊ DUYỆT LỜI MỜI NGƯỜI DÙNG"
            />
            <ApproveProcessCard
                approveProcesses={itemData}
                color={"#1E88E5"}
                title="QUY TRÌNH PHÊ DUYỆT THƯ MỜI NHẬN VIỆC"
            />
        </Container>
    );
}
