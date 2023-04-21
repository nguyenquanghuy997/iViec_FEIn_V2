import React, { useMemo } from 'react';
import {
  Drawer,
  Box,
  Alert,
  Typography,
  IconButton,
  useTheme,
  ClickAwayListener,
} from "@mui/material";
import { Button, SwitchStatusDS } from "../DesignSystem";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider } from "@/components/hook-form";
import { pxToRem } from '@/utils/getFontValue';
import { RiCloseLine } from 'react-icons/ri';

import { drawerPaperStyle } from "./styles";

export default function DrawerEditForm({
  open,
  onClose, // on close
  onCancel, // custom on btn cancel click
  validateFields = {},
  defaultValues = {},
  title = '',
  statusField = 'isActivated',
  onSubmit,
  initing = false,
  width,
  activeText = 'Đang hoạt động',
  inActiveText = 'Không hoạt động',
  okText = 'Lưu',
  cancelText = 'Hủy',
  contentStyles = {},
  modalStyles = {},
  resetOnClose = true,
  keepMounted = false,
  _btnOpen,
  children,
  ...props
}) {
  const theme = useTheme();

  const validateSchema = Yup.object().shape(validateFields);
  const methods = useForm({
    resolver: yupResolver(validateSchema),
    defaultValues: useMemo(() => defaultValues, [defaultValues]),
  });
  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    reset,
    watch,
  } = methods;

  const isActive = watch(statusField);

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        ...methods,
      });
    }
    return child;
  });

  const toggleDrawer = (isOpen, event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    if (!isOpen) {
      if (onClose) {
        onClose();
      }
      if (resetOnClose) {
        reset(defaultValues);
      }
    }
  }

  const handleOnSubmit = (data) => {
    onSubmit(data, () => {
      if (onClose) onClose();
      if (resetOnClose) {
        reset(defaultValues);
      }
    });
  }

  const handleCancel = (e) => {
    if (onCancel) {
      return onCancel();
    }
    toggleDrawer(false, e, true)
  }

  return (
    <ClickAwayListener
      onClickAway={(e) => {
        if (props.variant !== 'persistent') {
          return;
        }
        if (e.target.contains(_btnOpen.current)) {
          return;
        }
        toggleDrawer(false);
      }}
    >
      <Drawer
        anchor="right"
        open={open}
        onClose={(e) => toggleDrawer(false, e)}
        PaperProps={{
          sx: drawerPaperStyle({ ...theme, width, contentStyles }),
        }}
        ModalProps={{
          sx: modalStyles,
          keepMounted: keepMounted,
        }}
        {...props}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(handleOnSubmit)}>
          <Box display="flex" alignItems="center" justifyContent="space-between" className="edit-header">
            <Typography fontSize={pxToRem(16)} fontWeight={600}>
              {title}
            </Typography>

            <IconButton onClick={e => toggleDrawer(false, e)}>
              <RiCloseLine size={20} />
            </IconButton>
          </Box>

          {!!errors.afterSubmit && (
            <Alert severity="error">{errors.afterSubmit?.message}</Alert>
          )}

          <div className="edit-container">
            {childrenWithProps}
          </div>

          <Box display="flex" className="edit-footer">
            <Box flex={1}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                loading={isSubmitting}
                height={36}
                sx={{ mr: 1 }}
                disabled={initing}
              >
                {okText}
              </Button>

              <Button
                variant="text"
                color="basic"
                onClick={handleCancel}
                height={36}
              >
                {cancelText}
              </Button>
            </Box>

            <SwitchStatusDS
              name={statusField}
              label={isActive ? activeText : inActiveText}
            />
          </Box>
        </FormProvider>
      </Drawer>
    </ClickAwayListener>
  )
}