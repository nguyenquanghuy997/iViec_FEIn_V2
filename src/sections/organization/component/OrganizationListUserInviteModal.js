import {ButtonCancelStyle, DialogStyle} from "@/sections/organization/component/OrganizationInviteForm";
import {useGetListInviteUserQuery} from "@/sections/organization/override/OverrideOrganizationSlice";
import OrganizationDialogTitle from "@/sections/organization/component/OrganizationDialogTitle";
import {Box, DialogActions, DialogContent, Divider, Typography} from "@mui/material";
import React from "react";
import OrganizationUserInviteCard from "@/sections/organization/component/OrganizationUserInviteCard";

const OrganizationListUserInviteModal = ({ isOpenListUserInvite, setIsOpenListUserInvite }) => {
    const {data: {items: ListUserInvite = []} = {}, isLoading} = useGetListInviteUserQuery();

    if(isLoading) return null;

    return (
        <DialogStyle
            open={isOpenListUserInvite}
            onClose={() => setIsOpenListUserInvite(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className="dialog-invite"
        >
            <OrganizationDialogTitle onClose={() => setIsOpenListUserInvite(false)}>
                <Typography variant="body1" sx={{fontSize: '16px', fontWeight: 600, color: "#455570"}}>
                    Danh sách mời
                </Typography>
            </OrganizationDialogTitle>
            <Divider/>
            <DialogContent sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                padding: 3
            }}>
                <Box className="box-content-wrapper" sx={{width: '100%'}}>
                    {ListUserInvite.map((item, index) => {
                        return (
                            <OrganizationUserInviteCard
                                key={index}
                                item={item}
                            />
                        )
                    })}
                </Box>
            </DialogContent>
            <DialogActions sx={{padding: 2}}>
                <ButtonCancelStyle
                    onClick={() => setIsOpenListUserInvite(false)}
                    className="button-cancel">Hủy</ButtonCancelStyle>
            </DialogActions>
        </DialogStyle>
    )
}

export default OrganizationListUserInviteModal;