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
import {
  makeStyles,
  /*withStyles*/
} from "@mui/styles";
import { useForm } from "react-hook-form";

const useStyles = makeStyles({
  firstStyle: {
    width: `300px`,
    color: "#1976D2",
    borderRadius: `6px`,
    padding: `14px 0`,
    maxHeight: `44px`,
    backgroundColor: "#E3F2FD",
    "&:hover": {
      backgroundColor: "#BBDEFB",
    },
  },
  secondStyle:{
    width: `100%`,
    color: "#455570",
    "&:hover": {
      backgroundColor: "#EFF3F6",
      borderColor:'#455570'
    },
    justifyContent: `space-between`,
    border:`1px solid #455570`,
    borderRadius: `6px`,
    padding: `14px 18px`,
    maxHeight: `44px`,
  },
  thirdStyle: {
    width: `300px`,
    color: "white",
    borderRadius: `6px`,
    padding: `14px 0`,
    maxHeight: `44px`,
    backgroundColor: "#1976D2",
    "&:hover": {
      backgroundColor: "#1565C0",
    },
  },
});
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
  const classes = useStyles();
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
        <ButtonSystem variant="outlined" className={classes.secondStyle} icon={Icon.plus} text="Đăng nhập bằng Google" variant="outlined" />
        <br />
        <ButtonSystem text="Đăng nhập" variant="contained" className={classes.thirdStyle}/>
        <br />
        <ButtonSystem
          className={classes.firstStyle}
          text="Button"
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
