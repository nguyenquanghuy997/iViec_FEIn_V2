// @mui
import { FormControlLabel, Switch } from "@mui/material";
import { styled } from "@mui/material/styles";
// form
import { Controller, useFormContext } from "react-hook-form";

const Switchh = styled(Switch)(() => ({
  "& .MuiSwitch-track": {
    backgroundColor: "#E7E9ED",
    borderRadius: "10px",
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0px 3px 5px rgb(9 30 66 / 20%), 0px 0px 1px rgb(9 30 66 / 30%)",
    background: "#F3F4F6",
  },

  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#2196F3",
  },
  "& .MuiSwitch-switchBase.Mui-checked .MuiSwitch-thumb": {
    backgroundColor: "#1976D2",
  },
}));

export default function SwitchDS({ name, ...other }) {
  const { control } = useFormContext();
  return (
    <FormControlLabel
      sx={{
        color: "#5C6A82",
        fontWeight: 600,
        fontSize: 14,
        lineHeight: 20,
      }}
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => <Switchh {...field} checked={field.value} />}
        />
      }
      {...other}
    />
  );
}
