import {memo, useEffect} from 'react';

import {Box} from "@mui/material";
import {isEmpty} from "lodash";
import {useFormContext, useWatch} from "react-hook-form";

import {RHFSelect} from "@/components/hook-form";
import RHFMuiAutocomplete from "@/components/hook-form/RHFMuiAutocomplete";
import RHFTinyEditor from "@/components/editor/RHFTinyEditor";
import DividerCard from "@/sections/recruitment-form/components/DividerCard";

import {API_GET_PAGING_JOBTYPE} from "@/routes/api";
import {useGetJobPositionByIdQuery} from "@/sections/jobtype";

import {BoxInnerStyle} from "@/sections/recruitment-form/style";
import {LabelStyle} from "@/components/hook-form/style";


const Description = () => {

    const { setValue } = useFormContext();
    const jobPositionId = useWatch({name: 'jobPositionId'});
    const {data: JobPosition = {}} = useGetJobPositionByIdQuery({Id: jobPositionId}, {skip: !jobPositionId})
    const {data: selectedJobPosition = {}} = useGetJobPositionByIdQuery({
        Id: jobPositionId,
    }, { skip: !jobPositionId });

    useEffect(() => {
        if (!isEmpty(JobPosition)) {
            setValue('description', JobPosition?.description)
            setValue('requirement', JobPosition?.requirement)
            setValue('benefit', JobPosition?.benefit)
        }
    }, [JobPosition])

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
                <RHFMuiAutocomplete
                    options={[]}
                    name="tags"
                    title="Từ khóa"
                    placeholder="Nhập từ khóa và bấm enter để thêm"
                    fullWidth
                    multiple
                    freeSolo
                    limitTags={6}
                />
            </Box>
        </BoxInnerStyle>
    )
}

export default memo(Description);