import {
  Typography,
  useTheme,
} from '@mui/material';
import DrawerEditForm from "@/components/drawer-edit-form";
import FilterFields from './filter-fields';

export default function FilterModal({
  columns = [],
  // onSubmit,
  ...props
}) {
  const { palette } = useTheme();

  const handleSubmit = () => {
    // console.log('data', data);
  }

  const DrawerContent = (formProps) => {
    return (
      <>
        <Typography
          variant="textSize13"
          component="p"
          color={palette.text.search}
          fontStyle="italic"
          sx={{ mb: 3 }}
        >
          Để thêm/bớt bộ lọc, vui lòng chọn cài đặt quản lý cột ở bảng dữ liệu
        </Typography>

        <FilterFields
          columns={columns}
          {...formProps}
        />
      </>
    )
  }

  return (
    <DrawerEditForm
      title="Bộ lọc"
      okText="Áp dụng"
      cancelText="Bỏ lọc"
      statusField="auto"
      activeText="Tự động"
      inActiveText="Tự động"
      // hideBackdrop={true}
      contentStyles={{ padding: '14px' }}
      modalStyles={{
        '.MuiModal-backdrop': {
          background: 'transparent',
        },
      }}
      onSubmit={handleSubmit}
      {...props}
    >
      <DrawerContent />
    </DrawerEditForm>
  )
}