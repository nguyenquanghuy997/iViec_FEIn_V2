import { View } from "@/components/FlexStyled";
import Iconify from "@/components/Iconify";
import { FormProvider, RHFTextField } from "@/components/hook-form";
import { ButtonFilterStyle } from "@/sections/applicant/style";
import { InputAdornment, Stack, Button } from "@mui/material";
import SvgIcon from "@/components/SvgIcon";
import {useTheme} from "@mui/material/styles";
const  theme = useTheme();
const RolegroupHeader = ({
  methods,
  onOpenFilterForm,
  onSubmit,
  handleSubmit,
  onOpenAddForm,
  canEdit,
}) => {
  return (
    <>
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
              placeholder="Tìm kiếm quy trình tuyển dụng"
              sx={{
                minWidth: "360px",
                borderRadius: '6px',
                background: theme.palette.common.bgrMaster,
                height: "36px",
                ".MuiInput-root": {
                  height: "36px",
                  minHeight: "36px",
                  border:'none'
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ ml: 0.5, mr:0 }}>
                    <Iconify
                      icon={"eva:search-fill"}
                      sx={{ color: "#5C6A82", width: 20, height: 20 }}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </FormProvider>

          <ButtonFilterStyle
            style={{height:36}}
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

        {canEdit && (
        <Button
          style={{
            padding: "8px 12px 8px 14px",
            marginLeft: "16px",
            display: "flex",
            justifyContent: "end",
            borderRadius: 4,
            background: "#1976D2",
            textDecoration: "none",
          }}
          onClick={onOpenAddForm}
        >
          <SvgIcon>
            {`
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.16669 9.16667V4.16667H10.8334V9.16667H15.8334V10.8333H10.8334V15.8333H9.16669V10.8333H4.16669V9.16667H9.16669Z" fill="#FDFDFD"/>
        </svg>
          `}
          </SvgIcon>

          <span
            style={{
              fontSize: 15,
              fontWeight: "600",
              lineHeight: 20 / 15,
              marginLeft: 8,
              color: "white",
              textTransform:'none'
            }}
          >
            {"Thêm vai trò"}
          </span>
        </Button>
        )}
      </Stack>
    </>
  );
};

export default RolegroupHeader;
