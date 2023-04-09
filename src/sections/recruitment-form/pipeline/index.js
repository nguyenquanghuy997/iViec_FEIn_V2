import {forwardRef, memo, useEffect, useImperativeHandle, useState} from 'react';
import {useRouter} from "next/router";
import {useFormContext, useWatch} from "react-hook-form";
import {Box, Button, CircularProgress, Divider, Typography} from "@mui/material";
import {isEmpty} from "lodash";

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

const RecruitmentPipeline = forwardRef(({recruitment,}, ref) => {
    const router = useRouter();
    const {setValue} = useFormContext();

    const {isOpen, selected, onOpen, onClose} = useModal();

    const [pipelineStateDatas, setPipelineStateDatas] = useState([]);
    const [hasExamination, setHasExamination] = useState({
        hasValue: false,
        size: 0,
    });

    useImperativeHandle(ref, () => {
        return {
            getHasValue: () => hasExamination.hasValue,
            getSize: () => hasExamination.size,
            getPipeLineStateData: () => pipelineStateDatas,
        }
    })

    const organizationId = useWatch({name: 'organizationId'});
    const organizationPipelineId = useWatch({name: 'organizationPipelineId'});

    const {
        data: {items: ListPipeline = []} = {},
        isLoading
    } = useGetAllPipelineByOrganizationQuery({OrganizationId: organizationId});
    const {
        data: {organizationPipelineStates: ListStepPipeline = []} = {}
    } = useGetAllStepOfPipelineQuery({Id: organizationPipelineId}, {skip: !organizationPipelineId});

    useEffect(() => {
        if (!isEmpty(recruitment)) {
            setPipelineStateDatas(recruitment?.recruitmentPipeline?.recruitmentPipelineStates?.map(item => (
                {
                    organizationPipelineId: recruitment?.recruitmentPipeline?.organizationPipelineId,
                    expiredTime: item?.examinationExpiredDays,
                    examinationId: item?.examinationId,
                    examinationName: item?.examinationName,
                    pipelineStateType: item?.pipelineStateType,
                }
            )))
        }
    }, [recruitment])

    useEffect(() => {
        if (!isEmpty(ListStepPipeline)) {
            const listStepPipelineSize = ListStepPipeline?.filter(item => item.pipelineStateType === 1)?.length;
            setHasExamination({
                hasValue: listStepPipelineSize > 0 ? true : false,
                size: listStepPipelineSize
            });
        }
    }, [ListStepPipeline, organizationPipelineId])

    const handleSaveExamination = (data) => {
        if(isEmpty(recruitment)) {
            const findIndex = pipelineStateDatas?.map(item => item.organizationPipelineStateId).indexOf(data.organizationPipelineStateId);
            if (findIndex !== -1) {
                const newValue = pipelineStateDatas.map(i => i.organizationPipelineStateId === data.organizationPipelineStateId ? {
                    ...data,
                    examinationName: data?.examinationName
                } : {...i})
                setPipelineStateDatas(newValue);
            } else {
                const newValue = [...pipelineStateDatas, {...data, examinationName: data?.examinationName}]
                setPipelineStateDatas(newValue);
            }
        } else {
            const findIndex = data?.index || 1;
            const pipelineStateData = pipelineStateDatas[findIndex];
            const newValue = pipelineStateDatas.map((i, index) => index === findIndex ? {
                ...pipelineStateData,
                ...data,
            } : {...i})
            setPipelineStateDatas(newValue);
        }
    }

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
                                    setPipelineStateDatas(ListStepPipeline?.map(pipeline => ({
                                        organizationPipelineId: pipeline.id,
                                        pipelineStateType: pipeline.pipelineStateType,
                                        examinationId: null,
                                        expiredTime: null,
                                        examinationName: null,
                                    })));
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
                                    const examination = pipelineStateDatas?.find(pipeline => pipeline?.organizationPipelineStateId === item?.id);
                                    return (
                                        <PipelineCard
                                            key={index}
                                            index={index}
                                            item={item}
                                            examination={
                                                isEmpty(recruitment) ? {
                                                    examinationName: examination?.examinationName,
                                                    examinationId: examination?.examinationId,
                                                    expiredTime: examination?.expiredTime,
                                                    organizationPipelineId: organizationPipelineId,
                                                } : {
                                                    examinationName: pipelineStateDatas[index]?.examinationName,
                                                    examinationId: pipelineStateDatas[index]?.examinationId,
                                                    expiredTime: pipelineStateDatas[index]?.expiredTime,
                                                    organizationPipelineId: organizationPipelineId,
                                                }
                                            }
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
                    onSaveExamination={handleSaveExamination}
                />
            }
        </>
    )
})

export default memo(RecruitmentPipeline);