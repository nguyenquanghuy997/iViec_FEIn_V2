import { ButtonDS } from "@/components/DesignSystem";
import { Text, View } from "@/components/DesignSystem/FlexStyled";
import Iconify from "@/components/Iconify";
import MuiInputNumber from "@/components/form/MuiInputNumber";
import { FormProvider, RHFSelect } from "@/components/hook-form";
import { Label } from "@/components/hook-form/style";
import { ButtonCancelStyle } from "@/sections/applicant/style";
import { useGetQuestionGroupQuery } from "@/sections/exam/ExamSlice";
import { ViewModel } from "@/utils/cssStyles";
import { LIST_QUESTION_TYPE } from "@/utils/formatString";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Divider,
  Grid,
  InputAdornment,
  Modal,
  Tooltip,
} from "@mui/material";
import { useRef } from "react";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { RiDeleteBin6Line } from "react-icons/ri";
import * as Yup from "yup";

const defaultValuess = {
  questionGroup: [],
};

export const AddQuestionGroupModel = ({
  show,
  setShow,
  editData,
  onSubmit,
}) => {
  const isEdit = !!editData?.name;
  const { data: { items: Data = [] } = {} } = useGetQuestionGroupQuery({
    IsActive: "true",
  });
  var ListQuestionGroup = Data?.filter((p) => p.numOfQuestion > 0);
  // form
  const Schema = Yup.object().shape({
    questionGroup: Yup.array().of(
      Yup.object().shape({
        questionGroupId: Yup.string().required("Chưa chọn nhóm câu hỏi"),
        questionTypeId: Yup.string().required("Chưa chọn loại câu hỏi"),
        quantity: Yup.number()
          .transform((value) => (isNaN(value) ? undefined : value))
          .min(1, "Số câu hỏi phải lớn hơn 0")
          .max(
            Yup.ref("quantityOfQuestion"),
            "Số câu hỏi phải nhỏ hơn số câu hỏi trong nhóm"
          )
          .required("Chưa nhập số câu hỏi"),
      })
    ),
  });

  const methodss = useForm({
    mode: "onChange",
    defaultValuess,
    resolver: yupResolver(Schema),
  });

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { isSubmitting },
  } = methodss;

  const pressHide = () => {
    setShow(false);
  };
  const pressSave = handleSubmit(async (d) => {
    const data = d.questionGroup.map((x) => {
      return {
        ...x,
        questionGroup: ListQuestionGroup.find(
          (y) => y.id === x.questionGroupId
        ),
      };
    });
    // const data = {
    //   ...d,
    // };
    onSubmit?.(data);
    pressHide();
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questionGroup",
  });

  const isInit = useRef(true);
  useEffect(() => {
    if (isInit.current) {
      append({
        questionGroupId: "",
        quantity: "",
      });
      isInit.current = false;
    }
  }, []);
  const changeQuestionType = (index, value) => {
    if (watch(`questionGroup.${index}.questionGroupId`)) {
      const number = ListQuestionGroup.find(
        (p) => p?.id == watch(`questionGroup.${index}.questionGroupId`)
      );
      if (value == 1) {
        setValue(
          `questionGroup.${index}.quantityOfQuestion`,
          number?.numOfQuestionMultipleChoice
        );
      } else {
        setValue(
          `questionGroup.${index}.quantityOfQuestion`,
          number?.numOfQuestionEssay
        );
      }
    }
  };

  return (
    <FormProvider methods={methodss}>
      <Modal
        open={show}
        onClose={pressHide}
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
              {isEdit
                ? "Chỉnh sửa nhóm câu hỏi"
                : "Thêm nhóm câu hỏi vào đề thi"}
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
              onClick={pressHide}
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
            {fields.map((item, index) => {
              return (
                <View
                  flexrow="true"
                  atcenter="true"
                  p={16}
                  mb={16}
                  borderradius={6}
                  bgcolor={"#F2F4F5"}
                  key={item.id}
                >
                  <View flex="true" mh={12} color="#455570" width={"50%"}>
                    <View mb={16}>
                      <Label required={true}>{"Nhóm câu hỏi"}</Label>
                      <RHFSelect
                        options={ListQuestionGroup?.map((p) => ({
                          value: p?.id,
                          label: p?.name,
                        }))}
                        name={`questionGroup.${index}.questionGroupId`}
                        placeholder="Chọn nhóm câu hỏi"
                        fullWidth
                      />
                    </View>
                    <Label required={true}>{"Số câu hỏi đưa vào đề thi"}</Label>
                    <Grid container mb={3} flexDirection={"row"}>
                      <Grid item xs={6} pr={"12px"}>
                        <RHFSelect
                          options={LIST_QUESTION_TYPE?.map((p) => ({
                            value: p?.id,
                            label: p?.name,
                          }))}
                          name={`questionGroup.${index}.questionTypeId`}
                          placeholder="Chọn loại câu hỏi"
                          fullWidth
                          onChange={(e) => changeQuestionType(index, e)}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <MuiInputNumber
                          name={`questionGroup.${index}.quantity`}
                          placeholder={"Nhập số câu hỏi"}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="start">
                                /{" "}
                                {watch(
                                  `questionGroup.${index}.quantityOfQuestion`
                                ) || 0}
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                    </Grid>
                  </View>

                  <View flexrow="false" atcenter="true">
                    <Tooltip title="Xóa">
                      <>
                        {fields.length > 1 ? (
                          <RiDeleteBin6Line
                            color="#E53935"
                            onClick={() => remove(index)}
                            cursor="pointer"
                          />
                        ) : (
                          <RiDeleteBin6Line
                            color="#E53935"
                            onClick={() => remove(index)}
                            cursor="#A2AAB7"
                          />
                        )}
                      </>
                    </Tooltip>
                  </View>
                </View>
              );
            })}

            {/* dept */}
            <View pv={24}>
              <ButtonDS
                type="submit"
                loading={isSubmitting}
                variant="contained"
                tittle={"Thêm tiêu chí đánh giá"}
                onClick={() => {
                  append({
                    questionGroupId: "",
                    quantity: "",
                  });
                }}
                sx={{
                  marginBottom: "16px",
                  textTransform: "unset",
                  boxShadow: "unset",
                  backgroundColor: "#fff",
                  color: "#1976D2",
                  border: "1px solid #1976D2",
                  "&:hover": { backgroundColor: "#EFF3F7" },
                }}
                icon={
                  <Iconify
                    icon={"material-symbols:add"}
                    width={20}
                    height={20}
                    color="#1976D2"
                    mr={1}
                  />
                }
              />
            </View>
          </View>
          {/* footer */}
          <View
            flexrow="true"
            pv={12}
            ph={16}
            boxshadow={"inset 0px 1px 0px #EBECF4"}
          >
            <ButtonDS
              type="submit"
              loading={isSubmitting}
              variant="contained"
              tittle={isEdit ? "Lưu" : "Thêm"}
              onClick={pressSave}
            />
            <View width={8} />
            <ButtonCancelStyle onClick={pressHide}>Hủy</ButtonCancelStyle>
            <View width={8} />
            <View flex="true" />
          </View>
        </ViewModel>
      </Modal>
    </FormProvider>
  );
};
