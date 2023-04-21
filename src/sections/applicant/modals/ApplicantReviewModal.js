import { ButtonDS, TextAreaDS } from "@/components/DesignSystem";
import { View, Text } from "@/components/DesignSystem/FlexStyled";
import Iconify from "@/components/Iconify";
import { FormProvider } from "@/components/hook-form";
import { Label } from "@/components/hook-form/style";
import { ButtonCancelStyle } from "@/sections/applicant/style";
import { BoxFlex } from "@/sections/emailform/style";
import { ButtonIcon, ReviewForm } from "@/utils/cssStyles";
// import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Divider, Modal, Typography } from "@mui/material";
import { Rate } from "antd";
import { useSnackbar } from "notistack";
// import { Rate } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAddApplicantReviewMutation } from "../ApplicantFormSlice";

const LIST_ACTION = [
  { id: 0, name: "Đạt", color: "#4CAF50", icon: "bxs:like" },
  { id: 1, name: "Cân nhắc", color: "#FF9800", icon: "ri:eye-fill" },
  { id: 2, name: "Loại", color: "#F44336", icon: "bxs:dislike" },
];

const Point = ({ index, value, onChange, setFormValue }) => {
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
          setFormValue("applicantReviewCriterias." + index + ".point", p);
        }}
        character={({ index }) => index + 1}
        count={10}
        value={value}
      />
    </Box>
  );
};

export const ApplicantReviewModal = ({
  show,
  setShow,
  applicantId,
  recruitmentId,
  data,
}) => {
  const [points, setPoints] = useState({});
  const [mediumScore, setMediumScore] = useState(0);
  const [currentAction, setCurrentAction] = useState();

  const methodss = useForm({});

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methodss;

  const pressHide = () => {
    setShow(false);
  };
  const { enqueueSnackbar } = useSnackbar();
  const [reviewForm] = useAddApplicantReviewMutation();
  const pressSave = handleSubmit(async (d) => {
    const data = {
      applicantId: applicantId,
      recruitmentId: recruitmentId,
      applicantReviewResultType: currentAction,
      comment: d.result,
      applicantReviewCriterias: d.applicantReviewCriterias,
    };
    try {
      await reviewForm(data).unwrap();
      enqueueSnackbar("Đánh giá thành công");
      pressHide();
    } catch (err) {
      enqueueSnackbar("Đánh giá thất bại", {
        autoHideDuration: 1000,
        variant: "error",
      });
    }
  });
  useEffect(() => {
    if (!data?.reviewFormCriterias) return;
    setValue(
      "applicantReviewCriterias",
      data?.reviewFormCriterias?.map((i) => ({
        reviewFormCriteriaId: i.id,
      }))
    );
  }, [JSON.stringify(data?.reviewFormCriterias)]);
  const applicantReviewCriterias = watch("applicantReviewCriterias");
  const isPoint = applicantReviewCriterias
    ?.filter((p) => p.point)
    .map((p) => p.point);
  useEffect(() => {
    const sum = isPoint?.reduce((a, b) => a + b, 0);
    const avg = sum / isPoint?.length || 0;
    setMediumScore(avg);
  }, [applicantReviewCriterias, isPoint]);

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
              {data?.reviewFormCriterias &&
                data?.reviewFormCriterias.map((p, index) => {
                  return (
                    <ReviewForm className="block-review" key={index}>
                      <Label
                        required={true}
                        className="title"
                        title="Tính cách"
                      >
                        {p?.name}
                      </Label>
                      <p className="subTitleForm" title="">
                        {p?.description}
                      </p>
                      <div className="input-content">
                        <TextAreaDS
                          maxLength={255}
                          placeholder="Nhập nội dung đánh giá..."
                          name={`applicantReviewCriterias.${index}.description`}
                          sx={{
                            ".ant-input-data-count": {
                              display: "none",
                            },
                          }}
                        />
                      </div>
                      <Point
                        value={points[index]}
                        index={index}
                        setFormValue={setValue}
                        onChange={(val) => {
                          setPoints({
                            ...points,
                            [index]: val,
                          });
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
                  <ul className="pagination-review">
                    {LIST_ACTION.map((item, index) => {
                      const isActive = item.id == currentAction;
                      return (
                        <li
                          key={index}
                          onClick={() => setCurrentAction(item.id)}
                          style={{
                            backgroundColor: isActive ? item.color : "",
                          }}
                        >
                          <Iconify
                            icon={item.icon}
                            width={20}
                            height={20}
                            color={isActive ? "#FFFFFF" : "#6D6F81"}
                            mr={1}
                          />
                          <Typography
                            fontSize={14}
                            fontWeight={"600"}
                            color={isActive ? "#FDFDFD" : "#455570"}
                            textAlign={"center"}
                          >
                            {item.name}
                          </Typography>
                        </li>
                      );
                    })}
                  </ul>

                  <TextAreaDS
                    placeholder="Nhập nội dung đánh giá..."
                    name={"result"}
                    sx={{
                      top: "-2px",
                      ".ant-input-data-count": {
                        display: "none",
                      },
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
              <BoxFlex
                color={
                  mediumScore.toFixed(2) < 4.9
                    ? "#E53935"
                    : mediumScore.toFixed(2) < 6.9
                    ? "#F77A0C"
                    : "#388E3C"
                }
              >
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
                  {mediumScore.toFixed(2)}
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
                  tittle={"Gửi đánh giá"}
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
