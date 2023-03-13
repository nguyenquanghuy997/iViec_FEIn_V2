import {useState} from "react";
import dynamic from "next/dynamic";
// mui
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
// component
import {View} from "@/components/FlexStyled";
import Content from "@/components/BaseComponents/Content";
import JobCreateHeader from "@/sections/recruitment-create/component/header/RecruitmentCreateHeader";
import JobCreateSubHeader from "@/sections/recruitment-create/component/header/RecruitmentCreateSubHeader";
import {BoxFlex} from "@/sections/emailform/style";
import RecruitmentCreateConfirmModal from "@/sections/recruitment-create/component/modal/RecruitmentCreateConfirmModal";
import {DraftIcon, OrangeAlertIcon, SendIcon} from "@/sections/recruitment-create/component/icon/HeaderIcon";

const RecruitmentInformation = dynamic(() => import('@/sections/recruitment-create/component/other/RecruitmentInformation'), {
    ssr: false,
})
const RecruitmentPipeLine = dynamic(() => import('@/sections/recruitment-create/component/other/RecruitmentPipeLine'), {
    ssr: false,
})
const RecruitmentChannel = dynamic(() => import('@/sections/recruitment-create/component/other/RecruitmentChannel'), {
    ssr: false,
})

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
            onSubmitApprove={handleSubmitApprove}
            style={{padding: '18px 0', boxShadow: 'none', borderBottom: '1px solid #E7E9ED'}}
        />
        <TabContext value={value}>
          <JobCreateSubHeader handleChange={handleChange}/>
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