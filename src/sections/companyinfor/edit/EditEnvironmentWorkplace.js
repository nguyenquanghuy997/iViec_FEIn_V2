import PlusIcon from "@/assets/interview/PlusIcon";
import MuiButton from "@/components/BaseComponents/MuiButton";
import FormModalBottom from "@/components/BaseComponents/form-modal/FormModalBottom";
import FormModalHead from "@/components/BaseComponents/form-modal/FormModalHead";
import { TextAreaDS } from "@/components/DesignSystem";
import Iconify from "@/components/Iconify";
import Image from "@/components/Image";
import SvgIcon from "@/components/SvgIcon";
import { FormProvider, RHFTextField } from "@/components/hook-form";
import { LabelStyle } from "@/components/hook-form/style";
import { DOMAIN_SERVER_API } from "@/config";
import {
  useUpdateCompanyEnvironmentMutation,
  useUploadImageCompanyMutation,
} from "@/sections/companyinfor/companyInforSlice";
import RHFUploadImage from "@/sections/companyinfor/upload/RHFUploadImage";
import { useTheme } from "@emotion/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Stack } from "@mui/material";
import { get, isEmpty } from "lodash";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { RiDeleteBin6Line } from "react-icons/ri";
import * as Yup from "yup";

const EditEnvironmentWorkplace = ({ data, onClose }) => {
  const [updateCompanyWorkingEnvironment] =
    useUpdateCompanyEnvironmentMutation();
  const [uploadImage] = useUploadImageCompanyMutation();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = {
    organizationWorkingEnvironments: isEmpty(
      get(data, "organizationWorkingEnvironments")
    )
      ? []
      : data?.organizationWorkingEnvironments?.map((item) => ({
          image: item.image ? item.image : "",
          imagePreview: "",
          name: item.name,
          description: item.description,
        })),
  };
  const Schema = {
    name: Yup.string()
      .nullable()
      .required("Lĩnh vực kinh doanh không được bỏ trống"),
    description: Yup.string().nullable().required("Mô tả không được bỏ trống"),
  };
  const ProfileSchema = Yup.object().shape({
    organizationWorkingEnvironments: Yup.array().of(Yup.object().shape(Schema)),
  });
  const methods = useForm({
    mode: "onSubmit",
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });
  const {
    setValue,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = methods;
  const { fields, append, move, remove } = useFieldArray({
    control,
    name: "organizationWorkingEnvironments",
  });

  const organizationWorkingEnvironments = useWatch({
    control,
    name: "organizationWorkingEnvironments",
  });
  const onSubmit = async (formData) => {
    const imageData = formData?.organizationWorkingEnvironments
      ?.filter((item) => item.image !== null && typeof item.image === "object")
      ?.map((item) => item.image?.[0]);
    if (imageData.length === 0) {
      const body = {
        organizationId: data?.id,
        organizationWorkingEnvironments:
          formData?.organizationWorkingEnvironments?.map((item) => ({
            image: item.image,
            name: item.name,
            description: item.description,
          })),
      };
      try {
        await updateCompanyWorkingEnvironment(body).unwrap();
        enqueueSnackbar("Chỉnh sửa thông tin Môi trường làm việc thành công!", {
          autoHideDuration: 2000,
        });
        onClose();
      } catch (err) {
        enqueueSnackbar(
          "Chỉnh sửa thông tin Môi trường làm việc không thành công!",
          {
            autoHideDuration: 1000,
            variant: "error",
          }
        );
        throw err;
      }
    } else {
      const form = new FormData();
      const promises = imageData.map((file) => {
        form.append("image", file);
        return uploadImage({
          File: file,
          OrganizationId: data?.id,
        });
      });
      try {
        const imageRes = await Promise.all(promises);
        if (imageRes) {
          let dataSubmit = [];
          let counter = 0;
          for (
            let i = 0;
            i < formData?.organizationWorkingEnvironments?.length;
            i++
          ) {
            if (
              typeof formData?.organizationWorkingEnvironments[i]?.image ===
                "string" ||
              !formData?.organizationWorkingEnvironments[i]?.image
            ) {
              dataSubmit.push({
                ...formData?.organizationWorkingEnvironments[i],
              });
            } else {
              dataSubmit.push({
                ...formData?.organizationWorkingEnvironments[i],
                image: imageRes.map((item) => item.data)[counter],
              });
              counter++;
            }
          }
          const body = {
            organizationId: data?.id,
            organizationWorkingEnvironments: dataSubmit,
          };
          try {
            await updateCompanyWorkingEnvironment(body).unwrap();
            enqueueSnackbar(
              "Chỉnh sửa thông tin Môi trường làm việc thành công!",
              {
                autoHideDuration: 2000,
              }
            );
            onClose();
          } catch (err) {
            enqueueSnackbar(
              "Chỉnh sửa thông tin Môi trường làm việc không thành công!",
              {
                autoHideDuration: 1000,
                variant: "error",
              }
            );
            throw err;
          }
        }
      } catch (e) {
        throw e;
      }
    }
  };

  useEffect(async () => {
    if (!data) return;
    setValue(
      "organizationWorkingEnvironments",
      data?.organizationWorkingEnvironments?.map((item) => ({
        ...item,
        image: item.image ? item.image : "",
      }))
    );
  }, [data]);

  const handleDrag = ({ source, destination }) => {
    if (destination) {
      move(source.index, destination.index);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <FormModalHead
        title={"Chỉnh sửa Môi trường làm việc"}
        onClose={onClose}
      />
      <div className="edit-container">
        <Box sx={{ "& ul": { listStyle: "none" } }}>
          <DragDropContext onDragEnd={handleDrag}>
            <ul>
              <Droppable droppableId="organizationWorkingEnvironments-items">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {fields.map((item, index) => {
                      return (
                        <Draggable
                          key={`organizationWorkingEnvironments[${index}]`}
                          draggableId={`organizationWorkingEnvironments-${index}`}
                          index={index}
                        >
                          {(provided) => (
                            <li
                              key={item.id}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                            >
                              <Box
                                sx={{
                                  mb: 3,
                                  px: 3,
                                  py: 2,
                                  background: theme.palette.common.bgrMaster,
                                  borderRadius: "4px",
                                }}
                              >
                                <Box
                                  sx={{
                                    py: 2,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <div {...provided.dragHandleProps}>
                                    <Iconify
                                      icon={
                                        "fluent:re-order-dots-vertical-16-filled"
                                      }
                                      width={20}
                                      height={20}
                                      color={theme.palette.common.neutral400}
                                    />
                                  </div>
                                  <RiDeleteBin6Line
                                    color={theme.palette.common.red600}
                                    onClick={() => remove(index)}
                                    cursor="pointer"
                                  />
                                </Box>

                                <Box sx={{ flex: 1 }}>
                                  {item?.image ||
                                  organizationWorkingEnvironments[index]
                                    ?.imagePreview?.url ? (
                                    <Image
                                      disabledEffect
                                      visibleByDefault
                                      src={
                                        typeof organizationWorkingEnvironments[
                                          index
                                        ]?.image === "string"
                                          ? `${DOMAIN_SERVER_API}/Image/GetImage?imagePath=${item?.image}`
                                          : organizationWorkingEnvironments[
                                              index
                                            ]?.imagePreview?.url
                                      }
                                      id={index}
                                      alt="image"
                                      sx={{
                                        border: "1px dashed #1976D2",
                                        height: 400,
                                      }}
                                    />
                                  ) : (
                                    <Box
                                      sx={{
                                        minHeight: "400px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        background:
                                          theme.palette.common.neutral100,
                                      }}
                                    >
                                      <SvgIcon>
                                        {
                                          '<svg width="80" height="24" viewBox="0 0 80 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_2856_295816)"> <path d="M20 5H4V19L13.292 9.706C13.4795 9.51853 13.7338 9.41321 13.999 9.41321C14.2642 9.41321 14.5185 9.51853 14.706 9.706L20 15.01V5ZM2 3.993C2.00183 3.73038 2.1069 3.47902 2.29251 3.29322C2.47813 3.10742 2.72938 3.00209 2.992 3H21.008C21.556 3 22 3.445 22 3.993V20.007C21.9982 20.2696 21.8931 20.521 21.7075 20.7068C21.5219 20.8926 21.2706 20.9979 21.008 21H2.992C2.72881 20.9997 2.4765 20.895 2.29049 20.7088C2.10448 20.5226 2 20.2702 2 20.007V3.993ZM8 11C7.46957 11 6.96086 10.7893 6.58579 10.4142C6.21071 10.0391 6 9.53043 6 9C6 8.46957 6.21071 7.96086 6.58579 7.58579C6.96086 7.21071 7.46957 7 8 7C8.53043 7 9.03914 7.21071 9.41421 7.58579C9.78929 7.96086 10 8.46957 10 9C10 9.53043 9.78929 10.0391 9.41421 10.4142C9.03914 10.7893 8.53043 11 8 11Z" fill="#5C6A82"/> </g> <line x1="40.5" y1="5" x2="40.5" y2="19" stroke="#5C6A82"/> <g clip-path="url(#clip1_2856_295816)"> <path d="M58 3.993C58.0018 3.73038 58.1069 3.47902 58.2925 3.29322C58.4781 3.10742 58.7294 3.00209 58.992 3H77.008C77.556 3 78 3.445 78 3.993V20.007C77.9982 20.2696 77.8931 20.521 77.7075 20.7068C77.5219 20.8926 77.2706 20.9979 77.008 21H58.992C58.7288 20.9997 58.4765 20.895 58.2905 20.7088C58.1045 20.5226 58 20.2702 58 20.007V3.993ZM66.622 8.415C66.5618 8.37485 66.4919 8.35177 66.4196 8.34822C66.3473 8.34467 66.2755 8.36079 66.2116 8.39486C66.1478 8.42893 66.0944 8.47967 66.0572 8.54168C66.0199 8.60369 66.0001 8.67465 66 8.747V15.253C66.0001 15.3253 66.0199 15.3963 66.0572 15.4583C66.0944 15.5203 66.1478 15.5711 66.2116 15.6051C66.2755 15.6392 66.3473 15.6553 66.4196 15.6518C66.4919 15.6482 66.5618 15.6252 66.622 15.585L71.501 12.333C71.5559 12.2965 71.6009 12.247 71.632 12.1889C71.6631 12.1308 71.6794 12.0659 71.6794 12C71.6794 11.9341 71.6631 11.8692 71.632 11.8111C71.6009 11.753 71.5559 11.7035 71.501 11.667L66.621 8.415H66.622Z" fill="#5C6A82"/> </g> <defs> <clipPath id="clip0_2856_295816"> <rect width="24" height="24" fill="white"/> </clipPath> <clipPath id="clip1_2856_295816"> <rect width="24" height="24" fill="white" transform="translate(56)"/> </clipPath> </defs> </svg>'
                                        }
                                      </SvgIcon>
                                    </Box>
                                  )}
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "space-between",
                                      marginBottom: "24px",
                                      marginTop: "12px",
                                    }}
                                  >
                                    <RHFUploadImage
                                      title={"Tải lên ảnh hoặc video"}
                                      name={`organizationWorkingEnvironments.${index}.image`}
                                    />
                                  </Box>
                                  <Stack sx={{ mb: 3 }}>
                                    <LabelStyle required>
                                      Lĩnh vực kinh doanh
                                    </LabelStyle>
                                    <RHFTextField
                                      name={`organizationWorkingEnvironments.${index}.name`}
                                      placeholder="Nhập môi trường làm việc"
                                      sx={{
                                        backgroundColor:
                                          theme.palette.common.white,
                                        "& .MuiFormHelperText-root.Mui-error": {
                                          backgroundColor:
                                            theme.palette.common.bgrMaster,
                                          marginTop: 0,
                                          paddingTop: 1,
                                        },
                                      }}
                                    />
                                  </Stack>
                                  <Stack sx={{ mb: 3 }}>
                                    <LabelStyle required>Mô tả</LabelStyle>
                                    <TextAreaDS
                                      maxLength={150}
                                      placeholder="Nhập nội dung mô tả lĩnh vực kinh doanh..."
                                      name={`organizationWorkingEnvironments.${index}.description`}
                                      style={{
                                        height: 150,
                                        resize: "none",
                                      }}
                                    />
                                  </Stack>
                                </Box>
                              </Box>
                            </li>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </ul>
          </DragDropContext>
          <MuiButton
            title={"Thêm môi trường làm việc"}
            variant="outlined"
            onClick={() => {
              append({
                image: "",
                imagePreview: "",
                name: "",
                description: "",
              });
            }}
            fullWidth
            startIcon={<PlusIcon />}
            sx={{ width: "100%" }}
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
export default EditEnvironmentWorkplace;
