import {memo, useRef} from 'react';
import DividerCard from "@/sections/recruitment-create/component/DividerCard";
import {Box} from "@mui/material";
import {LabelStyle} from "@/components/hook-form/style";
import {RHFAutocomplete, RHFSelect} from "@/components/hook-form";
import {API_GET_PAGING_JOBTYPE} from "@/routes/api";
import {BoxInnerStyle} from "@/sections/recruitment-create/style";
import RHFRecruitmentEditor from "@/sections/recruitment-create/component/form/RHRRecruitmentEditor";

const Description = ({ selectedJobPosition }) => {

  const descriptionRef = useRef(null);

  const getValueEditor = () => {
    console.log(descriptionRef.current?.getContent());
  }

  return (
      <BoxInnerStyle>
        <button onClick={getValueEditor}>
          Click
        </button>
        <DividerCard title="MÔ TẢ CÔNG VIỆC"/>
        <Box sx={{px: 4, py: 3}}>
          <LabelStyle>Vị trí công việc có sẵn</LabelStyle>
          <RHFSelect
              selectedOptions={[selectedJobPosition]}
              remoteUrl={API_GET_PAGING_JOBTYPE}
              name="jobPositionId"
              placeholder="Chọn vị trí công việc có sẵn"
              allowClear
          />
        </Box>
        <Box sx={{px: 4, py: 0}}>
          <LabelStyle required={true}>Mô tả công việc</LabelStyle>
          <RHFRecruitmentEditor
              name="description"
              placeholder="Nhập mô tả công việc..."
              // ref={descriptionRef}
          />
        </Box>
        <Box sx={{px: 4, py: 3}}>
          <LabelStyle required={true}>Yêu cầu công việc</LabelStyle>
          {/*<RHFRecruitmentEditor*/}
          {/*    name="requirement"*/}
          {/*    placeholder="Nhập yêu cầu công việc..."*/}
          {/*/>*/}
        </Box>
        <Box sx={{px: 4, py: 0}}>
          <LabelStyle required={true}>Quyền lợi</LabelStyle>
          {/*<RHFRecruitmentEditor*/}
          {/*    name="benefit"*/}
          {/*    placeholder="Nhập quyền lợi..."*/}
          {/*/>*/}
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