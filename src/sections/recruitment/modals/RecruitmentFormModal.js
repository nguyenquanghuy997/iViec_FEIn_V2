import { ButtonDS, SwitchStatusDS } from "@/components/DesignSystem";
import { View, Text } from "@/components/DesignSystem/FlexStyled";
import Iconify from "@/components/Iconify";
import { FormProvider, RHFTextField } from "@/components/hook-form";
import { Label } from "@/components/hook-form/style";
import {
  useAddRecruitmentMutation,
  useGetPreviewRecruitmentMutation,
  useUpdateRecruitmentMutation,
} from "@/sections/recruitment";
import { ViewModel } from "@/utils/cssStyles";
import { yupResolver } from "@hookform/resolvers/yup";
import { CircularProgress, Divider, Modal } from "@mui/material";
import dynamic from "next/dynamic";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { ButtonCancelStyle } from "@/sections/applicant/style";
import {useTheme} from "@mui/material/styles";

const Editor = dynamic(() => import("../../companyinfor/edit/editor"), {
  ssr: false,
});

const defaultValues = {
  name: "",
  description: "",
  requirement: "",
  benefit: "",
  isActivated: true,
};
export const RecruitmentFormModal = ({ data, show, setShow, onRefreshData }) => {
  const isEditMode = !!data?.id;
  const theme = useTheme();
  const [description, setDescription] = useState(null);
  const [requirement, setRequirement] = useState(null);
  const [benefit, setBenefit] = useState(null);

  // api
  const [addForm] = useAddRecruitmentMutation();
  const [updateForm] = useUpdateRecruitmentMutation();
  const [getPreview, { data: { Data: preview = {} } = {} }] =
    useGetPreviewRecruitmentMutation();
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

      setDescription(null);
      setRequirement(null);
      setBenefit(null);
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

    setDescription(preview.description);
    setRequirement(preview.requirement);
    setBenefit(preview.benefit);
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
            bgcolor={theme.palette.common.white}
          >
            <Text flex="true" fontsize={16} fontweight={"600"}>
              {isEditMode
                ? "Chỉnh sửa vị trí công việc"
                : "Thêm mới vị trí công việc"}
            </Text>
            <ButtonDS
              type="submit"
              sx={{
                backgroundColor: theme.palette.common.white,
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
                  color={theme.palette.common.borderObject}
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
                {renderTitle("Tên vị trí công việc", true)}

                <RHFTextField
                  name={"name"}
                  placeholder="Nhập vị trí công việc"
                />
              </View>

              <Divider />
              {/* dept */}

              {/* des */}
              <View mt={28}>
                {renderTitle("Mô tả công việc")}
                <Editor
                  data={description}
                  // onChange={(_, e) => {
                  //   const text = e.getData();
                  //   setValue("description", text);
                  // }}
                  config={{
                    toolbar: [
                      "bold",
                      "|",
                      "italic",
                      "|",
                      "underline",
                      "|",
                      "link",
                      "|",
                      "bulletedList",
                      "|",
                      "numberedList",
                      "|",
                      "alignment",
                      "|",
                    ],
                  }}
                />
              </View>

              {/* require */}
              <View mt={28}>
                {renderTitle("Yêu cầu công việc")}

                <Editor
                  data={requirement}
                  // onChange={(_, e) => {
                  //   const text = e.getData();
                  //   setValue("requirement", text);
                  // }}
                  config={{
                    toolbar: [
                      "bold",
                      "|",
                      "italic",
                      "|",
                      "underline",
                      "|",
                      "link",
                      "|",
                      "bulletedList",
                      "|",
                      "numberedList",
                      "|",
                      "alignment",
                      "|",
                    ],
                  }}
                />
              </View>

              {/* benefit */}
              <View mt={28}>
                {renderTitle("Quyền lợi")}

                <Editor
                  data={benefit}
                  // onChange={(_, e) => {
                  //   const text = e.getData();
                  //   setValue("benefit", text);
                  // }}
                  config={{
                    toolbar: [
                      "bold",
                      "|",
                      "italic",
                      "|",
                      "underline",
                      "|",
                      "link",
                      "|",
                      "bulletedList",
                      "|",
                      "numberedList",
                      "|",
                      "alignment",
                      "|",
                    ],
                  }}
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
                label={isActivated ? "Đang hoạt động" : "Không hoạt động"}
              />
            )}
          </View>
        </ViewModel>
      </Modal>
    </FormProvider>
  );
};
