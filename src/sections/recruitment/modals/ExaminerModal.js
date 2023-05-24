import { ButtonDS } from "@/components/DesignSystem";
import { Text } from "@/components/DesignSystem/FlexStyled";
import Iconify from "@/components/Iconify";
import MuiDatePicker from "@/components/form/MuiDatePicker";
import { FormProvider, RHFSelect } from "@/components/hook-form";
import { LabelStyle } from "@/components/hook-form/style";
import { API_GET_ORGANIZATION_USERS } from "@/routes/api";
import palette from "@/theme/palette";
import { ButtonCancel } from "@/utils/cssStyles";
import { prefixZero } from "@/utils/helper";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

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

function ExaminerModal({
  show,
  onClose,
  questionGallary,
}) {
  // const [getQuestions, { data: { items = [], totalRecord } = {} }] =
  //   useLazyGetQuestionsQuery();

  const [questionSelected, ] = useState([]);

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      searchKey: null,
      createdTimeFrom: null,
      createdTimeTo: null,
      type: null,
      creatorIds: null,
    },
  });

  const { handleSubmit } = methods;

  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      open={show}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiPaper-root": {
          top: "0 !important",
          borderRadius: "6px !important",
        },
      }}
    >
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        px={"24px"}
        py={"12px"}
        bgcolor={"#FDFDFD"}
      >
        <Text flex="true" fontsize={16} fontweight={"600"}>
          {"Chấm thi"}
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
            <Iconify icon={"mi:close"} width={20} height={20} color="#5C6A82" />
          }
        />
      </Box>
      <Divider />

      <DialogContent
        sx={{
          backgroundColor: "#F2F4F5",
          padding: 0,
          display: "flex !important",
          flex: "1 1 auto",
          alignItems: "stretch",
        }}
      >
        <Grid container spacing={0} alignItems={"stretch"}>
          <Grid item xs={9}>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "24px 24px 0 24px",
                }}
              >
                <Box sx={{ display: "flex" }}>
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
                  <Text
                    fontsize={13}
                    fontweight={"600"}
                    color={"#455570"}
                  ></Text>
                </Box>
              </Box>
              
              {/* {
                !isLoading &&
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
              } */}
            </Box>
          </Grid>
          <Grid item xs={3} sx={{ background: "#FDFDFD" }}>
            <Box padding={"24px"}>
              <FormProvider methods={methods} onSubmit={handleSubmit}>
                <Typography fontsize={16} fontweight={"600"} color={"#455570"}>
                  Danh sách câu hỏi
                </Typography>
                
                <Box sx={{ mt: 3 }}>
                <Typography
        variant="subtitle1"
        component="h3"
        className="question-title"
        sx={{ mb: 2 }}
      >
        <span style={{ color: palette.text.active }}>
          Câu hỏi {prefixZero( + 1)}:{" "}
        </span>
        {/* {question.questionTitle} {`(${question.questionPoint} điểm)`} */}
      </Typography>

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
                    allowClear
                  />
                </Box>
              </FormProvider>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <Divider />
      <DialogActions sx={{ padding: "16px 24px !important" }}>
        <ButtonCancel tittle="Hủy" onClick={onClose} />
        <ButtonDS
          tittle="Gửi kết quả"
          onClick={""}
          isDisabled={questionSelected.length == 0}
        />
      </DialogActions>
    </Dialog>
  );
}

export default React.memo(ExaminerModal);
