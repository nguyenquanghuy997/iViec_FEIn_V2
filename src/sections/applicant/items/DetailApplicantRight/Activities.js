import EmptyIcon from "../../../../assets/EmptyIcon";
import { ApplicantReviewModal } from "../../modals/ApplicantReviewModal";
import { ApplicantReviewViewModal } from "../../modals/ApplicantReviewViewModal";
import NotificationBoard from "./NotificationBoard";
import { iconLogPipe } from "./config";
import { SwitchDS } from "@/components/DesignSystem";
import { Text, View } from "@/components/FlexStyled";
import SvgIcon from "@/components/SvgIcon";
import { FormProvider } from "@/components/hook-form";
import useAuth from "@/hooks/useAuth";
import { PipelineStateType, srcImage } from "@/utils/enum";
import { Box, Grid, useTheme } from "@mui/material";
import List from "@mui/material/List";
import moment from "moment";
import { useState } from "react";
import { useForm } from "react-hook-form";

const calcDuration = (value) => {
  if (typeof value !== "string" || value.length < 8) return 0;

  const [d, HH_mm_ss] = `${value.length < 9 ? "0." : ""}${value}`.split(".");
  const time = moment(HH_mm_ss, "HH:mm:ss");

  return (
    Number(d) * 86400000 +
    time.hour() * 3600000 +
    time.minute() * 60000 +
    time.second() * 1000
  );
};

