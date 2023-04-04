import {CompanyIntro, JobCompanyIntro} from "@/sections/recruitment/style";
import {Box, Typography} from "@mui/material";
import {DOMAIN_SERVER_API} from "@/config";
import {OrganizationSize} from "@/utils/enum";
import PreviewJobMap from "@/sections/recruitment/modals/preview/PreviewJobMap";

const PreviewJobCompanyIntro = ({Organization}) => {
  return (
      <JobCompanyIntro className="job-company-intro">
        <img className="poster" alt="Banner" src={`${DOMAIN_SERVER_API}/Image/GetImage?imagePath=${Organization?.organizationInformation?.coverPhoto}`}/>
        <CompanyIntro className="company-intro">
          <Box className="company-name">
            <Box className="job-logo">
              <img src={`${DOMAIN_SERVER_API}/Image/GetImage?imagePath=${Organization?.organizationInformation?.avatar}`} alt="Logo"/>
            </Box>
            <Typography variant="body1">{Organization?.name}</Typography>
          </Box>
          <Box sx={{mb: 1, mt: 2}}>
            <Typography variant="body1" className="typoTitle">Giới thiệu</Typography>
            <div className="typoContent" dangerouslySetInnerHTML={{__html: Organization?.organizationInformation?.description}}></div>
          </Box>
          <Box sx={{mb: 1, mt: 2}}>
            <Typography variant="body1" className="typoTitle">Quy mô</Typography>
            <Typography variant="body1" className="typoContent">{OrganizationSize(Organization?.organizationInformation?.organizationSize)}</Typography>
          </Box>
          <Box sx={{mb: 1, mt: 2}}>
            <Typography variant="body1" className="typoTitle">Địa chỉ công ty</Typography>
            <Typography variant="body1" className="typoContent"></Typography>
          </Box>
          <PreviewJobMap/>
        </CompanyIntro>
      </JobCompanyIntro>
  )
}

export default PreviewJobCompanyIntro;