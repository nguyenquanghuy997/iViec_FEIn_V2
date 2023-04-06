import {ButtonDS, NavGoBack} from "@/components/DesignSystem";
import Iconify from "@/components/Iconify";
import HeadingBar from "@/components/heading-bar/HeadingBar";
import {FormProvider, RHFTextField} from "@/components/hook-form";
import useResponsive from "@/hooks/useResponsive";
import useSettings from "@/hooks/useSettings";
import {PATH_DASHBOARD} from "@/routes/paths";
import {ButtonFilterStyle} from "@/sections/applicant/style";
import {BoxFlex} from "@/sections/emailform/style";
import {ButtonGray, ButtonIcon} from "@/utils/cssStyles";
import {TabContext, TabList} from "@mui/lab";
import {
  Box,
  Button,
  ButtonGroup,
  ClickAwayListener,
  Container, Divider,
  InputAdornment,
  MenuItem,
  MenuList,
  Stack,
  Tab,
  Tooltip, Typography,
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {LightTooltip} from "@/components/DesignSystem/TooltipHtml";
import {DownloadLineIcon, ImportLinkIcon, TeamLineIcon} from "@/assets/ActionIcon";
import {RecruitmentApplicantChooseStage} from "@/sections/recruitment/modals/RecruitmentApplicantChooseStage";
import {RecruitmentApplicantCreate} from "@/sections/recruitment/modals/RecruitmentApplicantCreate";
import MenuIcon from "@/assets/interview/MenuIcon";
import DateIcon from "@/assets/interview/DateIcon";
import {useRouter} from "next/router";
import {useGetRecruitmentByIdQuery} from "@/sections/recruitment";

function RecruitmentPreviewItem() {
  const router = useRouter();
  const RecruitmentId = router.query.slug;
  const {data: RecruitmentData} = useGetRecruitmentByIdQuery({Id: RecruitmentId})
  const defaultValues = {
    name: "",
  };
  const methods = useForm({
    defaultValues,
  });

  const recruitment = {
    organizationId: "01000000-ac12-0242-b3cd-08db10c50f70",
    organizationSlug: null,
    name: "ten tin tuyen dung",
    slug: "ten-tin-tuyen-dung-",
    description: "mo ta tin tuyen dung",
    benefit: "phuc loi ",
    requirement: "yeu cau",
    numberPosition: 4,
    minSalary: 10000000,
    maxSalary: 30000000,
    salaryDisplayType: 1,
    currencyUnit: 1,
    sex: 1,
    startDate: "2023-03-01T07:03:49.796Z",
    endDate: "2023-03-22T07:03:49.796Z",
    address: "dia chi cong ty",
    workingLanguageId: "01000000-ac12-0242-3279-08db13f76068",
    workingLanguageName: null,
    jobPosition: {
      name: "Công nhân",
      description: "đây là công nhân",
      requirement: "chắc chắn",
      benefit: "ok",
      isActivated: true,
      id: "01000000-ac12-0242-8f06-08db1ebc7eec",
    },
    processStatus: 0,
    createdTime: "2023-03-01T08:04:03.955822Z",
    creatorId: "01000000-ac12-0242-caf3-08db10c50fcb",
    creatorName: null,
    ownerId: "3c3a0000-5996-a8a1-29f6-08db109e2a50",
    ownerName: null,
    numberView: 0,
    numberApply: 0,
    workExperience: 1,
    candidateLevelId: "ac430000-5996-a8a1-bff1-08db189caa24",
    coOwners: [
      {
        email: "quy.vu.0101@gmail.com",
        name: "Vu Quy",
        id: "01000000-ac12-0242-04a9-08db10c321c9",
      },
      {
        email: "thuyboncon2@gmail.com",
        name: "Con 2 Thuy",
        id: "01000000-ac12-0242-0f99-08db10d71872",
      },
      {
        email: "datdt44@fpt.com.vn",
        name: "Dat Tuan",
        id: "01000000-ac12-0242-1c2a-08db10c3229f",
      },
      {
        email: "phuong1@gma.com",
        name: " ",
        id: "01000000-ac12-0242-71aa-08db163eda49",
      },
    ],
    tags: null,
    recruitmentJobCategories: [
      {
        name: null,
        jobCategoryId: "ac430000-5996-a8a1-23ca-08db189c7f5b",
        id: "01000000-ac12-0242-5f86-08db1a2b8625",
      },
      {
        name: null,
        jobCategoryId: "ac430000-5996-a8a1-b048-08db189c77ef",
        id: "01000000-ac12-0242-62ef-08db1a2b8625",
      },
    ],
    recruitmentAddresses: [
      {
        provinceId: "01000000-ac12-0242-046d-08db10c3ab36",
        provinceName: null,
        districtId: null,
        districtName: null,
        id: "01000000-ac12-0242-83a1-08db1a2b8625",
      },
    ],
    recruitmentWorkingForms: [
      {
        workingForm: 1,
        id: "01000000-ac12-0242-78dd-08db1a2b8625",
      },
      {
        workingForm: 2,
        id: "01000000-ac12-0242-7b87-08db1a2b8625",
      },
    ],
    recruitmentCouncils: [
      {
        councilUserId: "f4230000-5996-a8a1-1031-08db0e38b780",
        councilEmail: null,
        councilName: null,
        id: "01000000-ac12-0242-51bb-08db1a2b8625",
      },
      {
        councilUserId: "f4230000-5996-a8a1-3320-08db0e38b846",
        councilEmail: null,
        councilName: null,
        id: "01000000-ac12-0242-55ae-08db1a2b8625",
      },
    ],
    recruitmentPipeline: {
      recruitmentId: "01000000-ac12-0242-d386-08db1a2b8623",
      recruitmentPipelineStates: [
        {
          examinationId: null,
          previousPipelineStateId: null,
          pipelineStateType: 0,
          id: "01000000-ac12-0242-c3cb-08db1a2b8623",
        },
        {
          examinationId: null,
          previousPipelineStateId: "01000000-ac12-0242-c3cb-08db1a2b8623",
          pipelineStateType: 2,
          id: "01000000-ac12-0242-ce75-08db1a2b8623",
        },
        {
          examinationId: null,
          previousPipelineStateId: "01000000-ac12-0242-ce75-08db1a2b8623",
          pipelineStateType: 3,
          id: "01000000-ac12-0242-d1dc-08db1a2b8623",
        },
        {
          examinationId: null,
          previousPipelineStateId: "01000000-ac12-0242-d1dc-08db1a2b8623",
          pipelineStateType: 4,
          id: "01000000-ac12-0242-d1df-08db1a2b8623",
        },
      ],
      isAutomaticStepChange: false,
      id: "01000000-ac12-0242-810e-08db1a2b8622",
    },
    id: "01000000-ac12-0242-d386-08db1a2b8623",
  };

  const inforRecruitment = `
  <div>
    <div class="content">
      <div class="content-title">Vị trí công việc: </div>
      <div>${recruitment?.jobPosition?.name || "-"}</div>
    </div>
    <div class="content">
      <div class="content-title">Đơn vị: </div>
      <div>${recruitment?.organizationName || "-"}</div>
    </div>
    <div class="content">
      <div class="content-title">Phụ trách: </div>
      <div>${recruitment?.ownerName || "-"}</div>
    </div>
    <div class="content">
      <div class="content-title">Đồng phụ trách: </div>
      <div>
      ${
    recruitment?.coOwners
      ?.map((p, index) => {
        if (index < 3) {
          return p.email;
        }
      })
      .join(", ") || "-"
  }
      <span>+ ${recruitment?.coOwners?.length - 3 || ""}</span>
      </div>
    </div>
    <div class="content">
      <div class="content-title">Hội đồng tuyển dụng: </div>
      <div>
      ${
    recruitment?.recruitmentCouncils
      ?.map((p, index) => {
        if (index < 3) {
          return p.councilEmail;
        }
      })
      .join(", ") || "-"
  }
      <span>+ ${recruitment?.recruitmentCouncils?.length - 3 || ""}</span>
      </div>
    </div>
    <div class="content">
      <div class="content-title">Kênh tuyển dụng: </div>
      <div>
      ${
    recruitment?.jobSource
      ?.map((p, index) => {
        if (index < 3) {
          return p.name;
        }
      })
      .join(", ") || "-"
  }
      <span>+ ${recruitment?.jobSource?.length - 3 || ""}</span>
      </div>
    </div>
    <div class="content">
      <div class="content-title">Số lượng cần tuyển: </div>
      <div>${recruitment?.numberApply || "-"}</div>
    </div>
  </div>
  `;
  const recruitmentId = window.location.pathname.split("/")[2];
  const [value, setValue] = useState("1");
  const [showDialogStage, setShowDialogStage] = useState(false);
  const [showModelCreate, setShowModelCreate] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const smDown = useResponsive("down", "sm");
  const {themeStretch} = useSettings();

  const [openGroup, setOpenGroup] = useState(false);
  const [modelApplication, setModelApplication] = useState({
    id: undefined,
    stage: undefined,
    stageResult: undefined,
    recruitmentId: recruitmentId,
    recruitmentTitle: undefined
  });
  const handleCloseGroup = () => {
    setOpenGroup(false);
  };
  const handleOpenGroup = () => {
    setOpenGroup(true);
  };

  useEffect(() => {
    setModelApplication({...modelApplication, recruitmentTitle: RecruitmentData?.name})
  }, [RecruitmentData]);

  useEffect(() => {
    if (modelApplication && modelApplication.stage) setShowModelCreate(true);
  }, [showDialogStage]);

  return (
    <div>
      <TabContext value={value}>
        <HeadingBar style={{mb: "28px", position: "unset", top: 8}}>
          <BoxFlex>
            <Stack flexDirection="row" alignItems="center">
              <Tooltip
                title={
                  <div dangerouslySetInnerHTML={{__html: inforRecruitment}}/>
                }
                placement="right-start"
                componentsProps={{
                  tooltip: {
                    sx: {
                      color: "#455570",
                      backgroundColor: "#FDFDFD",
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
                    sx={{marginTop: 0, padding: 0}}
                    link={PATH_DASHBOARD.dashboard}
                    name={RecruitmentData?.name}
                  ></NavGoBack>
                </div>
              </Tooltip>

              <ButtonIcon
                icon={
                  <Iconify
                    icon={"ri:edit-2-fill"}
                    width={20}
                    height={20}
                    color="#8A94A5"
                  />
                }
              />
            </Stack>
            <Stack flexDirection={"row"}>
              <ButtonGray
                variant="contained"
                tittle="Xem tin tuyển dụng"
                sx={{
                  border: "1px solid #455570",
                }}
                // onClick={() => handleShowConfirmMultiple("CloseRecruitment")}
                icon={
                  <Iconify
                    icon={"ri:share-box-line"}
                    width={20}
                    height={20}
                    color="#5C6A82"
                    mr={1}
                  />
                }
              />
            </Stack>
          </BoxFlex>
          <Box sx={{width: "100%", typography: "body1", mb: 3}}>
            <Box>
              {/* <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                sx={{
                  "& .MuiTab-root": {
                    minHeight: "36px",
                    textTransform: "unset",
                    padding: "8px 12px",
                  },
                  "& .Mui-selected": {
                    color: "white !important",
                    backgroundColor: "#455570",
                    borderRadius: "6px",
                  },
                  "& .MuiTabs-indicator": {
                    display: "none",
                  },
                }}
              >
                <Tab
                  label="Ứng viên"
                  value="1"
                  sx={{
                    "&:not(:last-of-type)": {
                      marginRight: "16px",
                    },
                  }}
                />
                <Tab label="Lịch phỏng vấn" value="2"/>
              </TabList> */}
            </Box>
          </Box>
          {value === "1" ? (
            <BoxFlex>
              <Stack flexDirection="row" alignItems="center">
                <Box>
                  <ButtonGroup
                    disableElevation
                    variant="contained"
                    aria-label="Disabled elevation buttons"
                    sx={{mx: 1, boxShadow: "none"}}
                  >
                    <Button
                      startIcon={<DateIcon/>}
                      sx={{
                        background: "#1976D2",
                        borderRadius: "6px 0px 0px 6px",
                        height: "44px",
                        width: "52px",
                        "& .MuiButton-startIcon": {mr: 0},
                      }}
                    />
                    <Button
                      variant="outlined"
                      startIcon={<MenuIcon/>}
                      sx={{
                        borderColor: "#D0D4DB",
                        borderRadius: "0 6px 6px 0",
                        height: "44px",
                        width: "52px",
                        "&:hover": {
                          background: "white",
                          borderColor: "#D0D4DB",
                        },
                        "& .MuiButton-startIcon": {mr: 0},
                      }}
                    />
                  </ButtonGroup>
                </Box>

                <FormProvider methods={methods}>
                  <RHFTextField
                    name="searchKey"
                    placeholder="Tìm kiếm theo tiêu đề tin tuyển dụng..."
                    sx={{minWidth: "510px"}}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ml: 1.5}}>
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
                      sx={{height: "18px", width: "18px"}}
                      icon="material-symbols:filter-alt-outline"
                    />
                  }
                >
                  Bộ lọc
                </ButtonFilterStyle>
              </Stack>
              <Stack flexDirection={"row"}>
                <ButtonGroup variant="contained" aria-label="split button" sx={{
                  boxShadow: "unset",
                  '& .MuiButtonGroup-grouped:not(:last-of-type)': {
                    borderColor: "white"
                  }, '& .MuiButtonGroup-grouped:hover': {
                    opacity: 0.8
                  }
                }}>

                  <Button onClick={() => setShowDialogStage(true)}>
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
                    disableHoverList ener
                    disableTouchListener
                    open={openGroup}
                    title={
                      <ClickAwayListener onClickAway={handleCloseGroup}>
                        <MenuList autoFocusItem divider={true} disableGutters={true}>
                          <MenuItem>
                            <DownloadLineIcon/>
                            <Typography ml={"12px"} variant={"textSize13600"}>
                              Tải mẫu Excel
                            </Typography>
                          </MenuItem>
                          <Divider/>
                          <MenuItem>
                            <ImportLinkIcon sx={{mr: "12px"}}/>
                            <Typography ml={"12px"} variant={"textSize13600"}>
                              Import Excel
                            </Typography>
                          </MenuItem>
                          <Divider/>
                          <MenuItem>
                            <TeamLineIcon sx={{mr: "12px"}}/>
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
                <RecruitmentApplicantChooseStage data={RecruitmentData?.recruitmentPipeline?.recruitmentPipelineStates} show={showDialogStage} setShow={setShowDialogStage}
                                                 setStage={setModelApplication}/>
              </Stack>
            </BoxFlex>
          ) : (
            <BoxFlex>
              <Stack flexDirection="row" alignItems="center">
                <Box>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                    sx={{
                      "& .MuiTab-root": {
                        minHeight: "36px",
                        textTransform: "unset",
                        padding: "8px 12px",
                      },
                      "& .Mui-selected": {
                        color: "white !important",
                        backgroundColor: "#455570",
                        borderRadius: "6px",
                      },
                      "& .MuiTabs-indicator": {
                        display: "none",
                      },
                    }}
                  >
                    <Tab
                      label="Kanban"
                      value="1"
                      sx={{
                        "&:not(:last-of-type)": {
                          marginRight: "16px",
                        },
                      }}
                    />
                    <Tab label="List" value=""/>
                  </TabList>
                </Box>

                <FormProvider methods={methods}>
                  <RHFTextField
                    name="searchKey"
                    placeholder="Tìm kiếm theo tiêu đề tin tuyển dụng..."
                    sx={{minWidth: "510px"}}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ml: 1.5}}>
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
                      sx={{height: "18px", width: "18px"}}
                      icon="material-symbols:filter-alt-outline"
                    />
                  }
                >
                  Bộ lọc
                </ButtonFilterStyle>
              </Stack>
              <Stack flexDirection={"row"}>
                <ButtonDS
                  tittle={"Đặt lịch phỏng vấn"}
                  type="submit"
                  sx={{
                    textTransform: "none",
                    boxShadow: "none",
                  }}
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
            </BoxFlex>
          )}
        </HeadingBar>
        <Container
          maxWidth={themeStretch ? false : "xl"}
          sx={{...(smDown && {padding: 0})}}
        >
          {/* <TabPanel value="1">
            "ha"
          </TabPanel>
          <TabPanel value="2">"hi"</TabPanel> */}
        </Container>
      </TabContext>
      <RecruitmentApplicantCreate show={showModelCreate} setShow={setShowModelCreate} data={modelApplication}
                                  setData={setModelApplication}/>
    </div>
  );
}

export default RecruitmentPreviewItem;
