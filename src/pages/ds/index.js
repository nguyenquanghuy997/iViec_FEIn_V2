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

        <ButtonSystem
          color="basic"
          icon={Icon.plus}
          text="Đăng nhập bằng Google - basic"
          variant="outlined"
        />
        <br/>
        <ButtonSystem
        color="warning"
        hoverColor='#FAB428'
        text="Cảnh báo"
        variant="contained"
      />


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
