import TickIcon from "../../assets/TickIcon";
import CropImageAva from "./CropImageAva";
import CropImageBG from "./CropImageBG";
import DrawerEdit from "./edit/DrawerEdit";
import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import { useGetCompanyInfoQuery } from "@/sections/companyinfor/companyInforSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Typography, Divider } from "@mui/material";
import Paper from "@mui/material/Paper";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";

export default function CompanyInfor() {
  const { data: Data } = useGetCompanyInfoQuery();
  // const [updateImage] = useUpdateCompanyInfoMutation()
  const ProfileSchema = Yup.object().shape({
    avatar: Yup.string(),
  });
  const defaultValues = {
    avatar: Data?.avatar,
  };

  const methods = useForm({
    mode: "all",
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });
  const {
    // setValue,
    // setError,
    handleSubmit,
    // // watch,
    // formState: { errors, isSubmitting },
  } = methods;

  const renderText = (title, content) => {
    return (
      <div>
        <span
          style={{
            display: "inline-flex",
            fontSize: 14,
            fontWeight: 400,
            margin: "24px 16px 0 0",
            color: "#5C6A82",
            width: "160px",
          }}
        >
          {title}
        </span>

        <span
          style={{
            display: "inline-flex",
            fontSize: 14,
            fontWeight: 500,
            color: "#172B4D",
          }}
        >
          {content}
        </span>
      </div>
    );
  };

  
  const renderDoubleText = (text) => {
    return (
      <Box sx={{ flexGrow: 1, overflow: "hidden", mt: 3.5 }}>
        <Paper
          sx={{
            my: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 600,
              width: "160px",
            }}
          >
            {text}
          </Typography>
          <Typography sx={{mt:1, fontSize:'14px'}}>
            Đội ngũ lãnh đạo của Atlantic Group tin tưởng vào việc trao quyền
            cho các nhóm thực hiện công việc có tác động mạnh mẽ nhất của họ,
            bằng cách cam kết xây dựng một sản phẩm mà mọi người yêu thích và
            một nền văn hóa nơi mọi người đều có thể phát triển. Tìm hiểu họ bên
            dưới và tìm hiểu thêm trong Thư của những người sáng lập của... Xem
            thêm
          </Typography>
        </Paper>
      </Box>
    );
  };

  // const getBase64 = (file) =>
  //   new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = (error) => reject(error);
  //   });

  return (
    <FormProvider {...methods}>
      <CropImageBG data={Data?.coverPhoto} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingLeft: 40,
          paddingRight: 40,
          marginTop: "-4%",
          background: "white",
        }}
      >
        <Box
          sx={{
            display: "flex",
            // flexDirection: "row",
            // alignItems: "flex-end",
            // mb: "28px",
          }}
        >
          <CropImageAva data={Data?.avatar} handleSubmit={handleSubmit} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box sx={{ mt: 5 }}>
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: "700",
                  color: "#393B3E",
                  ml: 2,
                  mr: 1,
                  mt: "18px",
                }}
              >
                {/* {Data?.name } */}
                Tập đoàn Giáo dục và Đào tạo Quốc tế Đại Tây Dương (Atlantic
                Group)
                <span style={{ marginLeft: "0.6em" }}>
                  <TickIcon />
                </span>
                <HeaderBreadcrumbs
                  links={[
                    {
                      name: "CÔNG NGHỆ THÔNG TIN",
                    },
                    { name: "BẤT ĐỘNG SẢN" },
                  ]}
                />
              </Typography>
            </Box>

            <DrawerEdit dataForm={Data} />
          </Box>
        </Box>
  
        <Box sx={{ml: '135px', mb:3}}>
        <Divider />
        {renderText("Số điện thoại :", Data?.phoneNumber || "")}
        {renderText("Email :", Data?.email || "")}
        {renderText(
          "Ngành nghề :",
          Data?.jobCategories?.map((item) => item.name)
        )}
        {renderText("Quy mô :", Data?.organizationSize)}
        {renderText(
          "Địa chỉ :",
          `${Data?.address}, ${Data?.districtName}, ${Data?.provinceName}`
        )}

        {renderDoubleText(
          "Giới thiệu công ty ",
          Data?.text,
        )}
        </Box>
      </div>
    </FormProvider>
  );
}
