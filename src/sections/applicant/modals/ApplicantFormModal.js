import { DraggableList } from "@/components/DraggableList";
import { Text, View } from "@/components/FlexStyled";
import SvgIcon from "@/components/SvgIcon";
import {
  FormProvider,
  RHFSwitch,
  RHFTextField,
} from "@/components/hook-form";
import {
  ApplicantAddModal,
  ApplicantDraggableItem,
  useAddApplicantFormMutation,
  useUpdateApplicantFormMutation,
} from "@/sections/applicant";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const defaultValues = {
  name: "",
  list: [],
  isDefault: false,
  isActive: true,
};

export const ApplicantFormModal = ({ data, show, setShow, onRefreshData }) => {
  const isEditMode = !!data?.ApplicantId;

  // state
  const [listForm, setListForm] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editItemData, setEditItemData] = useState({});
  const [editItemIndex, setEditItemIndex] = useState(-1);

  // api
  const [addForm] = useAddApplicantFormMutation();
  const [updateForm] = useUpdateApplicantFormMutation();

  // form
  const Schema = Yup.object().shape({
    name: Yup.string().required("Chưa nhập tên mẫu đánh giá"),
    list: Yup.array().min(1, "Chưa thêm bước tuyển dụng"),
  });
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(Schema),
  });
  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const pressAdd = () => {
    setShowForm(true);
  };

  const pressHide = () => {
    setShow(false);
  };

  const pressSave = handleSubmit(async (e) => {
    const body = {
      ApplicantId: isEditMode ? data.ApplicantId : 0,
      ApplicantName: e.name,
      IsDefault: e.isDefault ? 1 : 0,
      Criterias: e.list.map((i) => ({
        CriteriaName: i.name,
        CriteriaNote: i.des,
      })),
      Status: e.isActive ? 1 : 0,
    };
    pressHide();
    isEditMode ? await updateForm(body).unwrap() : await addForm(body).unwrap();
    onRefreshData();
  });

  const onAddForm = (data) => {
    if (editItemIndex < 0) setListForm((l) => [...l, data]);
    else
      setListForm((l) =>
        [...l].map((item, index) => (index === editItemIndex ? data : item))
      );
  };

  const onEditForm = (item, index) => {
    setEditItemIndex(index);
    setEditItemData(item);
    pressAdd();
  };

  const onDeleteForm = (index) => {
    setListForm((l) => [...l].filter((_item, _index) => index !== _index));
  };

  const renderDraggableItem = (item, index) => {
    return (
      <ApplicantDraggableItem
        data={item}
        onPressAdd={pressAdd}
        onPressEdit={() => onEditForm(item, index)}
        onPressDelete={() => onDeleteForm(index)}
        isDefault={false}
      />
    );
  };

  const renderPreviewItem = () => {
    return ""
  };

  // useEffect(() => {
  //   if (!show) {
  //     reset();
  //     setValue("name", "");
  //     setValue("isDefault", false);
  //     setValue("isActive", true);
  //     setListForm([]);
  //     setShowForm(false);
  //     return;
  //   }

  //   if (!isEditMode) return;

  //   setValue("name", data.ApplicantName);
  //   setValue("isDefault", !!data.IsDefault);
  //   setValue("isActive", !!data.Status);
  //   setListForm(
  //     data.Criterias?.map?.((i) => ({
  //       name: i.CriteriaName,
  //       des: i.CriteriaNote,
  //     })) || []
  //   );
  // }, [show]);

  useEffect(() => {
    setValue("list", listForm);
    listForm.length && handleSubmit(() => {})();
  }, [listForm]);

  // useEffect(() => {
  //   if (!showForm) {
  //     setEditItemIndex(-1);
  //     setEditItemData({});
  //   }
  // }, [showForm]);

  return (
    <>
      <FormProvider methods={methods}>
        <Modal
          open={show}
          sx={{ display: "flex", justifyContent: "flex-end" }}
          onBackdropClick={pressHide}
        >
          <View flexRow bgColor={"#fff"}>
            {/* preview */}
            {!!listForm.length && (
              <View
                pv={32}
                ph={24}
                width={"40vw"}
                style={{ overflow: "scroll" }}
              >
                <Text mb={40} fontSize={20} fontWeight={"700"}>
                  {"Bản xem trước"}
                </Text>

                {listForm.map(renderPreviewItem)}
              </View>
            )}
            <View width={1} height={"100%"} bgColor={"#EBECF4"} />

            {/* form */}
            <View width={"40vw"}>
              {/* header */}
              <View flexRow pv={32} ph={24} bgColor={"#F1F5F8"}>
                <Text flex1 fontSize={28} fontWeight={"600"}>
                  {isEditMode ? "Sửa quy trình tuyển dụng" : "Thêm mới quy trình tuyển dụng"}
                </Text>

                <View
                  contentCenter
                  size={40}
                  borderRadius={4}
                  bgColor={"#fff"}
                  onPress={pressHide}
                >
                  <SvgIcon>
                    {
                      '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.33325 1.33334L5.99991 6.00001M5.99991 6.00001L10.6666 10.6667M5.99991 6.00001L10.6666 1.33334M5.99991 6.00001L1.33325 10.6667" stroke="#393B3E" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'
                    }
                  </SvgIcon>
                </View>
              </View>

              {/* body */}

              <View flex1 style={{ overflow: "scroll" }}>
                <View p={24} pb={16}>
                  <Text flexRow mb={8} fontWeight={"600"}>
                    {"Tên quy trình tuyển dụng"}
                    <Text ml={4} color={"#E82E25"}>
                      {"*"}
                    </Text>
                  </Text>

                  <RHFTextField name={"name"} placeholder={"Nhập tên quy trình tuyển dụng"} />
                  <View height={24} />

                  <Text italic>
                    {"Nhấn vào các bước và kéo thả để thay đổi thứ tự trong quy trình tuyển dụng"}
                  </Text>
                </View>

                <View p={24} bgColor={"#F8F8F9"}>
                  <ApplicantDraggableItem
                    data={[
                      {
                        name: "Ứng tuyển",
                        des: "Ứng viên ứng tuyển công việc",
                      },
                    ]}
                    isDefault={true}
                  />
                  <DraggableList
                    data={listForm}
                    setData={setListForm}
                    renderItem={renderDraggableItem}
                  />

                  <View mv={16} contentCenter onPress={pressAdd}>
                    <SvgIcon>
                      {
                        '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 20C4.47967 19.9939 0.00606237 15.5203 0 10V9.8C0.109931 4.30453 4.63459 -0.072041 10.1307 0.000882959C15.6268 0.0738069 20.0337 4.56889 19.9978 10.0653C19.9619 15.5618 15.4966 19.9989 10 20ZM5 9V11H9V15H11V11H15V9H11V5H9V9H5Z" fill="#01B6A7"/></svg>'
                      }
                    </SvgIcon>

                    <Text mt={6} color={"#00978A"} fontWeight={"600"}>
                      {"Thêm tiêu chí đánh giá"}
                    </Text>
                  </View>

                  <ApplicantDraggableItem
                    data={[
                      {
                        name: "Kết quả",
                        des: "Kết luận thông qua quá trình tuyển dụng và đánh giá",
                      },
                    ]}
                    isDefault={true}
                  />
                  <ApplicantDraggableItem
                    data={[
                      {
                        name: "Mời nhận việc",
                        des: "Gửi offer và chờ ứng viên phản hồi",
                      },
                    ]}
                    isDefault={true}
                  />
                </View>
                <RHFTextField
                  name={"list"}
                  variant={"standard"}
                  inputProps={{ style: { display: "none" } }}
                />
              </View>

              {/* footer */}
              <View
                flexRow
                pv={12}
                ph={16}
                boxShadow={"inset 0px 1px 0px #EBECF4"}
              >
                <LoadingButton
                  size="large"
                  variant="contained"
                  loading={isSubmitting}
                  onClick={pressSave}
                >
                  {isEditMode ? "Sửa" : "Thêm"}
                </LoadingButton>
                <View width={8} />

                <LoadingButton size="large" variant="text" onClick={pressHide}>
                  {"Hủy"}
                </LoadingButton>
                <View width={8} />
                <View flex1 />

                <RHFSwitch name={"isActive"} label={"Đang hoạt động"} />
              </View>
            </View>
          </View>
        </Modal>
      </FormProvider>

      {/* modal */}
      <ApplicantAddModal
        show={showForm}
        editData={editItemData}
        setShow={setShowForm}
        onSubmit={onAddForm}
        onDelete={() => onDeleteForm(editItemIndex)}
      />
    </>
  );
};
