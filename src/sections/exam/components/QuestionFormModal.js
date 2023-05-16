import {
  useCreateQuestionMutation,
  useLazyGetQuestionGroupQuery,
  useUpdateQuestionMutation,
} from "../ExamSlice";
import { ButtonDS, SwitchStatusDS } from "@/components/DesignSystem";
import { Text, View } from "@/components/DesignSystem/FlexStyled";
import Iconify from "@/components/Iconify";
import SvgIcon from "@/components/SvgIcon";
import MuiInputNumber from "@/components/form/MuiInputNumber";
import { FormProvider, RHFTextField } from "@/components/hook-form";
import RHFDropdown from "@/components/hook-form/RHFDropdown";
import { Label } from "@/components/hook-form/style";
import { ButtonCancelStyle } from "@/sections/applicant/style";
import { ViewModel } from "@/utils/cssStyles";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Checkbox,
  Divider,
  Modal,
  Radio,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import React from "react";

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

const defaultValues = {
  id: null,
  questionType: 0,
  questionPoint: 0,
  questionState: 0,
  questionGroupId: "",
  questionTitle: "",
  isActive: true,
  answers: [],
};

const defaultAnswer = {
  content: "",
  isCorrect: false,
};

const QuestionFormModal = ({ data, show, onClose, getData, isNotSave, handleNoSave }) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  // props
  const isEditMode = !!data?.id || data?.questionTitle;

  // other
  // const { enqueueSnackbar } = useSnackbar();

  // api
  const [addForm] = useCreateQuestionMutation();
  const [updateForm] = useUpdateQuestionMutation();
  const [getQuestionGroup, { data: { items = [] } = {} }] =
    useLazyGetQuestionGroupQuery();

  // form
  const schema = Yup.object().shape({
    questionGroupId: Yup.string().required("Chưa chọn nhóm câu hỏi"),
    questionTitle: Yup.string().required("Chưa nhập câu hỏi"),
    questionPoint: Yup.number().typeError('Chưa nhập điểm câu hỏi').required("Chưa nhập điểm câu hỏi").min(1, 'Điểm câu hỏi phải lớn hơn 0'),
    answers: Yup.mixed()
      .test({
        message: "Vui lòng nhập đầy đủ nội dung đáp án",
        test: (val) => !val.some((i) => !i.content),
      })
      .test({
        message: "Vui lòng chọn ít nhất một đáp án đúng",
        test: (val) => !val.length || val.some((i) => i.isCorrect),
      }),
  });
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const {
    reset,
    setValue,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  // watch
  const isEssay = methods.watch("questionType") === 2;
  const isActive = methods.watch("isActive");
  const isMultipleChoice = methods.watch("questionType") === 1;

  // state
  const [listAnswer, setListAnswer] = useState([defaultAnswer]);

  // handle
  const pressAddAnswer = () => {
    setListAnswer((l) => [...l, defaultAnswer]);
  };

  const pressDeleteAnswer = (index) => {
    setListAnswer((l) => l.filter((_, i) => i !== index));
  };

  const pressSave = handleSubmit(async (e) => {
    try {
      if (isNotSave) {
        const data = {
          ...e,
          questionGroupName: items.find(x => x.id === e.questionGroupId).name
        }
        handleNoSave(data)
      }
      else {
        const body = { ...e };
        await (e.id ? updateForm(body) : addForm(body)).unwrap();
        enqueueSnackbar(isEditMode ? 'Chỉnh sửa câu hỏi thành công' : 'Thêm mới câu hỏi thành công')
        getData();
      }

    } catch (error) {
      if (error.status == 'QGE_04')
        enqueueSnackbar("Câu hỏi đã tồn tại trong nhóm câu hỏi", {
          autoHideDuration: 1000,
          variant: "error",
        });
    }
  });

  const changeAnswer = (index, key, value) => {
    setListAnswer((l) =>
      l.map((i, j) =>
        j === index
          ? { ...i, [key]: value }
          : key === "isCorrect" && !isMultipleChoice
            ? { ...i, isCorrect: false }
            : i
      )
    );
  };

  // render
  const renderTitle = (title, required) => {
    return <Label required={required}>{title}</Label>;
  };

  const renderButton = (content, onPress) => {
    return (
      <View contentcenter='true' size={44} ml={16} onClick={onPress}>
        <SvgIcon>{content}</SvgIcon>
      </View>
    );
  };

  const renderAnswerItem = ({ content, isCorrect }, index) => {
    const Cb = isMultipleChoice ? Checkbox : Radio;
    return (
      <View
        key={index}
        flexrow='true'
        atcenter='true'
        mt={24}
        p={16}
        borderradius={6}
        bgcolor={"#F2F4F5"}
      >
        <Cb
          checked={isCorrect}
          onClick={() =>
            changeAnswer(
              index,
              "isCorrect",
              isMultipleChoice ? !isCorrect : true
            )
          }
        />

        <Text fontweight={"500"}>{`${String.fromCharCode(65 + index)})`}</Text>

        <TextField
          value={content}
          placeholder={"Nhập nội dung..."}
          onChange={(e) => changeAnswer(index, "content", e.target.value)}
          style={{
            flex: 1,
            marginLeft: 12,
            borderRadius: 6,
            background: "#fff",
          }}
        />

        {index === listAnswer.length - 1
          ? renderButton(
            `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.16602 9.16699V4.16699H10.8327V9.16699H15.8327V10.8337H10.8327V15.8337H9.16602V10.8337H4.16602V9.16699H9.16602Z" fill="#388E3C"/></svg>`,
            pressAddAnswer
          )
          : null}

        {index
          ? renderButton(
            `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.16602 9.16699H15.8327V10.8337H4.16602V9.16699Z" fill="#E53935"/></svg>`,
            () => pressDeleteAnswer(index)
          )
          : null}
      </View>
    );
  };

  // effect
  useEffect(() => {
    getQuestionGroup();
  }, []);

  useEffect(() => {
    if (!show || !isEditMode) {
      reset({ ...defaultValues, questionGroupId: router.query.slug });
      setListAnswer([defaultAnswer]);

      return;
    }

    setValue("id", data.id);
    setValue("questionType", data.questionType);
    setValue("questionTitle", data.questionTitle);
    setValue("questionPoint", data.questionPoint);
    setValue("questionGroupId", data.questionGroupId);
    setValue("isActive", !!data.isActive);
    setListAnswer(data.answers);
  }, [show, isEditMode]);

  useEffect(() => {
    setListAnswer(isEssay ? [] : [defaultAnswer]);
  }, [isEssay]);

  useEffect(() => {
    if (isMultipleChoice) return;
    setListAnswer((l) => l.map((i) => ({ ...i, isCorrect: false })));
  }, [isMultipleChoice]);

  useEffect(() => {
    setError("answers", {});
    setValue("answers", listAnswer);
  }, [listAnswer]);

  return (
    <FormProvider methods={methods}>
      <Modal
        open={show}
        onClose={onClose}
        sx={{ display: "flex", justifyContent: "flex-end" }}
      >
        <ViewModel>
          {/* header */}
          <View
            flexrow="true"
            atcenter="center"
            pv={12}
            ph={24}
            bgcolor={"#FDFDFD"}
          >
            <Text flex="true" fontsize={16} fontweight={"600"}>
              {isEditMode ? "Chỉnh sửa câu hỏi" : "Thêm mới câu hỏi"}
            </Text>
            <ButtonDS
              type="submit"
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
          </View>
          <Divider />

          {/* body */}
          <View flex="true" p={24} pb={28} style={{ overflowY: "scroll" }}>
            <View flexrow='true'>
              <View flex={1}>
                {renderTitle("Kiểu câu hỏi", true)}

                <RHFDropdown
                  options={LIST_QUESTION_TYPE}
                  name={"questionType"}
                  placeholder={"Chọn kiểu câu hỏi"}
                />
              </View>

              <View flex={1} ml={24}>
                {renderTitle("Nhóm câu hỏi", true)}

                <RHFDropdown
                  options={items?.map((i) => ({
                    ...i,
                    value: i.id,
                    label: i.name,
                  }))}
                  name={"questionGroupId"}
                  placeholder={"Chọn nhóm câu hỏi"}
                />
              </View>
            </View>

            <View mv={24}>
              {renderTitle("Câu hỏi", true)}

              <RHFTextField
                multiline
                isRequired
                rows={4}
                name={"questionTitle"}
                placeholder={"Nhập nội dung câu hỏi..."}
              />
            </View>

            <View mv={24}>
              <View width={'50%'}>
                {renderTitle("Điểm câu hỏi", true)}

                <MuiInputNumber
                  isRequired
                  name={"questionPoint"}
                  placeholder={"Nhập điểm câu hỏi..."}
                />
              </View>

            </View>

            {!isEssay && (
              <>
                <Divider />

                <View mt={24}>
                  <Text fontsize={16} fontweight={600}>
                    {"Đáp án"}
                  </Text>

                  {errors.answers?.message && (
                    <Alert severity="error" style={{ marginTop: 24 }}>
                      {errors.answers?.message}
                    </Alert>
                  )}

                  {listAnswer.map(renderAnswerItem)}
                </View>
              </>
            )}
          </View>

          {/* footer */}
          <View
            flexrow="true"
            pv={16}
            ph={24}
            boxshadow={"inset 0px 1px 0px #EBECF4"}
          >
            <ButtonDS
              type={"submit"}
              variant={"contained"}
              loading={isSubmitting}
              tittle={isEditMode ? "Sửa" : "Thêm"}
              onClick={pressSave}
            />
            <View width={8} />
            <ButtonCancelStyle onClick={onClose}>Hủy</ButtonCancelStyle>
            <View width={8} />
            <View flex="true" />

            <SwitchStatusDS
              name={"isActive"}
              label={isActive ? "Đang hoạt động" : "Không hoạt động"}
            />
          </View>
        </ViewModel>
      </Modal>
    </FormProvider>
  );
}

export default React.memo(QuestionFormModal)

