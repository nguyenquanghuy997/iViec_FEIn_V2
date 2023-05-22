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
import { useRef } from "react";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

const QuestionItem = ({ question, index, onChangeAnswer }) => {
  const { palette } = useTheme();

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
        {question.questionTitle}
      </Typography>
      <SliderStyle>
        <Swiper
          id="swiper"
          virtual
          slidesPerView={1}
          width={"100%"}
          spaceBetween={50}
        >
          {question?.questionFilePaths &&
            question?.questionFilePaths.map((p, index) => {
              const videoRef = useRef();
              const [stop, setStop] = useState(false);

              const handleVideo = () => {
                setStop(!stop);
                if (stop === true) {
                  videoRef.current.pause();
                } else {
                  videoRef.current.play();
                }
              };
              return (
                <SwiperSlide
                  key={`slide-${index}`}
                  style={{ listStyle: "none" }}
                >
                  {p?.includes("MOV") || p?.includes("mp4") ? (
                    <Box
                      onClick={handleVideo}
                      width={"152px"}
                      height={"86px"}
                      mr={2}
                    >
                      <video
                        ref={videoRef}
                        src={getFileUrl(p)}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: 4,
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                  ) : (
                    <Box width={"152px"} height={"86px"} mr={2}>
                      <img
                        src={getFileUrl(p)}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: 4,
                        }}
                      />
                    </Box>
                  )}
                </SwiperSlide>
              );
            })}
        </Swiper>
      </SliderStyle>

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
                control={<Radio checked={selectedAnswer.includes(answer.id)} />}
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
                <Checkbox checked={selectedAnswer.includes(answer.id)} />
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
