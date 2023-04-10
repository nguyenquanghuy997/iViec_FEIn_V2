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
import { Divider, FormHelperText, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const defaultValuess = {
  des: "",
};

export const PipelineAddModal = ({
  pipeLineSelected,
  show,
  setShow,
  editData,
  onSubmit,
}) => {
  const isEdit = !!editData.stageType?.name;
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
      return;
    }
    else if (pipeLineSelected?.filter(x => x.stageType.id == selectedStatge.id).length > 4) {
      setError(true);
      return;
    }

    onSubmit?.(data);
    pressHide();

  });

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
    if (!isEdit) {
      setSelectedStatge(""), setValue("des", "");
      return;
    } else {
      setSelectedStatge(editData.stageType), setValue("des", editData.des);
    }
  }, []);
  return (
    <Modal
      open={show}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      onBackdropClick={pressHide}
    >
      <>
        <FormProvider methods={methodss}>
          <View hidden width={668} borderradius={8} bgcolor={"#FDFDFD"}>
            <View flexrow="true" atcenter="true" pv={22} ph={24}>
              <Text flex fontsize={16} fontweight={"700"}>
                {isEdit ? "Sửa bước tuyển dụng" : "Thêm bước tuyển dụng"}
              </Text>

              <ButtonIcon
                onClick={pressHide}
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
                {error && selectedStatge == "" && (
                  <FormHelperText
                    error
                    sx={{ marginLeft: 0 }}
                  >
                    Chưa chọn loại bước tuyển dụng
                  </FormHelperText>
                )}
                {
                  error && pipeLineSelected?.filter(x => x.stageType.id == selectedStatge.id).length >= 5 && (
                    <FormHelperText
                      error
                      sx={{ marginLeft: 0 }}
                    >
                      Tối đa có 5 bước {selectedStatge?.name.toLowerCase()}
                    </FormHelperText>
                  )
                }
              </View>
              <View mb={24}>
                {renderTitle("Mô tả")}

                <TextAreaDS
                  maxLength={255}
                  placeholder="Nhập nội dung mô tả"
                  name={"des"}
                />
              </View>
            </View>
            <Divider />
            <View flexrow="true" jcend="true" pv={16} ph={24}>
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
                tittle={isEdit ? "Lưu" : "Thêm"}
                onClick={pressSave}
              />
            </View>
          </View>
        </FormProvider>
      </>
    </Modal>
  );
};
