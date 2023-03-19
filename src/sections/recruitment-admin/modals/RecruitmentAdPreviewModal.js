import {
  useAddInternalApprovalRecruitmentsMutation,
  useGetRecruitmentAdByIdQuery,
} from "../RecruitmentAdSlice";
import { ButtonDS } from "@/components/DesignSystem";
import Iconify from "@/components/Iconify";
import {
  HeaderPreviewStyle,
  FooterPreviewStyle,
  ButtonCancel,
} from "@/utils/cssStyles";
import { RecruitmentWorkingForm } from "@/utils/enum";
import { errorMessagesRe } from "@/utils/errorMessages";
import { currencyFormat } from "@/utils/formatNumber";
import {
  Box,
  Divider,
  Drawer,
  Grid,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";

const BoxSummary = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  // minWidth: "282.33px",
  marginBottom: "24px",
  "& .MuiIconButton-root": {
    backgroundColor: "#F2F4F5",
    marginRight: "12px",
  },
  "& .title-summary": {
    color: "#5C6A82",
    fontWeight: "500",
    fontSize: "13px",
    lineHeight: "20px",
    alignText: "stretch",
  },
  "& .detail-summary": {
    fontWeight: "600",
    fontSize: "12px",
    lineHeight: "20px",
    alignText: "stretch",
    color: "#172B4D",
  },
}));
const BoxDetail = styled(Box)(() => {
  return {
    marginTop: "4px",
    marginBottom: "32px",
    "& .typoTitle": {
      fontSize: "16px",
      fontWeight: 600,
      lineHeight: "26px",
      color: "#172B4D",
    },
    "& .typoContent": {
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "24px",
      color: "#455570",
      whiteSpace: "pre-line",
    },
  };
});
const renderJobSummary = (icon, title, detail) => {
  return (
    <BoxSummary>
      <IconButton disableRipple>{icon}</IconButton>
      <Box>
        <Typography className="title-summary">{title}</Typography>
        <Typography className="detail-summary">{detail}</Typography>
      </Box>
    </BoxSummary>
  );
};

const renderJobDetail = (title, content) => {
  return (
    <BoxDetail>
      <Typography className="typoTitle" sx={{ marginBottom: "12px" }}>
        {title}
      </Typography>
      <Typography
        className="typoContent"
        variant="body1"
        sx={{ whiteSpace: "pre-line" }}
      >
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Typography>
    </BoxDetail>
  );
};

