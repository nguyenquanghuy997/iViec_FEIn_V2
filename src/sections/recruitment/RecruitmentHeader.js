import HeadingBar from "../../components/heading-bar/HeadingBar";
import { ButtonDS } from "@/components/DesignSystem";
import { View } from "@/components/FlexStyled";
import Iconify from "@/components/Iconify";
import { FormProvider, RHFTextField } from "@/components/hook-form";
import { ButtonFilterStyle } from "@/sections/applicant/style";
import { InputAdornment, Stack } from "@mui/material";

const RecruitmentHeader = ({
  methods,
  onOpenFilterForm,
  onSubmit,
  handleSubmit,
}) => {
  // const [showForm, setShowForm] = useState(false);
  return (
    <HeadingBar sx={{ mb: "28px", position: "fixed", top: 8 }}>
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        padding="16px 16px 4px 16px"
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <RHFTextField
              name="searchKey"
              placeholder="Tìm kiếm theo tiêu đề tin tuyển dụng..."
              sx={{ minWidth: "510px" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ ml: 1.5 }}>
                    <Iconify
                      icon={"eva:search-fill"}
                      sx={{ color: "text.disabled", width: 20, height: 20 }}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </FormProvider>
          <ButtonFilterStyle
            onClick={onOpenFilterForm}
            startIcon={
              <Iconify
                sx={{ height: "18px", width: "18px" }}
                icon="material-symbols:filter-alt-outline"
              />
            }
          >
            Bộ lọc
          </ButtonFilterStyle>
        </View>
        <ButtonDS
          tittle={"Đăng tin tuyển dụng"}
          type="submit"
          sx={{
            textTransform: "none",
            boxShadow: "none",
            height:44
          }}
          // onClick={() => setShowForm(true)}
          icon={
            <Iconify
              icon={"material-symbols:add"}
              width={20}
              height={20}
              color="#fff"
              mr={1}
            />
          }
        />
      </Stack>
      {/* <RecruitmentFormModal show={showForm} setShow={setShowForm} onRefreshData={onRefreshData}/> */}
    </HeadingBar>
  );
};

export default RecruitmentHeader;
