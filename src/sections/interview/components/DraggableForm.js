import { Avatar, Box, Button, Card, Collapse, Typography } from "@mui/material";
import MenuListIcon from "@/assets/interview/MenuListIcon";
import { DeleteIcon } from "@/assets/ActionIcon";
import { Label } from "@/components/hook-form/style";
import { RHFDatePicker, RHFTextField } from "@/components/hook-form";
import RHFTimePicker from "@/components/hook-form/RHFTimePicker";
import { Draggable } from "react-beautiful-dnd";
import React, { useEffect, useState } from "react";
import { DragItem } from "@/sections/interview/components/DragCandidate";
import { useFormContext } from "react-hook-form";
import { pushMin } from "@/sections/interview/config";

function DraggableForm({model, index, removeItem}) {
  const {setValue, getValues, watch} = useFormContext();
  const [open, setOpen] = useState(false);
  const [first, setFirst] = useState(false);
  const [time, setTime] = useState(false);
  const today = new Date();
  
  useEffect(() => {
    if (first) return;
    if (!getValues(`bookingCalendarGroups.[0].bookingCalendarApplicants.${index}.date`)) {
      setValue(`bookingCalendarGroups.[0].bookingCalendarApplicants.${index}.date`, new Date())
    }
    setValue(`bookingCalendarGroups.[0].bookingCalendarApplicants.${index}.applicantId`, model.id);
    setFirst(true);
  }, [first]);
  
  useEffect(() => {
    if (getValues(`bookingCalendarGroups.[0].bookingCalendarApplicants.${index}.date`)
      && getValues(`bookingCalendarGroups.[0].bookingCalendarApplicants.${index}.interviewTime`)
      && getValues(`bookingCalendarGroups.[0].bookingCalendarApplicants.${index}.interviewDuration`)) {
      return setTime(true);
    }
    setTime(false);
  }, [open]);
  
  const checkForm = () => {
    if (!getValues(`bookingCalendarGroups.[0].bookingCalendarApplicants.${index}.date`)
      || !getValues(`bookingCalendarGroups.[0].bookingCalendarApplicants.${index}.interviewTime`)
      || !getValues(`bookingCalendarGroups.[0].bookingCalendarApplicants.${index}.interviewDuration`)) return;
    setTime(true);
    setOpen(false);
  };
  
  return <Draggable key={model.id} draggableId={model.id} index={index}>
    {(provided) => (
      <DragItem
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <div
          style={{
            background: "#F2F4F5",
            padding: "16px",
            marginBottom: "16px",
            borderRadius: "6px ",
            width: "100%"
          }}
        >
          <Card
            sx={{
              boxShadow: "none",
              border: "none",
              mb: 2,
              borderRadius: "6px",
              background: "#F2F4F5"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <MenuListIcon/>
                <Box sx={{display: "flex", ml: 1}}>
                  <Avatar
                    alt={""}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "10px",
                      marginRight: "16px"
                    }}
                    src={model.image}
                  />
                  <div>
                    <Typography
                      sx={{
                        fontSize: "13px",
                        fontWeight: "600"
                      }}
                    >
                      {model.name}
                    </Typography>
                    <Typography
                      color="#455570"
                      sx={{
                        fontSize: "12px",
                        fontWeight: "400"
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
                  alignItems: "center"
                }}
                onClick={() => removeItem(model.id)}
              >
                <DeleteIcon/>
              </Box>
            </div>
          </Card>
          {open ? (
            <>
              <Box sx={{mb: 2, width: "100%"}}>
                <Label required={true}>Ngày phỏng vấn</Label>
                <RHFDatePicker
                  name={`bookingCalendarGroups.[0].bookingCalendarApplicants.${index}.date`}
                  today={today}
                  style={{
                    background: "white",
                    borderRadius: "8px"
                  }}
                />
              </Box>
              <Box sx={{width: "100%"}}>
                <Box>
                  <div>
                    <Collapse in={open}>
                      <Box sx={{mb: 2}}>
                        <Label required={true}> Giờ phỏng vấn</Label>
                        
                        <RHFTimePicker
                          name={`bookingCalendarGroups.[0].bookingCalendarApplicants.${index}.interviewTime`}
                          style={{
                            width: "100%",
                            background: "white",
                            borderRadius: "8px"
                          }}
                        />
                      </Box>
                    </Collapse>
                  </div>
                </Box>
              </Box>
              <Box sx={{width: "100%"}}>
                <Box>
                  <div>
                    <Collapse in={open}>
                      <Box sx={{mb: 2}}>
                        <Label required={true}>Thời lượng phỏng vấn</Label>
                        
                        <RHFTextField
                          isRequired
                          sx={{
                            minHeight: 44,
                            width: "100%",
                            background: "white",
                            borderRadius: "8px"
                          }}
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
                  justifyContent: "end"
                }}
              >
                <Button
                  onClick={() => setOpen(false)}
                  sx={{
                    color: "#172B4D", "&:hover": {
                      bgcolor: "#F2F4F5"
                    }
                  }}
                >
                  Hủy
                </Button>
                <Button
                  onClick={checkForm}
                  variant="contained"
                  sx={{background: "#1976D2"}}
                >
                  Lưu
                </Button>
              </div>
            </>
          ) : !time ? <Card
              sx={{
                textAlign: "center",
                px: 2,
                borderRadius: "6px"
              }}
            >
              <Button
                sx={{
                  m: "0 auto",
                  textTransform: "none",
                  fontWeight: 400,
                  fontSize: 14,
                  "&:hover": {
                    backgroundColor: "white"
                  }
                }}
                onClick={() => setOpen(true)}
              >
                Điều chỉnh ngày giờ phỏng vấn
              </Button>
            </Card> :
            <Card sx={{textAlign: "center", py: 1, px: 2}}>
              <Typography
                sx={{
                  fontWeight: 600,
                  m: "0 auto",
                  fontSize: 13
                }}
              >
                {watch(`bookingCalendarGroups.[0].bookingCalendarApplicants.${index}.interviewTime`)} - 
                {watch(`bookingCalendarGroups.[0].bookingCalendarApplicants.${index}.interviewTime`) ? pushMin(watch(`bookingCalendarGroups.[0].bookingCalendarApplicants.${index}.interviewTime`), watch(`bookingCalendarGroups.[0].bookingCalendarApplicants.${index}.interviewDuration`)):''}
                {" "}Ngày {watch(`bookingCalendarGroups.[0].bookingCalendarApplicants.${index}.date`)?.toLocaleDateString()}
              </Typography>
              <Button
                sx={{m: "0 auto", textTransform: "none"}}
                onClick={() => setOpen(true)}
              >
                {" "}
                Điều chỉnh
              </Button>{" "}
            </Card>
          }
        </div>
      </DragItem>
    )}
  </Draggable>;
}

export default DraggableForm;