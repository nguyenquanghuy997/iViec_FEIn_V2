import { useGetDetailCalendarsQuery } from "@/sections/interview/InterviewSlice";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Typography,
  ListItemText,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";

DetailDialog.propTypes = {
  title: PropTypes.node.isRequired,
  subheader: PropTypes.node,
  open: PropTypes.bool,
  actions: PropTypes.node,
  onClose: PropTypes.func,
};

export default function DetailDialog({
  item,
  title,
  subheader,
  open,
  onClose,
}) {
  const { data: DetailData } = useGetDetailCalendarsQuery({
    BookingCalendarId: item?.id,
  });
  const renderText = (title, content) => {
    return (
      <ListItem disableGutters sx={{ my: 1.5 }}>
        <span
          style={{
            fontSize: 14,
            fontWeight: 400,
            color: "#5C6A82",
            width: "160px",
          }}
        >
          {title}
        </span>

        <span
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: "#172B4D",
          }}
        >
          {content}
        </span>
      </ListItem>
    );
  };

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle
        sx={{ display: "flex", justifyContent: "space-between", p: 3 }}
      >
        {title}
        <Button onClick={onClose}>{subheader}</Button>
      </DialogTitle>
      <Divider />
      <List sx={{ px: 3, pt: 2.5 }}>
        <h3>{item?.name}</h3>
        {renderText(
          "Hình thức phỏng vấn:",
          DetailData?.interviewType == 0 ? "Online" : "Trực tiếp"
        )}
        {renderText(
          "Thời gian:",
          DetailData?.bookingCalendarGroups.map((item) => item?.interviewTime)
        )}
        {renderText("Loại phỏng vấn:", DetailData?.bookingCalendarGroups.map((item) => item?.interviewGroupType) == 0?'Phỏng vấn cá nhân' : 'Phỏng vấn nhóm' )}
        {renderText(
          "Số lượng ứng viên:",
          DetailData?.bookingCalendarGroups.length
        )}
        {renderText("Trạng thái:", DetailData?.recruitmentPipelineStateId)}
        {renderText("Lý do hủy:", DetailData?.removeReason)}
      </List>
      <Divider />
      <List sx={{ px: 3, pt: 2 }}>
        <Typography sx={{ color: "#455570", fontSize: 13, fontWeight: 600 }}>
          Danh sách ứng viên
        </Typography>
        <ListItem disableGutters>
          <ListItemAvatar>
            <img
              src="https://i.pinimg.com/236x/2e/13/99/2e139971c08795a9de247848cc2c3fd9.jpg"
              style={{ width: "60px", height: "60px" }}
            />
          </ListItemAvatar>
          <ListItemText primary="hey" />
          <ListItemText primary="15:00 - 18:00" />
          <ListItemText primary="Đồng ý tham gia" />
        </ListItem>
        <ListItem disableGutters>
          <ListItemAvatar>
            <img
              src="https://i.pinimg.com/236x/2e/13/99/2e139971c08795a9de247848cc2c3fd9.jpg"
              style={{ width: "60px", height: "60px" }}
            />
          </ListItemAvatar>
          <ListItemText primary="hey" />
          <ListItemText primary="15:00 - 18:00" />
          <ListItemText primary="Đồng ý tham gia" />
        </ListItem>
      </List>
      <Divider />
      <List sx={{ px: 3, pt: 2 }}>
        <Typography sx={{ color: "#455570", fontSize: 13, fontWeight: 600 }}>
          Hội đồng phỏng vấn
        </Typography>
        <ListItem disableGutters>
          <ListItemAvatar>
            <img
              src="https://i.pinimg.com/236x/b0/52/90/b0529099591d1f7f70732fa5e4f60e83.jpg"
              style={{ width: "60px", height: "60px" }}
            />
          </ListItemAvatar>
          <ListItemText primary="Nguyễn Văn Tuyền" />
        </ListItem>
        <ListItem disableGutters>
          <ListItemAvatar>
            <img
              src="https://i.pinimg.com/236x/b0/52/90/b0529099591d1f7f70732fa5e4f60e83.jpg"
              style={{ width: "60px", height: "60px" }}
            />
          </ListItemAvatar>
          <ListItemText primary="Nguyễn Văn Tuyền" />
        </ListItem>
        <ListItem disableGutters>
          <ListItemAvatar>
            <img
              src="https://i.pinimg.com/236x/b0/52/90/b0529099591d1f7f70732fa5e4f60e83.jpg"
              style={{ width: "60px", height: "60px" }}
            />
          </ListItemAvatar>
          <ListItemText primary="Nguyễn Văn Tuyền" />
        </ListItem>
        <ListItem disableGutters>
          <ListItemAvatar>
            <img
              src="https://i.pinimg.com/236x/b0/52/90/b0529099591d1f7f70732fa5e4f60e83.jpg"
              style={{ width: "60px", height: "60px" }}
            />
          </ListItemAvatar>
          <ListItemText primary="Nguyễn Văn Tuyền" />
        </ListItem>{" "}
        <ListItem disableGutters>
          <ListItemAvatar>
            <img
              src="https://i.pinimg.com/236x/b0/52/90/b0529099591d1f7f70732fa5e4f60e83.jpg"
              style={{ width: "60px", height: "60px" }}
            />
          </ListItemAvatar>
          <ListItemText primary="Nguyễn Văn Tuyền" />
        </ListItem>
      </List>
      <DialogActions
        sx={{
          position: "fixed",
          bottom: 30,
          borderRadius: "0 0 6px 6px",
          bgcolor: "white",
          width: "900px",
        }}
      >
        <Button autoFocus>Lưu</Button>
        <Button autoFocus>Hủy</Button>
      </DialogActions>
    </Dialog>
  );
}
