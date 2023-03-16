import React from 'react';
import {Divider, InputAdornment, Stack, Typography} from "@mui/material";
import DateFilter from "@/sections/dynamic-filter/DateFilter";
import {RHFRadioGroup, RHFTextField} from "@/components/hook-form";
import Iconify from "@/components/Iconify";
import SelectFilter from "@/sections/dynamic-filter/SelectFilter";
import InputNumberFormatFilter from "@/sections/dynamic-filter/InputNumberFormatFilter";
import TreeFilter from "@/sections/dynamic-filter/TreeFilter";

export const TypographyStyle = {
  color: '#455570',
  fontSize: "14px",
  fontWeight: "600",
  mb: 2
}

function compare(a) {
  if (a?.isTree){
    return -1;
  }
  return 1;
}

const DynamicFilterForm = (props) => {
  const { options } = props;

  return (
      <Stack>
        {props.columns?.sort(compare)?.filter(column => column.name).map((column) => {
          if (column.type === 'tree') {
            return (
                <Stack key={column.name}>
                  <Stack sx={{py: 2}}>
                    <Typography variant="body1" sx={{...TypographyStyle}}>{column.label}</Typography>
                    <TreeFilter
                        options={options[column.name]}
                        name={column.name}
                        multiple
                        placeholder={column.placeholder || "Tìm kiếm..."}
                        dropdownStyle={{maxHeight: 400, overflow: 'auto', zIndex: 9999}}
                        allowClear
                        treeDefaultExpandAll
                        notFoundContent={
                          <span style={{ display: 'block', padding: '10px' }}>
                            Không tìm thấy đơn vị phù hợp
                          </span>
                        }
                    />
                  </Stack>
                  <Divider/>
                </Stack>
            )
          }
          if (column.type === 'date') {
            if (column.items) {
              return (
                  <Stack key={column.name}>
                    <Stack sx={{py: 2}}>
                      <Typography variant="body1" sx={{...TypographyStyle}}>{column.label}</Typography>
                      {
                        column.items.map((item) => {
                          return (
                              <DateFilter
                                  key={item.name}
                                  name={item.name}
                                  startIcon={item.startIcon}
                                  endIcon={item.endIcon}
                                  placeholder={item.placeholder}
                              />
                          )
                        })
                      }
                    </Stack>
                    <Divider/>
                  </Stack>
              )
            }
            return (
                <Stack key={column.name}>
                  <Stack sx={{py: 2}}>
                    <Typography variant="body1" sx={{...TypographyStyle}}>{column.label}</Typography>
                    <DateFilter
                        key={column.name}
                        name={column.name}
                        startIcon={column.startIcon}
                        endIcon={column.endIcon}
                        placeholder={column.placeholder}
                    />
                  </Stack>
                  <Divider/>
                </Stack>
            )
          }

          if (column.type === 'text') {
            if (column.items) {
              return (
                  <Stack key={column.name}>
                    <Stack sx={{py: 2}}>
                      <Typography variant="body1" sx={{...TypographyStyle}}>{column.label}</Typography>
                      {
                        column.items.map((item) => {
                          return (
                              <RHFTextField
                                  key={item.name}
                                  sx={{mb: 2}}
                                  name={item.name}
                                  placeholder={item.placeholder}
                                  type={item.type}
                                  InputProps={{
                                    startAdornment: item.startIcon && (
                                        <InputAdornment position='start' sx={{ml: 1.5}}>
                                          {item.startIcon}
                                        </InputAdornment>
                                    ),
                                    endAdornment: item.endIcon && (
                                        <InputAdornment position='end' sx={{mr: 1.5}}>
                                          {item.endIcon}
                                        </InputAdornment>
                                    )
                                  }}
                              />
                          )
                        })
                      }
                    </Stack>
                    <Divider/>
                  </Stack>
              )
            }
            return (
                <Stack key={column.name}>
                  <Stack sx={{py: 2}}>
                    <Typography variant="body1" sx={{...TypographyStyle}}>{column.label}</Typography>
                    <RHFTextField
                        name={column.name}
                        placeholder="Tìm kiếm..."
                        type={column.type || "text"}
                        InputProps={{
                          startAdornment: (
                              <InputAdornment position='start' sx={{ml: 1.5}}>
                                <Iconify icon={'eva:search-fill'} sx={{color: 'text.disabled', width: 20, height: 20}}/>
                              </InputAdornment>
                          ),
                        }}
                    />
                  </Stack>
                  <Divider/>
                </Stack>
            )
          }

          if (column.type === "number") {
            if (column.items) {
              return (
                  <Stack key={column.name}>
                    <Stack sx={{py: 2}}>
                      <Typography variant="body1" sx={{...TypographyStyle}}>{column.label}</Typography>
                      {
                        column.items.map((item) => {
                          return (
                              <InputNumberFormatFilter
                                  key={item.name}
                                  name={item.name}
                                  placeholder={item.placeholder}
                                  type={item.type}
                                  InputProps={{
                                    startAdornment: item.startIcon && (
                                        <InputAdornment position='start' sx={{ml: 1.5}}>
                                          {item.startIcon}
                                        </InputAdornment>
                                    ),
                                    endAdornment: item.endIcon && (
                                        <InputAdornment position='end' sx={{mr: 1.5}}>
                                          {item.endIcon}
                                        </InputAdornment>
                                    )
                                  }}
                              />
                          )
                        })
                      }
                    </Stack>
                    <Divider/>
                  </Stack>
              )
            }
            return (
                <Stack key={column.name}>
                  <Stack sx={{py: 2}}>
                    <Typography variant="body1" sx={{...TypographyStyle}}>{column.label}</Typography>
                    <InputNumberFormatFilter
                        name={column.name}
                        placeholder="Tìm kiếm..."
                        type={column.type || "text"}
                        InputProps={{
                          startAdornment: (
                              <InputAdornment position='start' sx={{ml: 1.5}}>
                                <Iconify icon={'eva:search-fill'}
                                         sx={{color: 'text.disabled', width: 20, height: 20}}/>
                              </InputAdornment>
                          ),
                        }}
                    />
                  </Stack>
                  <Divider/>
                </Stack>
            )
          }

          if (column.type === "select") {
            if (column.items) {
              return (
                  <Stack key={column.name}>
                    <Stack sx={{py: 2}}>
                      <Typography variant="body1" sx={{...TypographyStyle}}>{column.label}</Typography>
                      {
                        column.items.map((item) => {
                          return (
                              <div key={item.name} style={{marginBottom: 12}}>
                                <Typography variant="body1" sx={{
                                  ...TypographyStyle,
                                  fontWeight: 500,
                                  mb: 1
                                }}>{item.label}</Typography>
                                <SelectFilter
                                    options={options[item.name]?.map((i) => ({
                                      ...i,
                                      value: i.id,
                                      label: i.name,
                                      name: i.name,
                                    }))}
                                    name={item.name}
                                    multiple={item.multiple}
                                    placeholder={item.placeholder || "Tìm kiếm..."}
                                />
                              </div>
                          )
                        })
                      }
                    </Stack>
                    <Divider/>
                  </Stack>
              )
            }
            return (
                <Stack key={column.name}>
                  <Stack sx={{py: 2}}>
                    <Typography variant="body1" sx={{...TypographyStyle}}>{column.label}</Typography>
                    <SelectFilter
                        options={options[column.name]?.map((i) => ({
                          value: i.id,
                          label: i.name,
                          name: i.item || i.name,
                        }))}
                        name={column.name}
                        multiple={column.multiple}
                        placeholder={column.placeholder || "Tìm kiếm..."}
                    />
                  </Stack>
                  <Divider/>
                </Stack>
            )
          }
          if (column.type === 'radio') {
            return <Stack key={column.name}>
              <Stack sx={{py: 2}}>
                <Typography variant="body1" sx={{...TypographyStyle}}>{column.label}</Typography>
                <RHFRadioGroup
                    name={column.name}
                    row
                    sx={{justifyContent: 'space-between'}}
                    options={options[column.name]}
                />
              </Stack>
              <Divider/>
            </Stack>
          }
        })
        }
      </Stack>
  );
};

export default React.memo(DynamicFilterForm);