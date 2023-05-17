import MuiButton from "@/components/BaseComponents/MuiButton"
import { Text } from "@/components/FlexStyled"
import Iconify from "@/components/Iconify"
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
import { useCreateExamMutation, useGetExaminationByIdQuery, useUpdateExamMutation } from "@/sections/exam/ExamSlice"
import { useSnackbar } from "notistack"
import React from "react"
import { useEffect } from "react"
import ListQuestionGroupDefault from "./ListQuestionGroupDefault"

const CreateExamContent = () => {
  const router = useRouter();
  const [createExam] = useCreateExamMutation();
  const [updateExam] = useUpdateExamMutation();
  const { enqueueSnackbar } = useSnackbar();
  const examId = router.query.slug;
  const { data: data } = useGetExaminationByIdQuery({
    Id: examId,
  });
  const { query = { name: "", description: "", examTime: 0, isQuestionMixing: true, showType: 0, type: 0 } } = router;
  const queryDataDefault = {
    ...query,
    isQuestionMixing: query.isQuestionMixing == 'true'
  }
  const [examData, setExamData] = useState(queryDataDefault);
  const [examQuestions, setExamQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showChooseType, setShowChooseType] = useState(false);

  const handleSubmitForm = (data) => {
    setExamData(data);
    setShowForm(false);
    setShowChooseType(true);
  };

  const handleExamSetting = (data) => {
    setShowChooseType(false);
    setExamData(data);
  };

  const renderExamSettingInfo = (icon, title) => {
    return (
      <>
        <Iconify icon={icon} width={14} height={14} color="#455570" />
        <Text ml={8} mr={24} fontSize={14} fontWeight={"400"} color={"#5C6A82"}>
          {title}
        </Text>
      </>
    );
  };

  const minutesFromTime = (times) => {
    var a = times.split(':');
    return (+a[0]) * 60 + (+a[1]);
  }

  const handleUpdateListQuestion = (data) => {
    setExamQuestions([...data]);
  };

  const handleSaveDraft = async () => {
    const body = {
      ...examData,
      totalQuestion: examQuestions.length,
      standardPoint: 1,
      maximumPoint: examQuestions.reduce(function (a, b) {
        return a + b.questionPoint;
      }, 0),
      examinationQuestions: examQuestions.map((x) => {
        return { ...x, questionId: x.id };
      }),
    };
    try {
      await createExam(body).unwrap();
      enqueueSnackbar("Lưu đề thi thành công");
      router.push("/settings/exam/exam-business");
    } catch {
      enqueueSnackbar("Lưu đề thi thất bại", {
        variant: "error",
      });
    }
  };

  const handleSave = async () => {
    if (examQuestions.length == 0) {
      enqueueSnackbar("Bạn cần thêm câu hỏi vào đề thi", {
        variant: "error",
      });
      return;
    }
    const body = {
      ...examData,
      totalQuestion: examQuestions.length,
      examTime: new Date(examData.examTime * 60 * 1000).toISOString().substr(11, 8),
      standardPoint: examData.standardPoint ?? 1,
      maximumPoint: examQuestions.reduce(function (a, b) {
        return a + b.questionPoint;
      }, 0),
      examinationQuestions: examQuestions.map((x) => {
        return { ...x, questionId: x.id };
      }),
    };
    try {
      if (!examId) {
        await createExam(body).unwrap();
      }
      else {
        await updateExam(body).unwrap();
      }
      enqueueSnackbar("Lưu đề thi thành công")
      router.push("/settings/exam/exam-business")
    } catch {
      enqueueSnackbar("Lưu đề thi thất bại", {
        variant: "error",
      });
    }
  };

  const handleCancel = async () => {
    router.push("/settings/exam/exam-business");
  };

  useEffect(() => {
    if (data) {
      setExamData({ ...data, examTime: minutesFromTime(data.examTime) })
      setExamQuestions(data.questions ?? [])
    }
  }, [data])

  return <>
    <CreateExamHeader
      isCreate={!examId}
      handleSaveDraft={handleSaveDraft}
      handleCancel={handleCancel}
      handleSave={handleSave} />

      <View>
        {/* title */}
        <View p={24} flexrow={"true"} atcenter={"true"} jcbetween={"true"}>
          <View>
            <Typography
              variant="h6"
              sx={{
                fontSize: "1.5rem",
                fontWeight: 600,
                color: "#172B4D",
              }}
            >
              {examData.name}
            </Typography>

            <SubTitleStyle
              sx={{
                fontSize: "14px",
                fontWeight: 400,
                marginTop: "8px",
              }}
            >
              {examData.description}
            </SubTitleStyle>
            <span style={{ fontSize: '16px', fontWeight: 600, lineHeight: '24px', marginTop: 4 }}>{examData.standardPoint ?? '-'}</span>
          </View>

          <View flexrow={"true"} atcenter={"true"}>
            <ButtonIcon
              sx={{
                marginLeft: "16px",
                backgroundColor: "transparent",
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

            <View
              allcenter={"true"}
              style={{
                margin: "0 24px 0 8px",
                padding: "6px 8px",
                border: "1px solid #455570",
                borderRadius: "4px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "13px",
                  lineHeight: "20px",
                  color: "#455570",
                  fontWeight: 500,
                }}
              >
                Điểm sàn
              </Typography>
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  lineHeight: "24px",
                  marginTop: 4,
                }}
              >
                -
              </span>
            </View>

            <View
              allcenter={"true"}
              style={{
                padding: "6px 8px",
                border: "1px solid #455570",
                borderRadius: "4px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "13px",
                  lineHeight: "20px",
                  color: "#455570",
                  fontWeight: 500,
                }}
              >
                Điểm tối đa
              </Typography>
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  lineHeight: "24px",
                  marginTop: 4,
                }}
              >
                {examQuestions.reduce((accumulator, object) => {
                  return accumulator + object.questionPoint;
                }, 0)}
              </span>
            </View>
          </View>
        </View>

        {/* setting info exam  */}
        <View ph={24}>
          <Box>
            <MuiButton
              title={"Thiết lập đề thi"}
              startIcon={
                <Iconify
                  icon="material-symbols:settings"
                  sx={{ width: 16, height: 16 }}
                />
              }
              variant={"outlined"}
              onClick={() => setShowForm("true")}
              sx={{
                border: "1px solid #455570",
                padding: "8px 12px",
                fontWeight: 600,
                fontSize: "14px",
                color: "#455570",
              }}
            />
          </Box>

        <View flexrow={'true'} atcenter={'true'} mt={24}>
          {renderExamSettingInfo(
            "mdi:clock-time-three-outline",
            `${examData.examTime} phút`
          )}
          {renderExamSettingInfo(
            `ri:shuffle-fill`,
            examData.isQuestionMixing == true
              ? "Đảo vị trí câu hỏi"
              : "Câu hỏi theo thứ tự"
          )}
          {renderExamSettingInfo(
            `ri:order-play-line`,
            examData.showType == 0
              ? "Hiển thị 1 câu hỏi trên một trang"
              : "Hiển thị toàn bộ câu hỏi trên một trang"
          )}
          {renderExamSettingInfo(
            `ri:list-settings-line`,
            examData.type == 0
              ? "Đề thi câu hỏi cố định"
              : "Đề thi câu hỏi ngẫu nhiên"
          )}

        </View>

        <Divider sx={{ margin: "24px 0" }} />
        {examData.type == 0 ? (
          <ListQuestionDefault
            listQuestions={examQuestions}
            updateListQuestion={handleUpdateListQuestion}
          />
        ) : (
          <ListQuestionGroupDefault
            listQuestions={examQuestions}
            setListQuestions={setExamQuestions}
            updateListQuestion={handleUpdateListQuestion}
          />
        )}
      </View>
      </View>

      <ExamFormModal
        show={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleSubmitForm}
        data={examData}
      />
      <ExamChooseTypeModal
        data={examData}
        show={showChooseType}
        onClose={() => setShowChooseType(false)}
        onSubmit={handleExamSetting}
      />
    </>
};

export default React.memo(CreateExamContent);
