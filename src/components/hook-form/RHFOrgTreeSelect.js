
import {Controller, useFormContext} from "react-hook-form";
import TreeSelect from "../tree-select";

function RHFOrgTreeSelect({ name, ...props }) {
  const {control} = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error }}) => {
        return (
          <TreeSelect
            {...field}
            error={!!error}
            errorMessage={error?.message}
            {...props}
          />
        )
      }}
    />
  );
}

export default RHFOrgTreeSelect;