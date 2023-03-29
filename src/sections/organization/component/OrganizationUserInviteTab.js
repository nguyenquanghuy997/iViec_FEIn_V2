import {memo} from "react";
import {Box} from "@mui/material";
import OrganizationUserInviteCard from "@/sections/organization/component/OrganizationUserInviteCard";
import {useGetListInviteUserQuery} from "@/sections/organization/override/OverrideOrganizationSlice";

const OrganizationUserInviteTab = ({ onOpenConfirmForm, onOpenConfirmResend }) => {

  const {data: {items: ListUserInvite = []} = {}, isLoading: loadingUser} = useGetListInviteUserQuery();

  if (loadingUser) return <div>Loading...</div>

  return (
      <Box className="box-content-wrapper" sx={{width: '100%'}}>
        <Box sx={{width: '100%', padding: 2, mb: 2}}>
          {ListUserInvite.map((item, index) => {
            return (
                <OrganizationUserInviteCard
                    key={index}
                    item={item}
                    onOpenConfirmForm={() => onOpenConfirmForm(item)}
                    onOpenConfirmResend={() => onOpenConfirmResend(item)}
                />
            )
          })}
        </Box>
      </Box>
  )
}

export default memo(OrganizationUserInviteTab)