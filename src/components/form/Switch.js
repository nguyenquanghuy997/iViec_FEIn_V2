import { useRef, forwardRef, useImperativeHandle } from 'react';
import { Switch as MuiSwitch, FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';

const SwitchItem = styled(MuiSwitch)(() => ({
  "& .MuiSwitch-track": {
      backgroundColor: "#E7E9ED",
      borderRadius: "10px",
  },
  "& .MuiSwitch-thumb": {
      boxShadow: "0px 3px 5px rgb(9 30 66 / 20%), 0px 0px 1px rgb(9 30 66 / 30%)",
      background: "#F3F4F6",
  },

  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#A5D6A7",
  },
  "& .MuiSwitch-switchBase.Mui-checked .MuiSwitch-thumb": {
      backgroundColor: "#388E3C",

  },
  "& .MuiSwitch-switchBase.Mui-checked:hover": {
      backgroundColor: "rgba(231, 233, 237, 0.4);",
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
          '.MuiFormControlLabel-label': {
            color: checked ? "#388E3C" : "#455570",
          },
          ...sx,
        }}
        label={label}
      />
    )
  }

  return (
    <SwitchItem ref={_switch} checked={checked} sx={sx} {...props} />
  )
})

export default Switch;