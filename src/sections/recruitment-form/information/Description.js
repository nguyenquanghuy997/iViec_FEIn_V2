import RHFTinyEditor from "@/components/editor/RHFTinyEditor";
import { RHFSelect } from "@/components/hook-form";
import RHFMuiAutocomplete from "@/components/hook-form/RHFMuiAutocomplete";
import { LabelStyle } from "@/components/hook-form/style";
import {
  useGetAllJobTypeQuery,
  useGetJobPositionByIdQuery,
} from "@/sections/jobtype";
import DividerCard from "@/sections/recruitment-form/components/DividerCard";
import { BoxInnerStyle } from "@/sections/recruitment-form/style";
import { Box } from "@mui/material";
import { isEmpty } from "lodash";
import { memo, useEffect, useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";

const Description = ({ recruitment: Recruitment }) => {
  const isInit = useRef(true);
  const { setValue } = useFormContext();
  const jobPositionId = useWatch({ name: "jobPositionId" });
  const { data: JobPosition = {} } = useGetJobPositionByIdQuery(
    { Id: jobPositionId },
    { skip: !jobPositionId }
  );
  const { data: { items: ListJobPosition = [] } = {} } = useGetAllJobTypeQuery({
    IsActive: "true",
  });
  useEffect(() => {
    if (!isEmpty(JobPosition)) {
      if (isInit.current) {
        if (!isEmpty(Recruitment)) {
          setValue("description", Recruitment?.description);
          setValue("requirement", Recruitment?.requirement);
          setValue("benefit", Recruitment?.benefit);
        } else {
          setValue("description", JobPosition?.description);
          setValue("requirement", JobPosition?.requirement);
          setValue("benefit", JobPosition?.benefit);
        }
        isInit.current = false;
      } else {
        setValue("description", JobPosition?.description);
        setValue("requirement", JobPosition?.requirement);
        setValue("benefit", JobPosition?.benefit);
      }
    }
  }, [JobPosition]);

  return (
    <BoxInnerStyle>
      <DividerCard title="MÔ TẢ CÔNG VIỆC" />
      <Box sx={{ px: 4, py: 3 }}>
        <LabelStyle>Vị trí công việc có sẵn</LabelStyle>
        <RHFSelect
          options={ListJobPosition?.map((item) => ({
            value: item?.id,
            label: item?.name,
          }))}
          name="jobPositionId"
          placeholder="Chọn vị trí công việc có sẵn"
          allowClear
        />
      </Box>
      <Box sx={{ px: 4, py: 0 }}>
        <LabelStyle required={true}>Mô tả công việc</LabelStyle>
        <RHFTinyEditor
          name="description"
          placeholder="Nhập mô tả công việc..."
        />
      </Box>
      <Box sx={{ px: 4, py: 3 }}>
        <LabelStyle required={true}>Yêu cầu công việc</LabelStyle>
        <RHFTinyEditor
          name="requirement"
          placeholder="Nhập yêu cầu công việc..."
        />
      </Box>
      <Box sx={{ px: 4, py: 0 }}>
        <LabelStyle required={true}>Quyền lợi</LabelStyle>
        <RHFTinyEditor name="benefit" placeholder="Nhập quyền lợi..." />
      </Box>
      <Box sx={{ px: 4, py: 3, pt: 2 }}>
        <RHFMuiAutocomplete
          options={[]}
          name="tags"
          title="Từ khóa"
          placeholder="Nhập từ khóa và bấm enter để thêm"
          fullWidth
          multiple
          freeSolo
          limitTags={6}
          clearIcon={null}
        />
      </Box>
    </BoxInnerStyle>
  );
};

export default memo(Description);
