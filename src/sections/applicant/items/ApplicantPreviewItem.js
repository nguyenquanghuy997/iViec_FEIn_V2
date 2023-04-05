//import { RejectApplicantModal } from "../modals";
import {
  useGetApplicantByIdQuery,
  useGetApplicantCurrentStateWithRecruitmentStatesMutation,
  useGetApplicantRecruitmentMutation,
  useGetApplicantReviewFormQuery,
  useGetRecruitmentsByApplicantQuery,
} from "../ApplicantFormSlice";
import { RejectApplicantModal } from "../modals";
import { ApplicantReviewModal } from "../modals/ApplicantReviewModal";
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
import ApplicantSendOfferModal from "@/sections/applicant/modals/ApplicantSendOfferModal";
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
import React, { useEffect, useState } from "react";

function ApplicantPreviewItem({ ApplicantId, OrganizationId, ApplicantCorrelationId, RecruitmentId }) {
  const { data: { items: options = [] } = {}, isFetching } =
    useGetRecruitmentsByApplicantQuery({
      ApplicantCorrelationId: ApplicantCorrelationId,
      OrganizationId,
    });

  const [isOpenSendOffer, setIsOpenSendOffer] = useState(false);
  const [isOpenReview, setIsOpenReview] = useState(false);

  const HearderApplicant = () => {
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
            src={
              "https://freedesignfile.com/upload/2016/03/Abstract-geometric-petals-vector-graphic-03.jpg"
            }
          ></AvatarDS>
          <Box pl={1}>
            <Typography
              display="flex"
              fontSize="20px"
              fontWeight="600"
              alignItems="center"
            >
              {data?.fullName}
              <Iconify
                icon={"ri:edit-2-fill"}
                width={20}
                height={20}
                color="#8A94A5"
                ml={1}
              />
            </Typography>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
              color="#172B4D"
            >
              <Typography fontSize="14px">{data?.phoneNumber}</Typography>
              <Typography fontSize="14px">{data?.email}</Typography>
            </Stack>
          </Box>
        </Grid>
        <Grid display="flex">
          <ButtonDS
            tittle={"Thêm vào tin khác"}
            type="submit"
            sx={{
              color: "#455570",
              backgroundColor: "#F3F4F6",
              boxShadow: "none",
              ":hover": {
                backgroundColor: "#E7E9ED",
              },
              marginRight: "12px",
              fontSize: "14px",
              padding: "6px 12px",
            }}
            icon={
              <Iconify
                icon={"icon-park-outline:share-three"}
                width={20}
                height={20}
                color="#455570"
                mr={1}
              />
            }
          />
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
            icon={
              <Iconify
                icon={"mdi:calendar-check"}
                width={20}
                height={20}
                color="#fdfdfd"
                mr={1}
              />
            }
          />
          <ButtonDS
            tittle={"Đánh giá"}
            type="submit"
            onClick={() => setIsOpenReview(true)}
            isDisabled={reviewFormCriterias ? false : true}
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
                color={reviewFormCriterias ? "fff":"#8A94A5"}
                mr={1}
              />
            }
          />
          {/* <ButtonDS
            tittle={"Gửi offer"}
            type="button"
            // isDisabled={true}
            onClick={() => setIsOpenSendOffer(true)}
            sx={{
              color: "#8A94A5",
              backgroundColor: "#1976D2",
              boxShadow: "none",
              ":hover": {
                backgroundColor: "#01B6A7",
              },
              textTransform: "none",
            }}
            icon={
              <Iconify
                icon={"ri:pen-nib-fill"}
                width={20}
                height={20}
                color="#8A94A5"
                mr={1}
              />
            }
          /> */}
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

  // const [showRejectApplicant, setRejectApplicant] = useState(false);
  const { data: data } = useGetApplicantByIdQuery({
    applicantId: ApplicantId,
  });
  const [fetchPipe, { data: pipelines = [], isSuccess }] =
    useGetApplicantCurrentStateWithRecruitmentStatesMutation();
  const [fetchData, { data: logApplicant = [], isSuccess: isSuccessLog }] =
    useGetApplicantRecruitmentMutation();

  const { data: reviewFormCriterias } = useGetApplicantReviewFormQuery(
    {
      RecruitmentPipelineStateId: pipelines?.currentApplicantPipelineState,
      ApplicantId: ApplicantId,
    },
    { skip: pipelines && pipelines?.recruitmentPipelineStates?.filter(
      (i) => i.id == pipelines.currentApplicantPipelineState && i.pipelineStateType == 3
    ).length > 0 }
  );

  const [selectedOption, setSelectedOption] = useState();
  const [rejectApplicant, setRejectApplicant] = useState(false);
  const [ownerName, setOwnerName] = useState();

  useEffect(() => {
    if (!isFetching) {
      const recruiment = options.filter(p=>p.id == RecruitmentId)
      setSelectedOption(recruiment[0]);
      setOwnerName(recruiment[0]?.ownerName?.trim());
      fetchPipe({
        ApplicantId,
        RecruitmentId: recruiment[0]?.id,
      }).unwrap();
      fetchData({
        ApplicantId,
        RecruitmentId: recruiment[0]?.id,
        IsWithdrawHistory: true,
      }).unwrap();
    }
  }, [isFetching]);

  const onChangeRecruiment = (e) => {
    setSelectedOption(e.target.value);
    setOwnerName(e.target.value.ownerName?.trim());
    fetchPipe({
      ApplicantId,
      RecruitmentId: e.target.value.id,
    }).unwrap();
    fetchData({
      ApplicantId,
      RecruitmentId: e.target.value.id,
      IsWithdrawHistory: true,
    }).unwrap();
  };
  return (
    <div>
      <HeadingFixed>
        <HearderApplicant setIsOpenSendOffer={setIsOpenSendOffer} />
      </HeadingFixed>
      <Container
        maxWidth={themeStretch ? false : "xl"}
        sx={{ ...(smDown && { padding: 0 }) }}
      >
        <NavGoBack
          link={PATH_DASHBOARD.dashboard}
          name={"Trở về danh sách ứng viên"}
        ></NavGoBack>

        <Grid>
          <Grid item xs={12} md={5}>
            <Card
              sx={{
                borderRadius: "6px",
                filter:
                  "drop-shadow(0px 3px 5px rgba(9, 30, 66, 0.2)) drop-shadow(0px 0px 1px rgba(9, 30, 66, 0.3))",
                height: "fit-content",
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
                  <HearderApplicant />
                  <Grid marginTop={"32px"}>
                    <Grid>
                      {options ? (
                        <SelectAutoCompleteDS
                          width="35%"
                          selectedOption={selectedOption}
                          setSelectedOption={setSelectedOption}
                          onChange={onChangeRecruiment}
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
                          <ButtonDS
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
                          />
                        </Grid>
                      </Grid>
                      <Grid color="#455570" fontSize="13px">
                        <div>{"Phụ trách"}</div>
                        <Grid
                          sx={{
                            display: "flex",
                            marginTop: "8px",
                          }}
                        >
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
                            fontSize="14px"
                            fontWeight="600"
                            color="#172B4D"
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
                    <ApplicantPreviewCV data={data} />
                  </Grid>
                  <Grid item xs={5} md={5}>
                    {isSuccessLog && (
                      <ApplicantPreviewLog
                        dataLog={logApplicant}
                        dataApplicant={data}
                      />
                    )}
                  </Grid>
                </Grid>
              </CardContent>

              <RejectApplicantModal
                applicantId={data?.id}
                recruimentId={selectedOption?.id}
                stage={pipelines}
                show={rejectApplicant}
                setShow={setRejectApplicant}
              />
            </Card>
          </Grid>
        </Grid>
        {isOpenSendOffer && (
          <ApplicantSendOfferModal
            isOpen={isOpenSendOffer}
            onClose={() => setIsOpenSendOffer(false)}
            showUploadFile={true}
            title="Tạo thư mời nhận việc"
          />
        )}
        {isOpenReview && (
          <ApplicantReviewModal show={isOpenReview} setShow={setIsOpenReview} />
        )}
      </Container>
    </div>
  );
}

export default ApplicantPreviewItem;