const RecruitmentAdPreviewModal = ({
  showConfirmMultiple,
  setShowConfirmMultiple,
  recruitmentId,
  handleShowConfirmMultiple,
  onClose
}) => {
  const { data: recruitment } = useGetRecruitmentAdByIdQuery({
    Id: recruitmentId,
  });
  const { recruitmentJobCategories = [] } = recruitment || [];
  const { recruitmentWorkingForms = [] } = recruitment || [];

  const renderSalary = (job, shortZero = false) => {
    let { salaryDisplayType, minSalary, maxSalary, currencyUnit } = job || [];
    let options = {};
    if (shortZero) {
      minSalary = minSalary / 1000000;
      maxSalary = maxSalary / 1000000;
      options = { unit: currencyUnit === 0 ? "triệu" : "milion" };
    }

    if (salaryDisplayType === 0) {
      return "Không lương";
    }
    if (salaryDisplayType === 1) {
      return "Thỏa thuận";
    }
    if (minSalary === null && maxSalary) {
      return currencyFormat(maxSalary, currencyUnit, true, options);
    }
    if (maxSalary === null && minSalary) {
      return currencyFormat(minSalary, currencyUnit, true, options);
    }
    if (minSalary === maxSalary) {
      return currencyFormat(minSalary, currencyUnit, true, options);
    }
    return (
      currencyFormat(minSalary, currencyUnit, false) +
      " - " +
      currencyFormat(maxSalary, currencyUnit, true, options)
    );
  };
  const { enqueueSnackbar } = useSnackbar();
  const [internalApprovalRecruitments] =
    useAddInternalApprovalRecruitmentsMutation();
  const handleApproveRecruitment = async () => {
    try {
      await internalApprovalRecruitments({ ids: [recruitmentId] }).unwrap();
      var noti = "Phê duyệt thành công tin tuyển dụng";
      enqueueSnackbar(noti);
      onClose()
    } catch (err) {
      enqueueSnackbar(errorMessagesRe[`${err}`], {
        autoHideDuration: 1000,
        variant: "error",
      });
    }
  };
  return (
    <>
      <Drawer
        open={showConfirmMultiple}
        onClose={() => setShowConfirmMultiple(false)}
        anchor="right"
        PaperProps={{
          sx: {
            width: { xs: 1, sm: 560, md: 600 },
            boxShadow:
              "-3px 0px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)",
          },
        }}
      >
        <HeaderPreviewStyle className="form-head">
          <Typography
            variant="body1"
            sx={{ fontSize: "16px", fontWeight: 600, color: "#172B4D" }}
          >
            Xem chi tiết tin tuyển dụng
          </Typography>
        </HeaderPreviewStyle>
        <Divider />
        <Box sx={{ py: 3, px: 3, mt: 8, mb: 8 }}>
          <Grid
            xs={12}
            sm={6}
            md={8}
            display={"flex"}
            pb={3}
            alignItems={"center"}
          >
            <Box className="job-logo" mr={"24px"}>
              <Box
                className="company-logo"
                mr={"12px"}
                display="inline-flex"
                justifyContent="center"
                alignItems="center"
              >
                <img
                  src={`/assets/icons/candidate/avatar-fpt.png`}
                  alt="Logo"
                />
              </Box>
            </Box>
            <Box className="job-title-box">
              <Box
                display={"inline-flex"}
                sx={{ alignItems: "center" }}
                mb={0.5}
              >
                <h2 style={{ fontSize: 18 }}>{recruitment?.name}</h2>
              </Box>
              <p style={{ fontSize: 14 }}>{recruitment?.organizationName}</p>
            </Box>
          </Grid>
          <Box className="job-description">
            <Box className="job-summary">
              <Grid container>
                <Grid md={4}>
                  {renderJobSummary(
                    <Iconify
                      icon={"ph:currency-circle-dollar"}
                      width={20}
                      height={20}
                      color="#5C6A82"
                    />,
                    "Mức lương",
                    renderSalary(recruitment, true)
                  )}
                </Grid>
                <Grid md={4}>
                  {renderJobSummary(
                    <Iconify
                      icon={"icon-park-outline:handbag"}
                      width={20}
                      height={20}
                      color="#5C6A82"
                    />,
                    "Ngành nghề",
                    recruitmentJobCategories
                      .slice(0, 3)
                      .map((c) => c.name)
                      .join(", ")
                  )}
                </Grid>
                <Grid md={4}>
                  {renderJobSummary(
                    <Iconify
                      icon={"ph:currency-circle-dollar"}
                      width={20}
                      height={20}
                      color="#5C6A82"
                    />,

                    "Hình thứ làm việc",
                    recruitmentWorkingForms
                      .map((wf) =>
                        RecruitmentWorkingForm(
                          wf.workingForm || wf.workingFormId
                        )
                      )
                      .join(", ")
                  )}
                </Grid>
                <Grid md={4}>
                  {renderJobSummary(
                    <Iconify
                      icon={"akar-icons:people-group"}
                      width={20}
                      height={20}
                      color="#5C6A82"
                    />,
                    "Số lượng tuyển",
                    recruitment?.numberPosition
                  )}
                </Grid>
                <Grid md={8}>
                  {renderJobSummary(
                    <Iconify
                      icon={"carbon:location"}
                      width={20}
                      height={20}
                      color="#5C6A82"
                    />,
                    "Địa điểm làm việc",
                    `${recruitment?.address}`
                  )}
                </Grid>
              </Grid>
            </Box>
            <Divider
              variant="fullWight"
              sx={{ marginTop: "10px", marginBottom: "28px" }}
            />
            <Box>
              {renderJobDetail("Chi tiết công việc", recruitment?.description)}
              {renderJobDetail("Yêu cầu công việc", recruitment?.requirement)}
              {renderJobDetail("Quyền lợi", recruitment?.benefit)}
            </Box>
          </Box>
        </Box>

        <FooterPreviewStyle className="form-footer" sx={{justifyContent: 'flex-start !important'}}>
          <ButtonDS tittle="Phê duyệt" onClick={handleApproveRecruitment} />
          <ButtonCancel
            tittle="Từ chối tin"
            onClick={handleShowConfirmMultiple}
          />
          <ButtonCancel
            tittle="Hủy"
            onClick={onClose}
          />
        </FooterPreviewStyle>
      </Drawer>
    </>
  );
};
export default React.memo(RecruitmentAdPreviewModal);
