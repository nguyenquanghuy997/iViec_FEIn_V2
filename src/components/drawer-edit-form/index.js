import { Button, SwitchStatusDS } from "../DesignSystem";
import { Text, View } from "../FlexStyled";
import SvgIcon from "../SvgIcon";
import { drawerPaperStyle } from "./styles";
import { FormProvider } from "@/components/hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Box,
  ClickAwayListener,
  Divider,
  Drawer,
  IconButton,
  useTheme,
} from "@mui/material";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

export default function DrawerEditForm({
  open,
  onClose, // on close
  onCancel, // custom on btn cancel click
  validateFields = {},
  defaultValues = {},
  title = "",
  statusField = "isActivated",
  onSubmit,
  initing = false,
  width,
  activeText = "Đang hoạt động",
  inActiveText = "Không hoạt động",
  okText = "Lưu",
  cancelText = "Hủy",
  contentStyles = {},
  modalStyles = {},
  hasBackdropBackground = true,
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

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        ...methods,
      });
    }
    return child;
  });

  const toggleDrawer = (isOpen, event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
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
  };

  const handleOnSubmit = (data) => {
    if (onClose) onClose();
    onSubmit(data, () => {
      if (resetOnClose) {
        reset(defaultValues);
      }
    });
  };

  const handleCancel = (e) => {
    if (onCancel) {
      return onCancel();
    }
    toggleDrawer(false, e, true);
  };

  return (
    <ClickAwayListener
      onClickAway={(e) => {
        if (props.variant !== "persistent") {
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
        BackdropProps={{
          sx: {
            background: "rgba(0, 0, 0, 0.25)",
          },
        }}
        ModalProps={{
          sx: {
            ".MuiModal-backdrop": { background: hasBackdropBackground ? "rgba(9, 30, 66, 0.25)" : 'none' },
            ...modalStyles,
          },
          keepMounted: keepMounted,
        }}
        {...props}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(handleOnSubmit)}>
          <View
            flexRow
            atCenter
            jcBetween
            p={16}
            bgColor={theme.palette.common.white}
          >
            <Text fontSize={20} fontWeight={600}>
              {title}
            </Text>

            <IconButton onClick={(e) => toggleDrawer(false, e)}>
              <SvgIcon>
                {
                  '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_8888_127779)"> <path d="M8.99956 7.93949L12.7121 4.22699L13.7726 5.28749L10.0601 8.99999L13.7726 12.7125L12.7121 13.773L8.99956 10.0605L5.28706 13.773L4.22656 12.7125L7.93906 8.99999L4.22656 5.28749L5.28706 4.22699L8.99956 7.93949Z" fill="#455570"/> </g> <defs> <clipPath id="clip0_8888_127779"> <rect width="18" height="18" fill="white"/> </clipPath> </defs> </svg>'
                }
              </SvgIcon>
            </IconButton>
          </View>
          <Divider />

          {!!errors.afterSubmit && (
            <Alert severity="error">{errors.afterSubmit?.message}</Alert>
          )}

          <div className="edit-container">{childrenWithProps}</div>

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
  );
}
