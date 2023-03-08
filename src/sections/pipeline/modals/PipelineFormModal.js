import {
  ButtonDS,
  SwitchStatusDS,
  TextAreaDS,
} from "@/components/DesignSystem";
import { View, Text } from "@/components/DesignSystem/FlexStyled";
import Iconify from "@/components/Iconify";
import { FormProvider, RHFTextField } from "@/components/hook-form";
import { Label } from "@/components/hook-form/style";
import { ButtonCancelStyle } from "@/sections/applicant/style";
import {
  useAddJobTypeMutation,
  useGetPreviewJobTypeMutation,
  useUpdateJobTypeMutation,
} from "@/sections/jobtype";
import { ViewModel } from "@/utils/cssStyles";
import { yupResolver } from "@hookform/resolvers/yup";
import { CircularProgress, Divider, Modal } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { PipelineDraggableItem } from "../items";
import { DraggableList } from "@/components/DraggableList";
import SvgIcon from "@/components/SvgIcon";


const defaultValues = {
  name: "",
  description: "",
  requirement: "",
  benefit: "",
  isActivated: true,
};
export const PipelineFormModal = ({ data, show, setShow, onRefreshData }) => {
  const isEditMode = !!data?.id;


  // api
  const [addForm] = useAddJobTypeMutation();
  const [updateForm] = useUpdateJobTypeMutation();
  const [getPreview, { data: { Data: preview = {} } = {} }] =
    useGetPreviewJobTypeMutation();
  const isLoading = isEditMode && !preview.id;

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

  // action
  const pressHide = () => {
    setShow(false);
  };
  const { enqueueSnackbar } = useSnackbar();
  const pressSave = handleSubmit(async (e) => {
    const body = {
      id: isEditMode ? data.id : 0,
      name: e.name,
      description: e.description,
      requirement: e.requirement,
      benefit: e.benefit,
      isActivated: e.isActivated ? 1 : 0,
    };
    if (isEditMode) {
      try {
        await updateForm(body).unwrap();
        enqueueSnackbar("Thực hiện thành công!", {
          autoHideDuration: 2000,
        });
        pressHide();
        onRefreshData();
      } catch (err) {
        if (err.status === "JPE_05") {
          enqueueSnackbar("Vị trí công việc đã tồn tại!", {
            autoHideDuration: 1000,
            variant: "error",
          });
        } else {
          enqueueSnackbar("Thực hiện thất bại!", {
            autoHideDuration: 1000,
            variant: "error",
          });
        }
      }
    } else {
      try {
        await addForm(body).unwrap();
        enqueueSnackbar("Thực hiện thành công!", {
          autoHideDuration: 1000,
        });
        pressHide();
        onRefreshData();
      } catch (err) {
        if (err.status === "JPE_05") {
          enqueueSnackbar("Vị trí công việc đã tồn tại!", {
            autoHideDuration: 1000,
            variant: "error",
          });
        } else {
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

  // effect
  useEffect(() => {
    if (!show) {
      reset();
      setValue("name", "");
      setValue("description", "");
      setValue("requirement", "");
      setValue("benefit", "");
      setValue("isActivated", true);

      return;
    }

    if (!isEditMode) return;

    getPreview({ id: data.id }).unwrap();
  }, [show]);

  useEffect(() => {
    if (!preview.id) return;
    setValue("name", preview.name);
    setValue("description", preview.description);
    setValue("requirement", preview.requirement);
    setValue("benefit", preview.benefit);
    setValue("isActivated", !!preview.isActivated);

  }, [isEditMode, preview.id]);
  const isActivated = methods.watch("isActivated");
   // state
   const [listForm, setListForm] = useState([]);

  //  const [showForm, setShowForm] = useState(false);
  //  const [editItemData, setEditItemData] = useState({});
  //  const [editItemIndex, setEditItemIndex] = useState(-1);

  return (
    <FormProvider methods={methods}>
      <Modal
        open={show}
        onClose={pressHide}
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
              onClick={pressHide}
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
          {isLoading ? (
            <View flex="true" contentcenter="true">
              <CircularProgress />
            </View>
          ) : (
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
                {renderTitle("Mô tả", true)}

                <TextAreaDS
                  maxLength={255}
                  placeholder="Nhập nội dung mô tả"
                  name={"description"}
                />
              </View>
              <Divider />
              {/* dept */}

              <View p={24} bgColor={"#F8F8F9"}>
                  <PipelineDraggableItem
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
                    // renderItem={renderDraggableItem}
                  />

                  <View mv={16} contentCenter >
                    <SvgIcon>
                      {
                        '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 20C4.47967 19.9939 0.00606237 15.5203 0 10V9.8C0.109931 4.30453 4.63459 -0.072041 10.1307 0.000882959C15.6268 0.0738069 20.0337 4.56889 19.9978 10.0653C19.9619 15.5618 15.4966 19.9989 10 20ZM5 9V11H9V15H11V11H15V9H11V5H9V9H5Z" fill="#01B6A7"/></svg>'
                      }
                    </SvgIcon>

                    <Text mt={6} color={"#00978A"} fontWeight={"600"}>
                      {"Thêm tiêu chí đánh giá"}
                    </Text>
                  </View>

                  <PipelineDraggableItem
                    data={[
                      {
                        name: "Kết quả",
                        des: "Kết luận thông qua quá trình tuyển dụng và đánh giá",
                      },
                    ]}
                    isDefault={true}
                  />
                  <PipelineDraggableItem
                    data={[
                      {
                        name: "Mời nhận việc",
                        des: "Gửi offer và chờ ứng viên phản hồi",
                      },
                    ]}
                    isDefault={true}
                  />
                </View>
            </View>
          )}
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
            />
            <View width={8} />
            <ButtonCancelStyle onClick={pressHide}>Hủy</ButtonCancelStyle>
            <View width={8} />
            <View flex="true" />

            {isLoading ? null : (
              <SwitchStatusDS
                name={"isActivated"}
                label={isActivated ? "Đang hoạt động" : "Ngừng hoạt động"}
              />
            )}
          </View>
        </ViewModel>
      </Modal>
    </FormProvider>
  );
};
