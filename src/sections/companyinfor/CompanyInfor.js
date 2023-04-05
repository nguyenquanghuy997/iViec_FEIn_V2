import { Fragment } from 'react';
import {RiCheckboxBlankCircleFill, RiImageFill} from "react-icons/ri";
import {Box, Divider, Typography} from "@mui/material";
import {get} from 'lodash';

import CropImageBackground from "./CropImage";
import EditInformation from "./edit/EditInformation";
import {OrganizationSize} from "@/utils/enum";
import {BoxInfoStyle} from "@/sections/companyinfor/style";
import MuiButton from "@/components/BaseComponents/MuiButton";
import ReadMoreText from "@/components/ReadMoreText";
import EmptyValue from "@/sections/companyinfor/components/EmptyValue";
import useModal from "@/sections/companyinfor/hooks/useModal";

const renderText = (title, content) => {
  return (
      <Box sx={{mb: 3, "&:first-of-type": {mt: 3}}}>
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
      <Box sx={{mb: 3, py: 3, "&:first-of-type": {mt: 3}}}>
        <Typography sx={{display: "inline-flex", fontSize: 16, fontWeight: 600, lineHeight: '24px', color: "#172B4D", mb: 1.5}}>
          {title}
        </Typography>
        {content ? <ReadMoreText text={content} /> : <EmptyValue sx={{ minHeight: '100%' }} text={"Hiện chưa nội dung giới thiệu công ty"} />}
      </Box>
  );
};

export default function CompanyInfor({ data }) {

  const { onOpen, onClose, isOpen } = useModal();

  return (
      <>
        {/* BG image */}
        <CropImageBackground
            data={get(data, 'organizationInformation.coverPhoto')}
            size="cover"
        />
        {/* Avatar & name */}
        <BoxInfoStyle className={"box-info"}>
          <Box className={'box-image'}>
            {/* <CropImage data={Data?.organizationInformation?.avatar} /> */}
            {get(data, 'organizationInformation.avatar') ? <img
                className={"avatar-image"}
                src={`http://103.176.149.158:5001/api/Image/GetImage?imagePath=${get(data, 'organizationInformation.avatar')}`}
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
                  {get(data, 'name') || 'Tập đoàn Giáo dục và Đào tạo Quốc tế Đại Tây Dương (Atlantic Group)'}
                </Typography>
                <Box sx={{display: 'flex', alignItems: 'center', "& .circle-icon:last-child": { display: 'none' }}}>
                  {
                    get(data, 'organizationInformation.jobCategories')?.map((item, index) => (
                        <Fragment key={index}>
                          <Typography sx={{color: "#455570", fontSize: "12px", fontWeight: 600}}>
                            {get(item, 'name')}
                          </Typography>
                          <Typography className={"circle-icon"} sx={{mx: 1.5, lineHeight: 0}}>
                            <RiCheckboxBlankCircleFill size={5} color="#8A94A5"/>
                          </Typography>
                        </Fragment>
                    ))
                  }
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
              {renderText("Số điện thoại :", get(data, 'organizationInformation.phoneNumber'))}
              {renderText("Email :", get(data, 'organizationInformation.email'))}
              {renderText("Ngành nghề :", get(data, 'organizationInformation.jobCategories')?.map(item => item?.name)?.join(', '))}
              {renderText("Quy mô :", OrganizationSize(get(data, 'organizationInformation.organizationSize')))}
              {renderText("Địa chỉ :", <>
                    {get(data, 'organizationInformation.address') && `${get(data, 'organizationInformation.address')}, `}
                    {get(data, 'organizationInformation.districtName') && `${get(data, 'organizationInformation.districtName')}, `}
                    {get(data, 'organizationInformation.provinceName') && `${get(data, 'organizationInformation.provinceName')}`}
                  </>
              )}
              {renderItem("Giới thiệu công ty", get(data, 'organizationInformation.description'))}
            </Box>
          </Box>
        </BoxInfoStyle>
        {
          isOpen &&  <EditInformation open={isOpen} onClose={onClose} dataForm={data} />
        }
      </>
  );
}
