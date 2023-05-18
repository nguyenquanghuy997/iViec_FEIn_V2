import useFetchDataCommon from "@/sections/recruitment-form/hooks/useFetchDataCommon";
import {
  getWorkingFormNames,
  renderSalary,
} from "@/sections/recruitment/helper";
import {
  JobAddressIcon,
  JobCategoryIcon,
  JobTypeWorkingForm,
  JobUserGroupIcon,
  SalaryIcon,
} from "@/sections/recruitment/others/Icon";
import { JobSummary } from "@/sections/recruitment/style";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";


const renderJobDescription = (title, content) => {

  return (
    <Box sx={{ mt: 0.5, mb: 4 }}>
      <Typography variant="body1" className="typoTitle" sx={{ mb: 1.5 }}>
        {title}
      </Typography>
      <div
        className="job-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </Box>
  );
};

const renderJobSummary = ({ icon, title, content, col = 4 }) => {
  return (
    <Grid2 direction="row" md={col}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 5 }}>
        <IconButton
          disableRipple
          size="medium"
          sx={{ backgroundColor: "#F2F4F5", mr: 1.5 }}
        >
          {icon}
        </IconButton>
        <Box>
          <Typography variant="body1" className="title-summary">
            {title}
          </Typography>
          <Typography variant="body1" className="detail-summary">
            {content}
          </Typography>
        </Box>
      </Box>
    </Grid2>
  );
};

const PreviewJobDescription = ({ Recruitment }) => {
  const { recruitmentJobCategories = [] } = Recruitment;
  const { recruitmentWorkingForms = [] } = Recruitment;
  const { ListJobCategory } = useFetchDataCommon();
  const getCategoryFormNames = () => {
    return recruitmentJobCategories
    .map((wf) => {
      var item = ListJobCategory.filter((p) => p.id == wf.jobCategoryId);
      return item[0]?.name;
    })
    .join(", ");
  };

  return (
    <Box className="job-description">
      <JobSummary className="job-summary">
        <Grid2 direction="row" container>
          {renderJobSummary({
            icon: <SalaryIcon />,
            title: "Mức lương",
            content: renderSalary(Recruitment, true),
          })}
          {renderJobSummary({
            icon: <JobCategoryIcon />,
            title: "Ngành nghề",
            content: getCategoryFormNames(),
          })}
          {renderJobSummary({
            icon: <JobTypeWorkingForm />,
            title: "Hình thức làm việc",
            content: getWorkingFormNames(recruitmentWorkingForms),
          })}
          {renderJobSummary({
            icon: <JobUserGroupIcon />,
            title: "Số lượng tuyển",
            content: Recruitment?.numberPosition || 1,
          })}
          {renderJobSummary({
            icon: <JobAddressIcon />,
            title: "Địa điểm làm việc",
            content: Recruitment?.address,
            col: 8,
          })}
        </Grid2>
      </JobSummary>
      <Divider fullWidth sx={{ mt: "10px", mb: "28px" }} />
      <Box>
        {renderJobDescription("Chi tiết công việc", Recruitment.description)}
        {renderJobDescription("Yêu cầu công việc", Recruitment.requirement)}
        {renderJobDescription("Quyền lợi", Recruitment.benefit)}
      </Box>
    </Box>
  );
};

export default PreviewJobDescription;
