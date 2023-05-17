import { View } from "@/components/FlexStyled";
import PageWrapper from "@/components/PageWrapper";
import { PERMISSION_PAGES } from "@/config";
import SettingLayout from "@/layouts/setting";
import CreateExamContent from "@/sections/exam-form/components/CreateExamContent";

UpdateExam.getLayout = function getLayout(pageProps, page) {
    return (
        <SettingLayout permissions={PERMISSION_PAGES.exam} {...pageProps}>
            {page}
        </SettingLayout>
    );
};

export default function UpdateExam() {
    return <PageWrapper title={'Cập nhật đề thi'}>
            <View>
                <CreateExamContent/>
            </View>
    </PageWrapper>
}