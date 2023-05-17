import Iconify from "../Iconify";
import {FormControl, IconButton, InputAdornment, ListSubheader, MenuItem, Select, TextField,} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {makeStyles} from "@mui/styles";
import React, {useMemo, useState} from "react";

const containsText = (text, searchText) =>
  text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

const usePlaceholderStyles = makeStyles(({theme}) => ({
  placeholder: {
    color: theme.palette.common.neutral500,
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "20px",
  },
  paper: {
    borderRadius: "4px !important",
    marginTop: "4px",
    "& .MuiList-root": {
      padding: 0,
    },
    "& li": {
      fontFamily: "Inter",
      fontWeight: "500",
      fontSize: "15px",
      lineHeight: "20px",
      padding: "10px 16px",
      background: theme.palette.common.white,
      boxShadow: "inset 0px -1px 0px " + theme.palette.common.neutral100,
    },
    "&::-webkit-scrollbar": {
      width: "5px",
      marginRight: "3px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: theme.palette.common.neutral300,
      borderRadius: "30px",
      marginRight: "3px",
    },
  },
}));

export default function SelectAutoCompleteDS(props) {
  const theme = useTheme();
  const {
    width,
    sx,
    selectedOption,
    setSelectedOption,
    data,
    allowClear,
    onChange,
    placeholder
  } = props;
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
    [searchText, data]
  );
  return (
    <FormControl sx={{width: { width },}}>
      <Select
        MenuProps={{ autoFocus: false, classes: { paper: classes.paper } }}
        labelId="search-select-label"
        id="search-select"
        value={selectedOption?.name ? selectedOption.name : ""}
        displayEmpty
        onChange={onChange}
        renderValue={
          selectedOption !== "" && selectedOption !== undefined
            ? () => selectedOption?.name
            : () => <Placeholder>{placeholder}</Placeholder>
        }
        sx={{
          "&.MuiOutlinedInput-root":{
            fontSize:'14px',
            minHeight:'44px',
            color: theme.palette.common.neutral800
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #D0D4DB !important",
          },
          "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":{
            borderColor: theme.palette.common.neutral200
          },
          "& .MuiSelect-iconOutlined": {
            display: selectedOption && allowClear == true ? "none" : "",
            color: theme.palette.common.neutral700,
            width: "20px",
            height: "20px",
          },
          "&.Mui-focused .MuiIconButton-root": { color: "primary.main" },
          "& .Mui-selected": {
            backgroundColor: theme.palette.common.black +  "!important",
          },
          ...sx,
        }}
        onClose={() => setSearchText("")}
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
                color={theme.palette.common.borderObject}
              />
            </IconButton>
          ) : (
            ""
          )
        }
      >
         <ListSubheader style={{padding: 0}}>
        <TextField
          size="small"
          autoFocus
          placeholder="Tìm kiếm..."
          fullWidth
          sx={{
            boxShadow: "inset 0px -1px 0px " + theme.palette.common.neutral100,
            "& .MuiInputBase-input": {
              color: theme.palette.common.borderObject,
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
                  color={theme.palette.common.neutral600}
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
        </ListSubheader>
        {displayedOptions.map((option, i) => (
          <MenuItem
            key={i}
            value={option}
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
