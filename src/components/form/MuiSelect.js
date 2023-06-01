import {View} from "../FlexStyled";
import SvgIcon from "../SvgIcon";
import {
  CheckboxIconChecked,
  CheckboxIconDefault,
} from "@/assets/CheckboxIcon";
import CloseIcon from "@/assets/CloseIcon";
import {SearchIcon} from "@/assets/SearchIcon";
import {AvatarDS} from "@/components/DesignSystem";
import ChipDS from "@/components/DesignSystem/ChipDS";
import {ChipSelectStyle} from "@/components/hook-form/style";
import {STYLE_CONSTANT as style} from "@/theme/palette";
import axiosInstance from "@/utils/axios";
import {containsText} from "@/utils/function";
import {pxToRem} from "@/utils/getFontValue";
import {
  Box,
  Checkbox,
  CircularProgress,
  IconButton,
  InputAdornment,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  useTheme,
} from "@mui/material";
import {isEmpty, pick} from "lodash";
import PropTypes from "prop-types";
import qs from "query-string";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import {RiCheckLine} from "react-icons/ri";

const MuiSelect = forwardRef(
  (
    {
      name,
      value: selectValue,
      selectedOptions: initSelectedOptions = [],
      height = 44,
      multiple = false,
      options = [],
      placeholder = "",
      searchPlaceholder = "Tìm kiếm",
      startIcon = null,
      sx = {},
      onChange,
      remoteUrl = null,
      remoteIdsField = "Ids",
      method = "GET",
      useQueryFilters = {
        PageSize: 20,
      },
      search = true,
      renderSelected,
      onClose,
      resetOnClose = false,
      onDelete,
      allowClear = false,
      onClearValue,
      showAvatar,
      disabledOption,
      ...selectProps
    },
    ref
  ) => {
    const theme = useTheme();

    const value = useMemo(() => {
      if (multiple) {
        if (typeof selectValue === "number") {
          selectValue = [selectValue];
        }
        if (!selectValue) {
          selectValue = [];
        }
        if (!Array.isArray(selectValue)) {
          selectValue = [selectValue];
        }
      }

      if (typeof selectValue === "undefined") {
        return null;
      }
      return selectValue;
    }, [selectValue, multiple]);

    const [fetchedOptions, setFetchedOptions] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [filters, setFilters] = useState({
      ...useQueryFilters,
      SearchKey: "",
      PageIndex: 1,
    });
    const [totalPage, setTotalPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const _timeoutSearch = useRef();
    const _timeoutFetch = useRef();
    const _timeoutFetchInit = useRef();
    const _selectRef = useRef();
    const _lastPage = useRef(1);
    const _firstInit = useRef(true);

    useImperativeHandle(ref, () => _selectRef.current);

    useEffect(() => {
      setFetchedOptions([]);
    }, [remoteUrl]);

    useEffect(() => {
      if (!_firstInit.current) {
        return;
      }

      if (!isEmpty(initSelectedOptions)) {
        setSelectedOptions(initSelectedOptions);
        _firstInit.current = false;
        return;
      }

      if (!remoteUrl || isEmpty(value)) {
        return;
      }

      let aryValue = Array.isArray(value) ? value : [value];
      let reqData = {[remoteIdsField]: aryValue, PageSize: aryValue.length};
      let reqMethod = method.toLowerCase();
      let symConcat = remoteUrl.includes("?") ? "&" : "?";

      const fetchInitData = async () => {
        clearTimeout(_timeoutFetchInit.current);
        _timeoutFetchInit.current = setTimeout(async () => {
          const {data: {items} = {items: []}} = await axiosInstance({
            url:
              remoteUrl +
              (reqMethod === "get" ? symConcat + qs.stringify(reqData) : ""),
            method: method,
            ...(reqMethod !== "get" ? {data: reqData} : {}),
          });
          setSelectedOptions(
            items.map((it) => pick(it, ["id", "name", "title", "email"]))
          );
          _firstInit.current = false;
        }, 300);
      };

      fetchInitData();
    }, [remoteUrl, value, initSelectedOptions]);

    useEffect(() => {
      if (!remoteUrl) {
        return;
      }
      if (open) {
        getFetchedOptions();
      }
    }, [remoteUrl, open, filters]);

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
          method: method,
          ...(method.toLowerCase() === "get"
            ? {params: filters}
            : {data: filters}),
        });

        setIsFetching(false);
        setTotalPage(resTotalPage);
        setFetchedOptions(
          filters.PageIndex === 1 ? items : fetchedOptions.concat(items)
        );
        _lastPage.current = filters.PageIndex;
      }, 100);
    };

    const displayedOptions = useMemo(() => {
      if (remoteUrl) {
        return fetchedOptions.map((item) => ({
          value: item.id,
          label: item.email || item.lastName || item.name,
        }));
      }
      return options.filter((option) =>
        containsText(option.label, filters.SearchKey)
      );
    }, [filters.SearchKey, options, remoteUrl, fetchedOptions]);

    const handleChangeSearch = (search) => {
      if (remoteUrl) {
        clearTimeout(_timeoutSearch.current);
        _timeoutSearch.current = setTimeout(() => {
          setTotalPage(1);
          setFetchedOptions([]);
          setFilters({
            ...filters,
            SearchKey: search,
            PageIndex: 1,
          });
        }, 500);
      } else {
        setFilters({
          ...filters,
          SearchKey: search,
        });
      }
    };

    const handleClickItem = (itemValue) => {
      if (!onChange) {
        return;
      }
      if (!multiple) {
        onChange(itemValue);
        setOpen(false);
      } else {
        let index = value.indexOf(itemValue);
        let changedValue = [...value];
        if (index < 0) {
          changedValue.push(itemValue);
        } else {
          changedValue.splice(index, 1);
        }
        onChange(changedValue);
      }
      // setTimeout(() => {
      //     setFilters({
      //         ...filters,
      //         SearchKey: ''
      //     })
      // }, 500)
    };

    const getSelectedItem = (val) => {
      let optionItem;
      if (remoteUrl) {
        optionItem = fetchedOptions
          .concat(selectedOptions)
          .find((opt) => opt.id === val);
        return !isEmpty(optionItem)
          ? {
            value: optionItem.id,
            label:
              optionItem.label ||
              optionItem.email ||
              optionItem.name ||
              optionItem.lastName,
          }
          : {value: val, label: val};
      }
      optionItem = options.find((opt) => opt.value === val);
      return optionItem || {value: val, label: val};
    };

    const getLabel = (val) => {
      const selectedItem = getSelectedItem(val);
      return selectedItem ? selectedItem.label : val;
    };

    const renderValue = (selected, onDelete) => {
      if (
        (!multiple &&
          (typeof selected === "undefined" ||
            selected === null ||
            selected === "")) ||
        (multiple && selected.length < 1)
      ) {
        return <span className="placeholder">{placeholder || ""}</span>;
      }

      if (renderSelected) {
        return renderSelected(
          multiple
            ? selected.map((val) => getSelectedItem(val))
            : getSelectedItem(selected)
        );
      }

      if (!multiple) {
        return <span className="selected-value">{getLabel(selected)}</span>;
      }

      return (
        <span className="selected-value">
          {selected.map((val, index) => (
            <ChipDS
              label={getLabel(val)}
              key={index}
              variant="filled"
              onDelete={() => onDelete(val)}
              sx={{
                borderRadius: "4px",
                color: style.COLOR_TEXT_BLACK,
                backgroundColor: theme.palette.common.bgrObject,
                fontSize: style.FONT_XS,
                fontWeight: style.FONT_MEDIUM,
                ...ChipSelectStyle,
              }}
              deleteIcon={
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onMouseDown={(event) => event.stopPropagation()}
                >
                  <path
                    d="M6.00012 5.29312L8.47512 2.81812L9.18212 3.52512L6.70711 6.00012L9.18212 8.47512L8.47512 9.18212L6.00012 6.70711L3.52512 9.18212L2.81812 8.47512L5.29312 6.00012L2.81812 3.52512L3.52512 2.81812L6.00012 5.29312Z"
                    fill="#8A94A5"
                  />
                </svg>
              }
            />
          ))}
        </span>
      );
    };

    const itemHeight = 44;

    const selectSx = {
      width: "100%",
      minHeight: height,
      fontSize: pxToRem(14),
      borderRadius: "6px",
      ".placeholder": {
        color: theme.palette.text.search,
      },
      fieldset: {
        borderColor: theme.palette.text.border + "!important",
        borderWidth: "1px!important",
      },
      ".MuiSvgIcon-root": {
        right: 12,
        color: theme.palette.text.sub,
      },
      ".MuiSelect-select .selected-value": {
        flexWrap: "wrap",
        padding: "0px 6px",
        display: "inline-block",
        maxWidth: "100%",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
      ".MuiSelect-select": {
        padding: "8px",
      },
      ...sx,
    };

    const dropdownSx = {
      zIndex: 3002,
      transform: "translateY(6px)",
      ".MuiList-root": {
        paddingTop: 0,
        paddingBottom: 0,
        ".list-options": {
          maxHeight: 320,
          overflow: "auto",
        },
        "& ::-webkit-scrollbar": {
          width: "8px",
          borderRadius: "6px",
        },
        "& ::-webkit-scrollbar-track": {
          background: theme.palette.common.bgrObject,
        },
        "& ::-webkit-scrollbar-thumb": {
          background: theme.palette.common.neutral300,
        },
        "& ::-webkit-scrollbar-thumb:hover": {
          background: "#888",
        },
      },
      ".MuiPaper-root": {
        borderRadius: "6px",
        boxShadow: "0px 0px 5px rgba(9, 30, 66, 0.3)!important",
        // border: '1px solid #E7E9ED',
      },
      ".select-search": {
        ".MuiInputBase-root": {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          minHeight: itemHeight,
          fieldset: {
            border: "none",
            borderBottom: "1px solid #E7E9ED",
          },
          ".MuiInputBase-input": {
            paddingLeft: "3px",
            fontSize: pxToRem(14),
          },
        },
      },
      ".MuiMenuItem-root": {
        borderBottom: "1px solid #E7E9ED",
        minHeight: itemHeight,
        "&:last-child": {
          borderBottom: "none",
        },
        ".MuiTypography-root": {
          fontSize: pxToRem(14),
        },
        ".MuiCheckbox-root": {
          padding: "4px 0 4px",
          ".MuiSvgIcon-root": {
            width: 20,
            height: 20,
          },
        },
        ".MuiCheckbox-root.Mui-checked, MuiCheckbox-root.MuiCheckbox-indeterminate":
          {
            color: theme.palette.text.active,
          },
      },
    };

    return (
      <Select
        ref={_selectRef}
        multiple={multiple}
        value={value}
        placeholder={placeholder}
        input={<OutlinedInput/>}
        IconComponent={(p) => (
          <View
            absolute
            contentCenter
            t={"calc(50% - .5em)"}
            r={12}
            size={"1em"}
            style={{
              transform: `rotate(${
                String(p.className).includes("iconOpen") ? "180deg" : "0deg"
              })`,
            }}
          >
            <SvgIcon>
              {
                '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_8887_114461)"> <path d="M9.99999 10.9766L14.125 6.85156L15.3033 8.0299L9.99999 13.3332L4.69666 8.0299L5.87499 6.85156L9.99999 10.9766Z" fill="#5C6A82"/> </g> <defs> <clipPath id="clip0_8887_114461"> <rect width="20" height="20" fill="white"/> </clipPath> </defs> </svg>'
              }
            </SvgIcon>
          </View>
        )}
        displayEmpty={true}
        renderValue={(selected) => {
          return (
            <Box display="flex" alignItems="center" flexWrap="wrap">
              {startIcon && (
                <div className="select-icon" style={{marginRight: 8}}>
                  {startIcon}
                </div>
              )}
              {renderValue(selected, onDelete)}
            </Box>
          );
        }}
        MenuProps={{
          PaperProps: {
            style: {},
          },
          sx: dropdownSx,
        }}
        endAdornment={
          allowClear && (
            <InputAdornment position={"end"}>
              <IconButton
                size={"small"}
                sx={{visibility: value ? "visible" : "hidden"}}
                onClick={() => onClearValue(name, "")}
              >
                <CloseIcon/>
              </IconButton>
            </InputAdornment>
          )
        }
        onOpen={() => {
          setOpen(true);
        }}
        onClose={(e) => {
          setOpen(false);
          if (resetOnClose) {
            setFetchedOptions([]);
            setTimeout(() => {
              setFilters({
                ...filters,
                PageIndex: 1,
                SearchKey: "",
              });
            }, 500);
          }
          if (onClose) onClose(e, value);
        }}
        open={open}
        sx={{
          ...selectSx,
          "& .MuiSelect-iconOutlined": {
            display: allowClear && value ? "none" : "",
          },
        }}
        {...selectProps}
      >
        {search && (
          <TextField
            size="small"
            autoFocus
            placeholder={searchPlaceholder}
            fullWidth
            defaultValue={filters.SearchKey}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon/>
                </InputAdornment>
              ),
            }}
            onChange={(e) => handleChangeSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key !== "Escape") {
                e.stopPropagation();
              }
            }}
            className="select-search"
          />
        )}

        <div
          className="list-options"
          onScroll={(e) => {
            const isBottom =
              e.target.scrollHeight - e.target.scrollTop <=
              e.target.clientHeight + 5;
            if (isBottom) {
              if (isFetching || filters.PageIndex >= totalPage) {
                return;
              }
              setFilters({
                ...filters,
                PageIndex: filters.PageIndex + 1,
              });
            }
          }}
        >
          {displayedOptions.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              onClick={() => handleClickItem(option.value)}
              disabled={disabledOption && value?.length >= disabledOption}
            >
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
              <ListItemText primary={option.label} sx={{mr: "8px"}}/>
              {multiple ? (
                <Checkbox
                  checked={value.includes(option.value)}
                  icon={<CheckboxIconDefault/>}
                  checkedIcon={<CheckboxIconChecked/>}
                />
              ) : (
                value === option.value && (
                  <RiCheckLine color={theme.palette.common.blue700} size={20}/>
                )
              )}
            </MenuItem>
          ))}

          {isFetching && (
            <Box textAlign="center" my={1}>
              <CircularProgress size={18}/>
            </Box>
          )}
        </div>
      </Select>
    );
  }
);

MuiSelect.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.number,
  ]),
  multiple: PropTypes.bool,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  searchPlaceholder: PropTypes.string,
  startIcon: PropTypes.node,
  sx: PropTypes.object,
};

export default MuiSelect;
