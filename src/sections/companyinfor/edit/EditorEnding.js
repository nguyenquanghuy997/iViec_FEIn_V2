import {useUpdateCompanyEndingMutation} from "../companyInforSlice";
import {FormProvider} from "@/components/hook-form";
import {Box} from "@mui/material";
import {useSnackbar} from "notistack";
import {useEffect} from "react";
import {useForm} from "react-hook-form";
import MuiButton from "@/components/BaseComponents/MuiButton";
import RHFTinyEditor from "@/components/editor/RHFTinyEditor";
import {STYLE_CONSTANT as style} from "@/theme/palette";

const EditorEnding = ({data, onClose}) => {
  const {enqueueSnackbar} = useSnackbar();
  const defaultValues = {
    conclusion: ''
  };
  const [updateEnding] = useUpdateCompanyEndingMutation();

  const methods = useForm({
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: {errors, isSubmitting},
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
    setValue('conclusion', data.conclusion);
  }, [data]);

  return (
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{
          px: 3,
          paddingBottom: 36,
          overflow: "hidden",
          background: style.BG_WHITE,
          padding: 3,
          mb: 8,
        }}>
          <RHFTinyEditor
              name={"conclusion"}
          />
        </Box>
        <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 0,
              position: "fixed",
              bottom: 0,
              background: "#FDFDFD",
              width: "100%",
              padding: "16px 24px",
              border: "1px solid #EFF3F6",
              zIndex: 1001,
            }}
        >
          <MuiButton
              title={"Lưu"}
              type="submit"
              loading={isSubmitting}
          />
          <MuiButton
              title={"Hủy"}
              color={"basic"}
              onClick={onClose}
          />
        </div>
      </FormProvider>
  );
};
export default EditorEnding;
