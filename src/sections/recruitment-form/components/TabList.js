import {memo} from "react";
import {Box, Stack, Typography} from "@mui/material";
import {styled} from "@mui/styles";

import Content from "@/components/BaseComponents/Content";

import {STYLE_CONSTANT as style} from "@/theme/palette";

const renderLabelTab = (title, subtitle) => {
    return (
        <Stack>
            <Typography sx={{fontSize: 14, fontWeight: 700, textTransform: 'none'}}>{title}</Typography>
            <Typography sx={{fontSize: 13, fontWeight: 500, textTransform: 'none'}}>{subtitle}</Typography>
        </Stack>
    )
}

const TabStyle = styled(Box)(({theme, selected}) => ({
    "&.tab-item": {
        cursor: 'pointer',
        textAlign: 'left',
        maxWidth: style.WIDTH_FULL,
        backgroundColor: selected ? style.BG_PRIMARY : style.BG_GRAY,
        color: selected ? style.COLOR_WHITE : style.COLOR_TEXT_BLACK,
        borderRadius: "6px",
        textTransform: 'unset',
        minHeight: '76px',
        padding: theme.spacing(2),
        marginRight: '20px',
    }
}));

const tabs = [
    {
        title: 'Thông tin tuyển dụng',
        description: 'Các thông tin về việc làm và yêu cầu tuyển dụng'
    },
    {
        title: 'Quy trình tuyển dụng',
        description: 'Cài đặt quy trình tuyển dụng và các thiết lập tự động'
    }
]

const TabList = ({ handleSelected, selected }) => {
    return (
        <Box sx={{
            marginTop: '92px',
            width: "100%",
            boxShadow: "0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)",
            backgroundColor: "#FDFDFD",
            zIndex: 1000
        }}>
            <Content style={{ paddingTop: 14, paddingBottom: 14 }}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    {
                        tabs.map((tab, index) => {
                            return (
                                <TabStyle selected={selected === index} key={index} onClick={() => handleSelected(index)} className="tab-item">
                                    {renderLabelTab(tab.title, tab.description)}
                                </TabStyle>
                            )
                        })
                    }
                </Box>
            </Content>
        </Box>
    )
}
export default memo(TabList);