import {View} from "@/components/FlexStyled";
import Content from "@/components/BaseComponents/Content";
import React, {useState} from "react";
import JobCreateHeader from "@/sections/recruitment-create/component/header/RecruitmentCreateHeader";
import JobCreateSubHeader from "@/sections/recruitment-create/component/header/RecruitmentCreateSubHeader";
import TabContext from "@mui/lab/TabContext";
import {Stack, Typography} from "@mui/material";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {TabStyle} from "@/sections/recruitment-create/style";
import RecruitmentInformation from "@/sections/recruitment-create/component/infomation/RecruitmentInformation";
import {BoxFlex} from "@/sections/emailform/style";
import RecruitmentCreateConfirmModal from "@/sections/recruitment-create/component/modal/RecruitmentCreateConfirmModal";
import {DraftIcon, OrangeAlertIcon, SendIcon} from "@/sections/recruitment-create/component/icon/HeaderIcon";
import RecruitmentPipeLine from "@/sections/recruitment-create/component/pipeline/RecruitmentPipeLine";
import RecruitmentChannel from "@/sections/recruitment-create/component/channel/RecruitmentChannel";

const renderLabelTab = (title, subtitle) => {
  return (
      <Stack>
        <Typography sx={{fontSize: 14, fontWeight: 700, textTransform: 'none'}}>{title}</Typography>
        <Typography sx={{fontSize: 13, fontWeight: 500, textTransform: 'none'}}>{subtitle}</Typography>
      </Stack>
  )
}

const RecruitmentCreateContent = () => {
  // modal
  const [isOpenSaveDraft, setIsOpenSaveDraft] = useState(false);
  const [isOpenSubmitApprove, setIsOpenSubmitApprove] = useState(false);
  const [isOpenAlertBack, setIsOpenAlertBack] = useState(false);

  const [value, setValue] = useState('2');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmitSaveDraft = (data) => {
    console.log(data)
  }

  const handleSubmitApprove = (data) => {
    console.log(data)
  }

  return (
      <View>
        <JobCreateHeader
            setIsOpenSubmitApprove={setIsOpenSubmitApprove}
            setIsOpenSaveDraft={setIsOpenSaveDraft}
            onSubmitSaveDraft={handleSubmitSaveDraft}
            onSubmitApprove={handleSubmitApprove()}
            style={{padding: '18px 0', boxShadow: 'none', borderBottom: '1px solid #E7E9ED'}}
        />
        <TabContext value={value}>
          <JobCreateSubHeader
              style={{
                top: '140px',
                padding: '12px 0',
                boxShadow: 'none',
                borderBottom: '1px solid #E7E9ED',
                borderTop: '1px solid #E7E9ED',
              }}
          >
            <TabList onChange={handleChange} aria-label="lab API tabs example" sx={{
              "& .MuiTabs-indicator": {
                display: "none",
              },
            }}>
              <TabStyle
                  className="tab-item"
                  label={renderLabelTab('Thông tin tuyển dụng', 'Các thông tin về việc làm và yêu cầu tuyển dụng')}
                  value="1"/>
              <TabStyle
                  className="tab-item"
                  label={renderLabelTab('Quy trình tuyển dụng', 'Cài đặt quy trình tuyển dụng và các thiết lập tự động')}
                  value="2"/>
              <TabStyle
                  className="tab-item"
                  label={renderLabelTab('Kênh tuyển dụng', 'Đăng tin tuyển dụng lên các Jobsite bên ngoài để quản lý tập trung')}
                  value="3"/>
            </TabList>
          </JobCreateSubHeader>
          <Content>
            <View mt={'168px'}>
              <TabPanel value="1">
                <BoxFlex>
                  <RecruitmentInformation/>
                </BoxFlex>
              </TabPanel>
              <TabPanel value="2">
                <RecruitmentPipeLine />
              </TabPanel>
              <TabPanel value="3">
                <RecruitmentChannel />
              </TabPanel>
            </View>
          </Content>
        </TabContext>
        {
            isOpenSaveDraft && <RecruitmentCreateConfirmModal
                isOpen={isOpenSaveDraft}
                onClose={() => setIsOpenSaveDraft(false)}
                title={"Lưu nháp tin tuyển dụng"}
                subtitle={"Bạn có chắc chắn muốn lưu nháp tin tuyển dụng này?"}
                icon={<DraftIcon height={45} width={50} />}
                buttonTitle={"Lưu nháp"}
            />
        }
        {
            isOpenSubmitApprove && <RecruitmentCreateConfirmModal
                isOpen={isOpenSubmitApprove}
                onClose={() => setIsOpenSubmitApprove(false)}
                title={"Gửi phê duyệt tin tuyển dụng"}
                subtitle={"Bạn có chắc chắn muốn gửi phê duyệt tin tuyển dụng này?"}
                icon={<SendIcon />}
                buttonTitle={"Gửi phê duyệt"}
            />
        }
        {
            isOpenAlertBack && <RecruitmentCreateConfirmModal
                isOpen={isOpenAlertBack}
                onClose={() => setIsOpenAlertBack(false)}
                title={"Trở về danh sách tin tuyển dụng"}
                subtitle={"Các thao tác trước đó sẽ không được lưu, Bạn có chắc chắn muốn trở lại?"}
                icon={<OrangeAlertIcon />}
                buttonTitle={"Trở lại"}
            />
        }
      </View>
  )
}

export default RecruitmentCreateContent;