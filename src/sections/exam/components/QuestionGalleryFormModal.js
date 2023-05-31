import { ButtonDS, TextAreaDS } from "@/components/DesignSystem";
import { Text, View } from "@/components/DesignSystem/FlexStyled";
import Iconify from "@/components/Iconify";
import { FormProvider, RHFTextField } from "@/components/hook-form";
import { Label } from "@/components/hook-form/style";
import { ButtonCancelStyle } from "@/sections/applicant/style";
import {
  ActionSwitchCheckedIcon,
  ActionSwitchUnCheckedIcon,
} from "@/sections/organization/component/Icon";
import { ButtonIcon } from "@/utils/cssStyles";
import { yupResolver } from "@hookform/resolvers/yup";
import { Divider, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useTheme } from "@mui/material/styles";

const defaultValuess = {
  name: "",
  des: "",
};

export const QuestionGalleryFormModal = ({
  show,
  setShow,
  editData,
  onSubmit,
}) => {
  const isEdit = !!editData?.name;
  const [isActive, setIsActive] = useState(true);

  // form
  const Schema = Yup.object().shape({
    name: Yup.string()
      .required("Tên nhóm câu hỏi không được bỏ trống")
      .max(50, "Độ dài không được quá 50 ký tự"),
    des: Yup.string().max(100, "Độ dài không được quá 100 ký tự"),
  });

  const methodss = useForm({
    defaultValuess,
    resolver: yupResolver(Schema),
  });
  const theme = useTheme();
  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methodss;

  const pressHide = () => {
    setShow(false);
  };
  const pressSave = handleSubmit(async (d) => {
    const data = {
      ...d,
      isActive,
    };
    onSubmit?.(data);
    pressHide();
  });

  useEffect(() => {
    if (!isEdit) {
      setValue("id", "");
      setValue("name", "");
      setValue("des", "");
      setIsActive(true);
    } else {
      setValue("id", editData.id);
      setValue("name", editData.name);
      setValue("des", editData.description);
      setIsActive(editData.isActive);
    }
  }, []);

  return (
    <Modal
      open={show}
      sx={{
        display: "flex",
        alignItems: "start",
        justifyContent: "center",
        top: 100,
        ".MuiModal-backdrop": {
          background: "rgba(9, 30, 66, 0.25)"
        }
      }}
      onBackdropClick={pressHide}
    >
      <>
        <FormProvider methods={methodss}>
          <View hidden width={668} borderradius={6} bgcolor={theme.palette.common.white} boxshadow={'0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)'}>
            <View flexrow="true" atcenter="true" pv={16} ph={24}>
              <Text flex fontsize={16} fontweight={"700"}>
                {isEdit ? "Chỉnh sửa nhóm câu hỏi" : "Thêm nhóm câu hỏi"}
              </Text>

              <ButtonIcon
                onClick={pressHide}
                icon={
                  <Iconify
                    icon={"ic:baseline-close"}
                    width={20}
                    height={20}
                    color={theme.palette.common.neutral700}
                  />
                }
              />
            </View>
            <Divider />
            <View p={24}>
              <View mb={28}>
                <Label required={true}>{"Tên nhóm câu hỏi"}</Label>
                <RHFTextField
                  name={"name"}
                  placeholder="Nhập tên nhóm câu hỏi..."
                  maxLength={50}
                />
              </View>
              <View mb={28}>
                <Label>{"Mô tả"}</Label>
                <TextAreaDS
                  initialValue=""
                  multiline
                  rows={4}
                  maxLength={100}
                  placeholder="Nhập nội dung mô tả nhóm câu hỏi"
                  name={"des"}
                />
              </View>

              <View
                flexrow
                atcenter
                style={{
                  marginLeft: -8
                }}
                onclick={() => setIsActive(!isActive)}
              >
                {isActive ? (
                  <ActionSwitchCheckedIcon />
                ) : (
                  <ActionSwitchUnCheckedIcon />
                )}
                <Text
                  fontSize={12}
                  fontWeight={"500"}
                  color={isActive ? "#388E3C" : theme.palette.common.borderObject}
                >
                  {isActive ? "Đang hoạt động" : "Ngừng hoạt động"}
                </Text>
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
