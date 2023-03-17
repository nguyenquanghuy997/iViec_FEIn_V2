import {memo} from "react";
import NextLink from "next/link";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import HeadingBar from "@/components/heading-bar/HeadingBar";
import {PATH_DASHBOARD} from "@/routes/paths";
import Iconify from "@/components/Iconify";
import {ButtonDraftStyle, JobTitleStyle} from "@/sections/recruitment-create/style";
import {DraftIcon, PreviewIcon} from "@/sections/recruitment-create/component/icon/HeaderIcon";
import {BoxFlex} from "@/sections/emailform/style";
import {STYLE_CONSTANT as style} from "@/theme/palette";

const RecruitmentCreateHeader = ({setIsOpenSaveDraft, setIsOpenSubmitApprove, title, errors, ...props}) => {
    return (
        <HeadingBar style={{marginBottom: '28px', position: 'fixed', top: '64px'}} {...props}>
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
                <Box>
                    <ButtonDraftStyle
                        className="button-draft"
                        startIcon={<DraftIcon/>}
                        onClick={() => setIsOpenSaveDraft(true)}
                    >Lưu nháp</ButtonDraftStyle>
                    <ButtonDraftStyle
                        className="button-draft"
                        startIcon={<PreviewIcon/>}
                    >Xem trước</ButtonDraftStyle>
                    <ButtonDraftStyle
                        className="button-draft"
                        startIcon={<Iconify icon="majesticons:send"/>}
                        onClick={() => setIsOpenSubmitApprove(true)}
                        disabled={errors}
                    >Gửi phê duyệt</ButtonDraftStyle>
                </Box>
            </BoxFlex>
        </HeadingBar>
    )
}
export default memo(RecruitmentCreateHeader);