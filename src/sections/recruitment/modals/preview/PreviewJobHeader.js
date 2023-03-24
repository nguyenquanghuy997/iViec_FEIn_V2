import {JobDetailHeader, JobFunction, JobLogo, JobRemainTime, JobTitleBox} from "@/sections/recruitment/style";
import {Box, Grid, IconButton, Stack} from "@mui/material";
import MuiButton from "@/components/BaseComponents/MuiButton";
import {BookmarkIcon, ReportIcon, SearchPreviewIcon, ShareIcon} from "@/sections/recruitment/others/Icon";
import {pxToRem} from "@/utils/getFontValue";
import {renderRemainDay} from "@/sections/recruitment/helper";
import {DOMAIN_SERVER_API} from "@/config";

const PreviewJobHeader = ({ Recruitment, Organization }) => {
  return (
      <JobDetailHeader className="job-detail-header">
        <Grid container>
          <Grid item md={8} sm={6} xs={12} sx={{ display: 'flex', flexDirection: 'row' }}>
            <JobLogo className="job-logo">
              <img alt="Logo" src={`${DOMAIN_SERVER_API}/Image/GetImage?imagePath=${Organization?.organizationInformation?.avatar}`}/>
            </JobLogo>
            <JobTitleBox className="job-title-box">
              <Box sx={{mb: 0.5, display: 'inline-flex', alignItems: 'center'}}>
                <h2 className="job-title">{Recruitment?.name}</h2>
              </Box>
              <Box sx={{ mb: 2 }}>
                <p className="job-company">
                  {Organization?.name}
                </p>
              </Box>
              <Box className="extra-buttons" sx={{display: 'flex'}}>
                <p className="job-match">
                  Phù hợp với bạn
                </p>
                <MuiButton
                    title="So sánh"
                    startIcon={<SearchPreviewIcon/>}
                    color="error"
                    variant="outlined"
                    sx={{
                      color: '#F77A0C',
                      fontSize: pxToRem(12),
                      fontWeight: 600,
                      ml: 1,
                      px: '10px',
                      border: '1px solid #F77A0C',
                      height: '36px'
                    }}
                />
              </Box>
            </JobTitleBox>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <JobFunction className="job-function" sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px 0px 0px',
              flexDirection: 'row-reverse',
            }}>
              <Stack flexDirection="row" flex={1} ml={'22px'}>
                <MuiButton
                    title="Ứng tuyển"
                    color="warning"
                    sx={{
                      backgroundColor: "#F77A0C",
                      px: 2,
                      color: '#FFF',
                      width: '100%',
                      justifyContent: 'center',
                      fontWeight: 600,
                      "&:hover": {
                        backgroundColor: "#ac5508",
                        boxShadow: 'none',
                      }
                    }}
                />
              </Stack>
              <IconButton size="small" sx={{ borderRadius: '6px', padding: '10px', ml: '22px' }}><BookmarkIcon/></IconButton>
              <IconButton size="small" sx={{ borderRadius: '6px', padding: '10px', ml: '22px' }}><ShareIcon/></IconButton>
              <IconButton size="small" sx={{ borderRadius: '6px', padding: '10px', ml: '22px' }}><ReportIcon/></IconButton>
            </JobFunction>
            <JobRemainTime className="job-remainTime">
              {renderRemainDay(Recruitment?.endDate)}
            </JobRemainTime>
          </Grid>
        </Grid>
      </JobDetailHeader>
  )
}

export default PreviewJobHeader;