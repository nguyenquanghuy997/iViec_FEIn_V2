import { ButtonDS, SwitchStatusDS } from "@/components/DesignSystem";
import { Text, View } from "@/components/DesignSystem/FlexStyled";
import Iconify from '@/components/Iconify'
import MuiInputNumber from "@/components/form/MuiInputNumber";
import { FormProvider, RHFTextField } from "@/components/hook-form";
import { Label } from "@/components/hook-form/style";
import { ButtonCancelStyle } from '@/sections/applicant/style'
import { DialogModelStyle } from '@/utils/cssStyles'
import { yupResolver } from '@hookform/resolvers/yup'
import { Divider, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from "react";
import { useForm } from 'react-hook-form'
import * as Yup from "yup";

const defaultValues = {
  id: null,
  name: "",
  description: "",
  examTime: null,
  isQuestionMixing: true,
  showType: 0,
  type: 0
};

function ExamFormModal({ show, onClose, onSubmit, data }) {

  const dataForm = data ? data : defaultValues;

  const [showType, setShowType] = useState(dataForm?.showType ?? 0)

  const schema = Yup.object().shape({
    name: Yup.string().required('Chưa nhập tên đề thi'),
    description: Yup.string().max(100, 'Tên đề thi không được quá 100 ký tự'),
    examTime: Yup.number().typeError('Chưa nhập thời gian thi').required('Chưa nhập thời gian thi').min(1, 'Thời gian thi phải lớn hơn 0')
  });

  const methods = useForm({
    defaultValues: dataForm,
    resolver: yupResolver(schema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleChange = (e) => {
    setShowType(parseInt(e.target.value))
  }

  const pressSave = handleSubmit(async (e) => {
    const body = { ...e, showType: showType };
    onSubmit(body)
  });

  const renderTitle = (title, required) => {
    return <Label required={required}>{title}</Label>;
  };

  const showTypeOptions = [
    {
      value: 0,
      label: 'Hiển thị 1 câu hỏi trên 1 trang'
    },
    {
      value: 1,
      label: 'Hiển thị tất cả câu hỏi trên 1 trang'
    },
  ]

  useEffect(() => {
    if (!show) {
      reset({ ...dataForm });
      return;
    }
  }, [show, data]);

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
      <FormProvider methods={methods}>
        {/* header */}
        <View
          flexrow="true"
          atcenter="center"
          pv={12}
          ph={24}
          bgcolor={"#FDFDFD"}
        >
          <Text flex="true" fontsize={16} fontweight={"600"}>
            {"Thêm mới đề thi"}
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
        <View flex="true" p={24} pb={28} style={{ overflowY: "scroll" }}>
          <View>
            {renderTitle("Tên đề thi", true)}
            <RHFTextField
              name="name"
              placeholder="Nhập tiêu đề tin hiển thị tại trang việc làm..."
              fullWidth
              maxLength={255}
            />
          </View>

          <View mt={28}>
            {renderTitle("Mô tả")}
            <RHFTextField
              multiline
              rows={4}
              name={"description"}
              placeholder={"Nhập nội dung mô tả, hướng dẫn ứng viên làm bài thi ..."}
            />
          </View>

          <View mt={28}>
            {renderTitle("Thời gian làm bài (phút)", true)}
            <MuiInputNumber
              name={"examTime"}
              placeholder={"Nhập số phút"}
            />
          </View>

          <View mt={28}>
            <SwitchStatusDS
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "#90CAF9 !important",
                },
                "& .MuiSwitch-switchBase.Mui-checked .MuiSwitch-thumb": {
                  backgroundColor: "#1976D2 !important",
                },
              }}
              colorLabel={'#172B4D'}
              name={"isQuestionMixing"}
              label={'Đảo vị trí câu hỏi'}
            />
          </View>

          <View mt={28}>
            {renderTitle("Cách hiển thị")}
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name={'showType'}
              defaultValue={dataForm.showType}
              onChange={handleChange}
            >
              {
                showTypeOptions.map((x,) => <FormControlLabel
                  key={`option-key-${x.value}`}
                  value={x.value}
                  control={<Radio name="showType" />}
                  label={x.label}
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      color: '#455570',
                      fontSize: '14px',
                      fontWeight: 500
                    },
                    "& .Mui-checked": {
                      color: '#1976D2 !important'
                    }
                  }}
                />)
              }

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
            loading={isSubmitting}
            tittle={"Tiếp tục"}
            onClick={pressSave}
          />
        </View>
      </FormProvider>
    </DialogModelStyle>
  )
}

export default ExamFormModal