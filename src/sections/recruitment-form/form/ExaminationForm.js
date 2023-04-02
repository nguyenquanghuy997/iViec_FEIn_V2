import {Box, InputAdornment, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

import MuiButton from "@/components/BaseComponents/MuiButton";
import FormModal from "@/components/BaseComponents/FormModal";
import {FormProvider, RHFSelect} from "@/components/hook-form";
import MuiInputNumber from "@/components/form/MuiInputNumber";

import {STYLE_CONSTANT as style} from "@/theme/palette";
import {LabelStyle} from "@/components/hook-form/style";

import {useGetExaminationByIdQuery} from "@/sections/exam/ExamSlice";

import {API_GET_EXAMINATION} from "@/routes/api";

const ExaminationForm = ({open, onClose, data, onSaveExamination, ...props}) => {

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

    const {handleSubmit, setValue, getValues, watch} = methods;
    const examination = watch('examinationId')

    const {data: selectedData = {}} = useGetExaminationByIdQuery({Id: examination}, {skip: !examination});

    return (
        <FormModal
            open={open}
            onClose={onClose}
            maxWidth={'600px'}
            {...props}
            header={<Typography sx={{color: '#172B4D', fontSize: 16, fontWeight: 600}}>Chọn đề thi</Typography>}
            actions={
                <>
                    <MuiButton
                        title={"Hủy"}
                        color={'basic'}
                        onClick={onClose}
                    />
                    <MuiButton
                        title={"Lưu"}
                        type={"submit"}
                        onClick={() => {
                            const dataSubmit = {
                                organizationPipelineStateId: data?.organizationPipelineStateId,
                                examinationId: getValues('examinationId'),
                                examinationName: selectedData?.name,
                                expiredTime: getValues('expiredTime'),
                            }
                            onSaveExamination(dataSubmit);
                            onClose();
                        }}
                    />
                </>
            }
        >
            <FormProvider methods={methods} onSubmit={handleSubmit(onSaveExamination)}>
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
            </FormProvider>
        </FormModal>
    )
}

export default ExaminationForm;