import { Text, View } from "@/components/FlexStyled";
import SvgIcon from "@/components/SvgIcon";
import { FormProvider, RHFSwitch, RHFTextField } from "@/components/hook-form";
import {
  useAddJobTypeMutation,
  useGetPreviewJobTypeMutation,
  useUpdateJobTypeMutation,
} from "@/sections/jobtype";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { CircularProgress, Modal } from "@mui/material";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const Editor = dynamic(() => import("../../../sections/companyinfor/editor"), {
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

export const JobTypeFormModal = ({ data, show, setShow, onRefreshData }) => {
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
    onRefreshData();
  });

  // render
  const renderTitle = (title, required) => {
    return (
      <Text flexRow mb={8} fontWeight={"600"}>
        {title}
        {required && (
          <Text ml={4} color={"#E82E25"}>
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
    <>
      <FormProvider methods={methods}>
        <Modal
          open={show}
          sx={{ display: "flex", justifyContent: "flex-end" }}
          onBackdropClick={pressHide}
        >
          <View width={"40vw"} bgColor={"#fff"}>
            {/* header */}
            <View flexRow pv={32} ph={24} bgColor={"#F1F5F8"}>
              <Text flex1 fontSize={28} fontWeight={"600"}>
                {isEditMode
                  ? "Chỉnh sửa vị trí công việc"
                  : "Thêm mới vị trí công việc"}
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
            {isLoading ? (
              <View flex1 contentCenter>
                <CircularProgress />
              </View>
            ) : (
              <View flex1 p={24} pb={28} style={{ overflow: "scroll" }}>
                {/* code & name */}
                <View flexRow>
                  <View width={150}>
                    {renderTitle("Mã vị trí", true)}

                    <RHFTextField name={"code"} />
                  </View>

                  <View flex1 ml={20}>
                    {renderTitle("Tên vị trí công việc", true)}

                    <RHFTextField name={"name"} />
                  </View>
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
                  />
                  <RHFTextField
                    name={"des"}
                    variant={"standard"}
                    inputProps={{ style: { display: "none" } }}
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
                  />
                  <RHFTextField
                    name={"require"}
                    variant={"standard"}
                    inputProps={{ style: { display: "none" } }}
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
                  <RHFTextField
                    name={"benefit"}
                    variant={"standard"}
                    inputProps={{ style: { display: "none" } }}
                  />
                </View>
              </View>
            )}

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

              {isLoading ? null : (
                <RHFSwitch name={"isActive"} label={"Đang hoạt động"} />
              )}
            </View>
          </View>
        </Modal>
      </FormProvider>
    </>
  );
};
