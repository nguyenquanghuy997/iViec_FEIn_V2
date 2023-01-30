import { ImgConfirm } from "../others";
import { Text, View } from "@/components/FlexStyled";
import { Modal } from "@mui/material";

export const EvaluationDeleteModal = ({
  showDelete,
  setShowDelete,
  data,
  pressDelete,
}) => {
  return (
    <Modal
      open={showDelete}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      onBackdropClick={() => setShowDelete(false)}
    >
      <View contentCenter p={16} width={416} borderRadius={8} bgColor={"#fff"}>
        <ImgConfirm />

        <Text centerAlign mt={24} mb={12} fontSize={20} fontWeight={"700"}>
          {"Xác nhận xóa mẫu đánh giá"}
        </Text>

        <Text
          centerAlign
          mb={16}
          fontSize={16}
          lineHeight={24 / 16}
          fontWeight={"500"}
        >
          {`Bạn có muốn xóa ${data.ReviewName} không?`}
        </Text>

        <View
          contentCenter
          width={"100%"}
          mb={10}
          height={42}
          borderRadius={8}
          bgColor={"#E82E25"}
          onPress={pressDelete}
        >
          <Text color={"#fff"} fontSize={15} fontWeight={"700"}>
            {"Xác nhận"}
          </Text>
        </View>

        <View
          contentCenter
          width={"100%"}
          height={42}
          borderRadius={8}
          onPress={() => setShowDelete(false)}
        >
          <Text fontSize={15} fontWeight={"700"}>
            {"Hủy"}
          </Text>
        </View>
      </View>
    </Modal>
  );
};
