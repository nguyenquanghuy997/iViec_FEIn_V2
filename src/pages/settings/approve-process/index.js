import {PAGES} from "@/config";
import SettingLayout from "@/layouts/setting";
import {getRolesByPage} from "@/utils/role";
import {Container} from "@mui/material";
import ApproveProcessCard from "@/sections/approve-process/ApproveProcessCard";
import useSettings from "@/hooks/useSettings";
import Page from "@/components/Page";
//import {JobTypeItem, useLazyGetAllJobTypeQuery} from "@/sections/jobtype";
import PageWrapper from "@/components/PageWrapper";
import {useGetAllApproveProcessQuery} from "@/sections/approve-process/ApproveProcessSlice";
import React, {useEffect, useState} from "react";
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
export default function ApproveProcess() {
    const {data: {items: Data = []} = {}} = useGetAllApproveProcessQuery();
    const {themeStretch} = useSettings();
    const [dataInternal, setDataInternal] = useState([]);
    const [dataApplication, setDataApplication] = useState([]);
    const [dataInvite, setDataInvite] = useState([]);

    useEffect(() => {
        if (Data.length > 0) {
            setDataInternal(Data.filter(x => x.approvalProcessType == 0));
            setDataApplication(Data.filter(x => x.approvalProcessType == 1));
            setDataInvite(Data.filter(x => x.approvalProcessType == 2));
        }
    }, [Data]);
    return (
        <PageWrapper title={"Quy trình phê duyệt"}>
            <Page title={"Quy trình phê duyệt"}>
                <Container maxWidth={themeStretch ? false : "xl"}>
                    <ApproveProcessCard
                        type={0}
                        approveProcesses={dataInternal}
                        color={"#1E88E5"}
                        title="QUY TRÌNH PHÊ DUYỆT TIN TUYỂN DỤNG NỘI BỘ"
                    />
                    <ApproveProcessCard
                        type={1}
                        approveProcesses={dataApplication}
                        color={"#1E88E5"}
                        title="QUY TRÌNH PHÊ DUYỆT LỜI MỜI NGƯỜI DÙNG"
                    />
                    <ApproveProcessCard
                        type={2}
                        approveProcesses={dataInvite}
                        color={"#1E88E5"}
                        title="QUY TRÌNH PHÊ DUYỆT THƯ MỜI NHẬN VIỆC"
                    />
                </Container>
            </Page>
        </PageWrapper>
    );
}
