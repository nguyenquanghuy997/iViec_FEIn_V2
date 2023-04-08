import { memo } from 'react';
import { useTheme } from "@mui/material";
import { RiSearch2Line } from 'react-icons/ri';
import { RHFTextField } from "@/components/hook-form";

const TextField = ({ ...props }) => {
  const { palette } = useTheme();

  return (
    <RHFTextField
      startIcon={<RiSearch2Line size={18} color={palette.text.secondary} />}
      placeholder="Tìm kiếm..."
      {...props}
    />
  )
}

export default memo(TextField);