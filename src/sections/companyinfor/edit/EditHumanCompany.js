import UploadImage from "@/assets/UploadImage";
import PlusIcon from "@/assets/interview/PlusIcon";
import Iconify from "@/components/Iconify";
import Image from "@/components/Image";
import { FormProvider, RHFTextField } from "@/components/hook-form";
import {
  useGetCompanyInfoQuery,
  useUpdateCompanyHumanMutation,
  useUploadImageCompanyMutation,
} from "@/sections/companyinfor/companyInforSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { RiDeleteBin6Line } from "react-icons/ri";
import * as Yup from "yup";
import {DOMAIN_SERVER_API} from "@/config";

const InputStyle = { width: "100%", minHeight: 40, background: "white" };

const EditHumanCompany = ({ onClose }) => {
  const { data: Data } = useGetCompanyInfoQuery();
  const [updateCompanyHuman] = useUpdateCompanyHumanMutation();
  const [uploadImage] = useUploadImageCompanyMutation();
  const { enqueueSnackbar } = useSnackbar();

  const [imageFile, setImageFile] = useState([]);
  const [image, setImage] = useState([]);

  const handleChange = (e) => {
    setImageFile([...imageFile, ...e.target.files]);
    const id = e.target;
    const reader = new FileReader();
    let file = e.target.files[0];
    reader.onload = () => {
      setImage([...image, { file_id: id, uploaded_file: reader.result }]);
    };
    reader.readAsDataURL(file);
  };
  const defaultValues = {
    ...Data?.organizationHumans,
  };
  const ProfileSchema = Yup.object().shape({
    approvalProcessLevels: Yup.array().of(
      Yup.object().shape({
        avatar: Yup.string(),
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
    setError,
    setValue,
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "organizationHumans",
  });

  const onSubmit = async (d) => {
    const formData = new FormData();
    const listImage = d?.organizationHumans.map((item) => item.avatar[0]);
    const promies = listImage.map((file) => {
      formData.append("avatar", file);
      return uploadImage({
        File: file,
        OrganizationId: Data?.id,
      });
    });
    const resAvatar = await Promise.all(promies);

    try {
      if (resAvatar) {
        const res = {
          organizationId: Data?.id,
          organizationHumans: d?.organizationHumans.map((item, index) => {
            return {
              ...item,
              avatar: resAvatar.map((item) => item.data)[index],
            };
          }),
        };
        try {
          await updateCompanyHuman(res).unwrap();
          enqueueSnackbar("Chỉnh sửa thông tin Con người công ty thành công!", {
            autoHideDuration: 2000,
          });
          onClose();
          // location.reload()
        } catch (err) {
          enqueueSnackbar(errors.afterSubmit?.message, {
            autoHideDuration: 1000,
            variant: "error",
          });
        }
      }
    } catch (err) {
      const message =
        err?.Errors?.[0]?.Description || err?.Data?.message || err?.message;
      setError("afterSubmit", { ...err, message });
      enqueueSnackbar(errors.afterSubmit?.message);
    }
  };

  useEffect(async () => {
    if (!Data) return;
    setValue("organizationHumans", Data?.organizationHumans);
    const upload = [];
    Data?.organizationHumans.map((item) => {
      upload.push({
        uploaded_file: `${DOMAIN_SERVER_API}/Image/GetImage?imagePath=${item?.avatar}`,
      });
    });
    setImage(upload);
  }, [JSON.stringify(Data)]);
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <div>
        {fields.map((item, index) => {
          return (
            <Box
              sx={{mx: 3, my: 3, px: 3, py: 2, background: "#F2F4F5", display: "flex", borderRadius: "4px"}}
              key={item.id}
            >
              <Box sx={{ display: "flex", alignItems: "center", pr: 1 }}>
              <Iconify
                icon={"fluent:re-order-dots-vertical-16-filled"}
                width={20}
                height={20}
                color="#A2AAB7"
              />
              </Box>
              <Image
                disabledEffect
                visibleByDefault
                src={image[index]?.uploaded_file || '/assets/placeholder.png'}
                id={index}
                alt="image"
                sx={{display: "flex", width: "35%", height: 254, px: 2}}
              />

              <Box width="60%">
                <Box sx={{display: "flex", justifyContent: "space-between", marginBottom: "24px", marginTop: "12px",}}>
                  <Box>
                    <Button
                      sx={{
                        cursor: "pointer",
                        borderRadius: "6px",
                        border: "1px dashed #1976D2",
                        padding: "8px 12px",
                        "&:hover": {
                          background: "transparent",
                        },
                        "&:focus": {
                          background: "transparent",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          textTransform: "initial",
                        }}
                      >
                        <UploadImage />
                        <Typography
                          sx={{
                            fontSize: 14,
                            fontWeight: 600,
                            color: "#1976D2",
                            ml: "8px",
                          }}
                        >
                          Tải lên ảnh
                        </Typography>
                      </Box>
                      <input
                        // hidden
                        accept="image/*"
                        id="image"
                        type="file"
                        {...register(`organizationHumans.${index}.avatar`)}
                        onChange={handleChange}
                        style={{
                          position: "absolute",
                          left: 0,
                          height: "100%",
                          opacity: 0,
                          cursor: "pointer",
                          width: "inherit",
                        }}
                      />
                    </Button>
                  </Box>

                  <RiDeleteBin6Line
                    color="#E53935"
                    onClick={() => remove(index)}
                    cursor="pointer"
                  />
                </Box>
                <Stack sx={{ mb: 3 }}>
                  <RHFTextField
                    name={`organizationHumans.${index}.name`}
                    title="Họ và tên"
                    isRequired
                    placeholder="Nhập họ và tên cán bộ"
                    style={{ ...InputStyle }}
                  />
                </Stack>
                <Stack sx={{ mb: 3 }}>
                  <RHFTextField
                    name={`organizationHumans.${index}.description`}
                    title="Chức vụ"
                    placeholder="Nhập chức vụ của cán bộ"
                    style={{ ...InputStyle }}
                  />
                </Stack>
              </Box>
            </Box>
          );
        })}
        <Button
          variant="outlined"
          sx={{ textTransform: "none", width: "93%", mx: 3, mb: "100px" }}
          disabled={!isValid}
          onClick={() => {
            append({ ...defaultValues });
          }}
        >
          <PlusIcon />
          Thêm cán bộ
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
export default EditHumanCompany;
