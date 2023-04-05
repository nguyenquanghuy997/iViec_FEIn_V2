import {Box, FormControlLabel, Switch, Typography} from "@mui/material";
import MuiButton from "@/components/BaseComponents/MuiButton";
import React from "react";

const HeaderCard = ({text, onOpen, checked, handleChange}) => {
  return (
      <Box
          sx={{
            background: "#FDFDFD",
            mt: 3,
            py: 2.5,
            px: 5,
            display: "flex",
            justifyContent: "space-between",
          }}
      >
        <Typography sx={{m: "auto 0", fontSize: 16, fontWeight: 600}}>
          {text}
        </Typography>
        <Box sx={{display: 'flex'}}>
          <FormControlLabel
              control={<Switch checked={checked} onChange={handleChange}/>}
              label={checked ? "Hiển thị" : "Không hiển thị"}
          />
          <Box>
            <MuiButton
                color={"default"}
                title={"Chỉnh sửa"}
                onClick={onOpen}
                sx={{ fontWeight: 500, height: '36px' }}
            />
          </Box>
        </Box>
      </Box>
  );
};
export default HeaderCard;
