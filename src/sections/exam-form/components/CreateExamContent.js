import MuiButton from "@/components/BaseComponents/MuiButton"
import { Text } from "@/components/FlexStyled"
import Iconify from "@/components/Iconify"
import SvgIcon from "@/components/SvgIcon"
import { SubTitleStyle } from "@/sections/emailform/style"
import { ButtonIcon } from "@/utils/cssStyles"
import { Box, Divider, Typography } from "@mui/material"
import { useState } from "react"
import { useRouter } from "next/router"
import ExamFormModal from "@/sections/exam/components/ExamFormModal"
import ExamChooseTypeModal from "@/sections/exam/components/ExamChooseTypeModal"
import ListQuestionDefault from "./ListQuestionDefault"
import { View } from "@/components/DesignSystem/FlexStyled"
import CreateExamHeader from "./CreateExamHeader"
import { useCreateExamMutation } from "@/sections/exam/ExamSlice"
import { useSnackbar } from "notistack"
import React from "react"

const CreateExamContent = () => {
  const router = useRouter();
  const [createExam] = useCreateExamMutation();
  const { enqueueSnackbar } = useSnackbar();
  const { query = { name: "", description: "", examTime: 0, isQuestionMixing: true, showType: 0, type: 0 } } = router;
  const queryDataDefault = {
    ...query,
    isQuestionMixing: query.isQuestionMixing == 'true',
  }
  const [examData, setExamData] = useState(queryDataDefault);
  const [examQuestions, setExamQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false)
  const [showChooseType, setShowChooseType] = useState(false)

  const handleSubmitForm = (data) => {
    setExamData(data);
    setShowForm(false);
    setShowChooseType(true);
  }

  const handleExamSetting = (data) => {
    setShowChooseType(false);
    setExamData(data);
  }

  const renderExamSettingInfo = (icon, title) => {
    return (
      <>
        <SvgIcon>{icon}</SvgIcon>
        <Text ml={8} mr={24} fontSize={14} fontWeight={"400"} color={"#5C6A82"}>
          {title}
        </Text>
      </>
    );
  };

  const handleUpdateListQuestion = (data) => {
    setExamQuestions([...data])
  }

  const handleSaveDraft = async () => {
    const body = {
      ...examData,
      totalQuestion: examQuestions.length,
      standardPoint: 1,
      maximumPoint: examQuestions.reduce(function (a, b) {
        return a + b.questionPoint;
      }, 0),
      examinationQuestions: examQuestions.map(x => { return { ...x, questionId: x.id } })
    }
    try {
      await createExam(body).unwrap();
      enqueueSnackbar("Lưu đề thi thành công")
      router.push("/settings/exam/exambusiness")
    } catch {
      enqueueSnackbar("Lưu đề thi thất bại", {
        variant: 'error'
      })
    }
  }

  const handleSave = async () => {
    const body = {
      ...examData,
      totalQuestion: examQuestions.length,
      standardPoint: 1,
      maximumPoint: examQuestions.reduce(function (a, b) {
        return a + b.questionPoint;
      }, 0),
      examinationQuestions: examQuestions.map(x => { return { ...x, questionId: x.id } })
    }
    try {
      await createExam(body).unwrap();
      enqueueSnackbar("Lưu đề thi thành công")
      router.push("/settings/exam/exambusiness")
    } catch {
      enqueueSnackbar("Lưu đề thi thất bại", {
        variant: 'error'
      })
    }
  }

  const handleCancel = async () => {
    router.push("/settings/exam/exambusiness")
  }

  return <>
    <CreateExamHeader
      handleSaveDraft={handleSaveDraft}
      handleCancel={handleCancel}
      handleSave={handleSave} />

    <View>
      {/* title */}
      <View p={24} flexrow={'true'} atcenter={'true'} jcbetween={'true'}>
        <View>
          <Typography variant="h6" sx={{
            fontSize: '1.5rem',
            fontWeight: 600,
            color: '#172B4D',
          }}>
            {examData.name}
          </Typography>

          <SubTitleStyle sx={{
            fontSize: '14px',
            fontWeight: 400,
            marginTop: '8px'
          }}>
            {examData.description}
          </SubTitleStyle>
        </View>

        <View flexrow={'true'} atcenter={'true'}>
          <ButtonIcon
            sx={{
              marginLeft: "16px",
              backgroundColor: 'transparent',
              "&:hover": {
                backgroundColor: "unset",
              },
            }}
            // onClick={() => handleShowConfirmMultiple("delete")}
            icon={
              <Iconify
                icon={"ri:edit-2-fill"}
                width={20}
                height={20}
                color="#5C6A82"
              />
            }
          />

          <View allcenter={'true'} style={{
            margin: '0 24px 0 8px',
            padding: '6px 8px',
            border: '1px solid #455570',
            borderRadius: '4px'
          }}>
            <Typography sx={{
              fontSize: '13px',
              lineHeight: '20px',
              color: '#455570',
              fontWeight: 500,
            }}>Điểm sàn
            </Typography>
            <span style={{ fontSize: '16px', fontWeight: 600, lineHeight: '24px', marginTop: 4 }}>-</span>
          </View>

          <View allcenter={'true'} style={{
            padding: '6px 8px',
            border: '1px solid #455570',
            borderRadius: '4px'
          }}>
            <Typography sx={{
              fontSize: '13px',
              lineHeight: '20px',
              color: '#455570',
              fontWeight: 500,
            }}>Điểm tối đa
            </Typography>
            <span style={{ fontSize: '16px', fontWeight: 600, lineHeight: '24px', marginTop: 4 }}>
              {
                examQuestions.reduce((accumulator, object) => {
                  return accumulator + object.questionPoint;
                }, 0)
              }
            </span>
          </View>

        </View>
      </View>

      {/* setting info exam  */}
      <View ph={24}>
        <Box>
          <MuiButton
            title={'Thiết lập đề thi'}
            startIcon={<Iconify icon="material-symbols:settings" sx={{ width: 16, height: 16 }} />}
            variant={'outlined'}
            onClick={() => setShowForm('true')}
            sx={{
              border: '1px solid #455570',
              padding: '8px 12px',
              fontWeight: 600,
              fontSize: '14px',
              color: '#455570'
            }}
          />
        </Box>

        <View flexrow={'true'} mt={24}>
          {renderExamSettingInfo(`<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path d="M6.99992 13.6663C3.31792 13.6663 0.333252 10.6817 0.333252 6.99967C0.333252 3.31767 3.31792 0.333008 6.99992 0.333008C10.6819 0.333008 13.6666 3.31767 13.6666 6.99967C13.6666 10.6817 10.6819 13.6663 6.99992 13.6663ZM6.99992 12.333C8.41441 12.333 9.77096 11.7711 10.7712 10.7709C11.7713 9.77072 12.3333 8.41416 12.3333 6.99967C12.3333 5.58519 11.7713 4.22863 10.7712 3.22844C9.77096 2.22824 8.41441 1.66634 6.99992 1.66634C5.58543 1.66634 4.22888 2.22824 3.22868 3.22844C2.22849 4.22863 1.66659 5.58519 1.66659 6.99967C1.66659 8.41416 2.22849 9.77072 3.22868 10.7709C4.22888 11.7711 5.58543 12.333 6.99992 12.333ZM7.66659 6.99967H10.3333V8.33301H6.33325V3.66634H7.66659V6.99967Z" fill="#455570"/>
																	</svg>`, `${examData.examTime} phút`)}
          {renderExamSettingInfo(`<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path d="M10.9999 10.9217V9.66634L14.3333 11.6663L10.9999 13.6663V12.273C9.98088 12.1271 9.01652 11.7214 8.19959 11.095C7.38266 10.4686 6.74063 9.6426 6.33525 8.69634L6.33325 8.69301L6.33125 8.69701C5.86864 9.77617 5.09956 10.6959 4.11931 11.3422C3.13906 11.9885 1.99073 12.333 0.816585 12.333H0.333252V10.9997H0.816585C1.72991 10.9996 2.62314 10.7316 3.3856 10.2288C4.14805 9.726 4.7462 9.01051 5.10592 8.17101L5.60792 6.99967L5.10592 5.82834C4.7462 4.98884 4.14805 4.27335 3.3856 3.77054C2.62314 3.26773 1.72991 2.9997 0.816585 2.99967H0.333252V1.66634H0.816585C1.9908 1.6664 3.13919 2.01099 4.11945 2.65743C5.09971 3.30386 5.86874 4.22372 6.33125 5.30301L6.33325 5.30634L6.33525 5.30234C6.74073 4.35621 7.38279 3.5303 8.19972 2.90404C9.01664 2.27777 9.98095 1.87221 10.9999 1.72634V0.333008L14.3333 2.33301L10.9999 4.33301V3.07767C10.2445 3.21764 9.53535 3.54193 8.93537 4.02178C8.33539 4.50162 7.86315 5.12217 7.56059 5.82834L7.05859 6.99967L7.56059 8.17101C7.86315 8.87718 8.33539 9.49773 8.93537 9.97757C9.53535 10.4574 10.2445 10.7817 10.9999 10.9217Z" fill="#455570"/>
																	</svg>`, examData.isQuestionMixing == true ? 'Đảo vị trí câu hỏi' : 'Câu hỏi theo thứ tự')}
          {renderExamSettingInfo(`<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path d="M10.3335 1.6668V0.378798C10.3334 0.315403 10.3514 0.253293 10.3853 0.199754C10.4193 0.146215 10.4678 0.103467 10.5252 0.0765242C10.5825 0.0495814 10.6464 0.0395613 10.7093 0.0476392C10.7722 0.0557171 10.8315 0.081558 10.8802 0.122131L13.6268 2.4108C13.6795 2.45469 13.7173 2.51375 13.7352 2.57991C13.753 2.64608 13.7501 2.71615 13.7267 2.78057C13.7033 2.84499 13.6606 2.90064 13.6044 2.93993C13.5483 2.97921 13.4814 3.00024 13.4128 3.00013H0.333496V1.6668H10.3335ZM0.333496 11.0001H13.6668V12.3335H0.333496V11.0001ZM0.333496 6.33346H13.6668V7.6668H0.333496V6.33346Z" fill="#455570"/>
																	</svg>`, examData.showType == 0 ? 'Hiển thị 1 câu hỏi trên một trang' : 'Hiển thị toàn bộ câu hỏi trên một trang')}
          {renderExamSettingInfo(`<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path d="M0.333496 10.0003H5.00016V11.3337H0.333496V10.0003ZM0.333496 5.33366H6.3335V6.66699H0.333496V5.33366ZM0.333496 0.666992H13.6668V2.00033H0.333496V0.666992ZM12.7828 6.68366L13.5535 6.42299L14.2202 7.57766L13.6095 8.11432C13.6864 8.47876 13.6864 8.85522 13.6095 9.21966L14.2202 9.75633L13.5535 10.911L12.7828 10.6503C12.5095 10.897 12.1842 11.087 11.8262 11.2037L11.6668 12.0003H10.3335L10.1735 11.203C9.81967 11.0874 9.494 10.8989 9.2175 10.6497L8.44683 10.911L7.78016 9.75633L8.39083 9.21966C8.31397 8.85522 8.31397 8.47876 8.39083 8.11432L7.78016 7.57766L8.44683 6.42299L9.2175 6.68366C9.49083 6.43699 9.81616 6.24699 10.1742 6.13032L10.3335 5.33366H11.6668L11.8268 6.13099C12.1842 6.24699 12.5095 6.43766 12.7828 6.68433V6.68366ZM11.0002 10.0003C11.3538 10.0003 11.6929 9.85985 11.943 9.6098C12.193 9.35975 12.3335 9.02061 12.3335 8.66699C12.3335 8.31337 12.193 7.97423 11.943 7.72418C11.6929 7.47413 11.3538 7.33366 11.0002 7.33366C10.6465 7.33366 10.3074 7.47413 10.0574 7.72418C9.80731 7.97423 9.66683 8.31337 9.66683 8.66699C9.66683 9.02061 9.80731 9.35975 10.0574 9.6098C10.3074 9.85985 10.6465 10.0003 11.0002 10.0003V10.0003Z" fill="#172B4D"/>
																	</svg>`, examData.type == 0 ? 'Đề thi câu hỏi cố định' : 'Đề thi câu hỏi ngẫu nhiên')}
        </View>
      </View>

      <Divider sx={{ margin: '24px 0' }} />

      {/* list question  */}
      <ListQuestionDefault listQuestions={examQuestions} updateListQuestion={handleUpdateListQuestion} />
    </View>

    <ExamFormModal show={showForm} onClose={() => setShowForm(false)} onSubmit={handleSubmitForm} data={examData} />
    <ExamChooseTypeModal data={examData} show={showChooseType} onClose={() => setShowChooseType(false)} onSubmit={handleExamSetting} />
  </>
}

export default React.memo(CreateExamContent)