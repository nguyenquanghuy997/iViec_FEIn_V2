import { ButtonDS, SwitchStatusDS, TextAreaDS } from "@/components/DesignSystem";
import { Text, View } from "@/components/DesignSystem/FlexStyled";
import Iconify from "@/components/Iconify";
import SvgIcon from "@/components/SvgIcon";
import { FormProvider, RHFTextField } from "@/components/hook-form";
import RHFDropdown from "@/components/hook-form/RHFDropdown";
import { Label } from "@/components/hook-form/style";
import { ButtonCancelStyle } from "@/sections/applicant/style";
import { ViewModel } from "@/utils/cssStyles";
import { getFileUrl } from "@/utils/helper";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Checkbox,
  CircularProgress,
  Divider,
  Modal,
  Radio,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import {
  useCreateQuestionMutation,
  useLazyGetQuestionGroupQuery,
  useUpdateQuestionMutation,
  useUploadFileExamMutation,
} from "../ExamSlice";
import ConfirmModal from "@/components/BaseComponents/ConfirmModal";
import { OrangeAlertIcon } from "@/sections/recruitment-form/icon/HeaderIcon";
import MuiInputNumber from "@/components/form/MuiInputNumber";

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
  questionType: null,
  questionPoint: 1,
  questionState: 0,
  questionGroupId: null,
  questionTitle: "",
  questionFilePaths: [],
  isActive: true,
  answers: null,
};

const defaultAnswer = {
  content: "",
  isCorrect: false,
};

const MediaItem = ({ data, onUploaded, onPressDelete }) => {
  const { file, uploadedUrl } = data;
  const [uploadFile] = useUploadFileExamMutation();

  const startUpload = async () => {
    if (!file || uploadedUrl) return;

    const formData = new FormData();
    formData.append("files", file);
    const res = await uploadFile(formData).unwrap();
    onUploaded?.(res?.fileTemplates?.[0]?.path);
  };

  useEffect(() => {
    startUpload();
  }, [file, uploadedUrl]);

  const Media = String(file?.type).includes("video") ? "video" : "img";

  return uploadedUrl ? (
    <View size={"100%"}>
      <Media
        src={getFileUrl(uploadedUrl)}
        style={{ width: "100%", height: "100%", borderRadius: 4, objectFit: "cover" }}
      />

      <View absolute t={-12} r={-12} onclick={onPressDelete}>
        <SvgIcon>
          {
            '<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_7599_56904)"><path d="M12 22.127C6.477 22.127 2 17.65 2 12.127C2 6.60395 6.477 2.12695 12 2.12695C17.523 2.12695 22 6.60395 22 12.127C22 17.65 17.523 22.127 12 22.127ZM7 11.127V13.127H17V11.127H7Z" fill="#E53935"/></g><defs><clipPath id="clip0_7599_56904"><rect width="24" height="24" fill="white" transform="translate(0 0.126953)"/></clipPath></defs></svg>'
          }
        </SvgIcon>
      </View>
    </View>
  ) : (
    <CircularProgress size={16} />
  );
};

