import {Box, Stack, Typography} from "@mui/material";
import {makeStyles, styled} from "@mui/styles";
import {isEmpty} from "lodash";

import MuiButton from "@/components/BaseComponents/MuiButton";

import {STYLE_CONSTANT as style} from "@/theme/palette";

import {PipelineStateType} from "@/utils/formatString";

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

const PipelineCard = ({item, onOpenFormExamination, examination}) => {
    const classes = useStyles();

    const {pipelineStateType} = item;

    const handleOpenFormExamination = (data) => {
        onOpenFormExamination({
            ...data,
            organizationPipelineStateId: data.id,
            expiredTime: examination?.expiredTime || '',
            examinationId: examination?.examinationId || '',
            examinationName: examination?.examinationName || '',
        });
    }

    return (
        <BoxItemStyle
            className="card-pipeline-item"
            borderColor={isEmpty(examination) && pipelineStateType === 1 ? 'red' : '#B9BFC9'}
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
                        }}>{pipelineStateType === 1 ? !isEmpty(examination) ? examination?.examinationName : 'Chưa chọn đề thi' : ''}</Typography>
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