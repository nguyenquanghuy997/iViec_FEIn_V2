// utils
import cssStyles from "@/utils/cssStyles";
import { Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";

const RootStyle = styled('div')(({ theme }) => ({
    ...cssStyles(theme).bgBlur(),
    boxShadow: "0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)",
    zIndex: theme.zIndex.appBar + 1,
    transition: theme.transitions.create(["width", "height"], { duration: theme.transitions.duration.shorter, }),
    backgroundColor: theme.palette.common.white,
    width: '100%',
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '1420px',
    margin: '0 auto',
    padding: theme.spacing(0, 3)
}));


const SubHeader = ({ children }) => {
    return (
        <RootStyle>
            <ToolbarStyle>
                {children}
            </ToolbarStyle>
        </RootStyle>
    )
}

export default SubHeader