import {Box, Stack, Typography} from "@mui/material";
import {makeStyles, styled} from "@mui/styles";
import {isEmpty} from "lodash";

import MuiButton from "@/components/BaseComponents/MuiButton";

import {STYLE_CONSTANT as style} from "@/theme/palette";

import {PipelineStateType} from "@/utils/formatString";
import {PIPELINE_TYPE} from "@/config";

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
        padding: theme.spacing(2, 2),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: `1px solid ${borderColor}`,
        borderRadius: 6,
        backgroundColor: '#FDFDFD'
    }
}));

const PipelineCard = ({index, item, onOpenFormExamination, examination}) => {
    const classes = useStyles();

    const {pipelineStateType} = item;

    const handleOpenFormExamination = (data) => {
        onOpenFormExamination({
            ...data,
            organizationPipelineStateId: data.id,
            expiredTime: examination?.expiredTime || '',
            examinationId: examination?.examinationId || '',
            examinationName: examination?.examinationName || '',
            index: index,
        });
    }

    return (
        <BoxItemStyle
            className="card-pipeline-item"
            borderColor={isEmpty(examination?.examinationId) && pipelineStateType === PIPELINE_TYPE.EXAMINATION ? '#E53935' : '#B9BFC9'}
        >
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                <Box>
                    {PipelineStateType(item?.pipelineStateType).icon}
                </Box>
                <Stack sx={{px: 2}}>
                    <Typography sx={{
                        color: style.COLOR_TEXT_PRIMARY,
                        fontSize: style.FONT_13,
                        fontWeight: style.FONT_SEMIBOLD
                    }}>{PipelineStateType(item?.pipelineStateType).title}</Typography>
                    <Typography
                        sx={{
                            color: '#1565C0',
                            fontSize: style.FONT_XS,
                            fontWeight: style.FONT_SEMIBOLD,
                            py: 0.5,
                        }}>{pipelineStateType === PIPELINE_TYPE.EXAMINATION ? !isEmpty(examination) ? examination?.examinationName : 'Chưa chọn đề thi' : ''}</Typography>
                    <Typography
                        className={classes.truncate}
                        sx={{
                            color: style.COLOR_TEXT_PRIMARY,
                            fontSize: style.FONT_XS,
                            fontWeight: style.FONT_NORMAL,
                            textAlign: 'justify',
                        }}>
                        {PipelineStateType(item?.pipelineStateType, item.description).subtitle}
                    </Typography>
                </Stack>
            </Box>
            {pipelineStateType === 1 && <MuiButton
                title="Chọn đề thi"
                onClick={() => handleOpenFormExamination(item)}
                sx={{
                    fontSize: style.FONT_SM,
                    fontWeight: style.FONT_SEMIBOLD,
                    minWidth: '120px'
                }}
            />}
        </BoxItemStyle>
    )
}

export default PipelineCard;