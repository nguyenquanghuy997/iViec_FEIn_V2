import { useGetQuestionGroupQuery } from "../ExamFormSlice";
import ExamPreview from "../preview/ExamPreview";
import CreateExamHeader from "./CreateExamHeader";
import ListQuestionDefault from "./ListQuestionDefault";
import ListQuestionGroupDefault from "./ListQuestionGroupDefault";
import MuiButton from "@/components/BaseComponents/MuiButton";
import { View } from "@/components/DesignSystem/FlexStyled";
import { Text } from "@/components/FlexStyled";
import Iconify from "@/components/Iconify";
import { QUESTION_TYPE } from "@/config";
import { SubTitleStyle } from "@/sections/emailform/style";
import {
  useCreateExamMutation,
  useGetExaminationByIdQuery,
  useUpdateExamMutation,
} from "@/sections/exam/ExamSlice";
import ExamChooseTypeModal from "@/sections/exam/components/ExamChooseTypeModal";
import ExamFormModal from "@/sections/exam/components/ExamFormModal";
import { ButtonIcon } from "@/utils/cssStyles";
import { NumericFormatCustom } from "@/utils/formatNumber";
import {
  Box,
  Divider,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useState } from "react";
import React from "react";
import { useEffect } from "react";

function randomArray(arr, count) {
  let len = arr?.length;
  let lookup = {};
  let tmp = [];

  if (count > len) count = len;

  for (let i = 0; i < count; i++) {
    let index;
    do {
      index = ~~(Math.random() * len);
    } while (index in lookup);
    lookup[index] = null;
    tmp.push(arr[index]);
  }

  return tmp;
}

