import { useState, useEffect } from 'react';
import {
  ButtonCancel,
  ButtonIcon,
  DialogModel,
} from "@/utils/cssStyles";
import { Button } from "@/components/DesignSystem";
import {
  Box,
  Divider,
  MenuList,
  MenuItem,
  FormControlLabel,
  Checkbox,
  DialogActions,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import Iconify from "@/components/Iconify";
import { getErrorMessage } from '@/utils/helper';

export default function ColumnsModal({
  open,
  onClose,
  columns = [],
  columnsVisible = {},
  useUpdateColumnsFunc,
}) {
  const { enqueueSnackbar } = useSnackbar();
  const [showColumns, setShowColumns] = useState({});

  const [updateColumns, { isLoading: updating }] = useUpdateColumnsFunc ? useUpdateColumnsFunc() : [undefined, {}];

  useEffect(() => {
    setShowColumns(columnsVisible);
  }, [columnsVisible]);

  const onChangeCheck = (e) => {
    const checked = e.target.checked;
    const targetId = e.target.name;
    setShowColumns({
      ...showColumns,
      [targetId]: checked,
    });
  };

  const handleUpdateColumns = async () => {
    if (!updateColumns) {
      return;
    }

    try {
      let reqColumns = {
        id: showColumns.id,
      };
      columns.map(col => {
        if (col.dataIndex !== 'id' && !col.fixed) {
          reqColumns[col.dataIndex] = (showColumns[col.dataIndex] || false);
        }
      });
      await updateColumns(reqColumns).unwrap();
      onClose();
    } catch (err) {
      enqueueSnackbar(getErrorMessage, { variant: 'error' });
    }
  };

  return (
    <DialogModel
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiPaper-root": {
          minWidth: "400px !important",
          overflow: 'hidden',
        },
      }}
    >
      <div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "unset",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 24px",
          }}
        >
          <div style={{ color: "#172B4D", fontWeight: 600 }}>Quản lý cột</div>
          <div>
            <ButtonIcon
              onClick={() => onClose()}
              icon={
                <Iconify
                  width={20}
                  height={20}
                  icon="ic:baseline-close"
                  color="#455570"
                />
              }
            ></ButtonIcon>
          </div>
        </Box>

        <Divider />

        <MenuList
          style={{
            overflowY: "auto",
            maxHeight: "calc(100vh - 200px)",
            padding: 16,
          }}
        >
          {columns.map((p, index) => (
            <MenuItem key={index} sx={{ padding: "2px 10px" }}>
              <FormControlLabel
                label={p.title}
                sx={{
                  "& .MuiFormControlLabel-label": {
                    color: "#172B4D",
                    fontWeight: 400,
                    fontSize: 14,
                  },
                }}
                control={
                  <Checkbox
                    checked={!!showColumns[p?.dataIndex]}
                    onChange={(e) => onChangeCheck(e)}
                    name={p.dataIndex?.toString()}
                    disabled={!!p.fixed}
                  />
                }
              />
            </MenuItem>
          ))}
        </MenuList>

        <DialogActions
          sx={{
            borderTop: "1px solid #E7E9ED",
            padding: "16px 24px !important",
          }}
        >
          <ButtonCancel
            tittle="Hủy"
            onClick={onClose}
          />

          <Button
            variant="contained"
            color="primary"
            height={36}
            onClick={handleUpdateColumns}
            loading={updating}
          >
            Áp dụng
          </Button>
        </DialogActions>
      </div>
    </DialogModel>
  )
}