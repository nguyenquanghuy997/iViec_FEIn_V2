import { ButtonDS, SwitchStatusDS } from "@/components/DesignSystem";
import { View, Text } from "@/components/DesignSystem/FlexStyled";
import Iconify from "@/components/Iconify";
import RHFTinyEditor from "@/components/editor/RHFTinyEditor";
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
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";


const defaultValues = {
  name: "",
  description: "",
  requirement: "",
  benefit: "",
  isActivated: true,
};
export const JobTypeFormModal = ({ data, show, setShow, onRefreshData }) => {
  const isEditMode = !!data?.id;

  // api
  const [addForm] = useAddJobTypeMutation();
  const [updateForm] = useUpdateJobTypeMutation();
  const [getPreview, { data: { Data: preview = {} } = {} }] =
    useGetPreviewJobTypeMutation();
  const isLoading = isEditMode && !preview.id;

  // form
  const Schema = Yup.object().shape({
    name: Yup.string().required("Chưa nhập tên vị trí công việc"),
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
                ? "Chỉnh sửa vị trí công việc"
                : "Thêm mới vị trí công việc"}
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
                <Label required>Tên vị trí công việc</Label>
                <RHFTextField
                  name={"name"}
                  placeholder="Nhập tên vị trí công việc"
                />
              </View>

              <Divider />
              {/* dept */}

              {/* des */}
              <View mt={28}>
                <Label>Mô tả công việc</Label>
                <RHFTinyEditor
                  name="description"
                  placeholder="Nhập mô tả công việc..."
                />
              </View>

              {/* require */}
              <View mt={28}>
                <Label>Yêu cầu công việc</Label>
                <RHFTinyEditor
                  name="requirement"
                  placeholder="Nhập yêu cầu công việc..."
                />
              </View>

              {/* benefit */}
              <View mt={28}>
                <Label>Quyền lợi</Label>
                <RHFTinyEditor name="benefit" placeholder="Nhập quyền lợi..." />
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
