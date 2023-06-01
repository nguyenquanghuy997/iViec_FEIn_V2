import { useGetReviewEventQuery } from "../ApplicantFormSlice";
import { ButtonDS } from "@/components/DesignSystem";
import { Text, View } from "@/components/DesignSystem/FlexStyled";
import Iconify from "@/components/Iconify";
import { Label } from "@/components/hook-form/style";
import { BoxFlex } from "@/sections/emailform/style";
import palette from "@/theme/palette";
import { ButtonIcon, ReviewForm } from "@/utils/cssStyles";
import { Box, Divider, Modal, Typography, useTheme } from "@mui/material";
import { Rate } from "antd";

const LIST_ACTION = [
  {
    id: 0,
    name: "Đạt",
    color: palette.light.common.green500,
    icon: "bxs:like",
  },
  {
    id: 1,
    name: "Cân nhắc",
    color: palette.light.common.orange500,
    icon: "ri:eye-fill",
  },
  {
    id: 2,
    name: "Loại",
    color: palette.light.common.red500,
    icon: "bxs:dislike",
  },
];

const Point = ({ value, onChange }) => {
  return (
    <Box
      sx={{
        width: 200,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Rate
        disabled
        onChange={onChange}
        character={({ index }) => index + 1}
        count={10}
        value={value}
      />
    </Box>
  );
};

export const ApplicantReviewViewModal = ({
  show,
  setShow,
  applicantId,
  aggregateId,
  recruitmentId,
  pressReview,
}) => {
  const { data } = useGetReviewEventQuery({
    applicantId,
    aggregateId,
    recruitmentId,
  });
  const action = LIST_ACTION.find(
    (i) => i.id === data?.applicantReviewResultType
  );
  const mediumScore = Number(data?.averagePoint || 0);

  const theme = useTheme();

  const pressHide = () => {
    setShow(false);
  };

  return (
    <Modal
      open={show}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      onBackdropClick={pressHide}
    >
      <View
        hidden
        width={668}
        borderradius={8}
        bgcolor={theme.palette.common.white}
      >
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
                color={theme.palette.common.neutral700}
              />
            }
          />
        </View>
        <Divider />
        <View style={{ overflowY: "auto", height: "600px", padding: 24 }}>
          {data?.applicantReviewCriterias?.map((item, index) => {
            const { name, description, content, point } = item;

            return (
              <ReviewForm
                className="block-review"
                key={index}
                style={{ background: theme.palette.common.bgrMaster }}
              >
                <Label className="title" title="Tính cách">
                  {name}
                </Label>
                <p className="subTitleForm" title="">
                  {description}
                </p>
                <Text size={13} color={theme.palette.common.neutral700}>
                  {content}
                </Text>
                <Point value={point} onChange={undefined} />
              </ReviewForm>
            );
          })}

          <ReviewForm
            className="block-review block-review-result"
            style={{ background: theme.palette.common.bgrMaster }}
          >
            <Label className="title" title="Kết luận">
              {"Kết luận"}
            </Label>
            <View flexrow mv={16}>
              <Iconify
                icon={action?.icon}
                width={20}
                height={20}
                color={action?.color}
                mr={1}
              />
              <Typography
                fontSize={14}
                fontWeight={"600"}
                color={action?.color}
                textAlign={"center"}
              >
                {action?.name}
              </Typography>
            </View>
            <Text size={13} color={theme.palette.common.neutral700}>
              {data?.comment}
            </Text>

            <div className="input-content"></div>
          </ReviewForm>
        </View>
        <Divider />
        <View mt={16} ph={24} flexrow="row" jcbetween="true">
          <BoxFlex
            color={
              mediumScore.toFixed(2) < 4.9
                ? theme.palette.common.red600
                : mediumScore.toFixed(2) < 6.9
                ? theme.palette.common.orange700
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
          <ButtonDS
            type="submit"
            variant="contained"
            tittle={"Đánh giá lại"}
            onClick={pressReview}
          />
        </View>

        <View mt={8} mb={16} ph={24} style={{ width: undefined }}>
          <Text fontsize={12} italic color={theme.palette.common.neutral700}>
            {
              "Lưu ý: Đánh giá lại đồng nghĩa với tạo ra một bản đánh giá mớivà điểm trung bình sẽ tính theo bản đánh giá mới"
            }
          </Text>
        </View>
      </View>
    </Modal>
  );
};
