import {memo} from "react";
import NextLink from "next/link";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import HeadingBar from "@/components/heading-bar/HeadingBar";
import {PATH_DASHBOARD} from "@/routes/paths";
import Iconify from "@/components/Iconify";
import {JobTitleStyle} from "@/sections/recruitment-create/style";
import {DraftIcon, PreviewIcon} from "@/sections/recruitment-create/component/icon/HeaderIcon";
import {BoxFlex} from "@/sections/emailform/style";
import {STYLE_CONSTANT as style} from "@/theme/palette";
import MuiButton from "@/components/BaseComponents/MuiButton";

const RecruitmentCreateHeader = ({setIsOpenSaveDraft, setIsOpenSubmitApprove, title, errors, watchName, onOpenPreview}) => {
    // processStatus
    return (
        <HeadingBar style={{marginBottom: '28px', position: 'fixed', top: '64px'}}>
            <BoxFlex>
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
                <BoxFlex>
                    <MuiButton
                        title="Lưu nháp"
                        color="default"
                        onClick={() => setIsOpenSaveDraft(true)}
                        disabled={!watchName}
                        startIcon={<DraftIcon/>}
                        sx={{
                            fontWeight: 500,
                            "&.Mui-disabled": {
                                color: "#8a94a5",
                                backgroundColor: "#d0d4db",
                            }
                        }}
                    />
                    <MuiButton
                        title="Xem trước"
                        color="default"
                        onClick={onOpenPreview}
                        startIcon={<PreviewIcon />}
                        sx={{
                            fontWeight: 500,
                            ml: 1.5
                        }}
                    />
                  <MuiButton
                      title="Gửi phê duyệt"
                      color="default"
                      onClick={() => setIsOpenSubmitApprove(true)}
                      disabled={!errors}
                      startIcon={<Iconify icon="majesticons:send"/>}
                      sx={{
                        fontWeight: 500,
                        ml: 1.5,
                        "&.Mui-disabled": {
                          color: "#8a94a5",
                          backgroundColor: "#d0d4db",
                        }
                      }}
                  />
                </BoxFlex>
            </BoxFlex>
        </HeadingBar>
    )
}
export default memo(RecruitmentCreateHeader);