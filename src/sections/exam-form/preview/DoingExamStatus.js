import { useEffect, useState, useRef } from 'react';
import {
  Box,
  Skeleton,
  Typography,
  Divider,
  useTheme,
  Chip,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import { Button } from "@/components/DesignSystem";
import { pxToRem } from "@/utils/getFontValue";
import { prefixZero } from "@/utils/helper";
import { isEmpty as _isEmpty } from 'lodash';

export default function DoingExamStatus({
  isLoading = false,
  examination,
  questions = [],
  answers = {},
}) {
  const theme = useTheme();
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [error] = useState(false);
  
  const handleClickNumber = (id, index) => {
    setSelectedNumber(index + 1);
    let questionEl = document.getElementById('question_' + id);
    if (questionEl) {
      questionEl.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }


  
  
  return (
    <Box className="exam-doing-status" minHeight="490px">
      {isLoading ? (
        <Skeleton
          width="100%"
          height="100%"
          sx={{transform: 'none', borderRadius: '4px'}}
        ></Skeleton>
      ) : (
        <Box className="status-content">
          <Box display="flex" alignItems="center" className="timer-box">
            <img alt="" src="/assets/images/clock.svg"/>
            <Box flex={1} ml={1}>
              <Typography variant="textDesc" component="p" sx={{mb: 1}}>
                Thời gian làm bài:
              </Typography>
              
              <CountDown
                examTime={examination?.examTime}
              />
            </Box>
          </Box>
          
          <Divider/>
          
          <Box className="q-answers-box">
            <Typography
              variant="subtitle2"
              component="p"
              color={theme.palette.text.sub}
              sx={{mb: 2}}
            >Danh sách câu hỏi</Typography>
            
            <Box className="questions">
              {questions.map((item, index) => {
                let className = '';
                if (!_isEmpty(answers[item.id])) {
                  className = ' answered';
                }
                if (selectedNumber === index + 1) {
                  className = ' active';
                }
                
                return (
                  <div
                    className={'q-answer-item' + className}
                    key={index}
                  >
                    <Chip
                      label={index + 1}
                      onClick={() => handleClickNumber(item.id, index)}
                    />
                  </div>
                )
              })}
            </Box>
          </Box>
          
          <Divider/>
          
          <Box className="submit-box" sx={{padding: '24px 20px 20px'}}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
            >
              Nộp bài
            </Button>
            
            <Typography
              variant="caption"
              color={error ? theme.palette.text.warning : theme.palette.text.search}
              textAlign="center"
              component="p"
              sx={{mt: '4px'}}
            >
              Vui lòng trả lời tất cả câu hỏi trước khi nộp bài
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  )
}

const StyleTimer = styled(Typography)(({theme}) => ({
  '&.warning': {
    color: theme.palette.common.orange600,
  },
  '&.danger': {
    color: theme.palette.common.red600,
  },
}));

const CountDown = ({
  onSubmit,
}) => {
  const [hour, minute, second] = [];
  const totalSec = hour * 60 * 60 + minute * 60 + second;
  const _timeoutSubmit = useRef();
  const _hasTime = useRef(false);
  
  useEffect(() => {
    if (totalSec > 0) {
      _hasTime.current = true;
      return;
    }
    
    clearTimeout(_timeoutSubmit.current);
    _timeoutSubmit.current = setTimeout(() => {
      if (_hasTime.current) {
        onSubmit();
      }
    }, 1000);
  }, [hour, minute, second]);
  
  const getClassName = () => {
    if (totalSec < 3 * 60) {
      return ' warning';
    }
    if (totalSec < 60) {
      return ' danger';
    }
    return '';
  }
  
  return (
    <StyleTimer
      variant="body1"
      fontSize={pxToRem(24)}
      fontWeight={600}
      component="p"
      className={'time-countdown' + getClassName()}
    >
        <span>{prefixZero(1) + ':' + prefixZero(0) + ':' + prefixZero(0)}</span>
    </StyleTimer>
  )
}