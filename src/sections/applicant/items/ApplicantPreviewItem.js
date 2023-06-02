import { ApplicantReviewModal } from "../modals/ApplicantReviewModal";
import ApplicantTransferPipelineModal from "../modals/ApplicantTransferPipelineModal";
import { RejectApplicantModal } from "../modals/RejectApplicantModal";
import { PipelineApplicant } from "../others";
import { ApplicantPreviewCV } from "./ApplicantPreviewCV";
import { ApplicantPreviewLog } from "./ApplicantPreviewLog";
import {
  AvatarDS,
  ButtonDS,
  NavGoBack,
  SelectAutoCompleteDS,
} from "@/components/DesignSystem";
import { View } from "@/components/FlexStyled";
import Iconify from "@/components/Iconify";
import SvgIcon from "@/components/SvgIcon";
import { HEADER, PIPELINE_TYPE } from "@/config";
import useResponsive from "@/hooks/useResponsive";
import useSettings from "@/hooks/useSettings";
import { PATH_DASHBOARD } from "@/routes/paths";
import {
  useGetAllFilterApplicantQuery,
  useGetApplicantByIdQuery,
  useGetApplicantCurrentStateWithRecruitmentStatesQuery,
  useGetApplicantRecruitmentQuery,
  useGetApplicantReviewFormQuery,
  useGetCheckReviewQuery,
  useGetRecruitmentsByApplicantQuery,
} from "@/sections/applicant";
import { FormCalendar } from "@/sections/interview/components/FormCalendar";
import { RecruitmentApplicantCreate } from "@/sections/recruitment/modals/RecruitmentApplicantCreate";
import { ButtonIcon } from "@/utils/cssStyles";
import { srcImage } from "@/utils/enum";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/styles";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function ApplicantPreviewItem() {
  const theme = useTheme();
  const router = useRouter();
  const ApplicantId = router.query.applicantId
    ? router.query.applicantId
    : router.query.slug;
  const RecruitmentId = router.query.recruitmentId;
  const requestEdit = router.query.mode === "edit";

  const { data: getApplicant = [] } = useGetAllFilterApplicantQuery();
  const dataApplicant = getApplicant?.items?.find(
    (i) => i.applicantId === ApplicantId
  );

  const { data: data = [] } = useGetApplicantByIdQuery(
    {
      applicantId: ApplicantId,
    },
    { skip: !ApplicantId }
  );

  const { data: { items: options = [] } = {}, isFetching } =
    useGetRecruitmentsByApplicantQuery(
      {
        ApplicantCorrelationId: dataApplicant?.correlationId,
        OrganizationId: dataApplicant?.organizationId,
      },
      { skip: !dataApplicant?.correlationId && !dataApplicant?.organizationId }
    );
  // const [isOpenSendOffer, setIsOpenSendOffer] = useState(false);
  const [isOpenReview, setIsOpenReview] = useState(false);
  const [isReExploiting, setIsReExploiting] = useState(false);
  const [open, setOpen] = useState(false);
  const [showModelCreate, setShowModelCreate] = useState(false);
  const [modelApplication, setModelApplication] = useState(undefined);

  const HeaderApplicant = () => {
    return (
      <Grid display="flex" alignItems="center" justifyContent="space-between">
        <Grid
          display="flex"
          alignItems="center"
          sx={{
            "& .MuiBadge-dot": {
              width: "6px",
              minWidth: "6px",
              height: "6px",
              top: 3,
              right: 3,
            },
          }}
        >
          <AvatarDS
            sx={{ height: "60px", width: "60px", borderRadius: "14px" }}
            name={data?.fullName}
            src={data?.portraitImage ? srcImage(data?.portraitImage) : ""}
          />

          <Box pl={1}>
            <Stack display="flex" direction="row" alignItems="center">
              <Typography fontSize="20px" fontWeight="600">
                {data?.fullName}
              </Typography>

              <ButtonIcon
                tooltip="Sửa"
                sx={{ marginLeft: "2px" }}
                icon={
                  <SvgIcon>
                    {
                      '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_9241_24012)"> <path d="M6.93225 14.2499H15.75V15.7499H2.25V12.5677L9.675 5.14269L12.8565 8.32569L6.9315 14.2499H6.93225ZM10.7347 4.08294L12.3263 2.49144C12.4669 2.35084 12.6576 2.27185 12.8565 2.27185C13.0554 2.27185 13.2461 2.35084 13.3868 2.49144L15.5085 4.61319C15.6491 4.75384 15.7281 4.94457 15.7281 5.14344C15.7281 5.34231 15.6491 5.53304 15.5085 5.67369L13.917 7.26444L10.7355 4.08294H10.7347Z" fill="#8A94A5"/> </g> <defs> <clipPath id="clip0_9241_24012"> <rect width="18" height="18" fill="white"/> </clipPath> </defs> </svg>'
                    }
                  </SvgIcon>
                }
                onClick={handleOpenEditForm}
              />
            </Stack>

            <View flexRow atCenter mt={4}>
              <Typography fontSize="14px">{data?.phoneNumber}</Typography>

              {data?.phoneNumber && data?.email && (
                <View
                  mh={6}
                  width={1}
                  height={12}
                  bgColor={theme.palette.common.neutral400}
                />
              )}

              <Typography fontSize="14px">{data?.email}</Typography>
            </View>
          </Box>
          {logApplicant?.averagePointReviewPoint && (
            <Box
              ml={1}
              color={
                logApplicant?.averagePointReviewPoint?.toFixed(2) < 4.9
                  ? "#E53935"
                  : logApplicant?.averagePointReviewPoint?.toFixed(2) < 6.9
                  ? "#F77A0C"
                  : "#388E3C"
              }
              border={"1px solid #388E3C"}
              padding="6px 8px"
              borderRadius="4px"
              textAlign={"center"}
              borderColor={
                logApplicant?.averagePointReviewPoint?.toFixed(2) < 4.9
                  ? "#E53935"
                  : logApplicant?.averagePointReviewPoint?.toFixed(2) < 6.9
                  ? "#F77A0C"
                  : "#388E3C"
              }
            >
              <Typography fontSize="12px" fontWeight="600">
                {"Trung bình"}
              </Typography>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  paddingTop: "2px",
                }}
                name="mediumScore"
              >
                {logApplicant?.averagePointReviewPoint?.toFixed(2)}
              </p>
            </Box>
          )}
        </Grid>
        <Grid display="flex">
          <ButtonDS
            tittle={"Đặt lịch phỏng vấn"}
            type="submit"
            sx={{
              ":hover": {
                backgroundColor: "#1565C0",
              },
              marginRight: "12px",
              fontSize: "14px",
              padding: "6px 12px",
            }}
            isDisabled={
              logApplicant.recruitmentPipelineStateType ===
              PIPELINE_TYPE.INTERVIEW
                ? false
                : true
            }
            icon={
              <Iconify
                icon={"mdi:calendar-check"}
                width={20}
                height={20}
                color={
                  logApplicant.recruitmentPipelineStateType ===
                  PIPELINE_TYPE.INTERVIEW
                    ? "#fdfdfd"
                    : "fff"
                }
                mr={1}
              />
            }
            onClick={() => setOpen(true)}
          />

          <ButtonDS
            tittle={"Đánh giá"}
            type="submit"
            onClick={() => setIsOpenReview(true)}
            isDisabled={!isReview}
            mr={2}
            sx={{
              ":hover": {
                backgroundColor: "#1565C0",
              },
              marginRight: "12px",
              fontSize: "14px",
              padding: "6px 12px",
            }}
            icon={
              <Iconify
                icon={"ph:user-focus-fill"}
                width={20}
                height={20}
                color={isReview ? "fff" : "#8A94A5"}
                mr={1}
              />
            }
          />
        </Grid>
      </Grid>
    );
  };
  const HeadingFixed = styled("div")(() => ({
    top: HEADER.DASHBOARD_DESKTOP_HEIGHT,
    width: "100%",
    boxShadow:
      "0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)",
    backgroundColor: "#FDFDFD",
    padding: "8px 24px",
    position: "fixed",
    zIndex: 1,
    display: `${sticky ? "" : "none"}`,
  }));

  const [sticky, setSticky] = useState(false);

  const trackScroll = () => {
    if (typeof window === "undefined") {
      return;
    } else {
      setSticky(window.scrollY >= 120);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", trackScroll);

    return () => {
      document.removeEventListener("scroll", trackScroll);
    };
  }, []);
  const smDown = useResponsive("down", "sm");
  const { themeStretch } = useSettings();

  const { data: pipelines = [], isSuccess } =
    useGetApplicantCurrentStateWithRecruitmentStatesQuery(
      {
        ApplicantId: ApplicantId,
        RecruitmentId: RecruitmentId,
      },
      { skip: !ApplicantId || !RecruitmentId }
    );

  const { data: logApplicant = [] } = useGetApplicantRecruitmentQuery(
    {
      ApplicantId: ApplicantId,
      RecruitmentId: RecruitmentId,
      IsWithdrawHistory: true,
    },
    { skip: !ApplicantId || !RecruitmentId }
  );
  const { data: isReview } = useGetCheckReviewQuery(
    {
      RecruitmentPipelineStateId: pipelines?.currentApplicantPipelineState,
      ApplicantId: ApplicantId,
    },
    {
      skip: !pipelines?.currentApplicantPipelineState || !ApplicantId,
    }
  );

  const { data: reviewFormCriterias } = useGetApplicantReviewFormQuery(
    {
      RecruitmentPipelineStateId: pipelines?.currentApplicantPipelineState,
      ApplicantId: ApplicantId,
    },
    {
      skip: !isReview,
    }
  );

  const [actionId, setActionId] = useState("");
  const [actionType, setActionType] = useState();
  const [actionShow, setActionShow] = useState(false);
  const [selectedOption, setSelectedOption] = useState();
  const [showConfirmMultiple, setShowConfirmMultiple] = useState(false);

  const [ownerName, setOwnerName] = useState();

  const onCloseModel = () => {
    setActionShow(false);
    setIsReExploiting(false);
    setShowConfirmMultiple(false);
  };

  useEffect(() => {
    if (!selectedOption || !requestEdit) return;
    handleOpenEditForm();
  }, [selectedOption, requestEdit]);

  useEffect(() => {
    if (!isFetching) {
      const recruitment = options.filter((p) => p.id === RecruitmentId);
      setSelectedOption(recruitment[0]);
      setOwnerName(recruitment[0]?.ownerName?.trim());
    }
  }, [isFetching]);

  const handleOpenEditForm = () => {
    setModelApplication({
      ...modelApplication,
      id: ApplicantId,
      recruitmentId: RecruitmentId,
      recruitmentTitle: selectedOption?.name,
    });
    setShowModelCreate(true);
  };

  const onChangeRecruitment = (e) => {
    setSelectedOption(e.target.value);
    setOwnerName(e.target.value.ownerName?.trim());

    return router.push(
      {
        pathname: PATH_DASHBOARD.applicant.view(ApplicantId),
        query: {
          ...router.query,
          applicantId: e.target.value?.applicantId,
          recruitmentId: e.target.value?.id,
          organizationId: e.target.value?.organizationId,
          ownerId: e.target.value?.ownerId,
          ownerName: e.target.value?.ownerName,
        },
      },
      undefined,
      { shallow: false }
    );
  };

  const onReExploiting = () => {
    setIsReExploiting(true);
    setShowConfirmMultiple(true);
  };

  return (
    <div>
      <HeadingFixed>
        <HeaderApplicant pipelines={pipelines} />
      </HeadingFixed>
      <Container
        maxWidth={themeStretch ? false : "xl"}
        sx={{ ...(smDown && { padding: 0 }) }}
      >
        <NavGoBack
          name={"Trở về danh sách ứng viên"}
          onClick={router.back}
          sx={{ padding: "28px 0px", marginTop: 0 }}
        ></NavGoBack>
        <Grid>
          <Grid item xs={12} md={5}>
            <Card
              sx={{
                borderRadius: "6px",
                filter:
                  "drop-shadow(0px 3px 5px rgba(9, 30, 66, 0.2)) drop-shadow(0px 0px 1px rgba(9, 30, 66, 0.3))",
                height: "fit-content",
                boxShadow: "none",
                "& .MuiCardContent-root": {
                  padding: 0,
                  paddingBottom: "0 !important",
                },
              }}
            >
              <CardContent>
                <Grid
                  item
                  xs={12}
                  md={7}
                  padding="32px 24px"
                  borderBottom="1px solid #D0D4DB"
                >
                  <HeaderApplicant pipelines={pipelines} />
                  <Grid marginTop={"32px"}>
                    <Grid>
                      {options ? (
                        <SelectAutoCompleteDS
                          width={"380px"}
                          data={options}
                          selectedOption={selectedOption}
                          placeholder={"Chọn tin tuyển dụng"}
                          onChange={onChangeRecruitment}
                          setSelectedOption={setSelectedOption}
                          sx={{
                            height: "36px",
                            borderRadius: "6px",
                            fontSize: "14px",
                            background: theme.palette.common.neutral50,
                            color: theme.palette.common.neutral700,
                            fontWeight: 500,
                            "&.MuiOutlinedInput-root": {},
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: `${theme.palette.common.neutral50} !important`,
                            },
                          }}
                        />
                      ) : null}
                    </Grid>
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="flex-end"
                      marginTop="28px"
                      minHeight="76px"
                    >
                      <Grid item md={10} container>
                        <Grid sx={{ width: "80%" }}>
                          {isSuccess ? (
                            <PipelineApplicant steps={pipelines} />
                          ) : null}
                        </Grid>
                        <Grid sx={{ display: "flex" }}>
                          <ButtonDS
                            tittle={"Chuyển bước"}
                            type="submit"
                            sx={{
                              color: "#455570",
                              backgroundColor: "#F3F4F6",
                              boxShadow: "none",
                              ":hover": {
                                backgroundColor: "#E7E9ED",
                              },
                              textTransform: "none",
                            }}
                            onClick={() => setShowConfirmMultiple(true)}
                            icon={
                              <Iconify
                                icon={"ci:transfer"}
                                width={16}
                                height={16}
                                color="#455570"
                                mr={1}
                              />
                            }
                          />
                        </Grid>
                      </Grid>
                      <Grid color="#455570" fontSize="13px">
                        <div>{"Phụ trách"}</div>
                        <Grid sx={{ display: "flex", marginTop: "8px" }}>
                          {isSuccess ? (
                            <AvatarDS
                              sx={{
                                height: "20px",
                                width: "20px",
                                borderRadius: "100px",
                                fontSize: "8px",
                              }}
                              name={ownerName}
                            ></AvatarDS>
                          ) : null}
                          <Typography
                            sx={{
                              fontSize: 14,
                              fontWeight: 600,
                              color: "#172B4D",
                            }}
                          >
                            {ownerName}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} md={7} borderRight="1px solid #D0D4DB">
                    <ApplicantPreviewCV data={data} dataLog={logApplicant} />
                  </Grid>
                  <Grid item xs={5} md={5}>
                    <ApplicantPreviewLog
                      recruitmentId={selectedOption?.id}
                      reviewFormCriterias={reviewFormCriterias}
                      dataLog={logApplicant}
                      dataApplicant={data}
                      onReExploiting={onReExploiting}
                    />
                  </Grid>
                </Grid>
              </CardContent>

              {showConfirmMultiple && (
                <ApplicantTransferPipelineModal
                  isReExploiting={isReExploiting}
                  showConfirmMultiple={showConfirmMultiple}
                  setShowConfirmMultiple={setShowConfirmMultiple}
                  onClose={onCloseModel}
                  itemSelected={{
                    applicantId: ApplicantId,
                    recruitmentId: RecruitmentId,
                    recruitmentPipelineStateId:
                      pipelines?.currentApplicantPipelineState,
                  }}
                  setActionId={setActionId}
                  setActionType={setActionType}
                  setActionShow={setActionShow}
                />
              )}

              {actionShow && (
                <RejectApplicantModal
                  applicantId={ApplicantId}
                  recruimentId={RecruitmentId}
                  stage={pipelines}
                  actionId={actionId}
                  actionType={actionType}
                  show={actionShow}
                  setShow={setActionShow}
                  onClose={onCloseModel}
                />
              )}
            </Card>
          </Grid>
        </Grid>

        {isOpenReview && (
          <ApplicantReviewModal
            show={isOpenReview}
            setShow={setIsOpenReview}
            applicantId={data?.id}
            recruitmentId={selectedOption?.id}
            data={reviewFormCriterias}
          />
        )}

        {open && (
          <FormCalendar
            open={open}
            setOpen={setOpen}
            item={data}
            options={selectedOption}
            currentApplicantPipelineState={
              pipelines?.currentApplicantPipelineState
            }
          />
        )}

        <RecruitmentApplicantCreate
          show={showModelCreate}
          setShow={setShowModelCreate}
          data={modelApplication}
          setData={setModelApplication}
        />
      </Container>
    </div>
  );
}

export default ApplicantPreviewItem;
