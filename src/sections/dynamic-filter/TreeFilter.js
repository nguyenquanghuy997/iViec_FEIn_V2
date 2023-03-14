import React, {memo} from "react";
import {FormHelperText, Stack} from "@mui/material";
import {Controller, useFormContext} from "react-hook-form";
import styled from "@emotion/styled";
import {TreeSelect} from "antd";

const {SHOW_ALL} = TreeSelect;

const TreeSelectStyle = styled(TreeSelect)`
  border-radius: 6px;

  &.ant-select-open .ant-select-selector {
    border-width: 1px !important;
    outline: none;
    box-shadow: none !important;
  }

  &:focus {
    outline: none;
    box-shadow: none !important;
  }

  .ant-select-focused .ant-select-selector,
  .ant-select-selector:focus,
  .ant-select-selector:active,
  .ant-select-open .ant-select-selector {
    outline: none;
    box-shadow: none !important;
    border-width: 2px !important;
  }

  .ant-select-selector {
    min-height: 44px;
  }

  .ant-select-selection-placeholder {
    color: #8A94A5;
    font-size: 14px;
    font-weight: 400;
  }
`

function TreeFilter({name, ...props}) {
  const {control} = useFormContext();
  const {placeholder, options, multiple = false} = props;

  return (
      <Controller
          name={name}
          control={control}
          render={({field, fieldState: {error}}) => (
              <Stack direction="column">
                <TreeSelectStyle
                    {...field}
                    showCheckedStrategy={SHOW_ALL}
                    multiple={multiple}
                    treeData={options}
                    showSearch
                    placeholder={placeholder}
                    {...props}
                />
                <FormHelperText sx={{color: "#FF4842", fontSize: 12, fontWeight: 400}}>{error?.message}</FormHelperText>
              </Stack>
          )}
      />
  );
}

export default memo(TreeFilter);