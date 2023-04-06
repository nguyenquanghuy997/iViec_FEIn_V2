import React, {useEffect} from 'react'
import SettingLayout from "@/layouts/setting";
import { PERMISSION_PAGES } from "@/config";
import Page from "@/components/Page";
import OrganizationDetailContent from "@/sections/organizationdetail/OrganizationDetailContent";
import {useRouter} from "next/router";
import {
    useGetAllApplicantUserOrganizationByIdQuery,
    useGetListOrganizationWithChildQuery,
    useGetOrganizationByIdQuery
} from "@/sections/organization/override/OverrideOrganizationSlice";
import LoadingScreen from "@/components/LoadingScreen";

OrganizationDetail.getLayout = function getLayout(pageProps, page) {
    return (
        <SettingLayout permissions={PERMISSION_PAGES.organization} {...pageProps}>
            {page}
        </SettingLayout>
    );
};

function OrganizationDetail() {

    const router = useRouter();
    const {query, isReady} = router;

    const {data: organization = {}} = useGetOrganizationByIdQuery({
        OrganizationId: query?.id
    }, {skip: !query?.id});

    const {data: {items: ListUser = []} = {}, isLoading: loadingUser} = useGetAllApplicantUserOrganizationByIdQuery({
        OrganizationId: query?.id
    }, {skip: !query?.id});

    const {data: {items: ListOrganization = []} = {}} = useGetListOrganizationWithChildQuery();

    useEffect(() => {
        if (!isReady) return;
    }, [isReady])

    if (loadingUser) return <LoadingScreen />;

    return (
        <Page title="Thông tin chi tiết đơn vị">
            <OrganizationDetailContent
                organization={organization}
                ListUser={ListUser}
                ListOrganization={ListOrganization}
            />
        </Page>
    )
}

export default OrganizationDetail;