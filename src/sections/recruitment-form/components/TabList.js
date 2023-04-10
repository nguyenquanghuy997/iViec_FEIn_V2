import {memo} from "react";
import {Box, Stack, Typography} from "@mui/material";
import {styled} from "@mui/styles";

import Content from "@/components/BaseComponents/Content";

import {STYLE_CONSTANT as style} from "@/theme/palette";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";

const renderLabelTab = (title, subtitle) => {
    return (
        <Stack>
            <Typography sx={{fontSize: 14, fontWeight: 700, textTransform: 'none'}}>{title}</Typography>
            <Typography sx={{fontSize: 13, fontWeight: 500, textTransform: 'none'}}>{subtitle}</Typography>
        </Stack>
    )
}

const TabStyle = styled(Tab)(({theme}) => ({
  "&.tab-item": {
    textAlign: 'left',
    maxWidth: style.WIDTH_FULL,
    backgroundColor: style.BG_GRAY,
    borderRadius: "6px",
    "&.MuiTab-root": {
      minHeight: '76px',
      textTransform: 'unset',
      padding: theme.spacing(2),
      marginRight: '20px'
    },
    "&.Mui-selected": {
      color: style.COLOR_WHITE,
      backgroundColor: style.BG_PRIMARY,
    },
    "& .MuiTabs-indicator": {
      display: "none",
    },
  }

}));

const tabs = [
    {
        value: '1',
        title: 'Thông tin tuyển dụng',
        description: 'Các thông tin về việc làm và yêu cầu tuyển dụng'
    },
    {
        value: '2',
        title: 'Quy trình tuyển dụng',
        description: 'Cài đặt quy trình tuyển dụng và các thiết lập tự động'
    }
]

const RecruitmentTabList = ({ onChange }) => {
    return (
        <Box sx={{
            marginTop: '92px',
            width: "100%",
            boxShadow: "0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)",
            backgroundColor: "#FDFDFD",
            zIndex: 1000
        }}>
            <Content style={{ paddingTop: 14, paddingBottom: 14 }}>
                <TabList
                    onChange={onChange}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        "& .MuiTabs-indicator": {
                            display: "none",
                        },
                    }}>
                    {
                        tabs.map((tab) => {
                            return (
                                <TabStyle label={renderLabelTab(tab.title, tab.description)} className="tab-item" value={tab.value} key={tab.value} />
                            )
                        })
                    }
                </TabList>
            </Content>
        </Box>
    )
}
export default memo(RecruitmentTabList);