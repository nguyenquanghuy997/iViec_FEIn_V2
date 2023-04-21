import {Box, Dialog, DialogActions, DialogContent, InputAdornment, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

import MuiButton from "@/components/BaseComponents/MuiButton";
import {FormProvider, RHFSelect} from "@/components/hook-form";
import MuiInputNumber from "@/components/form/MuiInputNumber";

import {STYLE_CONSTANT as style} from "@/theme/palette";
import {LabelStyle} from "@/components/hook-form/style";

import {useGetExaminationByIdQuery} from "@/sections/exam/ExamSlice";

import {API_GET_EXAMINATION} from "@/routes/api";
import {MuiDialogTitle} from "@/components/BaseComponents/ConfirmModal";

const ExaminationForm = ({open, onClose, data, onSaveExamination}) => {

    const defaultValues = {
        examinationId: data?.examinationId || '',
        expiredTime: data?.expiredTime || '',
    }

    const FormValidate = Yup.object().shape({
        examinationId: Yup.string().required("Bài thi không được bỏ trống"),
        expiredTime: Yup.number().transform(value => (isNaN(value) ? undefined : value)).required("Thời gian kết thúc không được bỏ trống"),
    })

    const methods = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(FormValidate),
        defaultValues,
    });

    const {setValue, getValues, watch, formState: {isValid}} = methods;
    const examination = watch('examinationId')

    const {data: selectedData = {}} = useGetExaminationByIdQuery({Id: examination}, {skip: !examination});

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            padding: '0 16px',
                            borderRadius: '6px',
                            width: "100%",
                            maxWidth: '600px',
                            boxShadow: ' 0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)',
                        },
                    },
                }}
            >
                <FormProvider methods={methods}>
                    <MuiDialogTitle onClose={onClose}>
                        <Typography sx={{color: '#172B4D', fontSize: 16, fontWeight: 600}}>Chọn đề thi</Typography>
                    </MuiDialogTitle>
                    <DialogContent
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        padding: '0 16px',
                        marginTop: '24px'
                    }}>
                        <Box sx={{width: '100%'}}>
                            <LabelStyle required>Đề thi</LabelStyle>
                            <RHFSelect
                                name="examinationId"
                                fullWidth
                                remoteUrl={API_GET_EXAMINATION}
                                selectedOptions={selectedData}
                                placeholder={"Chọn đề thi"}
                                onChange={(e) => {
                                    setValue('examinationId', e);
                                }}
                            />
                        </Box>
                        <Box sx={{width: '100%', mt: 2}}>
                            <MuiInputNumber
                                name="expiredTime"
                                title="Số ngày tồn tại đề thi"
                                isRequired
                                otherTitle={
                                    <Typography sx={{
                                        fontSize: style.FONT_13,
                                        fontWeight: style.FONT_NORMAL,
                                        color: style.COLOR_TEXT_PRIMARY,
                                        fontStyle: 'italic',
                                        mb: 1
                                    }}>
                                        Tính từ thời điểm Ứng viên chuyển sang bước thi tuyển
                                    </Typography>
                                }
                                placeholder="Nhập số ngày"
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <Typography
                                                sx={{
                                                    fontSize: style.FONT_SM,
                                                    fontWeight: style.FONT_NORMAL,
                                                    color: style.COLOR_TEXT_SECONDARY,
                                                    mx: 0.5
                                                }}>
                                                Ngày
                                            </Typography>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions
                    sx={{
                        borderTop: '1px solid #E7E9ED',
                        marginTop: '8px',
                        padding: '0 16px',
                    }}>
                        <>
                            <MuiButton
                                title={"Hủy"}
                                color={'basic'}
                                onClick={onClose}
                            />
                            <MuiButton
                                title={"Lưu"}
                                type={"button"}
                                disabled={!isValid}
                                onClick={() => {
                                    const dataSubmit = {
                                        index: data?.index,
                                        organizationPipelineStateId: data?.organizationPipelineStateId,
                                        examinationId: getValues('examinationId'),
                                        examinationName: selectedData?.name,
                                        expiredTime: getValues('expiredTime'),
                                        pipelineStateType: 1,
                                    }
                                    onSaveExamination(dataSubmit);
                                    onClose();
                                }}
                            />
                        </>
                    </DialogActions>
                </FormProvider>
            </Dialog>
        </>
    )
}

export default ExaminationForm;