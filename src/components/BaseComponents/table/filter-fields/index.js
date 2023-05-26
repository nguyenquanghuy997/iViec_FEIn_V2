import { TBL_FILTER_TYPE } from "@/config";
import SelectCheckboxField from "./SelectCheckboxField";
import SelectField from "./SelectField";
import TextField from "./TextField";
import RangeDatePickerField from "./RangeDatePickerField";
import RadioField from "./RadioField";
import RangeNumberField from "./RangeNumberField";
import AddressField from "./AddressField";
import RangeMoneyField from "./RangeMoneyField";

import { FilterItemStyle } from "../styles";
import TreeSelectField from "./TreeSelectField";
import RangePointField from "@/components/BaseComponents/table/filter-fields/RangePointField";
import RangeQuestionField from "@/components/BaseComponents/table/filter-fields/RangeQuestionField";

export default function FilterFields({
  columns = [],
  ...formProps
}) {
  const { setValue, watch } = formProps;

  return (
    <>
      {columns.filter(col => !!col.colFilters).map((col) => (
        <FilterItemStyle key={col.dataIndex}>
          <FilterFieldItem
            column={col}
            setValue={setValue}
            watch={watch}
          />
        </FilterItemStyle>
      ))}
    </>
  )
}

const FilterFieldItem = ({
  column = {},
  watch,
  setValue,
}) => {
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
    showAvatar = false,
  } = filters;

  const fieldProps = {
    label,
    name,
    placeholder,
  };

  const renderField = () => {
    if (type === TBL_FILTER_TYPE.SELECT) {
      return (
        <SelectField
          {...fieldProps}
          search={hasSearch}
          options={options}
          remoteUrl={remoteUrl}
          remoteMethod={remoteMethod}
          showAvatar={showAvatar}
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
          showAvatar={showAvatar}
        />
      )
    }

    if (type === TBL_FILTER_TYPE.SELECT_TREE) {
      return (
        <TreeSelectField
          {...fieldProps}
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

    if (type === TBL_FILTER_TYPE.RANGE_POINT) {
      return (
          <RangePointField
              {...fieldProps}
          />
      )
    }

    if (type === TBL_FILTER_TYPE.RANGE_QUESTION) {
      return (
          <RangeQuestionField
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

  return (
    <>{renderField()}</>
  )
}