import {
  useAddPipelineMutation,
  useUpdatePipelineMutation,
} from "../PipelineFormSlice";
import { PipelineDraggableItem } from "../items";
import { PipelineAddModal } from "./PipelineAddModal";
import {
  ButtonDS,
  SwitchStatusDS,
  TextAreaDS,
} from "@/components/DesignSystem";
import { View, Text } from "@/components/DesignSystem/FlexStyled";
import { DraggableList } from "@/components/DraggableList";
import Iconify from "@/components/Iconify";
import { FormProvider, RHFTextField } from "@/components/hook-form";
import { Label } from "@/components/hook-form/style";
import { ButtonCancelStyle } from "@/sections/applicant/style";
import { ViewModel } from "@/utils/cssStyles";
import { PipelineStateType } from "@/utils/enum";
import { yupResolver } from "@hookform/resolvers/yup";
import { Divider, FormHelperText, Modal } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const defaultValues = {
  name: "",
  description: "",
  pipelineStates: [],
  isActivated: true,
};
export const PipelineFormModal = ({ data, show, onClose }) => {
  const isEditMode = !!data?.id;

  // api
  const [addForm] = useAddPipelineMutation();
  const [updateForm] = useUpdatePipelineMutation();

  // form
  const Schema = Yup.object().shape({
    name: Yup.string().required("Chưa nhập tên quy trình tuyển dụng"),
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
  const [errorStage, setErrorStage] = useState("");
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
    if (e.pipelineStates == 0) {
      setErrorStage("Chưa thêm bước tuyển dụng");
    } else {
      setIsDisabled(true);
      const param = {
        id: isEditMode ? data.id : "",
        body: {
          name: e.name,
          description: e.description,
          pipelineStates: e.pipelineStates.map((i) => ({
            state: i.stageType.id,
            description: i.des,
          })),
          isActivated: e.isActivated ? 1 : 0,
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

  // render
  const renderTitle = (title, required) => {
    return <Label required={required}>{title}</Label>;
  };
  const renderDraggableItem = (item, index) => {
    return (
      <PipelineDraggableItem
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
    if (!show) {
      reset(defaultValues);
      setIsDisabled(false);
      setListForm([]);
      setErrorStage("");
      return;
    }
  }, [show]);

  useEffect(() => {
    if (!isEditMode) return;
    setValue("name", data.name);
    setValue("description", data.description);
    setValue("isActivated", !!data.isActivated);
    setListForm(
      data.organizationPipelineStates
        ?.filter((p) => p.pipelineStateType == 1 || p.pipelineStateType == 2)
        .map(
          (i) =>
            i.pipelineStateType != 0 && {
              stageType: {
                id: i.pipelineStateType == 1 ? 0: 1,
                name: PipelineStateType(i.pipelineStateType),
              },
              des: i.description,
            }
        ) || []
    );
  }, []);
  useEffect(() => {
    setValue("pipelineStates", listForm);
    listForm.length && handleSubmit(() => {})();
  }, [listForm]);
  const isActivated = methods.watch("isActivated");
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
              {isEditMode
                ? "Chỉnh sửa quy trình tuyển dụng"
                : "Thêm mới quy trình tuyển dụng"}
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

            <View mb={24}>
              {renderTitle("Tên quy trình tuyển dụng", true)}

              <RHFTextField
                name={"name"}
                placeholder="Nhập tên quy trình tuyển dụng"
                maxLength={50}
              />
            </View>
            <View mb={24}>
              {renderTitle("Mô tả")}

              <TextAreaDS
                initialValue=""
                maxLength={255}
                placeholder="Nhập nội dung mô tả"
                name={"description"}
              />
            </View>
            <Divider />
            {/* dept */}
            <View pv={24}>
              {renderTitle("Bước tuyển dụng", true)}
              <FormHelperText error sx={{ mt: 0, mb: 1 }}>
                {errorStage && errorStage}
              </FormHelperText>
              <PipelineDraggableItem
                data={[
                  {
                    name: "Ứng tuyển",
                    des: "Ứng viên ứng tuyển trên Jobsite hoặc nhà tuyển dụng thêm vào tin",
                  },
                ]}
                isDefault={true}
              />
              <DraggableList
                data={listForm}
                setData={setListForm}
                renderItem={renderDraggableItem}
              />

              <ButtonDS
                type="submit"
                loading={isSubmitting}
                variant="contained"
                tittle={"Thêm bước tuyển dụng"}
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
              <PipelineDraggableItem
                data={[
                  {
                    name: "Kết quả",
                    des: "Tổng kết các đánh giá về ứng viên",
                  },
                ]}
                isDefault={true}
              />
              <PipelineDraggableItem
                data={[
                  {
                    name: "Mời nhận việc",
                    des: "Gửi thư mời nhận việc cho ứng viên",
                  },
                ]}
                isDefault={true}
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
              name={"isActivated"}
              label={isActivated ? "Đang hoạt động" : "Không hoạt động"}
            />
          </View>
        </ViewModel>
      </Modal>
      {/* modal */}
      {showForm && (
        <PipelineAddModal
          show={showForm}
          editData={editItemData}
          setShow={setShowForm}
          onSubmit={onAddForm}
        />
      )}
    </FormProvider>
  );
};
