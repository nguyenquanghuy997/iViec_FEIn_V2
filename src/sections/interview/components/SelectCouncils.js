import { DeleteIcon } from "@/assets/ActionIcon";
import PlusIcon from "@/assets/interview/PlusIcon";
import Iconify from "@/components/Iconify";
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
  Box,
  FormHelperText,
  InputAdornment,
  MenuItem,
  Stack,
  Typography,
  Button,
  Card,
} from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

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
          <img
            style={{
              width: 28,
              height: 28,
              borderRadius: "10px",
            }}
            src="https://i.chungta.vn/2017/12/22/LogoFPT-2017-copy-3042-1513928399.jpg"
          />
          <Box sx={{ ml: 1 }}>
            <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
              {variant.name}
            </Typography>
            <Typography sx={{ fontSize: 13 }}>{variant.mail}</Typography>
          </Box>
        </Box>
      </MenuItem>
    );
  });
};

function SelectCouncils({ name, isEditmode, defaultItem, ...props }) {
  const { control } = useFormContext();
  const classes = useStyles();
  const { defaultValue, isRequired, title, options, disabled, multiple } =
    props;
  const { remove } = useFieldArray({ control, name });
  const [searchText, setSearchText] = useState("");
  const [filterOptions, setFilterOptions] = useState([]);
  const idArr = defaultItem?.map((item) => item?.id);

  const renderChipsSelect = (options, value, remove) => {
    return (
      <Stack flexDirection="row" flexWrap="wrap" justifyContent="flex-start">
        {options
          ?.filter((option) => value.includes(option?.value))
          ?.map((item, index) => (
            <Card
              sx={{
                p: 2,
                background: "#F2F4F5",
                mb: 2,
                borderRadius: "6px",
              }}
            >
              <div
                style={{
                  marginBottom: 0,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    style={{
                      width: 40,
                      height: 40,
                      marginRight: "16px",
                      borderRadius: "11px",
                    }}
                    src="https://i.chungta.vn/2017/12/22/LogoFPT-2017-copy-3042-1513928399.jpg"
                  />
                  <div>
                    <Typography
                      component="div"
                      sx={{ fontSize: "13px", fontWeight: "600" }}
                    >
                      {item?.name}
                    </Typography>
                    <Typography
                      color="#455570"
                      sx={{ fontSize: "12px", fontWeight: "400" }}
                    >
                      {item?.mail}
                    </Typography>
                  </div>
                </div>
                <Box
                  sx={{ mt: "2px", cursor: "pointer" }}
                  onClick={() => remove(index)}
                >
                  <DeleteIcon />
                </Box>
              </div>
            </Card>
          ))}
        {isEditmode &&
          options
            ?.filter((option) => idArr.includes(option?.value))
            ?.map((item, index) => (
              <Card
                sx={{
                  p: 2,
                  background: "#F2F4F5",
                  mb: 2,
                  borderRadius: "6px",
                }}
              >
                <div
                  style={{
                    marginBottom: 0,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      style={{
                        width: 40,
                        height: 40,
                        marginRight: "16px",
                        borderRadius: "11px",
                      }}
                      src="https://i.chungta.vn/2017/12/22/LogoFPT-2017-copy-3042-1513928399.jpg"
                    />
                    <div>
                      <Typography
                        component="div"
                        sx={{ fontSize: "13px", fontWeight: "600" }}
                      >
                        {item?.name}
                      </Typography>
                      <Typography
                        color="#455570"
                        sx={{ fontSize: "12px", fontWeight: "400" }}
                      >
                        {item?.mail}
                      </Typography>
                    </div>
                  </div>
                  <Box
                    sx={{ mt: "2px", cursor: "pointer" }}
                    onClick={() => remove(index)}
                  >
                    <DeleteIcon />
                  </Box>
                </div>
              </Card>
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
        <Stack direction="column">
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
            value={field.value}
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
                    Thêm cán bộ
                  </Button>
                );
              }
              return (
                <Button
                  sx={{ width: "100%", textTransform: "none" }}
                  startIcon={<PlusIcon />}
                >
                  Thêm cán bộ
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

export default memo(SelectCouncils);
