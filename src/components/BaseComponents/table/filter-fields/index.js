import { TBL_FILTER_TYPE } from "@/config";
import SelectCheckboxField from "./SelectCheckboxField";
import SelectField from "./SelectField";
import TextField from "./TextField";

import { FilterItemStyle } from "../styles";
import RangeDatePickerField from "./RangeDatePickerField";
import RadioField from "./RadioField";
import RangeNumberField from "./RangeNumberField";
import AddressField from "./AddressField";
import RangeMoneyField from "./RangeMoneyField";

export default function FilterFields({
  columns = [],
  ...formProps
}) {
  return (
    <>
      {columns.filter(col => !!col.colFilters).map((col, index) => (
        <FilterItemStyle key={index}>
          <FilterFieldItem
            column={col}
            {...formProps}
          />
        </FilterItemStyle>
      ))}
    </>
  )
}

const FilterFieldItem = ({
  column = {},
  ...formProps
}) => {
  const { setValue, watch } = formProps;

  const {
    title,
    dataIndex,
    colFilters: filters = {},
  } = column;

  const {
    type,
    remoteUrl,
    remoteMethod = 'GET',
    label = title,
    name = dataIndex,
    placeholder = 'Tìm kiếm...',
    options = [],
    hasSearch = false,
  } = filters;

  const fieldProps = {
    label,
    name,
    placeholder,
  };

  if (type === TBL_FILTER_TYPE.SELECT) {
    return (
      <SelectField
        {...fieldProps}
        search={hasSearch}
        options={options}
        remoteUrl={remoteUrl}
        remoteMethod={remoteMethod}
      />
    )
  }

  if (type === TBL_FILTER_TYPE.SELECT_CHECKBOX) {
    return (
      <SelectCheckboxField
        {...fieldProps}
        search={hasSearch}
        options={options}
        remoteUrl={remoteUrl}
        remoteMethod={remoteMethod}
        multiple={true}
      />
    )
  }

  if (type === TBL_FILTER_TYPE.RANGE_DATE) {
    return (
      <RangeDatePickerField
        {...fieldProps}
      />
    )
  }

  if (type === TBL_FILTER_TYPE.RADIO) {
    return (
      <RadioField
        {...fieldProps}
        options={options}
      />
    )
  }

  if (type === TBL_FILTER_TYPE.RANGE_NUMBER) {
    return (
      <RangeNumberField
        {...fieldProps}
      />
    )
  }

  if (type === TBL_FILTER_TYPE.SELECT_ADDRESS) {
    return (
      <AddressField
        {...fieldProps}
        setValue={setValue}
        watch={watch}
      />
    )
  }

  if (type === TBL_FILTER_TYPE.RANGE_MONEY) {
    return (
      <RangeMoneyField
        {...fieldProps}
      />
    )
  }

  return (
    <TextField
      {...fieldProps}
    />
  )
}