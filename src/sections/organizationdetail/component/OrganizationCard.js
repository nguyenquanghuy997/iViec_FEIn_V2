import React from 'react'
import {Checkbox, IconButton, Stack, Typography} from "@mui/material";
import Iconify from "@/components/Iconify";
import {BoxFlex} from "@/sections/emailform/style";
import {AvatarDS} from "@/components/DesignSystem";
import {EditIcon} from "@/assets/ActionIcon";
import {CheckboxIconChecked, CheckboxIconDefault} from "@/assets/CheckboxIcon";
import {
  CardUserFormItemContentStyle,
  CardUserFormItemTitleStyle,
  CardUserStyle
} from "@/sections/organizationdetail/style";
import {STYLE_CONSTANT as style} from "@/theme/palette";

const OrganizationCard = (
    {
      isCheckbox,
      expanded,
      checked,
      onChangeSelected,
      item,
      onOpenConfirmDelete,
      onOpenFormModal
    }) => {
  return (
      <CardUserStyle
          className="card-user-item"
          expanded={expanded}
      >
        <BoxFlex alignItems={"flex-start"}>
          <CardUserFormItemTitleStyle className="card-user-item-title">
            {isCheckbox && <Checkbox
                value={item}
                checked={checked}
                onChange={onChangeSelected}
                icon={<CheckboxIconDefault/>}
                checkedIcon={<CheckboxIconChecked/>}
            />}
            <AvatarDS
                sx={{height: "40px", width: "40px", borderRadius: "10px", fontSize: "10px"}}
                name={`${item?.lastName ? item?.lastName : ''} ${item.firstName ? item.firstName : ''}`}
            />
            <Stack>
              <Typography sx={{
                color: style.COLOR_TEXT_BLACK,
                fontSize: style.FONT_SM,
                fontWeight: style.FONT_SEMIBOLD
              }}>
                {`${item?.lastName ? item?.lastName : ''} ${item.firstName ? item.firstName : ''}`}
              </Typography>
              <Typography
                  className="card-user-item-subtitle"
                  component="span">
                {`${item.email ? item.email : ''} ${item.phoneNumber ? item.phone : ''}`}
              </Typography>
            </Stack>
          </CardUserFormItemTitleStyle>
          <Typography sx={{color: style.COLOR_SUCCESS, fontSize: style.FONT_XS, fontWeight: style.FONT_MEDIUM}}>
            {item.isActive ? 'Đang hoạt động' : 'Ngừng hoạt động'}
          </Typography>
        </BoxFlex>
        <BoxFlex>
          <BoxFlex>
            <CardUserFormItemContentStyle className="card-user-item-content-text">
              Giám đốc nhân sự
            </CardUserFormItemContentStyle>
          </BoxFlex>
          <BoxFlex>
            <IconButton size='small' sx={{color: '#5C6A82', ml: 2}} onClick={onOpenFormModal}>
              <EditIcon/>
            </IconButton>
            <IconButton size='small' sx={{color: '#5C6A82', ml: 2}} onClick={onOpenConfirmDelete}>
              <Iconify icon='ci:trash-full' sx={{width: 18, height: 18}}/>
            </IconButton>
          </BoxFlex>
        </BoxFlex>
      </CardUserStyle>
  )
}

export default React.memo(OrganizationCard);