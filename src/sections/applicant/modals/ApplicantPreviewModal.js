import { Text, View } from "@/components/FlexStyled";
import SvgIcon from "@/components/SvgIcon";
import { FormProvider, RHFSwitch } from "@/components/hook-form";
import { LoadingButton } from "@mui/lab";
import { Modal } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUpdateApplicantFormMutation } from "@/sections/applicant";
import { useTheme } from "@mui/material/styles";

export const ApplicantPreviewModal = ({
  show,
  setShow,
  data,
  onEdit,
  onDelete,
  onRefreshData,
}) => {
  const [updateForm] = useUpdateApplicantFormMutation();
  const theme = useTheme();
  const form = useForm({
    defaultValues: {isActive: !!data.Status},
  });
  const isActive = form.watch("isActive");
  
  const pressHide = () => {
    setShow(false);
  };
  
  const pressDelete = () => {
    pressHide();
    onDelete?.();
  };
  
  const pressEdit = () => {
    pressHide();
    onEdit?.();
  };
  
  const handleEdit = form.handleSubmit(async (e) => {
    const body = {
      ...data,
      Status: e.isActive ? 1 : 0,
    };
    pressHide();
    await updateForm(body).unwrap();
    onRefreshData();
  });
  
  const renderItem = (item, index) => {
    return (
      <View p={16} mt={index ? 12 : 24} borderRadius={6} bgColor={"#F8F8F9"}>
        <Text fontSize={17} fontWeight={"600"}>
          {item.CriteriaName}
        </Text>
        
        {!!item.CriteriaNote && (
          <Text mt={8} fontSize={15}>
            {item.CriteriaNote}
          </Text>
        )}
      </View>
    );
  };
  
  useEffect(() => {
    form.setValue("isActive", !!data.Status);
  }, [data.Status]);
  
  useEffect(() => {
    if (isActive !== !!data.Status) handleEdit();
  }, [isActive, data.Status]);
  
  return (
    <Modal
      open={show}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ".MuiModal-backdrop": {background: "rgba(9, 30, 66, 0.25)"}
      }}
      onBackdropClick={pressHide}
    >
      <View
        hidden
        p={24}
        width={568}
        height={766}
        borderRadius={8}
        bgColor={theme.palette.background.paper}
      >
        <View flexRow atCenter>
          <Text flex1 fontSize={22} fontWeight={"700"}>
            {`Mẫu đánh giá ${data.ApplicantName}`}
          </Text>
          
          <View ml={8} onPress={pressHide}>
            <SvgIcon>
              {
                '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.74988 3.75L8.99987 9M8.99987 9L14.2499 14.25M8.99987 9L14.2499 3.75M8.99987 9L3.74988 14.25" stroke="#393B3E" stroke-width="2.025" stroke-linecap="round" stroke-linejoin="round"/></svg>'
              }
            </SvgIcon>
          </View>
        </View>
        
        <View flex1 style={{overflow: "scroll"}}>
          {data.Criterias?.map?.(renderItem)}
        </View>
        
        <View
          flexRow
          jcEnd
          mb={-24}
          mh={-24}
          pv={12}
          ph={16}
          bgColor={"#F8F8F9"}
          boxShadow={"inset 0px 1px 0px #EBECF4"}
        >
          <FormProvider methods={form}>
            <RHFSwitch name={"isActive"} label={"Đang hoạt động"}/>
          </FormProvider>
          <View flex1/>
          
          <LoadingButton
            size="large"
            variant="text"
            color="error"
            onClick={pressDelete}
          >
            {"Xóa"}
          </LoadingButton>
          <View width={8}/>
          
          <LoadingButton size="large" variant="contained" onClick={pressEdit}>
            {"Chỉnh sửa"}
          </LoadingButton>
        </View>
      </View>
    </Modal>
  );
};
