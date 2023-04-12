import DetailDialog from "./edit/DetailDialog";
import ViewSchedule from "./edit/ViewSchedule";
import { PERMISSIONS } from "@/config";
import useRole from "@/hooks/useRole";
import { FormCalendar } from "@/sections/interview/components/FormCalendar";
import { useTheme } from "@emotion/react";
import { Typography, Box, Card, CardContent } from "@mui/material";
import { useMemo } from "react";
import { useState } from "react";

export default function InterviewSchedule({ Data }) {

  const check = false;
  const { palette } = useTheme();
  const [openForm, setOpenForm] = useState(false);
  const [item, setItem] = useState({});
  const [itemDialog, setItemDialog] = useState({});

  const [openDialog, setOpenDialog] = useState(false);

  const { canAccess } = useRole();
  const canEdit = useMemo(() => canAccess(PERMISSIONS.CRUD_INTV_SCHE), []);

  const handleClick = (data) => {
    setOpenForm(true);
    setItem(data);
  };
  const handleClickDialog = (data) => {
    setOpenDialog(true);
    setItemDialog(data);
  };

  return (
    <Card sx={{borderRadius: "6px", border: "none", p: 3 }}>
      <CardContent sx={{ display: "flex", p: 0 }}>
        <Box
          sx={{
            borderRadius: "100%",
            bgcolor: " #1976D2",
            height: 40,
            width: 40,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mr: 2,
            color: "white",
          }}
        >
          {Data?.items.length}
        </Box>
    
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          color={palette.text.primary}
          variant={"subtitle2"}
        >
          {/* Thứ 4, Ngày 07/03/2023 (Hôm nay) */}
          Lịch phỏng vấn tháng 03
        </Typography>
      </CardContent>

      {Data?.items.map((item) => (
        <ViewSchedule
          key={item.id}
          data={item}
          check={check}
          handleClick={handleClick}
          handleClickDialog={handleClickDialog}
        />
      ))}
      {openForm && (
        <FormCalendar open={openForm} data={item} setOpen={setOpenForm} />
      )}
      {canEdit && openDialog && (
        <DetailDialog
          title="Chi tiết lịch phỏng vấn"
          open={openDialog}
          item={itemDialog}
          onClose={() => setOpenDialog(false)}
        />
      )}
    </Card>
  );
}
