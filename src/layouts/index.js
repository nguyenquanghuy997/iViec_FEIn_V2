import LogoOnlyLayout from "./LogoOnlyLayout";
// guards
import AuthGuard from "@/guards/AuthGurad";
// components
import DashboardLayout from "@/layouts/dashboard";
import PropTypes from "prop-types";

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["dashboard", "logoOnly"]),
  permissions: PropTypes.arrayOf(PropTypes.string), // Ex: ['ViewJob', 'ViewCandidate', ...]
};

Layout.defaultProps = {
  variant: "dashboard",
  permissions: ["ViewCandidate"],
};

export default function Layout({ variant = "dashboard", roles, children }) {
  if (variant === "logoOnly") {
    return <LogoOnlyLayout> {children} </LogoOnlyLayout>;
  }

  return (
    <AuthGuard>
      <DashboardLayout permissions={roles}>
        {children}
      </DashboardLayout>
    </AuthGuard>
  );
}
