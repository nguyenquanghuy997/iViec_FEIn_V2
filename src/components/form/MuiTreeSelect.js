import React, {forwardRef, useImperativeHandle, useMemo, useRef, useState} from "react";
import {Box, Checkbox, IconButton, InputAdornment, OutlinedInput, Select, TextField, useTheme,} from "@mui/material";
import {pxToRem} from "@/utils/getFontValue";
import {SearchIcon} from "@/assets/SearchIcon";
import {ChipSelectStyle} from "@/components/hook-form/style";
import ChipDS from "@/components/DesignSystem/ChipDS";
import {BoxLabelStyle, LabelTextStyle, TreeViewStyle} from "@/sections/dynamic-filter/style";
import {TreeItem, useTreeItem} from "@mui/lab";
import {CollapseIcon, ExpandIcon} from "@/assets/ArrowIcon";
import {searchTree} from "@/sections/organization/helper/DFSSearchTree";
import {convertFlatDataToTree} from "@/utils/function";
import {CloseIcon as RemoveIcon} from "@/theme/overrides/CustomIcons";
import CloseIcon from "@/assets/CloseIcon";
import {CheckboxIconChecked, CheckboxIconDefault} from "@/assets/CheckboxIcon";

const CustomContent = forwardRef(function CustomContent(props, ref) {
  const {classes, label, nodeId, icon: iconProp, expansionIcon, displayIcon, multiple} = props;
  const {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    handleSelection,
    preventSelection,
  } = useTreeItem(nodeId);
  const icon = iconProp || expansionIcon || displayIcon;
  const handleMouseDown = (event) => {
    preventSelection(event);
  };
  const handleExpansionClick = (event) => {
    handleExpansion(event);
  };
  const handleSelectionClick = (event) => {
    handleSelection(event);
  };

  return (
      <BoxLabelStyle
          className={`${classes.root} ${expanded ? [classes.expanded] : ''} ${selected ? [classes.selected] : ''} ${focused ? [classes.focused] : ''} ${disabled ? [classes.disabled] : ''}`}
          onMouseDown={handleMouseDown}
          ref={ref}
      >
        <div onClick={handleExpansionClick} className={classes.iconContainer}>
          {icon}
        </div>
        <LabelTextStyle onClick={handleSelectionClick} component="div" className={classes.label}>
          <span>{label}</span>
          {multiple && <Checkbox checked={selected} checkedIcon={<CheckboxIconChecked />} icon={<CheckboxIconDefault />} />}
        </LabelTextStyle>
      </BoxLabelStyle>
  );
});

const MuiTreeSelect = forwardRef((
    {
      value: selectValue,
      height = 44,
      multiple = false,
      options = [],
      placeholder = '',
      searchPlaceholder = 'Tìm kiếm',
      startIcon = null,
      sx = {},
      onChange,
      search = true,
      renderSelected,
      onClose,
      onDelete,
      allowClear = false,
      onClearValue,
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

  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const _selectRef = useRef();

  useImperativeHandle(ref, () => (_selectRef.current));

  const handleChangeSearch = (search) => {
    setSearchText(search);
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
  }

  const getSelectedItem = (val) => {
    let optionItem;
    optionItem = options.find(opt => opt.value === val);
    return optionItem || {value: val, label: val};
  }

  const getLabel = (val) => {
    const selectedItem = getSelectedItem(val);
    return selectedItem ? selectedItem.label : val;
  }

  const renderValue = (selected) => {
    if ((!multiple && (typeof selected === 'undefined' || selected === null || selected === '')) || (multiple && selected.length < 1)) {
      return <span className="placeholder">{placeholder || ''}</span>;
    }

    if (renderSelected) {
      return renderSelected(multiple ? selected.map(val => getSelectedItem(val)) : getSelectedItem(selected));
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
                  deleteIcon={<RemoveIcon onMouseDown={(event) => event.stopPropagation()}/>}
                  sx={{...ChipSelectStyle}}
                  variant="filled"
                  onDelete={() => onDelete(val)}
                />
          ))}
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

  const dataTree = useMemo(() => {
    return searchTree(convertFlatDataToTree(options), searchText);
  }, [options, searchText])

  function CustomTreeItem(props) {
    return <TreeItem ContentComponent={CustomContent} {...props} ContentProps={{
      multiple: multiple
    }} />;
  }

  const renderTree = (nodes) => {
    return (
        <CustomTreeItem
            value={nodes.value}
            key={nodes.value}
            nodeId={nodes.value}
            label={nodes.label}
            collapseIcon={Array.isArray(nodes.children) && <CollapseIcon/>}
            expandIcon={Array.isArray(nodes.children) && <ExpandIcon/>}
        >
          {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </CustomTreeItem>
    )
  };

  return (
      <Select
          ref={_selectRef}
          multiple={multiple}
          value={value}
          placeholder={placeholder}
          input={<OutlinedInput/>}
          displayEmpty={true}
          renderValue={(selected) => {
            return (
                <Box display="flex" alignItems="center" flexWrap="wrap">
                  {startIcon && (
                      <div className="select-icon" style={{marginRight: 8}}>
                        {startIcon}
                      </div>
                  )}
                  {renderValue(selected)}
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
                    <IconButton size={"small"} sx={{visibility: value ? "visible" : "hidden"}} onClick={() => onClearValue(name, "")}>
                      <CloseIcon />
                    </IconButton>
                  </InputAdornment>
              )
          }
          onOpen={() => setOpen(true)}
          onClose={(e) => {
            setOpen(false);
            setTimeout(() => {
             setSearchText('');
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
                        <SearchIcon/>
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

        <div className="select-list-options">
          <TreeViewStyle
              aria-label="single-select"
              selected={value}
              value={value}
              className='tree-item'
              defaultCollapseIcon={null}
              defaultExpandIcon={null}
              defaultEndIcon={null}
              defaultExpanded={[dataTree[0]?.value]}
              onNodeSelect={(e, value) => {
                handleClickItem(value);
              }}
          >
            {dataTree?.map((item) => renderTree(item, handleClickItem))}
          </TreeViewStyle>
        </div>
      </Select>
  )
});
export default MuiTreeSelect;