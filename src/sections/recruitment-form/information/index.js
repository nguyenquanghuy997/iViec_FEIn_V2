import {Box} from "@mui/material";

import TextNote from "@/sections/recruitment-form/components/TextNote";
import Common from "@/sections/recruitment-form/information/Common";
import Time from "@/sections/recruitment-form/information/Time";
import Salary from "@/sections/recruitment-form/information/Salary";
import Description from "@/sections/recruitment-form/information/Description";
import Owner from "@/sections/recruitment-form/information/Owner";

import {BoxWrapperStyle} from "@/sections/recruitment-form/style";

const RecruitmentInformation = ({recruitment: Recruitment}) => {
    return (
        <BoxWrapperStyle className="wrapper">
            <Box className="box-item" sx={{width: '100%', backgroundColor: 'transparent', display: 'flex',}}>
                <Common/>
                <TextNote
                    title="Lưu ý:"
                    texts={['Tiêu đề tin tuyển dụng chỉ bao gồm tên vị trí tuyển dụng và khu vực cần tuyển']}
                />
            </Box>
            <Box sx={{width: '100%', backgroundColor: 'transparent', display: 'flex',}}>
                <Time recruitment={Recruitment}/>
                <TextNote/>
            </Box>
            <Box sx={{width: '100%', backgroundColor: 'transparent', display: 'flex',}}>
                <Salary/>
                <TextNote/>
            </Box>
            <Box sx={{width: '100%', backgroundColor: 'transparent', display: 'flex',}}>
                <Description/>
                <TextNote
                    title="Lưu ý:"
                    texts={[
                        'Vui lòng chọn vị trí công việc đã tạo sẵn trong phần thiết lập hoặc nhập tên vị trí công việc để thêm mới.',
                        'Hệ thống sẽ tự động lưu trữ vị trí công việc vừa được thiết lập sẵn.'
                    ]}
                />
            </Box>
            <Box className="box-item" sx={{width: '100%', backgroundColor: 'transparent', display: 'flex'}}>
                <Owner/>
                <TextNote
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

export default RecruitmentInformation;