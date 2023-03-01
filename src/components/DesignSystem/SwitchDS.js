import { alpha, styled } from "@mui/material/styles";
import React from "react";

const Switch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-track": {
    backgroundColor: '#E7E9ED',
    borderRadius: '10px'
  },
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#455570",
    "&:hover": {
      backgroundColor: alpha("#455570", theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#455570",
  },
}));

export default function SwitchDS(props) {
  const { checked } = props;
    return (
        <Switch 
        checked={checked}
        onChange={e => e.target.checked}
        />
    );
}