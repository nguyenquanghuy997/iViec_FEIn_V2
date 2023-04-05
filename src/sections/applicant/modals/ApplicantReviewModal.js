import { ButtonDS, TextAreaDS } from "@/components/DesignSystem";
import { View, Text } from "@/components/DesignSystem/FlexStyled";
import Iconify from "@/components/Iconify";
import { FormProvider } from "@/components/hook-form";
import { Label } from "@/components/hook-form/style";
import { ButtonCancelStyle } from "@/sections/applicant/style";
import { BoxFlex } from "@/sections/emailform/style";
import { ButtonIcon, ReviewForm } from "@/utils/cssStyles";
// import { yupResolver } from "@hookform/resolvers/yup";
import {  Box, Divider, Modal } from "@mui/material";
import { Rate } from "antd";
// import { Rate } from "antd";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
// import * as Yup from "yup";

const defaultValuess = {
  name: "",
  des: "",
};
const reviewFormCriterias = [
  {
    id: "2324",
    name: "Tiêu chí mặc định",
    description: "Mô tả tiêu chí mặc định",
    isRequired: true,
  },
  {
    id: "98d7",
    name: "fgfd",
    description: "fdgdf",
    isRequired: false,
  },
];



const Point = ({
  index,
  value,
  onChange,
  setFormValue,
}) => {
  return (
    <Box
      sx={{
        width: 200,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Rate
        onChange={(p) => {
          onChange(p);
          setFormValue('applicantReviewCriterias.' + index + '.point', p);
        }}
        character={({ index }) => index + 1}
        count={10}
        value={value}
      />
    </Box>
  );
};

export const ApplicantReviewModal = ({ show, setShow, data }) => {
  const [points, setPoints] = useState({});

  const isEdit = !!data?.name;

  const methodss = useForm({
    defaultValuess,
  });

  const {
    register,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methodss;

  const pressHide = () => {
    setShow(false);
  };
  const pressSave = handleSubmit(async () => {
    // debugger;
    // const data = {
    //   applicantId: "sdffdfg",
    //   recruitmentId: "534543",
    //   applicantReviewCriterias: [
    //     {
    //       reviewFormCriteriaId: d.id,
    //       description: "string",
    //       point: 0,
    //     },
    //   ],
    // };

    // const applicantReviewCriterias = {
    //   name: d.name,
    //   isRequired: d.isRequired,
    //   des: d.des,
    // };
    // onSubmit?.(data);
    // pressHide();
  });

  // useEffect(() => {

  //   setValue("applicantReviewCriterias", reviewFormCriterias?.map((i)=>({
  //     reviewFormCriteriaId:i.id
  //   })));

  return (
    <Modal
      open={show}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      onBackdropClick={pressHide}
    >
      <>
        <FormProvider methods={methodss}>
          <View hidden width={668} borderradius={8} bgcolor={"#FDFDFD"}>
            <View flexrow="true" atcenter="true" pv={22} ph={24}>
              <Text flex fontsize={16} fontweight={"700"}>
                {"Đánh giá ứng viên"}
              </Text>

              <ButtonIcon
                onClick={pressHide}
                icon={
                  <Iconify
                    icon={"ic:baseline-close"}
                    width={20}
                    height={20}
                    color="#455570"
                  />
                }
              />
            </View>
            <input
          type="hidden"
          name="myHiddenInput"
          value="My Hidden Value"
          ref={register()}
        />
            <Divider />
            <View
              style={{ overflowY: "auto", maxHeight: "600px", padding: 24 }}
            >
              {reviewFormCriterias.map((p, index) => {
                return (
                  <ReviewForm className="block-review" key={index}>
                    <Label required={true} className="title" title="Tính cách">
                      {p?.name}
                    </Label>
                    <p className="subTitleForm" title="">
                      {p?.description}
                    </p>
                    <div className="input-content">
                      <TextAreaDS
                        initialValue=""
                        placeholder="Nhập nội dung đánh giá..."
                        name={`applicantReviewCriterias.${index}.description`}
                      />
                    </div>
                    <Point
                      index={1}
                      value={points[index]}
                      setFormValue={setValue}
                      onChange={val => {
                        setPoints({
                          ...points,
                          [index]: val,
                        })
                      }}
                    />
                    <span className="error"></span>
                  </ReviewForm>
                );
              })}

              <ReviewForm
                className="block-review block-review-result"
                style={{ background: "#F2F4F5" }}
              >
                <Label required={true} className="title" title="Kết luận">
                  {"Kết luận"}
                </Label>
                <div className="input-content">
                  <input id="rate" value="" hidden />
                  <ul className="pagination-review">
                    <li>
                      <Iconify
                        icon={"bxs:like"}
                        width={20}
                        height={20}
                        color="#6D6F81"
                        mr={1}
                      />
                      Đạt
                    </li>
                    <li>
                      <Iconify
                        icon={"ri:eye-fill"}
                        width={16}
                        height={16}
                        color="#6D6F81"
                        mr={1}
                      />
                      Cân nhắc
                    </li>
                    <li>
                      <Iconify
                        icon={"bxs:dislike"}
                        width={16}
                        height={16}
                        color="#6D6F81"
                        mr={1}
                      />
                      Không đạt
                    </li>
                  </ul>
                  <TextAreaDS
                    initialValue=""
                    placeholder="Nhập nội dung đánh giá..."
                    name={"result"}
                    sx={{
                      "& .ant-input": {
                        borderTop: "unset",
                        borderTopLeftRadius: "unset",
                        borderTopRightRadius: "unset",
                      },
                    }}
                  />
                </div>
              </ReviewForm>
            </View>
            <Divider />
            <View pv={16} ph={24} flexrow="row" jcbetween="true">
              <BoxFlex>
                <span style={{ fontSize: "15px", fontWeight: 600 }}>
                  Trung bình:
                </span>
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: 800,
                    paddingTop: "2px",
                    marginLeft: "4px",
                  }}
                  name="mediumScore"
                >
                  0
                </p>
              </BoxFlex>
              <BoxFlex justifyContent="end">
                <ButtonCancelStyle
                  sx={{ marginRight: "8px" }}
                  onClick={pressHide}
                >
                  Hủy
                </ButtonCancelStyle>

                <ButtonDS
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                  tittle={isEdit ? "Lưu" : "Thêm"}
                  onClick={pressSave}
                />
              </BoxFlex>
            </View>
          </View>
        </FormProvider>
      </>
    </Modal>
  );
};
