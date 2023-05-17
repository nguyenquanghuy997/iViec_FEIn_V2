import { PERMISSION_PAGES } from "@/config";
import SettingLayout from "@/layouts/setting";
import EmailForm from "@/sections/emailform/component/EmailForm";

ScheduleLive.getLayout = function getLayout(pageProps, page) {
  return (
    <SettingLayout permissions={PERMISSION_PAGES.emailTemplate} {...pageProps}>
      {page}
    </SettingLayout>
  );
};

function ScheduleLive() {
  return (
    <EmailForm
      type={4}
      title="Email lịch phỏng vấn trực tiếp"
      subtitle="Gửi tới Ứng viên khi Nhà tuyển dụng chuyển Ứng viên vào tin và thực hiện thao tác tuyển dụng đầu tiên."
    />
  );
}

export default ScheduleLive;
