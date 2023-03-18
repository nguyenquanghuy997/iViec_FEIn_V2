import WatchIcon from "../../../assets/interview/WatchIcon";
import CloseIcon from "@/assets/CloseIcon";
import { FormProvider } from "@/components/hook-form";
import { RHFTextField } from "@/components/hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Dialog,
  DialogTitle,
  Divider,
  DialogContent,
  InputAdornment,
  Stack,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { Alert } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const AddGroupForm = ({ open, onClose }) => {
  const defaultValues = {};
  const TimeSchema = Yup.object().shape({
    // createdTimeTo: Yup.date().transform(value => (!value ? new Date().toISOString() : value)).min(
    //     Yup.ref('createdTimeFrom'),
    //     "Thời gian kết thúc phải lớn hơn thời gian bắt đầu"
    // ),
    heightTo: Yup.number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .min(
        Yup.ref("heightFrom"),
        "Chiều cao cần lớn hơn hoặc bằng chiều cao bắt đầu"
      ),
    weightTo: Yup.number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .min(
        Yup.ref("weightFrom"),
        "Cân nặng cần lớn hơn hoặc bằng cân nặng bắt đầu"
      ),
    expectSalaryTo: Yup.number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .min(
        Yup.ref("expectSalaryFrom"),
        "Mức lương cần lớn hơn hoặc bằng mức lương bắt đầu"
      ),
  });

  const methods = useForm({
    mode: "all",
    resolver: yupResolver(TimeSchema),
    // defaultValues: useMemo(() => defaultValues, [query]),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;
  const onSubmit = () => {
    console.log("hihidhiad");
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Dialog
        onClose={onClose}
        open={open}
        sx={{
          "& .MuiPaper-root": {
            width: "600px",
            borderRadius: "6px!important",
          },
        }}
      >
        <DialogTitle
          sx={{ p: 0, display: "flex", justifyContent: "space-between" }}
        >
          <Typography
            variant="h5"
            component="h5"
            sx={{
              ml: 3,
              color: "#172B4D",
              display: "flex",
              alignItems: "center",
            }}
          >
            Thêm nhóm phỏng vấn
          </Typography>
          <DialogActions onClick={onClose}>
            <CloseIcon />
          </DialogActions>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Stack spacing={3}>
            {!!errors.afterSubmit && (
              <Alert severity="error">{errors.afterSubmit.message}</Alert>
            )}

            <Stack>
              <RHFTextField
                name="name"
                title="Tên nhóm"
                placeholder="Nhập tên nhóm"
                isRequired
                sx={{ width: '100%', minHeight: 44 }}
              />
            </Stack>

            <Stack>
              <RHFTextField
                isRequired
                sx={{ width: '100%', minHeight: 44 }}
                name="time"
                title="Thười lượng phỏng vấn"
                placeholder="Nhập số phút"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" sx={{ mr: 2 }}>
                      <WatchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
          </Stack>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={onClose} sx={{ color: "#455570" }}>
            Hủy
          </Button>
          <Button
            onClick={onClose}
            sx={{ color: "white", background: "#1976D2" }}
          >
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
};
export default AddGroupForm;
