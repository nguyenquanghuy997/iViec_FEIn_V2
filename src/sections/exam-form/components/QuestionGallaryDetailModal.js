import { ButtonDS } from '@/components/DesignSystem'
import Iconify from '@/components/Iconify'
import { Text } from '@/components/DesignSystem/FlexStyled'

import { Box, Dialog, DialogActions, DialogContent, Divider, Grid, InputAdornment } from '@mui/material'
import React, { useState } from 'react'
import { ButtonCancel } from '@/utils/cssStyles'
import { FormProvider, RHFTextField } from '@/components/hook-form'
import { useForm } from 'react-hook-form'
import { useLazyGetQuestionsQuery } from '@/sections/exam/ExamSlice'
import { useEffect } from 'react'
import QuestionCardItemDefault from './QuestionCardItemDefault'

function QuestionGallaryDetailModal({ show, onClose, questionGallary, handleAddQuestionFromInternal }) {
  const [getQuestions, { data: Data }] = useLazyGetQuestionsQuery();
  const [questionSelected, setQuestionSelected] = useState([])

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      searchKey: "",
    },
  });

  const { handleSubmit } = methods;

  const handleSelected = (data) => {
    const isExits = questionSelected.find(x => x.id == data.id)
    if (isExits) {
      setQuestionSelected(questionSelected.filter(x => x.id != data.id))
    }
    else {
      setQuestionSelected([...questionSelected, data]);
    }
  }

  const addToQuestion = () => {
    handleAddQuestionFromInternal(questionSelected)
  }

  useEffect(() => {
    getQuestions();
  }, [questionGallary]);

  return (
    <Dialog
      fullWidth
      maxWidth='lg'
      open={show}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiPaper-root": {
          top: "0 !important",
          borderRadius: "6px !important",
          // minHeight: 'calc(100% - 64px)'
        },
      }}
    >
      <Box
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        px={'12px'}
        py={'12px'}
        bgcolor={"#FDFDFD"}
      >
        <Text flex="true" fontsize={16} fontweight={"600"}>
          {"Thêm câu hỏi từ thư viện câu hỏi nội bộ"}
        </Text>
        <ButtonDS
          type="button"
          sx={{
            backgroundColor: "#fff",
            boxShadow: "none",
            ":hover": {
              backgroundColor: "#EFF3F7",
            },
            textTransform: "none",
            padding: "12px",
            minWidth: "unset",
          }}
          onClick={onClose}
          icon={
            <Iconify
              icon={"mi:close"}
              width={20}
              height={20}
              color="#5C6A82"
            />
          }
        />
      </Box>
      <Divider />

      <FormProvider methods={methods} onSubmit={handleSubmit}>
        <DialogContent sx={{
          backgroundColor: '#F2F4F5',
          padding: 0,
          display: 'flex',
          alignItems: 'stretch'
        }}>
          <Grid container spacing={0} alignItems={'stretch'}>
            <Grid item xs={3} sx={{ background: '#FDFDFD' }}>
              <Box padding={'24px'}>
                <RHFTextField
                  name="searchKey"
                  placeholder="Tìm kiếm câu hỏi..."
                  sx={{
                    width: "360px",
                    backgroundColor: '#F2F4F5',
                    borderRadius: '6px',
                    '.MuiInput-root': {
                      border: 'none'
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{ ml: 1.5 }}>
                        <Iconify
                          icon={"eva:search-fill"}
                          sx={{ color: "text.disabled", width: 20, height: 20 }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={9}>
              <Box padding={'24px'}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex' }}>
                    <Iconify
                      icon={"ion:arrow-back-outline"}
                      width={20}
                      height={20}
                      color="#455570"
                      mr={1}
                    />

                    <Text fontsize={16} fontweight={"600"} color={"#455570"}>
                      Nhóm câu hỏi {questionGallary?.name}
                    </Text>
                  </Box>

                  <Box>
                    <Text fontsize={13} fontweight={"600"} color={"#455570"}>Đã chọn {questionSelected.length}/{Data?.items?.length} Câu hỏi</Text>
                  </Box>
                </Box>
                <Box mt={2}>
                  {
                    Data?.items?.map((item, index) => <QuestionCardItemDefault
                      key={index}
                      index={index}
                      onChangeSelected={() => handleSelected(item)}
                      item={{ ...item, questionGroupName: questionGallary?.name }}
                    />)
                  }
                </Box>
              </Box>
            </Grid>
          </Grid>

        </DialogContent>
      </FormProvider>

      <Divider />
      <DialogActions sx={{ padding: '16px 24px !important' }}>
        <ButtonCancel tittle="Hủy" onClick={onClose} />
        <ButtonDS tittle="Thêm vào đề thi" onClick={addToQuestion} />
      </DialogActions>
    </Dialog>
  )
}

export default QuestionGallaryDetailModal