export const QuestionFormModal = ({ data, show, onClose, getData, isNotSave = false, handleNoSave }) => {
  // props
  const isEditMode = (!isNotSave && !!data?.id) || (isNotSave && data?.questionTitle);

  // hooks
  const theme = useTheme();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  // api
  const [addForm] = useCreateQuestionMutation();
  const [updateForm] = useUpdateQuestionMutation();
  const [getQuestionGroup, { data: { items = [] } = {} }] =
    useLazyGetQuestionGroupQuery();

  // form
  const schema = Yup.object().shape({
    questionType: Yup.string().required("Chưa chọn kiểu câu hỏi").nullable(),
    questionGroupId: Yup.string().required("Chưa chọn nhóm câu hỏi").nullable(),
    questionTitle: Yup.string().required("Chưa nhập câu hỏi")
      .max(500, 'Ký tự quá dài')
      .when("questionType", {
        is: 2,
        then: Yup.string().max(2000, 'Ký tự quá dài')
      }),
    questionPoint: Yup.number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .required("Chưa nhập điểm câu hỏi")
      .min(1, 'Điểm câu hỏi phải lớn hơn 0')
      .max(100, 'Điểm câu hỏi phải nhỏ hơn 100'),
    answers: Yup.mixed().when(["questionType"], {
      is: (questionType) => {
        return questionType === '0' || questionType === '1'
      },
      then: Yup.mixed()
        .test({
          message: "Vui lòng nhập đầy đủ nội dung đáp án",
          test: (val) => !val.some((i) => !i.content),
        })
        .test({
          message: "Nội dung đáp án quá dài",
          test: (val) => !val.some((i) => i.content.length > 255),
        })
        .test({
          message: "Vui lòng chọn ít nhất 2 đáp án ",
          test: (val) => !(val.length < 2),
        })
        .test({
          message: "Vui lòng chọn nhiều nhất 6 đáp án ",
          test: (val) => !(val.length > 6),
        })
        .test({
          message: "Vui lòng chọn ít nhất một đáp án đúng",
          test: (val) => !val.length || val.some((i) => i.isCorrect),
        })
        .test({
          message: 'Đáp án không được trùng nhau',
          test: (val) => !val.some((i, index) => i.content == val[0].content && index > 0)
        })
    }),
    questionFilePaths: Yup.mixed()
      .test({
        message: 'Tối đa 6 file',
        test: (val) => !(val.length > 6)
      })
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
  const [showDuplicateAlert, setShowDuplicateAlert] = useState(false);
  const [listMedia, setListMedia] = useState([]);
  const [listAnswer, setListAnswer] = useState([defaultAnswer]);
  const isUploading = listMedia?.some((i) => !i.uploadedUrl);

  // handle
  const pressAddAnswer = () => {
    setListAnswer((l) => [...l, defaultAnswer]);
  };
  const pressDeleteAnswer = (index) => {
    setListAnswer((l) => l.filter((_, i) => i !== index));
  };

  const pressSave = handleSubmit(async (e) => {
    try {
      const body = {
        ...data,
        ...e,
        questionType: +e.questionType,
        answers: e.answers?.length > 0 && !isEssay ? e.answers : null,
        questionGroupName: items?.find(x => x.id === e.questionGroupId)?.name
      }
      // call api 
      if (!isNotSave) {
        await (e.id ? updateForm(body) : addForm(body)).unwrap();
        if (getData)
          getData();
        onClose();
        enqueueSnackbar(isEditMode ? 'Chỉnh sửa câu hỏi thành công' : 'Thêm mới câu hỏi thành công')
      }
      // không call api

      if (handleNoSave) {
        handleNoSave(body)
      }
    } catch (error) {
      if (error.status === "QGE_04")
        setShowDuplicateAlert(true)
    }
  });

  const changeAnswer = (index, key, value) => {
    setListAnswer((l) =>
      l?.map((i, j) =>
        j === index
          ? { ...i, [key]: value }
          : key === "isCorrect" && !isMultipleChoice
            ? { ...i, isCorrect: false }
            : i
      )
    );
  };

  // callback
  const onSelectMedia = (e) => {
    const list = e.target.files;
    const r = [];
    for (let i = 0; i < list.length; i++) {
      if (list[i].size > 5000000)
        enqueueSnackbar("Dung lượng file không được vượt quá 5MB", {
          variant: "warning",
        });
      else r.push({ file: list[i], uploadedUrl: "" });
    }
    setListMedia((l) => [...l, ...r].slice(0, 6));
  };

  const onUploadedMedia = (index, url) => {
    setListMedia((l) =>
      l?.map((i, j) => (j === index ? { ...i, uploadedUrl: url } : i))
    );
  };

  const onDeleteMedia = (index) => {
    setListMedia((l) => l.filter((_, i) => i !== index));
  };

  // render
  const renderTitle = (title, required) => {
    return <Label required={required}>{title}</Label>;
  };

  const renderButton = (content, onPress) => {
    return (
      <View contentcenter='true' size={44} ml={16} onclick={onPress}>
        <SvgIcon>{content}</SvgIcon>
      </View>
    );
  };

  const renderMediaItem = (item, index) => {
    return (
      <View
        contentcenter
        ml={index ? 10 : 0}
        size={80}
        borderradius={4}
        bgcolor={theme.palette.background.bgrObject}
      >
        {item ? (
          <MediaItem
            data={item}
            onUploaded={(url) => onUploadedMedia(index, url)}
            onPressDelete={() => onDeleteMedia(index)}
          />
        ) : (
          <>
            <SvgIcon>
              {`<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.0007 10.127V12.127H16.0007V13.4603H14.0007V15.4603H12.6673V13.4603H10.6673V12.127H12.6673V10.127H14.0007ZM14.006 2.12695C14.3713 2.12695 14.6673 2.42362 14.6673 2.78895V9.02162C14.2391 8.87035 13.7882 8.79324 13.334 8.79362V3.46029H2.66732L2.66798 12.7936L8.86265 6.59829C8.97729 6.48327 9.13 6.41411 9.29206 6.40379C9.45412 6.39348 9.61436 6.44273 9.74265 6.54229L9.80465 6.59895L12.1687 8.96562C11.6517 9.12313 11.1721 9.38369 10.7586 9.73159C10.3451 10.0795 10.0064 10.5075 9.76282 10.9899C9.51924 11.4722 9.37587 11.9989 9.34135 12.5382C9.30684 13.0775 9.38189 13.6181 9.56199 14.1276L1.99532 14.127C1.81986 14.1268 1.65165 14.057 1.52764 13.9328C1.40364 13.8087 1.33398 13.6404 1.33398 13.465V2.78895C1.3352 2.61387 1.40525 2.4463 1.52899 2.32243C1.65273 2.19857 1.82024 2.12835 1.99532 2.12695H14.006ZM5.33398 4.79362C5.68761 4.79362 6.02674 4.9341 6.27679 5.18414C6.52684 5.43419 6.66732 5.77333 6.66732 6.12695C6.66732 6.48058 6.52684 6.81971 6.27679 7.06976C6.02674 7.31981 5.68761 7.46029 5.33398 7.46029C4.98036 7.46029 4.64122 7.31981 4.39118 7.06976C4.14113 6.81971 4.00065 6.48058 4.00065 6.12695C4.00065 5.77333 4.14113 5.43419 4.39118 5.18414C4.64122 4.9341 4.98036 4.79362 5.33398 4.79362Z" fill="#8A94A5"/></svg>`}
            </SvgIcon>

            <input
              multiple
              type="file"
              accept={"image/*, video/*"}
              style={{
                top: 0,
                left: 0,
                right: 0,
                opacity: 0,
                bottom: 0,
                position: "absolute",
              }}
              onChange={onSelectMedia}
            />
          </>
        )}
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
        bgcolor={theme.palette.common.bgrMaster}
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

        <Text fontweight={"500"} pr={'12px'}>{`${String.fromCharCode(65 + index)})`}</Text>
        <RHFTextField
          value={content}
          name="question"
          placeholder={"Nhập nội dung..."}
          onChange={(e) => changeAnswer(index, "content", e.target.value)}
          fullWidth
          maxLength={255}
        />

        {index === listAnswer.length - 1 && listAnswer.length < 6
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
    if (data?.id || data?.questionTitle) {
      setValue("id", data.id);
      setValue("questionType", data.questionType);
      setValue("questionTitle", data.questionTitle);
      setValue("questionPoint", data.questionPoint);
      setValue("questionGroupId", data.questionGroupId);
      setValue("isActive", !!data.isActive);
      setListAnswer(data.answers);
      setListMedia(data.questionFilePaths?.map((i) => ({ uploadedUrl: i })));
      return;
    }
    if (show) {
      reset({ ...defaultValues, questionGroupId: router.query.slug });
      setListAnswer([defaultAnswer]);
      setListMedia([])
      getQuestionGroup()
    }

  }, [show, isEditMode]);

  useEffect(() => {
    // setListAnswer(isEssay ? [] : [defaultAnswer]);
    setValue("questionPoint", isEssay ? data?.questionPoint ?? 1 : 1)
  }, [isEssay]);

  useEffect(() => {
    if (!isMultipleChoice) return;
    setListAnswer((l) => l?.map((i) => ({ ...i, isCorrect: i.isCorrect })));
  }, [isMultipleChoice]);

  useEffect(() => {
    setError("answers", {});
    setValue("answers", listAnswer);
  }, [listAnswer]);

  useEffect(() => {
    setValue(
      "questionFilePaths",
      listMedia?.map((i) => i.uploadedUrl)
    );
  }, [listMedia]);

  return (
    <>
      <FormProvider methods={methods}>
        <Modal
          open={show}
          onClose={onClose}
          sx={{ display: "flex", justifyContent: "flex-end", ".MuiModal-backdrop": { background: "rgba(9, 30, 66, 0.25)" } }}
        >
          <ViewModel>
            {/* header */}
            <View
              flexrow="true"
              atcenter="center"
              pv={12}
              ph={24}
              bgcolor={theme.palette.common.white}
            >
              <Text flex="true" fontsize={16} fontweight={"600"}>
                {isEditMode ? "Chỉnh sửa câu hỏi" : !data?.questionTitle ? "Thêm mới câu hỏi" : "Sao chép câu hỏi"}
              </Text>
              <ButtonDS
                type="submit"
                sx={{
                  backgroundColor: theme.palette.background.paper,
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
                    color={theme.palette.common.borderObject}
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

              <View mt={24}>
                {renderTitle("Câu hỏi", true)}

                <TextAreaDS
                  isRequired
                  rows={4}
                  name={"questionTitle"}
                  placeholder={"Nhập nội dung câu hỏi..."}
                />
              </View>

              <View flexrow mt={24}>
                {[...(listMedia ?? []), null].slice(0, 6).map(renderMediaItem)}
              </View>

              <View mv={24} width={'50%'}>
                {renderTitle("Điểm câu hỏi", true)}

                <MuiInputNumber
                  name={"questionPoint"}
                  disabled={!isEssay}
                  placeholder={"Nhập điểm câu hỏi"}
                />
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

                    {listAnswer?.map(renderAnswerItem)}
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
                isDisabled={isUploading}
                tittle={'Lưu'}
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
          </ViewModel >
        </Modal >
      </FormProvider >

      {showDuplicateAlert && (
        <ConfirmModal
          open={showDuplicateAlert}
          onClose={() => setShowDuplicateAlert(false)}
          icon={<OrangeAlertIcon />}
          title={"Câu hỏi đã tồn tại, không thể lưu"}
          titleProps={{
            sx: {
              color: theme.palette.common.orange800,
              fontWeight: 600,
              marginBottom: 1,
            },
          }}
          subtitle={
            "Trong nhóm này đã tồn tại câu hỏi khác có cùng nội dung trùng khớp với câu hỏi vừa tạo. Vui lòng kiểm tra lại hoặc thay đổi nội dung."
          }
          onSubmit={() => setShowDuplicateAlert(false)}
          btnCancelProps={{ title: "" }}
          btnConfirmProps={{
            title: "Tôi đã hiểu",
            color: "dark",
          }}
        />
      )}
    </>
  );
}