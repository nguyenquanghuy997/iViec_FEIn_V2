import { memo } from "react";
import HeadingBar from "@/components/heading-bar/HeadingBar";
import {TabStyle} from "@/sections/recruitment-create/style";
import TabList from "@mui/lab/TabList";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const renderLabelTab = (title, subtitle) => {
    return (
        <Stack>
            <Typography sx={{fontSize: 14, fontWeight: 700, textTransform: 'none'}}>{title}</Typography>
            <Typography sx={{fontSize: 13, fontWeight: 500, textTransform: 'none'}}>{subtitle}</Typography>
        </Stack>
    )
}

const JobCreateHeader = ({handleChange}) => {
  return (
      <HeadingBar style={{
          marginBottom: '28px',
          position: 'fixed',
          top: '140px',
          padding: '12px 0',
          boxShadow: 'none',
          borderBottom: '1px solid #E7E9ED',
          borderTop: '1px solid #E7E9ED',
      }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" sx={{
              "& .MuiTabs-indicator": {
                  display: "none",
              },
          }}>
              <TabStyle
                  className="tab-item"
                  label={renderLabelTab('Thông tin tuyển dụng', 'Các thông tin về việc làm và yêu cầu tuyển dụng')}
                  value="1"/>
              <TabStyle
                  className="tab-item"
                  label={renderLabelTab('Quy trình tuyển dụng', 'Cài đặt quy trình tuyển dụng và các thiết lập tự động')}
                  value="2"/>
              {/*<TabStyle*/}
              {/*    className="tab-item"*/}
              {/*    label={renderLabelTab('Kênh tuyển dụng', 'Đăng tin tuyển dụng lên các Jobsite bên ngoài để quản lý tập trung')}*/}
              {/*    value="3"/>*/}
          </TabList>
      </HeadingBar>
  )
}
export default memo(JobCreateHeader);