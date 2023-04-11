import { forwardRef, useEffect, useRef, useImperativeHandle } from 'react';
import {
  Typography,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/router';
import DrawerEditForm from "@/components/drawer-edit-form";
import FilterFields from './filter-fields';
import { toRequestFilterData } from '@/utils/helper';
import { isEmpty } from 'lodash';

export default function FilterModal({
  columns = [],
  onSubmitFilter,
  ...props
}) {
  const _fields = useRef();

  const handleSubmit = (data, isReset = false) => {
    /* eslint-disable */
    let { auto, ...reqData } = data;
    /* eslint-enable */

    onSubmitFilter(
      toRequestFilterData(reqData),
      isReset,
      isReset ? 100 : 1
    );

    if (isReset && _fields.current) {
      _fields.current.reset();
    }
  }

  return (
    <DrawerEditForm
      title="Bộ lọc"
      okText="Áp dụng"
      cancelText="Bỏ lọc"
      statusField="auto"
      activeText="Tự động"
      inActiveText="Tự động"
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
      // variant="persistent"
      className="drawer-filter"
      width={400}
      {...props}
    >
      <DrawerContent
        ref={_fields}
        open={props.open}
        columns={columns}
        onSubmit={handleSubmit}
      />
    </DrawerEditForm>
  )
}

const DrawerContent = forwardRef(({
  open,
  columns,
  onSubmit,
  ...formProps
}, ref) => {
  const router = useRouter();
  const { query, isReady } = router;
  const { palette } = useTheme();
  const { watch, setValue } = formProps;
  const _timeoutChange = useRef();
  const _firstInit = useRef(true);

  useImperativeHandle(ref, () => ({
    reset: () => {
      let aryColNames = getColumnsNames();
      aryColNames.map(f => {
        setValue(f, '');
      });
    },
  }));

  const getColumnsNames = () => {
    let aryColNames = [];
    columns.map(col => {
      if (col.colFilters) {
        let { name = col.dataIndex } = col.colFilters || {};
        if (typeof name === 'string') {
          aryColNames.push(name);
        } else {
          aryColNames = aryColNames.concat(name);
        }
      }
    });
    return aryColNames;
  }

  // Refresh page keep values
  useEffect(() => {
    if (columns.length < 1 || !isReady || !_firstInit.current) {
      return false;
    }

    let aryColNames = getColumnsNames();

    if (isEmpty(query)) {
      aryColNames.map(f => {
        setValue(f, '');
      });
      _firstInit.current = false;
      return;
    }

    let queryValues = toRequestFilterData(query);
    for (let f in query) {
      if (aryColNames.includes(f)) {
        setValue(f, queryValues[f]);
      }
    }
    _firstInit.current = false;
  }, [isReady, columns]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const subsWatch = watch((watchData, { name, type }) => {
      if (type !== 'change') {
        return;
      }

      const { auto, ...data } = watchData;
      if (name === 'auto' || !auto) {
        return;
      }

      clearTimeout(_timeoutChange.current);
      _timeoutChange.current = setTimeout(() => {
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
})
