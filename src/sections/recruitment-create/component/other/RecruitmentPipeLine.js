import {RHFCheckbox} from "@/components/hook-form";
import {Box, Button, Divider, Typography} from "@mui/material";
import {BoxInnerStyle, BoxWrapperStyle} from "@/sections/recruitment-create/style";
import DividerCard from "@/sections/recruitment-create/component/DividerCard";
import RHFDropdown from "@/components/hook-form/RHFDropdown";
import RightNoteText from "@/sections/recruitment-create/component/RightNoteText";
import {BoxFlex} from "@/sections/emailform/style";
import RecruitmentPipelineCard from "@/sections/recruitment-create/component/other/RecruitmentPipelineCard";
import {STYLE_CONSTANT as style} from "@/theme/palette";
import {useGetAllPipelineByOrganizationQuery, useGetAllStepOfPipelineQuery} from "@/sections/pipeline";
import {PipelineStateType} from "@/utils/formatString";

const RecruitmentPipeLine = ({watchOrganization, watchOrganizationPipelineId}) => {

  const {data: {items: ListPipeline = []} = {}} = useGetAllPipelineByOrganizationQuery({OrganizationId: watchOrganization});
  const {data: {organizationPipelineStates: ListStepPipeline = []} = {}} = useGetAllStepOfPipelineQuery({Id: watchOrganizationPipelineId}, {skip: !watchOrganizationPipelineId});

  return (
      <BoxWrapperStyle className="wrapper">
        <Box className="box-item"
             sx={{width: style.WIDTH_FULL, backgroundColor: style.BG_TRANSPARENT, display: 'flex',}}>
          <BoxInnerStyle>
            <DividerCard title="QUY TRÌNH TUYỂN DỤNG" sx={{borderTopRightRadius: '6px', borderTopLeftRadius: '6px'}}/>
            <Box sx={{px: 4, py: 3}}>
              <RHFDropdown
                  name="organizationPipelineId"
                  title="Quy trình tuyển dụng có sẵn"
                  placeholder="Chọn 1 quy trình tuyển dụng"
                  isRequired
                  fullWidth
                  options={ListPipeline.map(item => ({
                    id: item.id,
                    value: item.id,
                    name: item.name,
                    label: item.name
                  }))}
              />
              <Divider sx={{my: 1.5}}/>
              <BoxFlex>
                <Typography sx={{
                  color: style.COLOR_TEXT_PRIMARY,
                  fontSize: style.FONT_BASE,
                  fontWeight: style.FONT_SEMIBOLD
                }}>
                  Bước tuyển dụng
                </Typography>
                <RHFCheckbox name='isAutomaticStepChange' label='Tự động chuyển bước'/>
              </BoxFlex>


              <Box sx={{mt: 1}}>
                {ListStepPipeline?.map((item, index) => {
                  return <RecruitmentPipelineCard key={index} icon={PipelineStateType(item?.pipelineStateType).icon}
                                                  title={PipelineStateType(item?.pipelineStateType).title}
                                                  subtitle={PipelineStateType(item?.pipelineStateType).subtitle}/>
                })}
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
            <Button variant="outlined" sx={{minWidth: '200px', marginLeft: 'auto', fontSize: style.FONT_SM, mb: 4}}>
              Thiết lập quy trình tuyển dụng
            </Button>

            <RightNoteText
                title="Tự động chuyển bước sẽ thực hiện như sau:"
                texts={[
                  '- Ứng viên được chuyển sang bước tiếp theo ngay sau khi ứng tuyển, khi có kết quả thi Đạt, Phỏng vấn Đạt',
                  '- Ứng viên được chuyển sang bước Kết quả - Loại ngay sau khi thi trượt, phỏng vấn trượt',
                ]}
                sx={{mx: 0}}
            />
          </RightNoteText>
        </Box>
      </BoxWrapperStyle>
  )
}

export default RecruitmentPipeLine;