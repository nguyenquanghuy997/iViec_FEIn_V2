import { PERMISSION_PAGES } from "@/config";
import SettingLayout from "@/layouts/setting";
import { Container } from "@mui/material";
import ApproveProcessCard from "@/sections/approve-process/ApproveProcessCard";
import useSettings from "@/hooks/useSettings";
import Page from "@/components/Page";
import PageWrapper from "@/components/PageWrapper";
import { useGetAllApproveProcessQuery } from "@/sections/approve-process/ApproveProcessSlice";
import React, { useEffect, useState } from "react";
import {useTheme} from "@mui/material/styles";

ApproveProcess.getLayout = function getLayout(pageProps, page) {
    return <SettingLayout
        permissions={PERMISSION_PAGES.approveProcess}
        {...pageProps}
    >{page}</SettingLayout>;
};

export default function ApproveProcess() {
    const {data: {items: Data = []} = {}} = useGetAllApproveProcessQuery();
    const {themeStretch} = useSettings();
    const [dataInternal, setDataInternal] = useState([]);
    const [dataApplication, setDataApplication] = useState([]);
    const [dataInvite, setDataInvite] = useState([]);
    const theme = useTheme();
    useEffect(() => {
        if (Data.length > 0) {
            setDataInternal(Data.filter(x => x.approvalProcessType === 0));
            setDataApplication(Data.filter(x => x.approvalProcessType === 1));
            setDataInvite(Data.filter(x => x.approvalProcessType === 2));
        }
    }, [Data]);
    return (
        <PageWrapper title={"Quy trình phê duyệt"}>
            <Page title={"Quy trình phê duyệt"}>
                <Container maxWidth={themeStretch ? false : "xl"}>
                    <ApproveProcessCard
                        type={0}
                        approveProcesses={dataInternal}
                        color={theme.palette.common.blue600}
                        title="QUY TRÌNH PHÊ DUYỆT TIN TUYỂN DỤNG NỘI BỘ"
                    />
                    <ApproveProcessCard
                        type={1}
                        approveProcesses={dataApplication}
                        color={theme.palette.common.blue600}
                        title="QUY TRÌNH PHÊ DUYỆT LỜI MỜI NGƯỜI DÙNG"
                    />
                    <ApproveProcessCard
                        type={2}
                        approveProcesses={dataInvite}
                        color={theme.palette.common.blue600}
                        title="QUY TRÌNH PHÊ DUYỆT THƯ MỜI NHẬN VIỆC"
                    />
                </Container>
            </Page>
        </PageWrapper>
    );
}
