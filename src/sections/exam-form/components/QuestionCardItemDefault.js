import { AvatarDS } from "@/components/DesignSystem";
import { View, Text } from "@/components/DesignSystem/FlexStyled";
import Iconify from "@/components/Iconify";
import useAuth from "@/hooks/useAuth";
import {
  BoxFlex,
  CardFormItemStyle,
  CardFormItemTitleStyle,
} from "@/sections/emailform/style";
import { ButtonIcon } from "@/utils/cssStyles";
import {
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  Divider,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import { ImageIcon } from "./icons/Icon";

const questionInfoTitle = {
  fontSize: "14px",
  fontWeight: 600,
  color: "#455570",
};

const questionAnswer = {
  fontSize: "14px",
  fontWeight: 400,
  color: "#455570",
  marginBottom: "12px",
};

const LIST_QUESTION_TYPE = [
  {
    value: 0,
    label: "Trắc nghiệm - 1 đáp án đúng",
    name: "Trắc nghiệm - 1 đáp án đúng",
  },
  {
    value: 1,
    label: "Trắc nghiệm - nhiều đáp án đúng",
    name: "Trắc nghiệm - nhiều đáp án đúng",
  },
  {
    value: 2,
    label: "Tự luận",
    name: "Tự luận",
  },
];

function QuestionCardItemDefault({
  index,
  item,
  showIndex,
  hasRoleEdit,
  checked,
  isDisable,
  hasRoleDelete,
  onEdit,
  onDelete,
  onChangeSelected,
}) {
  const { user } = useAuth();
  const [expanded, setExpanded] = useState(false);

  const renderText = (title, value) => {
    return (
      <div
        style={{
          display: "inline-flex",
          fontSize: "14px",
          color: "#455570",
          marginBottom: "12px",
          fontWeight: 400,
        }}
      >
        <span style={{ width: "100px", marginRight: "12px" }}>{title}</span>

        <span
          style={{
            maxWidth: "180px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {value}
        </span>
      </div>
    );
  };

  return (
    <CardFormItemStyle
      className="card-item"
      expanded={expanded}
      style={{ padding: "20px 24px !important" }}
    >
      <AccordionSummary
        sx={{
          ".MuiAccordionSummary-content": {
            width: "100%",
          },
        }}
        expandIcon={
          <BoxFlex>
            <Typography
              sx={{
                width: "25px",
                height: "25px",
                fontSize: 12,
                textAlign: "center",
                lineHeight: "25px",
                borderRadius: "50%",
                border: "1px solid #455570",
                marginRight: "8px",
              }}
            >
              {item.questionPoint}
            </Typography>
            {hasRoleEdit && (
              <>
                <ButtonIcon
                  tooltip='Chỉnh sửa'
                  onClick={() => onEdit(item, index)}
                  icon={
                    <Iconify
                      icon={"ri:edit-2-fill"}
                      width={16}
                      height={16}
                      color="#455570"
                    />
                  }
                />
              </>
            )}
            {hasRoleDelete && (
              <ButtonIcon
                tooltip='Xóa'
                onClick={() => onDelete(item, index)}
                icon={
                  <Iconify
                    icon={"material-symbols:delete-outline-rounded"}
                    width={14}
                    height={14}
                    color="#455570"
                  />
                }
              />
            )}

            <ButtonIcon
              onClick={() => {
                setExpanded(!expanded);
              }}
              icon={
                <Iconify
                  icon="material-symbols:keyboard-arrow-down-sharp"
                  width={14}
                  height={14}
                  color="#455570"
                />
              }
            />
          </BoxFlex>
        }
        aria-controls={`panel${index}a-content`}
        id={`panel${index}a-header`}
      >
        <BoxFlex
          alignItems={"start"}
          style={{ marginBottom: 24, minWidth: "95%" }}
        >
          <CardFormItemTitleStyle
            className="card-item-title"
            sx={{
              width: "100%",
              alignItems: "center !important",
            }}
          >
            {
              <Checkbox
                value={item}
                checked={checked}
                disabled={isDisable}
                onChange={onChangeSelected}
              />
            }
            {showIndex && (
              <Typography
                maxWidth={"25%"}
                fontSize={14}
                fontWeight={600}
                color={"#455570"}
                mx={2}
              >
                Câu hỏi {index + 1}
              </Typography>
            )}

            <Typography
              fontSize={14}
              color={"#455570"}
              maxWidth={"75%"}
              component="span"
              mr={1}
            >
              {item.questionTitle}
            </Typography>
            {item.questionFilePaths?.length > 0 && <ImageIcon />}
          </CardFormItemTitleStyle>
        </BoxFlex>
      </AccordionSummary>
      <AccordionDetails sx={{ mt: "0px !important" }}>
        <Divider sx={{ color: "#E7E9ED" }} />
        <View
          flexrow={"true"}
          jcbetween={"true"}
          style={{ margin: "24px", justifyContent: "space-between" }}
        >
          {item.questionType != 2 && (
            <View>
              <Typography sx={questionInfoTitle}>Đáp án</Typography>
              <Box mt={"12px"}>
                {item.answers.map((x, index) => (
                  <Typography key={index} sx={questionAnswer}>
                    <Text
                      style={{ display: "inline-block", marginRight: "8px" }}
                    >{`${String.fromCharCode(65 + index)})`}</Text>
                    {x.content}
                    {x.isCorrect && (
                      <Iconify
                        icon={"material-symbols:check-circle"}
                        width={14}
                        height={14}
                        marginLeft={"12px"}
                        color="#43A047"
                      />
                    )}
                  </Typography>
                ))}
              </Box>
            </View>
          )}
          <View
            style={
              item.questionType != 2 && {
                borderLeft: "1px solid #E7E9ED",
                paddingLeft: "48px",
              }
            }
          >
            <Typography sx={questionInfoTitle}>Thông tin câu hỏi</Typography>
            <View mt={'12px'}>
              {renderText('Nhóm câu hỏi:', item?.questionGroupName)}
              {renderText('Kiểu câu hỏi:', LIST_QUESTION_TYPE.find(x => x.value == item.questionType).name)}
              {renderText('Ngày tạo:', item.creationTime ?? moment(new Date).format('DD/MM/YYYY HH:mm'))}
              {renderText('Người tạo:', <>
                <AvatarDS
                  sx={{
                    height: "20px",
                    width: "20px",
                    borderRadius: "100px",
                    fontSize: "8px",
                  }}
                  name={item.id ? item?.createdUser?.name : user && `${user?.lastName || ""} ${user?.firstName}`} />
                {item.id ? item?.createdUser?.name : user && `${user?.lastName || ""} ${user?.firstName}`}
              </>
              )}
            </View>
          </View>
        </View>
      </AccordionDetails>
    </CardFormItemStyle>
  );
}

export default React.memo(QuestionCardItemDefault);
