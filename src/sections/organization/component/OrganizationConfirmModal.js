import {
  DialogContentTextStyle,
  MuiDialogTitle,
} from "@/components/BaseComponents/ConfirmModal";
import MuiButton from "@/components/BaseComponents/MuiButton";
import { AlertIcon } from "@/sections/organization/component/Icon";
import { useDeleteOrganizationMutation } from "@/sections/organization/override/OverrideOrganizationSlice";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSnackbar } from "notistack";

const OrganizationConfirmModal = ({ showDelete, setShowDelete, node }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [deleteOrganization] = useDeleteOrganizationMutation();
  const theme = useTheme();
  const onClose = () => {
    setShowDelete(false);
  };

  const handleDeleteOrganization = async () => {
    try {
      await deleteOrganization({ id: node?.id }).unwrap();
      enqueueSnackbar("Xóa đơn vị thành công!");
      onClose();
    } catch (err) {
      if (err.status == "OEE_05") {
        enqueueSnackbar(
          "Vui lòng không xóa đơn vị đã có người dùng, tin tuyển dụng!",
          {
            variant: "error",
          }
        );
      } else {
        enqueueSnackbar("Xóa đơn vị thất bại!", {
          variant: "error",
        });
      }
      throw err;
    }
  };
  return (
    <Dialog
      open={showDelete}
      onClose={() => setShowDelete(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="dialog-confirm"
      maxWidth={"sm"}
      sx={{
        minHeight: "600px",
        background: "rgba(9, 30, 66, 0.25)",
        "& .MuiDialog-container": {
          paddingTop: "100px",
          alignItems: "flex-start",
          "& .MuiPaper-root": {
            width: "100%",
            borderRadius: "6px",
            boxShadow:
              "0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)",
          },
        },
      }}
    >
      <MuiDialogTitle onClose={onClose} />
      <DialogContent
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box sx={{ my: 2 }}>
          <AlertIcon />
        </Box>
        <Typography
          sx={{
            textAlign: "center",
            width: "100%",
            fontSize: 16,
            fontWeight: 600,
            color: theme.palette.common.red600,
            marginBottom: 1,
          }}
        >
          Xác nhận xóa đơn vị
        </Typography>
        <DialogContentTextStyle>
          Xóa đơn vị đồng nghĩa xóa hết các đơn vị và người dùng trực thuộc. Bạn
          có chắc chắn muốn xóa đơn vị<span>{node?.name}</span>?
        </DialogContentTextStyle>
        <Divider />
      </DialogContent>
      <DialogActions
        sx={{
          minHeight: "68px",
          borderTop: "1px solid #E7E9ED",
          "& .btn-actions": {
            height: "36px",
          },
        }}
      >
        <MuiButton
          title={"Hủy"}
          color={"basic"}
          className={"btn-actions btn-cancel"}
          onClick={onClose}
          sx={{
            fontWeight: 600,
          }}
        />
        <MuiButton
          title={"Xóa"}
          className={"btn-actions btn-confirm"}
          onClick={handleDeleteOrganization}
          color={"error"}
          sx={{
            fontWeight: 600,
          }}
        />
      </DialogActions>
    </Dialog>
  );
};

export default OrganizationConfirmModal;
