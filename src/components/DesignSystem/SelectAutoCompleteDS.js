import Iconify from "../Iconify";
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  ListSubheader,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState, useMemo } from "react";

const containsText = (text, searchText) =>
  text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
  const allOptions = [
    { id: 5141, name: "brass pipes", listPrice: 2.32 },
    { id: 214, name: "bronze pipes", listPrice: 1.89 },
    { id: 3155, name: "toilet seat ", listPrice: 5.61 }
  ];
// const allOptions = ["Option One", "Option Two", "Option Three", "Option Four"];
const usePlaceholderStyles = makeStyles(() => ({
  placeholder: {
    color: "#8A94A5",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "20px",
  },
}));

const Placeholder = ({ children }) => {
  const classes = usePlaceholderStyles();
  return <div className={classes.placeholder}>{children}</div>;
};

export default function App() {
  const [selectedOption, setSelectedOption] = useState("");
  const handleClearClick = () => {
    setSelectedOption("");
  };
  const [searchText, setSearchText] = useState("");
  const displayedOptions = useMemo(
    () => allOptions.filter((option) => containsText(option.name, searchText)),
    [searchText]
  );
  console.log("selectedOption", selectedOption);
  return (
    <Box sx={{ m: 10 }}>
      <FormControl fullWidth>
        <Select
          // Disables auto focus on MenuItems and allows TextField to be in focus
          MenuProps={{ autoFocus: false }}
          labelId="search-select-label"
          id="search-select"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          onClose={() => setSearchText("")}
          // This prevents rendering empty string in Select's value
          // if search text would exclude currently selected option.
          displayEmpty
          sx={{
            "& .MuiSelect-iconOutlined": {
              display: selectedOption ? "none" : "",
            },
            "&.Mui-focused .MuiIconButton-root": { color: "primary.main" },
            "& .Mui-selected": {
              backgroundColor: "#000 !important"
            },
          }}
          renderValue={
            selectedOption !== ""
              ? () => selectedOption
              : () => <Placeholder>Chọn value</Placeholder>
          }
          endAdornment={
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
          }
        >
          {/* TextField is put into ListSubheader so that it doesn't
              act as a selectable item in the menu
              i.e. we can click the TextField without triggering any selection.*/}
          <ListSubheader>
            <TextField
              size="small"
              // Autofocus on textfield
              autoFocus
              placeholder="Tìm kiếm..."
              fullWidth
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
                  // Prevents autoselecting item while typing (default Select behaviour)
                  e.stopPropagation();
                }
              }}
            />
          </ListSubheader>
          {displayedOptions.map((option, i) => (
            <MenuItem key={i} value={option.name} sx={{
              "&.Mui-selected": {
                // backgroundColor: "#000 !important"
              },
            }}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
