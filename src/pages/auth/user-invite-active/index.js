import UserActiveSuccess from "@/sections/auth/user-activate/UserActiveSuccess";
import {LogoHeader} from "@/components/BaseComponents";
import Page from "@/components/Page";
import GuestGuard from "@/guards/GuestGuard";
import {BoxWrapperStyle} from "@/sections/auth/style";
import UserActiveFailure from "@/sections/auth/user-activate/UserActiveFailure";
import {Box} from "@mui/material";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {useActiveInviteUserMutation} from "@/sections/organization/override/OverrideOrganizationSlice";

const UserInviteActivePage = () => {
    const [statusActiveUser, setStatusActiveUser] = useState(false);
    const router = useRouter();
    const { email, 'code-active': codeActive } = router.query;
    const [confirmInviteActive] = useActiveInviteUserMutation();

    useEffect(() => {
        async function fetchConfirmInviteActive() {
            if (email && codeActive) {
                try {
                    await confirmInviteActive({
                        email: decodeURI(email),
                        token: decodeURI(codeActive)
                    }).unwrap();
                    setStatusActiveUser(true);
                } catch (error) {
                    setStatusActiveUser(false);
                    console.log('error.status', error)
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
                        {statusActiveUser? <UserActiveSuccess USER_NAME={decodeURI(email)} />:  <UserActiveFailure />}
                    </Box>
                </Box>
            </Page>
        </GuestGuard>
    );
};

export default UserInviteActivePage;
