import DetailDialog from "./edit/DetailDialog";
import ViewSchedule from "./edit/ViewSchedule";
import {PERMISSIONS} from "@/config";
import useRole from "@/hooks/useRole";
import {FormCalendar} from "@/sections/interview/components/FormCalendar";
import {Card, Typography, useTheme} from "@mui/material";
import {CardContent} from "@mui/material";
import {Box} from "@mui/material";
import {useMemo} from "react";
import {useState} from "react";
import moment from "moment";
import "moment/locale/vi";

export default function InterviewSchedule({Data}) {
  const check = false;
  const [openForm, setOpenForm] = useState(false);
  const [setItem] = useState({});
  const [itemDialog, setItemDialog] = useState({});
  const {palette} = useTheme();
  const [openDialog, setOpenDialog] = useState(false);

  const {canAccess} = useRole();
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
    <>
      {Data?.result &&
        Object.entries(Data?.result).map(([key, item]) => <>
          <Card sx={{borderRadius: "6px", border: "none", p: 3}}>
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
                {item.length}
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
                <b>{moment(key).locale("vi").format("dddd DD/MM/yyyy")}</b>
              </Typography>
            </CardContent>

            {
              item.map((p) => (
                <ViewSchedule
                  key={p.id}
                  data={p}
                  check={check}
                  handleClick={handleClick}
                  handleClickDialog={handleClickDialog}
                />
              ))
            }
            {openForm && (
              <FormCalendar open={openForm} data={item} setOpen={setOpenForm}/>
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
        </>)
      }
    </>
  );
}
