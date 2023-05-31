import MuiButton from "@/components/BaseComponents/MuiButton";
import { PIPELINE_TYPE } from "@/config";
import { STYLE_CONSTANT as style } from "@/theme/palette";
import { PipelineStateType } from "@/utils/formatString";
import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { makeStyles, styled } from "@mui/styles";
import { isEmpty } from "lodash";

const useStyles = makeStyles(() => ({
  truncate: {
    color: style.COLOR_TEXT_PRIMARY,
    fontSize: style.FONT_XS,
    fontWeight: style.FONT_NORMAL,
    textAlign: "justify",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    overflow: "hidden",
    WebkitBoxOrient: "vertical",
  },
}));

const BoxItemStyle = styled(Box)(
  ({ theme, borderColor = theme.palette.common.neutral700 }) => ({
    "&.card-pipeline-item": {
      marginBottom: theme.spacing(2),
      padding: theme.spacing(2, 2),
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      border: `1px solid ${borderColor}`,
      borderRadius: 6,
      backgroundColor: theme.palette.common.white,
    },
  })
);
const PipelineCard = ({
  index,
  item,
  isDefault,
  onOpenFormExamination,
  examination,
}) => {
  const { pipelineStateType } = item;
  const isExam = pipelineStateType === PIPELINE_TYPE.EXAMINATION;
  const isExamEmpty = isExam && isEmpty(examination?.examinationId);

  const theme = useTheme();
  const classes = useStyles();

  const handleOpenFormExamination = (data) => {
    onOpenFormExamination({
      ...data,
      organizationPipelineStateId: data.id,
      expiredTime: examination?.expiredTime || "",
      examinationId: examination?.examinationId || "",
      examinationName: examination?.examinationName || "",
      index: index,
    });
  };

  return (
    <BoxItemStyle
      className="card-pipeline-item"
      borderColor={
        isExamEmpty
          ? theme.palette.common.red600
          : theme.palette.common.neutral300
      }
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Box>{PipelineStateType(item?.pipelineStateType).icon}</Box>
        <Stack sx={{ px: 2 }}>
          <Typography
            sx={{
              color: style.COLOR_TEXT_PRIMARY,
              fontSize: style.FONT_13,
              fontWeight: style.FONT_SEMI_BOLD,
            }}
          >
            {PipelineStateType(item?.pipelineStateType).title}
          </Typography>

          {isExam && (
            <Typography
              sx={{
                color: isExamEmpty
                  ? theme.palette.common.red600
                  : theme.palette.common.blue800,
                fontSize: style.FONT_XS,
                fontWeight: style.FONT_SEMI_BOLD,
                marginTop: "2px",
              }}
            >
              {isExamEmpty ? "Chưa chọn đề thi" : examination?.examinationName}
            </Typography>
          )}

          <Typography
            className={classes.truncate}
            sx={{
              color: style.COLOR_TEXT_PRIMARY,
              fontSize: style.FONT_XS,
              fontWeight: style.FONT_NORMAL,
              textAlign: "justify",
              marginTop: "2px",
            }}
          >
            {
              PipelineStateType(
                item?.pipelineStateType,
                item.description,
                isDefault
              ).subtitle
            }
          </Typography>
        </Stack>
      </Box>

      {isExam && (
        <MuiButton
          title={isExamEmpty ? "Chọn đề thi" : "Chỉnh sửa đề thi"}
          onClick={() => handleOpenFormExamination(item)}
          sx={{
            fontSize: style.FONT_SM,
            fontWeight: style.FONT_SEMI_BOLD,
            minWidth: "120px",
          }}
        />
      )}
    </BoxItemStyle>
  );
};

export default PipelineCard;
