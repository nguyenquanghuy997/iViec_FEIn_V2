import {useWatch} from "react-hook-form";
import {Box, IconButton, Stack} from "@mui/material";

import MuiButton from "@/components/BaseComponents/MuiButton";
import HeadingBar from "@/components/heading-bar/HeadingBar";
import Iconify from "@/components/Iconify";

import {DraftIcon, PreviewIcon} from "@/sections/recruitment-form/icon/HeaderIcon";

import {STYLE_CONSTANT as style} from "@/theme/palette";
import {JobTitleStyle} from "@/sections/recruitment-form/style";
import {useRouter} from "next/router";
import {PATH_DASHBOARD} from "@/routes/paths";
import {RECRUITMENT_STATUS} from '@/config'

const Header = ({recruitment, title, errors, onOpenConfirm, setShowAlert}) => {
  const name = useWatch({name: 'name'});
  const router= useRouter();

  const handleSetShowAlert = (data) => {
    if (data?.processStatus === RECRUITMENT_STATUS.EXPIRED || data?.processStatus === RECRUITMENT_STATUS.CLOSED) {
      return router.push(PATH_DASHBOARD.recruitment.root);
    } else {
      setShowAlert(true)
    }
  }

  const isDisabled = recruitment?.processStatus === RECRUITMENT_STATUS.EXPIRED || recruitment?.processStatus === RECRUITMENT_STATUS.CLOSED;

  return (
      <HeadingBar style={{
        position: 'fixed',
        top: '64px',
        zIndex: 1001,
        boxShadow: 'none',
        borderBottom: '1px solid #E7E9ED',
      }}>
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <Stack flexDirection="row" alignItems="center">
            <Box sx={{display: 'flex', alignItems: 'center'}}>
              <IconButton
                  size='small'
                  sx={{color: style.COLOR_TEXT_BLACK, mr: 1}}
                  onClick={() => handleSetShowAlert(recruitment)}
              >
                <Iconify icon="material-symbols:arrow-back"/>
              </IconButton>
              <JobTitleStyle className="job-title">
                {title}
              </JobTitleStyle>
            </Box>
          </Stack>
          <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flex: 1}}>
            <MuiButton
                title="Lưu nháp"
                color="default"
                disabled={!name || isDisabled}
                onClick={() => onOpenConfirm({openSaveDraft: true})}
                startIcon={<DraftIcon/>}
                sx={{
                  fontWeight: 500,
                  "&:hover": {
                    boxShadow: 'none'
                  },
                  "&.Mui-disabled": {
                    color: "#8a94a5",
                    backgroundColor: "#d0d4db",
                  }
                }}
            />
            <Box sx={{mx: 1.5}}>
              <MuiButton
                  title="Xem trước"
                  color="default"
                  onClick={() => onOpenConfirm({openPreview: true})}
                  startIcon={<PreviewIcon/>}
                  disabled={!name || isDisabled}
                  sx={{
                    fontWeight: 500,
                    "&:hover": {
                      boxShadow: 'none'
                    },
                    "&.Mui-disabled": {
                      color: "#8a94a5",
                      backgroundColor: "#d0d4db",
                    }
                  }}
              />
            </Box>
            <MuiButton
                title="Gửi phê duyệt"
                color="default"
                type={!errors?"submit":"button"}
                onClick={()=>onOpenConfirm({openSaveApprove:errors? true: false})}
                disabled={isDisabled}
                startIcon={<Iconify icon="majesticons:send"/>}
                sx={{
                  fontWeight: 500,
                  "&:hover": {
                    boxShadow: 'none'
                  },
                  "&.Mui-disabled": {
                    color: "#8a94a5",
                    backgroundColor: "#d0d4db",
                  }
                }}
            />
          </Box>
        </Box>
      </HeadingBar>
  )
}
export default Header;