import { PERMISSION_PAGES } from "@/config";
import SettingLayout from "@/layouts/setting";
import EmailForm from "@/sections/emailform/component/EmailForm";

NotifyReject.getLayout = function getLayout(pageProps, page) {
  return (
    <SettingLayout
      permissions={PERMISSION_PAGES.approveOfferTemplate}
      {...pageProps}
    >
      {page}
    </SettingLayout>
  );
};

function NotifyReject() {
  return (
    <EmailForm
      type={5}
      title="Email thông báo Kết quả - Loại"
      subtitle="Gửi tới Ứng viên khi Nhà tuyển dụng khởi tạo lịch phỏng vấn."
    />
  );
}

export default NotifyReject;
