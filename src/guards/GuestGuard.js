// hooks
import useAuth from "@/hooks/useAuth";
// routes
import { PATH_DASHBOARD } from "@/routes/paths";
// next
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useEffect } from "react";

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default function GuestGuard({ children }) {
  const { push } = useRouter();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      push(PATH_DASHBOARD.root);
    }
  }, [isAuthenticated]);

  return <>{children}</>;
}
