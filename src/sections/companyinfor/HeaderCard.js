import { Box, FormControlLabel, Switch, Typography } from "@mui/material";
import MuiButton from "@/components/BaseComponents/MuiButton";
import React from "react";
import useRole from "@/hooks/useRole";
import { useMemo } from "react";
import { PERMISSIONS } from "@/config";

const HeaderCard = ({ text, onOpen, checked, handleChange }) => {

  const { canAccess } = useRole();
  const canEdit = useMemo(() => canAccess(PERMISSIONS.EDIT_COMPANY), []);

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
      <Typography sx={{ m: "auto 0", fontSize: 16, fontWeight: 600 }}>
        {text}
      </Typography>
      {
        canEdit && <Box sx={{ display: 'flex' }}>
          <FormControlLabel
            control={<Switch
              color={"success"}
              checked={checked}
              onChange={handleChange}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: '#388E3C',
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: '#A5D6A7',
                },
              }}
            />}
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
      }
    </Box>
  );
};
export default HeaderCard;
