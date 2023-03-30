import {Controller, useFormContext} from "react-hook-form";
import MuiSelect from "@/components/form/MuiSelect";
import HelperText from "@/components/BaseComponents/HelperText";

export default function RHFSelect({name, onChange, ...props}) {
  const {control, setValue} = useFormContext();
  const handleDelete = (field, valueDelete) => {
    const newOptions = field.value.filter(item => item !== valueDelete);
    field.onChange(newOptions);
  };

  const handleClearValue = (name, value) => {
      setValue(name, value);
  }

  return (
      <Controller
          name={name}
          control={control}
          render={({field, fieldState: {error}}) => {
            const {onChange: onFieldChange, ...otherField} = field;
            return (
                <>
                  <MuiSelect
                      name={name}
                      onChange={e => {
                        if (onChange) {
                          onChange(e);
                        }
                        onFieldChange(e);
                      }}
                      {...otherField}
                      error={!!error}
                      sx={{width: '100%'}}
                      onDelete={(item) => handleDelete(field, item)}
                      onClearValue={handleClearValue}
                      {...props}
                  />
                  {error?.message && <HelperText errorText={error.message}/>}
                </>
            )
          }}
      />
  )
}
