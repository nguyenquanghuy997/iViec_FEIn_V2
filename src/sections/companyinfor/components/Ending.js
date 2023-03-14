import HeaderCard from "../HeaderCard";
import { Box } from "@mui/material";
import { BoxContainer } from "./style";

const Ending = () => {
  return (
    <BoxContainer>
      <HeaderCard text="Lời kết" />
      <Box sx={{ background: "white", py: 2, px: 5 }}>
        <section class="notepaper" style={{background:'#F2F4F5'}}>
          <div className="author-quote">
            <div class="pull-left author-photo photo-a animated bounceInLeft"></div>
            <div class="pull-right quote-content">
              <div class="quote-text animated rotateInDownRight">
                Là thành viên thuộc Tập đoàn giáo dục hàng đầu Việt Nam,
                Atlantic Group hiện là một trong những nhà cung cấp dịch vụ giáo
                dục và du học có uy tín và được khách hàng yêu mến tại Việt Nam
                và Khu vực. Thành lập ngày 31/01/1997, khởi nguồn từ Trung tâm
                Dịch vụ giáo dục do 4 thành viên sáng lập cùng sản phẩm du học
                đầu tiên của Việt Nam mang tên “Trí tuệ Việt Nam – TTVN”, sản
                phẩm được coi là đặt nền móng cho sự phát triển của giáo dục tại
                Việt Nam. Sau 22 năm hoạt động, có hơn 15000 nhân viên chính
                thức với gần 200 văn phòng giao dịch tại 59 tỉnh thành thuộc gần
                90 chi nhánh.
              </div>
              <div class="quote-author animated lightSpeedIn">
                Tập đoàn Giáo dục và Đào tạo Quốc tế Đại Tây Dương (Atlantic
                Group)
              </div>
            </div>
          </div>
        </section>
      </Box>
    </BoxContainer>
  );
};
export default Ending;
