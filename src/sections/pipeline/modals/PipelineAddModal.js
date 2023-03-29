import {
  ButtonDS,
  SelectAutoCompleteDS,
  TextAreaDS,
} from "@/components/DesignSystem";
import { View, Text } from "@/components/DesignSystem/FlexStyled";
import Iconify from "@/components/Iconify";
import { FormProvider } from "@/components/hook-form";
import { Label } from "@/components/hook-form/style";
import { ButtonCancelStyle } from "@/sections/applicant/style";
import { ButtonIcon } from "@/utils/cssStyles";
import { LoadingButton } from "@mui/lab";
import { FormHelperText, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const defaultValuess = {
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
  const methodss = useForm({
    defaultValuess,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methodss;

  const pressHide = () => {
    setShow(false);
  };
  const [error, setError] = useState(false);
  const pressSave = handleSubmit(async (d) => {
    const data = {
      stageType: selectedStatge,
      des: d.des,
    };
    if (selectedStatge == "") {
      setError(true);
    } else{
      onSubmit?.(data);
      pressHide();
    }
     
    
  });
  const pressDelete = () => {
    onDelete?.();
    pressHide();
  };

  // render
  const renderTitle = (title, required) => {
    return <Label required={required}>{title}</Label>;
  };

  const LIST_PIPELINE_STAGE = [
    { id: "0", value: "0", name: "Thi tuyển" },
    { id: "1", value: "1", name: "Phỏng vấn" },
  ];
  const [selectedStatge, setSelectedStatge] = useState("");
  const onChangeStage = (e) => {
    setSelectedStatge(e.target.value);
  };
  useEffect(() => {
    setSelectedStatge(""), setValue("des", "");
    return;
  }, [setValue]);
  return (
    <Modal
      open={show}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      onBackdropClick={pressHide}
    >
      <>
        <FormProvider methods={methodss}>
          <View hidden width={668} borderradius={8} bgcolor={"#fff"}>
            <View p={24}>
              <View flexrow="true" atcenter="true" mb={24}>
                <Text flex fontsize={22} fontweight={"700"}>
                  {isEdit ? "Sửa bước tuyển dụng" : "Thêm bước tuyển dụng"}
                </Text>

                <ButtonIcon
                  sx={{
                    textTransform: "none",
                  }}
                  onClick={pressHide}
                  icon={
                    <Iconify
                      icon={"ic:baseline-close"}
                      width={20}
                      height={20}
                      color="#5C6A82"
                    />
                  }
                />
              </View>
              <View mb={24}>
                {renderTitle("Loại bước", true)}
                <SelectAutoCompleteDS
                  selectedOption={selectedStatge}
                  setSelectedOption={setSelectedStatge}
                  onChange={onChangeStage}
                  data={LIST_PIPELINE_STAGE}
                  placeholder="Chọn loại bước"
                  name={"stageType"}
                />
                {error && (
                  <FormHelperText
                    error
                    sx={{ px: 2, marginLeft: 0, textTransform: "capitalize" }}
                  >
                    Chưa chọn loại bước tuyển dụng
                  </FormHelperText>
                )}
              </View>
              <View mb={24}>
                {renderTitle("Mô tả")}

                <TextAreaDS
                  initialValue=""
                  maxLength={255}
                  placeholder="Nhập nội dung mô tả"
                  name={"des"}
                />
              </View>
            </View>

            <View
              flexrow="true"
              jcend="true"
              pv={12}
              ph={16}
              bgcolor={"#F8F8F9"}
              boxshadow={"inset 0px 1px 0px #EBECF4"}
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
                  <View flex="true" />
                </>
              )}
              <ButtonCancelStyle
                sx={{ marginRight: "8px" }}
                onClick={pressHide}
              >
                Hủy
              </ButtonCancelStyle>

              <ButtonDS
                type="submit"
                variant="contained"
                loading={isSubmitting}
                tittle={isEdit ? "Sửa" : "Thêm"}
                onClick={pressSave}
              />
            </View>
          </View>
        </FormProvider>
      </>
    </Modal>
  );
};
