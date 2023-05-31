import { useDeleteExamMutation } from "@/sections/exam/ExamSlice";
import { ButtonDS } from "@/components/DesignSystem";
import Iconify from "@/components/Iconify";
import {
  ButtonCancel,
  DialogContentTextModelStyle,
  DialogModelStyle,
  TitleModelStyle,
} from "@/utils/cssStyles";
import { DialogActions, DialogContent, Divider } from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";
import { View } from "@/components/DesignSystem/FlexStyled";
import {useTheme} from "@mui/material/styles";
import {useRouter} from "next/router";

const ExamDeleteModal = ({
  showConfirmMultiple,
  setShowConfirmMultiple,
  examIds,
  onClose,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [deleteExam] = useDeleteExamMutation();
  const theme = useTheme();
  const router = useRouter();
  const handleChangeStatus = async () => {
    try {
      await deleteExam({ "ids": examIds }).unwrap();
      enqueueSnackbar("Thực hiện thành công !");
      router.push(
        {
          query: {PageIndex: 1, PageSize: 10},
        },
        undefined,
        { shallow: false }
      );
      // window.location.href = "settings/exam/exam-business?PageIndex=1&PageSize=10";
      onClose();
    } catch (err) {
      enqueueSnackbar("Thực hiện thất bại !", {
        autoHideDuration: 1000,
        variant: "error",
      });
    }
  };
  return (
    <DialogModelStyle
      open={showConfirmMultiple}
      onClose={() => setShowConfirmMultiple(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiPaper-root": {
          top: "100px !important",
          margin: '0 !important'
        },
        ".MuiModal-backdrop": {
          background: "rgba(9, 30, 66, 0.25)"
        },
        ".MuiDialog-container": {
          alignItems: 'start'
        }
      }}
    >
      <View
        flexrow="true"
        atcenter="center"
        jcend={'true'}
        pv={12}
        ph={24}
        bgcolor={"#FFF"}
      >
        <ButtonDS
          type="button"
          sx={{
            backgroundColor: "#fff",
            boxShadow: "none",
            ":hover": {
              backgroundColor: "#EFF3F7",
            },
            textTransform: "none",
            padding: "12px",
            minWidth: "unset",
          }}
          onClick={onClose}
          icon={
            <Iconify
              icon={"mi:close"}
              width={20}
              height={20}
              color="#5C6A82"
            />
          }
        />
      </View>
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
          color={theme.palette.common.red600}
        />
        <TitleModelStyle className="title" style={{ color: theme.palette.common.red600 }}>
          Xác nhận xóa đề thi
        </TitleModelStyle>
        <DialogContentTextModelStyle
          id="alert-dialog-description"
          className="subtite"
          style={{ fontWeight: 400 }}
        >
          Bạn có chắc chắn muốn xóa đề thi?
        </DialogContentTextModelStyle>
        <Divider />
      </DialogContent>
      <DialogActions sx={{ borderTop: "1px solid #E7E9ED", padding: '16px 24px !important' }}>
        <ButtonCancel tittle="Hủy" onClick={onClose} />

        <ButtonDS
          tittle="Xóa"
          onClick={handleChangeStatus}
          sx={{
            color: theme.palette.common.white,
            backgroundColor: "#D32F2F",
            "&:hover": {
              backgroundColor: theme.palette.common.red600,
            },
          }}
        />
      </DialogActions>
    </DialogModelStyle>
  );
};

export default React.memo(ExamDeleteModal);
