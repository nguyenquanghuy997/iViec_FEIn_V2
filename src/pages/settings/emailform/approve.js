import { PERMISSION_PAGES } from "@/config";
import SettingLayout from "@/layouts/setting";
import EmailForm from "@/sections/emailform/component/EmailForm";

NotifyApprove.getLayout = function getLayout(pageProps, page) {
  return (
    <SettingLayout
      permissions={PERMISSION_PAGES.approveOfferTemplate}
      {...pageProps}
    >
      {page}
    </SettingLayout>
  );
};

function NotifyApprove() {
  return (
    <EmailForm
      title="Email thông báo Kết quả - Đạt"
      subtitle="Gửi tới Ứng viên khi Nhà tuyển dụng khởi tạo lịch phỏng vấn."
    />
  );
}

export default NotifyApprove;
