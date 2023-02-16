import { ButtonDS, TextAreaDS } from "@/components/DesignSystem";
import { View } from "@/components/FlexStyled";
import Iconify from "@/components/Iconify";
import { FormProvider } from "@/components/hook-form";
import { Grid, Modal, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

export const RejectApplicantModal = ({
  applicantId,
  recruimentId,
  show,
  setShow,
}) => {
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
            <TextAreaDS
              tittle="Lý do loại ứng viên"
              isRequired={true}
              maxLength={150}
              placeholder="Nhập lý do..."
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
              onClick={() => setShow(false)}
            />
          </Grid>
        </View>
      </FormProvider>
    </Modal>
  );
};
