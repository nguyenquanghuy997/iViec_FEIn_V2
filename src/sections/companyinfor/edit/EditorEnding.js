import { useUpdateCompanyEndingMutation } from "../companyInforSlice";
import FormModalBottom from "@/components/BaseComponents/form-modal/FormModalBottom";
import FormModalHead from "@/components/BaseComponents/form-modal/FormModalHead";
import RHFTinyEditor from "@/components/editor/RHFTinyEditor";
import { FormProvider } from "@/components/hook-form";
import { LabelStyle } from "@/components/hook-form/style";
import { Box } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const EditorEnding = ({ data, onClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const defaultValues = {
    conclusion: "",
  };
  const [updateEnding] = useUpdateCompanyEndingMutation();

  const methods = useForm({
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (d) => {
    const res = {
      organizationId: data?.id,
      conclusion: d?.conclusion,
    };
    try {
      await updateEnding(res).unwrap();
      enqueueSnackbar("Chỉnh sửa Lời kết công ty thành công!", {
        autoHideDuration: 2000,
      });
      onClose();
    } catch (err) {
      enqueueSnackbar(errors.afterSubmit?.message, {
        autoHideDuration: 1000,
        variant: "error",
      });
    }
  };

  useEffect(() => {
    if (!data) return;
    setValue("conclusion", data.conclusion);
  }, [data]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <FormModalHead title={"Chỉnh sửa Lời kết"} onClose={onClose} />

      <div className="edit-container">
        <LabelStyle required>Lời kết</LabelStyle>

        <Box>
          <RHFTinyEditor
            name={"conclusion"}
            placeholder={"Nhập nội dung lời kết"}
          />
        </Box>
      </div>
      <FormModalBottom
        onClose={onClose}
        loading={isSubmitting}
        btnConfirm={{
          title: "Lưu",
          type: "submit",
        }}
      />
    </FormProvider>
  );
};
export default EditorEnding;
