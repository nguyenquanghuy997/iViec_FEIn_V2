import {styled} from "@mui/styles";
import {STYLE_CONSTANT as style} from "@/theme/palette";
import {Box} from "@mui/material";
import {pxToRem} from "@/utils/getFontValue";

const JobDetailHeader = styled(Box)(({theme}) => ({
    "&.job-detail-header": {
        width: '100%',
        backgroundColor: style.BG_WHITE,
        borderRadius: theme.spacing(0.5),
        marginBottom: theme.spacing(2),
        padding: theme.spacing(3),
        border: '1px solid #CCD4DC',
    }
}));

const JobLogo = styled(Box)(({}) => ({
    "&.job-logo": {
        width: '48px',
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 24
    }
}));

const JobTitleBox = styled(Box)(({theme}) => ({
    "&.job-title-box": {
        "& .job-title": {
            flex: 1,
            fontSize: pxToRem(18),
            color: style.COLOR_TEXT_BLACK,
            marginBottom: 6,
            "&:hover": {
                color: "#F77A0C"
            }
        },
        "& .job-company": {
            fontSize: pxToRem(14),
            color: style.COLOR_TEXT_PRIMARY,
            fontWeight: style.FONT_MEDIUM,
        },
        "& .extra-buttons": {
            "& .job-match": {
                fontSize: pxToRem(12),
                fontWeight: style.FONT_SEMIBOLD,
                color: '#2E7D32',
                backgroundColor: "#E8F5E9",
                borderRadius: 6,
                display: 'inline-flex',
                alignItems: 'center',
                padding: '6px 10px',
                marginRight: theme.spacing(1)
            }
        }
    }
}));

const JobFunction = styled(Box)(({}) => ({
    "&.job-function": {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 0px 0px',
    }
}));

const JobRemainTime = styled(Box)(({}) => ({
    "&.job-remainTime": {
        fontSize: pxToRem(12),
        color: style.COLOR_TEXT_PRIMARY,
        fontWeight: style.FONT_NORMAL,
        lineHeight: '20px',
        textAlign: 'right',
        marginTop: 12,
        "& strong": {
            color: style.COLOR_TEXT_BLACK,
            fontWeight: style.FONT_MEDIUM,
        }
    }
}));

const JobDescriptionBox = styled(Box)(({theme}) => ({
    "&.job-description-box": {
        width: '100%',
        marginBottom: theme.spacing(2),
        backgroundColor: style.BG_WHITE,
        borderRadius: theme.spacing(0.5),
        padding: theme.spacing(3),
        border: '1px solid #CCD4DC',
        "& .job-description": {
            "& .typoTitle": {
                fontSize: style.FONT_BASE,
                fontWeight: style.FONT_SEMIBOLD,
                lineHeight: '26px',
                color: style.COLOR_TEXT_BLACK,
            },
            "& .job-content": {
                fontSize: pxToRem(14),
                color: style.COLOR_TEXT_PRIMARY,
                lineHeight: '24px',
                "& ul": {
                    paddingLeft: 25
                }
            }
        }
    }
}));

const JobSummary = styled(Box)(({}) => ({
    "&.job-summary": {
        '& .title-summary': {
            color: style.COLOR_TEXT_SECONDARY,
            fontWeight: style.FONT_MEDIUM,
            fontSize: style.FONT_13,
            lineHeight: '20px',
        },
        '& .detail-summary': {
            fontWeight: style.FONT_MEDIUM,
            fontSize: style.FONT_13,
            lineHeight: '20px',
            color: style.COLOR_TEXT_BLACK,
        }
    }
}));

// right content
const JobCompanyIntro = styled(Box)(({}) => ({
    "&.job-company-intro": {
        width: '100%',
        border: '1px solid #CCD4DC',
        backgroundColor: '#FFF',
        borderRadius: 0.5,
        overFlow: 'auto',
        "& .poster": {
            width: '100%',
            height: '126px',
            imageRendering: 'pixelated',
            objectFit: 'cover'
        }
    }
}));

const CompanyIntro = styled(Box)(({}) => ({
    "&.company-intro": {
        padding: 20,
        width: '100%',
        "& .company-name": {
            display: 'flex',
            alignItems: 'center',
            marginBottom: 4,
            width: '100%',
            "& .job-logo": {
                width: 48,
                height: 48,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 24,
            },
        },
        "& .typoTitle": {
            fontSize: pxToRem(16),
            fontWeight: style.FONT_SEMIBOLD,
            lineHeight: '24px',
            color: style.COLOR_TEXT_BLACK,
            marginBottom: 8
        },
        "& .typoContent": {
            fontSize: pxToRem(14),
            fontWeight: style.FONT_NORMAL,
            lineHeight: '24px',
            color: style.COLOR_TEXT_BLACK,
            whiteSpace: 'pre-line',
            "& p": {
                marginBottom: 8
            }
        }
    }
}));

export {
    JobDetailHeader,
    JobLogo,
    JobTitleBox,
    JobFunction,
    JobRemainTime,
    JobDescriptionBox,
    JobSummary,
    JobCompanyIntro,
    CompanyIntro,
}