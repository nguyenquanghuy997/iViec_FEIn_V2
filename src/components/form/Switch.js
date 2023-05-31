import { STYLE_CONSTANT } from "@/theme/palette";
import { FormControlLabel, Switch as MuiSwitch } from "@mui/material";
import { styled } from "@mui/material/styles";
import { forwardRef, useImperativeHandle, useRef } from "react";

const SwitchItem = styled(MuiSwitch)(({ theme }) => ({
  "& .MuiSwitch-track": {
    backgroundColor: theme.palette.common.neutral200,
  },
  "& .MuiSwitch-thumb": {
    boxShadow:
      "0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)",
    background: theme.palette.common.white,
  },

  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: theme.palette.common.green200,
  },
  "& .MuiSwitch-switchBase.Mui-checked .MuiSwitch-thumb": {
    backgroundColor: theme.palette.common.green700,
  },
  "& .MuiSwitch-switchBase.Mui-checked:hover": {
    backgroundColor: "rgba(231, 233, 237, 0.4)",
  },
}));

const Switch = forwardRef(({ label, checked, sx, ...props }, ref) => {
  const _switch = useRef();

  useImperativeHandle(ref, () => ({
    ..._switch.current,
  }));

  if (label) {
    return (
      <FormControlLabel
        control={<SwitchItem ref={_switch} checked={checked} {...props} />}
        sx={{
          ".MuiFormControlLabel-label": {
            color: checked
              ? STYLE_CONSTANT.COLOR_SUCCESS
              : STYLE_CONSTANT.COLOR_TEXT_PRIMARY,
          },
          ...sx,
        }}
        label={label}
      />
    );
  }

  return <SwitchItem ref={_switch} checked={checked} sx={sx} {...props} />;
});

export default Switch;
