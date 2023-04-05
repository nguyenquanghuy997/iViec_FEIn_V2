import DragCandidate from "./DragCandidate";
import PlusIcon from "@/assets/interview/PlusIcon";
import Iconify from "@/components/Iconify";
// import { RHFCheckbox } from "@/components/hook-form";
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
} from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

// import { RiEqualizerFill } from "react-icons/ri";

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
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 400,
                color: "#5C6A82",
              }}
            >
              {variant.phone}
            </Typography>
          </Box>
        </Box>
      </MenuItem>
    );
  });
};

function RHFSelectMultiple({ name, defaultItem,isEditmode,...props }) {
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
    const idArr = defaultItem && defaultItem.map( item => item?.id)

    return (
      <Stack flexWrap="wrap" justifyContent="flex-start">
        {/* <Box sx={{ display: "flex", justifyContent: "center", alignItems:'center',fontSize: 12 }}>
          <RHFCheckbox
            name="adjust"
            label="Điều chỉnh hàng loạt"
            style={{ fontSize: "12px" }}
          />
          <p>
            <RiEqualizerFill color={"#1976D2"} size={'15'} />
            Điều chỉnh
          </p>
  
        </Box> */}

        <DragCandidate
          data={options?.filter((option) =>
            (isEditmode ? idArr : value).includes(option?.value)
          )}

          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
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
