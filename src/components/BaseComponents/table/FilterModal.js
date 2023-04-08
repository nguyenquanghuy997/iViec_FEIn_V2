import { useEffect, useRef } from 'react';
import {
  Typography,
  useTheme,
} from '@mui/material';
import DrawerEditForm from "@/components/drawer-edit-form";
import FilterFields from './filter-fields';
import { toRequestFilterData } from '@/utils/helper';

export default function FilterModal({
  columns = [],
  onSubmitFilter,
  ...props
}) {
  const handleSubmit = (data, isReset = false) => {
    /* eslint-disable */
    const { auto, ...reqData } = data;
    /* eslint-enable */
    onSubmitFilter(toRequestFilterData(reqData), isReset, isReset ? 100 : 0);
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
      onSubmit={(data) => {
        handleSubmit(data, false);
      }}
      defaultValues={{
        auto: false,
      }}
      resetOnClose={false}
      cancelCallback={() => {
        handleSubmit({}, true);
      }}
      {...props}
    >
      <DrawerContent
        open={props.open}
        columns={columns}
        onSubmit={handleSubmit}
      />
    </DrawerEditForm>
  )
}

const DrawerContent = ({
  open,
  columns,
  onSubmit,
  ...formProps
}) => {
  const { palette } = useTheme();
  const { watch } = formProps;
  const _timeout = useRef();

  useEffect(() => {
    if (!open) {
      return;
    }

    const subsWatch = watch((data, { name, type }) => {
      if (type !== 'change') {
        return;
      }

      const { auto } = data;
      if (name === 'auto' || !auto) {
        return;
      }

      clearTimeout(_timeout.current);
      _timeout.current = setTimeout(() => {
        onSubmit(data);
      }, 500);
    });

    return () => {
      subsWatch.unsubscribe();
    }
  }, [open, watch]);

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