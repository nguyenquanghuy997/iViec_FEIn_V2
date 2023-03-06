import { ButtonDS, SwitchDS } from "@/components/DesignSystem";
import { View, Text } from "@/components/DesignSystem/FlexStyled";
import Iconify from "@/components/Iconify";
import { FormProvider, RHFTextField } from "@/components/hook-form";
import {
  useAddJobTypeMutation,
  useGetPreviewJobTypeMutation,
  useUpdateJobTypeMutation,
} from "@/sections/jobtype";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { CircularProgress, Divider, Modal } from "@mui/material";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { ViewModel } from "@/utils/cssStyles";


const Editor = dynamic(() => import("../../companyinfor/edit/editor"), {
  ssr: false,
});

const defaultValues = {
  code: "",
  name: "",
  des: "",
  require: "",
  benefit: "",
  isActive: true,
};
export const JobTypeFormModal = ({ data, show, setShow }) => {
  const isEditMode = !!data?.JobTypeId;

  const [des, setDes] = useState(null);
  const [require, setRequire] = useState(null);
  const [benefit, setBenefit] = useState(null);

  // api
  const [addForm] = useAddJobTypeMutation();
  const [updateForm] = useUpdateJobTypeMutation();
  const [getPreview, { data: { Data: preview = {} } = {} }] =
    useGetPreviewJobTypeMutation();
  const isLoading = isEditMode && !preview.JobTypeId;

  // form
  const Schema = Yup.object().shape({
    code: Yup.string().required("Chưa nhập mã vị trí"),
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

  const pressSave = handleSubmit(async (e) => {
    const body = {
      JobTypeId: isEditMode ? data.JobTypeId : 0,
      JobTypeCode: e.code,
      Description: e.name,
      JobRequirement: e.des,
      JobRequest: e.require,
      JobBenefit: e.benefit,
      Status: e.isActive ? 1 : 0,
    };
    pressHide();
    isEditMode ? await updateForm(body).unwrap() : await addForm(body).unwrap();
    // onRefreshData();
  });

  // render
  const renderTitle = (title, required) => {
    return (
      <Text flexrow="true" mb={8} fontweight={"600"}>
        {title}
        {required && (
          <Text ml={4} mb={0} color={"#E82E25"}>
            {"*"}
          </Text>
        )}
      </Text>
    );
  };

  // effect
  useEffect(() => {
    if (!show) {
      reset();
      setValue("code", "");
      setValue("name", "");
      setValue("des", "");
      setValue("require", "");
      setValue("benefit", "");
      setValue("isActive", true);

      setDes(null);
      setRequire(null);
      setBenefit(null);
      return;
    }

    if (!isEditMode) return;

    getPreview({ JobTypeId: data.JobTypeId }).unwrap();
  }, [show]);

  useEffect(() => {
    if (!preview.JobTypeId) return;

    setValue("code", preview.JobTypeCode);
    setValue("name", preview.Description);
    setValue("des", preview.JobRequirement);
    setValue("require", preview.JobRequest);
    setValue("benefit", preview.JobBenefit);
    setValue("isActive", !!preview.Status);

    setDes(preview.JobRequirement);
    setRequire(preview.JobRequest);
    setBenefit(preview.JobBenefit);
  }, [isEditMode, preview.JobTypeId]);

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
              <View>
                {renderTitle("Tên vị trí công việc", true)}

                <RHFTextField name={"name"} />
              </View>

              {/* dept */}

              {/* des */}
              <View mt={28}>
                {renderTitle("Mô tả công việc")}

                <Editor
                  data={des}
                  onChange={(_, e) => {
                    const text = e.getData();
                    setValue("des", text);
                  }}
                  config={{
                    toolbar: {
                      items: [
                          'heading',
                          '|',
                          'bold',
                          '|',
                          'italic',
                          '|',
                          'underline',
                          '|',
                          "link",
                          '|',
                          'strikethrough',
                          '|',
                          'subscript',
                          '|',
                          'superscript',
                          '|',
                          'bulletedList',
                          '|',
                          'numberedList',
                          '|',
                          'todoList',
                          '|',
                          'alignment',
                          '|',
                          'outdent',
                          '|',
                          'indent',
                      ]
                  }
                  }}
                />

              </View>

              {/* require */}
              <View mt={28}>
                {renderTitle("Yêu cầu công việc")}

                <Editor
                  data={require}
                  onChange={(_, e) => {
                    const text = e.getData();
                    setValue("require", text);
                  }}
                  config={{
                    toolbar: [
                      "heading",
                      "|",
                      "bold",
                      "italic",
                      "link",
                      "bulletedList",
                      "numberedList",
                      "blockQuote",
                    ],
                  }}
                />
              </View>

              {/* benefit */}
              <View mt={28}>
                {renderTitle("Quyền lợi")}

                <Editor
                  data={benefit}
                  onChange={(_, e) => {
                    const text = e.getData();
                    setValue("benefit", text);
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
            <View flex="true" />

            {isLoading ? null : (
              <SwitchDS name={"isActive"} label={"Đang hoạt động"} />
            )}
          </View>
        </ViewModel>
      </Modal>
    </FormProvider>
  );
};
