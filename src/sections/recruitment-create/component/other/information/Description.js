import {memo, useEffect} from 'react';
import DividerCard from "@/sections/recruitment-create/component/DividerCard";
import {Box} from "@mui/material";
import {LabelStyle} from "@/components/hook-form/style";
import {RHFAutocomplete, RHFSelect} from "@/components/hook-form";
import {API_GET_PAGING_JOBTYPE} from "@/routes/api";
import {BoxInnerStyle} from "@/sections/recruitment-create/style";
import {useFormContext, useWatch} from "react-hook-form";
import {useGetJobPositionByIdQuery} from "@/sections/jobtype";
import {isEmpty} from "lodash";
import RHFTinyEditor from "@/components/editor/RHFTinyEditor";

const Description = ({ recruitment }) => {

    const { setValue } = useFormContext();
    const jobPositionId = useWatch({name: 'jobPositionId'});
    const {data: JobPosition = {}} = useGetJobPositionByIdQuery({Id: jobPositionId}, {skip: !jobPositionId})
    const {data: selectedJobPosition = {}} = useGetJobPositionByIdQuery({
        Id: recruitment?.jobPosition?.id,
    }, { skip: !recruitment?.jobPosition?.id });

    useEffect(() => {
        if (!isEmpty(JobPosition)) {
            setValue('description', JobPosition?.description)
            setValue('requirement', JobPosition?.requirement)
            setValue('benefit', JobPosition?.benefit)
        }
    }, [JobPosition])

    useEffect(() => {
        if (!isEmpty(recruitment)) {
            setValue('jobPositionId', recruitment?.jobPosition?.id);
            setValue('description', recruitment?.description);
            setValue('requirement', recruitment?.requirement);
            setValue('benefit', recruitment?.benefit);
            setValue('tags', recruitment?.tags);
        }
    }, [recruitment])

    return (
        <BoxInnerStyle>
            <DividerCard title="MÔ TẢ CÔNG VIỆC"/>
            <Box sx={{px: 4, py: 3}}>
                <LabelStyle>Vị trí công việc có sẵn</LabelStyle>
                <RHFSelect
                    selectedOptions={selectedJobPosition}
                    remoteUrl={API_GET_PAGING_JOBTYPE}
                    name="jobPositionId"
                    placeholder="Chọn vị trí công việc có sẵn"
                    allowClear
                />
            </Box>
            <Box sx={{px: 4, py: 0}}>
                <LabelStyle required={true}>Mô tả công việc</LabelStyle>
                <RHFTinyEditor
                    name="description"
                    placeholder="Nhập mô tả công việc..."
                />
            </Box>
            <Box sx={{px: 4, py: 3}}>
                <LabelStyle required={true}>Yêu cầu công việc</LabelStyle>
                <RHFTinyEditor
                    name="requirement"
                    placeholder="Nhập yêu cầu công việc..."
                />
            </Box>
            <Box sx={{px: 4, py: 0}}>
                <LabelStyle required={true}>Quyền lợi</LabelStyle>
                <RHFTinyEditor
                    name="benefit"
                    placeholder="Nhập quyền lợi..."
                />
            </Box>
            <Box sx={{px: 4, py: 3, pt: 2}}>
                <RHFAutocomplete
                    options={[]}
                    name="tags"
                    title="Từ khóa"
                    placeholder="Nhập từ khóa và bấm enter để thêm"
                    fullWidth
                    multiple
                    AutocompleteProps={{freeSolo: true}}
                />
            </Box>
        </BoxInnerStyle>
    )
}

export default memo(Description);