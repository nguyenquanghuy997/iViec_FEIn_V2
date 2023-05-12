import {
  useLazyGetRecruitmentPipelineStatesByRecruitmentsQuery,
  useUpdateApplicantRecruitmentToNextStateMutation,
} from "../applicant";
import { useLazyGetCompanyInfoQuery } from "../companyinfor/companyInforSlice";
import { useGetBookingCalendarsByApplicantRecruitmentPipelineStateQuery } from "../interview";
import { FormCalendar } from "../interview/components/FormCalendar";
import { CircleLineIcon, EditIcon, LogoIcon } from "@/assets/ActionIcon";
import { AvatarDS, ButtonDS } from "@/components/DesignSystem";
import { LightTooltip } from "@/components/DesignSystem/TooltipHtml";
import Iconify from "@/components/Iconify";
import { ApplicantInterviewState } from "@/config";
import { PATH_DASHBOARD } from "@/routes/paths";
import ApplicantSendOfferModal from "@/sections/applicant/modals/ApplicantSendOfferModal";
import { srcImage } from "@/utils/enum";
import { fDate, fTime } from "@/utils/formatTime";
import {
  Box,
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grid,
  MenuItem,
  MenuList,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Divider } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import { memo, useState } from "react";
import { Draggable } from "react-beautiful-dnd";

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        display: "flex",
        fontSize: "0.875rem",
        fontWeight: "700",
        ...sx,
      }}
      {...other}
    />
  );
}

