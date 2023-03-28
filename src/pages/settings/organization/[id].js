import React, {useEffect} from 'react'
import SettingLayout from "@/layouts/setting";
import {getRolesByPage} from "@/utils/role";
import {PAGES} from "@/config";
import Page from "@/components/Page";
import OrganizationDetailContent from "@/sections/organizationdetail/OrganizationDetailContent";
import {useRouter} from "next/router";
import {
    useGetAllApplicantUserOrganizationByIdQuery,
    useGetListOrganizationWithChildQuery,
    useGetOrganizationByIdQuery
} from "@/sections/organization/override/OverrideOrganizationSlice";

OrganizationDetail.getLayout = function getLayout({roles = []}, page) {
    return (
        <SettingLayout roles={roles}>
            {page}
        </SettingLayout>
    );
};

export async function getServerSideProps() {
    return {
        props: {
            roles: getRolesByPage(PAGES.Organization),
        },
    };
}

function OrganizationDetail() {

    const router = useRouter();
    const {query, isReady} = router;

    const {data: organization = {}, isLoading} = useGetOrganizationByIdQuery({
        OrganizationId: query?.id
    }, {skip: !query?.id});

    const {data: {items: ListUser = []} = {}, isLoading: loadingUser} = useGetAllApplicantUserOrganizationByIdQuery({
        Id: query?.id
    }, {skip: !query?.id});

    const {
        data: {items: ListOrganization = []} = {},
        isLoading: loadingOrganization
    } = useGetListOrganizationWithChildQuery();

    useEffect(() => {
        if (!isReady) return;
    }, [isReady])

    if (isLoading || loadingUser || loadingOrganization) return <div>Loading...</div>;

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