import React, {useState} from 'react'
import {BoxItemStyle, BoxWrapperStyle} from "@/sections/connect/style";
import {CompanyLogo} from "@/sections/connect/ConnectIcon";
import {Box, Stack, Switch} from "@mui/material";

const ConnectItem = ({borderColor, isChecked = false, children}) => {

  const [checked, setChecked] = useState(isChecked)

  const handleChange = () => {
    setChecked(prev => !prev);
  }

  return (
      <BoxWrapperStyle>
        <BoxItemStyle borderColor={borderColor}>
          <Stack flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"} width={"100%"}>
            {/* Logo */}
            <CompanyLogo/>
            {/*  Switch  */}
            <Switch onChange={handleChange} defaultChecked={checked}/>
          </Stack>
        </BoxItemStyle>
        <Box>
          { checked && children }
        </Box>
      </BoxWrapperStyle>
  )
}

export default ConnectItem;