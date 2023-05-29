import { useGetQuestionGroupQuery } from "../ExamFormSlice";
import { ButtonDS } from "@/components/DesignSystem";
import { Text, View } from "@/components/DesignSystem/FlexStyled";
import Iconify from "@/components/Iconify";
import MuiInputNumber from "@/components/form/MuiInputNumber";
import { FormProvider, RHFSelect } from "@/components/hook-form";
import { Label } from "@/components/hook-form/style";
import { ButtonCancelStyle } from "@/sections/applicant/style";
import { ButtonIcon } from "@/utils/cssStyles";
import { LIST_QUESTION_TYPE } from "@/utils/formatString";
import { yupResolver } from "@hookform/resolvers/yup";
import { Divider, Grid, InputAdornment, Modal } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

export const UpdateQuestionGroupModel = ({
  show,
  onSubmit,
  onClose,
  editData,
}) => {
  const { data: { items: Data = [] } = {} } = useGetQuestionGroupQuery({
    IsActive: "true",
  });
  var ListQuestionGroup = Data?.filter((p) => p.numOfQuestion > 0);
  // form
  const Schema = Yup.object().shape({
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
  });

  const methodss = useForm({
    resolver: yupResolver(Schema),
  });

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methodss;

  const pressSave = handleSubmit(async (d) => {
    const data = {
      ...editData,
      ...d,
    };
    onSubmit?.(data);
  });

  useEffect(() => {
    if (editData?.questionGroupId) {
      setValue("questionGroupId", editData?.questionGroupId);
      setValue("quantity", editData?.quantity);
      setValue("questionTypeId", Number(editData?.questionTypeId));
      setValue("quantityOfQuestion", editData?.quantityOfQuestion);
      return;
    }
  }, []);
  const changeQuestionType = (value) => {
    if (watch(`questionGroupId`)) {
      const number = ListQuestionGroup.find(
        (p) => p?.id == watch(`questionGroupId`)
      );
      if (value == 1) {
        setValue(`quantityOfQuestion`, number?.numOfQuestionMultipleChoice);
      } else {
        setValue(`quantityOfQuestion`, number?.numOfQuestionEssay);
      }
    }
  };

  return (
    <Modal
      open={show}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      onBackdropClick={onClose}
    >
      <>
        <FormProvider methods={methodss}>
          <View hidden width={668} borderradius={8} bgcolor={"#FDFDFD"}>
            <View flexrow="true" atcenter="true" pv={22} ph={24}>
              <Text flex fontsize={16} fontweight={"700"}>
                {"Sửa nhóm câu hỏi"}
              </Text>

              <ButtonIcon
                onClick={onClose}
                icon={
                  <Iconify
                    icon={"ic:baseline-close"}
                    width={20}
                    height={20}
                    color="#455570"
                  />
                }
              />
            </View>
            <Divider />
            <View p={24}>
              <View mb={28}>
                <Label required={true}>{"Nhóm câu hỏi"}</Label>
                <RHFSelect
                  options={ListQuestionGroup?.map((p) => ({
                    value: p?.id,
                    label: p?.name,
                  }))}
                  name={`questionGroupId`}
                  placeholder="Chọn nhóm câu hỏi"
                  fullWidth
                />
              </View>
              <Label required={true}>{"Câu hỏi đưa vào đề thi"}</Label>
              <Grid container mb={3} flexDirection={"row"}>
                <Grid item xs={6} pr={"12px"}>
                  <RHFSelect
                    options={LIST_QUESTION_TYPE?.map((p) => ({
                      value: p?.id,
                      label: p?.name,
                    }))}
                    name={`questionTypeId`}
                    placeholder="Chọn loại câu hỏi"
                    fullWidth
                    onChange={(e) => changeQuestionType(e)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <MuiInputNumber
                    name={`quantity`}
                    placeholder={"Nhập số câu hỏi"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          / {watch(`quantityOfQuestion`) || 0}
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </View>
            <Divider />
            <View flexrow="true" jcend="true" pv={16} ph={24}>
              <ButtonCancelStyle sx={{ marginRight: "8px" }} onClick={onClose}>
                Hủy
              </ButtonCancelStyle>

              <ButtonDS
                type="submit"
                variant="contained"
                loading={isSubmitting}
                tittle={"Lưu"}
                onClick={pressSave}
              />
            </View>
          </View>
        </FormProvider>
      </>
    </Modal>
  );
};
