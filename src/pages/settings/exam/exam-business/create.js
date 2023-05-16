import { View } from "@/components/FlexStyled";
import PageWrapper from "@/components/PageWrapper";
import { PERMISSION_PAGES } from "@/config";
import SettingLayout from "@/layouts/setting";
import CreateExamContent from "@/sections/exam-form/components/CreateExamContent";

CreateExam.getLayout = function getLayout(pageProps, page) {
    return (
        <SettingLayout permissions={PERMISSION_PAGES.exam} {...pageProps}>
            {page}
        </SettingLayout>
    );
};

export default function CreateExam() {
    return <PageWrapper title={'Tạo mới đề thi'}>
            <View>
                <CreateExamContent/>
            </View>
    </PageWrapper>
}