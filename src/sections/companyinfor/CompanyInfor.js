import {RiCheckboxBlankCircleFill, RiImageFill} from "react-icons/ri";
import {Box, Divider, Typography} from "@mui/material";
import {get} from 'lodash';

import CropImageBackground from "./CropImage";
import EditInformation from "./edit/EditInformation";
import {useGetCompanyInfoQuery,} from "@/sections/companyinfor/companyInforSlice";
import {OrganizationSize} from "@/utils/enum";
import {BoxInfoStyle} from "@/sections/companyinfor/style";
import MuiButton from "@/components/BaseComponents/MuiButton";
import ReadMoreText from "@/components/ReadMoreText";
import React from "react";
import EmptyValue from "@/sections/companyinfor/components/EmptyValue";
import useModal from "@/sections/companyinfor/hooks/useModal";

const lengthText = "Nếu Tiên Nữ là điểm cực Đông thì An Bang chính là điểm cực Nam của quần đảo Trường Sa trong chuyến hải trình mà chúng tôi được đặt chân đến. Rời đảo Thuyền Chài C, con tàu Trường Sa 571 hướng mũi về điểm đảo An Bang nằm ở cực Nam quần đảo Trường Sa của Tổ quốc. An Bang đón chúng tôi khi những nụ cười của người lính ở đảo Thuyền Chài C vẫn còn nguyên trong tâm trí. Con tàu Trường Sa 571 neo cách đảo An Bang khoảng 2 hải lý. Nhìn từ xa, An Bang hiện lên với vẻ đẹp kỳ vĩ với những con sóng nối tiếp vỗ bờ, tung bọt trắng xóa; của gió, của bãi cát san hô chạy dài sát mép biển và cả màu xanh yên bình của những cây bàng vuông đang hồi sinh sau bão"

const renderText = (title, content) => {
  return (
      <Box sx={{mb: 3, "&:first-child": {mt: 3}}}>
        <Typography sx={{display: "inline-flex", fontSize: 13, fontWeight: 500, color: "#5C6A82", minWidth: "160px"}}>
          {title}
        </Typography>
        <Typography sx={{display: "inline-flex", fontSize: 13, fontWeight: 500, color: "#172B4D"}}>
          {content}
        </Typography>
      </Box>
  );
};
const renderItem = (title, content) => {
  return (
      <Box sx={{mb: 3, py: 3, "&:first-child": {mt: 3}}}>
        <Typography sx={{display: "inline-flex", fontSize: 16, fontWeight: 600, lineHeight: '24px', color: "#172B4D", mb: 1.5}}>
          {title}
        </Typography>
        {content ? <ReadMoreText text={content} /> : <EmptyValue sx={{ minHeight: '100%' }} text={"Hiện chưa nội dung giới thiệu công ty"} />}
      </Box>
  );
};

export default function CompanyInfor() {
  const {data: Data} = useGetCompanyInfoQuery();

  const { onOpen, onClose, isOpen } = useModal();

  return (
      <>
        {/* BG image */}
        <CropImageBackground
            data={get(Data, 'organizationInformation.coverPhoto')}
            size="cover"
        />
        {/* Avatar & name */}
        <BoxInfoStyle className={"box-info"}>
          <Box className={'box-image'}>
            {/* <CropImage data={Data?.organizationInformation?.avatar} /> */}
            {get(Data, 'organizationInformation.avatar') ? <img
                className={"avatar-image"}
                src={`http://103.176.149.158:5001/api/Image/GetImage?imagePath=${get(Data, 'organizationInformation.avatar')}`}
            /> : (
                <Box className={"avatar-image avatar-placeholder"}>
                  <RiImageFill color={"#8A94A5"} size={'1.25em'}/>
                </Box>
            )}
          </Box>
          <Box sx={{flex: 1, pl: 3}}>
            <Box sx={{mb: 3, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between'}}>
              <Box>
                <Typography sx={{fontSize: 18, fontWeight: 700, color: '#172B4D', lineHeight: '26px', mb: 1}}>
                  {get(Data, 'name') || 'Tập đoàn Giáo dục và Đào tạo Quốc tế Đại Tây Dương (Atlantic Group)'}
                </Typography>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <Typography sx={{color: "#455570", fontSize: "12px", fontWeight: 600, mr: 1.5}}>
                    CÔNG NGHỆ THÔNG TIN
                  </Typography>
                  <RiCheckboxBlankCircleFill size={5} color="#8A94A5"/>
                  <Typography sx={{color: "#455570", fontSize: "12px", fontWeight: 600, ml: 1.5}}>
                    BẤT ĐỘNG SẢN
                  </Typography>
                </Box>
              </Box>
              <Box>
                <MuiButton
                  color={"default"}
                  title={"Chỉnh sửa"}
                  sx={{ fontWeight: 500 }}
                  onClick={onOpen}
                />
              </Box>
            </Box>
            <Divider/>
            <Box>
              {renderText("Số điện thoại :", get(Data, 'organizationInformation.phoneNumber'))}
              {renderText("Email :", get(Data, 'organizationInformation.email'))}
              {renderText("Ngành nghề :", get(Data, 'organizationInformation.jobCategories')?.map(item => item?.name)?.join(', '))}
              {renderText("Quy mô :", OrganizationSize(get(Data, 'organizationInformation.organizationSize')))}
              {renderText("Địa chỉ :", <>
                    {get(Data, 'organizationInformation.address') && `${get(Data, 'organizationInformation.address')}, `}
                    {get(Data, 'organizationInformation.districtName') && `${get(Data, 'organizationInformation.districtName')}, `}
                    {get(Data, 'organizationInformation.provinceName') && `${get(Data, 'organizationInformation.provinceName')}`}
                  </>
              )}
              {/*{renderItem("Giới thiệu công ty", get(Data, 'organizationInformation.description'))}*/}
              {renderItem("Giới thiệu công ty", lengthText)}
            </Box>
          </Box>
        </BoxInfoStyle>
        {
          isOpen &&  <EditInformation open={isOpen} onClose={onClose} dataForm={Data}/>
        }
      </>
  );
}
