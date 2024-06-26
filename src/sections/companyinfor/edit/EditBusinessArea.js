import EditUpload from "./EditUpload";
import PlusIcon from "@/assets/interview/PlusIcon";
import {TextAreaDS} from "@/components/DesignSystem";
import {View} from "@/components/DesignSystem/FlexStyled";
import {FormProvider, RHFTextField} from "@/components/hook-form";
import {Label} from "@/components/hook-form/style";
import {
  useAddOrganizationBusinessMutation,
  useUpdateCompanyBusinessMutation,
  useUploadImageCompanyMutation,
} from "@/sections/companyinfor/companyInforSlice";
import {yupResolver} from "@hookform/resolvers/yup";
import {Box, Stack} from "@mui/material";
import {useSnackbar} from "notistack";
import React, {useEffect, useState} from "react";
import {useFieldArray, useForm} from "react-hook-form";
import {get, isEmpty} from 'lodash';
import * as Yup from "yup";
import MuiButton from "@/components/BaseComponents/MuiButton";
import {DOMAIN_SERVER_API} from "@/config";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import Iconify from "@/components/Iconify";
import {RiDeleteBin6Line} from "react-icons/ri";
import FormModalHead from "@/components/BaseComponents/form-modal/FormModalHead";
import FormModalBottom from "@/components/BaseComponents/form-modal/FormModalBottom";
import {useTheme} from "@mui/material/styles";

const InputStyle = {width: "100%", minHeight: 40, background: "white"};

