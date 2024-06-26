import DragCandidate from "./DragCandidate";
// import PlusIcon from "@/assets/interview/PlusIcon";
import Iconify from "@/components/Iconify";
import Image from "@/components/Image";
import {
  LabelStyle,
  MenuItemStyle,
  SearchInputStyle,
  SelectFieldStyle,
  TextFieldStyle,
  useStyles,
} from "@/components/hook-form/style";
import { STYLE_CONSTANT as style } from "@/theme/palette";
import { containsText } from "@/utils/function";
import {
  Avatar,
  Box,
  Button,
  FormHelperText,
  InputAdornment,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {useTheme} from "@mui/material/styles";

const MenuProps = {
  PaperProps: {
    style: { maxHeight: 330 },
  },
  disableAutoFocusItem: true,
  MenuListProps: {
    disableListWrap: true,
  },
};

const InputProps = {
  startAdornment: (
    <InputAdornment position="start">
      <Iconify icon={"ri:search-2-line"} color="#5c6a82" />
    </InputAdornment>
  ),
};

const renderOptions = (options) => {
  return options?.map((variant, i) => {
    return (
      <MenuItem sx={{ ...MenuItemStyle }} key={i} value={variant.value}>
        <Box sx={{ display: "flex" }}>
          <Avatar
            alt={""}
            style={{
              width: 36,
              height: 36,
              borderRadius: "10px",
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
                color: "#5C6A82",
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

function RHFSelectMultiple({ name, ...props }) {
  const [filterOptions, setFilterOptions] = useState([]);
  const { watch } = useFormContext();
  const [searchText, setSearchText] = useState("");
  const { control } = useFormContext();
  const theme = useTheme();
  const classes = useStyles();
  const {
    defaultValue,
    isRequired,
    title,
    options,
    disabled,
    multiple,
    listApplicant,
  } = props;

  const renderChipsSelect = (options, value) => {
    return (
      <Stack height={"100%"} sx={{ "> div": { height: "100%" } }}>
        <DragCandidate
          data={options?.filter((option) => value.includes(option?.value))}
        />
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
                display: "none",
              },
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
                    sx={{
                      width: "100%",
                      textTransform: "none",
                      color: "#1976D2",
                      "&:hover": {
                        backgroundColor: "white",
                      },
                    }}
                  >
                    + Thêm ứng viên
                  </Button>
                );
              }
              return (
                <Button
                  sx={{
                    width: "100%",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "white",
                    },
                  }}
                >
                  + Thêm ứng viên
                </Button>
              );
            }}
            MenuProps={{ ...MenuProps, classes: { paper: classes.paper } }}
          >
            <TextFieldStyle
              placeholder="Tìm kiếm..."
              fullWidth
              autoFocus
              sx={{ ...SearchInputStyle }}
              InputProps={{ ...InputProps }}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => e.stopPropagation()}
            />
            {/* {renderOptions(filterOptions)} */}
            {options?.length > 0 ? (
              renderOptions(filterOptions)
            ) : (
              <>
                <Image
                  alt="empty content"
                  src="/assets/illustrations/nodata.svg"
                  sx={{ height: 120, width: 120, margin: "0 auto" }}
                />

                <Typography
                  textAlign={"center"}
                  mb={3}
                  fontSize={14}
                  fontWeight={500}
                  color={theme.palette.common.neutral500}
                >
                  {watch("recruitmentPipelineStateId") ? "Không có dữ liệu" : "Vui lòng chọn bước phỏng vấn trước" }
                </Typography>
              </>
            )}
          </SelectFieldStyle>
          {listApplicant}
          {multiple && renderChipsSelect(options, field.value)}
          <FormHelperText
            sx={{
              color: style.COLOR_TEXT_DANGER,
              fontSize: style.FONT_XS,
              fontWeight: style.FONT_NORMAL,
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
