import { LogoHeader } from "@/components/BaseComponents";
import { ButtonDS, AvatarDS, DividerDS } from "@/components/DesignSystem";
import ButtonIcon from "@/components/DesignSystem/ButtonIcon";
import ButtonSystem from "@/components/DesignSystem/ButtonSystem";
import { DropDown } from "@/components/DesignSystem/DropDown";
import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import Page from "@/components/Page";
import SvgIconStyle from "@/components/SvgIconStyle";
import {
  FormProvider,
  RHFCheckbox,
  RHFSwitch,
  RHFTextField,
} from "@/components/hook-form";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";

export default function Jobs() {
  const defaultValues = {
    name: "",
    list: [],
    isDefault: false,
    isActive: true,
  };
  const methods = useForm({
    defaultValues,
  });

  const getIcon = (name) => (
    <SvgIconStyle
      src={`/assets/icons/ds/${name}.svg`}
      sx={{ width: 16.67, height: 16.67 }}
    />
  );
  const Icon = { plus: getIcon("ic_plus") };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#1976D2",
        contrastText: "#fff",
      },
      warning: {
        main: "#F77A0C",
        contrastText: "#fff",
      },
      basic: {
        main: "#455570",
        contrastText: "#455570",
      },
      success: {
        main: "#388E3C",
        contrastText: "#fff",
      },
      error: {
        main: "#D32F2F",
        contrastText: "#fff",
      },
      neutral: {
        main: "#FBBD2B",
        contrastText: "#fff",
      },
    },
  });
  return (
    <Page title={"Design systems"}>
      <Container maxWidth={"lg"}>
        <HeaderBreadcrumbs heading={"Design systems"} />
        <LogoHeader />
        <ButtonDS
          size="small"
          tittle={"ĐĂNG NHẬP"}
          isSubmitting={false}
          type="submit"
        />
        <Box mt={2} />
        <AvatarDS
          linkAvatar={`https://www.elle.vn/wp-content/uploads/2017/07/25/hinh-anh-dep-1.jpg`}
        />
        <br />
        <DropDown />
        <br />
        <ButtonIcon content={Icon.plus} />
        <br />
        <ThemeProvider theme={theme}>
          <ButtonSystem
            color="basic"
            icon={Icon.plus}
            text="Đăng nhập bằng Google - basic"
            variant="outlined"
          />
        </ThemeProvider>
        <br />
        <ThemeProvider theme={theme}>
          <ButtonSystem color="primary" text="primary" variant="contained" />
        </ThemeProvider>
        <br />
        {/* button */}
        <ThemeProvider theme={theme}>
          <ButtonSystem color="warning" text="Warning" variant="contained" />
        </ThemeProvider>
        <br />
        {/* button */}
        <ThemeProvider theme={theme}>
          <ButtonSystem color="success" text="Success" variant="contained" />
        </ThemeProvider>
        <br />
        {/* button */}
        <ThemeProvider theme={theme}>
          <ButtonSystem color="error" text="error" variant="contained" />
        </ThemeProvider>
        <br />
        {/* button */}
        <ThemeProvider theme={theme}>
          <ButtonSystem color="neutral" text="neutral" variant="contained" />
        </ThemeProvider>

        <Box mt={2} />
        <FormProvider methods={methods}>
          <RHFCheckbox
            name={"isDefault"}
            label={"Đặt làm mẫu đánh giá mặc định"}
          />
          <RHFSwitch name={"isActive"} label={"Đang hoạt động"} />
          <RHFTextField name={"name"} />
        </FormProvider>
        <DividerDS />
      </Container>
    </Page>
  );
}
