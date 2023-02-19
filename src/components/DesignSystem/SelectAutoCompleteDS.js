import Iconify from "../Iconify";
import {
  FormControl,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import React, { useState, useMemo } from "react";
import { boolean } from "yup";

const containsText = (text, searchText) =>
  text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

const usePlaceholderStyles = makeStyles(() => ({
  placeholder: {
    color: "#8A94A5",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "20px",
  },
  paper: {
    borderRadius: "6px",
    marginTop: "4px",
    "& li": {
      fontFamily: "Inter",
      fontWeight: "500",
      fontSize: "15px",
      lineHeight: "20px",
      padding: "10px 16px",
      background: "#FDFDFD",
      boxShadow: "inset 0px -1px 0px #E7E9ED",
    },
    "&::-webkit-scrollbar": {
      width: "5px",
      marginRight: "3px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#B9BFC9",
      borderRadius: "30px",
      marginRight: "3px",
    },
  },
}));

export default function SelectAutoCompleteDS(props) {
  const { width, sx, selectedOption, setSelectedOption, data, allowClear, onChange } =
    props;
    console.log('dataaaa', data)
  const classes = usePlaceholderStyles();
  const Placeholder = ({ children }) => {
    return <div className={classes.placeholder}>{children}</div>;
  };
  const handleClearClick = () => {
    setSelectedOption("");
  };
  const [searchText, setSearchText] = useState("");
  const displayedOptions = useMemo(
    () => data.filter((option) => containsText(option.name, searchText)),
    [searchText]
  );

  return (
    <FormControl
      sx={{
        width: { width },
        "& .css-1wdrf03-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper":
          {
            borderRadius: "6px",
          },
      }}
    >
      <Select
        MenuProps={{ autoFocus: false, classes: { paper: classes.paper } }}
        labelId="search-select-label"
        id="search-select"
        value={selectedOption}
        onChange={onChange}
        onClose={() => setSearchText("")}
        displayEmpty
        sx={{
          "& .MuiSelect-iconOutlined": {
            display: selectedOption && allowClear == true ? "none" : "",
            color: "#455570",
            width: "20px",
            height: "20px",
          },
          "&.Mui-focused .MuiIconButton-root": { color: "primary.main" },
          "& .Mui-selected": {
            backgroundColor: "#000 !important",
          },
          ...sx,
        }}
        renderValue={
          selectedOption !== ""
            ? () => selectedOption
            : () => <Placeholder>Chọn value</Placeholder>
        }
        endAdornment={
          allowClear == true ? (
            <IconButton
              sx={{ visibility: selectedOption ? "visible" : "hidden" }}
              onClick={handleClearClick}
            >
              <Iconify
                icon={"ic:round-clear"}
                width={16}
                height={16}
                color="#5c6a82"
              />
            </IconButton>
          ) : (
            ""
          )
        }
      >
        <TextField
          size="small"
          autoFocus
          placeholder="Tìm kiếm..."
          fullWidth
          sx={{
            boxShadow: "inset 0px -1px 0px #E7E9ED",
            "& .MuiInputBase-input": {
              color: "#5C6A82",
              padding: "10px 0",
              fontFamily: "Inter",
              fontWeight: "500",
              fontSize: "15px",
              lineHeight: "20px",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
              padding: 0,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                  icon={"ri:search-2-line"}
                  width={16}
                  height={16}
                  color="#5c6a82"
                />
              </InputAdornment>
            ),
          }}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key !== "Escape") {
              e.stopPropagation();
            }
          }}
        />
        {displayedOptions.map((option, i) => (
          <MenuItem
            key={i}
            value={option.name}
            sx={{
              "&.Mui-selected": {
                // backgroundColor: "#000 !important"
              },
            }}
          >
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
SelectAutoCompleteDS.prototype = {
  width: PropTypes.any,
  sx: PropTypes.object,
  selectedOption: PropTypes.any,
  setSelectedOption: PropTypes.any,
  onChange: PropTypes.any,
  data: PropTypes.object,
  allowClear: boolean,
};
