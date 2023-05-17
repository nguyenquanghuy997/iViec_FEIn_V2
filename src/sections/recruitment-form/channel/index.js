import React, { forwardRef, memo } from 'react';
import { Box } from "@mui/material";
import TextNote from "@/sections/recruitment-form/components/TextNote";
import { STYLE_CONSTANT as style } from "@/theme/palette";
import { BoxWrapperStyle } from "@/sections/recruitment-form/style";
import ChannelCard from "@/sections/recruitment-form/channel/channelCard";
// import { useGetAllPipelineByOrganizationQuery } from "@/sections/pipeline";

const RecruitmentChannel = forwardRef(() => {
  // const {setValue} = useFormContext();
  
  // const organizationId = useWatch({name: 'organizationId'});
  
  // const {
  //   data: {items: ListPipeline = []} = {},
  //   isLoading
  // } = useGetAllPipelineByOrganizationQuery({OrganizationId: organizationId});
  
  
  // if (isLoading) return (
  //   <Box textAlign="center" my={1}>
  //     <CircularProgress size={24}/>
  //   </Box>
  // )
  
  return (
    <>
      <BoxWrapperStyle className="wrapper">
        <Box className="box-item"
             sx={{width: style.WIDTH_FULL, backgroundColor: "transparent", display: 'flex',}}>
          <Box sx={{maxWidth: '844px', minWidth: '844px', marginTop: '12px', flex: 1}}>
            <ChannelCard
              accounts={[{
                img: "/assets/fe_icon.svg",
                title: "FPT Education tuyển dụng",
                active: false
              }]}
              color={"#FB8906"}
              title="KẾT NỐI WEBSITE TUYỂN DỤNG NỘI BỘ"
            />
          </Box>
          <TextNote
            title="Lưu ý:"
            texts={[
              'Để thêm các kênh tuyển dụng khác, vui lòng truy cập mục Thiết lập kết nối để điều chỉnh.',
            ]}
          >
          </TextNote>
        </Box>
      </BoxWrapperStyle>
    </>
  )
})

export default memo(RecruitmentChannel);