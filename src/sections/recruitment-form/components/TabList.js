import {memo} from "react";
import {Badge, Box, Stack, Typography} from "@mui/material";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import Content from "@/components/BaseComponents/Content";
import {STYLE_CONSTANT as style} from "@/theme/palette";

const renderLabelTab = (title, subtitle) => {
    return (
        <Stack sx={{ padding: 2, }}>
            <Typography sx={{fontSize: 14, fontWeight: 700, textTransform: 'none'}}>{title}</Typography>
            <Typography sx={{fontSize: 13, fontWeight: 500, textTransform: 'none'}}>{subtitle}</Typography>
        </Stack>
    )
}

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

const RecruitmentTabList = ({ onChange, isValid, ...props }) => {
    return (
        <Box
            sx={{
              width: "100%",
              backgroundColor: "#FDFDFD",
              borderBottom: '1px solid #E7E9ED',
              zIndex: 1000,
              position: 'fixed',
              top: '156px',
            }}
            {...props}
        >
            <Content style={{ paddingTop: 14, paddingBottom: 14 }}>
                <TabList
                    onChange={onChange}
                    sx={{
                        alignItems: 'center',
                        overflow: 'visible',
                        "& .MuiTabs-scroller": {
                          overflow: 'visible !important',
                        },
                      "& .MuiTabs-indicator": {
                            display: "none",
                        },
                    }}>
                    {
                        tabs.map((tab) => {
                            return (
                                  <Tab
                                      label={<Badge color="secondary" badgeContent=" " variant="dot" sx={{
                                        '& .MuiBadge-dot': {
                                          backgroundColor: isValid ? '#43A047' : '#E53935'
                                        }
                                      }}>
                                        {renderLabelTab(tab.title, tab.description)}
                                      </Badge>}
                                      className="tab-item"
                                      value={tab.value}
                                      key={tab.value}
                                      sx={{
                                        "&.tab-item": {
                                          textAlign: 'left',
                                          maxWidth: style.WIDTH_FULL,
                                          backgroundColor: style.BG_GRAY,
                                          borderRadius: "6px",
                                          position: 'relative',
                                          "&.MuiTab-root": {
                                            minHeight: '76px',
                                            textTransform: 'unset',
                                            marginRight: '20px',
                                            overflow: 'visible',
                                          },
                                          "&.Mui-selected": {
                                            color: style.COLOR_WHITE,
                                            backgroundColor: style.COLOR_PRIMARY,
                                          },
                                          "& .MuiTabs-indicator": {
                                            display: "none",
                                          },
                                        }
                                      }}
                                  />
                            )
                        })
                    }
                </TabList>
            </Content>
        </Box>
    )
}
export default memo(RecruitmentTabList);