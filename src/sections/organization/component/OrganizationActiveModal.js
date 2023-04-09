import {Box, Dialog, DialogActions, DialogContent, Divider, Typography} from "@mui/material";
import {CheckedSwitchIcon, UnCheckedSwitchIcon} from "@/sections/organization/component/Icon";
import {useSnackbar} from "notistack";
import {useSetActiveOrganizationMutation} from "@/sections/organization/override/OverrideOrganizationSlice";
import {
  DialogContentTextStyle,
  MuiDialogTitle,
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
      <Dialog
          open={isOpenActive}
          onClose={() => setIsOpenActive(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="dialog-confirm"
          maxWidth={'sm'}
          sx={{
            boxShadow: ' 0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)',
            borderRadius: '6px',
            minHeight: '600px',
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                borderRadius: '6px',
                width: "100%",
              },
            },
          }}
      >
        <MuiDialogTitle onClose={onClose} />
        <DialogContent sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}>
          <Box sx={{ mt: 2 }}>
            {actionTypeActive === 0 ? <CheckedSwitchIcon /> : <UnCheckedSwitchIcon />}
          </Box>
          <Typography
              sx={{
                textAlign: 'center',
                width: '100%',
                fontSize: 16,
                fontWeight: 600,
                color: '#E53935',
                marginBottom: 1
              }}

              color={actionTypeActive === 0 ? style.COLOR_PRIMARY : style.COLOR_TEXT_DANGER}
              fontSize={18}
              fontWeight={600}
              marginTop={2}
          >
            { actionTypeActive === 0 ? 'Bật' : 'Tắt' } trạng thái hoạt động cho đơn vị
          </Typography>
          {
            selectedList.length > 1 ? <DialogContentTextStyle className="subtitle-confirm">
              Bạn có chắc chắn muốn bật hoạt động cho {selectedList.length} đơn vị ?
            </DialogContentTextStyle> : <DialogContentTextStyle className="subtitle-confirm">
              Bạn có chắc chắn muốn bật hoạt động cho đơn vị <span className="subtitle-confirm-name">{node?.name}</span> ?
            </DialogContentTextStyle>
          }
          <Divider/>
        </DialogContent>
        <DialogActions sx={{
          minHeight: '68px',
          borderTop: '1px solid #E7E9ED',
          '& .btn-actions': {
            height: '36px',
          },
        }}>
          <MuiButton
            title={"Hủy"}
            color={"default"}
            className={'btn-actions'}
            onClick={onClose}
          />
          <MuiButton
            title={actionTypeActive === 0 ? 'Bật' : 'Tắt'}
            className={'btn-actions'}
            color={actionTypeActive === 0 ? 'primary' : 'error'}
            onClick={handleSetActiveOrganization}
          />
        </DialogActions>
      </Dialog>
  )
}

export default OrganizationActiveModal;