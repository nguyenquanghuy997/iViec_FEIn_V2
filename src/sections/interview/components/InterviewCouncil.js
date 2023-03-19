import PlusIcon from "../../../assets/interview/PlusIcon";
import DeleteIcon from "@/assets/interview/DeleteIcon";
import { Typography,FormControl, Box, Button, Card,MenuItem } from "@mui/material";
import Popover from "@mui/material/Popover";
// import _without from "lodash/without";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import React, { useState } from "react";

const InterviewCouncil = ({value}) => {
  const names = [
    {
      id: "gary",
      name: "Đinh Tiến Thành",
      phone: "0987655345",
    },
    {
      id: "cato",
      name: "Đỗ Ánh Tuyết",
      phone: "0987655345",
    },
    {
      id: "kvn",
      name: "Trần Văn Linh",
      phone: "0987655345",
    },
    {
      id: "mooncake",
      name: "Đào Duy Tùng",
      phone: "0987655345",
    },
    {
      id: "quinn",
      name: "Doãn Trung Kiên",
      phone: "0987655345",
    },
  ];

  const [checked, setChecked] = useState([]);
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  const dataCandidate = names.filter((item) => checked.includes(item.id));
  // const handleDelete = (e, value) => {
  //   setChecked((current) => _without(current, value));
  // };

  return (
    value == 1 ?
    <Box sx={{ p: 3 }}>
      <Typography sx={{ fontSize: "14px", fontWeight: "600", mb: 3 }}>
        Hội đồng phỏng vấn
      </Typography>
      <div style={{ width: "100%" }}>
        <PopupState variant="popover" popupId="demo-popup-popover">
          {(popupState) => (
            <div>
              <Button
                variant="outlined"
                sx={{ width: "100%", mb: 3, textTransform: "none" }}
                startIcon={<PlusIcon />}
                {...bindTrigger(popupState)}
              >
                Thêm hội đồng
              </Button>
              <Popover
                {...bindPopover(popupState)}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                {names.map((variant) => (
                  <MenuItem
                    key={variant.id}
                    value={variant}
                    sx={{
                      borderTop: `1px solid #EFF3F7`,
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    {" "}
                    <Box sx={{ display: "flex" }}>
                      <img
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "10px",
                        }}
                        src="https://i.pinimg.com/236x/c6/90/fe/c690fe74d48aa77c2ab0e5000131304a.jpg"
                      />
                      <Box sx={{ ml: 1 }}>
                        <Typography sx={{ fontSize: 13 }}>
                          {variant.name}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 13,
                            fontWeight: 400,
                            color: "#5C6A82",
                          }}
                        >
                          {variant.phone}
                        </Typography>
                      </Box>
                    </Box>
                    <FormControl component="fieldset">
                      <input
                        value={variant.id}
                        type="checkbox"
                        onChange={handleCheck}
                      />
                    </FormControl>
                  </MenuItem>
                ))}
              </Popover>
            </div>
          )}
        </PopupState>
      </div>
      {dataCandidate?.map(() => (
        <Card
          sx={{
            dispaly: "flex",
            background: "#F2F4F5",
            mb: 2,
            borderRadius: "6px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              margin: "13px",
              marginBottom: 0,
            }}
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "12px",
            }}
          >
            <Typography sx={{ fontSize: "13px", fontWeight: "500" }}>
              Giám đốc vận hành
            </Typography>
            <DeleteIcon />
          </div>
        </Card>
      ))}
    </Box>
    : <Box sx={{ p: 3 }}>
    <Typography sx={{ fontSize: "14px", fontWeight: "600", mb: 3 }}>
      Hội đồng phỏng vấn
    </Typography>
    </Box>
  );
};
export default InterviewCouncil;
