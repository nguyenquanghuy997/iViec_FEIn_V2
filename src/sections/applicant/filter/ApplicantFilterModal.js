import ApplicantFilterForm from "../modals/ApplicantFilterForm";
import Scrollbar from "@/components/Scrollbar";
import {Divider, Drawer, IconButton, Stack, Typography} from "@mui/material";
import PropTypes from "prop-types";
import {memo, useState} from "react";
import Iconify from "@/components/Iconify";
import {ButtonDS} from "@/components/DesignSystem";

ApplicantFilterModal.propTypes = {
  isOpen: PropTypes.bool,
  isEdit: PropTypes.bool,
  onClose: PropTypes.func,
  job: PropTypes.object,
  onSubmit: PropTypes.func,
};

function ApplicantFilterModal({
  columns,
  isOpen,
  isEdit,
  onClose,
  job,
  onSubmit,
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = (e) => {
    setIsScrolled(e.target.scrollTop > 10);
  };

  return (
    <Drawer
      open={isOpen}
      // onClose={onClose}
      anchor="right"
      PaperProps={{
        sx: { width: { xs: 1, sm: 560, md: 384 } },
        onScroll: handleScroll,
      }}
    >
        <Stack flexDirection='row' sx={{ px: 2, py: 2, alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="body1" sx={{ fontSize: '20px', fontWeight: 600, color: "#455570" }}>
            Bộ lọc
          </Typography>
          <IconButton size="small" onClick={onClose}>
            <Iconify icon="ic:baseline-close" />
          </IconButton>
        </Stack>
        <Scrollbar sx={{ zIndex: 9999, "& label": { zIndex: 0 } }}>
          <Divider />
          <Stack sx={{ py: 2 }}>
            <Typography variant="body2" sx={{ px: 2, fontSize: '13px', fontWeight: 400, fontStyle: 'italic', color: "#8A94A5" }}>
              Để thêm/bớt bộ lọc, vui lòng chọn cài đặt quản lý cột ở bảng dữ liệu
            </Typography>
            <Stack sx={{ pb: 3, px: 2 }}>
              <ApplicantFilterForm
                  columns={columns}
                  onClose={onClose}
                  isEdit={isEdit}
                  job={job}
                  onEditSubmit={onSubmit}
                  isScrolled={isScrolled}
              />
            </Stack>
          </Stack>
        </Scrollbar>
        <Divider />
        <Stack flexDirection='row' sx={{ px: 2, py: 2, alignItems: 'center', justifyContent: 'space-between' }}>
          <Stack flexDirection="row">
            <ButtonDS
                tittle="Áp dụng"

            />
            <ButtonDS
                tittle="Hủy"
                onClick={onClose}
                sx={{
                  marginLeft: 1,
                  backgroundColor: "white",
                  boxShadow: 'none',
                  color: "#455570",
                  "&:hover": {
                    backgroundColor: "white",
                    boxShadow: 'none',
                    color: "#455570",
                  }
                }}
            />
          </Stack>
        </Stack>
    </Drawer>
  );
}

export default memo(ApplicantFilterModal);
