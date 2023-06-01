import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, Divider, Typography, useTheme } from "@mui/material";
import { CheckedSwitchIcon, UnCheckedSwitchIcon } from "@/sections/organization/component/Icon";
import { styled } from "@mui/styles";
import { View } from '@/components/DesignSystem/FlexStyled';
import { ButtonDS } from '@/components/DesignSystem';
import Iconify from '@/components/Iconify';


const DialogStyle = styled(Dialog)(({ theme }) => ({
  "& .dialog-delete": {
    boxShadow: ' 0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)',
    borderRadius: '6px',
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(3)
  },
  "& .MuiDialog-container": {
    alignItems: 'start',
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
  "&.title-active": {
    textAlign: 'center',
    width: '100%',
    fontSize: '16px',
    fontWeight: 600,
    color: theme.palette.common.neutral700,
    marginTop: theme.spacing(2),
    "&.title-inactive": {
      color: theme.palette.common.blue700
    }
  }
}))

const DialogContentTextStyle = styled(DialogContentText)(({ theme }) => ({
  "&.subtitle-active": {
    textAlign: 'center',
    width: '100%',
    fontSize: '14px',
    fontWeight: 400,
    display: 'block',
    marginTop: theme.spacing(2),
    "& .subtitle-active-name": {
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
const ButtonActiveStyle = styled(Button)(({ theme }) => ({
  "&.button-active": {
    fontSize: 14,
    fontWeight: 600,
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.blue700,
    borderRadius: 6,
    "&:hover": {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.common.blue700,
    }
  }
}));

const ActiveModal = ({ isOpenActive, onCloseActiveModal, onSubmit, item, title, subtitle }) => {
  const theme = useTheme()
  return (
    <DialogStyle
      open={isOpenActive}
      onClose={onCloseActiveModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="dialog-delete"
    >
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
          onClick={onCloseActiveModal}
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
        {item.isActive ? <UnCheckedSwitchIcon /> : <CheckedSwitchIcon />}
        <TitleAlertStyle className={`title-active ${item.isActive ? '' : 'title-inactive'}`}>
          {title}
        </TitleAlertStyle>
        <DialogContentTextStyle id="alert-dialog-description" className="subtitle-active">
          {subtitle}
          <span className="subtitle-active-name">{item?.name}</span>?
        </DialogContentTextStyle>
        <Divider />
      </DialogContent>
      <DialogActions sx={{ padding: '16px 24px !important', borderTop: '1px solid #E7E9ED' }}>
        <ButtonCancelStyle className="button-cancel" onClick={onCloseActiveModal}>Hủy</ButtonCancelStyle>
        <ButtonActiveStyle className="button-active" onClick={() => onSubmit(item)}>
          {item.isActive ? 'Tắt' : 'Bật'}
        </ButtonActiveStyle>
      </DialogActions>
    </DialogStyle>
  )
}

export default React.memo(ActiveModal);