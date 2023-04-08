import DragCandidate from "./DragCandidate";
import PlusIcon from "@/assets/interview/PlusIcon";
import Iconify from "@/components/Iconify";
import {
  LabelStyle,
  MenuItemStyle,
  SearchInputStyle,
  SelectFieldStyle,
  TextFieldStyle,
  useStyles
} from "@/components/hook-form/style";
import { STYLE_CONSTANT as style } from "@/theme/palette";
import { containsText } from "@/utils/function";
import {
  Box,
  FormHelperText,
  InputAdornment,
  MenuItem,
  Stack,
  Typography,
  Button,
  Card
} from "@mui/material";
import moment from "moment";
import React, { memo, useEffect, useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

const MenuProps = {
  PaperProps: {
    style: { maxHeight: 330 }
  },
  disableAutoFocusItem: true,
  MenuListProps: {
    disableListWrap: true
  }
};

const InputProps = {
  startAdornment: (
    <InputAdornment position="start">
      <Iconify icon={"ri:search-2-line"} color="#5c6a82" />
    </InputAdornment>
  )
};

const renderOptions = (options) => {
  return options?.map((variant, i) => {
    return (
      <MenuItem sx={{ ...MenuItemStyle }} key={i} value={variant.value}>
        <Box sx={{ display: "flex" }}>
          <img
            alt={""}
            style={{
              width: 36,
              height: 36,
              borderRadius: "10px"
            }}
            src={variant?.image}
          />
          <Box sx={{ ml: 2 }}>
            <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
              {variant?.name}
            </Typography>
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 400,
                color: "#5C6A82"
              }}
            >
              {variant?.phone}
            </Typography>
          </Box>
        </Box>
      </MenuItem>
    );
  });
};

