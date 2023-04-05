import { useUpdateCompanyEndingMutation } from "./companyInforSlice";
// import { SwitchStatusDS } from "@/components/DesignSystem";
import { Box, Typography, Button } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";

const HeaderCard = ({ data, text, onOpen, }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [updateVisible] = useUpdateCompanyEndingMutation();
  const defaultValues = {};
  const methods = useForm({
    defaultValues,
  });
  const {
    // setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (d) => {
    try {
      const res = {
        isHumansVisible:d?.isHumansVisible
      };
      try {
        await updateVisible(res).unwrap();
        enqueueSnackbar("Chỉnh sửa Lời kết công ty thành công!", {
          autoHideDuration: 2000,
        });
      } catch (err) {
        enqueueSnackbar(errors.afterSubmit?.message, {
          autoHideDuration: 1000,
          variant: "error",
        });
      }
    } catch (err) {
      const message =
        err?.Errors?.[0]?.Description || err?.data?.message || err?.message;
      setError("afterSubmit", { ...err, message });
      enqueueSnackbar(errors.afterSubmit?.message);
    }
  };

  useEffect(() => {
    if (!data) return;
    // setDescription(data.conclusion);
  }, [JSON.stringify(data)]);
  return (
    <FormProvider {...methods} onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          background: "white",
          mt: 3,
          py: 2.5,
          px: 5,
          display: "flex",
          justifyContent: "space-between",
          borderTopLeftRadius: '4px',
          borderTopRightRadius: '4px',
        }}
      >
        <Typography sx={{ m: "auto 0", fontSize: 16, fontWeight: 600 }}>
          {text}
        </Typography>
        <Box sx={{ display: "flex" }}>
          {/* <SwitchStatusDS
            name={name}
            label={data ? "Hiển thị" : "Không hiển thị"}
          /> */}
          <Button
            sx={{
              padding: "8px 12px 8px 14px",
              background: "#F3F4F6",
              textDecoration: "none",
              color: "#455570",
              ml: 2,
              fontWeight: 500,
            }}
            onClick={onOpen}
          >
            {"Chỉnh sửa "}
          </Button>
        </Box>
      </Box>
    </FormProvider>
  );
};
export default HeaderCard;
