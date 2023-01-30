import { Avatar } from "@/components/Avatar";
import { Text, View } from "@/components/FlexStyled";
import SvgIcon from "@/components/SvgIcon";
import { useGetPreviewJobTypeMutation } from "@/sections/jobtype";
import { LoadingButton } from "@mui/lab";
import { CircularProgress, Modal } from "@mui/material";
import moment from "moment";
import { useEffect } from "react";

export const JobTypePreviewModal = ({
  show,
  setShow,
  data,
  onEdit,
  onDelete,
}) => {
  const [getPreview, { data: { Data: preview = {} } = {} }] =
    useGetPreviewJobTypeMutation();

  const pressHide = () => {
    setShow(false);
  };

  const pressDelete = () => {
    pressHide();
    onDelete?.();
  };

  const pressEdit = () => {
    pressHide();
    onEdit?.();
  };

  const renderTitle = (title) => {
    return (
      <Text fontSize={15} color={"#7D8386"}>
        {String(title).toUpperCase()}
      </Text>
    );
  };

  const renderPersonItem = (title, name, mail) => {
    return (
      <View>
        {renderTitle(title)}

        <View
          mt={8}
          pv={12}
          ph={16}
          borderWidth={1}
          borderRadius={8}
          borderColor={"#C9D9E0"}
        >
          <View flexRow atCenter>
            <Avatar>{name}</Avatar>
            <Text ml={8} fontSize={15}>
              {name}
            </Text>
          </View>

          <View flexRow atCenter mt={8}>
            <SvgIcon>
              {
                '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.91663 12.3958H4.08329C1.95413 12.3958 0.729126 11.1708 0.729126 9.04163V4.95829C0.729126 2.82913 1.95413 1.60413 4.08329 1.60413H9.91663C12.0458 1.60413 13.2708 2.82913 13.2708 4.95829V9.04163C13.2708 11.1708 12.0458 12.3958 9.91663 12.3958ZM4.08329 2.47913C2.41496 2.47913 1.60413 3.28996 1.60413 4.95829V9.04163C1.60413 10.71 2.41496 11.5208 4.08329 11.5208H9.91663C11.585 11.5208 12.3958 10.71 12.3958 9.04163V4.95829C12.3958 3.28996 11.585 2.47913 9.91663 2.47913H4.08329Z" fill="#292D32"/><path d="M6.99991 7.50748C6.50991 7.50748 6.01408 7.35582 5.63491 7.04665L3.80908 5.58832C3.62241 5.43665 3.58741 5.16248 3.73908 4.97582C3.89075 4.78915 4.16492 4.75415 4.35158 4.90582L6.17741 6.36415C6.62074 6.71998 7.37324 6.71998 7.81657 6.36415L9.64241 4.90582C9.82908 4.75415 10.1091 4.78332 10.2549 4.97582C10.4066 5.16248 10.3774 5.44248 10.1849 5.58832L8.35908 7.04665C7.98575 7.35582 7.48991 7.50748 6.99991 7.50748Z" fill="#292D32"/></svg>'
              }
            </SvgIcon>
            <Text ml={8} fontSize={13}>
              {mail}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderInfoItem = (title, info) => {
    return (
      <View mt={32}>
        {renderTitle(title)}
        <View height={8} />

        <SvgIcon>{info}</SvgIcon>
      </View>
    );
  };

  useEffect(() => {
    show && getPreview({ JobTypeId: data.JobTypeId }).unwrap();
  }, [show, data.JobTypeId]);

  return (
    <Modal
      open={show}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      onBackdropClick={pressHide}
    >
      <View
        hidden
        p={24}
        width={765}
        height={799}
        borderRadius={8}
        bgColor={"#fff"}
      >
        {preview.JobTypeId ? (
          <>
            <View flexRow atCenter>
              <View flexRow atCenter>
                <Text fontSize={22} fontWeight={"700"}>
                  {preview.Description}
                </Text>
                {!!preview.Status && (
                  <>
                    <View
                      ml={12}
                      mr={10}
                      size={6}
                      borderRadius={6}
                      bgColor={"#00978A"}
                    />

                    <Text fontSize={16} color={"#00978A"}>
                      {"Đang hoạt động"}
                    </Text>
                  </>
                )}
              </View>
              <View flex1 />

              <View ml={8} onPress={pressHide}>
                <SvgIcon>
                  {
                    '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.74988 3.75L8.99987 9M8.99987 9L14.2499 14.25M8.99987 9L14.2499 3.75M8.99987 9L3.74988 14.25" stroke="#393B3E" stroke-width="2.025" stroke-linecap="round" stroke-linejoin="round"/></svg>'
                  }
                </SvgIcon>
              </View>
            </View>

            <View flexRow atCenter mt={8}>
              <Text fontSize={16}>{`Mã vị trí: ${
                preview.JobTypeCode || ""
              }`}</Text>

              {preview.ModifiedDate && (
                <>
                  <View mh={12} size={6} borderRadius={6} bgColor={"#929292"} />

                  <Text fontSize={16}>
                    {`Thời gian update: ${moment(preview.ModifiedDate).format(
                      "HH:mm DD/MM/YYYY"
                    )}`}
                  </Text>
                </>
              )}
            </View>

            <View flex1 mt={12} pv={12} style={{ overflow: "scroll" }}>
              <View flexRow>
                {renderPersonItem(
                  "NGƯỜI TẠO",
                  preview.CreatedUserName,
                  preview.CreatedUser
                )}

                {!!preview.ModifiedUser && (
                  <>
                    <View width={40} />
                    {renderPersonItem(
                      "NGƯỜI UPDATE",
                      preview.ModifiedUserName,
                      preview.ModifiedUser
                    )}
                  </>
                )}
              </View>

              {renderInfoItem("PHÒNG BAN", preview.CreatedUserName)}

              {renderInfoItem("MÔ TẢ CÔNG VIỆC", preview.JobRequirement)}

              {renderInfoItem("YÊU CẦU CÔNG VIỆC", preview.JobRequest)}

              {renderInfoItem("QUYỀN LỢI", preview.JobBenefit)}
            </View>
          </>
        ) : (
          <View flex1 contentCenter>
            <CircularProgress />
          </View>
        )}

        <View
          flexRow
          jcEnd
          mb={-24}
          mh={-24}
          pv={12}
          ph={16}
          bgColor={"#F8F8F9"}
          boxShadow={"inset 0px 1px 0px #EBECF4"}
        >
          <LoadingButton
            size="large"
            variant="text"
            color="error"
            onClick={pressDelete}
          >
            {"Xóa"}
          </LoadingButton>
          <View flex1 />

          <LoadingButton size="large" variant="contained" onClick={pressEdit}>
            {"Chỉnh sửa"}
          </LoadingButton>
        </View>
      </View>
    </Modal>
  );
};
