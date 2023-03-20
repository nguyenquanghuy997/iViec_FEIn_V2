import TextareaAutosize from '@mui/base/TextareaAutosize';
import { LabelStyle } from "@/components/hook-form/style";
import PropTypes from "prop-types";
// form
import { Controller, useFormContext } from "react-hook-form";

RHFTextArea.propTypes = {
  name: PropTypes.string,
  variant: PropTypes.string,
  title: PropTypes.string,
  isRequired: PropTypes.bool,
};

RHFTextArea.defaultProps = {
  variant: "standard",
  title: "",
  isRequired: false,
};

export default function RHFTextArea({
  name,
  title,
  isRequired,
  variant,
  beforeChange,
  maxLength,
  ...other
}) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        if (beforeChange) {
          const { value } = field;
          field.value = beforeChange(value);
        }
        return (
          <>
            {title && <LabelStyle required={isRequired}>{title}</LabelStyle>}

            <TextareaAutosize
              aria-label="minimum height"
              rows={3}
              style={{ width: '100%',border:'1px solid #d9d9d9', borderRadius:'6px', padding:'8px 12px', '&:hover':{
                border:'none'
              }}}
              {...field}
              value={field.value || ""}
              error={!!error}
              helperText={error?.message}
              variant={variant}
              {...other}
              InputProps={{ ...other.InputProps, disableUnderline: true }}
              inputProps={{
                maxLength: maxLength,
              }}
            />
          </>
        );
      }}
    />
  );
}
