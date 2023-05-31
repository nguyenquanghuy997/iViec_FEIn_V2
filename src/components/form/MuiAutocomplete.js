import { CheckboxIconChecked, CheckboxIconDefault, } from "@/assets/CheckboxIcon";
import { AvatarDS } from "@/components/DesignSystem";
import ChipDS from "@/components/DesignSystem/ChipDS";
import MuiTextField from "@/components/form/MuiTextField";
import { CustomPaper } from "@/components/hook-form/RHFAutocomplete";
import { BoxFlex } from "@/sections/emailform/style";
import { STYLE_CONSTANT as style } from "@/theme/palette";
import axiosInstance from "@/utils/axios";
import { containsText } from "@/utils/function";
import { Autocomplete, Checkbox, CircularProgress, MenuItem, } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { isEqual } from "lodash";
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState, } from "react";
import { RiCloseLine } from "react-icons/ri";
import { TbChevronDown } from "react-icons/tb";

const MuiAutocomplete = forwardRef(
  (
    {
      value: selectValue,
      options,
      multiple = false,
      sx = {},
      remoteUrl,
      useQueryFilters = {
        PageSize: 20,
      },
      onChange,
      error,
      height = 44,
      onClose,
      showAvatar,
      showCheckbox,
      placeholder,
      disabledOption,
      limitTags,
      ...other
    },
    ref
  ) => {
    const inputRef = useRef();
    const theme = useTheme();
    const value = useMemo(() => {
      if (multiple) {
        if (!selectValue) selectValue = [];
        if (!Array.isArray(selectValue)) selectValue = [selectValue];
      }
      if (typeof selectValue === 'undefined') return null;
      return selectValue;
    }, [selectValue, multiple]);
    
    const [open, setOpen] = useState(false);
    const [fetchedOptions, setFetchedOptions] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [filters, setFilters] = useState({
      ...useQueryFilters,
      SearchKey: "",
      PageIndex: 1,
    });
    const [totalPage, setTotalPage] = useState(1);
    const _timeoutSearch = useRef();
    const _timeoutFetch = useRef();
    const _selectRef = useRef();
    const _lastPage = useRef(1);
    
    const sxProps = {
      width: "100%",
      minHeight: height,
      background: theme.palette.common.white,
      ...sx,
    };
    
    useImperativeHandle(ref, () => {
      return {
        ...inputRef.current,
        ..._selectRef.current,
      };
    });
    
    useEffect(() => {
      setFetchedOptions([]);
    }, [remoteUrl]);
    
    const getFetchedOptions = async () => {
      if (
        isFetching ||
        (_lastPage.current === filters.PageIndex && fetchedOptions.length > 0)
      ) {
        return;
      }
      setIsFetching(true);
      
      clearTimeout(_timeoutFetch.current);
      _timeoutFetch.current = setTimeout(async () => {
        const {
          data: {items, totalPage: resTotalPage} = {
            items: [],
            totalPage: 1,
          },
        } = await axiosInstance({
          url: remoteUrl,
          method: "GET",
          params: {
            ...filters,
          },
        });
        
        setIsFetching(false);
        setTotalPage(resTotalPage);
        setFetchedOptions(
          filters.PageIndex === 1 ? items : fetchedOptions.concat(items)
        );
        _lastPage.current = filters.PageIndex;
      }, 100);
    };
    
    useEffect(() => {
      if (!remoteUrl) {
        return;
      }
      if (open) {
        getFetchedOptions();
      }
    }, [remoteUrl, open, filters]);
    
    const displayedOptions = useMemo(() => {
      if (remoteUrl) {
        return fetchedOptions.map((item) => ({
          value: item.id,
          label: item.name || item.label || item.email || item.lastName,
        }));
      }
      return options.filter((option) =>
        containsText(option.label, filters.SearchKey)
      );
    }, [filters.SearchKey, options, remoteUrl, fetchedOptions]);
    
    const renderInput = (params) => {
      return (
        <MuiTextField
          ref={inputRef}
          fullWidth
          placeholder={placeholder}
          {...params}
          error={error}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isFetching ? (
                  <CircularProgress color="inherit" size={20}/>
                ) : null}
                {<TbChevronDown color={theme.palette.common.neutral700} size={20}/>}
              </>
            ),
          }}
        />
      );
    };
    
    const renderTags = (value, getTagProps) => {
      const theme = useTheme();
      return value.map((option, index) => (
        <ChipDS
          {...getTagProps({index})}
          key={index}
          deleteIcon={
            <RiCloseLine size={12} color={theme.palette.common.neutral500}/>
          }
          size="small"
          label={typeof option === "string" ? option : option?.label}
          variant="filled"
          sx={{
            borderRadius: "4px",
            color: style.COLOR_TEXT_BLACK,
            backgroundColor: theme.palette.common.bgrObject,
            fontSize: style.FONT_XS,
            fontWeight: style.FONT_MEDIUM,
          }}
        />
      ));
    };
    
    return (
      <>
        <Autocomplete
          ref={_selectRef}
          open={open}
          value={value}
          onOpen={() => {
            if (!options.length) return;
            setOpen(true);
          }}
          onClose={(e) => {
            setOpen(false);
            setTimeout(() => {
              setFilters({
                ...filters,
                SearchKey: "",
              });
            }, 500);
            if (onClose) onClose(e, value);
          }}
          onChange={onChange}
          onInputChange={(event, newInputValue) => {
            if (remoteUrl) {
              clearTimeout(_timeoutSearch.current);
              _timeoutSearch.current = setTimeout(() => {
                setTotalPage(1);
                setFetchedOptions([]);
                setFilters({
                  ...filters,
                  SearchKey: newInputValue,
                  PageIndex: 1,
                });
              }, 500);
            } else {
              setFilters({
                ...filters,
                SearchKey: newInputValue,
              });
            }
          }}
          renderInput={renderInput}
          renderTags={renderTags}
          options={displayedOptions}
          loading={isFetching}
          getOptionLabel={(option) => option?.label}
          multiple={multiple}
          limitTags={limitTags || disabledOption || 3}
          PaperComponent={CustomPaper}
          ListboxProps={{
            onScroll: (e) => {
              const isBottom =
                e.currentTarget.scrollHeight - e.currentTarget.scrollTop <=
                e.currentTarget.clientHeight + 5;
              if (isBottom) {
                if (isFetching || filters.PageIndex >= totalPage) {
                  return;
                }
                setFilters({
                  ...filters,
                  PageIndex: filters.PageIndex + 1,
                });
              }
            },
          }}
          disableCloseOnSelect
          noOptionsText={"Không tìm thấy dữ liệu"}
          renderOption={(props, option, {selected}) => (
            <>
              <MenuItem
                {...props}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                disabled={disabledOption && value?.length >= disabledOption}
              >
                <div>
                  <BoxFlex justifyContent="flex-start">
                    {showAvatar && (
                      <AvatarDS
                        sx={{
                          height: "20px",
                          width: "20px",
                          borderRadius: "100px",
                          fontSize: "10px",
                        }}
                        name={option.label}
                      />
                    )}
                    {option.label}
                  </BoxFlex>
                </div>
                {showCheckbox && (
                  <Checkbox
                    sx={{p: 0.25}}
                    icon={<CheckboxIconDefault/>}
                    checkedIcon={<CheckboxIconChecked/>}
                    style={{marginRight: 8}}
                    checked={selected}
                  />
                )}
              </MenuItem>
            </>
          )}
          sx={{...sxProps}}
          isOptionEqualToValue={(option, value) =>
            value === "" || typeof value === "string"
              ? isEqual(option, value)
              : isEqual(option.value, value.value)
          }
          {...other}
        />
      </>
    );
  }
);

export default MuiAutocomplete;
