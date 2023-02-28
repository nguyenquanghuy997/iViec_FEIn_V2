// import ImageUpload from "../ImageUpload";
import Image from "@/components/Image";
import {
  FormProvider,
  RHFBasicSelect,
} from "@/components/hook-form";
import {
  // useGetBranchByIdMutation,
  // useGetBranchByUserQuery,
  useGetJobCategoriesQuery,
  // useLazyGetProvinceQuery,
  // useUpdateBranchMutation,
} from "@/sections/companyinfor/companyInforSlice";
import { LIST_BRANCH_SIZE } from "@/utils/formatString";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Alert, Grid } from "@mui/material";
import {
  Box,
  Typography,
  TextField,
  Divider,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import InputLabel from "@mui/material/InputLabel";
import { Input } from "antd";
import { React } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const FormCompanyInfor = ({ defaultValues, onFinish }) => {
  const { TextArea } = Input;
  const { data: { items: JobCategoryList = [] } = {} } =
    useGetJobCategoriesQuery();

  // const [introduce, setIntroduce] = useState(null);
  // const [environment, setEnvironment] = useState(null);

  const itemData = [
    {
      img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
      title: "Breakfast",
    },
    {
      img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
      title: "Burger",
    },
    {
      img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
      title: "Camera",
    },
    {
      img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
      title: "Coffee",
    },
  ];
  // form
  const ProfileSchema = Yup.object().shape({
    name: Yup.string(),
    city: Yup.number().required("Chưa chọn Tỉnh / Thành phố"),
    address: Yup.string().required("Chưa nhập Địa chỉ"),
    email: Yup.string()
      .email("Email không đúng định dạng")
      .required("Chưa nhập Email"),
    phone: Yup.string().required("Chưa nhập Số điện thoại"),
    type: Yup.number().required("Chưa chọn Nghành nghề"),
    size: Yup.string().required("Chưa chọn Quy mô nhân sự"),
    introduce: Yup.string().required("Chưa nhập Giới thiệu"),
    environment: Yup.string().nullable(),
  });

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(ProfileSchema),
  });

  const {
    // setValue,
    // setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const EmptyImage = () => {
    const obj = [];
    let i = 0;
    while (i < 6 - itemData.length) {
      // obj.push(<ImageUpload size={80} />);
      i++;
    }
    return <>{obj}</>;
  };

  const InputRow = ({ label, name }) => {
    return (
      <Grid item xs={6}>
        <FormControl variant="standard">
          <InputLabel
            shrink
            htmlFor="bootstrap-input"
            sx={{
              fontSize: 18,
              fontWeight: 500,
              color: "#5C6A82",
              position: "relative",
            }}
          >
            {label}
          </InputLabel>
          <TextField name={name} margin="none" required={true} />
        </FormControl>
      </Grid>
    );
  };

  return (
    <FormProvider
      methods={methods}
      // onSubmit={handleSubmit(onSubmit)}
    >
      {!!errors.afterSubmit && (
        <Alert severity="error">{errors.afterSubmit?.message}</Alert>
      )}

      <div
        style={{
          flex: 1,
          paddingLeft: "24px",
          paddingRight: "24px",
          borderRadius: 8,
          paddingBottom: 30,
          overflow: "hidden",
          background: "#fff",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            mb: "28px",
            mt: 2,
          }}
        >
          <Image
            disabledEffect
            visibleByDefault
            src={
              // formatRemoteUrl(Data.Logo || "/public/img/logoDefault.png")
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT99Ztd5x_8FTDUhAX0W1DYWXRUf4bvbFF61k7fTmo8awUu8stJIi9L6BzB13EHoxEt0bU&usqp=CAU"
            }
            sx={{
              width: 60,
              height: 60,
              borderRadius: 120,
              border: "3px solid #fff",
            }}
          />
          <Box
            sx={{
              pl: 2,
              width: "90%",
            }}
          >
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: "600",
                color: "#393B3E",
                mr: 1,
              }}
            >
              {/* {Data.BranchName} */}
              DỊCH VỤ VẬN CHUYỂN HÀNG ĐẦU VIỆT NAM J&T
            </Typography>
            <Typography sx={{ color: "#455570", fontSize: 12 }}>
              Để chỉnh sửa tên công ty, vui lòng liên hệ admin qua email
              Support@iviec.com.vn
            </Typography>
          </Box>
        </Box>

        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { mb: 2, width: "27.2ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <form onSubmit={handleSubmit} noValidate>
            <Grid container alignItems="flex-start" spacing={3}>
              <InputRow label="Số điện thoại" name="phone" />
              <InputRow label="Email" name="email" />
            </Grid>
          </form>
        </Box>

        <div style={{ display: "flex", flexDirection: "row" }}>
          <RHFBasicSelect
            name={"type"}
            label={"Ngành nghề"}
            placeholder={"Chọn ngành nghề"}
            options={JobCategoryList.map((i) => ({
              value: i.id,
              label: i.name,
            }))}
            sx={{ width: "27.2ch", mr: 3 }}
          />
          <RHFBasicSelect
            name={"size"}
            label={"Quy mô nhân sự"}
            placeholder={"Chọn quy mô nhân sự"}
            style={{ marginRight: 20 }}
            options={LIST_BRANCH_SIZE.map((i) => ({
              value: i.id,
              label: i.name,
            }))}
            sx={{ width: "27.2ch" }}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 24,
            marginBottom: 20,
          }}
        >
          <RHFBasicSelect
            name={"type"}
            label={"Tỉnh/Thành phố"}
            placeholder={"Chọn ngành nghề"}
            options={JobCategoryList.map((i) => ({
              value: i.id,
              label: i.name,
            }))}
            sx={{ width: "27.2ch", mr: 3 }}
          />
          <RHFBasicSelect
            name={"size"}
            label={"Quận/Huyện"}
            placeholder={"Chọn quy mô nhân sự"}
            style={{ marginRight: 20 }}
            options={LIST_BRANCH_SIZE.map((i) => ({
              value: i.id,
              label: i.name,
            }))}
            sx={{ width: "27.2ch" }}
          />
        </div>
        <Divider />

        <div style={{ marginTop: 24 }}>
          <span
            style={{
              color: "#5C6A82",
              fontSize: 14,
              display: "block",
              fontWeight: "500",
            }}
          >
            {"Môi trường làm việc"}
          </span>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <div>
              <FormControl sx={{ my: 1 }} variant="outlined">
                <TextArea
                  showCount
                  maxLength={150}
                  style={{ height: 180, resize: "none", marginBottom: "20px" }}
                  onChange={() => {}}
                />

                <ImageList
                  sx={{
                    maxWidth: "610px",
                    width: "100%",
                    overflow: "unset!important",
                  }}
                  cols={6}
                  rowHeight={80}
                >
                  {itemData.map((item) => (
                    <ImageListItem
                      key={item.title}
                      sx={{
                        marginRight: "10px",
                      }}
                    >
                      <img
                        src={item.img}
                        srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        style={{ borderRadius: "4px" }}
                      />
                    </ImageListItem>
                  ))}
                  {itemData.length < 5 ? <EmptyImage /> : ""}
                </ImageList>
              </FormControl>
            </div>
          </Box>
        </div>
        <Divider sx={{ pt: 3 }} />

        <div style={{ marginTop: 24, paddingBottom: 50 }}>
          <span
            style={{
              color: "#5C6A82",
              fontSize: 14,
              display: "block",
              fontWeight: "500",
            }}
          >
            {"Giới thiệu"}
          </span>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <div>
              <FormControl sx={{ my: 1 }} variant="outlined">
                <TextArea
                  showCount
                  maxLength={150}
                  style={{ 
                    height: 180, resize: "none", marginBottom: "20px", 
                  }}
                  onChange={() => {}}
                />
                
                <ImageList
                  sx={{
                    maxWidth: "615px",
                    width: "100%",
                    overflow: "unset!important",
                  }}
                  cols={6}
                  rowHeight={80}
                >
                  {itemData.map((item) => (
                    <ImageListItem
                      key={item.title}
                      sx={{
                        marginRight: "10px",
                      }}
                    >
                      <img
                        src={item.img}
                        srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        style={{ borderRadius: "4px" }}
                      />
                    </ImageListItem>
                  ))}

                  {itemData.length < 5 ? <EmptyImage /> : ""}
                </ImageList>
              </FormControl>
            </div>
          </Box>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: 12,
          position: "fixed",
          bottom: 0,
          background: "#FDFDFD",
          width: "100%",
          padding: "16px 24px",
          border: "1px solid #EFF3F6",
        }}
      >
        <LoadingButton
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{ backgroundColor: "#1976D2", p: 1, fontSize: 14 }}
        >
          {"Lưu"}
        </LoadingButton>
        <div style={{ width: 8 }} />

        <LoadingButton
          variant="text"
          onClick={onFinish}
          sx={{ color: "#455570" }}
        >
          {"Hủy"}
        </LoadingButton>
      </div>
    </FormProvider>
  );
};
export default FormCompanyInfor;
