import Content from "@/components/BaseComponents/Content";
import useAuth from "@/hooks/useAuth";
import { useLazyGetInternalAccountQuery } from "@/sections/connect/ConnectSlice";
import { STYLE_CONSTANT as style } from "@/theme/palette";
import TabList from "@mui/lab/TabList";
import { Badge, Box, Stack, Typography } from "@mui/material";
import Tab from "@mui/material/Tab";
import { memo, useEffect, useState } from "react";

const renderLabelTab = (title, subtitle) => {
  return (
    <Stack sx={{ padding: 2 }}>
      <Typography sx={{ fontSize: 14, fontWeight: 700, textTransform: "none" }}>
        {title}
      </Typography>
      <Typography sx={{ fontSize: 13, fontWeight: 500, textTransform: "none" }}>
        {subtitle}
      </Typography>
    </Stack>
  );
};

let tabs = [
  {
    value: "1",
    title: "Thông tin tuyển dụng",
    description: "Các thông tin về việc làm và yêu cầu tuyển dụng",
  },
  {
    value: "2",
    title: "Quy trình tuyển dụng",
    description: "Cài đặt quy trình tuyển dụng và các thiết lập tự động",
  },
];

const RecruitmentTabList = ({ onChange, isValid, ...props }) => {
  const [dataInternal] = useLazyGetInternalAccountQuery();
  const [tabsRender, setTabsRender] = useState(tabs);
  const auth = useAuth();
  useEffect(async () => {
    await dataInternal({ OrganizationId: auth.user.organizationId })
      .unwrap()
      .then((response) => {
        if (response.isActivated) {
          setTabsRender([
            ...tabs,
            {
              value: "3",
              title: "Kênh tuyển dụng",
              description:
                "Đăng tin tuyển dụng lên các Jobsite bên ngoài để quản lý tập trung",
            },
          ]);
        }
      })
      .catch(() => {});
  }, [tabs]);

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#FDFDFD",
        borderBottom: "1px solid #E7E9ED",
        zIndex: 1000,
        position: "fixed",
        top: "154px",
        filter:
          "drop-shadow(0px 3px 5px rgba(9, 30, 66, 0.2)) drop-shadow(0px 0px 1px rgba(9, 30, 66, 0.3))",
      }}
      {...props}
    >
      <Content style={{ paddingTop: 14, paddingBottom: 14 }}>
        <TabList
          onChange={onChange}
          sx={{
            alignItems: "center",
            overflow: "visible",
            "& .MuiTabs-scroller": {
              overflow: "visible !important",
            },
            "& .MuiTabs-indicator": {
              display: "none",
            },
          }}
        >
          {tabsRender.map((tab) => {
            return (
              <Tab
                label={
                  <Badge
                    color="secondary"
                    badgeContent=" "
                    variant="dot"
                    sx={{
                      "& .MuiBadge-dot": {
                        backgroundColor: isValid ? "transparent" : "#E53935",
                      },
                    }}
                  >
                    {renderLabelTab(tab.title, tab.description)}
                  </Badge>
                }
                className="tab-item"
                value={tab.value}
                key={tab.value}
                sx={{
                  "&.tab-item": {
                    textAlign: "left",
                    maxWidth: style.WIDTH_FULL,
                    backgroundColor: style.BG_GRAY,
                    borderRadius: "6px",
                    position: "relative",
                    "&.MuiTab-root": {
                      minHeight: "76px",
                      textTransform: "unset",
                      marginRight: "20px",
                      overflow: "visible",
                    },
                    "&.Mui-selected": {
                      color: style.COLOR_WHITE,
                      backgroundColor: style.COLOR_PRIMARY,
                    },
                    "& .MuiTabs-indicator": {
                      display: "none",
                    },
                  },
                }}
              />
            );
          })}
        </TabList>
      </Content>
    </Box>
  );
};
export default memo(RecruitmentTabList);
