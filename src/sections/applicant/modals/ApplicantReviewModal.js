import { ButtonDS, TextAreaDS } from "@/components/DesignSystem";
import { View, Text } from "@/components/DesignSystem/FlexStyled";
import Iconify from "@/components/Iconify";
import { FormProvider } from "@/components/hook-form";
import { Label } from "@/components/hook-form/style";
import { ButtonCancelStyle } from "@/sections/applicant/style";
import { BoxFlex } from "@/sections/emailform/style";
import { ButtonIcon, ReviewForm } from "@/utils/cssStyles";
// import { yupResolver } from "@hookform/resolvers/yup";
import {  Divider, Modal } from "@mui/material";
// import { Rate } from "antd";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
// import * as Yup from "yup";

const defaultValuess = {
  name: "",
  des: "",
};
// const reviewFormCriterias = [
//   {
//     id: "2324",
//     name: "Tiêu chí mặc định",
//     description: "Mô tả tiêu chí mặc định",
//     isRequired: true,
//   },
//   {
//     id: "98d7",
//     name: "fgfd",
//     description: "fdgdf",
//     isRequired: false,
//   },
// ];

export const ApplicantReviewModal = ({ show, setShow, data }) => {
  // const Point = () => {
  //   const [value, setValue] = React.useState();

  //   return (
  //     <Box
  //       sx={{
  //         width: 200,
  //         display: "flex",
  //         alignItems: "center",
  //       }}
  //     >
  //       <Rate
  //         onChange={setValue}
  //         character={({ index }) => index + 1}
  //         count={10}
  //         value={value}
  //       />
  //     </Box>
  //   );
  // };
  const isEdit = !!data?.name;
  // form
  // form

  const methodss = useForm({
    defaultValuess,
  });

  const {
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
    //       reviewFormCriteriaId: "uuuu",
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

  useEffect(() => {
    if (!isEdit) {
      setValue("name", "");
      setValue("isRequired", "");
      setValue("des", "");
      return;
    } else {
      setValue("name", data.name);
      setValue("isRequired", data.isRequired);
      setValue("des", data.des);
    }
  }, []);

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
            <Divider />
            <View
              style={{ overflowY: "auto", maxHeight: "600px", padding: 24 }}
            >
              {/* {reviewFormCriterias.map((p, index) => {
                return (
                  <ReviewForm className="block-review">
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
                        name={`reviewFormCriterias.${index}.description`}
                      />
                    </div>
                    <RHFTextField name={`reviewFormCriterias.${index}.id`} value={p?.id} />
                    <Point index={1} />
                    <span className="error"></span>
                  </ReviewForm>
                );
              })} */}

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
