import React from 'react';
import {Divider} from "@mui/material";
import {AlertIcon} from "@/sections/organization/component/Icon";
import {useDeleteMultipleOrganizationMutation} from "@/sections/organization/override/OverrideOrganizationSlice";
import {useSnackbar} from "notistack";
import {
  DialogActionsStyle,
  DialogContentStyle,
  DialogContentTextStyle,
  DialogStyle,
  MuiDialogTitle,
  TitleAlertStyle
} from "@/components/BaseComponents/ConfirmModal";
import MuiButton from "@/components/BaseComponents/MuiButton";

const OrganizationConfirmMultipleModal = ({setSelected, showMultipleDelete, setShowMultipleDelete, organizationIds}) => {
  const {enqueueSnackbar} = useSnackbar();
  const [deleteMultipleOrganization] = useDeleteMultipleOrganizationMutation();

  const onClose = () => {
    setShowMultipleDelete(false);
    setSelected([])
  }

  const handleDeleteOrganization = async () => {
    try {
      await deleteMultipleOrganization({organizationIds}).unwrap();
      enqueueSnackbar("Xóa đơn vị thành công!");
      onClose();
    } catch (err) {
      throw err;
    }
  }
  return (
      <DialogStyle
          open={showMultipleDelete}
          onClose={() => setShowMultipleDelete(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="dialog-confirm"
      >
        <MuiDialogTitle onClose={onClose}/>
        <DialogContentStyle>
          <AlertIcon/>
          <TitleAlertStyle fontSize={18} fontWeight={600} marginTop={2}>
            Xác nhận xóa đơn vị
          </TitleAlertStyle>
          <DialogContentTextStyle>
            Xóa đơn vị đồng nghĩa xóa hết các đơn vị và người dùng trực thuộc. Bạn có chắc chắn muốn xóa {organizationIds?.length} đơn vị ?
          </DialogContentTextStyle>
          <Divider/>
        </DialogContentStyle>
        <DialogActionsStyle>
          <MuiButton
              title={"Hủy"}
              color={"default"}
              onClick={onClose}
          />
          <MuiButton
              title={"Xóa"}
              onClick={handleDeleteOrganization}
              color={"error"}
          />
        </DialogActionsStyle>
      </DialogStyle>
  )
}

export default React.memo(OrganizationConfirmMultipleModal);