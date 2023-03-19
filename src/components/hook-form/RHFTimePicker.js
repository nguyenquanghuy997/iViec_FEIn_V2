import { styled } from '@mui/material/styles'
import { TimePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Controller, useFormContext } from "react-hook-form";

dayjs.extend(customParseFormat);

export default function RHFTimePicker({ name, 
  // label, style 
}) {
  const { control } = useFormContext();
  const StyledTimePicker = styled(TimePicker)(() => ({
    '& .ui-timepicker-container': {
        zIndex: '3500 !important'
   },
   '& .bootstrap-timepicker-widget.dropdown-menu ': {
    zIndex: '3500 !important'
},

  
}));

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: {  } }) => (
        <StyledTimePicker
          {...field}
          defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
        />
      )}
    />
  );
}
