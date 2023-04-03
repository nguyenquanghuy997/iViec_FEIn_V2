import React, {memo, useMemo, useState} from "react";
import {FormHelperText, Stack} from "@mui/material";
import {Controller, useFormContext} from "react-hook-form";
import {convertFlatDataToTree} from "@/utils/function";
import {
    ChipSelectStyle,
    InputProps,
    LabelStyle,
    MenuProps,
    Placeholder,
    SearchInputStyle,
    SelectFieldStyle,
    TextFieldStyle,
    useStyles,
} from '@/components/hook-form/style';
import {isEmpty} from "lodash";
import {CollapseIcon, ExpandIcon} from "@/assets/ArrowIcon";
import {searchTree} from "@/sections/organization/helper/DFSSearchTree";
import {TreeItem, useTreeItem} from "@mui/lab";
import ChipDS from "@/components/DesignSystem/ChipDS";
import {BoxLabelStyle, LabelTextStyle, TreeViewStyle} from "@/components/dynamic-filter/style";

export const CustomContent = React.forwardRef(function CustomContent(props, ref) {
    const {classes, label, nodeId, icon: iconProp, expansionIcon, displayIcon} = props;
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
                <span style={{minWidth: '100%'}}>{label}</span>
            </LabelTextStyle>
        </BoxLabelStyle>
    );
});

function CustomTreeItem(props) {
    return <TreeItem ContentComponent={CustomContent} {...props} />;
}

const renderTree = (nodes) => {
    return (
        <CustomTreeItem
            value={nodes.id}
            key={nodes.id}
            nodeId={nodes.id}
            label={nodes.name}
            collapseIcon={Array.isArray(nodes.children) && <CollapseIcon/>}
            expandIcon={Array.isArray(nodes.children) && <ExpandIcon/>}
        >
            {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </CustomTreeItem>
    )
};

const renderOptions = (treeData, value, onChange) => {
    return (
        <TreeViewStyle
            aria-label="single-select"
            selected={value}
            className='tree-item'
            defaultCollapseIcon={null}
            defaultExpandIcon={null}
            defaultEndIcon={null}
            defaultExpanded={[treeData[0]?.id]}
            onNodeSelect={(e, id) => {
                onChange(id);
            }}
        >
            {treeData?.map((item) => renderTree(item, value))}
        </TreeViewStyle>
    )
}

const renderValue = (placeholder) => {
    return Placeholder(placeholder)
}

const renderChipsSelect = (options, value, onDelete) => {
    return !isEmpty(value) ? (
        <Stack flexDirection="row" flexWrap="wrap" justifyContent="flex-start">
            {options?.filter(option => value?.map(String)?.includes(option?.id))?.map((item, index) => {
                return <ChipDS
                    key={index}
                    sx={{...ChipSelectStyle, my: 1}}
                    label={item?.name}
                    size="small"
                    variant="filled"
                    onDelete={() => onDelete(item.id)}
                />
            })}
        </Stack>
    ) : null;
}

function TreeFilter({name, ...props}) {
    const {control} = useFormContext();
    const {options: treeData, isRequired, title, ...other} = props;
    const classes = useStyles();
    const [searchText, setSearchText] = useState("");
    const dataTree = useMemo(() => {
        return searchTree(convertFlatDataToTree(treeData), searchText);
    }, [treeData, searchText])

    const handleChange = (field, e) => {
        const index = field.value.indexOf(e);
        if (index === -1) {
            const newOptions = [...field.value, e];
            field.onChange(newOptions);
        }
        else {
            const newOptions = field.value.filter(item => item !== e);
            field.onChange(newOptions);
        }
    }

    const handleDelete = (field, valueDelete) => {
        const newOptions = field.value.filter(item => item !== valueDelete);
        field.onChange(newOptions);
    };

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={[]}
            render={({field, fieldState: {error}}) => (
                <Stack direction="column">
                    {title && <LabelStyle required={isRequired}>{title}</LabelStyle>}
                    <SelectFieldStyle
                        {...field}
                        displayEmpty
                        error={!!error}
                        renderValue={(selected) => renderValue(props.placeholder, selected)}
                        MenuProps={{...MenuProps, classes: {paper: classes.paper}}}
                        {...other}
                    >
                        {treeData?.length > 3 && (
                            <TextFieldStyle
                                placeholder="Tìm kiếm..."
                                fullWidth
                                autoFocus
                                InputProps={{...InputProps}}
                                sx={{...SearchInputStyle}}
                                onChange={(e) => setSearchText(e.target.value)}
                                onKeyDown={(e) => e.stopPropagation()}
                            />
                        )}
                        {renderOptions(dataTree, field.value, (e) => handleChange(field, e))}
                    </SelectFieldStyle>
                    {field.value && renderChipsSelect(treeData, field.value, (item) => handleDelete(field, item))}
                    <FormHelperText sx={{color: "#FF4842", fontSize: 12, fontWeight: 400}}>{error?.message}</FormHelperText>
                </Stack>
            )}
        />
    );
}

export default memo(TreeFilter);