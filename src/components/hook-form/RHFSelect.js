import {Controller, useFormContext} from "react-hook-form";
import MuiSelect from "@/components/form/MuiSelect";
import HelperText from "@/components/BaseComponents/HelperText";

export default function RHFSelect({ name, ...props }) {
  const { control } = useFormContext();
  return (
      <Controller
          name={name}
          control={control}
          render={({ field, fieldState: { error } }) => {
              return (
                  <>
                      <MuiSelect
                          {...field}
                          error={!!error}
                          sx={{ width: '100%' }}
                          {...props}
                      />
                      {error?.message && <HelperText errorText={error.message} />}
                  </>
              )
          }}
      />
  )
}
