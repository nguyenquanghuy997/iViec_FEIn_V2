import {
  CheckboxIconChecked,
  CheckboxIconDefault,
} from "@/assets/CheckboxIcon";
import { AvatarDS } from "@/components/DesignSystem";
import Iconify from "@/components/Iconify";
import {
  BoxFlex,
  CardFormItemContentStyle,
  CardFormItemStyle,
  CardFormItemTitleStyle,
} from "@/sections/emailform/style";
import {
  ActionSwitchCheckedIcon,
  ActionSwitchUnCheckedIcon,
} from "@/sections/organization/component/Icon";
import { ButtonIcon, TextElipsis } from "@/utils/cssStyles";
import {
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import moment from "moment/moment";

const CardEmailFormItem = ({
  isCheckbox,
  expanded,
  checked,
  onChangeSelected,
  onChangeExpand,
  index,
  item,
  onOpenConfirmDelete,
  onOpenActiveModal,
  onOpenFormModal,
  canEdit
}) => {

  return (
    <CardFormItemStyle className="card-item" expanded={expanded}>
      <AccordionSummary
        expandIcon={
          <ButtonIcon
            onClick={onChangeExpand}
            icon={
              <Iconify
                icon="material-symbols:keyboard-arrow-down-sharp"
                width={18}
                height={18}
                color="#455570"
              />
            }
          />
        }
        aria-controls={`panel${index}a-content`}
        id={`panel${index}a-header`}
      >
        <BoxFlex style={{ marginBottom: 12 }}>
          <CardFormItemTitleStyle className="card-item-title">
            {isCheckbox && (
              <Checkbox
                value={item}
                checked={checked}
                onChange={onChangeSelected}
                icon={<CheckboxIconDefault />}
                checkedIcon={<CheckboxIconChecked />}
              />
            )}
            {item.name}
            <Typography className="card-item-subtitle" component="span">
              (Đã gửi 0)
            </Typography>
          </CardFormItemTitleStyle>
          {item.isActive && (
            <Typography
              sx={{ color: "#388E3C", fontSize: 12, fontWeight: 500, mr: 6 }}
            >
              Đang hoạt động
            </Typography>
          )}
        </BoxFlex>
        <BoxFlex>
          <BoxFlex>
            <AvatarDS
              sx={{
                height: "20px",
                width: "20px",
                borderRadius: "100px",
                fontSize: "8px",
              }}
              name={item.creatorName}
            />
            <CardFormItemContentStyle className="card-item-content-text">
              {item.creatorName}
              <Typography
                component="span"
                className="card-item-content-subtext"
              >
                đã tạo ngày {moment(item.createdTime).format("DD/MM/YYYY")}
              </Typography>
            </CardFormItemContentStyle>
          </BoxFlex>
          <BoxFlex>
            {
              canEdit && <>
                <ButtonIcon
                  onClick={() => onOpenActiveModal(item)}
                  sx={{
                    backgroundColor: "unset !important",
                    cursor: "pointer",
                    padding: 0,
                  }}
                  icon={
                    item.isActive ? (
                      <ActionSwitchCheckedIcon />
                    ) : (
                      <ActionSwitchUnCheckedIcon />
                    )
                  }
                />

                <Tooltip title="Sửa">
                  <IconButton
                    style={{
                      margin: '0 8px'
                    }}
                    onClick={() => onOpenFormModal(item)}>
                    <Iconify
                      icon={"ri:edit-2-fill"}
                      width={16}
                      height={16}
                      color="#5C6A82"
                    />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Xóa">
                  <IconButton
                    onClick={() => onOpenConfirmDelete(item)}
                  >
                    <Iconify
                      icon={"material-symbols:delete-outline-rounded"}
                      width={16}
                      height={16}
                      color="#5C6A82"
                    />
                  </IconButton>
                </Tooltip>
              </>
            }
          </BoxFlex>
        </BoxFlex>
      </AccordionSummary>
      <AccordionDetails sx={{ mt: '12px !important' }}>
        <Divider />
        <Typography fontWeight={600} fontSize={14} color={'#172B4D'} mt={2.5}>Tiêu chí đánh giá</Typography>
        <BoxFlex>
          {item?.reviewFormCriterias?.map((p) => {
            return (
              <Box
                sx={{
                  background: "#F2F4F5",
                  borderRadius: "6px",
                  width: "49%",
                  padding: "16px 24px",
                  marginTop: 2
                }}
              >
                <TextElipsis fontWeight={600} fontSize={13} marginBottom={0.5} title={p?.name}>{p?.name}</TextElipsis>
                <TextElipsis fontWeight={400} fontSize={13} title={p?.description}>{p?.description}</TextElipsis>
              </Box>
            );
          })}
        </BoxFlex>
      </AccordionDetails>
    </CardFormItemStyle>
  );
};

export default React.memo(CardEmailFormItem);
