import { PERMISSION_PAGES } from "@/config";
import SettingLayout from "@/layouts/setting";
import EmailForm from "@/sections/emailform/component/EmailForm";

ScheduleOnline.getLayout = function getLayout(pageProps, page) {
  return (
    <SettingLayout permissions={PERMISSION_PAGES.emailTemplate} {...pageProps}>
      {page}
    </SettingLayout>
  );
};

function ScheduleOnline() {
  return (
    <EmailForm
      title="Email lịch phỏng vấn trực tuyến"
      subtitle="Gửi tới Ứng viên khi Nhà tuyển dụng khởi tạo lịch phỏng vấn."
    />
  );
}

export default ScheduleOnline;