function RHFSelectMultiple({ name, isEditmode, ...props }) {
  const [filterOptions, setFilterOptions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const { control } = useFormContext();

  const classes = useStyles();
  const { defaultValue, isRequired, title, options, disabled, multiple } =
    props;
  const { remove } = useFieldArray({ control, name });
  const renderChipsSelect = (options, value) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => {
      setOpen(false);
    };
    const handleOpen = () => {
      setOpen(true);
    };
    const time = false;
    const test = value[0]?.bookingCalendarGroupApplicants?.map(
      (item) => item?.interviewTime
    );
    const duration = value[0]?.bookingCalendarGroupApplicants?.map(
      (item) => item?.interviewDuration
    );
    const convertDurationTimeToSeconds = (time) => {
      const splitToString = time.split(":");
      return (
        +splitToString[0] * 60 * 60 + +splitToString[1] * 60 + +splitToString[2]
      );
    };

    const convertStoMs = (s) => {
      const totalMinutes = Math.floor(s / 60);
      const hours = Math.floor(totalMinutes / 60);
      const newHours = hours < 10 ? "0" + hours : hours;
      const minutes = totalMinutes % 60;
      return `${newHours}:${minutes}`;
    };

    return (
      <Stack height={"100%"} sx={{ "> div": { height: "100%" } }}>
        <DragCandidate
          data={options?.filter((option) =>
            (value || []).includes(option?.value)
          )}
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
        />
        {isEditmode &&
          value[0]?.bookingCalendarGroupApplicants?.map((item, index) => (
            <div
              style={{
                background: "#F2F4F5",
                padding: "16px",
                marginBottom: "16px",
                borderRadius: "6px ",
                width: "100%",
                height: "100%"
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
                    <Box sx={{ display: "flex", ml: 1 }}>
                      <img
                        alt={""}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: "10px",
                          marginRight: "16px"
                        }}
                        src={`http://103.176.149.158:5001/api/Image/GetImage?imagePath=${item?.applicant?.portraitImage}`}
                      />
                      <div>
                        <Typography
                          sx={{
                            fontSize: "13px",
                            fontWeight: "600"
                          }}
                        >
                          {item?.applicant?.fullName}
                        </Typography>
                        <Typography
                          color="#455570"
                          sx={{
                            fontSize: "12px",
                            fontWeight: "400"
                          }}
                        >
                          {item?.applicant?.phoneNumber}
                        </Typography>
                      </div>
                    </Box>
                  </div>
                </div>
              </Card>
              {open ? (
                <>
                  <Box sx={{ mb: 2, width: "100%" }}>
                    <Typography>
                      Ngày phỏng vấn <span style={{ color: "red" }}>*</span>
                    </Typography>
                    {/* <RHFDatePicker
                    name="date"
                    today={today}
                    style={{
                      background: "white",
                      borderRadius: "8px",
                    }}
                  /> */}
                  </Box>
                  <Box sx={{ width: "100%" }}>
                    <Box>
                      <div>
                        {/* <Collapse in={open}>
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
                      </Collapse> */}
                      </div>
                    </Box>
                  </Box>
                  <Box sx={{ width: "100%" }}>
                    <Box>
                      <div>
                        {/* <Collapse in={open}>
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
                      </Collapse> */}
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
                      // onClick={onClose}
                      sx={{ color: "#172B4D" }}
                    >
                      Hủy
                    </Button>
                    <Button
                      // onClick={onClose}
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
                      fontSize: 13
                    }}
                  >
                    {time}
                  </Typography>
                  <Button sx={{ m: "0 auto", textTransform: "none" }}>
                    {" "}
                    Điều chỉnh
                  </Button>{" "}
                </Card>
              ) : (
                <>
                  {test ? (
                    <Card
                      sx={{
                        textAlign: "center",
                        borderRadius: "6px",
                        fontSize: 13,
                        py: 2,
                        fontWeight: 600
                      }}
                    >
                      {convertStoMs(
                        convertDurationTimeToSeconds(
                          moment(test[index]).format("hh:mm:ss")
                        ) - convertDurationTimeToSeconds(duration[index])
                      )}
                      -{moment(test[index]).format("hh:mm")}
                      {` Ngày ${moment(test[index]).format("DD-MM-YYYY")}`}
                    </Card>
                  ) : (
                    <Card
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
                          fontSize: 14
                        }}
                        // onClick={onOpen}
                      >
                        Điều chỉnh ngày giờ phỏng vấn
                      </Button>
                    </Card>
                  )}
                </>
              )}
            </div>
          ))}
      </Stack>
    );
  };

  useEffect(() => {
    if (searchText) {
      setFilterOptions(
        options?.filter((option) => containsText(option.name, searchText))
      );
    } else {
      setFilterOptions(options);
    }
  }, [searchText, options]);
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || []}
      render={({ field, fieldState: { error } }) => (
        <Stack height={"100%"} direction="column">
          {title && <LabelStyle required={isRequired}>{title}</LabelStyle>}
          <SelectFieldStyle
            sx={{
              mb: 2,
              height: "36px",
              borderRadius: "8px",
              "& .MuiSvgIcon-root": {
                display: "none"
              }
            }}
            {...field}
            value={field.value || []}
            displayEmpty
            disabled={disabled}
            error={!!error}
            multiple
            onClose={() => setSearchText("")}
            renderValue={(selected) => {
              if (selected?.length === 0) {
                return (
                  <Button
                    sx={{ width: "100%", textTransform: "none" }}
                    startIcon={<PlusIcon />}
                  >
                    Thêm ứng viên
                  </Button>
                );
              }
              return (
                <Button
                  sx={{ width: "100%", textTransform: "none" }}
                  startIcon={<PlusIcon />}
                >
                  Thêm ứng viên
                </Button>
              );
            }}
            MenuProps={{ ...MenuProps, classes: { paper: classes.paper } }}
          >
            {options?.length > 3 && (
              <TextFieldStyle
                placeholder="Tìm kiếm..."
                fullWidth
                autoFocus
                sx={{ ...SearchInputStyle }}
                InputProps={{ ...InputProps }}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => e.stopPropagation()}
              />
            )}
            {renderOptions(filterOptions)}
          </SelectFieldStyle>
          {multiple && renderChipsSelect(options, field.value, remove)}
          <FormHelperText
            sx={{
              color: style.COLOR_TEXT_DANGER,
              fontSize: style.FONT_XS,
              fontWeight: style.FONT_NORMAL
            }}
          >
            {error?.message}
          </FormHelperText>
        </Stack>
      )}
    />
  );
}

export default memo(RHFSelectMultiple);
