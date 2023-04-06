import EditUpload from "../edit/EditUpload";
import MenuIcon from "@/assets/interview/MenuIcon";
import PlusIcon from "@/assets/interview/PlusIcon";
import { TextAreaDS } from "@/components/DesignSystem";
import { View } from "@/components/DesignSystem/FlexStyled";
import { FormProvider, RHFTextField } from "@/components/hook-form";
import { Label } from "@/components/hook-form/style";
import {
  useGetCompanyInfoQuery,
  useUpdateCompanyBusinessMutation,
  useUploadImageCompanyMutation,
  useAddOrganizationBusinessMutation,
} from "@/sections/companyinfor/companyInforSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import * as Yup from "yup";

const InputStyle = { width: "100%", minHeight: 40, background: "white" };

const EditBusinessArea = ({ onClose }) => {
  const { data: Data } = useGetCompanyInfoQuery();
  const isEditMode = !!Data?.organizationBusiness?.id;
  const [addOrganizationBusiness] = useAddOrganizationBusinessMutation();
  const [updateCompanyBusiness] = useUpdateCompanyBusinessMutation();
  const [uploadImage] = useUploadImageCompanyMutation();
  const { enqueueSnackbar } = useSnackbar();

  const [bg, setBg] = useState(null);
  const [imageBg, setImageBg] = useState(null);
  const handleImage = (e) => {
    setImageBg(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setBg(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const defaultValues = {};

  const ProfileSchema = Yup.object().shape({
    businessPhoto: Yup.string(),
    organizationBusinessDatas: Yup.array().of(
      Yup.object().shape({
        name: Yup.string(),
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
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, isValid },
  } = methods;

  const { fields, append } = useFieldArray({
    control,
    name: "organizationBusinessDatas",
  });

  const onSubmit = async (d) => {
    const bgRes = await uploadImage({
      OrganizationId: Data?.id,
      File: imageBg,
    });

    const res = {
      organizationId: isEditMode ? Data?.organizationBusiness?.id : Data?.id,
      businessPhoto: bgRes.data,
      organizationBusinessDatas: d.organizationBusinessDatas,
    };

    if (isEditMode) {
      try {
        await updateCompanyBusiness(res).unwrap();
        enqueueSnackbar("Chỉnh sửa Lĩnh vực công ty thành công!", {
          autoHideDuration: 2000,
        });
        onClose();
      } catch (err) {
        enqueueSnackbar("Thực hiện thất bại!", {
          autoHideDuration: 1000,
          variant: "error",
        });
      }
    } else {
      try {
        await addOrganizationBusiness(res).unwrap();
        enqueueSnackbar("Thêm Lĩnh vực công ty mới thành công!", {
          autoHideDuration: 2000,
        });
        onClose();
      } catch (err) {
        enqueueSnackbar("Thực hiện thất bại!", {
          autoHideDuration: 1000,
          variant: "error",
        });
      }
    }
  };

  const renderTitle = (title, required) => {
    return <Label required={required}>{title}</Label>;
  };

  useEffect(() => {
    if (!Data) return;
    // setValue(
    //   "organizationBusinessDatas",
    //   Data?.organizationBusiness.organizationBusinessDatas
    // );
    setBg(
      `http://103.176.149.158:5001/api/Image/GetImage?imagePath=${Data?.organizationBusiness?.businessPhoto}`
    );
  }, [JSON.stringify(Data)]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {/* {!!errors.afterSubmit && (
            <Alert severity="error">{errors.afterSubmit?.message}</Alert>
        )} */}
      <div>
        <Stack sx={{ px: 3 }}>
          <Box>
            <EditUpload
              image={bg}
              ref={{ ...register("businessPhoto") }}
              imageHandler={handleImage}
              style={{
                width: "100%",
                height: 222,
                background: "#EFF3F7",
                margin: "16px 0 24px 0",
              }}
            />
          </Box>
        </Stack>
        {fields.map((item, index) => {
          return (
            <Box
              sx={{
                mx: 3,
                my: 3,
                px: 3,
                py: 2,
                background: "#F2F4F5",
              }}
              key={item.id}
            >
              <Box sx={{ pb: 2 }}>
                <MenuIcon />
              </Box>

              <Stack justifyContent="space-between" sx={{ mb: 3 }}>
                <RHFTextField
                  name={`organizationBusinessDatas.${index}.name`}
                  title="Lĩnh vực kinh doanh"
                  isRequired
                  placeholder="Nhập lĩnh vực kinh doanh"
                  style={{ ...InputStyle }}
                />
              </Stack>
              <Stack justifyContent="space-between" sx={{ mb: 3 }}>
                <View mb={24}>
                  {renderTitle("Mô tả")}
                  <TextAreaDS
                    maxLength={150}
                    placeholder="Nhập nội dung mô tả lĩnh vực kinh doanh..."
                    name={`organizationBusinessDatas.${index}.description`}
                  />
                </View>
              </Stack>
            </Box>
          );
        })}
        <Button
          variant="outlined"
          sx={{ textTransform: "none", width: "95%", mx: 3, mb: "86px" }}
          disabled={!isValid}
          onClick={() => {
            append({ ...defaultValues });
          }}
        >
          <PlusIcon />
          Thêm lĩnh vực kinh doanh
        </Button>
      </div>
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

        <LoadingButton
          variant="text"
          onClick={onClose}
          sx={{ color: "#455570" }}
        >
          {"Hủy"}
        </LoadingButton>
      </div>
    </FormProvider>
  );
};
export default EditBusinessArea;
