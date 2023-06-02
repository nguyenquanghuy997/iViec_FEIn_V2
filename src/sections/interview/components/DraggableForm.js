import { DeleteIcon } from "@/assets/ActionIcon";
import MenuListIcon from "@/assets/interview/MenuListIcon";
import MuiDatePicker from "@/components/form/MuiDatePicker";
import MuiInputNumber from "@/components/form/MuiInputNumber";
import MuiTimePicker from "@/components/form/MuiTimePicker";
import { Label } from "@/components/hook-form/style";
import { DragItem } from "@/sections/interview/components/DragCandidate";
import {
  convertDurationTimeToSeconds,
  convertStoMs,
  pushMin,
} from "@/sections/interview/config";
import { Avatar, Box, Button, Card, Collapse, Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useFormContext } from "react-hook-form";
import {useTheme} from "@mui/material/styles";

function DraggableForm({ model, index, removeItem }) {
  const {
    setValue,
    getValues,
    watch,
    setError,
    formState: { errors },
  } = useFormContext();
  const [open, setOpen] = useState(true);
  const [first, setFirst] = useState(false);
  const [time, setTime] = useState(false);
  const theme = useTheme();
  useEffect(() => {
    if (first) return;
    setValue(
      `bookingCalendarGroups.[0].bookingCalendarApplicants.${index}.applicantId`,
      model.id
    );
    setFirst(true);
  }, [first]);

  useEffect(() => {
    if (
      getValues(
        `bookingCalendarGroups.[0].bookingCalendarApplicants.${index}.date`
      ) &&
      getValues(
        `bookingCalendarGroups.[0].bookingCalendarApplicants.${index}.interviewTime`
      ) &&
      getValues(
        `bookingCalendarGroups.[0].bookingCalendarApplicants.${index}.interviewDuration`
      )
    ) {
      return setTime(true);
    }
    setTime(false);
  }, [open]);

  const checkForm = () => {
    if (
      !getValues(
        `bookingCalendarGroups.[0].bookingCalendarApplicants.${index}.date`
      )
    ) {
      setError(
        `bookingCalendarGroups.[0].bookingCalendarApplicants.${index}.date`,
        { type: "custom", message: "Chưa chọn ngày phỏng vấn" }
      );
    }
    if (
      !getValues(
        `bookingCalendarGroups.[0].bookingCalendarApplicants.${index}.interviewTime`
      )
    ) {
      setError(
        `bookingCalendarGroups.[0].bookingCalendarApplicants.${index}.interviewTime`,
        { type: "custom", message: "Chưa chọn giờ phỏng vấn" }
      );
    }
    const time = convertStoMs(
      convertDurationTimeToSeconds(
        `${getValues(
          `bookingCalendarGroups.[0].bookingCalendarApplicants.${index}.interviewTime`
        )}:00`
      )
    );
    const date = new Date(
      `${moment(
        getValues(
          `bookingCalendarGroups.[0].bookingCalendarApplicants.${index}.date`
        )
      ).format("YYYY-MM-DD")} ${time}`
    );
    if (moment() > date) {
      setError(
        `bookingCalendarGroups.[0].bookingCalendarApplicants.${index}.interviewTime`,
        { type: "custom", message: "Giờ phỏng vấn phải lớn hơn hiện tại" }
      );
    }
    if (
      !getValues(
        `bookingCalendarGroups.[0].bookingCalendarApplicants.${index}.interviewDuration`
      )
    ) {
      setError(
        `bookingCalendarGroups.[0].bookingCalendarApplicants.${index}.interviewDuration`,
        { type: "custom", message: "Chưa chọn thời lượng phỏng vấn" }
      );
    }

    if (!errors?.bookingCalendarGroups?.length) {
      setTime(true);
      setOpen(false);
    }
  };
  
  return (
    <Draggable key={model.id} draggableId={model.id} index={index}>
      {(provided) => (
        <DragItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div
            style={{
              background: theme.palette.common.bgrMaster,
              padding: "16px",
              marginBottom: "16px",
              borderRadius: "6px ",
              width: "100%",
            }}
          >
            <Card
              sx={{
                boxShadow: "none",
                border: "none",
                mb: 2,
                borderRadius: "6px",
                background: theme.palette.common.bgrMaster,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <MenuListIcon />
                  <Box sx={{ display: "flex", ml: 1 }}>
                    <Avatar
                      alt={""}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "10px",
                        marginRight: "16px",
                      }}
                      src={model.image}
                    />
                    <div>
                      <Typography
                        sx={{
                          fontSize: "13px",
                          fontWeight: "600",
                          marginBottom: "4px"
                        }}
                      >
                        {model.name}
                      </Typography>
                      <Typography
                        color={theme.palette.common.neutral700}
                        sx={{
                          fontSize: "12px",
                          fontWeight: "400",
                        }}
                      >
                        {model.phone}
                      </Typography>
                    </div>
                  </Box>
                </div>

                <Box
                  sx={{
                    mt: "2px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={() => removeItem(model.id)}
                >
                  <DeleteIcon />
                </Box>
              </div>
            </Card>
            {open ? (
              <>
                <Box sx={{ mb: 2, width: "100%" }}>
                  <Label required={true}>Ngày phỏng vấn</Label>
                  <MuiDatePicker
                    name={`bookingCalendarGroups.[0].bookingCalendarApplicants.${index}.date`}
                    placeholder="Chọn ngày"
                    DatePickerProps={{
                      minDate: new Date(),
                    }}
                  />
                </Box>
                <Box sx={{ width: "100%" }}>
                  <Box>
                    <div>
                      <Collapse in={open}>
                        <Box sx={{ mb: 2 }}>
                          <Label required={true}> Giờ phỏng vấn</Label>
                          <MuiTimePicker
                            name={`bookingCalendarGroups.[0].bookingCalendarApplicants.${index}.interviewTime`}
                            style={{
                              width: "100%",
                              background: "white",
                              borderRadius: "8px",
                            }}
                          />
                        </Box>
                      </Collapse>
                    </div>
                  </Box>
                </Box>
                <Box sx={{ width: "100%" }}>
                  <Box>
                    <div>
                      <Collapse in={open}>
                        <Box sx={{ mb: 2 }}>
                          <Label required={true}>Thời lượng phỏng vấn</Label>
                          <MuiInputNumber
                            name={`bookingCalendarGroups.[0].bookingCalendarApplicants.${index}.interviewDuration`}
                            placeholder="Nhập số phút"
                          />
                        </Box>
                      </Collapse>
                    </div>
                  </Box>
                </Box>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <Button
                    onClick={() => setOpen(false)}
                    sx={{
                      color: theme.palette.common.neutral800,
                      "&:hover": {
                        bgcolor: theme.palette.common.bgrMaster,
                      },
                    }}
                  >
                    Hủy
                  </Button>
                  <Button
                    onClick={checkForm}
                    variant="contained"
                    sx={{ background: theme.palette.common.blue700 }}
                  >
                    Lưu
                  </Button>
                </div>
              </>
            ) : !time ? (
              <Card
                sx={{
                  textAlign: "center",
                  px: 2,
                  borderRadius: "6px",
                }}
              >
                <Button
                  sx={{
                    m: "0 auto",
                    textTransform: "none",
                    fontWeight: 400,
                    fontSize: 14,
                    "&:hover": {
                      backgroundColor: "white",
                    },
                  }}
                  onClick={() => setOpen(true)}
                >
                  Điều chỉnh ngày giờ phỏng vấn
                </Button>
              </Card>
            ) : (
              <Card sx={{ textAlign: "center", py: 1, px: 2 }}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    m: "0 auto",
                    fontSize: 13,
                  }}
                >
                  {watch(
                    `bookingCalendarGroups.[0].bookingCalendarApplicants.${index}.interviewTime`
                  )}{" "}
                  -
                  {watch(
                    `bookingCalendarGroups.[0].bookingCalendarApplicants.${index}.interviewTime`
                  )
                    ? pushMin(
                        watch(
                          `bookingCalendarGroups.[0].bookingCalendarApplicants.${index}.interviewTime`
                        ),
                        watch(
                          `bookingCalendarGroups.[0].bookingCalendarApplicants.${index}.interviewDuration`
                        )
                      )
                    : ""}{" "}
                  Ngày{" "}
                  {watch(
                    `bookingCalendarGroups.[0].bookingCalendarApplicants.${index}.date`
                  )?.toLocaleDateString()}
                </Typography>
                <Button
                  sx={{ m: "0 auto", textTransform: "none" }}
                  onClick={() => setOpen(true)}
                >
                  {" "}
                  Điều chỉnh
                </Button>{" "}
              </Card>
            )}
          </div>
        </DragItem>
      )}
    </Draggable>
  );
}

export default DraggableForm;
