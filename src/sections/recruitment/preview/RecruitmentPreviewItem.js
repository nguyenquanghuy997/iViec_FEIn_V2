import {
  DownloadLineIcon,
  ImportLinkIcon,
  TeamLineIcon,
} from "@/assets/ActionIcon";
import { NavGoBack } from "@/components/DesignSystem";
import { LightTooltip } from "@/components/DesignSystem/TooltipHtml";
import Iconify from "@/components/Iconify";
import HeadingBar from "@/components/heading-bar/HeadingBar";
import { FormProvider, RHFTextField } from "@/components/hook-form";
import { PERMISSIONS, RECRUITMENT_STATUS } from "@/config";
import useResponsive from "@/hooks/useResponsive";
import useRole from "@/hooks/useRole";
import useSettings from "@/hooks/useSettings";
import { PATH_DASHBOARD } from "@/routes/paths";
import { ButtonFilterStyle } from "@/sections/applicant/style";
import { BoxFlex } from "@/sections/emailform/style";
import { FormCalendar } from "@/sections/interview/components/FormCalendar";
import { useGetRecruitmentByIdQuery } from "@/sections/recruitment";
import { RecruitmentApplicantChooseStage } from "@/sections/recruitment/modals/RecruitmentApplicantChooseStage";
import { RecruitmentApplicantCreate } from "@/sections/recruitment/modals/RecruitmentApplicantCreate";
import RecruitmentPreview from "@/sections/recruitment/modals/preview/RecruitmentPreview";
import { ButtonGray, ButtonIcon } from "@/utils/cssStyles";
import { TabContext, TabList } from "@mui/lab";
import {
  Box,
  Button,
  ButtonGroup,
  ClickAwayListener,
  Container,
  Divider,
  InputAdornment,
  MenuItem,
  MenuList,
  Stack,
  Tab,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

const defaultStyleRecruitmentStatus = {
  borderRadius: "100px",
  padding: "6px 10px",
  marginLeft: "12px",
  fontSize: "12px",
  fontWeight: 600,
};

function RecruitmentPreviewItem({
  viewModeDefault,
  onChangeViewMode,
  tabDefault,
  onChangeTab,
  children,
}) {
  const { canAccess } = useRole();
  const canView = useMemo(() => canAccess(PERMISSIONS.VIEW_JOB), []);
  const canEdit = useMemo(() => canAccess(PERMISSIONS.CRUD_JOB), []);
  const router = useRouter();
  const theme = useTheme();
  const RecruitmentId = router.query.slug;
  const { data: RecruitmentData } = useGetRecruitmentByIdQuery({
    Id: RecruitmentId,
  });
  const disableAdd = !RecruitmentData || RecruitmentData.processStatus === 3;
  const inforRecruitment = `
  <div>
    <div class="content">
      <div class="content-title">Vị trí công việc: </div>
      <div>${RecruitmentData?.jobPosition?.name || "-"}</div>
    </div>
    <div class="content">
      <div class="content-title">Đơn vị: </div>
      <div>${RecruitmentData?.organizationName || "-"}</div>
    </div>
    <div class="content">
      <div class="content-title">Phụ trách: </div>
      <div>${RecruitmentData?.ownerName || "-"}</div>
    </div>
    <div class="content">
      <div class="content-title">Đồng phụ trách: </div>
      <div>
      ${
        RecruitmentData?.coOwners
          ?.map((p, index) => {
            if (index < 3) {
              return p.email;
            }
          })
          .join(", ") || "-"
      }
      ${
        RecruitmentData?.coOwners?.length > 3
          ? `<span>+ ${RecruitmentData?.coOwners?.length - 3 || ""}</span>`
          : ""
      }

      </div>
    </div>
    <div class="content">
      <div class="content-title">Hội đồng tuyển dụng: </div>
      <div>
      ${
        RecruitmentData?.recruitmentCouncils
          ?.map((p, index) => {
            if (index < 3) {
              return p.councilEmail;
            }
          })
          .join(", ") || "-"
      }
      ${
        RecruitmentData?.recruitmentCouncils?.length > 3
          ? `<span>+ ${
              RecruitmentData?.recruitmentCouncils?.length - 3 || ""
            }</span>`
          : ""
      }
      
      </div>
    </div>
    <div class="content">
      <div class="content-title">Kênh tuyển dụng: </div>
      <div>
      ${
        RecruitmentData?.jobSource
          ?.map((p, index) => {
            if (index < 3) {
              return p.name;
            }
          })
          .join(", ") || "-"
      }
      ${
        RecruitmentData?.jobSource?.length > 3
          ? `<span>+ ${RecruitmentData?.jobSource?.length - 3 || ""}</span>`
          : ""
      }
      
      </div>
    </div>
    <div class="content">
      <div class="content-title">Số lượng cần tuyển: </div>
      <div>${RecruitmentData?.numberPosition || "-"}</div>
    </div>
  </div>
  `;
  const defaultValues = {
    name: "",
  };
  const methods = useForm({
    defaultValues,
  });

  const recruitmentId = window.location.pathname.split("/")[2];
  const [tab, setTab] = useState(tabDefault);
  const [showDialogStage, setShowDialogStage] = useState(false);
  const [showModelCreate, setShowModelCreate] = useState(false);
  const [isFullHeader, setIsFullHeader] = useState(true);
  const [openPreview, setOpenPreview] = useState(false);

  const handleChange = (event, newValue) => {
    setTab(newValue);
    onChangeTab(newValue);
  };
  const smDown = useResponsive("down", "sm");
  const { themeStretch } = useSettings();

  const [openGroup, setOpenGroup] = useState(false);
  const [modelApplication, setModelApplication] = useState({
    id: undefined,
    stage: undefined,
    stageResult: undefined,
    recruitmentId: recruitmentId,
    recruitmentTitle: undefined,
  });
  const handleCloseGroup = () => {
    setOpenGroup(false);
  };
  const handleOpenGroup = () => {
    setOpenGroup(true);
  };

  useEffect(() => {
    setModelApplication({
      ...modelApplication,
      recruitmentTitle: RecruitmentData?.name,
    });
  }, [RecruitmentData]);

  useEffect(() => {
    if (modelApplication && modelApplication.stage) setShowModelCreate(true);
  }, [showDialogStage]);

  const DivRecruitmentDataProcessStatus = (item) => {
    switch (item) {
      case 0: //"Draft"
        return (
          <span
            style={{
              ...defaultStyleRecruitmentStatus,
              color: theme.palette.common.neutral700,
              border: "1px solid #455570",
            }}
          >
            Bản nháp
          </span>
        );
      case 1: //"WaitingOrganizationApproval":
        return (
          <span
            style={{
              ...defaultStyleRecruitmentStatus,
              color: theme.palette.common.orange700,
              border: "1px solid " + theme.palette.common.orange700,
            }}
          >
            Chờ nội bộ phê duyệt
          </span>
        );
      case 2: //"OrganizationReject":
        return (
          <span
            style={{
              ...defaultStyleRecruitmentStatus,
              color: theme.palette.common.red600,
              border: "1px solid #E53935",
            }}
          >
            Nội bộ từ chối
          </span>
        );
      case 3: //"WaitingMedusaApproval":
        return (
          <span
            style={{
              ...defaultStyleRecruitmentStatus,
              color: theme.palette.common.orange700,
              border: "1px solid " + theme.palette.common.orange700,
            }}
          >
            Chờ iVIEC phê duyệt
          </span>
        );
      case 4: //"MedusaReject":
        return (
          <span
            style={{
              ...defaultStyleRecruitmentStatus,
              color: theme.palette.common.red600,
              border: "1px solid " + theme.palette.common.red600,
            }}
          >
            iVIEC từ chối
          </span>
        );
      case 5: //"Recruiting":
        return (
          <span
            style={{
              ...defaultStyleRecruitmentStatus,
              color: theme.palette.common.white,
              border: "1px solid " + theme.palette.common.white,
            }}
          >
            Đang tuyển dụng
          </span>
        );
      case 6: //"Calendared":
        return (
          <span
            style={{
              ...defaultStyleRecruitmentStatus,
              color: theme.palette.common.white,
              border: "1px solid" + theme.palette.common.white,
            }}
          >
            Đã lên lịch
          </span>
        );
      case 7: //"Expired":
        return (
          <span
            style={{
              ...defaultStyleRecruitmentStatus,
              color: theme.palette.common.neutral700,
              border: "1px solid #455570",
            }}
          >
            Hết hạn
          </span>
        );
      case 8: //"Closed":
        return (
          <span
            style={{
              ...defaultStyleRecruitmentStatus,
              color: theme.palette.common.neutral700,
              border: "1px solid #455570",
            }}
          >
            Đóng
          </span>
        );
    }
  };

  const collapseHeader = () => {
    setIsFullHeader(!isFullHeader);
  };
  const [open, setOpen] = useState(false);
  const [dataInterview] = useState({ recruitmentId: RecruitmentId });
  return (
    <div>
      <TabContext value={tab}>
        <HeadingBar
          style={{ mb: "28px", position: "relative", top: 0, zIndex: 1000 }}
        >
          {isFullHeader && (
            <>
              <BoxFlex>
                <Stack flexDirection="row" alignItems="center">
                  <Tooltip
                    title={
                      <div
                        dangerouslySetInnerHTML={{ __html: inforRecruitment }}
                      />
                    }
                    placement="right-start"
                    componentsProps={{
                      tooltip: {
                        sx: {
                          color: theme.palette.common.neutral700,
                          backgroundColor: theme.palette.common.white,
                          fontSize: 13,
                          border: "1px solid #E7E9ED",
                          boxShadow:
                            "0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)",
                          borderRadius: "6px",
                          fontWeight: 600,
                          maxWidth: "540px",
                          padding: "20px",
                          paddingBottom: 0,
                          "& .content": {
                            display: "flex",
                            marginBottom: "16px",
                          },
                          "& .content-title": {
                            fontWeight: 500,
                            minWidth: 140,
                          },
                        },
                      },
                    }}
                  >
                    <div>
                      <NavGoBack
                        sx={{
                          marginTop: 0,
                          padding: 0,
                          color: theme.palette.common.neutral800,
                          fontWeight: 700,
                        }}
                        link={PATH_DASHBOARD.recruitment.root}
                        name={RecruitmentData?.name}
                      ></NavGoBack>
                    </div>
                  </Tooltip>

                  {RecruitmentData?.processStatus ===
                    RECRUITMENT_STATUS.EXPIRED ||
                  RecruitmentData?.processStatus ===
                    RECRUITMENT_STATUS.CLOSED ? null : (
                    <ButtonIcon
                      onClick={(e) => {
                        if (!canEdit) {
                          return;
                        }
                        router.push(
                          PATH_DASHBOARD.recruitment.update(RecruitmentData?.id)
                        ),
                          e.stopPropagation();
                      }}
                      style={{
                        marginLeft: "12px",
                      }}
                      icon={
                        <Iconify
                          icon={"ri:edit-2-fill"}
                          width={20}
                          height={20}
                          color={theme.palette.common.neutral500}
                        />
                      }
                    />
                  )}

                  <Box>
                    {DivRecruitmentDataProcessStatus(
                      RecruitmentData?.processStatus
                    )}
                  </Box>
                </Stack>
                <Stack flexDirection={"row"}>
                  <ButtonGray
                    variant="contained"
                    tittle="Xem tin tuyển dụng"
                    sx={{
                      border: "1px solid #455570",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                    onClick={() => {
                      if (!canView) {
                        return;
                      }
                      setOpenPreview(true);
                    }}
                    icon={
                      <Iconify
                        icon={"ri:share-box-line"}
                        width={20}
                        height={20}
                        color={theme.palette.common.borderObject}
                        mr={1}
                      />
                    }
                  />
                </Stack>
              </BoxFlex>
              <Box sx={{ width: "100%", typography: "body1", mb: 3, mt: 1 }}>
                <Box>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                    sx={{
                      "& .MuiTab-root": {
                        color: theme.palette.common.neutral500,
                        // minHeight: "36px",
                        // textTransform: "unset",
                        // padding: "8px 12px",
                      },
                      "& .Mui-selected": {
                        color: theme.palette.common.blue700,
                        fontWeight: 700,
                        // color: "white !important",
                        // backgroundColor: "#455570",
                        // borderRadius: "6px",
                      },
                      // "& .MuiTabs-indicator": {
                      //   display: "none",
                      // },
                    }}
                  >
                    <Tab
                      label="ỨNG VIÊN"
                      value={"1"}
                      sx={{
                        "&:not(:last-of-type)": {
                          marginRight: "16px",
                        },
                      }}
                    />
                    <Tab label="LỊCH PHỎNG VẤN" value={"2"} />
                  </TabList>
                </Box>
              </Box>
            </>
          )}
          {tab === "1" ? (
            <BoxFlex>
              <Stack flexDirection="row" alignItems="center">
                <Box>
                  <ButtonGroup
                    disableElevation
                    variant="contained"
                    aria-label="Disabled elevation buttons"
                    sx={{ mr: 1, boxShadow: "none" }}
                  >
                    <Button
                      variant={"outlined"}
                      startIcon={
                        <Iconify
                          icon={"charm:swap-horizontal"}
                          sx={{
                            width: 20,
                            height: 20,
                          }}
                        />
                      }
                      sx={{
                        background:
                          viewModeDefault == 1
                            ? theme.palette.common.blue700
                            : "#fdfdfd",
                        color:
                          viewModeDefault == 1
                            ? "#fdfdfd"
                            : theme.palette.common.neutral700,
                        borderColor:
                          viewModeDefault == 1 ? "none" : "#D0D4DB !important",
                        borderRadius: "6px 0px 0px 6px",
                        height: "44px",
                        width: "52px",
                        "& .MuiButton-startIcon": { mr: 0 },
                      }}
                      onClick={() => onChangeViewMode(1)}
                    />
                    <Button
                      variant={"outlined"}
                      startIcon={
                        <Iconify
                          icon={"material-symbols:menu"}
                          sx={{
                            width: 20,
                            height: 20,
                          }}
                        />
                      }
                      sx={{
                        background:
                          viewModeDefault == 2
                            ? theme.palette.common.blue700
                            : "#fdfdfd",
                        color:
                          viewModeDefault == 2
                            ? "#fdfdfd"
                            : theme.palette.common.neutral700,
                        borderColor:
                          viewModeDefault == 2 ? "none" : "#D0D4DB !important",
                        borderRadius: "0 6px 6px 0",
                        height: "44px",
                        width: "52px",
                        "& .MuiButton-startIcon": { mr: 0 },
                      }}
                      onClick={() => onChangeViewMode(2)}
                    />
                  </ButtonGroup>
                </Box>

                {children ?? (
                  <>
                    <FormProvider methods={methods}>
                      <RHFTextField
                        name="searchKey"
                        placeholder="Tìm kiếm theo họ tên, email, SĐT ứng viên..."
                        sx={{ minWidth: "510px" }}
                        InputProps={{
                          style: {
                            background: "#F2F4F5",
                            border: "none",
                          },
                          startAdornment: (
                            <InputAdornment position="start" sx={{ ml: 1.5 }}>
                              <Iconify
                                icon={"eva:search-fill"}
                                sx={{
                                  color: "text.disabled",
                                  width: 20,
                                  height: 20,
                                }}
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </FormProvider>
                    <ButtonFilterStyle
                      startIcon={
                        <Iconify
                          sx={{ height: "18px", width: "18px" }}
                          icon="material-symbols:filter-alt-outline"
                        />
                      }
                    >
                      Bộ lọc
                    </ButtonFilterStyle>
                  </>
                )}
              </Stack>
              {!disableAdd && (
                <Stack flexDirection={"row"}>
                  <ButtonGroup
                    variant="contained"
                    aria-label="split button"
                    sx={{
                      boxShadow: "unset",
                      "& .MuiButtonGroup-grouped:not(:last-of-type)": {
                        borderColor: "white",
                      },
                      "& .MuiButtonGroup-grouped:hover": {
                        opacity: 0.8,
                      },
                    }}
                  >
                    <Button
                      style={{
                        background: theme.palette.common.blue700,
                        padding: "12px 16px",
                      }}
                      onClick={() => setShowDialogStage(true)}
                    >
                      <Iconify
                        icon={"material-symbols:add"}
                        width={20}
                        height={20}
                        color="#fff"
                        mr={1}
                      />
                      Thêm ứng viên
                    </Button>
                    <LightTooltip
                      placement="bottom-start"
                      onClose={handleCloseGroup}
                      disableFocusListener
                      disableHoverList
                      ener
                      disableTouchListener
                      open={openGroup}
                      title={
                        <ClickAwayListener onClickAway={handleCloseGroup}>
                          <MenuList
                            autoFocusItem
                            divider={true}
                            disableGutters={true}
                          >
                            <MenuItem>
                              <DownloadLineIcon />
                              <Typography ml={"12px"} variant={"textSize13600"}>
                                Tải mẫu Excel
                              </Typography>
                            </MenuItem>
                            <Divider />
                            <MenuItem>
                              <ImportLinkIcon sx={{ mr: "12px" }} />
                              <Typography ml={"12px"} variant={"textSize13600"}>
                                Import Excel
                              </Typography>
                            </MenuItem>
                            <Divider />
                            <MenuItem>
                              <TeamLineIcon sx={{ mr: "12px" }} />
                              <Typography ml={"12px"} variant={"textSize13600"}>
                                Scan CV hàng loạt
                              </Typography>
                            </MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      }
                    >
                      <Button
                        size="small"
                        aria-haspopup="menu"
                        onClick={handleOpenGroup}
                        style={{
                          background: theme.palette.common.blue700,
                          padding: "12px 16px",
                        }}
                      >
                        <Iconify
                          icon={"material-symbols:arrow-drop-down"}
                          width={20}
                          height={20}
                          color="#fff"
                        />
                      </Button>
                    </LightTooltip>
                  </ButtonGroup>
                  <RecruitmentApplicantChooseStage
                    data={
                      RecruitmentData?.recruitmentPipeline
                        ?.recruitmentPipelineStates
                    }
                    show={showDialogStage}
                    setShow={setShowDialogStage}
                    setStage={setModelApplication}
                  />
                </Stack>
              )}
            </BoxFlex>
          ) : (
            <BoxFlex>
              <Stack flexDirection="row" alignItems="center">
                {/* <Box>
                  <ButtonGroup
                    disableElevation
                    variant="contained"
                    aria-label="Disabled elevation buttons"
                    sx={{ mx: 1, boxShadow: "none" }}
                  >
                    <Button
                      startIcon={
                        <Iconify
                          icon={"charm:swap-horizontal"}
                          sx={{
                            width: 20,
                            height: 20,
                          }}
                        />
                      }
                      sx={{
                        background: "#1976D2",
                        borderRadius: "6px 0px 0px 6px",
                        height: "44px",
                        width: "52px",
                        "& .MuiButton-startIcon": { mr: 0 },
                      }}
                    />
                    <Button
                      variant="outlined"
                      startIcon={<MenuIcon />}
                      sx={{
                        borderColor: "#D0D4DB",
                        borderRadius: "0 6px 6px 0",
                        height: "44px",
                        width: "52px",
                        "&:hover": {
                          background: "white",
                          borderColor: "#D0D4DB",
                        },
                        "& .MuiButton-startIcon": { mr: 0 },
                      }}
                    />
                  </ButtonGroup>
                </Box>

                <FormProvider methods={methods}>
                  <RHFTextField
                    name="searchKey"
                    placeholder="Tìm kiếm theo họ tên, email, SĐT ứng viên..."
                    sx={{ minWidth: "510px" }}
                    InputProps={{
                      style: {
                        background: "#F2F4F5",
                        border: "none",
                      },
                      startAdornment: (
                        <InputAdornment position="start" sx={{ ml: 1.5 }}>
                          <Iconify
                            icon={"eva:search-fill"}
                            sx={{
                              color: "text.disabled",
                              width: 20,
                              height: 20,
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormProvider>
                <ButtonFilterStyle
                  startIcon={
                    <Iconify
                      sx={{ height: "18px", width: "18px" }}
                      icon="material-symbols:filter-alt-outline"
                    />
                  }
                >
                  Bộ lọc
                </ButtonFilterStyle> */}
              </Stack>
              <Stack flexDirection={"row"}>
                <ButtonGroup
                  variant="contained"
                  aria-label="split button"
                  sx={{
                    boxShadow: "unset",
                    "& .MuiButtonGroup-grouped:not(:last-of-type)": {
                      borderColor: "white",
                    },
                    "& .MuiButtonGroup-grouped:hover": {
                      opacity: 0.8,
                    },
                  }}
                >
                  <Button
                    style={{
                      background: theme.palette.common.blue700,
                      padding: "12px 16px",
                    }}
                    onClick={() => setOpen(true)}
                  >
                    <Iconify
                      icon={"material-symbols:add"}
                      width={20}
                      height={20}
                      color="#fff"
                      mr={1}
                    />
                    Đặt lịch phỏng vấn
                  </Button>
                  {/* <LightTooltip
                    placement="bottom-start"
                    onClose={handleCloseGroup}
                    disableFocusListener
                    disableHoverList
                    ener
                    disableTouchListener
                    open={openGroup}
                    title={
                      <ClickAwayListener onClickAway={handleCloseGroup}>
                        <MenuList
                          autoFocusItem
                          divider={true}
                          disableGutters={true}
                        >
                          <MenuItem>
                            <DownloadLineIcon />
                            <Typography ml={"12px"} variant={"textSize13600"}>
                              Tải mẫu Excel
                            </Typography>
                          </MenuItem>
                          <Divider />
                          <MenuItem>
                            <ImportLinkIcon sx={{ mr: "12px" }} />
                            <Typography ml={"12px"} variant={"textSize13600"}>
                              Import Excel
                            </Typography>
                          </MenuItem>
                          <Divider />
                          <MenuItem>
                            <TeamLineIcon sx={{ mr: "12px" }} />
                            <Typography ml={"12px"} variant={"textSize13600"}>
                              Scan CV hàng loạt
                            </Typography>
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    }
                  >
                    <Button
                      size="small"
                      aria-haspopup="menu"
                      onClick={handleOpenGroup}
                      style={{
                        background: "#1976D2",
                        padding: "12px 16px",
                      }}
                    >
                      <Iconify
                        icon={"material-symbols:arrow-drop-down"}
                        width={20}
                        height={20}
                        color="#fff"
                      />
                    </Button>
                  </LightTooltip> */}
                </ButtonGroup>
                <RecruitmentApplicantChooseStage
                  data={
                    RecruitmentData?.recruitmentPipeline
                      ?.recruitmentPipelineStates
                  }
                  show={showDialogStage}
                  setShow={setShowDialogStage}
                  setStage={setModelApplication}
                />
              </Stack>
            </BoxFlex>
          )}

          <ButtonIcon
            className="btn-collapse-header"
            style={{}}
            onClick={() => collapseHeader()}
            icon={
              <Iconify
                icon={
                  isFullHeader
                    ? "material-symbols:arrow-drop-up"
                    : "material-symbols:arrow-drop-down"
                }
                width={20}
                height={20}
                color={theme.palette.common.borderObject}
              />
            }
          />
        </HeadingBar>
        <Container
          maxWidth={themeStretch ? false : "xl"}
          sx={{
            ...(smDown && { padding: 0 }),
            position: "relative",
            zIndex: 999,
          }}
        >
          {/* <TabPanel value="1">
            "ha"
          </TabPanel>
          <TabPanel value="2">"hi"</TabPanel> */}
        </Container>
      </TabContext>
      <RecruitmentApplicantCreate
        show={showModelCreate}
        setShow={setShowModelCreate}
        data={modelApplication}
        setData={setModelApplication}
      />

      <RecruitmentPreview
        data={RecruitmentData}
        open={openPreview}
        onClose={() => setOpenPreview(false)}
      />
      {open && (
        <FormCalendar
          open={open}
          setOpen={setOpen}
          optionsFromCruit={dataInterview}
        />
      )}
    </div>
  );
}

RecruitmentPreviewItem.propTypes = {
  viewModeDefault: PropTypes.number,
  onChangeViewMode: PropTypes.func,
  tabDefault: PropTypes.string,
  onChangeTab: PropTypes.func,
};
export default RecruitmentPreviewItem;
