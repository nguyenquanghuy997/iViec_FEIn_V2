import {getRolesByPage} from "@/utils/role";
import {PAGES} from "@/config";
import SettingLayout from "@/layouts/setting";
import {useState} from "react";
import Page from "@/components/Page";
import {Box} from "@mui/material";
import FormHeader from "@/sections/emailform/component/FormHeader";
import CardEmailFormItem from "@/sections/emailform/component/CardEmailFormItem";
import ConfirmModal from "@/sections/emailform/component/ConfirmModal";
import ActiveModal from "@/sections/emailform/component/ActiveModal";
import FormModal from "@/sections/emailform/component/FormModal";
import {useDispatch, useSelector} from "@/redux/store";
import {modalSlice} from "@/redux/common/modalSlice";

ScheduleLive.getLayout = function getLayout({roles = []}, page) {
  return (
      <SettingLayout roles={roles}>
        {page}
      </SettingLayout>
  );
};

// data
const data = [
  {
    id: 1,
    title: 'Mặc định',
    subtitle: '(Đã gửi 12)',
    user: 'Đinh Tiến Thành',
    isActive: true,
    createdDate: '17/02/2023',
  },
]

function ScheduleLive() {
  const [expands, setExpands] = useState(Array(data.length).fill(false));
  // modal redux
  const dispatch = useDispatch();
  const toggleFormModal = useSelector((state) => state.modalReducer.openForm);
  const toggleConfirm = useSelector((state) => state.modalReducer.openConfirm);
  const toggleActive = useSelector((state) => state.modalReducer.openActive);
  const item = useSelector((state) => state.modalReducer.data);
  const handleOpenModal = (data) => dispatch(modalSlice.actions.openModal(data));
  const handleOpenConfirm = (data) => dispatch(modalSlice.actions.confirmModal(data));
  const handleOpenActive = (data) => dispatch(modalSlice.actions.activeModal(data));
  const handleCloseModal = () => dispatch(modalSlice.actions.closeModal());
  // expand card item
  const handleChangeExpand = (index) => {
    const expandsNext = [...expands].map((item, idx) => idx === index ? !item : item)
    setExpands(expandsNext);
  };

  const handleDelete = (data) => {
    return data;
  }

  const handleActive = (data) => {
    return data;
  }

  return (
      <Page title="Email lịch phỏng vấn trực tiếp">
        <Box>
          <FormHeader
              title="Email lịch phỏng vấn trực tiếp"
              subtitle="Gửi tới Ứng viên khi Nhà tuyển dụng chuyển Ứng viên vào tin và thực hiện thao tác tuyển dụng đầu tiên."
              buttonTitle="Thêm mẫu email"
              onOpenModal={() => handleOpenModal(null)}
          />
          {data.map((column, index) => {
            return <CardEmailFormItem
                key={index}
                index={index}
                item={column}
                expanded={expands[index]}
                onChangeExpand={() => handleChangeExpand(index)}
                onOpenConfirmDelete={() => handleOpenConfirm(column)}
                onOpenActiveModal={() => handleOpenActive(column)}
                onOpenFormModal={() => handleOpenModal(column)}
            />
          })}
        </Box>
        {toggleConfirm && <ConfirmModal
            confirmDelete={toggleConfirm}
            onCloseConfirmDelete={handleCloseModal}
            onSubmit={handleDelete}
            title="Xác nhận xóa mẫu email"
            subtitle="Bạn có chắc chắn muốn xóa mẫu email"
            item={item}
        />}
        {toggleActive && <ActiveModal
            isOpenActive={toggleActive}
            onCloseActiveModal={handleCloseModal}
            onSubmit={handleActive}
            title={item.isActive ? "Tắt trạng thái áp dụng cho mẫu email" : "Bật trạng thái áp dụng cho mẫu email"}
            subtitle={item.isActive ? "Bạn có chắc chắn muốn tắt trạng thái áp dụng cho mẫu email" : "Bạn có chắc chắn muốn bật trạng thái áp dụng cho mẫu email"}
            item={item}
        />}
        {toggleFormModal && <FormModal
            isOpen={toggleFormModal}
            onClose={handleCloseModal}
            item={item}
            title={item?.id ? 'Chỉnh sửa mẫu email lịch phỏng vấn trực tiếp' : 'Thêm mới mẫu email lịch phỏng vấn trực tiếp'}
        />}
      </Page>
  )
}

export async function getStaticProps() {
  return {
    props: {
      roles: getRolesByPage(PAGES.Industry),
    },
  };
}

export default ScheduleLive;