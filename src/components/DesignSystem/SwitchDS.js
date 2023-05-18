// @mui
import { FormControlLabel, Switch } from "@mui/material";
import {styled, useTheme} from "@mui/material/styles";
// form
import { Controller, useFormContext } from "react-hook-form";

const Switchh = styled(Switch)(({theme}) => ({
  "& .MuiSwitch-track": {
    backgroundColor: theme.palette.common.neutral100,
    borderRadius: "10px",
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0px 3px 5px rgb(9 30 66 / 20%), 0px 0px 1px rgb(9 30 66 / 30%)",
    background: theme.palette.common.neutral50,
  },

  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: theme.palette.common.blue500,
  },
  "& .MuiSwitch-switchBase.Mui-checked .MuiSwitch-thumb": {
    backgroundColor: theme.palette.common.blue700,
  },
}));
export default function SwitchDS({ name, ...other }) {
  const  theme = useTheme();
  const { control } = useFormContext();
  return (
    <FormControlLabel
      sx={{
        color: theme.palette.common.borderObject,
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
