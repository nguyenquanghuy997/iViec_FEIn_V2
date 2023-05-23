import {
  CheckboxIconCircleChecked,
  CheckboxIconCircleDefault,
  CheckboxIconMultiCheck,
  CheckboxIconMultiDefault,
} from "@/assets/CheckboxIcon";
import Editor from "@/components/editor";
import { QUESTION_TYPE } from "@/config";
import { SliderStyle, WrapBox } from "@/utils/cssStyles";
import { getFileUrl, prefixZero } from "@/utils/helper";
import {
  Box,
  Typography,
  useTheme,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormGroup,
} from "@mui/material";
import { useState, useEffect } from "react";
import "react-multi-carousel/lib/styles.css";
import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay,
  Virtual,
} from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

SwiperCore.use([Navigation, Pagination, Autoplay, Virtual]);
const QuestionItem = ({ question, index, onChangeAnswer }) => {
  const { palette } = useTheme();
  const [expandedImage, setExpandedImage] = useState(
    question?.questionFilePaths[0]
  );

  const handleImageClick = (image) => {
    setExpandedImage(image);
  };

  return (
    <WrapBox
      className="question-item"
      sx={{ mb: "20px" }}
      id={"question_" + question.id}
    >
      <Typography
        variant="subtitle1"
        component="h3"
        className="question-title"
        sx={{ mb: 2 }}
      >
        <span style={{ color: palette.text.active }}>
          Câu hỏi {prefixZero(index + 1)}:{" "}
        </span>
        {question.questionTitle} {`(${question.questionPoint} điểm)`}
      </Typography>
      {expandedImage && (
        <Box mb={2}>
          {expandedImage?.includes("MOV") || expandedImage?.includes("mp4") ? (
            <video
              controls
              src={getFileUrl(expandedImage)}
              style={{
                borderRadius: 8,
                objectFit: "contain",
                maxWidth: "100%",
                maxHeight: "548px",
              }}
            />
          ) : (
            <img
              src={getFileUrl(expandedImage)}
              style={{
                borderRadius: 8,
                maxWidth: "100%",
                maxHeight: "548px",
              }}
            />
          )}
        </Box>
      )}
      {question?.questionFilePaths.length > 1 && (
        <SliderStyle sx={{marginBottom: 2}}>
          <Swiper
            id="swiper"
            virtual
            navigation
            slidesPerView={6}
            spaceBetween={12}
            style={{ width: "100%", marginLeft: 0, minHeight: 92 }}
          >
            {question?.questionFilePaths.map((item, index) => (
              <SwiperSlide
                key={`slide-${index}`}
                style={{
                  listStyle: "none",
                  height: "86px",
                  marginRight: "12px",
                }}
              >
                {item?.includes("MOV") || item?.includes("mp4") ? (
                  <Box onClick={() => handleImageClick(item)}>
                    <video
                      src={getFileUrl(item)}
                      style={{
                        borderRadius: 8,
                        objectFit: "cover",
                        width: "152px",
                        height: "86px",
                      }}
                    />
                  </Box>
                ) : (
                  <Box onClick={() => handleImageClick(item)}>
                    <img
                      src={getFileUrl(item)}
                      style={{
                        borderRadius: 8,
                        width: "152px",
                        height: "86px",
                      }}
                    />
                  </Box>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </SliderStyle>
      )}
      <Box className="question-answers">
        <QuestionAnswers item={question} onChangeAnswer={onChangeAnswer} />
      </Box>
    </WrapBox>
  );
};


export default QuestionItem;

const QuestionAnswers = ({ item, onChangeAnswer }) => {
  const { questionType, answers = [], answeredId = null } = item || {};
  const isChoiceQuestion = [
    QUESTION_TYPE.MULTI_CHOICE_ONE_ANSWER,
    QUESTION_TYPE.MULTI_CHOICE_MANY_ANSWER,
  ].includes(questionType);
  const isOneAnswer = questionType === QUESTION_TYPE.MULTI_CHOICE_ONE_ANSWER;

  const [selectedAnswer, setSelectedAnswer] = useState(
    isChoiceQuestion ? [] : null
  );
  const [attachFiles, setAttachFiles] = useState([]);
  const handleFileChange = (e) => {
    setAttachFiles((prev) => [...prev, ...e.target.files]);
  };
  const removeFileUpload = (index) => {
    const newFileList = [...attachFiles].filter((item, idx) => idx !== index);
    setAttachFiles(newFileList);
  };
  useEffect(() => {
    if (!answeredId) {
      return;
    }
    if (isChoiceQuestion) {
      if (isOneAnswer) {
        setSelectedAnswer([answeredId]);
      } else {
        setSelectedAnswer(answeredId.split(","));
      }
    } else {
      setSelectedAnswer(answeredId);
    }
  }, [item.answeredId]);

  const startCharAt = 65; // 'A';
  const getAnswerLetter = (answerIndex) => {
    return String.fromCharCode(startCharAt + answerIndex);
  };

  const handleChangeAnswer = (value) => {
    if (isChoiceQuestion) {
      let updatedAnswer = [...selectedAnswer];
      if (isOneAnswer) {
        updatedAnswer = [value];
      } else {
        let index = selectedAnswer.indexOf(value);
        if (index < 0) {
          updatedAnswer.push(value);
        } else {
          updatedAnswer.splice(index, 1);
        }
      }

      setSelectedAnswer([...updatedAnswer]);
      onChangeAnswer([...updatedAnswer]);
    } else {
      onChangeAnswer(value);
    }
  };

  if (isChoiceQuestion) {
    if (isOneAnswer) {
      return (
        <RadioGroup
          name={`answers[${item.id}]`}
          className="answers"
          onChange={(e) => handleChangeAnswer(e.target.value)}
        >
          {answers.map((answer, ansIndex) => {
            let isActive = selectedAnswer.includes(answer.id);
            return (
              <FormControlLabel
                key={answer.id}
                className={"answer-item" + (isActive ? " selected-answer" : "")}
                value={answer.id}
                label={
                  <span className="answer-content">
                    {getAnswerLetter(ansIndex) + ". " + answer.content}
                  </span>
                }
                control={
                  <Radio
                    icon={<CheckboxIconCircleDefault />}
                    checkedIcon={<CheckboxIconCircleChecked />}
                    checked={selectedAnswer.includes(answer.id)}
                  />
                }
              />
            );
          })}
        </RadioGroup>
      );
    }

    return (
      <FormGroup
        className="answers"
        name={`answers[${item.id}]`}
        onChange={(e) => handleChangeAnswer(e.target.value)}
      >
        {answers?.map((answer, ansIndex) => {
          let isActive = selectedAnswer.includes(answer.id);
          return (
            <FormControlLabel
              key={answer.id}
              className={"answer-item" + (isActive ? " selected-answer" : "")}
              value={answer.id}
              label={
                <span className="answer-content">
                  {getAnswerLetter(ansIndex) + ". " + answer.content}
                </span>
              }
              control={
                <Checkbox
                  icon={<CheckboxIconMultiDefault />}
                  checkedIcon={<CheckboxIconMultiCheck />}
                  checked={selectedAnswer.includes(answer.id)}
                />
              }
            />
          );
        })}
      </FormGroup>
    );
  }

  return (
    <Box className="answers">
      <Typography
        variant="body2"
        component="p"
        fontWeight={500}
        sx={{ mb: "12px" }}
      >
        Nội dung câu trả lời
      </Typography>
      <Editor
        initialValue={selectedAnswer}
        onChange={(value) => handleChangeAnswer(value)}
        hasAttachFiles={true}
        attachFiles={attachFiles}
        handleFileChange={handleFileChange}
        removeFileUpload={removeFileUpload}
      />
    </Box>
  );
};
