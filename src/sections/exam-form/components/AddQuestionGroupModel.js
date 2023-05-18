import { ButtonDS } from "@/components/DesignSystem";
import { Text, View } from "@/components/DesignSystem/FlexStyled";
import Iconify from "@/components/Iconify";
import MuiInputNumber from "@/components/form/MuiInputNumber";
import { FormProvider, RHFSelect } from "@/components/hook-form";
import { Label } from "@/components/hook-form/style";
import { ButtonCancelStyle } from "@/sections/applicant/style";
import { useGetQuestionGroupQuery } from "@/sections/exam/ExamSlice";
import { ViewModel } from "@/utils/cssStyles";
import { yupResolver } from "@hookform/resolvers/yup";
import { Divider, Modal, Tooltip } from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";
import { RiDeleteBin6Line } from "react-icons/ri";
import * as Yup from "yup";

const defaultValuess = {
  name: "",
  des: "",
};

export const AddQuestionGroupModel = ({
  show,
  setShow,
  editData,
  onSubmit,
}) => {
  const isEdit = !!editData?.name;
  const { data: { items: ListQuestionGroup = [] } = {} } =
    useGetQuestionGroupQuery({ IsActive: "true" });

  // form
  const Schema = Yup.object().shape({
    questionGroupId: Yup.string().required("Chưa chọn nhóm câu hỏi"),
    quantity: Yup.number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .min(1, "Số câu hỏi phải lớn hơn 0")
      .required("Chưa nhập số câu hỏi"),
  });

  const methodss = useForm({
    defaultValuess,
    resolver: yupResolver(Schema),
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = methodss;

  const pressHide = () => {
    setShow(false);
  };
  const pressSave = handleSubmit(async (d) => {
    const data = {
      ...d,
      questionGroup: ListQuestionGroup.find((x) => x.id === d.questionGroupId),
    };
    onSubmit?.(data);
    pressHide();
  });

  // useEffect(() => {
  //   if (!isEdit) {
  //     setValue("id", "");
  //     setValue("name", "");
  //     setValue("des", "");
  //     setIsActive(false);
  //     return;
  //   } else {
  //     setValue("id", editData.id);
  //     setValue("name", editData.name);
  //     setValue("des", editData.description);
  //     setIsActive(editData.isActive);
  //   }
  // }, []);

  /**
   * Hàm xử lý sự kiện thêm hoặc sửa câu hỏi
   * @param {*} data
   */
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questionGroup",
  });
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
                        allowClear
                        fullWidth
                      />
                    </View>
                    <View mb={16}>
                      <Label required={true}>
                        {"Số câu hỏi đưa vào đề thi"}
                      </Label>
                      <MuiInputNumber
                        name={`questionGroup.${index}.quantity`}
                        placeholder={"Nhập số câu hỏi đưa vào đề thi"}
                      />
                    </View>
                  </View>

                  <View flexrow="false" atcenter="true">
                    <Tooltip title="Xóa">
                      <RiDeleteBin6Line
                        color="#E53935"
                        onClick={() => remove(index)}
                        cursor="pointer"
                      />
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
          ;{/* footer */}
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
