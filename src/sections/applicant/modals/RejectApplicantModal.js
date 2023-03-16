import { useUpdateApplicantRecruitmentToNextStateMutation } from "../ApplicantFormSlice";
import { ButtonDS, TextAreaDS } from "@/components/DesignSystem";
import { View } from "@/components/FlexStyled";
import Iconify from "@/components/Iconify";
import { FormProvider } from "@/components/hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Modal, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

export const RejectApplicantModal = ({
  applicantId,
  recruimentId,
  stage,
  show,
  setShow,
}) => {
  const recruitmentPipelineStateId = stage?.recruitmentPipelineStates?.filter(
    (i) => i.pipelineStateType == 3
  )[0]?.id;

  // form
  const Schema = Yup.object().shape({
    note: Yup.string().required("Chưa nhập lý do loại ứng viên"),
  });
  const methods = useForm({
    resolver: yupResolver(Schema),
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const [addForm] = useUpdateApplicantRecruitmentToNextStateMutation();
  const pressSave = async () => {
    const body = {
      applicantId: applicantId,
      recruitmentId: recruimentId,
      recruitmentPipelineStateId: recruitmentPipelineStateId,
      pipelineStateResultType: 2,
      note: "Ứng viên chưa đạt tiêu chí đánh giá",
    };
    await addForm(body).unwrap();
    location.reload();
    // pressHide();
    // isEditMode ? await updateForm(body).unwrap() : await addForm(body).unwrap();
    // onRefreshData();
  };

  // const [text, setText] = React.useState('');
  return (
    <Modal
      open={show}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      onBackdropClick={() => setShow(false)}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(pressSave)}>
        <View width={600} borderRadius={8} bgColor={"#fff"}>
          <View pt={8} pb={36} ph={24}>
            <ButtonDS
              type="submit"
              sx={{
                justifyContent: "end",
                padding: "8px",
                minWidth: "unset",
                backgroundColor: "#fff",
                boxShadow: "none",
                ":hover": {
                  backgroundColor: "#EFF3F7",
                },
                textTransform: "none",
              }}
              onClick={() => setShow(false)}
              icon={
                <Iconify
                  icon={"iconoir:cancel"}
                  width={20}
                  height={20}
                  color="#5C6A82"
                />
              }
            />

            <Typography
              fontSize={20}
              fontWeight={"700"}
              color="#E53935"
              textAlign={"center"}
            >
              <Iconify
                icon={"mdi:alert-circle-outline"}
                width={60}
                height={60}
                color="#E53935"
              />
              <br />
              {"Xác nhận loại ứng viên"}
            </Typography>
            <Typography fontSize={15} color="#455570" textAlign={"center"}>
              {`Sau khi bị loại ứng viên sẽ được chuyển sang bước `}
              <strong>{`Kết quả - Loại.`}</strong>
            </Typography>
            <Typography fontWeight={"600"} color="#5C6A82" mt="24px" mb="8px">
              {"Lý do loại ứng viên"}{" "}
              <span style={{ color: "#E53935" }}>*</span>
            </Typography>
            <TextAreaDS
              maxLength={150}
              placeholder="Nhập lý do..."
              name="note"
            />
          </View>
          <Grid
            container
            padding="16px 24px"
            borderTop="1px solid #E7E9ED"
            justifyContent="end"
            background="#FDFDFD"
          >
            <ButtonDS
              tittle={"Hủy"}
              type="submit"
              sx={{
                color: "#455570",
                backgroundColor: "#fff",
                boxShadow: "none",
                ":hover": {
                  backgroundColor: "#fff",
                  textDecoration: "underline",
                },
                fontSize: "14px",
                marginRight: "8px",
              }}
              onClick={() => setShow(false)}
            />
            <ButtonDS
              tittle={"Loại ứng viên"}
              type="submit"
              sx={{
                textTransform: "unset",
                color: "#fff",
                backgroundColor: "#D32F2F",
                boxShadow: "none",
                ":hover": {
                  backgroundColor: "#c31410",
                },
                fontSize: "14px",
                padding: "6px 12px",
              }}
              loading={isSubmitting}
              onClick={(e) => pressSave(e)}
            />
          </Grid>
        </View>
      </FormProvider>
    </Modal>
  );
};
