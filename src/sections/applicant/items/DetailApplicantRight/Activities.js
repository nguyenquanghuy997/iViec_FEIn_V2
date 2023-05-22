import EmptyIcon from "../../../../assets/EmptyIcon";
import NotificationBoard from "./NotificationBoard";
import { iconLogPipe } from "./config";
import { SwitchDS } from "@/components/DesignSystem";
import { Text, View } from "@/components/FlexStyled";
import SvgIcon from "@/components/SvgIcon";
import { FormProvider } from "@/components/hook-form";
import { PipelineStateType, srcImage } from "@/utils/enum";
import { Box, Grid, useTheme } from "@mui/material";
import List from "@mui/material/List";
import { useForm } from "react-hook-form";

export const Activities = ({ dataLog, dataApplicant, onReExploiting }) => {
  const methods = useForm({
    defaultValues: { isActive: !false },
  });
  const theme = useTheme();
  const isActive = methods.watch("isActive");

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
                        isShow={true}
                        icon={iconLogPipe(
                          "review",
                          p.recruitmentPipelineStateType
                        )}
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
                      >
                        {p?.applicantReviewResultType == 2 && (
                          <>
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
                          </>
                        )}
                      </NotificationBoard>
                    )}
                  </div>
                );
              })}
          </List>
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
