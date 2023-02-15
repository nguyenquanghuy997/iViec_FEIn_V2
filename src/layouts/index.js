import LogoOnlyLayout from "./LogoOnlyLayout";
// guards
import AuthGuard from "@/guards/AuthGurad";
// components
import DashboardLayout from "@/layouts/dashboard";
import PropTypes from "prop-types";

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["dashboard", "logoOnly"]),
  roles: PropTypes.arrayOf(PropTypes.string), // Example ['Admin', 'Leader']
};

Layout.defaultProps = {
  variant: "dashboard",
  roles: "Admin",
};

export default function Layout({ variant = "dashboard", roles, children }) {
  if (variant === "logoOnly") {
    return <LogoOnlyLayout> {children} </LogoOnlyLayout>;
  }
  return (
    <AuthGuard>
      <DashboardLayout roles={roles}> {children} </DashboardLayout>
    </AuthGuard>
  );
}
