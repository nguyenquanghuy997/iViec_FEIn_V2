import {Box} from "@mui/material";
import {useTabContext} from "@mui/lab";

const TabPanel = ({children, value}) => {
    const {value: contextValue} = useTabContext() || {};
    return (
        <Box sx={{display: value === contextValue ? 'block' : 'none'}} key={value}>
            {children}
        </Box>
    );
}

export default TabPanel;