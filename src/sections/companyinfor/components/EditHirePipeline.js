import { useUpdateCompanyPipelineMutation } from "../companyInforSlice";
import { TextAreaDS } from "@/components/DesignSystem";
import { View } from "@/components/DesignSystem/FlexStyled";
import { FormProvider } from "@/components/hook-form";
import { Label } from "@/components/hook-form/style";
import { PipelineStateType } from "@/utils/enum";
import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  RiLock2Line,
} from "react-icons/ri";
import * as Yup from "yup";
import MuiButton from "@/components/BaseComponents/MuiButton";
import {renderIconByPipelineType} from "@/sections/companyinfor/components/HireProcess";

const EditHirePipeline = ({ data, onClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [infor] = useState([
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
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (d) => {
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
    try {
      await updatePipeline(res).unwrap();
      enqueueSnackbar("Chỉnh sửa thông tin công ty thành công!", {
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
  const renderTitle = (title, required) => {
    return <Label required={required}>{title}</Label>;
  };
  // const style = { color: "#E53935 ", fontSize: 15 };
  useEffect(() => {
    if (!data) return;
    setValue(
      "organizationProfilePipelines",
      data?.organizationProfilePipelines
    );
  }, [JSON.stringify(data)]);
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <View flex="true" p={24} pb={28} style={{ overflowY: "scroll" }}>
        {infor.map((issue, i) => (
          <View key={i} mb={24} p={24} style={{ background: "#F2F4F5" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                {renderIconByPipelineType(issue?.organizationProfilePipelineType)}
                <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
                  {PipelineStateType(issue?.organizationProfilePipelineType)}
                </Typography>
              </div>
              <RiLock2Line />
            </div>

            {renderTitle("Mô tả")}
            <TextAreaDS
              maxLength={150}
              value={data?.organizationProfilePipelines[i].description}
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
export default EditHirePipeline;
