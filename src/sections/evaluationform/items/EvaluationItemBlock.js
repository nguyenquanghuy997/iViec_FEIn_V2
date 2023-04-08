import { AvatarDS } from "@/components/DesignSystem";
import Iconify from "@/components/Iconify";
import { Label } from "@/components/hook-form/style";
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
import { fDate } from "@/utils/formatTime";
import {
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";

const EvaluationItemBlock = ({
  // isCheckbox,
  // expanded,
  // checked,
  // onChangeSelected,
  // onChangeExpand,
  index,
  item,
  onOpenModel,
}) => {
  return (
    <CardFormItemStyle className="card-item">
      <AccordionSummary
        expandIcon={
          <ButtonIcon
            // onClick={onChangeExpand}
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
        <BoxFlex style={{ marginBottom: 12, flexFlow: 'unset' }}>
          <CardFormItemTitleStyle className="card-item-title">
            {/* {isCheckbox && (
              <Checkbox
                value={item}
                checked={checked}
                onChange={onChangeSelected}
                icon={<CheckboxIconDefault />}
                checkedIcon={<CheckboxIconChecked />}
              />
            )} */}
            {item.name}
            <Typography className="card-item-subtitle" component="span">
              ({item?.numOfRecruitment} tin áp dụng)
            </Typography>
          </CardFormItemTitleStyle>
          {item.isActive && (
            <Typography
              sx={{ color: "#388E3C", fontSize: 12, fontWeight: 500, mr: 6 }}
            >
              Đang hoạt động
            </Typography>
          )}
          {!item.isActive && (
            <Typography
              sx={{ color: "#5C6A82", fontSize: 12, fontWeight: 500, mr: 6 }}
            >
              Không hoạt động
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
              name={
                item?.isInternalDefault == true ? "iVIEC" : item.creatorEmail
              }
            />
            <CardFormItemContentStyle className="card-item-content-text">
              {item?.isInternalDefault == true ? "iVIEC" : item.creatorEmail}
              <Typography
                component="span"
                className="card-item-content-subtext"
              >
                đã tạo ngày {item?.createdTime && fDate(item?.createdTime)}
              </Typography>
            </CardFormItemContentStyle>
          </BoxFlex>
          <BoxFlex>
            {!item?.isInternalDefault && (
              <>
                <ButtonIcon
                  onClick={(e) => onOpenModel(e, item, "status")}
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
                {item?.numOfRecruitment == 0 && (
                  <>
                    <Tooltip title="Sửa">
                      <IconButton
                        style={{
                          margin: '0 8px'
                        }}
                        onClick={(e) => onOpenModel(e, item, "form")}>
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
                        onClick={(e) => onOpenModel(e, item, "delete")}>
                        <Iconify
                          icon={"material-symbols:delete-outline-rounded"}
                          width={16}
                          height={16}
                          color="#5C6A82"
                        />
                      </IconButton>
                    </Tooltip>
                  </>
                )}
              </>
            )}
          </BoxFlex>
        </BoxFlex>
      </AccordionSummary>
      <AccordionDetails sx={{ mt: "12px !important" }}>
        <Divider />
        <Typography fontWeight={600} fontSize={14} color={"#172B4D"} mt={2.5}>
          Tiêu chí đánh giá
        </Typography>
        <BoxFlex>
          {item?.reviewFormCriterias?.map((p, index) => {
            return (
              <Box
                key={index}
                sx={{
                  background: "#F2F4F5",
                  borderRadius: "6px",
                  width: "49%",
                  padding: "16px 24px",
                  marginTop: 2,
                }}
              >
                <Label
                  title={p?.name}
                  required={p?.isRequired ? true : false}
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    marginBottom: "4px",
                    color: "#172B4D",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    width: "100%",
                  }}
                >
                  {p?.name}
                </Label>
                <TextElipsis
                  fontWeight={400}
                  fontSize={13}
                  title={p?.description}
                >
                  {p?.description}
                </TextElipsis>
              </Box>
            );
          })}
        </BoxFlex>
      </AccordionDetails>
    </CardFormItemStyle>
  );
};

export default React.memo(EvaluationItemBlock);
