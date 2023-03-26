import { useUpdateCompanyPipelineMutation } from "../companyInforSlice";
import IconRole1 from "@/assets/IconRole1";
import { TextAreaDS } from "@/components/DesignSystem";
import { View } from "@/components/DesignSystem/FlexStyled";
import { FormProvider } from "@/components/hook-form";
import { Label } from "@/components/hook-form/style";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  RiLock2Line, // RiDeleteBin5Fill
} from "react-icons/ri";
import * as Yup from "yup";

const EditHirePipeline = ({ data, onClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [infor,] = useState([
    {
      description: "",
      organizationProfilePipelineType: 0,
    },
    {
      description: "",
      organizationProfilePipelineType: 1,
    },
    {
      description: "",
      organizationProfilePipelineType: 2,
    },
    {
      description: "",
      organizationProfilePipelineType: 3,
    },
    {
      description: "",
      organizationProfilePipelineType: 4,
    },
  ]);
  const [updatePipeline] = useUpdateCompanyPipelineMutation();
  const defaultValues = {};
  // const handleImage = () => setInfor();
  const ProfileSchema = Yup.object().shape({
    organizationId: Yup.string(),
    organizationProfilePipelines: Yup.array().of(
      Yup.object().shape({
        organizationProfilePipelineType: Yup.boolean(),
        description: Yup.string(),
      })
    ),
  });

  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  const {
    // setValue,
    // setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (d) => {
    // console.log(d);

    const res = {
      organizationId: data?.id,
      organizationProfilePipelines: d.organizationProfilePipelines.map(
        (item, index) => {
          return {
            ...item,
            organizationProfilePipelineType: index,
          };
        }
      ),
    };
    // console.log(res, "res");
    try {
      await updatePipeline(res).unwrap();
      enqueueSnackbar("Chỉnh sửa thông tin công ty thành công!", {
        autoHideDuration: 2000,
      });
      onClose();
      // location.reload()
    } catch (err) {
      // console.log("reer", err);
      enqueueSnackbar(errors.afterSubmit?.message, {
        autoHideDuration: 1000,
        variant: "error",
      });
    }
  };
  const renderTitle = (title, required) => {
    return <Label required={required}>{title}</Label>;
  };
  // const style = { color: "#E53935 ", fontSize: 15 };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <View flex="true" p={24} pb={28} style={{ overflowY: "scroll" }}>
        {infor.map((issue, i) => (
          <View key={i} mb={24} p={24} style={{ background: "#F2F4F5" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <IconRole1 />
                <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
                  {/* {PipelineStateType(issue?.organizationProfilePipelineType, 1)} */}
                </Typography>
              </div>
              <RiLock2Line />
            </div>

            {renderTitle("Mô tả")}
            <TextAreaDS
              maxLength={150}
              placeholder="Nhập nội dung mô tả bước tuyển dụng..."
              name={`organizationProfilePipelines.${i}.description`}
            />
          </View>
        ))}
      </View>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: 12,
          position: "fixed",
          bottom: 0,
          background: "#FDFDFD",
          width: "100%",
          padding: "16px 24px",
          border: "1px solid #EFF3F6",
        }}
      >
        <LoadingButton
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{ backgroundColor: "#1976D2", p: 1, fontSize: 14 }}
        >
          {"Lưu"}
        </LoadingButton>
        <div style={{ width: 8 }} />

        <LoadingButton variant="text" sx={{ color: "#455570" }}>
          {"Hủy"}
        </LoadingButton>
      </div>
    </FormProvider>
  );
};
export default EditHirePipeline;
