import { ButtonDS } from "@/components/DesignSystem";
import { Text, View } from "@/components/DesignSystem/FlexStyled";
import Iconify from '@/components/Iconify'
import { ButtonCancelStyle } from '@/sections/applicant/style'
import { DialogModelStyle } from '@/utils/cssStyles'
import { Divider, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useState } from 'react'
import {useTheme} from "@mui/material/styles";


function ExamChooseTypeModal({ show, onClose, onSubmit, data }) {

  const [type, setType] = useState(data?.type ?? 0);

  const handleChange = (e) => {
    setType(parseInt(e.target.value))
  }
  const theme = useTheme()

  const handleClickItem = (type)=>{
    setType(type)
  }

  const pressSave = () => {
    data.type = type;
    onSubmit(data);
  }

  const showTypeOptions = [
    {
      value: 0,
      title: 'Đề thi câu hỏi cố định',
      description: 'Đề thi chứa các câu hỏi cố định, giống nhau đối với các ứng viên khác nhau'
    },
    {
      value: 1,
      title: 'Đề thi câu hỏi ngẫu nhiên',
      description: 'Đề thi chứa các câu hỏi được hệ thống chọn ngẫu nhiên theo điều kiện cài đặt'
    }
  ]

  return (
    <DialogModelStyle
      open={show}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiPaper-root": {
          top: "0 !important",
        },
      }}
    >
      {/* header */}
      <View
        flexrow="true"
        atcenter="center"
        pv={12}
        ph={24}
        bgcolor={theme.palette.common.white}
      >
        <Text flex="true" fontsize={16} fontweight={"600"}>
          {"Chọn kiểu đề thi"}
        </Text>
        <ButtonDS
          type="button"
          sx={{
            backgroundColor: theme.palette.background.paper,
            boxShadow: "none",
            ":hover": {
              backgroundColor: "#EFF3F7",
            },
            textTransform: "none",
            padding: "12px",
            minWidth: "unset",
          }}
          onClick={onClose}
          icon={
            <Iconify
              icon={"mi:close"}
              width={20}
              height={20}
              color={theme.palette.common.borderObject}
            />
          }
        />
      </View>
      <Divider />

      {/* body */}
      <View flex="true" ph={24} pv={36} style={{ overflowY: "scroll" }}>
        <View>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={0}
            name={'showType'}
            onChange={handleChange}
          >
            {
              showTypeOptions.map((x, index) =>
                <View key={`option-key-${index}`}
                  flexrow='true'
                  atcenter='true'
                  style={{
                    border: type == x.value ? '1px solid #1976D2' : '1px solid #D0D4DB',
                    borderRadius: '6px',
                    padding: '24px 16px',
                    marginTop: index !== 0 ? '28px' : '0'
                  }}
                  onclick={()=>handleClickItem(x.value)}
                >
                  <View>
                    <FormControlLabel
                      checked={type == x.value}
                      value={x.value}
                      control={<Radio name="showType" />}
                      sx={{
                        marginRight: 0,
                        "& .MuiFormControlLabel-label": {
                          color: theme.palette.common.neutral700,
                          fontSize: '14px',
                          fontWeight: 500,
                        },
                        "& .Mui-checked": {
                          color: '#1976D2 !important'
                        }
                      }}
                    />
                  </View>

                  <View>
                    <Typography sx={{
                      color: theme.palette.common.neutral700,
                      fontSize: '14px',
                      fontWeight: 600
                    }}>{x.title}</Typography>
                    <Typography sx={{
                      color: theme.palette.common.neutral700,
                      fontSize: '13px',
                      fontWeight: 400
                    }}>{x.description}</Typography>
                  </View>
                </View>
              )}

          </RadioGroup>
        </View>

      </View>

      {/* footer */}
      <View
        flexrow="true"
        jcend="true"
        pv={16}
        ph={24}
        boxshadow={"inset 0px 1px 0px #EBECF4"}
      >
        <ButtonCancelStyle onClick={onClose}>Hủy</ButtonCancelStyle>
        <View width={8} />
        <ButtonDS
          type={"submit"}
          variant={"contained"}
          tittle={"Tiếp tục"}
          onClick={pressSave}
        />
      </View>
    </DialogModelStyle>
  )
}

export default ExamChooseTypeModal