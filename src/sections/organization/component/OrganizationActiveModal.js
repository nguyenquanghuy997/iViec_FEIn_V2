import {Divider} from "@mui/material";
import {CheckedSwitchIcon, UnCheckedSwitchIcon} from "@/sections/organization/component/Icon";
import {useSnackbar} from "notistack";
import {useSetActiveOrganizationMutation} from "@/sections/organization/override/OverrideOrganizationSlice";
import {
  DialogActionsStyle,
  DialogContentStyle,
  DialogContentTextStyle,
  DialogStyle,
  MuiDialogTitle,
  TitleAlertStyle
} from "@/components/BaseComponents/ConfirmModal";
import MuiButton from "@/components/BaseComponents/MuiButton";
import { STYLE_CONSTANT as style } from "@/theme/palette";

const OrganizationActiveModal = ({ selectedList, isOpenActive, setIsOpenActive, node, actionTypeActive, onCloseBottomNav }) => {
  const {enqueueSnackbar} = useSnackbar();
  const [setActiveOrganization] = useSetActiveOrganizationMutation();

  const onClose = () => {
    setIsOpenActive(false);
    onCloseBottomNav();
  }

  const handleSetActiveOrganization = async () => {
    if(selectedList.length > 1) {
      const body = {
        organizationIds: [...selectedList],
        isActivated: actionTypeActive === 0 ? 1 : 0,
      }
      try {
        await setActiveOrganization(body).unwrap();
        enqueueSnackbar("Cập nhật trạng thái hoạt động thành công!");
        onClose();
      } catch (err) {
        throw err;
      }
    } else {
      const body = {
        organizationIds: [node.id],
        isActivated: actionTypeActive === 0 ? 1 : 0,
      }
      try {
        await setActiveOrganization(body).unwrap();
        enqueueSnackbar("Cập nhật trạng thái hoạt động thành công!");
        onClose();
      } catch (err) {
        throw err;
      }
    }

  }
  return (
      <DialogStyle
          open={isOpenActive}
          onClose={() => setIsOpenActive(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="dialog-confirm"
      >
        <MuiDialogTitle onClose={onClose} />
        <DialogContentStyle>
          {actionTypeActive === 0 ? <CheckedSwitchIcon /> : <UnCheckedSwitchIcon />}
          <TitleAlertStyle
              color={actionTypeActive === 0 ? style.COLOR_PRIMARY : style.COLOR_TEXT_DANGER}
              fontSize={18}
              fontWeight={600}
              marginTop={2}
          >
            { actionTypeActive === 0 ? 'Bật' : 'Tắt' } trạng thái hoạt động cho đơn vị
          </TitleAlertStyle>
          {
            selectedList.length > 1 ? <DialogContentTextStyle className="subtitle-confirm">
              Bạn có chắc chắn muốn bật hoạt động cho {selectedList.length} đơn vị ?
            </DialogContentTextStyle> : <DialogContentTextStyle className="subtitle-confirm">
              Bạn có chắc chắn muốn bật hoạt động cho đơn vị <span className="subtitle-confirm-name">{node?.name}</span> ?
            </DialogContentTextStyle>
          }
          <Divider/>
        </DialogContentStyle>
        <DialogActionsStyle>
          <MuiButton
            title={"Hủy"}
            color={"default"}
            onClick={onClose}
          />
          <MuiButton
            title={actionTypeActive === 0 ? 'Bật' : 'Tắt'}
            onClick={handleSetActiveOrganization}
          />
        </DialogActionsStyle>
      </DialogStyle>
  )
}

export default OrganizationActiveModal;