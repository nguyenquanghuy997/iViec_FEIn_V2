import NewPasswordForm from "@/sections/auth/new-password/NewPasswordForm";
import { useRouter } from "next/router";

const UserActivePage = () => {
  const router = useRouter();
 
  const { USER_NAME,OTPCode } = router.query;
  return (
    <NewPasswordForm userName={USER_NAME} otpCode={OTPCode} />
  );
};

export default UserActivePage;
