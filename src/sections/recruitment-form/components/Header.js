import NextLink from "next/link";
import {useWatch} from "react-hook-form";
import {Box, IconButton, Link, Stack} from "@mui/material";

import MuiButton from "@/components/BaseComponents/MuiButton";
import HeadingBar from "@/components/heading-bar/HeadingBar";
import Iconify from "@/components/Iconify";

import {DraftIcon, PreviewIcon} from "@/sections/recruitment-form/icon/HeaderIcon";

import {PATH_DASHBOARD} from "@/routes/paths";

import {STYLE_CONSTANT as style} from "@/theme/palette";
import {JobTitleStyle} from "@/sections/recruitment-form/style";

const Header = ({title, errors, onOpenConfirm}) => {
  const name = useWatch({ name: 'name' });
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
              <NextLink href={PATH_DASHBOARD.recruitment.root} passHref>
                <Link>
                  <IconButton
                      size='small'
                      sx={{color: style.COLOR_TEXT_BLACK, mr: 1}}>
                    <Iconify icon="material-symbols:arrow-back"/>
                  </IconButton>
                </Link>
              </NextLink>
              <JobTitleStyle className="job-title">
                {title}
              </JobTitleStyle>
            </Box>
          </Stack>
          <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flex: 1}}>
            <MuiButton
                title="Lưu nháp"
                color="default"
                disabled={!name}
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
                  sx={{
                    fontWeight: 500,
                    "&:hover": {
                      boxShadow: 'none'
                    },
                  }}
              />
            </Box>
            <MuiButton
                title="Gửi phê duyệt"
                color="default"
                onClick={() => onOpenConfirm({openSaveApprove: true})}
                disabled={!errors}
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