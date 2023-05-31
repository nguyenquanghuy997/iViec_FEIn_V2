import MuiButton from "@/components/BaseComponents/MuiButton";
import { PERMISSIONS } from "@/config";
import useRole from "@/hooks/useRole";
import { Box, FormControlLabel, Switch, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useMemo } from "react";

const HeaderCard = ({ text, onOpen, checked, handleChange }) => {
  const theme = useTheme();
  const { canAccess } = useRole();
  const canEdit = useMemo(() => canAccess(PERMISSIONS.EDIT_COMPANY), []);

  return (
    <Box
      sx={{
        background: theme.palette.common.white,
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
      {canEdit && (
        <Box sx={{ display: "flex" }}>
          <FormControlLabel
            control={
              <Switch
                color={"success"}
                checked={checked}
                onChange={handleChange}
                sx={{
                  "& .MuiSwitch-switchBase": {
                    color: theme.palette.common.white,
                  },
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "#388E3C",
                  },
                  "& .MuiSwitch-thumb": {
                    boxShadow:
                      "0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)",
                  },
                  "& .MuiSwitch-switchBase + .MuiSwitch-track": {
                    backgroundColor: theme.palette.common.neutral200,
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "#A5D6A7",
                  },
                }}
              />
            }
            label={checked ? "Hiển thị" : "Không hiển thị"}
          />
          <Box>
            <MuiButton
              color={"default"}
              title={"Chỉnh sửa"}
              onClick={onOpen}
              sx={{
                fontWeight: 500,
                height: "36px",
                backgroundColor: theme.palette.common.neutral50,
              }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};
export default HeaderCard;
