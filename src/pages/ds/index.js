import Page from "@/components/Page";
import {
  ButtonDS,
} from "@/components/DesignSystem/ButtonDS";
import {
  AvatarDS,
} from "@/components/DesignSystem/AvatarDS";
import { Container } from '@mui/material'
import HeaderBreadcrumbs from '@/components/HeaderBreadcrumbs'
import Box from '@mui/material/Box';
import {
  FormProvider,
  RHFCheckbox,
  RHFSwitch,
  RHFTextField,
} from "@/components/hook-form";
import { useForm } from "react-hook-form";
import { DropDown } from "@/components/DesignSystem/DropDown";
export default function Jobs() {
  const defaultValues = {
    name: "",
    list: [],
    isDefault: false,
    isActive: true,
  };
  const methods = useForm({
    defaultValues,
    // resolver: yupResolver(Schema),
  });
  return (
    <Page title={"Design systems"}>
      <Container maxWidth={'lg'}>
        <HeaderBreadcrumbs
          heading={"Design systems"}
        />
        <ButtonDS
          size='large'
          tittle={'ĐĂNG NHẬP'}
          isSubmitting={false}
          type="submit"
        />
        <Box mt={2} />
        <AvatarDS linkAvatar={`https://www.elle.vn/wp-content/uploads/2017/07/25/hinh-anh-dep-1.jpg`} />
        <br/>
        <DropDown />
        <Box mt={2} />
        <FormProvider methods={methods}>
          <RHFCheckbox
            name={"isDefault"}
            label={"Đặt làm mẫu đánh giá mặc định"}
          />
          <RHFSwitch name={"isActive"} label={"Đang hoạt động"} />
          <RHFTextField name={"name"} />
        </FormProvider>
      </Container>



    </Page>
  );
}