function Baseitem(props) {
  const { item } = props;
  return (
    <Grid
      display="flex"
      alignItems="center"
      sx={{
        margin: "0 12px",
        marginBottom: "16px",
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
        sx={{ height: "32px", width: "32px", borderRadius: "14px" }}
        src={item?.portraitImage && srcImage(item?.portraitImage)}
      />

      <Box pl={1}>
        <Typography
          fontSize="12px"
          display="flex"
          fontWeight="600"
          alignItems="center"
        >
          {item?.fullName}
        </Typography>
        <Stack direction="row" spacing={2} color="#172B4D">
          <Typography fontSize="12px">{item.phoneNumber}</Typography>
        </Stack>
      </Box>
    </Grid>
  );
}

function ExaminationItem(props) {
  const { item } = props;
  return (
    <div>
      <Baseitem item={item} />
      <Box
        sx={{
          backgroundColor: item?.processStatus == 4 ? "#E8F5E9" : "#FFEBEE",
          display: "flex",
          flexDirection: "column-reverse",
          alignItems: "flex-start",
        }}
      >
        <Stack
          direction="row"
          spacing={0.5}
          p={0.5}
          color={item?.processStatus == 4 ? "##388E3C" : "#D32F2F"}
        >
          <Typography fontSize="14px" fontWeight="600">
            {"Điểm:"}
          </Typography>
          <Typography fontSize="14px" fontWeight="600">
            {item?.processStatus == 4 ? "15/16" : "3/16"}
          </Typography>
        </Stack>
        <Stack
          direction="row"
          spacing={0.5}
          p={0.5}
          color={item?.processStatus == 4 ? "##388E3C" : "#D32F2F"}
        >
          <Typography fontSize="14px" fontWeight="600">
            {"Kết quả :"}
          </Typography>
          <Typography fontSize="14px" fontWeight="600">
            {item?.processStatus == 4 ? "Đạt" : "Không Đạt"}
          </Typography>
        </Stack>
      </Box>
    </div>
  );
}

function InterviewItem(props) {
  const { item } = props;
  const [open, setOpen] = useState(false);
  const [data, setData] = useState();
  const handleClick = (item) => {
    setOpen(true);
    setData(item);
  };
  const { data: { items: interview } = { items: [] } } =
    useGetBookingCalendarsByApplicantRecruitmentPipelineStateQuery(
      {
        ApplicantId: item?.applicantId,
        RecruitmentPipelineStateId: item?.recruitmentPipelineStateId,
      },
      { skip: !item }
    );
  const lastInterview = interview[interview.length - 1];
  var timeEnd = moment(lastInterview?.interviewTime).add(
    lastInterview?.interviewDuration
  );
  const { enqueueSnackbar } = useSnackbar();
  const [getCompanyInfo] = useLazyGetCompanyInfoQuery();

  const getLink = async (id) => {
    const res = await getCompanyInfo().unwrap();
    return `${window.location.origin}/phong-van.html?DisplayName=${res?.name}&&Email=${res?.organizationInformation?.email}&&Role=1&&RoomName=${id}`;
  };

  const copyToClipboard = async (id) => {
    navigator.clipboard.writeText(await getLink(id));
    enqueueSnackbar("Đã sao chép link cuộc họp");
  };

  const openMeeting = async (id) => {
    window.open(await getLink(id));
  };

  return (
    <div>
      <Baseitem item={item} />
      <Box style={{ margin: "12px 0px 0px 0px" }}>
        {/* Lịch sử cuộc pv */}
        {interview &&
          interview?.map((item, index) => {
            if (index < interview?.length - 1) {
              return (
                <Box
                  key={index}
                  sx={{
                    background: "#F3F4F6",
                    color: "#455570",
                    padding: "4px 12px",
                    marginTop: "10px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography
                        fontSize="12px"
                        display="flex"
                        fontWeight="500"
                        alignItems="left"
                      >
                        {item?.name}
                      </Typography>
                    </Box>
                    <Iconify
                      icon={"material-symbols:play-circle-rounded"}
                      width={16}
                      height={16}
                      color="#455570"
                    />
                  </Box>
                </Box>
              );
            }
          })}
        <Box>
          {lastInterview?.applicantInterviewState ==
            ApplicantInterviewState.PENDING ||
          lastInterview?.applicantInterviewState ==
            ApplicantInterviewState.CONFIRMED ||
          lastInterview?.applicantInterviewState ==
            ApplicantInterviewState.INTERVIEWING ? (
            <Box
              sx={{
                background: "#4CAF50",
                color: "#FDFDFD",
                padding: "8px 12px 16px",
                marginTop: "12px",
                borderBottomLeftRadius: "4px",
                borderBottomRightRadius: "4px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography
                    fontSize="12px"
                    display="flex"
                    fontWeight="700"
                    alignItems="left"
                  >
                    {lastInterview?.name}
                  </Typography>
                  <Typography
                    fontSize="12px"
                    display="flex"
                    fontWeight="500"
                    alignItems="center"
                  >
                    {lastInterview?.interviewTime
                      ? fDate(lastInterview?.interviewTime) +
                        " " +
                        fTime(lastInterview?.interviewTime) +
                        " - " +
                        fTime(timeEnd)
                      : ""}
                  </Typography>
                </Box>
                <Iconify
                  icon={"mdi:arrow-right-bold-circle"}
                  width={20}
                  height={20}
                  color="#FDFDFD"
                  onClick={() => openMeeting(item?.id)}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "#FDFDFD",
                  borderRadius: "6px",
                  marginTop: "8px",
                  padding: "10px",
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: "#5C6A82",
                      fontWeight: "500",
                      lineClamp: 1,
                      boxOrient: "vertical",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {`${window.location.origin}/phong-van.html...`}
                  </Typography>
                </Box>
                <Iconify
                  icon={"ri:file-copy-fill"}
                  width={20}
                  height={20}
                  color="#5C6A82"
                  onClick={() => copyToClipboard(item?.id)}
                />
              </Box>
            </Box>
          ) : (
            <>
              <Divider style={{ margin: 0 }} />
              <Box style={{ padding: "12px 12px" }}>
                <ButtonDS
                  tittle={"Đặt lịch phỏng vấn"}
                  type="submit"
                  sx={{
                    ":hover": {
                      backgroundColor: "#F3F4F6",
                    },
                    pt: "2px",
                    color: "#455570",
                    backgroundColor: "#FFFFFF",
                    borderRadius: 1,
                    border: 1,
                    borderColor: "#455570",
                    marginRight: "2px",
                    fontSize: "12px",
                    fontWeight: 600,
                    padding: "6px 12px",
                    textTransform: "none",
                  }}
                  onClick={() => handleClick(item)}
                />
              </Box>
            </>
          )}
        </Box>
      </Box>

      {open && (
        <FormCalendar
          options={data}
          open={open}
          setOpen={setOpen}
          optionsFromCruit={data}
        />
      )}
    </div>
  );
}

function ResultItem(props) {
  const [isOpenSendOffer, setIsOpenSendOffer] = useState(false);
  const { item } = props;
  return (
    <div>
      <Baseitem item={item} />
      <Box style={{ margin: "12px 0px 0px 0px" }}>
        <Divider style={{ margin: "0px" }} />
        <Box style={{ padding: "12px 12px " }}>
          <Box>
            <Box
              sx={{
                bgcolor: "background.paper",
                borderRadius: 1,
              }}
            >
              <ButtonGroup
                fullWidth={true}
                style={{ border: "1px solid #E7E9ED" }}
              >
                <Button
                  type="submit"
                  sx={{
                    border: "none",
                    color:
                      item.pipelineStateResultType == 0 ? "#FDFDFD" : "#455570",
                    backgroundColor:
                      item.pipelineStateResultType == 0 ? "#4CAF50" : "#FDFDFD",
                    boxShadow: "none",
                    ":hover": {
                      backgroundColor: "#4CAF50",
                      color: "#FDFDFD",
                      border: "none",
                    },
                    fontSize: "12px",
                    padding: "6px 10px",
                  }}
                >
                  Đạt
                </Button>
                <Button
                  type="submit"
                  sx={{
                    border: "none",
                    color:
                      item.pipelineStateResultType == 1 ? "#FDFDFD" : "#455570",
                    backgroundColor:
                      item.pipelineStateResultType == 1 ? "#FF9800" : "#FDFDFD",
                    boxShadow: "none",
                    ":hover": {
                      backgroundColor: "#FF9800",
                      color: "#FDFDFD",
                      border: "none",
                    },
                    fontSize: "12px",
                    padding: "6px 10px",
                    textTransform: "none",
                  }}
                >
                  Cân nhắc
                </Button>
                <Button
                  type="submit"
                  sx={{
                    border: "none",
                    color:
                      item.pipelineStateResultType == 2 ? "#FDFDFD" : "#455570",
                    backgroundColor:
                      item.pipelineStateResultType == 2 ? "#F44336" : "#FDFDFD",
                    boxShadow: "none",
                    ":hover": {
                      backgroundColor: "#F44336",
                      color: "#FDFDFD",
                      border: "none",
                    },
                    marginLeft: "2px",
                    fontSize: "12px",
                    padding: "6px 10px",
                    textTransform: "none",
                  }}
                >
                  Loại
                </Button>
              </ButtonGroup>
            </Box>

            {item.pipelineStateResultType == 2 && (
              <ButtonDS
                tittle={"Tái Khai Thác"}
                type="submit"
                sx={{
                  ":hover": {
                    backgroundColor: "#F3F4F6",
                  },
                  marginTop: "12px",
                  pt: "2px",
                  color: "#455570",
                  backgroundColor: "#FFFFFF",
                  borderRadius: 1,
                  border: "1px solid #455570",
                  fontSize: "12px",
                  fontWeight: 600,
                  padding: "6px 10px",
                  textTransform: "none",
                }}
              />
            )}
            {/* {item.pipelineStateResultType == 0 && (
              <ButtonDS
                onClick={() => { setIsOpenSendOffer(true) }}
                tittle={"Gửi thư mời nhận việc"}
                type="submit"
                sx={{
                  ":hover": {
                    backgroundColor: "#F3F4F6",
                  },
                  marginTop: '12px',
                  pt: "2px",
                  color: "#455570",
                  backgroundColor: "#FFFFFF",
                  borderRadius: 1,
                  border: '1px solid #455570',
                  fontSize: "12px",
                  fontWeight: 600,
                  padding: "6px 10px",
                  textTransform: "none",
                }}
              />
            )} */}
          </Box>
          {isOpenSendOffer && (
            <ApplicantSendOfferModal
              isOpen={isOpenSendOffer}
              onClose={() => setIsOpenSendOffer(false)}
              showUploadFile={true}
              title="Tạo thư mời nhận việc"
            />
          )}
        </Box>
      </Box>
    </div>
  );
}
function OfferItem(props) {
  const { item } = props;
  return (
    <div>
      <Baseitem item={item} />
      {item.offerStateResultType == 0 && (
        <Box sx={{ display: "flex", pt: 1 }}>
          <Item sx={{ flexShrink: 1 }}>
            <Iconify
              icon={"ri:mail-check-fill"}
              width={20}
              height={20}
              color="#172B4D"
            />
          </Item>
          <Item sx={{ width: "100%", color: "#172B4D" }}>
            Đã tạo thư mời nhận việc
          </Item>
          <Item sx={{ flexShrink: 0 }}>
            <Iconify
              icon={"fluent-mdl2:circle-half-full"}
              width={20}
              height={20}
              color="#172B4D"
            />
          </Item>
        </Box>
      )}
      {item.offerStateResultType == 1 && (
        <Box sx={{ display: "flex", pt: 1 }}>
          <Item sx={{ flexShrink: 1 }}>
            <Iconify
              icon={"ic:round-mark-email-unread"}
              width={20}
              height={20}
              color="#F77A0C"
            />
          </Item>
          <Item sx={{ width: "100%", color: "#F77A0C" }}>
            Đã gửi, chờ phản hồi
          </Item>
          <Item sx={{ flexShrink: 0 }}>
            <Iconify
              icon={"fluent-mdl2:circle-half-full"}
              width={20}
              height={20}
              color="#F77A0C"
            />
          </Item>
        </Box>
      )}
      {item.offerStateResultType == 2 && (
        <Box sx={{ display: "flex", pt: 1 }}>
          <Item sx={{ flexShrink: 1 }}>
            <Iconify
              icon={"material-symbols:check-circle"}
              width={20}
              height={20}
              color="#388E3C"
            />
          </Item>
          <Item sx={{ width: "100%", color: "#388E3C" }}>Đồng ý nhận việc</Item>
          <Item sx={{ flexShrink: 0 }}>
            <Iconify
              icon={"fluent-mdl2:circle-half-full"}
              width={20}
              height={20}
              color="#388E3C"
            />
          </Item>
        </Box>
      )}
      {item.offerStateResultType == 3 && (
        <Box sx={{ display: "flex", pt: 1 }}>
          <Item sx={{ flexShrink: 1 }}>
            <Iconify
              icon={"mdi:alpha-x-circle"}
              width={20}
              height={20}
              color="#D32F2F"
            />
          </Item>
          <Item sx={{ width: "100%", color: "#D32F2F" }}>
            Từ chối nhận việc
          </Item>
          <Item sx={{ flexShrink: 0 }}>
            <Iconify
              icon={"fluent-mdl2:circle-half-full"}
              width={20}
              height={20}
              color="#D32F2F"
            />
          </Item>
        </Box>
      )}
    </div>
  );
}

function TaskCard({ item, index, pipelineStateType }) {
  const theme = useTheme();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [openGroup, setOpenGroup] = useState(false);

  const [tranfer] = useUpdateApplicantRecruitmentToNextStateMutation();
  const [getInfo] = useLazyGetRecruitmentPipelineStatesByRecruitmentsQuery();

  const handleOpenGroup = () => {
    setOpenGroup(true);
  };

  const handleCloseGroup = () => {
    setOpenGroup(false);
  };

  const pressGetFromIVIEC = () => {
    enqueueSnackbar("Tính năng đang được phát triển, thử lại sau!", {
      variant: "warning",
    });
  };

  const pressEdit = () => {
    router.push(
      {
        pathname: PATH_DASHBOARD.applicant.view(item?.applicantId),
        query: {
          correlationId: item?.correlationId,
          organizationId: item?.organizationId,
          recruitmentId: item?.recruitmentId,
          applicantId: item?.applicantId,
          mode: "edit",
        },
      },
      undefined,
      { shallow: true }
    );
  };

  const pressDelete = async () => {
    const res = await getInfo({ RecruitmentId: item?.recruitmentId }).unwrap();
    const body = {
      applicantId: item?.applicantId,
      recruitmentId: item?.recruitmentId,
      recruitmentPipelineStateId: res.items?.find(
        (i) => i.pipelineStateType === 3
      )?.id,
      pipelineStateResultType: "2",
    };
    await tranfer(body).unwrap();
  };

  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Paper
              sx={{
                width: 1,
                position: "relative",
                border: "none",
                borderRadius: "4px",
                boxShadow:
                  "0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)",
                mb: 2,
                // boxShadow: (theme) => theme.customShadows.z1,
                "&:hover": {
                  // border: '0.5px solid #5C6A82',
                  // boxShadow: (theme) => theme.customShadows.z16,
                  boxShadow:
                    "0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)",
                },
              }}
            >
              <Box
                sx={{
                  justifyContent: "space-between",
                  display: "flex",
                  flexDirection: "row",
                  p: "16px 12px 4px 12px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    fontSize: "11px",
                    lineHeight: 18,
                    fontWeight: "600",
                    alignItems: "center",
                  }}
                >
                  <Typography fontSize="12px">
                    {fDate(item.createdTime)}
                  </Typography>
                </Box>
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
                        <MenuItem onClick={pressGetFromIVIEC}>
                          <LogoIcon />
                          <Typography ml={"12px"} variant={"textSize13600"}>
                            Lấy từ kho iVIEC
                          </Typography>
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={pressEdit}>
                          <EditIcon sx={{ mr: "12px" }} />
                          <Typography ml={"12px"} variant={"textSize13600"}>
                            Chỉnh sửa
                          </Typography>
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={pressDelete}>
                          <CircleLineIcon sx={{ mr: "12px" }} />
                          <Typography
                            color={theme.palette.text.warning}
                            ml={"12px"}
                            variant={"textSize13600"}
                          >
                            Loại ứng viên
                          </Typography>
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  }
                >
                  <Button
                    size="small"
                    aria-haspopup="menu"
                    style={{ minWidth: 0, padding: 0 }}
                    onClick={handleOpenGroup}
                  >
                    <Iconify
                      icon={"ph:dots-three-bold"}
                      width={20}
                      height={20}
                      color="#455570"
                    />
                  </Button>
                </LightTooltip>
              </Box>

              <Box sx={{ cursor: "pointer" }}>
                <Stack sx={{ borderRadius: "8px", background: "#FDFDFD" }}>
                  {pipelineStateType == 0 && <Baseitem item={item} />}
                  {pipelineStateType == 1 && <ExaminationItem item={item} />}
                  {pipelineStateType == 2 && <InterviewItem item={item} />}
                  {pipelineStateType == 3 && <ResultItem item={item} />}
                  {pipelineStateType == 4 && <OfferItem item={item} />}

                  <Box
                    display="Grid"
                    alignItems="center"
                    gridTemplateColumns="60px 1fr"
                  ></Box>
                </Stack>
              </Box>
            </Paper>
          </div>
        );
      }}
    </Draggable>
  );
}

TaskCard.propTypes = {
  index: PropTypes.number,
  item: PropTypes.object,
};

export default memo(TaskCard);
