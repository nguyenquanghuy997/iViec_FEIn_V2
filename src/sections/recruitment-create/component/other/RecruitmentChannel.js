import {Box, Button} from "@mui/material";
import {BoxInnerStyle, BoxWrapperStyle} from "@/sections/recruitment-create/style";
import RightNoteText from "@/sections/recruitment-create/component/RightNoteText";
import React, {useState} from "react";
import RecruitmentChannelCard from "@/sections/recruitment-create/component/other/RecruitmentChannelCard";

const dataChannels = [
  {
    logo: "https://fptjobs.com/public/img/1531190552-Logo-Career-Black.png",
    brand: "FPTJobs",
    type: 'inside',
    title: "KẾT NỐI WEBSITE TUYỂN DỤNG NỘI BỘ",
    color: "#FB8906"
  },
  {
    logo: "https://blog.topcv.vn/wp-content/uploads/2014/10/TopCVlogo.png",
    brand: "TopCV",
    type: 'outside',
    title: "KẾT NỐI WEBSITE TUYỂN DỤNG BÊN NGOÀI",
    color: "#43A047"
  },
  {
    logo: "https://1000logos.net/wp-content/uploads/2016/11/Facebook-Logo-Meaning.jpg",
    brand: "Facebook",
    type: 'social',
    title: "KẾT NỐI MẠNG XÃ HỘI",
    color: "#1E88E5"
  },
];

const RecruitmentChannel = () => {
  const [checked, setChecked] = useState([true, true, false]);
  const handleChange = (index) => {
    const newChecked = [...checked].map((item, idx) => index === idx ? !item : item)
    setChecked(newChecked)
  }

  return (
      <BoxWrapperStyle className="wrapper">
          <Box className="box-item" sx={{display: 'flex'}}>
            <BoxInnerStyle style={{minWidth: '844px', backgroundColor: 'transparent', boxShadow: 'none'}}>
              {
                dataChannels.map((item, index) => {
                  return (
                      <RecruitmentChannelCard
                          key={index}
                          color={item.color || "#FB8906"}
                          title={item.title}
                          type={item.type}
                          logo={item.logo}
                          brand={item.brand}
                          handleChange={() => handleChange(index)}
                          checked={checked[index]}
                      />
                  )
                })
              }
            </BoxInnerStyle>
            <RightNoteText
                title="Lưu ý:"
                texts={[
                  'Để thêm các kênh tuyển dụng khác, vui lòng truy cập mục Thiết lập kết nối để điều chỉnh',
                ]}
            >
              <Button variant="outlined" sx={{padding: '12px 16px', marginLeft: 'auto'}}>
                Thiết lập kết nối
              </Button>
            </RightNoteText>
          </Box>
      </BoxWrapperStyle>
  )
}

export default RecruitmentChannel;