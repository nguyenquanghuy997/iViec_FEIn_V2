import {LogoHeader} from "@/components/BaseComponents";
import Page from "@/components/Page";
import GuestGuard from "@/guards/GuestGuard";
import {BoxWrapperStyle} from "@/sections/auth/style";
import UserActiveFailure from "@/sections/auth/user-activate/UserActiveFailure";
import {Box} from "@mui/material";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {useActiveInviteUserMutation} from "@/sections/organization/override/OverrideOrganizationSlice";
import UserInviteActiveSuccess from "@/sections/auth/user-invite-active/UserInviteActiveSuccess";

const UserInviteActivePage = () => {
    const [statusActiveUser, setStatusActiveUser] = useState(false);
    const router = useRouter();
    const { email, 'code-active': codeActive } = router.query;
    const [confirmInviteActive] = useActiveInviteUserMutation();

    const [, queryString = ""] = router.asPath.split("?");

    const queryObj = queryString.split("&").reduce((prev, curr) => {
        const [key, value] = curr.split("=");
        prev.set(key, value);
        return prev;
    }, new Map());

    useEffect(() => {
        async function fetchConfirmInviteActive() {
            if (email && codeActive) {
                try {
                    await confirmInviteActive({
                        email: decodeURIComponent(queryObj.get('email')),
                        token: decodeURIComponent(queryObj.get('codeActive'))
                    }).unwrap();
                    setStatusActiveUser(true);
                } catch (error) {
                    setStatusActiveUser(false);
                }
            }
        }
        fetchConfirmInviteActive();
    }, [email, codeActive]);

    return (
        <GuestGuard>
            <Page title="Kích hoạt tài khoản">
                <LogoHeader />
                <Box sx={{ ...BoxWrapperStyle }}>
                    <Box >
                        {statusActiveUser? <UserInviteActiveSuccess USER_NAME={decodeURIComponent(queryObj.get('email'))} token={decodeURIComponent(queryObj.get('codeActive'))} />:  <UserActiveFailure />}
                    </Box>
                </Box>
            </Page>
        </GuestGuard>
    );
};

export default UserInviteActivePage;
