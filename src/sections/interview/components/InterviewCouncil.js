import PlusIcon from "../../../assets/interview/PlusIcon";
import DeleteIcon from "@/assets/interview/DeleteIcon";
import {
  Typography,
  Box,
  Button,
  Card,
} from "@mui/material";

const InterviewCouncil = () => {
  const accounts = [
    { id: 1, mail: "Hóng Biến Siêu Tốc" },
    { id: 2, mail: "Ký sự đường phố" },
    { id: 3, mail: "Ký sự đường phố" },
    { id: 4, mail: "Ký sự đường phố" },
    { id: 5, mail: "Ký sự đường phố" },
    { id: 6, mail: "Ký sự đường phố" },
  ];
  return (
    <Box sx={{ p: 3 }}>
      <Typography sx={{ fontSize: "14px", fontWeight: "600", mb: 3 }}>
        Hội đồng phỏng vấn
      </Typography>
      <Button
        variant="outlined"
        sx={{ width: "100%", mb: 3,textTransform: 'none' }}
        startIcon={<PlusIcon />}
      >
        Thêm cán bộ
      </Button>
      {accounts.map(() => (
        <Card
          sx={{
            dispaly: "flex",
            background: "#F2F4F5",
            mb: 2,
            borderRadius: "6px",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "row", margin: "13px", marginBottom:0 }}
          >
            <img
              style={{
                width: 40,
                height: 40,
                marginRight: "16px",
                borderRadius: "11px",
              }}
              src="https://i.pinimg.com/236x/a7/f5/40/a7f540b5e119822ff15075600b1d22dd.jpg"
            />

            <div style={{}}>
              <Typography
                component="div"
                sx={{ fontSize: "13px", fontWeight: "600" }}
              >
                Nguyễn Thị Thanh Thủy
              </Typography>
              <Typography
                color="#455570"
                sx={{ fontSize: "12px", fontWeight: "400" }}
              >
                example@fpt.com.vn
              </Typography>
            </div>
          </div>
          <div style={{display:'flex', justifyContent:'space-between', padding:'12px'}}>
            <Typography
              sx={{ fontSize: "13px", fontWeight: "500" }}
            >
              Giám đốc vận hành
            </Typography>
            <DeleteIcon />
          </div>
        </Card>
      ))}
    </Box>
  );
};
export default InterviewCouncil;
