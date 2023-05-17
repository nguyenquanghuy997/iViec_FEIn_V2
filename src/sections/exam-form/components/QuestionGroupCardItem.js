import {
  CheckboxIconChecked,
  CheckboxIconDefault,
} from "@/assets/CheckboxIcon";
import { AvatarDS } from "@/components/DesignSystem";
import { View } from "@/components/FlexStyled";
import Iconify from "@/components/Iconify";
import { TextFieldStyle } from "@/components/hook-form/style";
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
  FormHelperText,
  InputAdornment,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { useState } from "react";

const questionInfoTitle = {
  fontSize: "14px",
  fontWeight: 600,
  color: "#455570",
};

function QuestionGroupCardItem({
  index,
  item,
  onEdit,
  onDelete,
  onChangeQuantity,
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
  const [error, setError] = React.useState("");

  const handleChange = (e) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      if (e.target.value > item?.quantityOfQuestion) {
        setError("Số câu hỏi phải nhỏ hơn số câu hỏi trong nhóm");
      } else if (e.target.value == 0) {
        setError("Số câu hỏi phải nhỏ hơn số câu hỏi trong nhóm");
      } else {
        setError("");
      }
      onChangeQuantity(Number(e.target.value), error);
    }
  };

  return (
    <CardFormItemStyle
      className="card-item"
      expanded={expanded}
      sx={{
        "& .MuiAccordionSummary-expandIconWrapper": {
          top: "0 !important",
        },
      }}
    >
      <AccordionSummary
        sx={{
          ".MuiAccordionSummary-content": {
            width: "100%",
          },
          "&.Mui-focusVisible": {
            backgroundColor: "unset !important",
          },
        }}
        expandIcon={
          <Box>
            <BoxFlex>
              <TextFieldStyle
                label={item?.questionTypeId == 1 ? "Trắc nghiệm" : "Tự luận"}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => handleChange(e)}
                value={item.quantity}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      / {item?.quantityOfQuestion}
                    </InputAdornment>
                  ),
                }}
                sx={{ width: "170px" }}
              />

              <ButtonIcon
                onClick={() => onEdit(item, index)}
                icon={
                  <Iconify
                    icon={"ri:edit-2-fill"}
                    width={18}
                    height={18}
                    color="#455570"
                  />
                }
              />

              <ButtonIcon
                onClick={() => onDelete(item, index)}
                icon={
                  <Iconify
                    icon={"material-symbols:delete-outline-rounded"}
                    width={18}
                    height={18}
                    color="#455570"
                  />
                }
              />

              <ButtonIcon
                onClick={() => {
                  setExpanded(!expanded);
                }}
                icon={
                  <Iconify
                    icon="material-symbols:keyboard-arrow-down-sharp"
                    width={18}
                    height={18}
                    color="#455570"
                  />
                }
              />
            </BoxFlex>
            {error && (
              <FormHelperText
                sx={{
                  color: "#FF4842",
                  fontSize: 12,
                  fontWeight: 400,
                  mt: 1,
                }}
              >
                {error}
              </FormHelperText>
            )}
          </Box>
        }
        aria-controls={`panel${index}a-content`}
        id={`panel${index}a-header`}
      >
        <BoxFlex alignItems={"start"} style={{ minWidth: "95%" }}>
          <CardFormItemTitleStyle
            className="card-item-title"
            sx={{
              width: "100%",
              alignItems: "start !important",
            }}
          >
            <Checkbox
              // value={item}
              // checked={checked}
              // onChange={onChangeSelected}
              icon={<CheckboxIconDefault />}
              checkedIcon={<CheckboxIconChecked />}
            />
            <Box maxWidth={"80%"}>
              <Typography
                fontSize={14}
                fontWeight={600}
                color={"#455570"}
                ml={2}
              >
                {item?.questionGroup?.name}
              </Typography>
              <Typography
                fontSize={14}
                ml={2}
                color={"#455570"}
                maxWidth={"75%"}
                component="span"
              >
                {item?.questionGroup?.description}
              </Typography>
            </Box>
          </CardFormItemTitleStyle>
        </BoxFlex>
      </AccordionSummary>
      <AccordionDetails sx={{ mt: "0px !important" }}>
        <Divider sx={{ color: "#E7E9ED", marginTop: "24px" }} />
        <View
          flexRow={true}
          jcbetween={true}
          style={{ margin: "24px", justifyContent: "space-between" }}
        >
          {item.questionType != 2 && (
            <View>
              <Typography sx={questionInfoTitle}>Đáp án</Typography>
              <Box mt={"12px"}>
                {/* {item.answers.map((x, index) => (
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
                ))} */}
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
            <View mt={"12px"}>
              {renderText("Nhóm câu hỏi:", item?.questionGroupName)}
              {/* {renderText(
                "Kiểu câu hỏi:",
                LIST_QUESTION_TYPE.find((x) => x.value == item.questionType)
                  .name
              )} */}
              {renderText(
                "Ngày tạo:",
                moment(new Date()).format("DD/MM/YYYY HH:mm")
              )}
              {renderText(
                "Người tạo:",
                <>
                  <AvatarDS
                    sx={{
                      height: "20px",
                      width: "20px",
                      borderRadius: "100px",
                      fontSize: "8px",
                    }}
                    name={user && `${user?.lastName || ""} ${user?.firstName}`}
                  />
                  {user && `${user?.lastName || ""} ${user?.firstName}`}
                </>
              )}
            </View>
          </View>
        </View>
      </AccordionDetails>
    </CardFormItemStyle>
  );
}

export default QuestionGroupCardItem;
