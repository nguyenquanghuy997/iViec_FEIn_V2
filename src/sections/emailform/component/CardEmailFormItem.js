import React from 'react'
import {AccordionDetails, AccordionSummary, Box, Checkbox, IconButton, Stack, Typography} from "@mui/material";
import Iconify from "@/components/Iconify";
import {
  BoxFlex,
  CardEmailFormItemContentStyle,
  CardEmailFormItemStyle, CardEmailFormItemSubTitleStyle,
  CardEmailFormItemTitleStyle
} from "@/sections/emailform/style";
import {AvatarDS} from "@/components/DesignSystem";
import {ActionSwitchCheckedIcon, ActionSwitchUnCheckedIcon} from "@/sections/organization/component/Icon";
import {EditIcon} from "@/assets/ActionIcon";
import {CheckboxIconChecked, CheckboxIconDefault} from "@/assets/CheckboxIcon";

const CardEmailFormItem = ({isCheckbox, expanded, checked, onChangeSelected, onChangeExpand, index, item, onOpenConfirmDelete, onOpenActiveModal, onOpenFormModal}) => {
  return (
      <CardEmailFormItemStyle
          className="card-email-item"
          expanded={expanded}
      >
        <AccordionSummary
            expandIcon={
              <IconButton size="small" onClick={onChangeExpand}>
                <Iconify icon="material-symbols:keyboard-arrow-down-sharp"/>
              </IconButton>
            }
            aria-controls={`panel${index}a-content`}
            id={`panel${index}a-header`}
        >
          <BoxFlex>
            <BoxFlex justifyContent="flex-start">
              { isCheckbox && <Checkbox
                  value={item}
                  checked={checked}
                  onChange={onChangeSelected}
                  icon={<CheckboxIconDefault />}
                  checkedIcon={<CheckboxIconChecked />}
              /> }
              <AvatarDS
                  sx={{height: "40px", width: "40px", borderRadius: "10px", fontSize: "12px"}}
                  name={item.lastName}
              />
              <Stack>
                <CardEmailFormItemTitleStyle className="card-email-item-title">
                  {`${item.lastName} ${item.firstName}`}
                </CardEmailFormItemTitleStyle>
                <CardEmailFormItemSubTitleStyle className="card-email-item-subtitle">
                  {`${item.email} ${item.phoneNumber ? item.phoneNumber : ''}`}
                </CardEmailFormItemSubTitleStyle>
              </Stack>
            </BoxFlex>
            {item.isActive && <Typography sx={{color: '#388E3C', fontSize: 12, fontWeight: 500, mr: 7}}>Đang áp dụng</Typography>}
          </BoxFlex>
          <BoxFlex>
            <BoxFlex>
              <CardEmailFormItemContentStyle className="card-email-item-content-text">
                {item.user}
                <Typography component="span" className="card-email-item-content-subtext">
                  đã tạo ngày {item.createdDate}
                </Typography>
              </CardEmailFormItemContentStyle>
            </BoxFlex>
            <BoxFlex>
              <Box sx={{cursor: 'pointer'}} onClick={onOpenActiveModal}>
                {item.isActive ? <ActionSwitchCheckedIcon/> : <ActionSwitchUnCheckedIcon/>}
              </Box>
              <IconButton size='small' sx={{color: '#5C6A82', ml: 2}} onClick={onOpenFormModal}>
                <EditIcon/>
              </IconButton>
              <IconButton size='small' sx={{color: '#5C6A82', ml: 2}} onClick={onOpenConfirmDelete}>
                <Iconify icon='ci:trash-full' sx={{width: 18, height: 18}}/>
              </IconButton>
            </BoxFlex>
          </BoxFlex>
        </AccordionSummary>
        <AccordionDetails>
          Content
        </AccordionDetails>
      </CardEmailFormItemStyle>
  )
}

export default React.memo(CardEmailFormItem);