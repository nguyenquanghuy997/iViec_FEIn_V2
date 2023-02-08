import SvgIconStyle from "@/components/SvgIconStyle";
import {
  FormControl,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { ListSubheader, TextField, InputAdornment } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
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
    id: 3,
    name: "Hà Nội",
  },
  {
    id: 4,
    name: "Hải Phòng",
  },
  {
    id: 1,
    name: "Cao Bằng",
  },
  {
    id: 2,
    name: "Đà Nẵng",
  },
  {
    id: 12,
    name: "Hồ Chí Minh",
  },
  {
    id: 10,
    name: "Huế",
  },
  {
    id: 11,
    name: "Nước ngoài",
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
      padding: `4px 2px`,
      color: `#5C6A82`,
      // borderRadius: `8px 8px 0 0`,
      background: `#EFF3F7`,
      boxShadow: `inset 0px -1px 0px #E7E9ED`,
    },
    input: {
      padding: `0px 0px 0px 9px`,
      fontWeight: `400`,
      fontSize: `14px`,
      lineHeight: `20px`,
      justifyContent: `center`,
      display: `flex`,
      '&:before': {
        borderBottom: `none`,
      },
    },
    search: {
      "&,&:before, &:hover": {
        borderBottom: `none`,
      },
    },
  }));

  const classes = useStyles();

  const getIcon = (name) => (
    <SvgIconStyle
      src={`/assets/icons/ds/${name}.svg`}
      sx={{ width: 17, height: 15 }}
    />
  );

  const ICONS = {
    search: getIcon("ic_search"),
  };

  return (
    <div>
      <FormControl sx={{ width: 400 }}>
        <Select
          className={classes.select}
          multiple
          displayEmpty
          value={variantName}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <>Chọn Tỉnh/Thành phố</>;
            }
            return selected.map((x) => x.name).join(", ");
          }}
          MenuProps={MenuProps}
          //
        >
          <ListSubheader>
            <TextField
              variant="standard"
              size="small"
              // Autofocus on textfield
              autoFocus
              placeholder="Tìm kiếm..."
              fullWidth
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
              className={classes.search}
              sx={{}}
            />
          </ListSubheader>
          {displayedOptions.map((variant) => (
            <MenuItem
              key={variant.id}
              value={variant}
              sx={{
                borderTop: `1px solid #EFF3F7`,
              }}
            >
              <Checkbox
                color="default"
                checked={
                  variantName.findIndex((item) => item.id === variant.id) >= 0
                }
              />
              <ListItemText primary={variant.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
