import HelperText from "@/components/BaseComponents/HelperText";
import MuiSelect from "@/components/form/MuiSelect";
import { makeStyles } from "@mui/styles";
import { Controller, useFormContext } from "react-hook-form";

export default function RHFSelect({ name, onChange, ...props }) {
  const { control, setValue } = useFormContext();
  const handleDelete = (field, valueDelete) => {
    const value = Array.isArray(field.value) ? field.value : [field.value];
    const newOptions = value.filter((item) => item !== valueDelete);
    field.onChange(newOptions);
  };

  const handleClearValue = (name, value) => {
    setValue(name, value);
  };
  const useStyles = makeStyles({
    readOnlySelect: {
      "&.Mui-disabled": {
        backgroundColor: "#EFF3F6",
        fontSize: 14,
      },
    },
  });
  const classes = useStyles();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const { onChange: onFieldChange, ...otherField } = field;
        return (
          <>
            <MuiSelect
              className={classes.readOnlySelect}
              name={name}
              onChange={(e) => {
                if (onChange) {
                  onChange(e);
                }
                onFieldChange(e);
              }}
              {...otherField}
              error={!!error}
              sx={{ background: "#fff", width: "100%" }}
              onDelete={(item) => handleDelete(field, item)}
              onClearValue={handleClearValue}
              {...props}
            />
            {error?.message && <HelperText errorText={error.message} />}
          </>
        );
      }}
    />
  );
}
