import {IconButton, Stack} from "@mui/material";
import MuiButton from "@/components/BaseComponents/MuiButton";
import {BookmarkIcon, ReportIcon, ShareIcon} from "@/sections/recruitment/others/Icon";
import {JobFunction} from "@/sections/recruitment/style";

const PreviewJobFunction = () => {
  return (
      <JobFunction className="job-function">
        <Stack flexDirection="row" flex={1}>
          <MuiButton
              title="Ứng tuyển"
              color="warning"
              sx={{backgroundColor: "#F77A0C", px: 2, color: '#FFF', width: '100%', justifyContent: 'center', fontWeight: 600, "&:hover": {backgroundColor: "#ac5508"}}}
          />
        </Stack>
        <IconButton size="small" sx={{ borderRadius: '6px', padding: '10px', ml: '22px' }}><BookmarkIcon/></IconButton>
        <IconButton size="small" sx={{ borderRadius: '6px', padding: '10px', ml: '22px' }}><ShareIcon/></IconButton>
        <IconButton size="small" sx={{ borderRadius: '6px', padding: '10px', ml: '22px' }}><ReportIcon/></IconButton>
      </JobFunction>
  )
}

export default PreviewJobFunction;