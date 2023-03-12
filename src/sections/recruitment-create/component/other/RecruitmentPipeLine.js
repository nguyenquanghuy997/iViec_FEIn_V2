import {useForm} from "react-hook-form";
import {FormProvider, RHFCheckbox} from "@/components/hook-form";
import {Box, Button, Divider, Typography} from "@mui/material";
import {BoxInnerStyle, BoxWrapperStyle} from "@/sections/recruitment-create/style";
import DividerCard from "@/sections/recruitment-create/component/DividerCard";
import RHFDropdown from "@/components/hook-form/RHFDropdown";
import RightNoteText from "@/sections/recruitment-create/component/RightNoteText";
import React from "react";
import {BoxFlex} from "@/sections/emailform/style";
import RecruitmentPipelineCard from "@/sections/recruitment-create/component/other/RecruitmentPipelineCard";

const RecruitmentPipeLine = () => {

  const methods = useForm({
    mode: 'all',
  });

  return (
      <BoxWrapperStyle className="wrapper">
        <FormProvider methods={methods}>
          <Box className="box-item" sx={{width: '100%', backgroundColor: 'transparent', display: 'flex',}}>
            <BoxInnerStyle>
              <DividerCard title="QUY TRÌNH TUYỂN DỤNG" sx={{borderTopRightRadius: '6px', borderTopLeftRadius: '6px'}}/>
              <Box sx={{px: 4, py: 3}}>
                <Box sx={{mb: 2, display: 'flex', justifyContent: 'space-between'}}>
                  <div style={{flex: 1, marginRight: 8}}>
                    <RHFDropdown
                        name="organization"
                        title="Quy trình tuyển dụng có sẵn"
                        placeholder="Chọn 1 quy trình tuyển dụng"
                        isRequired
                        fullWidth
                    />
                  </div>
                </Box>
                <Divider sx={{ mb: 1.5 }} />
                <BoxFlex>
                  <Typography sx={{color: '#455570', fontSize: 16, fontWeight: 600}}>
                    Bước tuyển dụng
                  </Typography>
                  <RHFCheckbox name='isDefault' label='Tự động chuyển bước'/>
                </BoxFlex>

                <Box sx={{ mt: 1 }}>
                  <RecruitmentPipelineCard title="Ứng tuyển" subtitle="Ứng viên ứng tuyển trên Jobsite hoặc nhà tuyển dụng thêm vào tin" />
                  <RecruitmentPipelineCard
                      title="Thi tuyển"
                      moreTitle="Đề thi: Đề thi tuyển lập trình viên 1"
                      subtitle="Ứng viên ứng tuyển trên Jobsite hoặc nhà tuyển dụng thêm vào tin" />
                  <RecruitmentPipelineCard title="Phỏng vấn máy" subtitle="Ứng viên ứng tuyển trên Jobsite hoặc nhà tuyển dụng thêm vào tin" />
                  <RecruitmentPipelineCard title="Phỏng vấn" subtitle="Ứng viên ứng tuyển trên Jobsite hoặc nhà tuyển dụng thêm vào tin" />
                  <RecruitmentPipelineCard title="Kết quả" subtitle="Ứng viên ứng tuyển trên Jobsite hoặc nhà tuyển dụng thêm vào tin" />
                  <RecruitmentPipelineCard title="Mời nhận việc" subtitle="Ứng viên ứng tuyển trên Jobsite hoặc nhà tuyển dụng thêm vào tin" />
                </Box>

              </Box>
            </BoxInnerStyle>
            <RightNoteText
                title="Lưu ý:"
                texts={[
                  'Vui lòng chọn quy trình tuyển dụng đã được tạo sẵn trong phần thiết lập. Ứng viên sẽ được trải qua các bước trong quy trình đã chọn.',
                  'Nếu chưa có quy trình tuyển dụng phù hợp, Hãy liên hệ Quản trị viên doanh nghiệp của bạn để thêm quy trình mới.',
                ]}
            >
              <Button variant="outlined" sx={{minWidht: '200px', marginLeft: 'auto', fontSize: 14, mb: 4}}>
                Thiết lập quy trình tuyển dụng
              </Button>
              <Typography sx={{color: '#5C6A82', fontSize: 14, fontWeight: 600, mb: 2}}>
                Tự động chuyển bước sẽ thực hiện như sau:
              </Typography>
              <Typography sx={{color: '#5C6A82', fontSize: 14, fontWeight: 400, fontStyle: 'italic', mb: 2}}>
                - Ứng viên được chuyển sang bước tiếp theo ngay sau khi ứng tuyển, khi có kết quả thi Đạt, Phỏng vấn Đạt
              </Typography>
              <Typography sx={{color: '#5C6A82', fontSize: 14, fontWeight: 400, fontStyle: 'italic', mb: 2}}>
                - Ứng viên được chuyển sang bước Kết quả - Loại ngay sau khi thi trượt, phỏng vấn trượt
              </Typography>
            </RightNoteText>
          </Box>
        </FormProvider>
      </BoxWrapperStyle>
  )
}

export default RecruitmentPipeLine;