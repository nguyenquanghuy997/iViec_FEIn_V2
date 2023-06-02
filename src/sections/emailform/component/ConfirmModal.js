import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Divider,
  Typography
} from "@mui/material";
import { AlertIcon } from "@/sections/organization/component/Icon";
import { styled } from "@mui/styles";
import { useTheme } from '@emotion/react';
import { ButtonDS } from '@/components/DesignSystem';
import Iconify from '@/components/Iconify';
import { View } from '@/components/DesignSystem/FlexStyled';


const DialogStyle = styled(Dialog)(({ theme }) => ({
  "& .dialog-delete": {
    boxShadow: ' 0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)',
    borderRadius: '6px',
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(3)
  },
  "& .MuiDialog-container": {
    alignItems:'start',
    "& .MuiPaper-root": {
      // padding: theme.spacing(0, 2),
      borderRadius: '6px',
      width: "100%",
      maxWidth: '600px !important',
      top: 'calc(100px - 32px)'
    },
  },
  "& .MuiModal-backdrop": {
    background: "rgba(9, 30, 66, 0.25)"
  }
}))

const TitleAlertStyle = styled(Typography)(({ theme }) => ({
  "&.title-delete": {
    textAlign: 'center',
    width: '100%',
    fontSize: '16px',
    fontWeight: 600,
    color: theme.palette.common.red600,
    marginTop: theme.spacing(2),
  }
}))

const DialogContentTextStyle = styled(DialogContentText)(({ theme }) => ({
  "&.subtitle-delete": {
    textAlign: 'center',
    width: '100%',
    fontSize: '14px',
    fontWeight: 400,
    display: 'block',
    marginTop: theme.spacing(1),
    "& .subtitle-delete-name": {
      fontWeight: 600,
      marginLeft: theme.spacing(0.5)
    }
  }
}))

const ButtonCancelStyle = styled(Button)(({ theme }) => ({
  "&.button-cancel": {
    fontSize: 14,
    fontWeight: 600,
    color: theme.palette.common.neutral700,
    backgroundColor: 'transparent',
    borderRadius: 6,
    "&:hover": {
      color: theme.palette.common.neutral700,
      backgroundColor: 'transparent',
    }
  }
}));
const ButtonDeleteStyle = styled(Button)(({ theme }) => ({
  "&.button-delete": {
    fontSize: 14,
    fontWeight: 600,
    color: theme.palette.common.white,
    backgroundColor: '#D32F2F',
    borderRadius: 6,
    "&:hover": {
      color: theme.palette.common.white,
      backgroundColor: '#D32F2F',
    }
  }
}));

const ConfirmModal = ({ confirmDelete, onCloseConfirmDelete, onSubmit, item, title, subtitle, strongSubtitle }) => {
  const theme = useTheme()
  return (
    <DialogStyle
      open={confirmDelete}
      onClose={onCloseConfirmDelete}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="dialog-delete"
    >
      {/* <DialogTitle onClose={onCloseConfirmDelete} /> */}
      <View
        flexrow="true"
        jcend={'true'}
        p={12}
        bgcolor={'#fff'}
      >
        <ButtonDS
          sx={{
            backgroundColor: theme.palette.background.paper,
            boxShadow: "none",
            ":hover": {
              backgroundColor: "#EFF3F7",
            },
            textTransform: "none",
            padding: "12px",
            minWidth: "unset",
          }}
          onClick={onCloseConfirmDelete}
          icon={
            <Iconify
              icon={"mi:close"}
              width={20}
              height={20}
              color={theme.palette.common.borderObject}
            />
          }
        />
      </View>
      <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', mb: '12px' }}>
        <AlertIcon />
        <TitleAlertStyle className="title-delete">
          {title}
        </TitleAlertStyle>
        <DialogContentTextStyle id="alert-dialog-description" className="subtitle-delete">
          {subtitle}
          <span className="subtitle-delete-name">{strongSubtitle}</span>?
        </DialogContentTextStyle>
        <Divider />
      </DialogContent>
      <DialogActions sx={{ borderTop: '1px solid #E7E9ED', padding: '16px 24px !important' }}>
        <ButtonCancelStyle className="button-cancel" onClick={onCloseConfirmDelete}>Hủy</ButtonCancelStyle>
        <ButtonDeleteStyle className="button-delete" onClick={() => onSubmit([item?.id])}>
          Xóa
        </ButtonDeleteStyle>
      </DialogActions>
    </DialogStyle>
  )
}

export default React.memo(ConfirmModal);