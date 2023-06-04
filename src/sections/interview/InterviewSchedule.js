import DetailDialog from "./edit/DetailDialog";
import ViewSchedule from "./edit/ViewSchedule";
import { PERMISSIONS } from "@/config";
import useRole from "@/hooks/useRole";
import { FormCalendar } from "@/sections/interview/components/FormCalendar";
import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";
import moment from "moment";
import "moment/locale/vi";
import { useMemo, useState } from "react";

export default function InterviewSchedule({Data}) {
  const check = false;
  const {palette} = useTheme();
  const [openForm, setOpenForm] = useState(false);
  const [itemSelect, setItemSelect] = useState({});
  const [itemDialog, setItemDialog] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  
  const {canAccess} = useRole();
  const canEdit = useMemo(() => canAccess(PERMISSIONS.CRUD_INTV_SCHE), []);
  
  const handleClick = (data) => {
    setOpenForm(true);
    setItemSelect(data);
  };
  
  const handleClickDialog = (data) => {
    setOpenDialog(true);
    setItemDialog(data);
  };
  
  const getTotalResult = () => {
    return Object.keys(Data?.result ?? {}).reduce((a, b) => {
      return a + Data?.result[b]?.length;
    }, 0);
  };
  
  const getDateFormat = (date) => {
    return `${
      moment(date).day() == 0
        ? "Chủ nhật"
        : "Thứ " + (parseInt(moment(date).day()) + 1)
    }, Ngày ${moment(date).format("DD/MM/yyyy")}`;
  };
  
  return (
    <>
      <Typography mb={2} fontSize={13} fontWeight={500}>
        {getTotalResult()} kết quả phù hợp
      </Typography>
      {Data?.result &&
        Object.entries(Data?.result).map(([key, item]) => (
          <>
            <Card
              sx={{
                borderRadius: "6px",
                border: "none",
                p: 3,
                mb: 2,
                boxShadow: "none",
              }}
            >
              <CardContent sx={{display: "flex", p: 0, pb: "12px"}}>
                {moment(key).format("DD/MM/yyyy") ==
                  moment(new Date()).format("DD/MM/yyyy") && (
                  <Box
                    sx={{
                      bgcolor: " #1976D2",
                      width: "40px",
                      height: "40px",
                      borderRadius: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: "16px",
                      fontWeight: 600,
                      fontSize: "18px",
                      color: "white",
                    }}
                  >
                    {moment(key).format("DD")}
                  </Box>
                )}

                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  color={palette.text.primary}
                  variant={"subtitle2"}
                >
                  <b>
                    {getDateFormat(key)}{" "}
                    {moment(key).format("DD/MM/yyyy") ==
                    moment(new Date()).format("DD/MM/yyyy")
                      ? "(Hôm nay)"
                      : ""}
                  </b>
                </Typography>
              </CardContent>
              
              {item.map((p, index) => (
                <>
                  <ViewSchedule
                    key={p.id}
                    data={p}
                    check={check}
                    isLastItem={index == item.length - 1}
                    handleClick={handleClick}
                    handleClickDialog={handleClickDialog}
                  />
                </>
              ))}
            </Card>
          </>
        ))}
      <FormCalendar open={openForm} data={itemSelect} setOpen={setOpenForm}/>
      {canEdit && (
        <DetailDialog
          title="Chi tiết lịch phỏng vấn"
          open={openDialog}
          item={itemDialog}
          onClose={() => setOpenDialog(false)}
        />
      )}
    </>
  );
}
