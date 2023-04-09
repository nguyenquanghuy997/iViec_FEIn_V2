import { PERMISSIONS } from "@/config";
import DetailDialog from "./edit/DetailDialog";
import EditForm from "./edit/EditForm";
import ViewSchedule from "./edit/ViewSchedule";
import CloseIcon from "@/assets/CloseIcon";
import useRole from "@/hooks/useRole";
import { useGetCalendarQuery } from "@/sections/interview/InterviewSlice";
import { Typography, Box, Card, CardContent } from "@mui/material";
import { useMemo } from "react";
import { useState } from "react";

export default function InterviewSchedule() {
  const {data: Data} = useGetCalendarQuery();
  const check = false;
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
    <Card sx={{m: "140px 0", borderRadius: "6px", border: "none", p: 3}}>
      <CardContent sx={{display: "flex", p: 0}}>
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
          7
        </Box>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Thứ 4, Ngày 07/03/2023 (Hôm nay)
        </Typography>
      </CardContent>
      
      {Data?.items.map((item) => (
        <ViewSchedule
          key={item.id}
          id={item?.id}
          check={check}
          handleClick={handleClick}
          handleClickDialog={handleClickDialog}
        />
      ))}
      {openForm && (
        <EditForm
          open={openForm}
          item={item}
          setOpen={setOpenForm}
        />
      )}
      {canEdit && openDialog && (
        <DetailDialog
          subheader={<CloseIcon/>}
          title="Chi tiết lịch phỏng vấn"
          open={openDialog}
          item={itemDialog}
          onClose={() => setOpenDialog(false)}
        />
      )}
    </Card>
  );
}
