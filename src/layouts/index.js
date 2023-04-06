import LogoOnlyLayout from "./LogoOnlyLayout";
// guards
import AuthGuard from "@/guards/AuthGurad";
// components
import DashboardLayout from "@/layouts/dashboard";
import PropTypes from "prop-types";
import { PERMISSION_GROUPS } from "@/config";

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["dashboard", "logoOnly"]),
  permissions: PropTypes.arrayOf(PropTypes.string), // Ex: ['ViewJob', 'ViewCandidate', ...]
};

Layout.defaultProps = {
  variant: "dashboard",
  permissions: [
    ...PERMISSION_GROUPS.ACCESS_DASHBOARD,
    ...PERMISSION_GROUPS.ACCESS_SETTINGS,
  ],
};

export default function Layout({ variant = "dashboard", permissions, children }) {
  if (variant === "logoOnly") {
    return <LogoOnlyLayout> {children} </LogoOnlyLayout>;
  }

  return (
    <AuthGuard>
      <DashboardLayout permissions={permissions}>
        {children}
      </DashboardLayout>
    </AuthGuard>
  );
}
