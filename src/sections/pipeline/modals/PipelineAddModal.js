import {
  ButtonDS,
  TextAreaDS,
} from "@/components/DesignSystem";
import { View, Text } from "@/components/DesignSystem/FlexStyled";
import Iconify from "@/components/Iconify";
import { FormProvider } from "@/components/hook-form";
import { Label } from "@/components/hook-form/style";
import { ButtonCancelStyle } from "@/sections/applicant/style";
import { ButtonIcon } from "@/utils/cssStyles";
import { LoadingButton } from "@mui/lab";
import { Modal } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import RHFDropdown from "@/components/hook-form/RHFDropdown";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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
  const ProfileSchema = Yup.object().shape({
    // stageType: Yup.string().required("Chưa chọn bước"),
    stageType: Yup.string().required("Chưa chọn bước tuyển dụng"),
  });
  const methodss = useForm({
    defaultValuess,
    resolver: yupResolver(ProfileSchema),
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
      stageType: d.stageType,
      des: d.des,
    };
      onSubmit?.(data);
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

  const LIST_PIPELINE_STAGE = [
    { id: "0", value: "0", name: "Thi tuyển" },
    { id: "1", value: "1", name: "Phỏng vấn" },
  ];

  useEffect(() => {
    setValue("stageType", ""), setValue("des", "");
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
                <RHFDropdown
                  options={LIST_PIPELINE_STAGE.map(i => ({
                    id: i.id,
                    value: i.id,
                    name: i.name,
                  }))}
                  name="stageType"
                  placeholder="Chọn loại bước"
                  allowClear={true}
              />
              </View>
              <View mb={24}>
                {renderTitle("Mô tả", true)}

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
