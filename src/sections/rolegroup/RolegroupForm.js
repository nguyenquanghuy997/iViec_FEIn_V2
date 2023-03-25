import { useAddRoleGroupMutation } from "../rolegroup/RoleGroupSlice";
import PipelineTable from "./RolegroupTable";
import { FormProvider, RHFTextField } from "@/components/hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import {
  Typography,
  Stack,
  Divider,
  Switch,
  FormControlLabel,
  Box,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { React, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const InputStyle = { width: "100%", minHeight: 44 };
const ActiveSwitch = styled(Switch)(() => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#388E3C",
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#388E3C",
  },
}));

const PipelineForm = ({ onClose }) => {
  const [addRoleGroup] = useAddRoleGroupMutation();
  const RoleSchema = Yup.object().shape({
    name: Yup.string(),
    description: Yup.string(),
    // registerTime: Yup.date().transform(value => (!value ? new Date().toISOString() : value)).min(Yup.ref('createdTimeFrom')),
    identityRoleIds: Yup.array().min(1),
  });

  const methods = useForm({
    resolver: yupResolver(RoleSchema),
    defaultValues: {
      identityRoleIds: ["a"],
    },
  });
  const {
    handleSubmit,
    control,
    register,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = (values) => {
    addRoleGroup(values);
    onClose();
  };

  useEffect(() => {
    if (isSubmitting) {
      // reset();
    }
  }, [isSubmitting]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {!!errors.afterSubmit && (
        <Alert severity="error">{errors.afterSubmit?.message}</Alert>
      )}
      <Box sx={{ p: 2 }}>
        <Stack sx={{ pb: 2 }}>
          <RHFTextField
            name="name"
            title="Tên vai trò"
            placeholder="Nhập tên vai trò"
            isRequired
            sx={{ ...InputStyle }}
          />
        </Stack>

        <Stack>
          <RHFTextField
            style={{
              width: "100%",
              height: "144px",
              "& .MuiInputBase-root": {
                display: "flex",
                alignItems: "start",
              },
            }}
            name="note"
            title="Mô tả"
            placeholder="Nhập nội dung mô tả..."
            maxLength={150}
          />
        </Stack>
        <Divider />
        <Typography sx={{ py: 2, fontSize: "16px", fontWeight: 600 }}>
          Thiết lập chức năng
        </Typography>
        <PipelineTable control={control} register={register} />
      </Box>
      <div
        style={{
          display: "flex",
          flexDirection: "row",

          position: "fixed",
          bottom: 0,
          background: "#FDFDFD",
          width: "100%",
          padding: "16px 24px ",
          borderTop: "1px solid #EFF3F6",
        }}
      >
        <LoadingButton
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{ backgroundColor: "#1976D2", p: 1, fontSize: 14 }}
        >
          {"Lưu"}
        </LoadingButton>
        <div style={{ width: 8 }} />

        <LoadingButton
          variant="text"
          sx={{ color: "#455570", mr: "290px" }}
          onClick={onClose}
        >
          {"Hủy"}
        </LoadingButton>
        <FormControlLabel
          control={<ActiveSwitch defaultChecked />}
          label="Đang hoạt động"
        />
      </div>
    </FormProvider>
  );
};
export default PipelineForm;
