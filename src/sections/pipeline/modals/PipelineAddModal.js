import {
  ButtonDS,
  SelectAutoCompleteDS,
  TextAreaDS,
} from "@/components/DesignSystem";
import { Text, View } from "@/components/FlexStyled";
import SvgIcon from "@/components/SvgIcon";
import { FormProvider } from "@/components/hook-form";
import { Label } from "@/components/hook-form/style";
import { ButtonCancelStyle } from "@/sections/applicant/style";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Modal } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const defaultValuess = {
  name: "",
  des: "",
};

export const PipelineAddModal = ({
  show,
  setShow,
  editData,
  onSubmit,
  onDelete,
}) => {
  const isEdit = !!editData.name;
  // form
  const ProfileSchema = Yup.object().shape({
    name: Yup.string().required("Chưa nhập tiêu chí đánh giá"),
    des: Yup.string(),
  });
  const methodss = useForm({
    defaultValuess,
    resolver: yupResolver(ProfileSchema),
  });
  const { handleSubmit } = methodss;

  const pressHide = () => {
    setShow(false);
  };

  const pressSave = handleSubmit((d) => {
    debugger;
    onSubmit?.(d);
    pressHide();
  });

  const pressDelete = () => {
    onDelete?.();
    pressHide();
  };

  // render
  const renderTitle = (title, required) => {
    return <Label required={required}>{title}</Label>;
  };
  const [selectedStatge, setSelectedStatge] = useState("");
  const [selectedExam, setSelectedExam] = useState("");
  const LIST_PIPELINE_STAGE = [
    { id: "1", value: "1", name: "Thi tuyển" },
    { id: "3", value: "3", name: "Phỏng vấn" },
  ];
  const onChangeStage = (e) => {
    setSelectedStatge(e.target.value);
  };
  const onChangeExam = (e) => {
    setSelectedExam(e.target.value);
  };
  return (
    <Modal
      open={show}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      onBackdropClick={pressHide}
    >
      <FormProvider methods={methodss}>
        <View hidden width={668} borderRadius={8} bgColor={"#fff"}>
          <View p={24}>
            <View flexRow atCenter mb={24}>
              <Text flex1 fontSize={22} fontWeight={"700"}>
                {isEdit ? "Sửa bước tuyển dụng" : "Thêm bước tuyển dụng"}
              </Text>

              <View onPress={pressHide}>
                <SvgIcon>
                  {
                    '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.74988 3.75L8.99987 9M8.99987 9L14.2499 14.25M8.99987 9L14.2499 3.75M8.99987 9L3.74988 14.25" stroke="#393B3E" stroke-width="2.025" stroke-linecap="round" stroke-linejoin="round"/></svg>'
                  }
                </SvgIcon>
              </View>
            </View>
            <View mb={24}>
              {renderTitle("Loại bước", true)}
              <SelectAutoCompleteDS
                selectedOption={selectedStatge}
                setSelectedOption={setSelectedStatge}
                onChange={onChangeStage}
                data={LIST_PIPELINE_STAGE}
                placeholder="Chọn loại bước"
              />
            </View>
            <View mb={24}>
              {renderTitle("Đề thi", true)}
              <SelectAutoCompleteDS
                selectedOption={selectedExam}
                setSelectedOption={setSelectedExam}
                onChange={onChangeExam}
                data={LIST_PIPELINE_STAGE}
                placeholder="Chọn đề thi"
              />
            </View>
            <View mb={24}>
              {renderTitle("Mô tả", true)}
              <TextAreaDS
                maxLength={255}
                placeholder="Nhập nội dung mô tả"
                name={"des"}
              />
            </View>
          </View>

          <View
            flexRow
            jcEnd
            pv={12}
            ph={16}
            bgColor={"#F8F8F9"}
            boxShadow={"inset 0px 1px 0px #EBECF4"}
          >
            {!!isEdit && (
              <>
                <LoadingButton
                  size="large"
                  variant="text"
                  color="error"
                  onClick={pressDelete}
                >
                  {"Xóa"}
                </LoadingButton>
                <View flex1 />
              </>
            )}
            <ButtonCancelStyle onClick={pressHide}>Hủy</ButtonCancelStyle>

            <ButtonDS
              type="submit"
              variant="contained"
              tittle={isEdit ? "Sửa" : "Thêm"}
              onClick={pressSave}
            />
          </View>
        </View>
      </FormProvider>
    </Modal>
  );
};
