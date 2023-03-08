import CloseIcon from "../../assets/CloseIcon";
import { View } from "@/components/FlexStyled";
import { RHFDatePicker, FormProvider } from "@/components/hook-form";
import RHFDropdown from "@/components/hook-form/RHFDropdown";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Typography, Stack, Alert } from "@mui/material";
import { Divider } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const InputStyle = { width: "100%", minHeight: 40 };
const FilterModalPipeline = ({ open, onClose, onOpen }) => {
  const defaultValues = {};
  const ProfileSchema = Yup.object().shape({
    name: Yup.string(),
    provinceId: Yup.string().required("Chưa chọn Tỉnh / Thành phố"),
    districtId: Yup.string().required("Chưa chọn Quận / Huyện"),
    address: Yup.string().required("Chưa nhập Địa chỉ"),
    email: Yup.string()
      .email("Email không đúng định dạng")
      .required("Chưa nhập Email"),
    phoneNumber: Yup.number().required("Chưa nhập Số điện thoại"),
    jobCategories: Yup.array().min(1, "Ngành nghề không được bỏ trống"),
    organizationSize: Yup.string().required("Chưa chọn Quy mô nhân sự"),
    workingEnvironment: Yup.string().required("Chưa nhập Giới thiệu"),
  });

  const methods = useForm({
    mode: "all",
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  const {
    // setValue,
    // setError,
    // handleSubmit,
    // watch,
    formState: { errors, isSubmitting },
  } = methods;
  const list = () => (
    <Box
      sx={{ width: 600 }}
      role="presentation"
      // onKeyDown={toggleDrawer(false)}
    >
      <List
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: 0,
        }}
      >
        <Typography sx={{ p: "22px 24px", fontSize: 16, fontWeight: 600 }}>
          Bộ lọc
        </Typography>
        <Button
          onClick={onClose}
          sx={{
            "&:hover": {
              background: "white",
            },
          }}
        >
          <CloseIcon />
        </Button>
      </List>
      <Divider />
      <FormProvider
        methods={methods}
        //    onSubmit={handleSubmit(onSubmit)}
      >
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit?.message}</Alert>
        )}
        <Stack sx={{ p: 2 }}>
          <Stack sx={{ pb: 2 }}>
            <Typography
              sx={{
                pt: 3.5,
                pb: 2,
                color: "#455570",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Trạng thái
            </Typography>
            <RHFDropdown
              //   options={LIST_ORGANIZATION_SIZE.map((i) => ({
              //     value: i.value,
              //     label: i.name,
              //     name: i.name,
              //   }))}
              style={{ ...InputStyle }}
              name="status"
              multiple={false}
              placeholder="Tất cả"
            />
          </Stack>
          <Divider />
          <Box sx={{ width: "100%", mb: 1 }}>
            <Typography
              sx={{
                pt: 3,
                pb: 2,
                color: "#455570",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Ngày tạo
            </Typography>
            <Stack sx={{ py: 1 }}>
              <RHFDatePicker name="beginDate" />
            </Stack>
            <Stack sx={{ py: 1 }}>
              <RHFDatePicker name="endDate" />
            </Stack>
          </Box>
          <Divider />
          <Stack sx={{ pb: 2 }}>
            <Typography
              sx={{
                pt: 3.5,
                pb: 2,
                color: "#455570",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Người tạo
            </Typography>
            <RHFDropdown
              //   options={LIST_ORGANIZATION_SIZE.map((i) => ({
              //     value: i.value,
              //     label: i.name,
              //     name: i.name,
              //   }))}
              style={{ ...InputStyle }}
              name="status"
              multiple={false}
              placeholder="Chọn 1 hoặc nhiều người"
            />
          </Stack>
          <Divider />
        </Stack>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            position: "fixed",
            bottom: 0,
            p: 2,
            borderTop: "1px solid rgba(145, 158, 171, 0.24)",
            width: "100%",
          }}
        >
          <LoadingButton
            size="large"
            variant="contained"
            loading={isSubmitting}
            // onClick={pressSave}
          >
            Áp dụng
          </LoadingButton>
          <View width={8} />

          <LoadingButton size="large" variant="text">
            Bỏ lọc
          </LoadingButton>
          <View width={8} />
          <View flex1 />

          {/* <RHFSwitch name={"isActive"} label={"Đang hoạt động"} /> */}
        </Stack>
      </FormProvider>
    </Box>
  );

  return (
    <div>
      <Drawer anchor="right" open={open} onClose={onClose} onOpen={onOpen}>
        {list("right")}
      </Drawer>
    </div>
  );
};
export default FilterModalPipeline;