const EditBusinessArea = ({data: Data, onClose}) => {
  const isEditMode = !!get(Data, 'organizationBusiness.id');
  const [addOrganizationBusiness] = useAddOrganizationBusinessMutation();
  const [updateCompanyBusiness] = useUpdateCompanyBusinessMutation();
  const [uploadImage] = useUploadImageCompanyMutation();
  const {enqueueSnackbar} = useSnackbar();
  const theme = useTheme();
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

  const defaultValues = {
    organizationBusinessDatas: isEmpty(get(Data, 'organizationBusinessDatas')) ? []
        : Data?.organizationBusinessDatas?.map(item => ({
          name: item.name,
          description: item.description
        }))
  };

  const ProfileSchema = Yup.object().shape({
    businessPhoto: Yup.string(),
    organizationBusinessDatas: Yup.array().of(
        Yup.object().shape({
          name: Yup.string().nullable().required('Tên lĩnh vực kinh doanh không được bỏ trống'),
          description: Yup.string().nullable().required('Mô tả không được bỏ trống'),
        })
    ),
  });

  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  const {
    setValue,
    register,
    handleSubmit,
    control,
    formState: {isSubmitting},
  } = methods;

  const {fields, append, move, remove} = useFieldArray({
    control,
    name: "organizationBusinessDatas",
  });

  const onSubmit = async (d) => {
    if (imageBg) {
      const bgRes = await uploadImage({
        OrganizationId: Data?.id,
        File: imageBg,
      });

      const res = {
        organizationId: isEditMode ? get(Data, 'organizationBusiness.id') : get(Data, 'id'),
        businessPhoto: get(bgRes, 'data') ? get(bgRes, 'data') : get(Data, 'organizationBusiness.businessPhoto'),
        organizationBusinessDatas: get(d, 'organizationBusinessDatas'),
      };

      if (isEditMode) {
        try {
          await updateCompanyBusiness(res).unwrap();
          enqueueSnackbar("Chỉnh sửa Lĩnh vực công ty thành công!");
          onClose();
        } catch (err) {
          enqueueSnackbar("Thực hiện thất bại!", {variant: "error"});
        }
      } else {
        try {
          await addOrganizationBusiness(res).unwrap();
          enqueueSnackbar("Thêm Lĩnh vực công ty mới thành công!");
          onClose();
        } catch (err) {
          enqueueSnackbar("Thực hiện thất bại!", {variant: "error"});
        }
      }
    } else {
      const res = {
        organizationId: isEditMode ? get(Data, 'organizationBusiness.id') : get(Data, 'id'),
        businessPhoto: get(Data, 'organizationBusiness.businessPhoto'),
        organizationBusinessDatas: get(d, 'organizationBusinessDatas'),
      };
      if (isEditMode) {
        try {
          await updateCompanyBusiness(res).unwrap();
          enqueueSnackbar("Chỉnh sửa Lĩnh vực công ty thành công!");
          onClose();
        } catch (err) {
          enqueueSnackbar("Thực hiện thất bại!", { variant: "error" });
        }
      } else {
        try {
          await addOrganizationBusiness(res).unwrap();
          enqueueSnackbar("Thêm Lĩnh vực công ty mới thành công!");
          onClose();
        } catch (err) {
          enqueueSnackbar("Thực hiện thất bại!", {variant: "error",});
        }
      }
    }
  };

  const renderTitle = (title, required) => {
    return <Label required={required}>{title}</Label>;
  };

  useEffect(() => {
    if (!Data) return;
    setValue("organizationBusinessDatas", get(Data, 'organizationBusiness.organizationBusinessDatas'));
    setBg(`${DOMAIN_SERVER_API}/Image/GetImage?imagePath=${get(Data, 'organizationBusiness.businessPhoto')}`);
  }, [Data]);

  const handleDrag = ({source, destination}) => {
    if (destination) {
      move(source.index, destination.index);
    }
  };

  return (
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <FormModalHead title={'Chỉnh sửa Lĩnh vực kinh doanh'} onClose={onClose}/>
        <div className="edit-container">
        <Box>
          <Stack>
            <Box>
              <EditUpload
                  title={'Tải lên ảnh nền'}
                  image={bg}
                  ref={register("businessPhoto", {required: false})}
                  imageHandler={handleImage}
                  style={{
                    width: "100%",
                    height: '100%',
                    maxHeight: 222,
                    background: theme.palette.common.bgrMaster,
                    margin: "16px 0 24px 0",
                    objectFit: 'contain'
                  }}
                  btnSx={{
                    maxWidth: '172px',
                    width: '100%'
                  }}
              />
            </Box>
          </Stack>
          <DragDropContext onDragEnd={handleDrag}>
            <ul style={{ listStyle: 'none' }}>
              <Droppable droppableId="organizationBusinessDatas-items">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {fields.map((item, index) => {
                        return (
                            <Draggable key={`organizationHumans[${index}]`} draggableId={`organizationHumans-${index}`} index={index}>
                              {(provided) => (
                                  <li key={item.id} ref={provided.innerRef} {...provided.draggableProps}>
                                    <Box sx={{my: 3, px: 3, py: 2, background: theme.palette.common.bgrMaster,}} key={item.id}>
                                      <Box sx={{py: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                        <div {...provided.dragHandleProps}>
                                          <Iconify icon={"fluent:re-order-dots-vertical-16-filled"} width={20} height={20} color={theme.palette.common.neutral400}/>
                                        </div>
                                        <RiDeleteBin6Line color={theme.palette.common.red600} onClick={() => remove(index)} cursor="pointer"/>
                                      </Box>
                                      <Stack justifyContent="space-between" sx={{mb: 3}}>
                                        <RHFTextField
                                            name={`organizationBusinessDatas.${index}.name`}
                                            title="Lĩnh vực kinh doanh"
                                            isRequired
                                            placeholder="Nhập lĩnh vực kinh doanh"
                                            style={{...InputStyle}}
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
                                      <Stack justifyContent="space-between" sx={{mb: 3}}>
                                        <View mb={24}>
                                          {renderTitle("Mô tả", true)}
                                          <TextAreaDS
                                              maxLength={150}
                                              placeholder="Nhập nội dung mô tả lĩnh vực kinh doanh..."
                                              name={`organizationBusinessDatas.${index}.description`}
                                          />
                                        </View>
                                      </Stack>
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
          <Box sx={{mt: 3}}>
            <MuiButton
                title={"Thêm lĩnh vực kinh doanh"}
                variant="outlined"
                onClick={() => {
                  append({
                    name: '',
                    description: ''
                  });
                }}
                startIcon={<PlusIcon/>}
                sx={{width: '100%'}}
            />
          </Box>
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
};
export default EditBusinessArea;
