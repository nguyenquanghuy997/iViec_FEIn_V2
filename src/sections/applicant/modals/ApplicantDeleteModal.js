import { ImgConfirm } from "../others";
import { Text, View } from "@/components/FlexStyled";
import { Modal } from "@mui/material";
import { useTheme } from "@mui/material/styles";


export const ApplicantDeleteModal = ({
  showDelete,
  setShowDelete,
  data,
  pressDelete,
}) => {
  const theme = useTheme();
  return (
    <Modal
      open={showDelete}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ".MuiModal-backdrop": {background: "rgba(9, 30, 66, 0.25)"}
      }}
      onBackdropClick={() => setShowDelete(false)}
    >
      <View contentCenter p={16} width={416} borderRadius={8} bgColor={theme.palette.background.paper}>
        <ImgConfirm/>
        
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
          {`Bạn có muốn xóa ${data.ApplicantName} không?`}
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
          <Text color={theme.palette.background.paper} fontSize={15} fontWeight={"700"}>
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
