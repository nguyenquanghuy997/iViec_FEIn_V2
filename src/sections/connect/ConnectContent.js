import React, {useState} from 'react'
import {Box, Stack} from "@mui/material";
import ConnectTitle from "@/sections/connect/ConnectTitle";
import ConnectItem from "@/sections/connect/ConnectItem";

const ConnectContent = () => {

  const [isChecked] = useState(false);

  return (
      <Box>
        <Stack sx={{ mb: 4.5 }}>
          <ConnectTitle title="KẾT NỐI WEBSITE TUYỂN DỤNG NỘI BỘ" />
          <ConnectItem isChecked={isChecked} />
        </Stack>
        <Stack sx={{ mb: 4.5 }}>
          <ConnectTitle title="KẾT NỐI WEBSITE TUYỂN DỤNG BÊN NGOÀI" />
          <ConnectItem borderColor="#43A047" />
        </Stack>
      </Box>
  )
}

export default ConnectContent;