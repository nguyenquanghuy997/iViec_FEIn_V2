import { DeleteIcon } from "@/assets/ActionIcon";
import MenuListIcon from "@/assets/interview/MenuListIcon";
import { RHFDatePicker, RHFTextField } from "@/components/hook-form";
import RHFTimePicker from "@/components/hook-form/RHFTimePicker";
import { Button, Typography, Box, Card, Collapse } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Label } from "@/components/hook-form/style";
export const DragItem = styled("li")(() => ({
  "&::marker": {
    color: "white",
  },
}));
function DragCandidate({ data, onDelete, open, onClose, onOpen }) {
  const [characters, setCharacters] = useState([]);
  const newArr = (data || [])?.map((item) => item);
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setCharacters([...data, items]);
  };
  const time = false;
  const today = new Date();
  return (
    <div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable sx={{ height: "100%" }} droppableId="characters">
          {(provided) => (
            <ul
              style={{ overflowY: "auto", height: "calc(100% - 105px)" }}
              className="characters"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {newArr.map(({ id, name, phone, image }, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
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
                            width: "100%",
                          }}
                        >
                          <Card
                            sx={{
                              boxShadow: "none",
                              border: "none",
                              mb: 2,
                              borderRadius: "6px",
                              background: "#F2F4F5",
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
                                  <img
                                    alt={""}
                                    style={{
                                      width: 40,
                                      height: 40,
                                      borderRadius: "10px",
                                      marginRight: "16px",
                                    }}
                                    src={image}
                                  />
                                  <div>
                                    <Typography
                                      sx={{
                                        fontSize: "13px",
                                        fontWeight: "600",
                                      }}
                                    >
                                      {name}
                                    </Typography>
                                    <Typography
                                      color="#455570"
                                      sx={{
                                        fontSize: "12px",
                                        fontWeight: "400",
                                      }}
                                    >
                                      {phone}
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
                                onClick={onDelete}
                              >
                                <DeleteIcon />
                              </Box>
                            </div>
                          </Card>
                          {open ? (
                            <>
                              <Box sx={{ mb: 2, width: "100%" }}>
                                <Label required={true}>Ngày phỏng vấn</Label>
                                <RHFDatePicker
                                  name={`date.${index}`}
                                  today={today}
                                  style={{
                                    background: "white",
                                    borderRadius: "8px",
                                  }}
                                />
                              </Box>
                              <Box sx={{ width: "100%" }}>
                                <Box>
                                  <div>
                                    <Collapse in={open}>
                                      <Box sx={{ mb: 2 }}>
                                      <Label required={true}> Giờ phỏng vấn</Label>
                                      
                                        <RHFTimePicker
                                          name={`bookingCalendarGroups.${index}.bookingCalendarApplicants.${index}.interviewTime`}
                                          style={{
                                            width: "100%",
                                            background: "white",
                                            borderRadius: '8px'
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

                                        <RHFTextField
                                          isRequired
                                          sx={{
                                            minHeight: 44,
                                            width: "100%",
                                            background: "white",
                                            borderRadius: '8px'
                                          }}
                                          name={`bookingCalendarGroups.${index}.bookingCalendarApplicants.${index}.interviewDuration`}
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
                                  onClick={onClose}
                                  sx={{ color: "#172B4D",'&:hover':{
                                    bgcolor:'#F2F4F5'
                                  } }}
                                >
                                  Hủy
                                </Button>
                                <Button
                                  onClick={onClose}
                                  variant="contained"
                                  sx={{ background: "#1976D2" }}
                                >
                                  Lưu
                                </Button>
                              </div>
                            </>
                          ) : (
                            ""
                          )}
                          {time ? (
                            <Card sx={{ textAlign: "center", py: 1, px: 2 }}>
                              <Typography
                                sx={{
                                  fontWeight: 600,
                                  m: "0 auto",
                                  fontSize: 13,
                                }}
                              >
                                {time}
                              </Typography>
                              <Button
                                sx={{ m: "0 auto", textTransform: "none" }}
                              >
                                {" "}
                                Điều chỉnh
                              </Button>{" "}
                            </Card>
                          ) : (
                            <>
                              {open ? (
                                ""
                              ) : (
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
                                      '&:hover': {
                                        bgcolor: 'white'
                                      }
                                    }}
                                    onClick={onOpen}
                                  >
                                    Điều chỉnh ngày giờ phỏng vấn
                                  </Button>
                                </Card>
                              )}
                            </>
                          )}
                        </div>
                      </DragItem>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default DragCandidate;
