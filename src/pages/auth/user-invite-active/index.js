import {LogoHeader} from "@/components/BaseComponents";
import Page from "@/components/Page";
import {BoxWrapperStyle} from "@/sections/auth/style";
import UserActiveFailure from "@/sections/auth/user-activate/UserActiveFailure";
import {Box} from "@mui/material";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {useActiveInviteUserMutation} from "@/sections/organization/override/OverrideOrganizationSlice";
import UserInviteActiveSuccess from "@/sections/auth/user-invite-active/UserInviteActiveSuccess";
import LoadingScreen from "@/components/LoadingScreen";
import LogoOnlyLayout from "@/layouts/LogoOnlyLayout";
import useAuth from "@/hooks/useAuth";
import {PATH_AUTH} from "@/routes/paths";

UserInviteActivePage.getLayout = function getLayout(pageProps, page) {
    return <LogoOnlyLayout {...pageProps}>{page}</LogoOnlyLayout>
}

function UserInviteActivePage() {
    const { logout } = useAuth();
    const router = useRouter();
    const { email, 'code-active': codeActive } = router.query;
    const [confirmInviteActive, { isLoading }] = useActiveInviteUserMutation();

    const [statusActiveUser, setStatusActiveUser] = useState(false);
    const [, queryString = ""] = router.asPath.split("?");

    const queryObj = queryString.split("&").reduce((prev, curr) => {
        const [key, value] = curr.split("=");
        prev.set(key, value);
        return prev;
    }, new Map());

    useEffect(() => {
        async function handleLogout() {
            await logout();
        }
        handleLogout();
    }, [])

    useEffect(() => {
        async function fetchConfirmInviteActive() {
            if (email && codeActive) {
                try {
                    await confirmInviteActive({
                        email: decodeURIComponent(queryObj.get('email')),
                        token: decodeURIComponent(queryObj.get('code-active'))
                    }).unwrap();
                    setStatusActiveUser(true);
                } catch (error) {
                    const { data } = error;
                    if (data?.code === 'TK_04') {
                        setStatusActiveUser(true);
                        return;
                    }
                    if (data?.code === 'TK_03') {
                        return router.push(PATH_AUTH.login);
                    }
                    setStatusActiveUser(false);
                }
            }
        }
        fetchConfirmInviteActive();
    }, [email, codeActive]);

    if (isLoading) {
        return <LoadingScreen />
    }

    return (
        <Page title="Kích hoạt tài khoản">
            <LogoHeader />
            <Box sx={{ ...BoxWrapperStyle }}>
                <Box >
                    {statusActiveUser ? <UserInviteActiveSuccess
                        USER_NAME={decodeURIComponent(queryObj.get('email'))}
                        token={decodeURIComponent(queryObj.get('code-active'))}
                    /> : <UserActiveFailure statusActiveUser={statusActiveUser} />}
                </Box>
            </Box>
        </Page>
    );
}

export default UserInviteActivePage;
