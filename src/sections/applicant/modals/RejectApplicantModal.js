import { useUpdateApplicantRecruitmentToNextStateMutation } from "../ApplicantFormSlice";
import { ButtonDS, TextAreaDS } from "@/components/DesignSystem";
import { View } from "@/components/FlexStyled";
import SvgIcon from "@/components/SvgIcon";
import { FormProvider } from "@/components/hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Modal, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const LIST_ACTION = [
  { id: 0, name: "Đạt", color: "#4CAF50" },
  { id: 1, name: "Cân nhắc", color: "#FF9800" },
  { id: 2, name: "Loại", color: "#F44336" },
];

export const RejectApplicantModal = ({
  applicantId,
  recruimentId,
  stage,
  show,
  setShow,
  actionId,
  actionType,
  onClose,
}) => {
  // data
  const recruitmentPipelineStateId = stage?.recruitmentPipelineStates?.filter(
    (i) => i.pipelineStateType == 3
  )[0]?.id;

  // other
  const { enqueueSnackbar } = useSnackbar();

  // state
  const [currentAction, setCurrentAction] = useState(actionType);

  // form
  const Schema = Yup.object().shape({
    note: Yup.string().required("Chưa nhập ghi chú"),
  });
  const methods = useForm({
    resolver: yupResolver(Schema),
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // api
  const [addForm] = useUpdateApplicantRecruitmentToNextStateMutation();

  // handle
  const pressSave = handleSubmit(async (e) => {
    try {
      const body = {
        applicantId: applicantId,
        recruitmentId: recruimentId,
        recruitmentPipelineStateId: actionId ?? recruitmentPipelineStateId,
        pipelineStateResultType: currentAction,
        note: e?.note,
      };
      await addForm(body).unwrap();
      enqueueSnackbar("Chuyên bước thành công");
      onClose();
    } catch (err) {
      enqueueSnackbar("Chuyên bước thất bại", {
        autoHideDuration: 1000,
        variant: "error",
      });
    }
  });

  return (
    <Modal
      open={show}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      onBackdropClick={() => setShow(false)}
    >
      <FormProvider methods={methods}>
        <View width={600} borderRadius={8} bgColor={"#fff"}>
          <View pt={20} pb={36} ph={24}>
            {/* button close */}
            <View asEnd mr={12} onPress={() => setShow(false)}>
              <SvgIcon>
                {
                  '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.0001 8.82178L14.1251 4.69678L15.3034 5.87511L11.1784 10.0001L15.3034 14.1251L14.1251 15.3034L10.0001 11.1784L5.87511 15.3034L4.69678 14.1251L8.82178 10.0001L4.69678 5.87511L5.87511 4.69678L10.0001 8.82178Z" fill="#455570"/></svg>'
                }
              </SvgIcon>
            </View>

            {/* icon */}
            <View asCenter mt={25}>
              <SvgIcon>
                {
                  '<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M40.1255 30.125L52.5005 42.5L40.1255 54.875L36.5905 51.34L42.9305 44.9975L10.0005 45V40H42.9305L36.5905 33.66L40.1255 30.125ZM19.8755 5.125L23.4105 8.66L17.0705 15H50.0005V20H17.0705L23.4105 26.34L19.8755 29.875L7.50049 17.5L19.8755 5.125Z" fill="#455570"/></svg>'
                }
              </SvgIcon>
            </View>

            {/* title */}
            <Typography
              mt={"12px"}
              fontSize={16}
              fontWeight={"600"}
              color="#455570"
              textAlign={"center"}
            >
              {"Chuyển ứng viên sang bước kết quả"}
            </Typography>

            {/* des */}
            <Typography
              mt={"8px"}
              fontSize={14}
              color="#455570"
              textAlign={"center"}
            >
              {`Lưu ý: Bạn chỉ có thể gửi Offer khi ứng viên ở trạng thái `}
              <strong>{`Kết quả - Đạt`}</strong>
            </Typography>

            <View
              hidden
              flexRow
              mt={24}
              borderRadius={6}
              borderWidth={1}
              borderColor={"#D0D4DB"}
            >
              {LIST_ACTION.map((item) => {
                const isActive = item.id == currentAction;
                return (
                  <View
                    flex1
                    pv={16}
                    key={item.id}
                    bgColor={isActive ? item.color : undefined}
                    onPress={() => setCurrentAction(item.id)}
                  >
                    <Typography
                      fontSize={14}
                      fontWeight={"600"}
                      color={isActive ? "#FDFDFD" : "#455570"}
                      textAlign={"center"}
                    >
                      {item.name}
                    </Typography>
                  </View>
                );
              })}
            </View>

            <Typography fontWeight={"600"} color="#5C6A82" mt="24px" mb="8px">
              {"Ghi chú"}
            </Typography>
            <TextAreaDS
              maxLength={150}
              placeholder="Nhập nội dung ghi chú..."
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
              tittle={"Chuyển"}
              type="submit"
              sx={{
                textTransform: "unset",
                color: "#fff",
                boxShadow: "none",
                fontSize: "14px",
                padding: "6px 12px",
              }}
              loading={isSubmitting}
              onClick={pressSave}
            />
          </Grid>
        </View>
      </FormProvider>
    </Modal>
  );
};
