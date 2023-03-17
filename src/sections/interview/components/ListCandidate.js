import PlusIcon from "../../../assets/interview/PlusIcon";
import { DropDown } from "../components/DropDown";
import AddGroupForm from "./AddGroupForm";
import AdjustForm from "./AdjustForm";
import EditIcon from "@/assets/EditIcon";
import DeleteIcon from "@/assets/interview/DeleteIcon";
import MenuListIcon from "@/assets/interview/MenuListIcon";
import { FormProvider } from "@/components/hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Typography, Box, Card } from "@mui/material";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import Candidate from './Candidate'
import React,{useState} from "react";

const ListCandidate = ({ value }) => {
  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const ConnectSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email không đúng định dạng")
      .required("Email không được bỏ trống"),
    password: Yup.string()
      .min(6, "Mật khẩu cần tối thiểu 6 ký tự")
      .required("Mật khẩu không được bỏ trống"),
  });

  const defaultValues = {
    email: "",
    password: "",
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(ConnectSchema),
    defaultValues,
  });

  const {
    // setError,
    handleSubmit,
  } = methods;
  const onSubmit = async () => {};

  return (
    <Box sx={{ p: 3 }}>
      <Typography sx={{ fontSize: "14px", fontWeight: "600", mb: 3 }}>
        Danh sách ứng viên
      </Typography>
      {value == 1 ? (
        <>
          {/* <Button
            variant="outlined"
            sx={{ width: "100%", mb: 3,textTransform: 'none'}}
            startIcon={<PlusIcon />}
            onClick={}
          >
            Thêm ứng viên
          </Button> */}
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <DropDown />
          </FormProvider>
          {/* <div>
            {data ? (
              <Box>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checked}
                          onClick={() => setChecked(!checked)}
                        />
                      }
                      label="Điều chỉnh hàng loạt"
                    />
                  </FormGroup>
                  {checked ? (
                    <Button
                      sx={{ textTransform: "none" }}
                      onClick={() => setOpenForm(true)}
                    >
                      <AdjustIcon />
                      Điều chỉnh
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
                <DragCandidate />
              </Box>
            ) : (
              ""
            )}
          </div> */}
          <Candidate />
          {openForm && (
            <AdjustForm open={openForm} onClose={() => setOpenForm(false)} />
          )}
        </>
      ) : (
        <>
          <div style={{ border: "1px solid #f2f4f5", padding: "16px" }}>
            <Card
              sx={{
                dispaly: "flex",
                flexDirection: "row",
                boxShadow: "none",
                border: "none",
                mb: 2,
                borderRadius: "6px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                  <MenuListIcon />
                  <Box sx={{ display: "flex", ml: 1 }}>
                    <div>
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
                        15:00 - 19:00
                      </Typography>
                    </div>
                  </Box>
                </div>
                <div style={{ display: "flex" }}>
                  <Box sx={{ mr: 4 }}>
                    <EditIcon />
                  </Box>
                  <Box sx={{ mt: "2px" }}>
                    <DeleteIcon />
                  </Box>
                </div>
              </div>
            </Card>
            <Button
              variant="outlined"
              sx={{ width: "100%", mb: 3 }}
              startIcon={<PlusIcon />}
            >
              Thêm ứng viên
            </Button>
          </div>
          <Button
            variant="contained"
            sx={{
              width: "100%",
              my: 3,
              background: "#F3F4F6",
              color: "#455570",
              boxShadow: "none",
              "&:hover": {
                background: "#F3F4F6",
                color: "#455570",
                boxShadow: "none",
              },
            }}
            startIcon={<PlusIcon />}
            onClick={() => setOpen(true)}
          >
            Thêm nhóm
          </Button>
          {open && (
            <AddGroupForm
              open={open}
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
            />
          )}
        </>
      )}
    </Box>
  );
};
export default ListCandidate;
