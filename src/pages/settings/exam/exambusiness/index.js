import PageWrapper from "@/components/PageWrapper";
import { PERMISSION_PAGES } from "@/config";
import SettingLayout from "@/layouts/setting";
import { ExamItem, QuestionGallary } from "@/sections/exam";

import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";
import { useState } from "react";

Setting.getLayout = function getLayout(pageProps, page) {
  return (
    <SettingLayout permissions={PERMISSION_PAGES.exam} {...pageProps}>
      {page}
    </SettingLayout>
  );
};

export default function Setting() {

  // tab
  const [tab, setTab] = useState(1);
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
                    marginRight: '20px',
                    padding: '8px 12px',
                    overflow: 'visible',
                    minHeight: 'auto'
                  },
                  "&.Mui-selected": {
                    color: "#fff",
                    backgroundColor: "#455570",
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
