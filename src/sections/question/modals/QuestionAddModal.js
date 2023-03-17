import { Text, View } from "@/components/FlexStyled";
import SvgIcon from "@/components/SvgIcon";
import {
  FormProvider,
  RHFSwitch,
  RHFTextField,
  RHFBasicSelect,
  RHFArrayQuestion,
  RHFUploadMultiFileCustom,
} from "@/components/hook-form";
// import { updateAssignUser } from "@/sections/jobdetail/jobDetailSlice";
import {
  PipelinePreviewItem,
  // useGetAllReviewFormMutation,
} from "@/sections/pipeline";
// import { useGetAllQuestionQuery } from "@/sections/question";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { FormHelperText, Modal, Typography } from "@mui/material";
import { Box, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const defaultValues = {
  questionTitle: "",
  answers: [
    {
      content: "",
      isCorrect: false,
    },
  ],
  questionType: 0,
  questionState: 0,
};

export const QuestionAddModal = ({  show, setShow }) => {
  // state
  // eslint-disable-next-line
  const [listForm, setListForm] = useState([]);
// eslint-disable-next-line
  const [showForm, setShowForm] = useState(false);
  // eslint-disable-next-line
  const [editItemData, setEditItemData] = useState({});
  // eslint-disable-next-line
  const [editItemIndex, setEditItemIndex] = useState(-1);

  const Schema = Yup.object().shape({
    questionTitle: Yup.string()
      .required("Chưa nhập nội dung câu hỏi")
      .max(15, "Câu hỏi giới hạn 150 ký tự"),
    answers: Yup.array()
      .of(
        Yup.object().shape({
          content: Yup.string().required("Chưa nhập nội dung trả lời"),
          isCorrect: Yup.boolean(),
        })
      )
      .required("Chưa nhập đáp án")
      .min(2, "Nhập ít nhất 2 đáp án"),
    questionType: Yup.number().required("Chưa chọn kiểu câu hỏi"),
    questionState: Yup.number().required("Chưa chọn nhóm câu hỏi"),
  });
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(Schema),
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // const pressAdd = () => {
  //   setShowForm(true);
  // };

  const pressHide = () => {
    setShow(false);
  };

  const pressSave = handleSubmit(async () => {
    // const body = {
    //   ReviewId: isEditMode ? data.ReviewId : 0,
    //   ReviewName: e.name,
    //   IsDefault: e.isDefault ? 1 : 0,
    //   Criterias: e.list.map((i) => ({
    //     CriteriaName: i.name,
    //     CriteriaNote: i.des,
    //   })),
    //   Status: e.isActive ? 1 : 0,
    // };
    // pressHide();
    // isEditMode ? await updateForm(body).unwrap() : await addForm(body).unwrap();
    // onRefreshData();
  });

  // const onAddForm = (data) => {
  //   if (editItemIndex < 0) setListForm((l) => [...l, data]);
  //   else
  //     setListForm((l) =>
  //       [...l].map((item, index) => (index === editItemIndex ? data : item))
  //     );
  // };

  // const onEditForm = (item, index) => {
  //   setEditItemIndex(index);
  //   setEditItemData(item);
  //   pressAdd();
  // };

  // const onDeleteForm = (index) => {
  //   setListForm((l) => [...l].filter((_item, _index) => index !== _index));
  // };

  const renderPreviewItem = (item, index) => {
    return <PipelinePreviewItem data={item} index={index} />;
  };

  // useEffect(() => {
  //   if (!show) {
  //     reset();
  //     setValue("name", "");
  //     setValue("isDefault", false);
  //     setValue("isActive", true);
  //     setListForm([]);
  //     setShowForm(false);
  //     return;
  //   }

  //   if (!isEditMode) return;

  //   setValue("name", data.ReviewName);
  //   setValue("isDefault", !!data.IsDefault);
  //   setValue("isActive", !!data.Status);
  //   setListForm(
  //     data.Criterias?.map?.((i) => ({
  //       name: i.CriteriaName,
  //       des: i.CriteriaNote,
  //     })) || []
  //   );
  // }, [show]);

  useEffect(() => {
    setValue("list", listForm);
    listForm.length && handleSubmit(() => {})();
  }, [listForm]);

  // useEffect(() => {
  //   if (!showForm) {
  //     setEditItemIndex(-1);
  //     setEditItemData({});
  //   }
  // }, [showForm]);

  // const { data: question } = useGetAllQuestionQuery();

  return (
    <>
      <FormProvider methods={methods}>
        <Modal
          open={show}
          sx={{ display: "flex", justifyContent: "flex-end" }}
          onBackdropClick={pressHide}
        >
          <View flexRow bgColor={"#fff"}>
            {/* preview */}
            {!!listForm.length && (
              <View
                pv={32}
                ph={24}
                width={"40vw"}
                style={{ overflow: "scroll" }}
              >
                <Text mb={40} fontSize={20} fontWeight={"700"}>
                  {"Bản xem trước"}
                </Text>

                {listForm.map(renderPreviewItem)}
              </View>
            )}
            <View width={1} height={"100%"} bgColor={"#EBECF4"} />

            {/* form */}
            <View width={"40vw"}>
              {/* header */}
              <View flexRow pv={24} ph={24} bgColor={"#FFFFFF"}>
                <Text flex1 fontSize={28} fontWeight={"600"}>
                  Thêm mới câu hỏi
                </Text>

                <View
                  contentCenter
                  size={40}
                  borderRadius={4}
                  onPress={pressHide}
                >
                  <SvgIcon>
                    {
                      '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.33325 1.33334L5.99991 6.00001M5.99991 6.00001L10.6666 10.6667M5.99991 6.00001L10.6666 1.33334M5.99991 6.00001L1.33325 10.6667" stroke="#393B3E" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'
                    }
                  </SvgIcon>
                </View>
              </View>

              {/* body */}

              <View flex1 style={{ overflow: "scroll" }}>
                <View p={24} pb={16}>
                  <Box
                    sx={{
                      display: "grid",
                      rowGap: 3,
                      columnGap: 2,
                      gridTemplateColumns: {
                        xs: "repeat(1, 1fr)",
                        sm: "repeat(2, 1fr)",
                      },
                    }}
                  >
                    <RHFBasicSelect
                      options={[1, 2, 3]}
                      name="questionType"
                      label="Kiểu câu hỏi"
                      placeholder="Chọn kiểu câu hỏi"
                      required
                    />
                    <RHFBasicSelect
                      options={[1, 2, 3]}
                      name="questionState"
                      label="Kiểu câu hỏi"
                      placeholder="Chọn kiểu câu hỏi"
                      required
                    />
                  </Box>
                </View>

                <View p={24} bgColor={"#FFFFFF"}>
                  <RHFTextField
                    isRequired
                    title="Câu hỏi"
                    multiline
                    placeholder="Nhập nội dung câu hỏi..."
                    rows={4}
                    name="questionTitle"
                  />
                </View>

                <View p={24} bgColor={"#FFFFFF"}>
                  <RHFUploadMultiFileCustom
                    showPreview
                    name="images"
                    accept="image/*"
                    maxSize={3145728}
                    // onDrop={handleDrop}
                    // onRemove={handleRemove}
                    // onRemoveAll={handleRemoveAll}
                    onUpload={() => console.log("ON UPLOAD")}
                  />
                </View>

                <Divider variant="middle" />

                <View p={24} bgColor={"#FFFFFF"}>
                  <Typography
                    variant="body1"
                    sx={{ color: "text.primary", fontWeight: "600" }}
                  >
                    Đáp án
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Chọn đáp án đúng bằng cách click vào checkbox cạnh đáp án
                  </Typography>

                  <View mt={16} borderRadius={6}>
                    <RHFArrayQuestion name="answers" />
                    {methods.formState.errors?.answers?.message && (
                      <FormHelperText error sx={{ px: 2 }}>
                        {methods.formState.errors?.answers?.message}
                      </FormHelperText>
                    )}
                  </View>
                </View>
              </View>

              {/* footer */}
              <View
                flexRow
                pv={12}
                ph={16}
                boxShadow={"inset 0px 1px 0px #EBECF4"}
              >
                <LoadingButton
                  size="large"
                  variant="contained"
                  loading={isSubmitting}
                  onClick={pressSave}
                >
                  Lưu
                </LoadingButton>
                <View width={8} />

                <LoadingButton size="large" variant="text" onClick={pressHide}>
                  {"Hủy"}
                </LoadingButton>
                <View width={8} />
                <View flex1 />

                <RHFSwitch name={"isActive"} label={"Đang hoạt động"} />
              </View>
            </View>
          </View>
        </Modal>
      </FormProvider>

      {/* modal */}
      {/* <PipelineAddModal
        show={showForm}
        editData={editItemData}
        setShow={setShowForm}
        onSubmit={onAddForm}
        onDelete={() => onDeleteForm(editItemIndex)}
      /> */}
    </>
  );
};