const CreateExamContent = () => {
  const router = useRouter();
  const [createExam] = useCreateExamMutation();
  const [updateExam] = useUpdateExamMutation();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const examId = router.query.slug;
  const { data: { items: Data = [] } = {} } = useGetQuestionGroupQuery({
    IsActive: "true",
  });

  var ListQuestionGroup = Data?.filter((p) => p.numOfQuestion > 0);

  const { data: data } = useGetExaminationByIdQuery(
    {
      Id: examId,
    },
    {
      skip: !examId,
    }
  );

  const {
    query = {
      name: "",
      description: "",
      examTime: 0,
      isQuestionMixing: true,
      showType: 0,
      type: 0,
    },
  } = router;

  const queryDataDefault = {
    ...query,
    isQuestionMixing: query.isQuestionMixing == "true",
    standardPoint: null,
  };

  const [examData, setExamData] = useState(queryDataDefault);
  const [examQuestions, setExamQuestions] = useState([]);
  const [examQuestionGroups, setExamQuestionGroups] = useState([]);
  const [examQuestionPreview, setExamQuestionPreview] = useState();
  const [showForm, setShowForm] = useState(false);
  const [showChooseType, setShowChooseType] = useState(false);
  const [showInputStandardPoint, setShowInputStandardPoint] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleChangeStandardPoint = (event) => {
    setExamData({
      ...examData,
      standardPoint: event.target.value,
    });
  };

  const onOutFocusInput = () => {
    if (examData.standardPoint == null || examData.standardPoint == '') {
      setShowInputStandardPoint(false);
    }
  };

  const handleSubmitForm = (data) => {
    setExamData({ ...data });
    setShowForm(false);
    setShowChooseType(true);
  };

  const handleExamSetting = (data) => {
    setShowChooseType(false);
    setExamData({ ...data });
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

  const timeFromMinutes = (mins_num) => {
    var days = Math.floor(mins_num / (24 * 60))
    var hours = Math.floor((mins_num - days * 24 * 60) / 60);
    var minutes = mins_num - hours * 60 - days * 24 * 60;

    if (days < 10) { days = "0" + days; }
    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    return days + "." + hours + ':' + minutes + ':00';
  }

  const minutesFromTime = (times) => {
    const a = times.split(/[.:]+/);
    var storageFuncs = [s => parseInt(s) * 0, m => parseInt(m), h => parseInt(h) * 60, d => parseInt(d) * 60 * 24];
    var res = a.reverse().reduce((acc, next, index) => acc + storageFuncs[index](next), 0);
    return res;
  };

  const handlePreview = async () => {
    if (examData.type == 1) {
      let questions = [];
      let questionInType;
      examQuestionGroups.map((p) => {
        if (p?.questionTypeId == QUESTION_TYPE.ESSAY) {
          questionInType = p?.questionGroup?.questions?.filter(
            (x) => x?.questionType == QUESTION_TYPE.ESSAY
          );
        } else {
          questionInType = p?.questionGroup?.questions?.filter(
            (x) => x?.questionType != QUESTION_TYPE.ESSAY
          );
        }
        let months = p && randomArray(questionInType, p.quantity);
        questions.push(months);
      });
      setExamQuestionPreview(questions.flat(1));
      setShowPreview(true)
    } else {
      setExamQuestionPreview(examQuestions.flat(1));
      setShowPreview(true)
    }
  };

  const handleUpdateListQuestion = (datas) => {
    if (examData.type == 0) {
      setExamQuestions([...datas]);
      setExamData({
        ...examData,
        maximumPoint:
          examQuestions.reduce(function (a, b) {
            return a + b.questionPoint;
          }, 0) || 1,
      });
    } else {
      setExamQuestionGroups([...datas]);
      const ESSAY_QUESTION = 2;
      if (datas.some((x) => x.questionTypeId == ESSAY_QUESTION)) {
        setExamData({ ...examData, maximumPoint: null });
      } else
        setExamData({
          ...examData,
          maximumPoint: datas.reduce(function (a, b) {
            return a + b.quantity;
          }, 0),
        });
    }
  };

  const handleSaveDraft = async () => {
    // if (examData.standardPoint === null || examData.standardPoint === '') {
    //   enqueueSnackbar("Bạn cần nhập điểm sàn", {
    //     variant: "error",
    //   });
    //   return;
    // }

    if (examData.standardPoint < 0) {
      enqueueSnackbar("Điểm sàn phải lớn hơn không", {
        variant: "error",
      });
      return;
    }

    if (examData.type == 0 && examData.standardPoint > examData.maximumPoint) {
      enqueueSnackbar("Điểm sàn không được lớn hơn điểm tối đa", {
        variant: "error",
      });
      return;
    }

    if (examData.type == 1 && !!examData.maximumPoint && examData.standardPoint > examData.maximumPoint) {
      enqueueSnackbar("Điểm sàn không được lớn hơn điểm tối đa", {
        variant: "error",
      });
      return;
    }

    const body = {
      id: examData.id,
      name: examData.name,
      description: examData.description,
      showType: examData.showType,
      type: examData.type,
      totalQuestion: examQuestions.length,
      standardPoint: parseInt(examData.standardPoint == null || examData.standardPoint == '' ? -1 : examData.standardPoint),
      isQuestionMixing: examData.isQuestionMixing,
      examTime: timeFromMinutes(examData.examTime),
      maximumPoint: examData.maximumPoint,
      examinationQuestions:
        (examData.type == 0 &&
          examQuestions.map((x) => {
            return {
              questionId: x.id,
              questionCreation: !x.id
                ? {
                  questionTitle: x.questionTitle,
                  answers: x.answers,
                  questionPoint: x.questionPoint,
                  questionType: x.questionType,
                  questionState: x.questionState,
                  questionGroupId: x.questionGroupId,
                  isActive: x.isActive,
                  questionFilePaths: x.questionFilePaths,
                }
                : null,
            };
          })) ||
        null,
      examinationQuestionGroups:
        (examData.type == 1 &&
          examQuestionGroups.map((x) => {
            return {
              ...x,
              questionGroupId: x.questionGroupId,
              totalQuestion: x.quantity,
              type: x.questionTypeId == 1 ? 0 : 1,
            };
          })) ||
        null,
    };

    try {
      if (!examId) {
        await createExam(body).unwrap();
      } else {
        await updateExam(body).unwrap();
      }
      enqueueSnackbar("Lưu đề thi thành công");
      router.push("/settings/exam/exam-business");
    } catch (e) {
      if (e.status == 'EXE_06')
        enqueueSnackbar("Đề thi đã tồn tại", {
          variant: "error",
        });
      else
        enqueueSnackbar("Lưu đề thi thất bại", {
          variant: "error",
        });
    }
  };

  const handleSave = async () => {
    if (examQuestions.length == 0 && examData.type == 0) {
      enqueueSnackbar("Bạn cần thêm câu hỏi vào đề thi", {
        variant: "error",
      });
      return;
    }
    if (examQuestionGroups.length == 0 && examData.type == 1) {
      enqueueSnackbar("Bạn cần thêm nhóm câu hỏi vào đề thi", {
        variant: "error",
      });
      return;
    }
    if (examData.standardPoint === null || examData.standardPoint === '') {
      enqueueSnackbar("Bạn cần nhập điểm sàn", {
        variant: "error",
      });
      return;
    }
    if (examData.standardPoint < 0) {
      enqueueSnackbar("Điểm sàn phải lớn hơn không", {
        variant: "error",
      });
      return;
    }

    if (examData.type == 0 && examData.standardPoint > examData.maximumPoint) {
      enqueueSnackbar("Điểm sàn không được lớn hơn điểm tối đa", {
        variant: "error",
      });
      return;
    }

    if (examData.type == 1 && !!examData.maximumPoint && examData.standardPoint > examData.maximumPoint) {
      enqueueSnackbar("Điểm sàn không được lớn hơn điểm tối đa", {
        variant: "error",
      });
      return;
    }

    const body = {
      id: examData.id,
      name: examData.name,
      description: examData.description,
      showType: examData.showType,
      type: examData.type,
      totalQuestion: examQuestions.length,
      standardPoint: parseInt(examData.standardPoint ?? 0),
      isQuestionMixing: examData.isQuestionMixing,
      examTime: timeFromMinutes(examData.examTime),
      maximumPoint: examData.maximumPoint,
      examinationQuestions:
        (examData.type == 0 &&
          examQuestions.map((x) => {
            return {
              questionId: x.id,
              questionCreation: !x.id
                ? {
                  questionTitle: x.questionTitle,
                  answers: x.answers,
                  questionPoint: x.questionPoint,
                  questionType: x.questionType,
                  questionState: x.questionState,
                  questionGroupId: x.questionGroupId,
                  isActive: x.isActive,
                  questionFilePaths: x.questionFilePaths,
                }
                : null,
            };
          })) ||
        null,
      examinationQuestionGroups:
        (examData.type == 1 &&
          examQuestionGroups.map((x) => {
            return {
              questionGroupId: x.questionGroupId,
              totalQuestion: x.quantity,
              type: x.questionTypeId == 1 ? 0 : 1,
            };
          })) ||
        null,
    };

    try {
      if (!examId) {
        await createExam(body).unwrap();
      } else {
        await updateExam(body).unwrap();
      }
      enqueueSnackbar("Lưu đề thi thành công");
      router.push("/settings/exam/exam-business");
    } catch (e) {
      if (e.status == 'EXE_06')
        enqueueSnackbar("Đề thi đã tồn tại", {
          variant: "error",
        });
      else
        enqueueSnackbar("Lưu đề thi thất bại", {
          variant: "error",
        });
    }
  };

  const handleCancel = async () => {
    router.push("/settings/exam/exam-business");
  };

  /**
   * convert data from api to state
   */
  useEffect(() => {
    if (data) {
      setExamData({
        ...data,
        examTime: minutesFromTime(data.examTime),
        standardPoint: data.standardPoint == -1 ? '' : data.standardPoint
      });
      if (data.type == 0) {
        setExamQuestions(data.questions ?? []);
      }
      if (data.type == 1) {
        setExamQuestionGroups(
          data.examinationQuestionGroups.map((p) => {
            return {
              ...p,
              quantity: Number(p.totalQuestion),
              questionTypeId: p?.type == 0 ? 1 : 2,
              questionGroupId: p?.questionGroup?.id,
              questionGroup: {
                ...p.questionGroup,
                questions: ListQuestionGroup.filter(
                  (x) => x.id === p?.questionGroup?.id
                )?.[0]?.questions,
              },
              quantityOfQuestion:
                p?.type == 0
                  ? Number(p?.questionGroup?.numOfQuestionMultipleChoice)
                  : Number(p?.questionGroup?.numOfQuestionEssay),
            };
          })
        );
      }
    }
  }, [data]);

  return (
    <>
      <CreateExamHeader
        isCreate={!examId}
        handleSaveDraft={handleSaveDraft}
        handleCancel={handleCancel}
        handleSave={handleSave}
        handlePreview={handlePreview}
      />

      <View>
        {/* title */}
        <View p={24} flexrow={"true"} atcenter={"true"} jcbetween={"true"}>
          <View>
            <Typography
              variant="h6"
              sx={{
                fontSize: "1.5rem",
                fontWeight: 600,
                color: theme.palette.common.neutral700,
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
          </View>

          <View
            flexrow={"true"}
            allcenter={"true"}
            style={{ alignItems: "stretch" }}
          >
            {
              (examData.type == 0 || (examData.type == 1 && examData.maximumPoint)) ?
                <View
                  allcenter={"true"}
                  style={{
                    margin: "0 24px 0 8px",
                    padding: "6px 8px",
                    border: (examData.standardPoint > examData.maximumPoint && examData.maximumPoint) ? "1px solid #E53935" : "1px solid #455570",
                    borderRadius: "4px",
                  }}
                >
                  <Typography
                    sx={{
                      minWidth: "70px",
                      textAlign: "center",
                      fontSize: "13px",
                      lineHeight: "20px",
                      color: "#455570",
                      fontWeight: 500,
                    }}
                  >
                    Điểm sàn
                  </Typography>

                  <Box
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      lineHeight: "24px",
                    }}
                  >
                    {
                      (!showInputStandardPoint && (examData.standardPoint === null || examData.standardPoint === '')) && <ButtonIcon
                        sx={{
                          backgroundColor: "transparent",
                          "&:hover": {
                            backgroundColor: "unset",
                          },
                        }}
                        onClick={() => setShowInputStandardPoint(true)}
                        icon={
                          <Iconify
                            icon={"ri:edit-2-fill"}
                            width={14}
                            height={14}
                            color="#5C6A82"
                          />
                        }
                      />
                    }
                    {
                      (showInputStandardPoint || (examData.standardPoint !== null && examData.standardPoint !== '')) && <TextField
                        value={examData.standardPoint}
                        onChange={handleChangeStandardPoint}
                        onBlur={(e) => onOutFocusInput(e)}
                        name="numberformat"
                        id="formatted-numberformat-input"
                        InputProps={{
                          disableUnderline: true,
                          inputComponent: NumericFormatCustom,
                        }}
                        variant="standard"
                        sx={{
                          width: "70px",
                          "& .MuiInputBase-input": {
                            fontSize: "11px !important",
                            height: "18px !important",
                            fontWeight: 600,
                            textAlign: "center !important",
                            padding: "0 !important",
                            marginTop: "4px !important",
                          },
                        }}
                      />
                    }
                  </Box>
                </View>
                : <></>
            }

            <View style={{ flexDirection: "row" }}>
              <Tooltip
                arrow
                title={
                  examData.type == 1 && !examData.maximumPoint
                    ? "Không thể xác định điểm tối đa do trong đề có ít nhất 1 câu hỏi câu hỏi tự luận ngẫu nhiên"
                    : ""
                }
              >
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "6px 8px",
                    border: "1px solid #455570",
                    borderRadius: "4px",
                  }}
                >
                  <Typography
                    sx={{
                      minWidth: "70px",
                      textAlign: "center",
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
                      fontSize: "11px",
                      fontWeight: 600,
                      lineHeight: "18px",
                      marginTop: 4,
                    }}
                  >
                    {examData.type == 1 && (examData.maximumPoint == 0 || !examData.maximumPoint) ? "Không xác định" : examData.maximumPoint}
                  </span>
                </Box>
              </Tooltip>
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

          <View flexrow={"true"} atcenter={"true"} mt={24}>
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
              listQuestions={examQuestionGroups}
              setListQuestions={setExamQuestionGroups}
              updateListQuestion={handleUpdateListQuestion}
              ListQuestionGroup={ListQuestionGroup}
            />
          )}
        </View>
      </View>

      {showPreview && (
        <ExamPreview
          open={showPreview}
          onClose={() => setShowPreview(false)}
          data={{
            examData: examData,
            questions: examQuestionPreview,
            examQuestionGroups: examQuestionGroups,
          }}
        />
      )}

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
  );
};

export default React.memo(CreateExamContent);
