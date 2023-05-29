import {
  ButtonDS,
  TextAreaDS,
} from "@/components/DesignSystem";
import { View, Text } from "@/components/DesignSystem/FlexStyled";
import Iconify from "@/components/Iconify";
import { FormProvider, RHFCheckbox, RHFTextField } from "@/components/hook-form";
import { Label } from "@/components/hook-form/style";
import { ButtonCancelStyle } from "@/sections/applicant/style";
import { ButtonIcon } from "@/utils/cssStyles";
import { yupResolver } from "@hookform/resolvers/yup";
import { Divider, Modal } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import {useTheme} from "@mui/material/styles";

const defaultValuess = {
  name:"",
  des: ""
};

export const EvaluationAddModal = ({
  show,
  setShow,
  editData,
  onSubmit,
}) => {
  const isEdit = !!editData?.name;
  // form
    // form
    const Schema = Yup.object().shape({
      name: Yup.string().required("Chưa nhập tên tiêu chí").max(50, 'Độ dài không được quá 50 ký tự'),
      des: Yup.string().max(255, 'Độ dài không được quá 255 ký tự'),
    });
  const theme = useTheme();
  const methodss = useForm({
    defaultValuess,
    resolver: yupResolver(Schema),
  });

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
      name: d.name,
      isRequired: d.isRequired,
      des: d.des,
    };
      onSubmit?.(data);
      pressHide();
    
  });

  useEffect(() => {
    if (!isEdit) {
      setValue("name", "");
      setValue("isRequired", "");
      setValue("des", "");
    } else {
      setValue("name", editData.name);
      setValue("isRequired", editData.isRequired);
      setValue("des", editData.des);
    }
  }, []);
  return (
    <Modal
      open={show}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center", ".MuiModal-backdrop": {background: "rgba(9, 30, 66, 0.25)"} }}
      onBackdropClick={pressHide}
    >
      <>
        <FormProvider methods={methodss}>
          <View hidden width={668} borderradius={8} bgcolor={theme.palette.common.white}>
            <View flexrow="true" atcenter="true" pv={22} ph={24}>
              <Text flex fontsize={16} fontweight={"700"}>
                {isEdit ? "Sửa tiêu chí đánh giá" : "Thêm tiêu chí đánh giá"}
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
            <View mb={12}>
              <Label required={true}>{"Tên tiêu chí"}</Label>
              <RHFTextField
                name={"name"}
                placeholder="Nhập tên tiêu chí"
                maxLength={50}
              />
            </View>
            <View mb={8}>
              <RHFCheckbox
                style={{ marginLeft: "-8px" }}
                name="isRequired"
                label="Bắt buộc đánh giá"
              />
            </View>
              <View mb={24}>
                <Label>{"Mô tả tiêu chí"}</Label>
                <TextAreaDS
                  initialValue=""
                  maxLength={255}
                  placeholder="Nhập nội dung mô tả tiêu chí đánh giá"
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
