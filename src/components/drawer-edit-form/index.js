import React from 'react';
import { Drawer, Box, Alert, Typography, IconButton, useTheme } from "@mui/material";
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
  onClose,
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
  cancelCallback,
  children,
  ...props
}) {
  const theme = useTheme();

  const validateSchema = Yup.object().shape(validateFields);
  const methods = useForm({
    resolver: yupResolver(validateSchema),
    defaultValues: {
      [statusField]: true,
      ...defaultValues,
    },
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

  const toggleDrawer = (isOpen, event, btnClose = false) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    if (!isOpen) {
      if (onClose) {
        onClose();
      }
      if (resetOnClose) {
        reset(defaultValues);
      }
      if (btnClose && cancelCallback) {
        cancelCallback();
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

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={(e) => toggleDrawer(false, e)}
      PaperProps={{
        sx: drawerPaperStyle({ ...theme, width, contentStyles }),
      }}
      ModalProps={{
        sx: modalStyles,
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
              onClick={e => toggleDrawer(false, e, true)}
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
  )
}