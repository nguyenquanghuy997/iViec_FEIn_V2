import { ButtonDS } from "@/components/DesignSystem";
import { Text, View } from "@/components/FlexStyled";
import Iconify from "@/components/Iconify";
import { FormProvider } from "@/components/hook-form";
import { Grid, Modal, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import React from "react";

export const RejectApplicantModal = ({
  applicantId,
  recruimentId,
  show,
  setShow,
}) => {
  // const [updateForm] = useUpdateApplicantFormMutation();

  const form = useForm({
    applicantId: applicantId,
    recruimentId: recruimentId,
  });
  // const [text, setText] = React.useState('');
  return (
    <Modal
      open={show}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      onBackdropClick={() => setShow(false)}
    >
      <FormProvider methods={form}>
        <View contentCenter width={600} borderRadius={8} bgColor={"#fff"}>
          <ButtonDS
            type="submit"
            sx={{
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

          <Iconify
            icon={"mdi:alert-circle-outline"}
            width={60}
            height={60}
            color="#E53935"
          />

          <Text
            centerAlign
            mt={24}
            mb={12}
            fontSize={20}
            fontWeight={"700"}
            color="#E53935"
          >
            {"Xác nhận loại ứng viên"}
          </Text>

          <Typography centerAlign fontSize={15} color="#455570">
            {`Sau khi bị loại ứng viên sẽ được chuyển sang bước `}
            <strong>{`Kết quả - Loại.`}</strong>
          </Typography>
          <Text flexRow mt={24} mb={10} fontWeight={"600"}>
            {"Mô tả tiêu chí đánh giá"}
          </Text>

          {/* <TextArea
      placeholder="Type in here…"
      value={text}
      onChange={(event) => setText(event.target.value)}
      minRows={2}
      maxRows={4}
      endDecorator={
        <Typography level="body3" sx={{ ml: 'auto' }}>
          {text.length} character(s)
        </Typography>
      }
      sx={{ minWidth: 300 }}
    /> */}
          <Grid
            container
            padding="16px 24px"
            borderTop="1px solid #E7E9ED"
            justifyContent="end"
            marginTop="36px"
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
              onClick={() => setShow(false)}
            />
          </Grid>
        </View>
      </FormProvider>
    </Modal>
  );
};
