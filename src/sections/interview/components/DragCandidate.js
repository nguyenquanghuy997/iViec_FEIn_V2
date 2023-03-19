import DeleteIcon from "@/assets/interview/DeleteIcon";
import MenuListIcon from "@/assets/interview/MenuListIcon";
import { FormProvider, RHFTextField } from "@/components/hook-form";
// import { RHFDatePicker } from "@/components/hook-form";
// import RHFTimePicker from "@/components/hook-form/RHFTimePicker";
// import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Typography, Box, Card, Collapse } from "@mui/material";
// import { MobileTimePicker } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { TimePicker } from "antd";
// import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
// import * as Yup from "yup";

function DragCandidate({ data, onDelete }) {
  const [characters, setCharacters] = useState([]);
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setCharacters([...data]);
  }, [data]);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCharacters(items);
  }
  // const ConnectSchema = Yup.object().shape({
  //   email: Yup.string()
  //     .email("Email không đúng định dạng")
  //     .required("Email không được bỏ trống"),
  //   password: Yup.string()
  //     .min(6, "Mật khẩu cần tối thiểu 6 ký tự")
  //     .required("Mật khẩu không được bỏ trống"),
  // });

  const defaultValues = {
    name: "",
    recruitmentId: "",
    reviewFormId: "",
    interviewType: "",
    address: "",
    interviewDuration: "",
    interviewTime: "",
    note: "",
    isSendMailCouncil: true,
    isSendMailApplicant: true,
    isRemove: true,
  };

  const methods = useForm({
    // resolver: yupResolver(ConnectSchema),
    defaultValues,
  });

  const {
    // setError,
    handleSubmit,
  } = methods;

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
              {characters.map(({ id, name, phone }, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <li
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
                          }}
                        >
                          <Card
                            sx={{
                              dispaly: "flex",
                              flexDirection: "row",
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
                              <div style={{ display: "flex" }}>
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
                              <div style={{ display: "flex" }}>
                                <Box
                                  sx={{ mt: "2px", cursor: "pointer" }}
                                  onClick={onDelete}
                                >
                                  <DeleteIcon />
                                </Box>
                              </div>
                            </div>
                          </Card>
                          {checked ? (
                            <FormProvider
                              methods={methods}
                              onSubmit={handleSubmit((data) =>
                                console.log("đaad", data)
                              )}
                            >
                              <Box sx={{ mb: 2, width: "100%" }}>
                                <Typography>
                                  Ngày phỏng vấn{" "}
                                  <span style={{ color: "red" }}>*</span>
                                </Typography>
                                <RHFTextField
                                  isRequired
                                  sx={{
                                    minHeight: 44,
                                    width: "100%",
                                    background: "white",
                                    border: "8px",
                                  }}
                                  name={`bookingCalendarGroups${index}.interviewTime`}
                                  placeholder="Nhập số phút"
                                />
                              </Box>
                              <Box sx={{ width: "100%" }}>
                                <Box>
                                  <div>
                                    <Collapse in={checked}>
                                      <Box sx={{ mb: 2 }}>
                                        <Typography>
                                          Giờ phỏng vấn{" "}
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
                                          name={`bookingCalendarGroups${index}.interviewTime`}
                                          placeholder="Nhập số phút"
                                        />
                                      </Box>
                                    </Collapse>
                                  </div>
                                </Box>
                              </Box>
                              <Box sx={{ width: "100%" }}>
                                <Box>
                                  <div>
                                    <Collapse in={checked}>
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
                                          name={`bookingCalendarGroups${index}.interviewDuration`}
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
                                  onClick={() => setChecked(!checked)}
                                  sx={{ color: "#172B4D" }}
                                >
                                  Hủy
                                </Button>
                                <Button
                                  type="submit"
                                  variant="contained"
                                  sx={{ background: "#1976D2" }}
                                >
                                  Lưu
                                </Button>
                              </div>
                            </FormProvider>
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
                              {checked ? (
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
                                      // display:{checked} ? "none" :'block'
                                    }}
                                    onClick={handleChange}
                                  >
                                    {" "}
                                    Điều chỉnh ngày giờ phỏng vấn
                                  </Button>
                                </Card>
                              )}
                            </>
                          )}
                        </div>
                      </li>
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
