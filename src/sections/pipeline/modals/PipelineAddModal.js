import { Text, View } from "@/components/FlexStyled";
import SvgIcon from "@/components/SvgIcon";
import { FormProvider, RHFTextField } from "@/components/hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Modal } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const defaultValues = {
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
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(ProfileSchema),
  });
  const { setValue, handleSubmit } = methods;

  const pressHide = () => {
    setShow(false);
  };

  const pressSave = handleSubmit((d) => {
    onSubmit?.(d);
    pressHide();
  });

  const pressDelete = () => {
    onDelete?.();
    pressHide();
  };

  useEffect(() => {
    if (!show) {
      setValue("name", defaultValues.name);
      setValue("des", defaultValues.des);
      return;
    }

    if (!isEdit) return;

    setValue("name", editData.name);
    setValue("des", editData.des);
  }, [show]);

  return (
    <Modal
      open={show}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      onBackdropClick={pressHide}
    >
      <FormProvider methods={methods}>
        <View hidden width={668} borderRadius={8} bgColor={"#fff"}>
          <View p={24}>
            <View flexRow atCenter mb={24}>
              <Text flex1 fontSize={22} fontWeight={"700"}>
                {isEdit ? "Sửa tiêu chí" : "Thêm tiêu chí"}
              </Text>

              <View onPress={pressHide}>
                <SvgIcon>
                  {
                    '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.74988 3.75L8.99987 9M8.99987 9L14.2499 14.25M8.99987 9L14.2499 3.75M8.99987 9L3.74988 14.25" stroke="#393B3E" stroke-width="2.025" stroke-linecap="round" stroke-linejoin="round"/></svg>'
                  }
                </SvgIcon>
              </View>
            </View>

            <Text flexRow mb={10} fontWeight={"600"}>
              {"Tiêu chí đánh giá "}
              <Text ml={4} color={"#E82E25"}>
                {"*"}
              </Text>
            </Text>

            <RHFTextField name={"name"} placeholder={"Nhập tên tiêu chí"} />

            <Text flexRow mt={24} mb={10} fontWeight={"600"}>
              {"Mô tả tiêu chí đánh giá"}
            </Text>

            <RHFTextField
              multiline
              rows={3}
              name={"des"}
              placeholder={
                "Nhập gợi ý ngắn gọn giúp hội đồng tuyển dụng dễ dàng dựa theo để đánh giá ứng viên"
              }
            />
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

            <LoadingButton size="large" variant="text" onClick={pressHide}>
              {"Hủy"}
            </LoadingButton>
            <View width={8} />

            <LoadingButton size="large" variant="contained" onClick={pressSave}>
              {"Lưu"}
            </LoadingButton>
          </View>
        </View>
      </FormProvider>
    </Modal>
  );
};
