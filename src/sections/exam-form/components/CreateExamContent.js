import ListQuestionDefault from "./ListQuestionDefault";
import ListQuestionGroupDefault from "./ListQuestionGroupDefault";
import MuiButton from "@/components/BaseComponents/MuiButton";
import { View } from "@/components/DesignSystem/FlexStyled";
import { Text } from "@/components/FlexStyled";
import Iconify from "@/components/Iconify";
import ExamChooseTypeModal from "@/sections/exam/components/ExamChooseTypeModal";
import ExamFormModal from "@/sections/exam/components/ExamFormModal";
import { ButtonIcon, TextElipsis } from "@/utils/cssStyles";
import { Box, Divider, Typography, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

const CreateExamContent = () => {
  const router = useRouter();
  const { palette } = useTheme();
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
  };
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
        <Iconify icon={icon} width={20} height={20} color="#455570" />
        <Text ml={8} mr={24} fontSize={14} fontWeight={"400"} color={"#5C6A82"}>
          {title}
        </Text>
      </>
    );
  };

  const handleUpdateListQuestion = (data) => {
    setExamQuestions([...data]);
  };

  return (
    <>
      <View>
        {/* title */}
        <Box
          padding="24px 16px"
          justifyContent={"space-between"}
          display={"flex"}
          alignItems={"flex-start"}
        >
          <View width="70%">
            <TextElipsis
              sx={{
                fontSize: "1.5rem",
                fontWeight: 600,
                color: palette.text.primary,
              }}
            >
              {examData.name}
            </TextElipsis>
            {examData.description && (
              <TextElipsis
                sx={{
                  color: palette.text.sub,
                  fontSize: "14px",
                  fontWeight: 400,
                  marginTop: "8px",
                }}
              >
                {examData.description}
              </TextElipsis>
            )}
            <Box mt={2}>
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
        </Box>

        {/* setting info exam  */}
        <View ph={24}>
          <View flexrow={"true"}>
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
            updateListQuestion={handleUpdateListQuestion}
          />
        )}
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
  );
};

export default CreateExamContent;
