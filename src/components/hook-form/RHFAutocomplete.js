// @mui
import PropTypes from "prop-types";
import {isEqual} from 'lodash';
// form
import {Controller, useFormContext} from "react-hook-form";
import {AutocompleteFieldStyle, LabelStyle, TextFieldStyle} from "@/components/hook-form/style";
import ChipDS from "@/components/DesignSystem/ChipDS";
import {PaperAutocompleteStyle} from "@/sections/auth/style";
import {STYLE_CONSTANT as style} from "@/theme/palette";
import {Checkbox, MenuItem} from "@mui/material";
import {CheckboxIconChecked, CheckboxIconDefault} from "@/assets/CheckboxIcon";
import {AvatarDS} from "@/components/DesignSystem";
import {BoxFlex} from "@/sections/emailform/style";
import HelperText from "@/components/BaseComponents/HelperText";

RHFAutocomplete.propTypes = {
  name: PropTypes.string, options: PropTypes.array, AutocompleteProps: PropTypes.object,
};

export const CustomPaper = (props) => {
  return <PaperAutocompleteStyle className="paper-autocomplete" elevation={8} {...props} />;
};

export default function RHFAutocomplete(
    {
        name,
        options = [],
        title = '',
        disabledOption = 3,
        multiple = false,
        isRequired = false,
        showAvatar = false,
        showCheckbox = false,
        AutocompleteProps,
        ...other
    }) {
  const {control} = useFormContext();
  const props = {
    onChange: (field) => (event, newValue) => field.onChange(newValue),
    renderTags: (value, getTagProps) => value.map((option, index) => (<ChipDS
        {...getTagProps({index})}
        key={index}
        size="small"
        label={AutocompleteProps?.freeSolo ? option : option?.label}
        variant="filled"
        sx={{
          borderRadius: '4px',
          color: style.COLOR_TEXT_BLACK,
          backgroundColor: '#EFF3F6',
          fontSize: style.FONT_13,
          fontWeight: style.FONT_MEDIUM,
        }}
    />)),
    renderInput: (params) => (<TextFieldStyle
        fullWidth
        {...other}
        {...params}
    />), ...AutocompleteProps,
  };

  const {onChange, renderTags, renderInput, ...rest} = props;

  return (<Controller
      name={name}
      control={control}
      defaultValue={multiple ? [] : ""}
      render={({field, fieldState: {error}}) => (<>
        {title && (<LabelStyle required={isRequired}>{title}</LabelStyle>)}
        <AutocompleteFieldStyle
            value={field.value}
            autoFocus
            fullWidth
            multiple={multiple}
            onChange={onChange(field)}
            options={options}
            renderTags={renderTags}
            renderInput={renderInput}
            noOptionsText={'Không tìm thấy dữ liệu'}
            PaperComponent={CustomPaper}
            disableCloseOnSelect
            renderOption={(props, option, {selected}) => (
                <MenuItem {...props} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}} disabled={disabledOption && field.value?.length >= disabledOption}>
                  <div>
                    <BoxFlex justifyContent="flex-start">
                      {showAvatar && (
                          <AvatarDS
                              sx={{height: "20px", width: "20px", borderRadius: "100px", fontSize: "10px"}}
                              name={option.label}
                          />
                      )}
                      {option.label}
                    </BoxFlex>
                  </div>
                  {/*{props['aria-selected'] && <Iconify color="#1e5ef3" icon="material-symbols:check" sx={{width: 24, height: 24}}/>}*/}
                  {showCheckbox && (
                      <Checkbox
                          sx={{ p: 0.25 }}
                          icon={<CheckboxIconDefault/>}
                          checkedIcon={<CheckboxIconChecked/>}
                          style={{marginRight: 8}}
                          checked={selected}
                      />
                  )}
                </MenuItem>
            )}
            isOptionEqualToValue={(option, value) => value === "" || typeof value === 'string' ? isEqual(option, value) : isEqual(option.value, value.value)}
            {...rest}
        />
        <HelperText errorText={error?.message} />
      </>)}
  />);
}
