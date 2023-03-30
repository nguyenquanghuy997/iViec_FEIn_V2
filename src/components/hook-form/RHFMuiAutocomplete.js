import {Controller, useFormContext} from "react-hook-form";
import {LabelStyle} from "@/components/hook-form/style";
import HelperText from "@/components/BaseComponents/HelperText";
import MuiAutocomplete from "@/components/form/MuiAutocomplete";

export default function RHFMuiAutocomplete({name, ...props}) {
  const {control} = useFormContext();

  const {title, isRequired, ...other} = props;

  return (<Controller
      name={name}
      control={control}
      render={({field, fieldState: {error}}) => (
          <>
            {title && (<LabelStyle required={isRequired}>{title}</LabelStyle>)}
            <MuiAutocomplete
                {...field}
                onChange={(event, newValue) => {
                  field.onChange(newValue);
                }}
                fullWidth
                error={!!error}
                {...other}
            />
            <HelperText errorText={error?.message}/>
          </>
      )}
  />);
}
