import PageWrapper from "@/components/PageWrapper";
import { PERMISSION_PAGES } from "@/config";
import SettingLayout from "@/layouts/setting";
import { ExamItem, QuestionGallary } from "@/sections/exam";

import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";

Setting.getLayout = function getLayout(pageProps, page) {
  return (
    <SettingLayout permissions={PERMISSION_PAGES.exam} {...pageProps}>
      {page}
    </SettingLayout>
  );
};

export default function Setting() {
  const router = useRouter();
  const { defaultTab } = router.query;
  // tab
  const theme = useTheme();
  const [tab, setTab] = useState(parseInt(defaultTab == 2 ? 2 : 1));
  const tabs = [
    {
      value: 1,
      title: 'Đề thi'
    },
    {
      value: 2,
      title: 'Thư viện câu hỏi'
    }
  ]

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
    router.replace({
      query: { ...router.query, defaultTab: newValue },
    });
  };

  return (
    <PageWrapper title={"Kho đề thi doanh nghiệp"}>
      <TabContext value={tab} >
        <TabList onChange={handleChangeTab} sx={{
          marginBottom: "24px",
          "& .MuiTabs-indicator": {
            display: "none",
          },
        }}>
          {
            tabs.map(x => <Tab
              label={x.title}
              value={x.value}
              className="tab-item"
              sx={{
                "&.tab-item": {
                  borderRadius: "6px",
                  position: 'relative',
                  "&.MuiTab-root": {
                    textTransform: 'unset',
                    marginRight: '1rem',
                    padding: '8px 12px',
                    overflow: 'visible',
                    minHeight: 'auto'
                  },
                  "&.Mui-selected": {
                    color: theme.palette.background.paper,
                    backgroundColor: theme.palette.common.neutral700,
                  },

                }
              }} />)
          }
        </TabList>

        <TabPanel value={1}>
          <ExamItem />
        </TabPanel>

        <TabPanel value={2}>
          <QuestionGallary />
        </TabPanel>
      </TabContext>

    </PageWrapper>
  );
}
