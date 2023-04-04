import {memo} from "react";
import {Box, Stack, Typography} from "@mui/material";
import MuiTabList from "@mui/lab/TabList";

import Content from "@/components/BaseComponents/Content";
import {TabStyle} from "@/sections/recruitment-form/style";

const renderLabelTab = (title, subtitle) => {
  return (
      <Stack>
        <Typography sx={{fontSize: 14, fontWeight: 700, textTransform: 'none'}}>{title}</Typography>
        <Typography sx={{fontSize: 13, fontWeight: 500, textTransform: 'none'}}>{subtitle}</Typography>
      </Stack>
  )
}

const tabs = [
  {
    value: '0',
    title: 'Thông tin tuyển dụng',
    description: 'Các thông tin về việc làm và yêu cầu tuyển dụng',
  },
  {
    value: '1',
    title: 'Quy trình tuyển dụng',
    description: 'Cài đặt quy trình tuyển dụng và các thiết lập tự động'
  }
]

const TabList = ({handleSelected}) => {
  return (
      <Box sx={{
        marginTop: '92px',
        width: "100%",
        boxShadow: "0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)",
        backgroundColor: "#FDFDFD",
        zIndex: 1000
      }}>
        <Content style={{paddingTop: 14, paddingBottom: 14}}>
          <MuiTabList onChange={handleSelected} aria-label="lab API tabs example" sx={{
            "& .MuiTabs-indicator": {
              display: "none",
            },
          }}
          >
            {
              tabs.map((tab, index) => {
                return (
                    <TabStyle
                        key={index}
                        className="tab-item"
                        label={renderLabelTab(tab.title, tab.description)}
                        value={tab.value}
                    />
                )
              })
            }
          </MuiTabList>
        </Content>
      </Box>
  )
}
export default memo(TabList);