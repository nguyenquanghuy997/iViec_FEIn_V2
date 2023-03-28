import {Box, Stack, Typography} from "@mui/material";
import {makeStyles, styled} from "@mui/styles";
import {STYLE_CONSTANT as style} from "@/theme/palette";
import MuiButton from "@/components/BaseComponents/MuiButton";

const useStyles = makeStyles(() => ({
  truncate: {
    color: style.COLOR_TEXT_PRIMARY,
    fontSize: style.FONT_XS,
    fontWeight: style.FONT_NORMAL,
    textAlign: 'justify',
    display: "-webkit-box",
    WebkitLineClamp: 2,
    overflow: "hidden",
    WebkitBoxOrient: "vertical"
  }
}))

const BoxItemStyle = styled(Box)(({theme, borderColor = '#B9BFC9'}) => ({
  '&.card-pipeline-item': {
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2),
    padding: theme.spacing(2, 2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: `1px solid ${borderColor}`,
    borderRadius: 6,
    backgroundColor: '#FDFDFD'
  }
}));

const RecruitmentPipelineCard = ({title, subtitle, moreTitle, icon, pipelineStateType, onOpen}) => {
  const classes = useStyles();
  return (
      <BoxItemStyle className="card-pipeline-item">
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
          <Box>
            {icon}
          </Box>
          <Stack sx={{px: 2}}>
            <Typography sx={{
              color: style.COLOR_TEXT_PRIMARY,
              fontSize: style.FONT_13,
              fontWeight: style.FONT_SEMIBOLD
            }}>{title}</Typography>
            <Typography
                sx={{
                  color: '#1565C0',
                  fontSize: style.FONT_XS,
                  fontWeight: style.FONT_SEMIBOLD,
                  py: 0.5,
                }}>{moreTitle}</Typography>
            <Typography
                className={classes.truncate}
                sx={{
                  color: style.COLOR_TEXT_PRIMARY,
                  fontSize: style.FONT_XS,
                  fontWeight: style.FONT_NORMAL,
                  textAlign: 'justify',
                }}>
              {subtitle}
            </Typography>
          </Stack>
        </Box>
        {pipelineStateType === 1 && <MuiButton
            title="Chọn đề thi"
            onClick={() => onOpen(true)}
            sx={{
              fontSize: style.FONT_SM,
              fontWeight: style.FONT_SEMIBOLD,
              minWidth: '120px'
            }}
        />}
      </BoxItemStyle>
  )
}

export default RecruitmentPipelineCard;