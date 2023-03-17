import { useRejectRecruitmentMutation } from "../RecruitmentAdSlice";
import { ButtonDS, TextAreaDS } from "@/components/DesignSystem";
import Iconify from "@/components/Iconify";
import { FormProvider } from "@/components/hook-form";
import {
  ButtonCancel,
  DialogContentTextModelStyle,
  DialogModelStyle,
  TitleModelStyle,
} from "@/utils/cssStyles";
import { errorMessagesRe } from "@/utils/errorMessages";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  DialogActions,
  DialogContent,
  Divider,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const RecruitmentAdRejectModal = ({
  showConfirmMultiple,
  setShowConfirmMultiple,
  recruitmentId,
  onClose
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [rejectRecruitment] = useRejectRecruitmentMutation();

  // const handleApproveRecruitment = async () => {
  //   try {
  //     await internalApprovalRecruitments({ ids: recruitmentIds }).unwrap();
  //     enqueueSnackbar("Duyệt tin thành công!");
  //     onClose();
  //   } catch (err) {
  //     enqueueSnackbar(errorMessagesRe[`${err}`], {
  //       autoHideDuration: 1000,
  //       variant: "error",
  //     });
  //   }
  // };
  const defaultValuess = {
    name: "",
    des: "",
  };
  // form
  const Schema = Yup.object().shape({
    reason: Yup.string().required("Chưa nhập lý do loại ứng viên"),
  });
  const methods = useForm({
    defaultValuess,
    resolver: yupResolver(Schema),
  });
  const { handleSubmit } = methods;

  const handleApproveRecruitment = handleSubmit(async (e) => {
    try {
      const data = {
        id: recruitmentId,
        body:{reason: e.reason}
      };
      await rejectRecruitment(data).unwrap();
      enqueueSnackbar("Từ chối tin thành công!");
      onClose();
    } catch (err) {
      enqueueSnackbar(errorMessagesRe[`${err}`], {
        autoHideDuration: 1000,
        variant: "error",
      });
    }
  });
  return (
    <DialogModelStyle
      open={showConfirmMultiple}
      onClose={() => setShowConfirmMultiple(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <FormProvider
        methods={methods}
      >
        <DialogContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Iconify
            icon={"mdi:alert-circle-outline"}
            width={60}
            height={60}
            color="#E53935"
          />
          <TitleModelStyle className="title" style={{ color: "#455570" }}>
            Từ chối duyệt tin
          </TitleModelStyle>
          <DialogContentTextModelStyle
            id="alert-dialog-description"
            className="subtite"
            style={{ fontWeight: 400 }}
          >
            Bạn có chắc chắn từ chối duyệt tin đã chọn?
            <br />
            Vui lòng nhập lý do từ chối:
          </DialogContentTextModelStyle>
          <Typography
            fontWeight={"500"}
            fontSize={14}
            color="#172B4D"
            mt="14px"
            mb="8px"
            width={"100%"}
          >
            {"Lý do từ chối"} <span style={{ color: "#E53935" }}>*</span>
          </Typography>
          <div style={{ width: "100%" }}>
            <TextAreaDS
              initialValue=""
              maxLength={150}
              placeholder="Nhập lý do..."
              name="reason"
            />
          </div>
          <Divider />
        </DialogContent>
        <DialogActions sx={{ borderTop: "1px solid #E7E9ED" }}>
          <ButtonCancel tittle="Hủy" onClick={onClose} />

          <ButtonDS
            tittle="Duyệt"
            onClick={handleApproveRecruitment}
          />
        </DialogActions>
      </FormProvider>
    </DialogModelStyle>
  );
};

export default React.memo(RecruitmentAdRejectModal);