export const Activities = ({
  dataLog,
  dataApplicant,
  onReExploiting,
  recruitmentId,
  reviewFormCriterias,
}) => {
  const methods = useForm({
    defaultValues: { isActive: !false },
  });
  const theme = useTheme();
  const { company } = useAuth();
  const isActive = methods.watch("isActive");

  const [isOpenReviewView, setIsOpenReviewView] = useState(false);

  const [isOpenReview, setIsOpenReview] = useState(false);
  const [itemLog, setItemLog] = useState();
  const renderInfo = (title, reason) => {
    return (
      <View flexRow atCenter mt={16}>
        <View mr={8} width={64}>
          <Text
            disableTranslate
            fontSize={13}
            color={theme.palette.common.neutral600}
          >
            {`${title}:`}
          </Text>
        </View>

        <Text
          flex1
          disableTranslate
          fontSize={13}
          fontWeight={500}
          color={theme.palette.common.neutral800}
        >
          {reason}
        </Text>
      </View>
    );
  };

  const renderButtonReExploiting = () => {
    return (
      <View
        flexRow
        contentCenter
        pv={5}
        mt={16}
        borderWidth={1}
        borderRadius={6}
        borderColor={theme.palette.common.blue700}
        onPress={onReExploiting}
      >
        <SvgIcon>
          {
            '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 1.5C13.1423 1.5 16.5 4.85775 16.5 9C16.5 13.1423 13.1423 16.5 9 16.5C4.85775 16.5 1.5 13.1423 1.5 9H3C3 12.3135 5.6865 15 9 15C12.3135 15 15 12.3135 15 9C15 5.6865 12.3135 3 9 3C6.9375 3 5.118 4.04025 4.03875 5.625H6V7.125H1.5V2.625H3V4.5C4.368 2.6775 6.54675 1.5 9 1.5Z" fill="#1976D2"/></svg>'
          }
        </SvgIcon>

        <Text
          ml={8}
          fontSize={12}
          fontWeight={"600"}
          color={theme.palette.common.blue700}
        >
          {"Tái khai thác"}
        </Text>
      </View>
    );
  };

  return (
    <Grid item sx={{ padding: "12px 0 0 0" }}>
      <FormProvider methods={methods}>
        <SwitchDS name={"isActive"} label={"Hiển thị hoạt động"} />
      </FormProvider>

      {isActive ? (
        <Box>
          <List
            sx={{ width: "100%", pt: "16px" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            {dataLog?.events &&
              dataLog?.events.map((p, index) => {
                const isSeftApply =
                  dataApplicant?.applicationUserId === p?.creatorId;

                return (
                  <div key={index}>
                    {p.eventType.includes("AddApplicantToRecruitmentEvent") && (
                      <NotificationBoard
                        icon={iconLogPipe(
                          "add",
                          p.recruitmentPipelineStateType,
                          p.pipelineStateResultType
                        )}
                        title={
                          isSeftApply ? (
                            <p>
                              {"Ứng viên "}
                              <span style={{ fontWeight: 600 }}>
                                {dataApplicant?.fullName}
                              </span>
                              {" đã ứng tuyển."}
                            </p>
                          ) : (
                            <div>
                              <p>
                                <span style={{ fontWeight: 600 }}>
                                  {p?.creatorName}
                                </span>
                                {" đã chuyển "}
                                <span style={{ fontWeight: 600 }}>
                                  {dataApplicant?.fullName}
                                </span>
                                {" vào tin tuyển dụng "}
                                <span style={{ fontWeight: 600 }}>
                                  {dataLog?.recruitmentName}
                                </span>
                              </p>
                            </div>
                          )
                        }
                        action="add"
                        avatarName={p?.creatorName}
                        isShow={false}
                        data={p}
                      />
                    )}
                    {p.eventType.includes("CreateApplicantRecruitmentEvent") &&
                      (p.creatorId ? (
                        <NotificationBoard
                          icon={iconLogPipe(
                            "add",
                            p.recruitmentPipelineStateType,
                            p.pipelineStateResultType
                          )}
                          title={
                            <div>
                              <p>
                                <span style={{ fontWeight: 600 }}>
                                  {p?.creatorName}
                                </span>
                                {" đã thêm ứng viên "}
                                <span style={{ fontWeight: 600 }}>
                                  {dataApplicant?.fullName}
                                </span>
                                {" vào bước "}
                                <span style={{ fontWeight: 600 }}>
                                  {PipelineStateType(
                                    p?.recruitmentPipelineStateType,
                                    p?.pipelineStateResultType
                                  )}
                                </span>
                              </p>
                            </div>
                          }
                          action="add"
                          avatarName={p?.creatorName}
                          isShow={false}
                          data={p}
                        />
                      ) : (
                        <NotificationBoard
                          icon={iconLogPipe(
                            "create",
                            p.recruitmentPipelineStateType,
                            p.pipelineStateResultType
                          )}
                          title={
                            <div>
                              <p>
                                {"Ứng viên "}
                                <span style={{ fontWeight: 600 }}>
                                  {dataApplicant?.fullName}
                                </span>
                                {" đã ứng tuyển"}
                              </p>
                            </div>
                          }
                          action="create"
                          avatarName={dataApplicant?.fullName}
                          avatarSrc={
                            dataApplicant?.portraitImage
                              ? srcImage(dataApplicant?.portraitImage)
                              : ""
                          }
                          data={p}
                          isShow={false}
                        />
                      ))}
                    {p.eventType.includes("UpdateApplicantRecruitmentEvent") &&
                      (p?.recruitmentPipelineStateType == 3 &&
                      p?.pipelineStateResultType == 2 &&
                      p.updaterId ? (
                        <NotificationBoard
                          icon={iconLogPipe(
                            "result",
                            p.recruitmentPipelineStateType,
                            p.pipelineStateResultType
                          )}
                          title={
                            <div>
                              <p>
                                <span style={{ fontWeight: 600 }}>
                                  {p?.updaterName}
                                </span>
                                {" đã "}
                                <span
                                  style={{
                                    fontWeight: 600,
                                    color: theme.palette.common.red600,
                                  }}
                                >
                                  {" Loại "}
                                </span>
                                {" ứng viên "}
                                <span style={{ fontWeight: 600 }}>
                                  {dataApplicant?.fullName}
                                </span>
                              </p>
                            </div>
                          }
                          action="add"
                          avatarName={p?.updaterName}
                          isShow={false}
                          data={p}
                          expanded={renderButtonReExploiting()}
                        />
                      ) : p.updaterId ? (
                        <NotificationBoard
                          icon={iconLogPipe(
                            "result",
                            p.recruitmentPipelineStateType,
                            p.pipelineStateResultType
                          )}
                          title={
                            <div>
                              <p>
                                <span style={{ fontWeight: 600 }}>
                                  {p?.updaterName}
                                </span>
                                {" đã chuyển ứng viên "}
                                <span style={{ fontWeight: 600 }}>
                                  {dataApplicant?.fullName}
                                </span>
                                {" từ bước "}
                                <span style={{ fontWeight: 600 }}>
                                  {PipelineStateType(
                                    p?.stagePrevious,
                                    p?.stageResultPrevious
                                  )}
                                </span>
                                {" sang bước "}
                                <span
                                  style={{
                                    fontWeight: 600,
                                    color:
                                      p?.recruitmentPipelineStateType == 3 &&
                                      (p?.pipelineStateResultType == 0
                                        ? "#388E3C"
                                        : theme.palette.common.orange700),
                                  }}
                                >
                                  {PipelineStateType(
                                    p?.recruitmentPipelineStateType,
                                    p?.pipelineStateResultType
                                  )}
                                </span>
                              </p>
                            </div>
                          }
                          action="add"
                          avatarName={p?.updaterName}
                          data={p}
                        />
                      ) : (
                        <NotificationBoard
                          icon={iconLogPipe(
                            "result",
                            p.recruitmentPipelineStateType,
                            p.pipelineStateResultType
                          )}
                          title={
                            <div>
                              <p>
                                {"Ứng viên "}
                                <span style={{ fontWeight: 600 }}>
                                  {p?.updaterName}
                                </span>
                                {" đã tự động chuyển từ bước "}
                                <span style={{ fontWeight: 600 }}>
                                  {PipelineStateType(
                                    p?.stagePrevious,
                                    p?.stageResultPrevious
                                  )}
                                </span>
                                {" sang bước "}
                                <span style={{ fontWeight: 600 }}>
                                  {PipelineStateType(
                                    p?.recruitmentPipelineStateType,
                                    p?.pipelineStateResultType
                                  )}
                                </span>
                              </p>
                            </div>
                          }
                          action="add"
                          avatarName={p?.updaterName}
                          isShow={false}
                          data={p}
                        />
                      ))}
                    {p.eventType.includes("CreateApplicantReviewEvent") && (
                      <NotificationBoard
                        isShow
                        isReview
                        recruitmentId={recruitmentId}
                        dataApplicant={dataApplicant}
                        reviewFormCriterias={reviewFormCriterias}
                        setItemLog={setItemLog}
                        icon={iconLogPipe(
                          "review",
                          p.recruitmentPipelineStateType
                        )}
                        setIsOpenReviewView={setIsOpenReviewView}
                        title={
                          <div>
                            <p>
                              <span style={{ fontWeight: 600 }}>
                                {p?.creatorName}
                              </span>
                              {" đã đánh giá ứng viên "}
                              <span style={{ fontWeight: 600 }}>
                                {dataApplicant?.fullName}
                              </span>
                              {" với kết quả "}
                              <span
                                style={{
                                  fontWeight: 600,
                                  color:
                                    p?.recruitmentPipelineStateType == 2 &&
                                    (p?.applicantReviewResultType == 0
                                      ? "#388E3C"
                                      : p?.applicantReviewResultType == 1
                                      ? theme.palette.common.orange700
                                      : theme.palette.common.red600),
                                }}
                              >
                                {PipelineStateType(
                                  p?.recruitmentPipelineStateType,
                                  p?.applicantReviewResultType
                                )}
                              </span>
                            </p>
                          </div>
                        }
                        action="add"
                        avatarName={p?.creatorName}
                        data={p}
                        expanded={
                          p?.applicantReviewResultType == 2 &&
                          renderButtonReExploiting()
                        }
                      />
                    )}
                    {p.eventType.includes(
                      "CreateApplicantRecruitmentBookingCalendarEvent"
                    ) && (
                      <NotificationBoard
                        isShow
                        data={p}
                        icon={iconLogPipe("", 2)}
                        avatarName={p?.creatorName}
                        title={
                          <p>
                            <span style={{ fontWeight: 600 }}>
                              {p?.creatorName}
                            </span>
                            {" đã đặt lịch "}
                            <span style={{ fontWeight: 600 }}>
                              {`phỏng vấn ${
                                p?.interviewType === 0 ? "Online" : "Trực tiếp"
                              }`}
                            </span>
                            {" cho ứng viên "}
                            <span style={{ fontWeight: 600 }}>
                              {dataApplicant?.fullName}
                            </span>
                          </p>
                        }
                      >
                        {renderInfo("Tiêu đề", p?.name)}
                        {renderInfo(
                          "Hình thức",
                          p?.interviewType === 0 ? "Online" : "Trực tiếp"
                        )}
                        {renderInfo(
                          "Thời gian",
                          moment(p.interviewTime).format("HH:mm") +
                            " - " +
                            moment(p.interviewTime)
                              .add(calcDuration(p.interviewDuration))
                              .format("HH:mm DD/MM/YYYY")
                        )}
                        {renderInfo("Lưu ý", p.note)}
                        {renderInfo("Hội đồng", p.councilNames?.join(", "))}

                        {p.bookingCalendarId && (
                          <View
                            contentCenter
                            mt={16}
                            pv={6}
                            borderRadius={6}
                            bgColor={theme.palette.common.green600}
                            onPress={() => {
                              window.open(
                                `${window.location.origin}/phong-van.html?DisplayName=${company?.name}&&Email=${company?.organizationInformation?.email}&&Role=1&&RoomName=${p.bookingCalendarId}`
                              );
                            }}
                          >
                            <Text
                              fontSize={12}
                              fontWeight={600}
                              color={theme.palette.common.white}
                            >
                              {"Tham gia phòng họp"}
                            </Text>
                          </View>
                        )}
                      </NotificationBoard>
                    )}
                  </div>
                );
              })}
          </List>
          {isOpenReviewView && (
            <ApplicantReviewViewModal
              creatorId={itemLog?.creatorId}
              show={isOpenReviewView}
              aggregateId={itemLog?.aggregateId}
              applicantId={dataApplicant?.id}
              recruitmentId={recruitmentId}
              setShow={setIsOpenReviewView}
              pressReview={() => {
                setIsOpenReview(true);
                setIsOpenReviewView(false);
              }}
            />
          )}

          {isOpenReview && (
            <ApplicantReviewModal
              show={isOpenReview}
              data={reviewFormCriterias}
              applicantId={dataApplicant?.id}
              recruitmentId={recruitmentId}
              setShow={setIsOpenReview}
            />
          )}
        </Box>
      ) : (
        <div>
          <div
            style={{ display: "flex", width: "100%", justifyContent: "center" }}
          >
            <EmptyIcon />
          </div>
          <p
            style={{ display: "flex", width: "100%", justifyContent: "center" }}
          >
            Danh sách hoạt động tạm ẩn.
          </p>
        </div>
      )}
    </Grid>
  );
};
