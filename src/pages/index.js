// config
import { PATH_AFTER_LOGIN } from "@/config";
// routes
import { PATH_DASHBOARD } from "@/routes/paths";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Index() {
  const { pathname, replace, prefetch } = useRouter();

  useEffect(() => {
    if (pathname !== PATH_DASHBOARD.root) return;
    replace(PATH_AFTER_LOGIN);
  }, [pathname]);

  useEffect(() => {
    prefetch(PATH_AFTER_LOGIN);
    // prefetch(PATH_DASHBOARD.dashboard.root)
  }, []);

  return null;
}
