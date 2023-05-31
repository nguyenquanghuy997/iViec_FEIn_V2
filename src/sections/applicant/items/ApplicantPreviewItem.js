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
import Iconify from "@/components/Iconify";
import { HEADER } from "@/config";
import useResponsive from "@/hooks/useResponsive";
import useSettings from "@/hooks/useSettings";
import { PATH_DASHBOARD } from "@/routes/paths";
import {
  useGetApplicantByIdQuery,
  useGetApplicantCurrentStateWithRecruitmentStatesQuery,
  useGetApplicantRecruitmentQuery,
  useGetApplicantReviewFormQuery,
  useGetCheckReviewQuery,
  useGetRecruitmentsByApplicantQuery,
} from "@/sections/applicant";
import ApplicantSendOfferModal from "@/sections/applicant/modals/ApplicantSendOfferModal";
import { FormCalendar } from "@/sections/interview/components/FormCalendar";
import { RecruitmentApplicantCreate } from "@/sections/recruitment/modals/RecruitmentApplicantCreate";
import { ButtonIcon } from "@/utils/cssStyles";
import { srcImage } from "@/utils/enum";
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/styles";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function ApplicantPreviewItem() {
  const router = useRouter();
  const ApplicantId = router.query.applicantId
    ? router.query.applicantId
    : router.query.slug;
  const ApplicantCorrelationId = router.query.correlationId;
  const OrganizationId = router.query.organizationId;
  const RecruitmentId = router.query.recruitmentId;
  const requestEdit = router.query.mode === "edit";

  const { data: { items: options = [] } = {}, isFetching } =
    useGetRecruitmentsByApplicantQuery({
      ApplicantCorrelationId: ApplicantCorrelationId,
      OrganizationId,
    });

  const [isOpenSendOffer, setIsOpenSendOffer] = useState(false);
  const [isOpenReview, setIsOpenReview] = useState(false);
  const [isReExploiting, setIsReExploiting] = useState(false);
  const [open, setOpen] = useState(false);
  const [showModelCreate, setShowModelCreate] = useState(false);
  const [modelApplication, setModelApplication] = useState(undefined);

  const HeaderApplicant = ({ pipelines }) => {
    const resultType = pipelines?.recruitmentPipelineStates?.find(
      (item) => item.id === pipelines.currentApplicantPipelineState
    ).pipelineStateType;

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

          <Box ml={"15px"}>
            <Typography
              display="flex"
              fontSize="20px"
              fontWeight="600"
              alignItems="center"
            >
              {data?.fullName}

              <ButtonIcon
                sx={{ marginLeft: "4px" }}
                onClick={() => handleOpenEditForm()}
                icon={
                  <Iconify
                    icon={"ri:edit-2-fill"}
                    width={20}
                    height={20}
                    color="#8A94A5"
                  />
                }
              />
            </Typography>

            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={"6px"}
              color="#172B4D"
            >
              <Typography fontSize="14px">{data?.phoneNumber}</Typography>
              <Typography fontSize="14px">{data?.email}</Typography>
            </Stack>
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
              marginLeft: "12px",
              fontSize: "14px",
              padding: "6px 12px",
            }}
            icon={
              <Iconify
                icon={"mdi:calendar-check"}
                width={20}
                height={20}
                color={"#fdfdfd"}
                mr={1}
              />
            }
            onClick={() => setOpen(true)}
          />

          <ButtonDS
            tittle={"Đánh giá"}
            type="submit"
            isDisabled={!isReview}
            sx={{
              ":hover": {
                backgroundColor: "#1565C0",
              },
              marginLeft: "12px",
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
            onClick={() => setIsOpenReview(true)}
          />

          {resultType === 3 && pipelines.pipelineStateResultType === 0 && (
            <ButtonDS
              tittle={"Gửi offer"}
              type="button"
              sx={{
                ":hover": {
                  backgroundColor: "#1565C0",
                },
                marginLeft: "12px",
                fontSize: "14px",
                padding: "6px 12px",
              }}
              icon={
                <Iconify
                  icon={"ri:pen-nib-fill"}
                  width={20}
                  height={20}
                  mr={1}
                />
              }
              onClick={() => setIsOpenSendOffer(true)}
            />
          )}
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

  const { data: data = [] } = useGetApplicantByIdQuery(
    {
      applicantId: ApplicantId,
    },
    { skip: !ApplicantId }
  );

  const { data: reviewFormCriterias } = useGetApplicantReviewFormQuery(
    {
      RecruitmentPipelineStateId: pipelines?.currentApplicantPipelineState,
      ApplicantId: ApplicantId,
    },
    {
      skip: !pipelines?.currentApplicantPipelineState || !ApplicantId,
    }
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
          sx={{padding: "28px 0px", marginTop: 0}}
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
                          width="35%"
                          selectedOption={selectedOption}
                          setSelectedOption={setSelectedOption}
                          onChange={onChangeRecruitment}
                          data={options}
                          placeholder="Chọn tin tuyển dụng"
                          sx={{
                            fontSize: "14px",
                            background: "#F3F4F6",
                            fontWeight: 500,
                            "&.MuiOutlinedInput-root": {
                              minHeight: "36px",
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#F3F4F6",
                              borderRadius: "6px",
                            },
                            "&:hover, &.Mui-focused": {
                              background: "#E7E9ED",
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline, , &.Mui-focused .MuiOutlinedInput-notchedOutline":
                              {
                                borderColor: "#E7E9ED",
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
                          {/* <ButtonDS
                            type="submit"
                            sx={{
                              padding: "8px",
                              minWidth: "unset",
                              backgroundColor: "#fff",
                              boxShadow: "none",
                              ":hover": {
                                backgroundColor: "#EFF3F7",
                              },
                              textTransform: "none",
                              marginLeft: "12px",
                            }}
                            onClick={() => setRejectApplicant(true)}
                            icon={
                              <Iconify
                                icon={"ic:outline-remove-circle"}
                                width={20}
                                height={20}
                                color="#D32F2F"
                              />
                            }
                          /> */}
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
                                fontSize: "12px",
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
                    <ApplicantPreviewCV
                      data={data}
                      dataLog={logApplicant}
                      pressUpload={handleOpenEditForm}
                    />
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
        {isOpenSendOffer && (
          <ApplicantSendOfferModal
            isOpen={isOpenSendOffer}
            onClose={() => setIsOpenSendOffer(false)}
            title="Gửi thư mời nhận việc"
            item={{
              recruitmentId: RecruitmentId,
              applicantId: ApplicantId,
              applicantEmail: data.email,
            }}
          />
        )}
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
