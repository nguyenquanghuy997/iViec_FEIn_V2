import { memo } from 'react';
import { InputLabel } from "@mui/material";
import { RHFAddress } from "@/components/hook-form";
import { FormStyle } from "@/components/styles";

const AddressField = ({
  name,
  label,
  ...props
}) => {
  return (
    <FormStyle className="address-fields">
      {label && (
        <InputLabel>{label}</InputLabel>
      )}

      <RHFAddress
        provinceField={name[0]}
        districtField={name[1]}
        grid={{ md: 12 }}
        {...props}
      />
    </FormStyle>
  )
}

export default memo(AddressField);