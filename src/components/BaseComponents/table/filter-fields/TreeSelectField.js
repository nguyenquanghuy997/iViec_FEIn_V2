import { memo } from "react"
import { InputLabel } from "@mui/material";
import RHFOrgTreeSelect from "@/components/hook-form/RHFOrgTreeSelect";

const TreeSelectField = ({
  label,
  ...props
}) => {
  return (
    <div>
      {label && (
        <InputLabel>{label}</InputLabel>
      )}

      <RHFOrgTreeSelect
        {...props}
      />
    </div>
  )
}

export default memo(TreeSelectField);