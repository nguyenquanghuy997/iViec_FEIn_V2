import { ButtonDS, TextAreaDS } from "@/components/DesignSystem";
import { View, Text } from "@/components/DesignSystem/FlexStyled";
import Iconify from "@/components/Iconify";
import {
  FormProvider,
  RHFCheckbox,
  RHFTextField,
} from "@/components/hook-form";
import { Label } from "@/components/hook-form/style";
import { ButtonCancelStyle } from "@/sections/applicant/style";
import { ButtonIcon, ReviewForm } from "@/utils/cssStyles";
import { yupResolver } from "@hookform/resolvers/yup";
import { Divider, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const defaultValuess = {
  name: "",
  des: "",
};

export const ApplicantReviewModal = ({ show, setShow, data, onSubmit }) => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const Point = () => {
    const [hoveredIndex, setHoveredIndex] = useState(-1);
    const handleHover = (index) => {
      setHoveredIndex(index);
    };
    const handleMouseLeave = () => {
      setHoveredIndex(-1);
    };

    return (
      <div>
        <ul className="pagination-review">
          {items.map((item, index) => (
            <>
              <li
                key={index}
                onMouseOver={() => handleHover(index)}
                onMouseLeave={handleMouseLeave}
                style={{
                  backgroundColor: hoveredIndex >= index ? "#E3F2FD" : "#FFFFFF",
                  color: hoveredIndex >= index ? "#1565C0" : "#455570",
                  borderColor: hoveredIndex >= index ? "#E3F2FD" : "#EBECF4",
                }}
              >
                {item}
              </li>
            </>
          ))}
        </ul>
      </div>
    );
  };
  const isEdit = !!data?.name;
  // form
  // form
  const Schema = Yup.object().shape({
    name: Yup.string().required("Chưa nhập tên tiêu chí"),
  });

  const methodss = useForm({
    defaultValuess,
    resolver: yupResolver(Schema),
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methodss;

  const pressHide = () => {
    setShow(false);
  };
  const pressSave = handleSubmit(async (d) => {
    const data = {
      name: d.name,
      isRequired: d.isRequired,
      des: d.des,
    };
    onSubmit?.(data);
    pressHide();
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
            <View p={24} style={{ overflowY: "auto", maxHeight: "600px", padding: 16 }}>
              <ReviewForm className="block-review mb-4" data-id="">
                <Label required={true} className="title" title="Tính cách">
                  {"Tính cách"}
                </Label>
                <p className="subTitleForm mb-1" title="">
                  Hòa đồng, cởi mở
                </p>
                <div className="input-content">
                  <TextAreaDS
                    initialValue=""
                    placeholder="Nhập nội dung đánh giá"
                    name={"description"}
                  />
                </div>
                <Point index={0} />
                <span className="error"></span>
              </ReviewForm>

              <ReviewForm className="block-review mb-4" data-id="">
                <Label required={true} className="title" title="Tính cách">
                  {"Tính cách"}
                </Label>
                <p className="subTitleForm mb-1" title="">
                  Hòa đồng, cởi mở
                </p>
                <div className="input-content">
                  <TextAreaDS
                    initialValue=""
                    placeholder="Nhập nội dung đánh giá"
                    name={"description"}
                  />
                </div>
                <Point index={1} />
                <span className="error"></span>
              </ReviewForm>

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
                    maxLength={255}
                    placeholder="Nhập nội dung mô tả tiêu chí đánh giá"
                    name={"des"}
                    style={{
                      
                    }}
                  />
                  {/* <textarea
                    className="form-control"
                    id="Comment"
                    rows="3"
                    style="height: unset"
                    maxlength="255"
                    placeholder="Nhập kết luận"
                  ></textarea> */}
                  {/* <span target="Comment" className="error"></span> */}
                </div>
              </ReviewForm>

              <View mb={12}>
                <Label required={true}>{"Tên tiêu chí"}</Label>
                <RHFTextField
                  name={"name"}
                  placeholder="Nhập tên tiêu chí"
                  maxLength={150}
                />
              </View>
              <View mb={8}>
                <RHFCheckbox
                  style={{ marginLeft: "-8px" }}
                  name="isRequired"
                  label="Bắt buộc đánh giá"
                />
              </View>
              <View mb={24}>
                <Label>{"Mô tả tiêu chí"}</Label>
                <TextAreaDS
                  initialValue=""
                  maxLength={255}
                  placeholder="Nhập tên tiêu chí"
                  name={"des"}
                />
              </View>
            </View>
            <Divider />
            <View flexrow="true" jcend="true" pv={16} ph={24}>
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
            </View>
          </View>
        </FormProvider>
      </>
    </Modal>
  );
};
