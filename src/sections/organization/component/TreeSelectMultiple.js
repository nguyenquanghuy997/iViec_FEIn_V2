import {forwardRef, memo, useMemo, useState} from "react";
import {FormHelperText, Stack} from "@mui/material";
import {Controller, useFormContext} from "react-hook-form";
import {convertFlatDataToTree} from "@/utils/function";
import {LabelStyle, SearchInputStyle, SelectFieldStyle, TextFieldStyle, useStyles,} from '@/components/hook-form/style';
import {isEmpty} from "lodash";
import {CollapseIcon, ExpandIcon} from "@/assets/ArrowIcon";
import {searchTree} from "@/sections/organization/helper/DFSSearchTree";
import {TreeItem, useTreeItem} from "@mui/lab";
import ChipDS from "@/components/DesignSystem/ChipDS";
import {CloseIcon} from "@/theme/overrides/CustomIcons";
import {
    BoxLabelStyle,
    InputProps,
    LabelTextStyle,
    MenuProps,
    TreeViewStyle
} from "@/sections/dynamic-filter/TreeFilter";

const CustomContent = forwardRef(function CustomContent(props, ref) {
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

const renderValue = (options = [], selected, placeholder = '', handleDelete) => {
    return !isEmpty(selected)
        ? options.filter(option => selected.includes(option.id)).map((item) => {
            return <ChipDS
                key={item.id}
                label={item.name}
                clickable
                deleteIcon={
                    <CloseIcon
                        onMouseDown={(event) => event.stopPropagation()}
                    />
                }
                onDelete={() => handleDelete(item.id)}
            />
        })
        : placeholder;
}

function TreeMultiSelect({name, ...props}) {
    const {control} = useFormContext();
    const {options: treeData, isRequired, title, placeholder, ...other} = props;
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
        console.log(valueDelete)
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
                        renderValue={(selected) => renderValue(treeData, selected, placeholder, (item) => handleDelete(field, item))}
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
                    <FormHelperText sx={{color: "#FF4842", fontSize: 12, fontWeight: 400}}>{error?.message}</FormHelperText>
                </Stack>
            )}
        />
    );
}

export default memo(TreeMultiSelect);