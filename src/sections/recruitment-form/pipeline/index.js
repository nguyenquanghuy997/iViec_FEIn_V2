import {useRouter} from "next/router";
import {useFormContext, useWatch} from "react-hook-form";
import {Box, Button, CircularProgress, Divider, Typography} from "@mui/material";

import {RHFCheckbox, RHFSelect} from "@/components/hook-form";
import DividerCard from "@/sections/recruitment-form/components/DividerCard";
import PipelineCard from "@/sections/recruitment-form/components/PipelineCard";
import TextNote from "@/sections/recruitment-form/components/TextNote";
import ExaminationForm from "@/sections/recruitment-form/form/ExaminationForm";

import useModal from "@/sections/recruitment-form/hooks/useModal";

import {STYLE_CONSTANT as style} from "@/theme/palette";
import {useGetAllPipelineByOrganizationQuery, useGetAllStepOfPipelineQuery} from "@/sections/pipeline";

import {PATH_DASHBOARD} from "@/routes/paths";

import {BoxInnerStyle, BoxWrapperStyle} from "@/sections/recruitment-form/style";
import {LabelStyle} from "@/components/hook-form/style";

const RecruitmentPipeline = () => {
    const router = useRouter();
    const {setValue} = useFormContext();
    const organizationId = useWatch({name: 'organizationId'});
    const organizationPipelineId = useWatch({name: 'organizationPipelineId'});
    const organizationPipelineStateDatas = useWatch({name: 'organizationPipelineStateDatas'});

    const { isOpen, selected, onOpen, onClose } = useModal();
    const handleSaveExamination = (data) => {
        const findIndex = organizationPipelineStateDatas?.map(item => item.organizationPipelineStateId).indexOf(data.organizationPipelineStateId);
        if (findIndex !== -1) {
          const newValue = organizationPipelineStateDatas.map(i => i.organizationPipelineStateId === data.organizationPipelineStateId ? { ...data, examinationName: data?.examinationName } : { ...i })
          setValue('organizationPipelineStateDatas', newValue)
        } else {
          const newValue = [...organizationPipelineStateDatas, { ...data, examinationName: data?.examinationName }]
            setValue('organizationPipelineStateDatas', newValue)
        }
    }

    const {
        data: {items: ListPipeline = []} = {},
        isLoading
    } = useGetAllPipelineByOrganizationQuery({OrganizationId: organizationId});
    const {
        data: {organizationPipelineStates: ListStepPipeline = []} = {}
    } = useGetAllStepOfPipelineQuery({Id: organizationPipelineId}, {skip: !organizationPipelineId});

    if (isLoading) return (
        <Box textAlign="center" my={1}>
            <CircularProgress size={24}/>
        </Box>
    )

    return (
        <>
            <BoxWrapperStyle className="wrapper">
                <Box className="box-item"
                     sx={{width: style.WIDTH_FULL, backgroundColor: style.BG_TRANSPARENT, display: 'flex',}}>
                    <BoxInnerStyle>
                        <DividerCard title="QUY TRÌNH TUYỂN DỤNG" sx={{borderTopRightRadius: '6px', borderTopLeftRadius: '6px'}}/>
                        <Box sx={{px: 4, py: 3}}>
                            <LabelStyle required>Quy trình tuyển dụng có sẵn</LabelStyle>
                            <RHFSelect
                                name="organizationPipelineId"
                                placeholder="Chọn 1 quy trình tuyển dụng"
                                fullWidth
                                options={ListPipeline.map(item => ({
                                    id: item.id,
                                    value: item.id,
                                    name: item.name,
                                    label: item.name
                                }))}
                                onChange={(e) => {
                                    setValue('organizationPipelineId', e);
                                    setValue('organizationPipelineStateDatas', [])
                                }}
                            />
                            <Divider sx={{my: 1.5}}/>
                            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                <Typography sx={{
                                    color: style.COLOR_TEXT_PRIMARY,
                                    fontSize: style.FONT_BASE,
                                    fontWeight: style.FONT_SEMIBOLD
                                }}>
                                    Bước tuyển dụng
                                </Typography>
                                <RHFCheckbox name='isAutomaticStepChange' label='Tự động chuyển bước'/>
                            </Box>
                            <Box sx={{mt: 1}}>
                                {ListStepPipeline?.map((item, index) => {
                                    // const examination = organizationPipelineStateDatas?.find(item => item.organizationPipelineStateId === item.id);
                                    return (
                                        <PipelineCard
                                            key={index}
                                            item={item}
                                            examination={{
                                                examinationName: organizationPipelineStateDatas[index]?.examinationName,
                                                examinationId: organizationPipelineStateDatas[index]?.examinationId,
                                                expiredTime: organizationPipelineStateDatas[index]?.expiredTime,
                                                organizationPipelineId: organizationPipelineId,
                                            }}
                                            onOpenFormExamination={onOpen}
                                        />
                                    )
                                })}
                            </Box>

                        </Box>
                    </BoxInnerStyle>
                    <TextNote
                        title="Lưu ý:"
                        texts={[
                            'Vui lòng chọn quy trình tuyển dụng đã được tạo sẵn trong phần thiết lập. Ứng viên sẽ được trải qua các bước trong quy trình đã chọn.',
                            'Nếu chưa có quy trình tuyển dụng phù hợp, Hãy liên hệ Quản trị viên doanh nghiệp của bạn để thêm quy trình mới.',
                        ]}
                    >
                        <Button
                            variant="outlined"
                            sx={{minWidth: '200px', marginLeft: 'auto', fontSize: style.FONT_SM, mb: 4}}
                            onClick={() => router.push(PATH_DASHBOARD.pipeline.root)}
                        >
                            Thiết lập quy trình tuyển dụng
                        </Button>
                        <TextNote
                            title="Tự động chuyển bước sẽ thực hiện như sau:"
                            texts={[
                                '- Ứng viên được chuyển sang bước tiếp theo ngay sau khi ứng tuyển, khi có kết quả thi Đạt, Phỏng vấn Đạt',
                                '- Ứng viên được chuyển sang bước Kết quả - Loại ngay sau khi thi trượt, phỏng vấn trượt',
                            ]}
                            sx={{mx: 0}}
                        />
                    </TextNote>
                </Box>
            </BoxWrapperStyle>
            {
                isOpen && <ExaminationForm
                    open={isOpen}
                    onClose={onClose}
                    data={selected}
                    organizationPipelineId={organizationPipelineId}
                    onSaveExamination={handleSaveExamination}
                />
            }
        </>
    )
}

export default RecruitmentPipeline;