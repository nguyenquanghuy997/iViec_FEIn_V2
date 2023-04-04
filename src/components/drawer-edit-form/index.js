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
  title = '',
  statusField = 'isActivated',
  onSubmit,
  children,
}) {
  const theme = useTheme();

  const validateSchema = Yup.object().shape(validateFields);
  const methods = useForm({
    resolver: yupResolver(validateSchema),
    defaultValues: {
    },
  });
  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    reset,
  } = methods;

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        ...methods,
      });
    }
    return child;
  });

  const toggleDrawer = (isOpen, event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    if (onClose) {
      onClose();
    }
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={(e) => toggleDrawer(false, e)}
      PaperProps={{
        sx: drawerPaperStyle(theme),
      }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
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
            >
              Lưu
            </Button>

            <Button
              variant="text"
              color="basic"
              onClick={() => {
                reset();
                onClose();
              }}
              height={36}
            >
              Hủy
            </Button>
          </Box>

          <SwitchStatusDS
            name={statusField}
            label={'Đang hoạt động'}
          />
        </Box>
      </FormProvider>
    </Drawer>
  )
}