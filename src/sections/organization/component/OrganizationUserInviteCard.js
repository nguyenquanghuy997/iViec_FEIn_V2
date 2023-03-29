import React from 'react'
import {IconButton, Stack, Typography} from "@mui/material";
import {BoxFlex} from "@/sections/emailform/style";
import {AvatarDS} from "@/components/DesignSystem";
import {
  CardUserFormItemContentStyle,
  CardUserFormItemTitleStyle,
  CardUserStyle
} from "@/sections/organizationdetail/style";
import {STYLE_CONSTANT as style} from "@/theme/palette";
import MuiButton from "@/components/BaseComponents/MuiButton";
import {ReloadIcon} from "@/sections/organization/component/Icon";
import {DeleteIcon} from "@/assets/ActionIcon";

const OrganizationUserInviteCard = (
    {
      item,
      onOpenConfirmForm,
      onOpenConfirmResend
    }) => {
  return (
      <CardUserStyle className="card-user-item">
        <BoxFlex alignItems={"flex-start"}>
          <CardUserFormItemTitleStyle className="card-user-item-title">
            <AvatarDS
                sx={{height: "40px", width: "40px", borderRadius: "10px", fontSize: "10px"}}
                name={`${item?.fullName ? item?.fullName : ''}`}
            />
            <Stack>
              <Typography sx={{
                color: style.COLOR_TEXT_BLACK,
                fontSize: style.FONT_SM,
                fontWeight: style.FONT_SEMIBOLD
              }}>
                {`${item?.fullName ? item?.fullName : ''}`}
              </Typography>
              <Typography
                  className="card-user-item-subtitle"
                  component="span">
                {`${item.email ? item.email : ''} ${item.phoneNumber ? item.phone : ''}`}
              </Typography>
            </Stack>
          </CardUserFormItemTitleStyle>
          <MuiButton
              title={"Gửi lại yêu cầu active tài khoản"}
              color={"basic"}
              onClick={onOpenConfirmResend}
              startIcon={<ReloadIcon/>}
              sx={{
                color: '#1976D2',
                fontSize: 12,
                fontWeight: 600,
                pr: 0,
                "&:hover": {
                  backgroundColor: 'transparent',
                  boxShadow: 'none'
                }
              }}
          />
        </BoxFlex>
        <BoxFlex>
          <BoxFlex>
            <CardUserFormItemContentStyle className="card-user-item-content-text">
              Giám đốc nhân sự
            </CardUserFormItemContentStyle>
          </BoxFlex>
          <BoxFlex>
            <IconButton size='small' sx={{color: '#5C6A82', ml: 2}} onClick={onOpenConfirmForm}>
              <DeleteIcon width={13} height={13} fill={"#5C6A82"} />
            </IconButton>
          </BoxFlex>
        </BoxFlex>
      </CardUserStyle>
  )
}

export default React.memo(OrganizationUserInviteCard);