import { PERMISSION_PAGES } from "@/config";
import SettingLayout from "@/layouts/setting";
import EmailForm from "@/sections/emailform/component/EmailForm";

Account.getLayout = function getLayout(pageProps, page) {
  return (
    <SettingLayout permissions={PERMISSION_PAGES.emailTemplate} {...pageProps}>
      {page}
    </SettingLayout>
  );
};

function Account() {
  return (
    <EmailForm
      title="Email thông báo tài khoản"
      subtitle="Gửi tới Ứng viên khi Nhà tuyển dụng chuyển Ứng viên vào tin và thực hiện thao tác tuyển dụng đầu tiên."
    />
  );
}

export default Account;
