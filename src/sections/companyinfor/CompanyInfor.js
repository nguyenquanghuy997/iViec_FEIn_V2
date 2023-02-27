import ImgIcon from "../../assets/ImgIcon";
import TickIcon from "../../assets/TickIcon";
import CropImageAva from "./CropImageAva";
import CropImageBG from "./CropImageBG";
import DrawerEdit from "./edit/DrawerEdit";
import { useGetCompanyInfoQuery } from "@/sections/companyinfor/companyInforSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Typography, Grid, Divider } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Paper from "@mui/material/Paper";
import {
  FormProvider,
  useForm,
} from "react-hook-form";
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
            margin: "0 16px 24px 0",
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

  const EmptyImage = (itemData) => {
    const obj = [];
    let i = 0;
    while (i < 6 - (itemData?.length || 0)) {
      obj.push(
        <Box
          sx={{
            background: "#EFF3F6",
            borderRadius: "4px",
            height: 100,
            width: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ImgIcon />
        </Box>
      );
      i++;
    }

    return <>{obj}</>;
  };

  const renderDoubleText = (text, content, itemData) => {
    return (
      <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
        <Paper
          sx={{
            my: 1,
          }}
        >
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: "#5C6A82",
                  width: "160px",
                }}
              >
                {text}
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography
                sx={{ fontSize: 14, fontWeight: 400, color: "#172B4D" }}
              >
                {content}
              </Typography>

              <ImageList
                sx={{
                  maxWidth: "710px",
                  width: "100%",
                  my: 2,
                  overflow: "unset!important",
                }}
                cols={6}
                rowHeight={100}
              >
                {itemData?.map((item) => (
                  <ImageListItem
                    key={item.id}
                    sx={{
                      marginRight: "15px",
                    }}
                  >
                    <img
                      src={item.img}
                      srcSet={`${item.img}?w=
                                164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      style={{ borderRadius: "4Datapx" }}
                    />
                  </ImageListItem>
                ))}

                {itemData?.length < 5 ? <EmptyImage itemData={itemData} /> : ""}
              </ImageList>
            </Grid>
          </Grid>
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
          marginTop: "-6%",
          background: 'white'
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            mb: "28px", 
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
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: "600",
                color: "#393B3E",
                ml: 2,
                mr: 1,
                mt: "43px",
              }}
            >
              {Data?.name}
              <span style={{ marginLeft: "0.6em" }}>
                <TickIcon />
              </span>
            </Typography>

            <DrawerEdit dataForm={Data} />
          </Box>
        </Box>

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
        <Divider />

        {renderDoubleText(
          "Môi trường làm việc  :",
          Data?.workingEnvironment,
          Data?.workingEnvironmentImages
        )}

        <Divider />
        {renderDoubleText(
          "Giới thiệu công ty :",
          Data?.text,
          Data?.organizationImages
        )}
      </div>
    </FormProvider>
  );
}
