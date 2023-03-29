import React, { useState, useEffect, useMemo, useRef, forwardRef, useImperativeHandle } from "react";
import {
    Select,
    OutlinedInput,
    Checkbox,
    ListItemText,
    MenuItem,
    TextField,
    InputAdornment,
    useTheme,
    Box,
    CircularProgress, IconButton,
} from "@mui/material";
import PropTypes from 'prop-types';
import { RiCheckLine } from 'react-icons/ri';
import { pxToRem } from "@/utils/getFontValue";
import axiosInstance from "@/utils/axios";
import {SearchIcon} from "@/assets/SearchIcon";
import { convertViToEn } from "@/utils/function";
import {CheckboxIconChecked, CheckboxIconDefault} from "@/assets/CheckboxIcon";
import {ChipSelectStyle} from "@/components/hook-form/style";
import ChipDS from "@/components/DesignSystem/ChipDS";
import CloseIcon from "@/assets/CloseIcon";
import {AvatarDS} from "@/components/DesignSystem";

const MuiSelect = forwardRef((
    {
        value: selectValue,
        selectedOptions = [],
        height = 44,
        multiple = false,
        options = [],
        placeholder = '',
        searchPlaceholder = 'Tìm kiếm',
        startIcon = null,
        sx = {},
        onChange,
        remoteUrl = null,
        useQueryFilters = {
           PageSize: 20,
        },
        search = true,
        renderSelected,
        onClose,
        onDelete,
        allowClear = false,
        onClearValue,
        showAvatar,
        ...selectProps
    }, ref) => {
    const theme = useTheme();
    const value = useMemo(() => {
        if (multiple) {
            if (!selectValue) {
                selectValue = [];
            }
            if (!Array.isArray(selectValue)) {
                selectValue = [selectValue];
            }
        }

        if (typeof selectValue === 'undefined') {
            return null;
        }
        return selectValue;
    }, [selectValue, multiple]);

    const [fetchedOptions, setFetchedOptions] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [filters, setFilters] = useState({
        ...useQueryFilters,
        SearchKey: '',
        PageIndex: 1,
    });
    const [totalPage, setTotalPage] = useState(1);
    const [open, setOpen] = useState(false);
    const _timeoutSearch = useRef();
    const _timeoutFetch = useRef();
    const _selectRef = useRef();

    useImperativeHandle(ref, () => {
        return {
            ..._selectRef.current,
            getLabel: () => _selectRef.current?.['aria-label']
        }
    });

    useEffect(() => {
        if (!remoteUrl) {
            return;
        }
        if (open) {
            getFetchedOptions();
        }
    }, [remoteUrl, open, filters]);

    const getFetchedOptions = async () => {
        if (isFetching) {
            return;
        }
        setIsFetching(true);

        clearTimeout(_timeoutFetch.current);
        _timeoutFetch.current = setTimeout(async () => {
            const {
                data: { items, totalPage: resTotalPage } = { items: [], totalPage: 1 }
            } = await axiosInstance({
                url: remoteUrl,
                method: 'GET',
                params: {
                    ...filters,
                },
            });

            setIsFetching(false);
            setTotalPage(resTotalPage);
            setFetchedOptions(filters.PageIndex === 1 ? items : fetchedOptions.concat(items));
        }, 100);
    };

    const containsText = (text, searchText) => {
        text = convertViToEn(text);
        searchText = convertViToEn(searchText);
        return text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    }

    const displayedOptions = useMemo(() => {
        if (remoteUrl) {
            return fetchedOptions.map(item => ({ value: item.id, label: item.name }));
        }
        return options.filter((option) => containsText(option.label, filters.SearchKey));
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
    }

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
        setTimeout(() => {
            setFilters({
                ...filters,
                SearchKey: ''
            })
        }, 500)
    }

    const getSelectedItem = (val) => {
        let optionItem;
        if (remoteUrl) {
            optionItem = fetchedOptions.concat(selectedOptions).find(opt => opt.id === val);
            return optionItem ? { value: optionItem.id, label: optionItem.name } : { value: val, label: val };
        }
        optionItem = options.find(opt => opt.value === val);
        return optionItem || { value: val, label: val };
    }

    const getLabel = (val) => {
        const selectedItem = getSelectedItem(val);
        return selectedItem ? selectedItem.label : val;
    }

    const renderValue = (selected, onDelete) => {
        if (
            (!multiple && (typeof selected === 'undefined' || selected === null || selected === ''))
            || (multiple && selected.length < 1)
        ) {
            return <span className="placeholder">{placeholder || ''}</span>;
        }

        if (renderSelected) {
            return renderSelected(
                multiple ? selected.map(val => getSelectedItem(val))
                    : getSelectedItem(selected)
            );
        }

        if (!multiple) {
            return <span className="selected-value">{getLabel(selected)}</span>;
        }

        return (
            <span className="selected-value">
                {
                    selected.map((val, index) => (
                        <ChipDS
                            label={getLabel(val)}
                            key={index}
                            deleteIcon={<CloseIcon onMouseDown={(event) => event.stopPropagation()}/>}
                            sx={{...ChipSelectStyle}}
                            variant="filled"
                            onDelete={() => onDelete(val)}
                        />
                    ))
                }
      </span>
        );
    }

    const itemHeight = 44;

    const selectSx = {
        width: '100%',
        minHeight: height,
        fontSize: pxToRem(14),
        borderRadius: '6px',
        '.placeholder': {
            color: theme.palette.text.placeholder,
        },
        'fieldset': {
            borderColor: theme.palette.text.border + '!important',
            borderWidth: '1px!important',
        },
        '.MuiSvgIcon-root': {
            right: 12,
            color: theme.palette.text.sub,
        },
        '.MuiSelect-select .selected-value': {
            display: 'inline-flex',
            flexWrap: 'wrap',
            padding: '0px 6px',
        },
        '.MuiSelect-select': {
            padding: '8px',
        },
        ...sx,
    };

    const dropdownSx = {
        zIndex: 3002,
        transform: 'translateY(6px)',
        '.MuiList-root': {
            paddingTop: 0,
            paddingBottom: 0,
            backgroundColor: '#fff',
            '.select-list-options': {
                maxHeight: 320,
                overflow: 'auto',
            }
        },
        '.MuiPaper-root': {
            borderRadius: '6px',
            boxShadow: '0px 0px 5px rgba(9, 30, 66, 0.3)!important',
            // border: '1px solid #E7E9ED',
        },
        '.select-search': {
            '.MuiInputBase-root': {
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                minHeight: itemHeight,
                'fieldset': {
                    border: 'none',
                    borderBottom: '1px solid #E7E9ED',
                },
                '.MuiInputBase-input': {
                    paddingLeft: '3px',
                    fontSize: pxToRem(14),
                },
            }
        },
        '.MuiMenuItem-root': {
            borderBottom: '1px solid #E7E9ED',
            minHeight: itemHeight,
            '&:last-child': {
                borderBottom: 'none',
            },
            '.MuiTypography-root': {
                fontSize: pxToRem(14),
            },
            '.MuiCheckbox-root': {
                padding: '4px 0 4px',
                '.MuiSvgIcon-root': {
                    width: 20,
                    height: 20,
                },
            },
            '.MuiCheckbox-root.Mui-checked, MuiCheckbox-root.MuiCheckbox-indeterminate': {
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
            input={<OutlinedInput />}
            displayEmpty={true}
            renderValue={(selected) => {
                return (
                    <Box display="flex" alignItems="center" flexWrap="wrap">
                        {startIcon && (
                            <div className="select-icon" style={{ marginRight: 8 }}>
                                {startIcon}
                            </div>
                        )}
                        {renderValue(selected, onDelete)}
                    </Box>
                )
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
                        <IconButton size={"small"} sx={{ visibility: value ? "visible" : "hidden" }} onClick={() => onClearValue(name, "")}>
                            <CloseIcon />
                        </IconButton>
                    </InputAdornment>
                )
            }
            onOpen={() => setOpen(true)}
            onClose={(e) => {
                setOpen(false);
                setTimeout(() => {
                    setFilters({
                        ...filters,
                        SearchKey: ''
                    })
                }, 500)
                if (onClose) onClose(e, value);
            }}
            open={open}
            sx={{
                ...selectSx,
                "& .MuiSelect-iconOutlined": {
                    display: allowClear && value ? "none" : "",
                }
            }}
            inputProps={{
                "aria-label": getLabel(value)
            }}
            {...selectProps}
        >

            {search && (
                <TextField
                    size="small"
                    autoFocus
                    placeholder={searchPlaceholder}
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        )
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
                className="select-list-options"
                onScroll={e => {
                    const isBottom = e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight + 5;
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
                    >
                        {showAvatar && <AvatarDS
                            sx={{height: "20px", width: "20px", borderRadius: "100px", fontSize: "10px"}}
                            name={option.label}
                        />}
                        <ListItemText primary={option.label} sx={{ mr: '8px' }} />
                        {multiple ? (
                            <Checkbox checked={value.includes(option.value)} icon={<CheckboxIconDefault />} checkedIcon={<CheckboxIconChecked/>} />
                        ) : (
                            value === option.value && (
                                <RiCheckLine color="#1976D2" size={20} />
                            )
                        )}
                    </MenuItem>
                ))}

                {isFetching && (
                    <Box textAlign="center" my={1}>
                        <CircularProgress size={18} />
                    </Box>
                )}
            </div>
        </Select>
    )
});

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
}

export default MuiSelect;