import React, {useState} from "react";
import {TreeItemStyle, TreeViewStyle} from "@/sections/organization/style";
import {CollapseIcon, ExpandIcon} from "@/assets/ArrowIcon";
import {SearchInputStyle, TextFieldStyle} from "@/components/hook-form/style";
import {Box, InputAdornment, Popover} from "@mui/material";
import {convertFlatDataToTree} from "@/utils/function";
import Iconify from "@/components/Iconify";
import {DropdownIcon} from "@/sections/recruitment-create/component/icon/DropdownIcon";
const OrganizationTreeSelect = ({treeData, placeholder}) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const [equipmentItem, setEquipmentItem] = useState("");
  const [equipmentId, setEquipmentId] = useState("");
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const renderTree = (nodes) => {
    return (
        <TreeItemStyle
            key={nodes.id}
            nodeId={nodes.id}
            label={
              <div className={`tree-item-label`} style={{paddingLeft: 0, paddingRight: 16}}>
                <span className='tree-label-title'>{nodes.name}</span>
                {equipmentId === nodes.id && <Iconify color="#1e5ef3" icon="material-symbols:check" sx={{ width: 24, height: 24 }} />}
              </div>
            }
            collapseIcon={Array.isArray(nodes.children) && <CollapseIcon/>}
            expandIcon={Array.isArray(nodes.children) && <ExpandIcon/>}
        >
          {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </TreeItemStyle>
    )
  };

  return (
      <>
        <TextFieldStyle
            variant="standard"
            hiddenLabel
            name="equipmentItem"
            id="equipmentItem"
            placeholder={placeholder}
            value={equipmentItem}
            fullWidth
            sx={{
              input: {cursor: 'pointer'}
            }}
            inputProps={{readOnly: true}}
            onClick={handleClick}
            InputProps={{
              disableUnderline: true,
              endAdornment: (
                  <InputAdornment position="end" sx={{mr: 1.5}}>
                    <DropdownIcon />
                  </InputAdornment>
              )
            }}
        />
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            anchorPosition={{
              left: 0,
              top: 0
            }}
            PaperProps={{
              sx: {
                borderRadius: 0,
                width: '378px',
                "& ::-webkit-scrollbar": {
                  width: "4px",
                  borderRadius: '6px'
                },
                "& ::-webkit-scrollbar-track": {
                  background: "#EFF3F6"
                },
                "& ::-webkit-scrollbar-thumb": {
                  background: "#B9BFC9"
                },
                "& ::-webkit-scrollbar-thumb:hover": {
                  background: "#888"
                }
              }
            }}
        >
          <Box>
            <TextFieldStyle
                placeholder="Tìm kiếm..."
                fullWidth
                autoFocus
                sx={{...SearchInputStyle}}
                onKeyDown={(e) => e.stopPropagation()}
                InputProps={{
                  startAdornment: (
                      <InputAdornment position="start">
                        <Iconify icon={"ri:search-2-line"} color="#5c6a82"/>
                      </InputAdornment>
                  )
                }}
            />
            <TreeViewStyle
                aria-label="multi-select"
                defaultSelected={equipmentId}
                selected={equipmentId}
                defaultCollapseIcon={null}
                defaultExpandIcon={null}
                defaultEndIcon={null}
                onNodeSelect={(e, id) => {
                  setEquipmentId(id);
                  setEquipmentItem(e.target.innerText);
                }}
                sx={{
                  maxHeight: 400,
                  overflowY: "auto",
                }}
            >
              {convertFlatDataToTree(treeData)[0]?.children.map((item) => renderTree(item))}
            </TreeViewStyle>
          </Box>
        </Popover>
      </>
  )
}

export default OrganizationTreeSelect;