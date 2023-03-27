import {
  useAddRoleGroupMutation,
  useGetRoleGroupListQuery,
  useUpdateRolegroupMutation,
} from "../rolegroup/RoleGroupSlice";
import PipelineTable from "./RolegroupTable";
import { TextAreaDS } from "@/components/DesignSystem";
import { View } from "@/components/DesignSystem/FlexStyled";
import { FormProvider, RHFTextField } from "@/components/hook-form";
import { Label } from "@/components/hook-form/style";
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
import { useSnackbar } from "notistack";
import { React, useEffect } from "react";
import { useForm } from "react-hook-form";
// import { useFieldArray } from "react-hook-form";
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

const RolegroupForm = ({ onClose }) => {
  const { data: Data } = useGetRoleGroupListQuery();
  const isEditMode = !!Data?.items?.id;
  // const [addRoleGroup] = useAddRoleGroupMutation();
  // const [uploadRoleGroup] = useUpdateRolegroupMutation();
  const { enqueueSnackbar } = useSnackbar();

  const RoleSchema = Yup.object().shape({
    name: Yup.string(),
    description: Yup.string(),
    identityRoleIds: Yup.array().min(1),
  });

  const methods = useForm({
    resolver: yupResolver(RoleSchema),
    defaultValues: {},
  });

  const {
    setValue,
    handleSubmit,
    control,
    register,
    formState: { errors, isSubmitting },
  } = methods;

  // const { fields, append } = useFieldArray({
  //   control,
  //   name: "identityRoleIds",
  // });

  const onSubmit = async (d) => {
    const res = {
      id: isEditMode ? Data?.items?.id : Data?.id,
      name: d?.name,
      description: d?.description,
      organizationBusinessDatas: d.organizationBusinessDatas,
    };

    if (isEditMode) {
      try {
        await useUpdateRolegroupMutation(res).unwrap();
        enqueueSnackbar("Chỉnh sửa thành công!", {
          autoHideDuration: 2000,
        });
        onClose();
      } catch (err) {
        enqueueSnackbar("Thực hiện thất bại!", {
          autoHideDuration: 1000,
          variant: "error",
        });
      }
    } else {
      try {
        await useAddRoleGroupMutation(res).unwrap();
        enqueueSnackbar("Thêm thành công!", {
          autoHideDuration: 2000,
        });
        onClose();
      } catch (err) {
        enqueueSnackbar("Thực hiện thất bại!", {
          autoHideDuration: 1000,
          variant: "error",
        });
      }
    }
  };
  const renderTitle = (title, required) => {
    return <Label required={required}>{title}</Label>;
  };

  useEffect(() => {
    if (!Data) return;
    setValue(
      "organizationBusinessDatas"
      // Data?.organizationBusiness.organizationBusinessDatas
    );
  }, [JSON.stringify(Data)]);

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

        <Stack justifyContent="space-between" sx={{ mb: 3 }}>
          <View mb={24}>
            {renderTitle("Mô tả")}
            <TextAreaDS
              maxLength={150}
              placeholder="Nhập nội dung mô tả...
              "
              name="description"
            />
          </View>
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
export default RolegroupForm;
