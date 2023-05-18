import React, {useEffect} from "react";
import {useSnackbar} from "notistack";
import {useFieldArray, useForm, useWatch} from "react-hook-form";
import {RiDeleteBin6Line} from "react-icons/ri";
import * as Yup from "yup";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import PlusIcon from "@/assets/interview/PlusIcon";
import Iconify from "@/components/Iconify";
import Image from "@/components/Image";
import {FormProvider, RHFTextField} from "@/components/hook-form";
import {useUpdateCompanyHumanMutation, useUploadImageCompanyMutation,} from "@/sections/companyinfor/companyInforSlice";
import {yupResolver} from "@hookform/resolvers/yup";
import {Box, Stack} from "@mui/material";

import {DOMAIN_SERVER_API} from "@/config";
import {LabelStyle} from "@/components/hook-form/style";
import MuiButton from "@/components/BaseComponents/MuiButton";
import RHFUploadImage from "@/sections/companyinfor/upload/RHFUploadImage";
import FormModalHead from "@/components/BaseComponents/form-modal/FormModalHead";
import FormModalBottom from "@/components/BaseComponents/form-modal/FormModalBottom";
import {isEmpty, get} from "lodash";
import {useTheme} from "@mui/material/styles";

const EditHumanCompany = ({data, onClose}) => {

      const [updateCompanyHuman] = useUpdateCompanyHumanMutation();
      const [uploadImage] = useUploadImageCompanyMutation();
      const {enqueueSnackbar} = useSnackbar();
      const theme = useTheme();
      // const defaultValues = {
      //   organizationHumans: data?.organizationHumans?.map(item => ({
      //     id: item.id,
      //     avatar: item.avatar ? item.avatar : '',
      //     imagePreview: '',
      //     name: item.name,
      //     description: item.description
      //   }))
      // };

      const defaultValues = {
        organizationHumans: isEmpty(get(data, 'organizationHumans')) ? []
            : data?.organizationHumans?.map(item => ({
              id: item.id,
              avatar: item.avatar ? item.avatar : '',
              imagePreview: '',
              name: item.name,
              description: item.description
            }))
      };

      const Schema = {
        name: Yup.string().nullable().required('Họ và tên không được bỏ trống'),
        description: Yup.string().nullable().required('Chức vụ không được bỏ trống'),
      }
      const ProfileSchema = Yup.object().shape({
        organizationHumans: Yup.array().of(Yup.object().shape(Schema))
      });
      const methods = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(ProfileSchema),
        defaultValues,
      });
      const {setValue, handleSubmit, control, formState: {isSubmitting}} = methods;
      const {fields, append, move, remove} = useFieldArray({control, name: "organizationHumans"});

      const organizationHumans = useWatch({ control, name: 'organizationHumans' });

      const onSubmit = async (formData) => {
        const imageData = formData?.organizationHumans?.filter(item => item.avatar !== null && typeof item.avatar === 'object')?.map(item => item.avatar?.[0]);
        const form = new FormData();
        const promises = imageData.map((file) => {
          form.append("avatar", file);
          return uploadImage({
            File: file,
            OrganizationId: data?.id,
          });
        });
        try {
          const avatarRes = await Promise.all(promises);
          if (avatarRes) {
            let dataSubmit = [];
            let counter = 0;
            for(let i = 0; i < formData?.organizationHumans?.length; i++) {
              if (typeof formData?.organizationHumans[i]?.avatar === 'string' || !formData?.organizationHumans[i]?.avatar) {
                dataSubmit.push({ ...formData?.organizationHumans[i] })
              } else {
                dataSubmit.push({ ...formData?.organizationHumans[i], avatar: avatarRes?.map(item => item.data)[counter] })
                counter++;
              }
            }
            const body = {
              organizationId: data?.id,
              organizationHumans: dataSubmit
            };
            try {
              await updateCompanyHuman(body).unwrap();
              enqueueSnackbar("Chỉnh sửa thông tin Con người công ty thành công!", {
                autoHideDuration: 2000,
              });
              onClose();
            } catch (err) {
              enqueueSnackbar('Chỉnh sửa thông tin Con người công ty không thành công!', {
                autoHideDuration: 1000,
                variant: "error",
              });
              throw err;
            }
          }
        } catch (e) {
          throw e;
        }
      };

      useEffect(async () => {
        if (!data) return;
        setValue("organizationHumans", data?.organizationHumans?.map(item => ({ ...item, avatar: item.avatar ? item.avatar : '' })));
      }, [data]);

      const handleDrag = ({source, destination}) => {
        if (destination) {
          move(source.index, destination.index);
        }
      };

      return (
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <FormModalHead title={'Chỉnh sửa Con người công ty'} onClose={onClose}/>
            <div className="edit-container">
            <Box>
              <DragDropContext onDragEnd={handleDrag}>
                <ul style={{ listStyle: 'none' }}>
                  <Droppable droppableId="organizationHumans-items">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                          {fields.map((item, index) => {
                            return (
                                <Draggable key={`organizationHumans[${index}]`} draggableId={`organizationHumans-${index}`} index={index}>
                                  {(provided) => (
                                      <li key={item.id} ref={provided.innerRef} {...provided.draggableProps}>
                                        <Box sx={{
                                          mb: 3,
                                          px: 3,
                                          py: 2,
                                          background: theme.palette.common.bgrMaster,
                                          display: "flex",
                                          borderRadius: "4px"
                                        }}>
                                          <Box sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            pr: 1
                                          }} {...provided.dragHandleProps}>
                                            <Iconify icon={"fluent:re-order-dots-vertical-16-filled"} width={20} height={20} color={theme.palette.common.neutral400}/>
                                          </Box>
                                          {item?.avatar || organizationHumans[index]?.imagePreview?.url ? (
                                                  <Image
                                                      disabledEffect
                                                      visibleByDefault
                                                      src={typeof organizationHumans[index]?.avatar === 'string' ?
                                                          `${DOMAIN_SERVER_API}/Image/GetImage?imagePath=${item?.avatar}` : organizationHumans[index]?.imagePreview?.url
                                                      }
                                                      id={index}
                                                      alt="image"
                                                      sx={{display: "flex", maxWidth: '215px', width: '100%', height: 254, px: 2}}
                                                  />
                                              )
                                              : <Image
                                                  disabledEffect
                                                  visibleByDefault
                                                  src={'/assets/placeholder.png'}
                                                  id={index}
                                                  alt="image"
                                                  sx={{display: "flex", maxWidth: '215px', width: '100%', height: 254, px: 2}}
                                                />
                                          }
                                          <Box sx={{flex: 1, ml: 2}}>
                                            <Box sx={{
                                              display: "flex",
                                              alignItems: "center",
                                              justifyContent: "space-between",
                                              marginBottom: "24px",
                                              marginTop: "12px"
                                            }}>
                                              <RHFUploadImage name={`organizationHumans.${index}.avatar`}/>
                                              <RiDeleteBin6Line color={theme.palette.common.red600} onClick={() => remove(index)} cursor="pointer"/>
                                            </Box>
                                            <Stack sx={{mb: 3}}>
                                              <LabelStyle required>Họ và tên</LabelStyle>
                                              <RHFTextField
                                                  name={`organizationHumans.${index}.name`}
                                                  placeholder="Nhập họ và tên cán bộ"
                                                  sx={{
                                                    backgroundColor: theme.palette.common.white,
                                                    '& .MuiFormHelperText-root.Mui-error': {
                                                      backgroundColor: theme.palette.common.bgrMaster,
                                                      marginTop: 0,
                                                      paddingTop: 1
                                                    }
                                                  }}
                                              />
                                            </Stack>
                                            <Stack sx={{mb: 3}}>
                                              <LabelStyle required>Chức vụ</LabelStyle>
                                              <RHFTextField
                                                  name={`organizationHumans.${index}.description`}
                                                  placeholder="Nhập chức vụ của cán bộ"
                                                  sx={{
                                                    backgroundColor: theme.palette.common.white,
                                                    '& .MuiFormHelperText-root.Mui-error': {
                                                      backgroundColor: theme.palette.common.bgrMaster,
                                                      marginTop: 0,
                                                      paddingTop: 1
                                                    }
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
                  title={"Thêm cán bộ"}
                  variant="outlined"
                  onClick={() => {
                    append({
                      avatar: '',
                      imagePreview: '',
                      name: '',
                      description: ''
                    });
                  }}
                  startIcon={<PlusIcon/>}
                  sx={{width: '100%'}}
              />
            </Box>
            </div>
            <FormModalBottom
                onClose={onClose}
                loading={isSubmitting}
                btnConfirm={{
                  title: 'Lưu',
                  type: "submit",
                }}
            />
          </FormProvider>
      );
    }
;
export default EditHumanCompany;
