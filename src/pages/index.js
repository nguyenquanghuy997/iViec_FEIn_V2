// config
import { PATH_AFTER_LOGIN } from "@/config";
// hook
import useRole from "@/hooks/useRole";
// routes
import { PATH_DASHBOARD } from "@/routes/paths";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Index() {
  const { pathname, replace, prefetch } = useRouter();
  const { isAdminRole } = useRole();

  useEffect(() => {
    if (pathname !== PATH_DASHBOARD.root) return;
    // if (isAdminRole) {
    //   replace(PATH_DASHBOARD.dashboard.root)
    //   return
    // }
    replace(PATH_AFTER_LOGIN);
  }, [pathname, isAdminRole]);

  useEffect(() => {
    prefetch(PATH_AFTER_LOGIN);
    // prefetch(PATH_DASHBOARD.dashboard.root)
  }, []);

  return null;
}
