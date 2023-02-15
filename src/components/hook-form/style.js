import {STYLE_CONSTANT} from "@/sections/auth/register/constants";

const SelectStyle = {
  "&.MuiInputBase-root": {
    height: "44px",
    fontSize: STYLE_CONSTANT.FONT_SM,
    borderRadius: 0.75,
    width: STYLE_CONSTANT.WIDTH_FULL,
  },
  "& .MuiSelect-select": {
    borderRadius: 0.75,
  },
  ".MuiFormHelperText-root": {
    marginTop: 1,
    marginLeft: 0,
  },
}

const SearchInputStyle = {
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
}

const MenuItemStyle = {
  color: "#172B4D",
  padding: "10px 16px",
  fontSize: "14px",
  fontWeight: 400
}

const InputLabelStyle = {
  fontSize: STYLE_CONSTANT.FONT_SM,
  color: STYLE_CONSTANT.COLOR_TEXT_SECONDARY,
  fontWeight: STYLE_CONSTANT.FONT_MEDIUM,
  marginBottom: 1,
};
const InputLabelErrorStyle = {
  color: STYLE_CONSTANT.COLOR_TEXT_DANGER,
  marginLeft: 0,
};

export {
  SelectStyle,
  SearchInputStyle,
  MenuItemStyle,
  InputLabelStyle,
  InputLabelErrorStyle,
}