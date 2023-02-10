import HeadingBar from "../../components/heading-bar/HeadingBar";
import { getActive } from "@/components/nav-section";
import { Stack } from "@mui/material";
import { styled } from "@mui/styles";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const LinkDefaultStyle = styled("a")(({ isActive, theme }) => ({
  color: "blue",
  display: "block",
  padding: theme.spacing(1, 2),
  ...(isActive && {
    color: "black",
    borderBottom: "1px solid black",
  }),
}));

const ActiveLink = ({ children, href }) => {
  const router = useRouter();
  const isActive = getActive(href, router.pathname, router.asPath);
  return (
    <Link href={href} scroll={false}>
      <LinkDefaultStyle isActive={isActive}>{children}</LinkDefaultStyle>
    </Link>
  );
};

const ApplicantHeader = () => {
  return (
    <HeadingBar>
      <Stack flexDirection='row'>
        <ActiveLink href="/jobs">Applicant 1</ActiveLink>
        <ActiveLink href="/applicant">Applicant 2</ActiveLink>
        <ActiveLink href="/settings/jobtype">Applicant 3</ActiveLink>
        <ActiveLink href="/settings/billing">Applicant 4</ActiveLink>
        <ActiveLink href="/settings/notifications">Link 5</ActiveLink>
        <ActiveLink href="/settings/security">Applicant 6</ActiveLink>
      </Stack>
    </HeadingBar>
  );
};

export default ApplicantHeader;
