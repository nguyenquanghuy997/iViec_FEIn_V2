import {Stack} from "@mui/material";
import {Controller, useFormContext} from "react-hook-form";
import {LabelStyle,} from '@/components/hook-form/style';
import MuiTreeSelect from "@/components/form/MuiTreeSelect";
import HelperText from "@/components/BaseComponents/HelperText";

function RHFTreeSelect({name, ...props}) {
  const {control} = useFormContext();
  const {options, isRequired, title, ...other} = props;
  const handleDelete = (field, valueDelete) => {
    const newOptions = field.value.filter(item => item !== valueDelete);
    field.onChange(newOptions);
  };

  return (
      <Controller
          name={name}
          control={control}
          render={({field, fieldState: {error}}) => (
              <Stack direction="column">
                {title && <LabelStyle required={isRequired}>{title}</LabelStyle>}
                <MuiTreeSelect
                    {...field}
                    options={options}
                    onDelete={(item) => handleDelete(field, item)}
                    {...other}
                />
                <HelperText errorText={error?.message}/>
              </Stack>
          )}
      />
  );
}

export default RHFTreeSelect;