import { createContext, useState, useMemo } from 'react';
import { Modal as MuiModal, Box, IconButton, Typography } from '@mui/material';
import {
  RiCloseFill,
  RiErrorWarningLine,
} from 'react-icons/ri';
import { Button } from '@/components/DesignSystem';
import { ModalBox } from '@/components/modal/styles';

const ConfirmModalContext = createContext()

const ConfirmModalProvider = ({ children }) => {
  const defaultConfig = {
    open: false,
    title: "Xác nhận",
    content: "Xác nhận",
    okText: null,
    cancelText: "Hủy",
    width: 600,
    hasClose: true,
    buttonsDirection: 'horizontal',
    btnOkProps: {},
    btnCancelProps: {},
  };

  const [config, setConfig] = useState(defaultConfig);
  const [confirmLoading, setConfirmLoading] = useState(false);

  let {
    open,
    title,
    content,
    okText,
    cancelText,
    confirmImage,
    confirmIcon,
    confirmType,
    onOk,
    onCancel,
    width,
    hasClose,
    buttonsDirection,
    btnOkProps,
    btnCancelProps,
    ...props
  } = config;

  const configColor = useMemo(() => {
    if (confirmType === 'warning') {
      return {
        title: '#E53935',
        button: '#D32F2F',
      };
    }
    if (confirmType === 'info') {
      return {
        title: '#1976D2',
        button: '#1976D2',
      };
    }
    if (confirmType === 'success') {
      return {
        title: '#388E3C',
        button: '#388E3C',
      };
    }
    return {
      title: '#455570',
      button: '#1976D2',
    };
  }, [confirmType]);

  const getIcon = () => {
    if (confirmIcon) {
      return confirmIcon;
    }

    if (confirmType === 'warning') {
      return <RiErrorWarningLine size={54} color={configColor.title} />
    }
    return null;
  }

  const closeConfirm = () => {
    if (onCancel) {
      onCancel();
    }
    setConfig({
      ...defaultConfig,
      open: false,
    });
  }

  const confirmModal = (options = {}) => {
    setConfig({
      ...config,
      ...options,
      open: true,
    });
  }

  const handleClickOk = async () => {
    if (!onOk) {
      closeConfirm();
      return;
    }
    setConfirmLoading(true);
    await onOk(closeConfirm);
    setConfirmLoading(false);
  }

  return (
    <ConfirmModalContext.Provider
      value={{
        confirmModal,
        alertModal: confirmModal,
        closeConfirm,
        confirmLoading,
        setConfirmLoading,
      }}
    >
      {children}

      <MuiModal
        open={open}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 12005,
        }}
        {...props}
      >
        <ModalBox width={width} className="modal-content-box alert-modal">
          {hasClose && (
            <Box className="modal-header">
              <div></div>
              <IconButton onClick={closeConfirm}>
                <RiCloseFill />
              </IconButton>
            </Box>
          )}

          <Box className="modal-body">
            {confirmImage && (
              <img className="alert-image" src={confirmImage} />
            )}

            {getIcon()}

            {title && (
              <Typography
                variant="body1"
                fontWeight={600}
                sx={{ mb: 1, color: configColor.title }}
              >
                {title}
              </Typography>
            )}

            {content}
          </Box>

          <Box className={'modal-footer' + (
            buttonsDirection === 'vertical' ? ' btns-vertical' : ' btns-horizontal'
          )}>
            {okText && (
              <Button
                fullWidth
                className="btn-ok"
                onClick={handleClickOk}
                height={36}
                loading={confirmLoading}
                color="primary"
                variant="contained"
                {...btnOkProps}
                sx={{
                  background: configColor.button,
                  '&:hover': {
                    background: configColor.button,
                  },
                  ...btnOkProps.sx
                }}
              >
                {okText}
              </Button>
            )}

            {cancelText && (
              <Button
                fullWidth
                className="btn-cancel"
                onClick={closeConfirm}
                height={36}
                color="basic"
                {...btnCancelProps}
                sx={{ mr: 1, ...btnCancelProps.sx }}
              >
                {cancelText}
              </Button>
            )}
          </Box>
        </ModalBox>
      </MuiModal>
    </ConfirmModalContext.Provider>
  )
}

export { ConfirmModalContext, ConfirmModalProvider }
