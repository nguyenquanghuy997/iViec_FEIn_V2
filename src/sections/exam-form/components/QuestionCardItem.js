import {
  CheckboxIconChecked,
  CheckboxIconDefault,
} from "@/assets/CheckboxIcon";
import { AvatarDS } from "@/components/DesignSystem";
import { View } from "@/components/FlexStyled";
import Iconify from "@/components/Iconify";
import {
  BoxFlex,
  CardFormItemStyle,
  CardFormItemTitleStyle,
} from "@/sections/emailform/style";
import { ButtonIcon } from "@/utils/cssStyles";
import {
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  Divider,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {useTheme} from "@mui/material/styles";

const theme = useTheme();
const questionInfoTitle = {
  fontSize: '14px',
  fontWeight: 600,
  color: theme.palette.common.neutral700
};

const questionAnswer = {
  fontSize: '14px',
  fontWeight: 400,
  color: theme.palette.common.neutral700,
  marginBottom: '12px'
}


function QuestionCardItem({ index }) {

  const [expanded, setExpanded] = useState(false)
  const renderText = (title, value) => {
    return (
      <div style={{
        display: "inline-flex",
        fontSize: '14px',
        color: theme.palette.common.neutral700,
        marginBottom: '12px',
        fontWeight: 400,
      }}>
        <span style={{ width: "100px", marginRight: '12px' }}>
          {title}
        </span>

        <span style={{
          maxWidth: '180px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {value}
        </span>
      </div>
    );
  };

  return (
    <CardFormItemStyle className="card-item" expanded={expanded}>
      <AccordionSummary
        sx={{
          ".MuiAccordionSummary-content": {
            width: "100%",
          },
        }}
        expandIcon={
          <BoxFlex>
            <Typography sx={{
              width: '20px',
              height: '20px',
              fontSize: 14,
              textAlign: 'center',
              lineHeight: '20px',
              borderRadius: '50%',
              border: '1px solid #455570',
              marginRight: '8px'
            }}>
              1
            </Typography>
            <ButtonIcon
              icon={
                <Iconify
                  icon={"ri:edit-2-fill"}
                  width={16}
                  height={16}
                  color={theme.palette.common.neutral700}
                />
              }
            />

            <ButtonIcon
              icon={
                <Iconify
                  icon={"material-symbols:delete-outline-rounded"}
                  width={14}
                  height={14}
                  color={theme.palette.common.neutral700}
                />
              }
            />

            <ButtonIcon
              onClick={() => {
                setExpanded(!expanded)
              }}
              icon={
                <Iconify
                  icon="material-symbols:keyboard-arrow-down-sharp"
                  width={14}
                  height={14}
                  color={theme.palette.common.neutral700}
                />
              }
            />
          </BoxFlex>
        }
        aria-controls={`panel${index}a-content`}
        id={`panel${index}a-header`}
      >
        <BoxFlex alignItems={'start'} style={{ marginBottom: 24, minWidth: "95%" }}>
          <CardFormItemTitleStyle
            className="card-item-title"
            sx={{
              width: '100%',
              alignItems: 'start !important'
            }}
          >
            <Checkbox
              // value={item}
              // checked={checked}
              // onChange={onChangeSelected}
              icon={<CheckboxIconDefault />}
              checkedIcon={<CheckboxIconChecked />}
            />
            <Typography maxWidth={'25%'} fontSize={14} fontWeight={600} color={theme.palette.common.neutral700} ml={2} >Câu hỏi 1

            </Typography>

            <Typography fontSize={14} ml={2} color={theme.palette.common.neutral700} maxWidth={'75%'} component="span">
              Trong các tỉnh tây nguyên, thành phố nào có nhiều đơn vị hành chính nhất ?
            </Typography>
          </CardFormItemTitleStyle>
        </BoxFlex>
      </AccordionSummary>
      <AccordionDetails sx={{ mt: "0px !important" }}>
        <Divider sx={{ color: theme.palette.common.neutral100 }} />
        <View flexRow jcBetween style={{ margin: '24px' }}>
          <View>
            <Typography sx={questionInfoTitle}>Đáp án</Typography>

            <View mt={'12px'}>
              <Typography sx={questionAnswer}>{'A) Gia Lai'}
                <Iconify
                  icon={"material-symbols:check-circle"}
                  width={14}
                  height={14}
                  marginLeft={'12px'}
                  color={theme.palette.common.green600}
                />
              </Typography>
              <Typography sx={questionAnswer}>{'B) Buôn ma thuột'}</Typography>
              <Typography sx={questionAnswer}>{'A) Đà lạt'}</Typography>
            </View>
          </View>
          <View style={{
            borderLeft: '1px solid #E7E9ED',
            paddingLeft: '48px'
          }}>
            <Typography sx={questionInfoTitle}>Thông tin câu hỏi</Typography>
            <View mt={'12px'}>
              {renderText('Nhóm câu hỏi:', 'Nhóm câu hỏi lập trình Nhóm câu hỏi lập trình Nhóm câu hỏi lập trình')}
              {renderText('Kiểu câu hỏi:', 'Nhóm câu hỏi lập trình')}
              {renderText('Ngày tạo:', '15/03/2033 15:00')}
              {renderText('Nhóm câu hỏi:', <>
                <AvatarDS
                  sx={{
                    height: "20px",
                    width: "20px",
                    borderRadius: "100px",
                    fontSize: "8px",
                  }}
                  name={'CV'} />Đinh tiến thành
              </>
              )}
            </View>
          </View>
        </View>
      </AccordionDetails>
    </CardFormItemStyle>
  );
}

export default QuestionCardItem;
