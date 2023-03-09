import {useState} from "react";
import {getRolesByPage} from "@/utils/role";
import {PAGES} from "@/config";
import SettingLayout from "@/layouts/setting";
import {Box} from "@mui/material";
import FormHeader from "@/sections/emailform/component/FormHeader";
import Page from "@/components/Page";
import CardEmailFormItem from "@/sections/emailform/component/CardEmailFormItem";
import ConfirmModal from '@/sections/emailform/component/ConfirmModal';
import ActiveModal from "@/sections/emailform/component/ActiveModal";
import FormModal from "@/sections/emailform/component/FormModal";

Account.getLayout = function getLayout({roles = []}, page) {
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
  {
    id: 2,
    title: 'Mẫu mail thông báo tài khoản 2',
    subtitle: '(Đã gửi 12)',
    user: 'Đinh Tiến Thành',
    isActive: false,
    createdDate: '17/02/2023',
  },
  {
    id: 3,
    title: 'Mẫu mail thông báo tài khoản 3',
    subtitle: '(Đã gửi 12)',
    user: 'Đinh Tiến Thành',
    isActive: false,
    createdDate: '17/02/2023',
  },
  {
    id: 4,
    title: 'Mẫu mail thông báo tài khoản 4',
    subtitle: '(Đã gửi 12)',
    user: 'Đinh Tiến Thành',
    isActive: false,
    createdDate: '17/02/2023',
  },
  {
    id: 5,
    title: 'Mẫu mail thông báo tài khoản 5',
    subtitle: '(Đã gửi 12)',
    user: 'Đinh Tiến Thành',
    isActive: false,
    createdDate: '17/02/2023',
  }
]

function Account() {

  const [expands, setExpands] = useState(Array(data.length).fill(false));
  // modal
  const [item, setItem] = useState(null);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isOpenActive, setIsOpenActive] = useState(false);

  // expand card item
  const handleChangeExpand = (index) => {
    const expandsNext = [...expands].map((item, idx) => idx === index ? !item : item)
    setExpands(expandsNext);
  };

  // handle delete
  const handleOpenConfirm = (data) => {
    setConfirmDelete(true);
    setItem(data);
  }

  const handleCloseConfirm = () => {
    setConfirmDelete(false);
    setItem(null);
  }

  const handleDelete = (data) => {
    console.log(data)
  }

  // handle active
  const handleOpenActiveModal = (data) => {
    setIsOpenActive(true);
    setItem(data);
  }

  const handleCloseActiveModal = () => {
    setIsOpenActive(false);
    setItem(null);
  }

  const handleActive = (data) => {
    console.log(data)
  }

  // handle form (add & update)
  const handleOpenForm = (data) => {
    setItem(data)
    setIsOpenForm(true);
  }

  const handleCloseForm = () => {
    setIsOpenForm(false);
    setItem(null)
  }


  return (
      <Page title="Mẫu email thông báo tài khoản">
        <Box>
          <FormHeader
              title="Email thông báo tài khoản"
              subtitle="Gửi tới Ứng viên khi Nhà tuyển dụng chuyển Ứng viên vào tin và thực hiện thao tác tuyển dụng đầu tiên."
              buttonTitle="Thêm mẫu email"
              onOpenForm={handleOpenForm}
          />
          {data.map((column, index) => {
            return <CardEmailFormItem
                key={index}
                index={index}
                item={column}
                expanded={expands[index]}
                onChangeExpand={() => handleChangeExpand(index)}
                onOpenConfirmDelete={handleOpenConfirm}
                onOpenActiveModal={handleOpenActiveModal}
                onOpenFormModal={handleOpenForm}
            />
          })}
        </Box>
        {confirmDelete && <ConfirmModal
            confirmDelete={confirmDelete}
            onCloseConfirmDelete={handleCloseConfirm}
            onSubmit={handleDelete}
            title="Xác nhận xóa mẫu email"
            subtitle="Bạn có chắc chắn muốn xóa mẫu email"
            item={item}
        />}
        {isOpenActive && <ActiveModal
            isOpenActive={isOpenActive}
            onCloseActiveModal={handleCloseActiveModal}
            onSubmit={handleActive}
            title={item.isActive ? "Tắt trạng thái áp dụng cho mẫu email" : "Bật trạng thái áp dụng cho mẫu email"}
            subtitle={item.isActive ? "Bạn có chắc chắn muốn tắt trạng thái áp dụng cho mẫu email" : "Bạn có chắc chắn muốn bật trạng thái áp dụng cho mẫu email"}
            item={item}
        />}
        {isOpenForm && <FormModal
            isOpen={isOpenForm}
            onClose={handleCloseForm}
            item={item}
            title={item?.id ? 'Chỉnh sửa mẫu email thông báo tài khoản' : 'Thêm mới mẫu email thông báo tài khoản'}
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

export default Account;