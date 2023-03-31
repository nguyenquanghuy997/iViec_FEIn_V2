import React, {memo} from 'react';
import {Box} from "@mui/material";
import {BoxWrapperStyle} from "@/sections/recruitment-create/style";
import RightNoteText from "@/sections/recruitment-create/component/RightNoteText";
import Common from "@/sections/recruitment-create/component/other/information/Common";
import Time from "@/sections/recruitment-create/component/other/information/Time";
import Salary from "@/sections/recruitment-create/component/other/information/Salary";
import Description from "@/sections/recruitment-create/component/other/information/Description";
import Owner from "@/sections/recruitment-create/component/other/information/Owner";

const RecruitmentInformation = ({recruitment}) => {
  return (
      <BoxWrapperStyle className="wrapper">
        {/* THÔNG TIN CHUNG */}
        <Box className="box-item" sx={{width: '100%', backgroundColor: 'transparent', display: 'flex',}}>
          <Common recruitment={recruitment} />
          <RightNoteText
              title="Lưu ý:"
              texts={['Tiêu đề tin tuyển dụng chỉ bao gồm tên vị trí tuyển dụng và khu vực cần tuyển']}
          />
        </Box>

        {/* THỜI GIAN TUYỂN DỤNG */}
        <Box sx={{width: '100%', backgroundColor: 'transparent', display: 'flex',}}>
          <Time recruitment={recruitment} />
          <RightNoteText />
        </Box>

        {/* MỨC LƯƠNG */}
        <Box sx={{width: '100%', backgroundColor: 'transparent', display: 'flex',}}>
          <Salary recruitment={recruitment} />
          <RightNoteText />
        </Box>

        {/* MÔ TẢ CÔNG VIỆC */}
        <Box sx={{width: '100%', backgroundColor: 'transparent', display: 'flex',}}>
          <Description recruitment={recruitment} />
          <RightNoteText
              title="Lưu ý:"
              texts={[
                'Vui lòng chọn vị trí công việc đã tạo sẵn trong phần thiết lập hoặc nhập tên vị trí công việc để thêm mới.',
                'Hệ thống sẽ tự động lưu trữ vị trí công việc vừa được thiết lập sẵn.'
              ]}
          />
        </Box>

        {/* CÁN BỘ TUYỂN DỤNG VÀ HỘI ĐỒNG TUYỂN DỤNG */}
        <Box className="box-item" sx={{width: '100%', backgroundColor: 'transparent', display: 'flex'}}>
          <Owner recruitment={recruitment} />
          <RightNoteText
              title="Lưu ý:"
              texts={[
                'Cán bộ tuyển dụng và Đồng phụ trách có toàn quyền thao tác với tin tuyển dụng.',
                'Hội đồng tuyển dụng là hội đồng chuyên môn, có quyền nhận các thông báo về ứng viên ứng tuyển và tham gia phỏng vấn. Trường hợp, Đơn vị chuyên môn không có nhu cầu nhận thông báo về ứng viên ứng tuyển, vui lòng bỏ qua cài đặt này, và thiết lập danh sách hội đồng ở bước đặt lịch phỏng vấn.'
              ]}
          />
        </Box>
      </BoxWrapperStyle>
  )
}

export default memo(RecruitmentInformation);