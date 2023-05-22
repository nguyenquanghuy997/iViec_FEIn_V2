import { useRef, useState, useEffect } from "react";
import {
  Box,
  Typography,
  Skeleton,
} from "@mui/material";

// import DoingExamStatus from "./DoingExamStatus";
import QuestionItem from "./QuestionItem";
import { ExamContainer, WrapBox } from "@/utils/cssStyles";
import DoingExamStatus from "./DoingExamStatus";

export default function ExamContent({
  examination = null,
  recruitment = null,
  isLoading = false,
}) {
  const {
    examApplicantQuestionResults: questions = [],
  } = examination || {};

  const _timeoutAnswer = useRef();
  const _currentQuestions = useRef({});
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    let objAnswered = {};
    questions.map(item => {
      let { answeredId, id } = item;
      if (answeredId) {
        objAnswered[id] = true;
      }
    });
    setAnswers(objAnswered);
  }, [examination]);

  const onChangeAnswer = async (questionItem, value) => {
    if (_currentQuestions.current[questionItem.id]) {
      return;
    }

    setAnswers({
      ...answers,
      [questionItem.id]: value,
    });
    _currentQuestions.current[questionItem.id] = true;
    clearTimeout(_timeoutAnswer.current);
  }
  return (
    <ExamContainer className="exam-container" mb={4}>
      <Typography variant="subtitle1" component="h2" sx={{ mb: 3 }}>
        {recruitment && (
          'Tin tuyển dụng: ' + recruitment.name
        )}
      </Typography>

      {examination ? (
        <Box
          display="flex"
          justifyContent="flex-start"
          className="exam-grid-content"
        >
          <Box flex={1} className="exam-content" minHeight width={'100%'}>
            {isLoading ? (
              <Skeleton
                variant="rectangular"
                width="100%"
                height="490px"
                sx={{ borderRadius: '4px' }}
              ></Skeleton>
            ) : (
              examination?.questions.length < 1 ? (
                <WrapBox textAlign="center" sx={{ border: 'none' }}>
                  <Typography variant="textDesc">Không có câu hỏi nào!</Typography>
                </WrapBox>
              ) : (
                examination?.questions.map((question, index) => {
                  return (
                    <QuestionItem
                      key={index}
                      index={index}
                      question={question}
                      onChangeAnswer={value => {
                        onChangeAnswer(question, value);
                      }}
                    />
                  )
                })
              )
            )}
          </Box>

          <DoingExamStatus
            isLoading={isLoading}
            examination={examination}
            questions={examination?.questions}
            answers={answers}
          />
        </Box>
      ) : (
        <WrapBox textAlign="center" sx={{ border: 'none' }}>
          <Typography variant="textDesc">Không tìm thấy bài thi!</Typography>
        </WrapBox>
      )}
    </ExamContainer>
  )
}