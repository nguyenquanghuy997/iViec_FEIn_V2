import HeadingBar from "../../components/heading-bar/HeadingBar";
import ListJobToolbar from "./ListJobToolbar";
import { JOB_ALL_STATUS } from "./config";
import { FormProvider } from "@/components/hook-form";
import { getActive } from "@/components/nav-section";
import { Stack } from "@mui/material";
import { styled } from "@mui/styles";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

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

const defaultValues = {
  title: "",
  status: JOB_ALL_STATUS,
};

const ListJobHeader = () => {
  const methods = useForm({ defaultValues });

  return (
    <HeadingBar>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <ActiveLink href="/jobs">Job 1</ActiveLink>
        <ActiveLink href="/applicant">Job 2</ActiveLink>
        <ActiveLink href="/settings/jobtype">Job 3</ActiveLink>
        <ActiveLink href="/settings/billing">Job 4</ActiveLink>
      </Stack>
      {/* Search form */}
      <Stack>
        <FormProvider methods={methods}>
          <ListJobToolbar />
        </FormProvider>
      </Stack>
    </HeadingBar>
  );
};

export default ListJobHeader;
