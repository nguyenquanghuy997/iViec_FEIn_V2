import TickIcon from "../../../public/assets/icons/company/TickIcon";
import CropImageAva from "./CropImageAva";
import CropImageBG from "./CropImageBG";
import ImageUpload from "./ImageUpload";
import DrawerEdit from "./edit/DrawerEdit";
import { useGetCompanyInfoQuery } from "@/sections/companyinfor/companyInforSlice";
import { Box, Typography } from "@mui/material";
import { Grid, Divider } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Paper from "@mui/material/Paper";

export default function CompanyInfor() {
  // const { data: { DataList: [Data = {}] = [] } = {} } =
  //   useGetBranchByUserQuery();
  const { data: Data } = useGetCompanyInfoQuery();
  console.log('company',Data)
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

  const EmptyImage = () => {
    const obj = [];
    let i = 0;
    while (i < 6 - itemData.length) {
      obj.push(<ImageUpload size={100} />);
      i++;
    }

    return <>{obj}</>;
  };

  const renderDoubleText = (text, content) => {
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
              {content.map((item) => (
                <>
                  <Typography
                    sx={{ fontSize: 14, fontWeight: 400, color: "#172B4D" }}
                  >
                    {item}
                  </Typography>
                  <br />
                </>
              ))}

              <ImageList
                sx={{
                  maxWidth: "710px",
                  width: "100%",
                  mb: 3,
                  overflow: "unset!important",
                }}
                cols={6}
                rowHeight={100}
              >
                {itemData.map((item) => (
                  <ImageListItem
                    key={item.title}
                    sx={{
                      marginRight: "15px",
                    }}
                  >
                    <img
                      src={item.img}
                      srcSet={`${item.img}?w=
                                164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      style={{ borderRadius: "4px" }}
                    />
                  </ImageListItem>
                ))}

                {itemData.length < 5 ? <EmptyImage /> : ""}
              </ImageList>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    );
  };

  return (
    <>
      <CropImageBG/>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingLeft: 40,
          paddingRight: 40,
          marginTop: "-6%",
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
          <CropImageAva />
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
              {/* {Data.BranchName} */}
              DỊCH VỤ VẬN CHUYỂN HÀNG ĐẦU VIỆT NAM J&T
              <span style={{ marginLeft: "0.6em" }}>
                <TickIcon />
              </span>
            </Typography>

            <DrawerEdit />
          </Box>
        </Box>

        {renderText("Số điện thoại :", Data?.phoneNumber || ["0858383316"])}
        {renderText("Email :", Data?.phoneNumber || ["Example@gmail.com"])}
        {renderText(
          "Ngành nghề :",
          Data?.phoneNumber || ["Công nghệ thông tin"]
        )}
        {renderText("Quy mô :", Data?.phoneNumber || ["2000 - 3000 nhân sự"])}
        {renderText(
          "Địa chỉ :",
          Data?.phoneNumber || ["Số 10 Phạm Văn Bạch, Cầu Giấy, Hà Nội"]
        )}
        <Divider />

        {renderDoubleText(
          "Môi trường làm việc  :",
          Data?.phoneNumber || [
            "HO Miền Bắc: Số 6 Quang Trung, phường Trần Hưng Đạo, Quận Hoàn Kiếm, Thành Phố Hà Nội.",
            "HO Miền Nam: Số 23 Lê Duẩn, Phường Bến Nghé, Quận 1, Thành Phố Hồ Chí Minh.",
          ]
        )}

        <Divider />
        {renderDoubleText(
          "Giới thiệu công ty :",
          Data?.phoneNumber || [
            "Techcombank mang sứ mệnh dẫn dắt hành trình số hóa của ngành tài chính, tạo động lực cho mỗi cá nhân, doanh nghiệp và tổ chức phát triển bền vững và bứt phá thành công.",
            "Được thành lập vào tháng 9 năm 1993 và có trụ sở chính tại Hà Nội, Techcombank là một trong những ngân hàng thương mại cổ phần lớn nhất tại Việt Nam và là một trong những tổ chức ngân hàng hàng đầu tại Châu Á. Chúng tôi có hơn 12.000 nhân viên và 9.6 triệu khách hàng bán lẻ và khách hàng doanh nghiệp tại Việt Nam. Mạng lưới rộng khắp của chúng tôi gồm 309 chi nhánh và phòng giao dịch trên 45 tỉnh thành. Techcombank là ngân hàng thương mại tư nhân đầu tiên tại Việt Nam gia nhập “câu lạc bộ tỷ đô” năm 2021, với lợi nhuận trước thuế (LNTT) đạt 23,2 nghìn tỷ đồng, tăng 47,1% so với 2020. Đây là năm thứ năm liên tiếp Techcombank ghi nhận lợi nhuận tăng trưởng hai chữ số. Ngân hàng cũng ghi nhận tốc độ tăng trưởng kép lợi nhuận trong giai đoạn 2016-2021 với mức kỷ lục 50%/năm.",
            "Kể từ năm 1993, Techcombank đã phát triển trở thành một ngân hàng đạt nhiều giải thưởng với tầm nhìn ‘Change Banking, Change Lives’. Từ nhiều năm nay, chúng tôi đã đứng ở vị trí tiên phong trong việc số hóa thị trường tài chính của Việt Nam. Điều khác biệt giữa Techcombank với các đối thủ cạnh tranh chính là Nhân tài. Nhân tài là một trong 3 trụ cột cơ bản mà chúng tôi hướng đến đầu tư trong 5 năm tới, cùng với Dữ liệu và Kỹ thuật số. Để hỗ trợ Nhân tài, chúng tôi đang ‘Paving New Paths’ bằng cách xác định Định vị Giá trị Cán bộ Nhân viên (EVP) là một tập hợp các thuộc tính duy nhất là giá trị mà nhân viên của chúng tôi có được để đổi lại các kỹ năng, năng lực và kinh nghiệm mà họ mang lại cho tổ chức .",
            "Bằng cách không ngừng truyền cảm hứng cho mỗi tài năng của chúng tôi để ‘Dare to Be a Greater You’, chúng tôi đặt mục tiêu trở thành ngân hàng số 1 Việt Nam với vốn hóa 20 tỷ USD.",
          ]
        )}
      </div>
    </>
  );
}
