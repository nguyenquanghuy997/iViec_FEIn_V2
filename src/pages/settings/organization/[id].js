import SettingLayout from "@/layouts/setting";
import { PERMISSION_PAGES } from "@/config";
import Page from "@/components/Page";
import OrganizationDetailContent from "@/sections/organizationdetail/OrganizationDetailContent";

OrganizationDetail.getLayout = function getLayout(pageProps, page) {
    return (
        <SettingLayout permissions={PERMISSION_PAGES.organization} {...pageProps}>
            {page}
        </SettingLayout>
    );
};

function OrganizationDetail() {
    return (
        <Page title="Thông tin chi tiết đơn vị">
            <OrganizationDetailContent />
        </Page>
    )
}

export default OrganizationDetail;