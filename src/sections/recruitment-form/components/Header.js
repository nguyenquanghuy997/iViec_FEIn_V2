import MuiButton from "@/components/BaseComponents/MuiButton";
import Iconify from "@/components/Iconify";
import HeadingBar from "@/components/heading-bar/HeadingBar";
import { RECRUITMENT_STATUS } from "@/config";
import { PATH_DASHBOARD } from "@/routes/paths";
import {
  DraftIcon,
  PreviewIcon,
} from "@/sections/recruitment-form/icon/HeaderIcon";
import { JobTitleStyle } from "@/sections/recruitment-form/style";
import { STYLE_CONSTANT as style } from "@/theme/palette";
import { Box, IconButton, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useWatch } from "react-hook-form";

const Header = ({
  recruitment,
  title,
  errors,
  onOpenConfirm,
  setShowAlert,
}) => {
  const name = useWatch({ name: "name" });
  const router = useRouter();
  const theme = useTheme();

  const handleSetShowAlert = (data) => {
    if (
      data?.processStatus === RECRUITMENT_STATUS.EXPIRED ||
      data?.processStatus === RECRUITMENT_STATUS.CLOSED
    ) {
      return router.push(PATH_DASHBOARD.recruitment.root);
    } else {
      setShowAlert(true);
    }
  };

  const isDisabled =
    recruitment?.processStatus === RECRUITMENT_STATUS.EXPIRED ||
    recruitment?.processStatus === RECRUITMENT_STATUS.CLOSED;

  return (
    <HeadingBar
      style={{
        position: "fixed",
        top: "64px",
        zIndex: 1001,
        boxShadow: "none",
        borderBottom: "1px solid #E7E9ED",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Stack flexDirection="row" alignItems="center">
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="small"
              sx={{ color: style.COLOR_TEXT_BLACK, mr: 1 }}
              onClick={() => handleSetShowAlert(recruitment)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.52331 9.16689H16.6666V10.8336H6.52331L10.9933 15.3036L9.81498 16.4819L3.33331 10.0002L9.81498 3.51855L10.9933 4.69689L6.52331 9.16689Z"
                  fill="#5C6A82"
                />
              </svg>
            </IconButton>
            <JobTitleStyle className="job-title">{title}</JobTitleStyle>
          </Box>
        </Stack>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            flex: 1,
          }}
        >
          <MuiButton
            title="Lưu nháp"
            color="default"
            disabled={!name || isDisabled}
            onClick={() => onOpenConfirm({ openSaveDraft: true })}
            startIcon={<DraftIcon />}
            sx={{
              fontWeight: 500,
              "&:hover": {
                boxShadow: "none",
              },
              "&.Mui-disabled": {
                color: theme.palette.common.neutral500,
                backgroundColor: theme.palette.common.neutral200,
              },
              "&.MuiButtonBase-root": {
                padding: "8px 12px 8px 16px",
              },
            }}
          />
          <Box sx={{ mx: 1.5 }}>
            <MuiButton
              title="Xem trước"
              color="default"
              onClick={() => onOpenConfirm({ openPreview: true })}
              startIcon={<PreviewIcon />}
              disabled={!name || isDisabled}
              sx={{
                fontWeight: 500,
                "&:hover": {
                  boxShadow: "none",
                },
                "&.Mui-disabled": {
                  color: theme.palette.common.neutral500,
                  backgroundColor: theme.palette.common.neutral200,
                },
                "&.MuiButtonBase-root": {
                  padding: "8px 12px 8px 16px",
                },
              }}
            />
          </Box>
          <MuiButton
            title="Gửi phê duyệt"
            color="default"
            type={!errors ? "submit" : "button"}
            onClick={() =>
              onOpenConfirm({ openSaveApprove: errors ? true : false })
            }
            disabled={!errors || isDisabled}
            startIcon={<Iconify icon="majesticons:send" />}
            sx={{
              fontWeight: 500,
              "&:hover": {
                boxShadow: "none",
              },
              "&.Mui-disabled": {
                color: theme.palette.common.neutral500,
                backgroundColor: theme.palette.common.neutral200,
              },
              "&.MuiButtonBase-root": {
                padding: "8px 12px 8px 16px",
              },
            }}
          />
        </Box>
      </Box>
    </HeadingBar>
  );
};
export default Header;
