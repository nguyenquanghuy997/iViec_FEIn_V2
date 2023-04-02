import {
  useAddReviewFormMutation,
  useGetReviewFormByIdQuery,
  useUpdateReviewFormMutation,
} from "../evaluationFormSlice";
import { EvaluationDraggableItem } from "../items/EvaluationDraggableItem";
import { EvaluationAddModal } from "./EvaluationAddModal";
import { ButtonDS, SwitchStatusDS } from "@/components/DesignSystem";
import { View, Text } from "@/components/DesignSystem/FlexStyled";
import { DraggableList } from "@/components/DraggableList";
import Iconify from "@/components/Iconify";
import {
  FormProvider,
  RHFCheckbox,
  RHFTextField,
} from "@/components/hook-form";
import { Label } from "@/components/hook-form/style";
import { ButtonCancelStyle } from "@/sections/applicant/style";
import { ViewModel } from "@/utils/cssStyles";
import { yupResolver } from "@hookform/resolvers/yup";
import { Divider, FormHelperText, Modal } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const defaultValues = {
  name: "",
  description: "",
  reviewFormCriterias: [],
  isDefault: false,
  isActive: true,
};
export const EvaluationFormModal = ({ id, show, onClose }) => {
  const isEditMode = !!id;

  const { data: data } = useGetReviewFormByIdQuery(
    {
      Id: id,
    },
    { skip: !id }
  );
  // api
  const [addForm] = useAddReviewFormMutation();
  const [updateForm] = useUpdateReviewFormMutation();

  // form
  const Schema = Yup.object().shape({
    name: Yup.string().required("Chưa nhập tên mẫu đánh giá"),
  });
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(Schema),
  });
  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  // state
  const [listForm, setListForm] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [editItemData, setEditItemData] = useState({});
  const [editItemIndex, setEditItemIndex] = useState(-1);
  const pressAdd = () => {
    setEditItemData({});
    setEditItemIndex(-1);
    setShowForm(true);
  };

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
    setShowForm(true);
  };

  const onDeleteForm = (index) => {
    setListForm((l) => [...l].filter((_item, _index) => index !== _index));
  };

  const { enqueueSnackbar } = useSnackbar();
  const pressSave = handleSubmit(async (e) => {
    if (e.reviewFormCriterias == 0) {
      setError("Chưa thêm tiêu chí đánh giá");
    } else {
      setIsDisabled(true);
      const param = {
        id: isEditMode ? data.id : "",
        body: {
          name: e.name,
          description: e.description,
          isActive: e.isActive ? true : false,
          isDefault: e.isDefault ? true : false,

          reviewFormCriterias: e.reviewFormCriterias.map((i) => ({
            name: i.name,
            description: i.des,
            isRequired: i.isRequired ? true:false,
          })),
        },
      };
      if (isEditMode) {
        try {
          await updateForm(param).unwrap();
          enqueueSnackbar("Thực hiện thành công!", {
            autoHideDuration: 1000,
          });
          onClose();
        } catch (err) {
          setIsDisabled(false);
          enqueueSnackbar("Thực hiện thất bại!", {
            autoHideDuration: 1000,
            variant: "error",
          });
        }
      } else {
        try {
          await addForm(param.body).unwrap();
          enqueueSnackbar("Thực hiện thành công!", {
            autoHideDuration: 1000,
          });
          onClose();
        } catch (err) {
          setIsDisabled(false);
          enqueueSnackbar("Thực hiện thất bại!", {
            autoHideDuration: 1000,
            variant: "error",
          });
        }
      }
    }
  });

  const renderDraggableItem = (item, index) => {
    return (
      <EvaluationDraggableItem
        data={item}
        onPressAdd={pressAdd}
        onPressEdit={() => onEditForm(item, index)}
        onPressDelete={() => onDeleteForm(index)}
        isDefault={false}
      />
    );
  };
  // effect
  useEffect(() => {
    if (!isEditMode) {
      reset(defaultValues);
      setIsDisabled(false);
      setListForm([
        {
          name: "Tiêu chí mặc định",
          isRequired: true,
          des: "Mô tả tiêu chí mặc định",
        },
      ]);
      setError("");
      return;
    }
  }, [show]);
  useEffect(() => {
    if (!isEditMode) return;
    setValue("name", data?.name);
    setValue("description", data?.description);
    setValue("isActive", !!data?.isActive);
    setValue("isDefault", !!data?.isDefault);
    setListForm(
      data?.reviewFormCriterias?.map((i) => ({
        name: i.name,
        isRequired: i.isRequired,
        des: i.description,
      })) || []
    );
  }, [data]);
  useEffect(() => {
    setValue("reviewFormCriterias", listForm);
    setEditItemIndex(-1);
  }, [listForm]);
  const isActive = methods.watch("isActive");
  return (
    <FormProvider methods={methods}>
      <Modal
        open={show}
        onClose={onClose}
        sx={{ display: "flex", justifyContent: "flex-end" }}
      >
        <ViewModel>
          {/* header */}
          <View
            flexrow="true"
            atcenter="center"
            pv={12}
            ph={24}
            bgcolor={"#FDFDFD"}
          >
            <Text flex="true" fontsize={16} fontweight={"600"}>
              {isEditMode ? "Chỉnh sửa mẫu đánh giá" : "Thêm mới mẫu đánh giá"}
            </Text>
            <ButtonDS
              type="submit"
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
            {/* code & name */}

            <View mb={16}>
              <Label required={true}>{"Tên mẫu đánh giá"}</Label>
              <RHFTextField
                name={"name"}
                placeholder="Nhập mẫu đánh giá"
                maxLength={150}
              />
            </View>
            <View mb={20}>
              <RHFCheckbox
                style={{ marginLeft: "-8px" }}
                name="isDefault"
                label="Đặt mẫu đánh giá mặc định"
              />
            </View>
            <Divider />
            {/* dept */}
            <View pv={24}>
              <Label
                required={true}
                sx={{ color: "#455570", fontSize: 16, fontWeight: 600 }}
              >
                {"Tiêu chí đánh giá"}
              </Label>
              <FormHelperText error sx={{ mt: 0, mb: 1 }}>
                {error && error}
              </FormHelperText>
              <DraggableList
                data={listForm}
                setData={setListForm}
                renderItem={renderDraggableItem}
              />

              <ButtonDS
                type="submit"
                loading={isSubmitting}
                variant="contained"
                tittle={"Thêm tiêu chí đánh giá"}
                onClick={pressAdd}
                sx={{
                  marginBottom: "16px",
                  textTransform: "unset",
                  boxShadow: "unset",
                  backgroundColor: "#fff",
                  color: "#1976D2",
                  border: "1px solid #1976D2",
                  "&:hover": { backgroundColor: "#EFF3F7" },
                }}
                icon={
                  <Iconify
                    icon={"material-symbols:add"}
                    width={20}
                    height={20}
                    color="#1976D2"
                    mr={1}
                  />
                }
              />
            </View>
          </View>
          {/* footer */}
          <View
            flexrow="true"
            pv={12}
            ph={16}
            boxshadow={"inset 0px 1px 0px #EBECF4"}
          >
            <ButtonDS
              type="submit"
              loading={isSubmitting}
              variant="contained"
              tittle={isEditMode ? "Sửa" : "Thêm"}
              onClick={pressSave}
              isDisabled={isDisabled}
            />
            <View width={8} />
            <ButtonCancelStyle onClick={onClose}>Hủy</ButtonCancelStyle>
            <View width={8} />
            <View flex="true" />

            <SwitchStatusDS
              name={"isActive"}
              label={isActive ? "Đang hoạt động" : "Không hoạt động"}
            />
          </View>
        </ViewModel>
      </Modal>
      {/* modal */}
      {showForm && (
        <EvaluationAddModal
          show={showForm}
          editData={editItemData}
          setShow={setShowForm}
          onSubmit={onAddForm}
        />
      )}
    </FormProvider>
  );
};
