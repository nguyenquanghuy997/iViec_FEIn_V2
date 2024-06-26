import MuiButton from "@/components/BaseComponents/MuiButton";
import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const CreateExamHeader = ({
  isCreate,
  // handleSaveDraft,
  handlePreview,
  handleSave,
  handleCancel,
}) => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flex: 1,
          background: theme.palette.common.white,
          border: "1px solid " + theme.palette.common.neutral100,
          borderRadius: "4px",
          padding: "16px 24px",
        }}
      >
        <Box>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              color="inherit"
              href="/settings/exam/exam-business"
              sx={{
                fontSize: ".875rem",
                fontWeight: 600,
                color: theme.palette.common.neutral500,
              }}
            >
              Danh sách đề thi
            </Link>
            <Typography
              sx={{
                fontSize: ".875rem",
                fontWeight: 600,
                color: theme.palette.common.neutral700,
              }}
            >
              {isCreate ? "Tạo mới đề thi" : "Chỉnh sửa đề thi"}
            </Typography>
          </Breadcrumbs>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <MuiButton
            onClick={handleCancel}
            title={"Hủy"}
            color="basic"
            className={"btn-actions btn-cancel"}
            sx={{
              padding: "8px 12px",
            }}
          />

          <MuiButton
            title="Xem trước"
            color="default"
            onClick={handlePreview}
            // disabled={!name || isDisabled}
            sx={{
              fontWeight: 500,
              padding: "8px 12px",
              margin: "0 1rem",
              "&:hover": {
                boxShadow: "none",
              },
              "&.Mui-disabled": {
                color: theme.palette.common.neutral500,
                backgroundColor: theme.palette.common.neutral200,
              },
            }}
          />

          {/* <MuiButton
            title="Lưu nháp"
            color="default"
            // disabled={!name || isDisabled}
            onClick={handleSaveDraft}
            sx={{
              marginRight: "1rem",
              padding: "8px 12px",
              fontWeight: 500,
              "&:hover": {
                boxShadow: "none",
              },
              "&.Mui-disabled": {
                color: theme.palette.common.neutral500,
                backgroundColor: theme.palette.common.neutral200,
              },
            }}
          /> */}

          <MuiButton
            onClick={handleSave}
            title={"Lưu"}
            color={"primary"}
            className={"btn-actions btn-confirm"}
            sx={{
              padding: "8px 12px",
            }}
          />
        </Box>
      </Box>
      
    </>
  );
};

export default CreateExamHeader;
