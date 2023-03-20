import React from 'react'
import {IconButton, Stack, Typography} from "@mui/material";
import Iconify from "@/components/Iconify";
import {BoxFlex} from "@/sections/emailform/style";
import {AvatarDS} from "@/components/DesignSystem";
import {EditIcon} from "@/assets/ActionIcon";
import {
    CardUserFormItemContentStyle,
    CardUserFormItemTitleStyle,
    CardUserStyle
} from "@/sections/organizationdetail/style";
import {STYLE_CONSTANT as style} from "@/theme/palette";

const OrganizationUserInviteCard = (
    {
        item,
        onOpenConfirmDelete,
        onOpenFormModal
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
                <Typography sx={{color: style.COLOR_SUCCESS, fontSize: style.FONT_XS, fontWeight: style.FONT_MEDIUM}}>
                    {!item.isActive ? 'Đang hoạt động' : 'Ngừng hoạt động'}
                </Typography>
            </BoxFlex>
            <BoxFlex>
                <BoxFlex>
                    <CardUserFormItemContentStyle className="card-user-item-content-text">
                        {/*Giám đốc nhân sự*/}
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

export default React.memo(OrganizationUserInviteCard);