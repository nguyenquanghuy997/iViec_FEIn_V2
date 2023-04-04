import { SwitchStatusDS } from "@/components/DesignSystem";
import { Box, Typography, Button } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";

const HeaderCard = ({ data, text, onOpen }) => {
  const defaultValues = {};
  const methods = useForm({
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <Box
        sx={{
          background: "white",
          mt: 3,
          py: 2.5,
          px: 5,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ m: "auto 0", fontSize: 16, fontWeight: 600 }}>
          {text}
        </Typography>
        <Box sx={{display:'flex'}}>
          <SwitchStatusDS
            name={"isActivated"}
            label={data?.isActivated ? "Hiển thị" : "Không hiển thị"}
          />
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
