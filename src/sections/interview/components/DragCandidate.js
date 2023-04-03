import DeleteIcon from "@/assets/interview/DeleteIcon";
import MenuListIcon from "@/assets/interview/MenuListIcon";
import { RHFDatePicker, RHFTextField } from "@/components/hook-form";
import RHFTimePicker from "@/components/hook-form/RHFTimePicker";
import { Button, Typography, Box, Card, Collapse } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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

  return (
    <div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters">
          {(provided) => (
            <ul
              className="characters"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {newArr.map(({ id, name, phone }, index) => {
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
                                    style={{
                                      width: 40,
                                      height: 40,
                                      borderRadius: "11px",
                                      marginRight: "16px",
                                    }}
                                    src="https://i.pinimg.com/236x/a7/f5/40/a7f540b5e119822ff15075600b1d22dd.jpg"
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
                                sx={{ mt: "2px", cursor: "pointer" }}
                                onClick={onDelete}
                              >
                                <DeleteIcon />
                              </Box>
                            </div>
                          </Card>
                          {open ? (
                            <>
                              <Box sx={{ mb: 2, width: "100%" }}>
                                <Typography>
                                  Ngày phỏng vấn{" "}
                                  <span style={{ color: "red" }}>*</span>
                                </Typography>
                                <RHFDatePicker
                                  name="date"
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
                                        <Typography>
                                          Giờ phỏng vấn{" "}
                                          <span style={{ color: "red" }}>
                                            *
                                          </span>
                                        </Typography>
                                        <RHFTimePicker
                                          name={`bookingCalendarApplicants.${id}.interviewTime`}
                                          style={{
                                            width: "100%",
                                            background: "white",
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
                                        <Typography>
                                          Thời lượng phỏng vấn{" "}
                                          <span style={{ color: "red" }}>
                                            *
                                          </span>
                                        </Typography>
                                        <RHFTextField
                                          isRequired
                                          sx={{
                                            minHeight: 44,
                                            width: "100%",
                                            background: "white",
                                            border: "8px",
                                          }}
                                          name={`bookingCalendarApplicants.${id}.interviewDuration`}
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
                                  sx={{ color: "#172B4D" }}
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

                                      // display:{checked} ? "none" :'block'
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
