import PlusIcon from "@/assets/interview/PlusIcon";
import SvgIconStyle from "@/components/SvgIconStyle";
import {
  SearchInputStyle,
  TextFieldStyle,
} from "@/components/hook-form/style";
import {
  FormControl,
  MenuItem,
  Select,
  Checkbox,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { ListSubheader, InputAdornment } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  makeStyles,
  /*withStyles*/
} from "@mui/styles";
import { useState } from "react";
import { useMemo } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      borderRadius: `0 0 8px 8px`,
    },
  },
};
const variants = [
  {
    id: "gary",
    name: "Đinh Tiến Thành",
    phone: "0987655345",
  },
  {
    id: "cato",
    name: "Đỗ Ánh Tuyết",
    phone: "0987655345",
  },
  {
    id: "kvn",
    name: "Trần Văn Linh",
    phone: "0987655345",
  },
  {
    id: "mooncake",
    name: "Đào Duy Tùng",
    phone: "0987655345",
  },
  {
    id: "quinn",
    name: "Doãn Trung Kiên",
    phone: "0987655345",
  },
];

const containsText = (text, searchText) =>
  text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

export const DropDown = () => {
  const [variantName, setVariantName] = useState([]);
  const [searchText, setSearchText] = useState("");

  const displayedOptions = useMemo(
    () => variants.filter((option) => containsText(option.name, searchText)),
    [searchText]
  );

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    let duplicateRemoved = [];

    value.forEach((item) => {
      if (duplicateRemoved.findIndex((o) => o.id === item.id) >= 0) {
        duplicateRemoved = duplicateRemoved.filter((x) => x.id === item.id);
      } else {
        duplicateRemoved.push(item);
      }
    });

    setVariantName(duplicateRemoved);
  };

  const useStyles = makeStyles(() => ({
    select: {
      height: "36px",
      minWidth: "100%",
      border: "1px solid rgba(33, 150, 243, 0.5)",
      "& .MuiSvgIcon-root": {
        display: "none",
      },
    },
    input: {
     
      fontWeight: `400`,
      fontSize: `14px`,
      lineHeight: `20px`,
      justifyContent: `center`,
      display: `flex`,
      "&:before": {
        borderBottom: `none`,
      },
    },
  
  }));

  const classes = useStyles();

  const getIcon = (name) => (
    <div className="icon-select">
      <SvgIconStyle
        src={`/assets/icons/ds/${name}.svg`}
        sx={{ width: 17, height: 15 }}
      />
    </div>
  );

  const ICONS = {
    search: getIcon("ic_search"),
  };

  return (
    <div>
      <FormControl sx={{ width: "100%" }}>
        <Select
          className={classes.select}
          multiple
          displayEmpty
          value={variantName}
          onChange={handleChange}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return (
                <Button
                  sx={{ width: "100%", textTransform: "none" }}
                  startIcon={<PlusIcon />}
                  onClick={() => console.log("hi")}
                >
                  Thêm ứng viên
                </Button>
              );
            }
            return selected.map((x) => x.name).join(", ");
          }}
          MenuProps={MenuProps}
          //
        >
          <ListSubheader>
            <TextFieldStyle
              placeholder="Tìm kiếm..."
              fullWidth
              autoFocus
              sx={{ ...SearchInputStyle }}
              InputProps={{
                startAdornment: (
                  <InputAdornment className={classes.input} position="start">
                    {ICONS.search}
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
          {displayedOptions.map((variant) => (
            <MenuItem
              key={variant.id}
              value={variant}
              sx={{
                borderTop: `1px solid #EFF3F7`,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {" "}
              <Box sx={{ display: "flex" }}>
                <img
                  style={{ width: 28, height: 28, borderRadius: "10px" }}
                  src="https://i.pinimg.com/236x/c6/90/fe/c690fe74d48aa77c2ab0e5000131304a.jpg"
                />
                <Box sx={{ ml: 1 }}>
                  <Typography sx={{ fontSize: 13 }}>{variant.name}</Typography>
                  <Typography
                    sx={{ fontSize: 13, fontWeight: 400, color: "#5C6A82" }}
                  >
                    {variant.phone}
                  </Typography>
                </Box>
              </Box>
              <FormControl component="fieldset">
                <FormControlLabel
                  labelPlacement="start"
                  control={
                    <Checkbox
                      color="default"
                      checked={
                        variantName.findIndex(
                          (item) => item.id === variant.id
                        ) >= 0
                      }
                    />
                  }
                ></FormControlLabel>
              </FormControl>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
