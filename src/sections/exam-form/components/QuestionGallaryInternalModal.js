import { ButtonDS } from '@/components/DesignSystem'
import { View, Text } from '@/components/DesignSystem/FlexStyled'
import Iconify from '@/components/Iconify'
import { FormProvider, RHFTextField } from '@/components/hook-form'
import { Dialog, Divider, InputAdornment } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'

function QuestionGallaryInternalModal({ show, onClose }) {
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      searchKey: "",
    },
  });

  return (
    <Dialog
      fullWidth
      maxWidth='lg'
      open={show}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiPaper-root": {
          top: "0 !important",
          padding: "0 !important",
          borderRadius: "6px !important",
        },
      }}
    >
      <FormProvider methods={methods}>
        {/* header */}
        <View
          flexrow="true"
          atcenter="center"
          jcbetween="true"
          pv={12}
          ph={24}
          bgcolor={"#FDFDFD"}
        >
          <Text flex="true" fontsize={16} fontweight={"600"}>
            {"Thêm câu hỏi từ thư viện câu hỏi nội bộ"}
          </Text>
          <ButtonDS
            type="button"
            sx={{
              backgroundColor: "#fff",
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
                color="#5C6A82"
              />
            }
          />
        </View>
        <Divider />

        {/* body */}
        <View flex="true" ph={16} pv={24} style={{ overflowY: "scroll", backgroundColor: "#F2F4F5" }}>

          <View flexrow={'true'} atcenter={'true'} jcbetween={'true'}>
            <Text color={'#455570'} fontsize={16} fontweight={600}>Danh sách nhóm câu hỏi</Text>

            <RHFTextField
              name="searchKey"
              placeholder="Tìm kiếm theo nhóm câu hỏi..."
              sx={{
                width: "360px",
                backgroundColor: '#FDFDFD',
                borderRadius: '6px',
                '.MuiInput-root': {
                  border: 'none'
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ ml: 1.5 }}>
                    <Iconify
                      icon={"eva:search-fill"}
                      sx={{ color: "text.disabled", width: 20, height: 20 }}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </View>

          <View>

          </View>
        </View>
      </FormProvider>


      {/* footer */}
      {/* <View
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
      </View> */}
    </Dialog>
  )
}

export default QuestionGallaryInternalModal