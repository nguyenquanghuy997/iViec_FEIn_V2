import { ButtonDS } from '@/components/DesignSystem'
import Iconify from '@/components/Iconify'
import { Text } from '@/components/DesignSystem/FlexStyled'

import { Box, CircularProgress, Dialog, DialogActions, DialogContent, Divider, Grid, InputAdornment } from '@mui/material'
import React, { useState } from 'react'
import { ButtonCancel } from '@/utils/cssStyles'
import { FormProvider, RHFSelect, RHFTextField } from '@/components/hook-form'
import { useForm } from 'react-hook-form'
import { useLazyGetQuestionsQuery } from '@/sections/exam/ExamSlice'
import { useEffect } from 'react'
import QuestionCardItemDefault from './QuestionCardItemDefault'
import { LabelStyle } from '@/components/hook-form/style'
import { API_GET_ORGANIZATION_USERS } from '@/routes/api'
import MuiDatePicker from '@/components/form/MuiDatePicker'
import { useDebounce } from '@/hooks/useDebounce'


const LIST_QUESTION_TYPE = [
  {
    value: 0,
    label: "Trắc nghiệm - 1 đáp án đúng",
    name: "Trắc nghiệm - 1 đáp án đúng",
  },
  {
    value: 1,
    label: "Trắc nghiệm - nhiều đáp án đúng",
    name: "Trắc nghiệm - nhiều đáp án đúng",
  },
  {
    value: 2,
    label: "Tự luận",
    name: "Tự luận",
  },
];


function QuestionGallaryDetailModal({ show, onClose, questionGallary, listQuestions, handleAddQuestionFromInternal }) {
  const [isLoading, setIsLoading] = useState(true)
  const [getQuestions, { data: { items = [], totalRecord } = {} }] = useLazyGetQuestionsQuery();

  const [questionSelected, setQuestionSelected] = useState([])

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      searchKey: null,
      createdTimeFrom: null,
      createdTimeTo: null,
      type: null,
      creatorIds: null
    },
  });

  const {
    handleSubmit,
    watch,
    setValue
  } = methods;

  const searchKey = useDebounce(watch('searchKey'), 300)
  const type = watch('type')
  const createdTimeFrom = watch('createdTimeFrom')
  const createdTimeTo = watch('createdTimeTo')
  const creatorIds = watch('creatorIds')

  const handleSelected = (data) => {
    const isExits = questionSelected.some(x => x.id == data.id)
    if (isExits) {
      setQuestionSelected(questionSelected.filter(x => x.id != data.id))
    }
    else {
      setQuestionSelected([...questionSelected, { ...data, questionGroupName: questionGallary?.name, isFromQuestionGalleryInternal: true }]);
    }
  }

  const addToQuestion = () => {
    handleAddQuestionFromInternal([...questionSelected].filter(x => !isDisable(x)))
  }

  const isSelected = (item) => {
    return listQuestions.some(x => x.id == item.id) || questionSelected.some(x => x.id == item.id)
  }

  const isDisable = (item) => {
    return listQuestions.some(x => x.id == item.id)
  }

  const getTotalSelected = () => {
    return listQuestions.filter(x => x.questionGroupId == questionGallary?.id).length + questionSelected.length;
  }

  useEffect(async () => {
    if (show)
      setIsLoading((await getQuestions({ QuestionGroupId: questionGallary.id, searchKey, type, createdTimeFrom, createdTimeTo, creatorIds })).isLoading)
  }, [searchKey, type, createdTimeFrom, createdTimeTo, creatorIds]);

  useEffect(() => {
    if (!show) {
      setQuestionSelected([])
      setValue("searchKey", null)
    }
  }, [show])

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
        },
        ".MuiModal-backdrop": {
          background: "rgba(9, 30, 66, 0.25)"
        }
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

      <DialogContent sx={{
        backgroundColor: '#F2F4F5',
        padding: 0,
        display: 'flex !important',
        flex: '1 1 auto',
        alignItems: 'stretch',
      }}>
        <Grid container spacing={0} alignItems={'stretch'}>
          <Grid item xs={3} sx={{ background: '#FDFDFD' }}>
            <Box padding={'24px'}>
              <FormProvider methods={methods} onSubmit={handleSubmit}>
                <RHFTextField
                  name="searchKey"
                  placeholder="Tìm kiếm câu hỏi..."
                  sx={{
                    width: "360px",
                    backgroundColor: '#F2F4F5',
                    borderRadius: '6px',
                    '.MuiInput-root': {
                      border: 'none',
                      backgroundColor: '#F2F4F5',
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

                <Box sx={{ mt: 3 }}>
                  <LabelStyle>Kiểu câu hỏi</LabelStyle>
                  <RHFSelect
                    name="type"
                    placeholder="Chọn kiểu câu hỏi"
                    options={LIST_QUESTION_TYPE}
                    fullWidth
                    allowClear
                  />
                </Box>

                <Box sx={{ mt: 3 }}>
                  <LabelStyle>Ngày tạo</LabelStyle>
                  <Box>
                    <MuiDatePicker
                      name="createdTimeFrom"
                      placeholder="Chọn ngày"
                    />
                  </Box>

                  <Box mt={2}>
                    <MuiDatePicker
                      name="createdTimeTo"
                      placeholder="Chọn ngày"
                    />
                  </Box>
                </Box>

                <Box sx={{ mt: 3 }}>
                  <LabelStyle>Người tạo</LabelStyle>
                  <RHFSelect
                    remoteUrl={`${API_GET_ORGANIZATION_USERS}`}
                    name="creatorIds"
                    multiple
                    placeholder="Chọn người tạo"
                    fullWidth
                    showAvatar
                  />
                </Box>
              </FormProvider>
            </Box>
          </Grid>
          <Grid item xs={9}>
            <Box >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '24px 24px 0 24px' }}>
                <Box sx={{ display: 'flex' }}>
                  <Iconify
                    onClick={onClose}
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
                  <Text fontsize={13} fontweight={"600"} color={"#455570"}>
                    {`Đã chọn ${getTotalSelected()}/${totalRecord ?? 0} câu hỏi`}
                  </Text>
                </Box>
              </Box>
              {
                isLoading ?
                  <Box sx={{
                    width: '100%',
                    height: 'calc(100vh - 64px - 68px - 70px - 60px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <CircularProgress />
                  </Box>
                  :
                  <Box mt={2} sx={{
                    height: 'calc(100vh - 64px - 68px - 70px - 60px)',
                    minHeight: 'calc(100vh - 64px - 68px - 70px - 60px)',
                    overflowY: 'scroll',
                    padding: '24px 24px 0px 24px'
                  }}>
                    {
                      items?.map((item, index) => <QuestionCardItemDefault
                        key={item.id}
                        index={index}
                        checked={isSelected(item)}
                        isDisable={isDisable(item)}
                        onChangeSelected={() => handleSelected(item)}
                        item={{ ...item, questionGroupName: questionGallary?.name }}
                      />)
                    }
                  </Box>
              }
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <Divider />
      <DialogActions sx={{ padding: '16px 24px !important' }}>
        <ButtonCancel tittle="Hủy" onClick={onClose} />
        <ButtonDS tittle="Thêm vào đề thi" onClick={addToQuestion} isDisabled={questionSelected.length == 0} />
      </DialogActions>
    </Dialog>
  )
}

export default React.memo(QuestionGallaryDetailModal)