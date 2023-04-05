import {useEffect} from "react";
import {useSnackbar} from "notistack";
import {useFieldArray, useForm, useWatch} from "react-hook-form";
import {RiDeleteBin6Line} from "react-icons/ri";
import * as Yup from "yup";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import PlusIcon from "@/assets/interview/PlusIcon";
import Iconify from "@/components/Iconify";
import {FormProvider, RHFTextField} from "@/components/hook-form";
import {useUpdateCompanyEnvironmentMutation, useUploadImageCompanyMutation,} from "@/sections/companyinfor/companyInforSlice";
import {yupResolver} from "@hookform/resolvers/yup";
import {Box, Stack} from "@mui/material";
import {LabelStyle} from "@/components/hook-form/style";
import MuiButton from "@/components/BaseComponents/MuiButton";
import {STYLE_CONSTANT as style} from "@/theme/palette";
import RHFUploadImage from "@/sections/companyinfor/upload/RHFUploadImage";
import Image from "@/components/Image";
import {DOMAIN_SERVER_API} from "@/config";
import {TextAreaDS} from "@/components/DesignSystem";

const EditEnvironmentWorkplace = ({data, onClose}) => {

        const [updateCompanyWorkingEnvironment] = useUpdateCompanyEnvironmentMutation();
        const [uploadImage] = useUploadImageCompanyMutation();
        const {enqueueSnackbar} = useSnackbar();

        const defaultValues = {
            organizationWorkingEnvironments: data?.organizationWorkingEnvironments?.map(item => ({
                image: item.image,
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
            organizationWorkingEnvironments: Yup.array().of(Yup.object().shape(Schema))
        });
        const methods = useForm({
            mode: 'onSubmit',
            resolver: yupResolver(ProfileSchema),
            defaultValues,
        });
        const {setValue, handleSubmit, control, formState: {isSubmitting}} = methods;
        const {fields, append, move, remove} = useFieldArray({control, name: "organizationWorkingEnvironments"});

        const organizationWorkingEnvironments = useWatch({ control, name: 'organizationWorkingEnvironments' });
        const onSubmit = async (formData) => {
            const imageData = formData.organizationWorkingEnvironments?.filter(item => item.image !== null && typeof item.image === 'object')?.map(item => item.image?.[0]);
            if (imageData.length === 0) {
                const body = {
                    organizationId: data?.id,
                    organizationWorkingEnvironments: formData.organizationWorkingEnvironments.map(item => ({
                        image: item.image,
                        name: item.name,
                        description: item.description,
                    }))
                };
                try {
                    await updateCompanyWorkingEnvironment(body).unwrap();
                    enqueueSnackbar("Chỉnh sửa thông tin Môi trường làm việc thành công!", {
                        autoHideDuration: 2000,
                    });
                } catch (err) {
                    enqueueSnackbar('Chỉnh sửa thông tin Môi trường làm việc không thành công!', {
                        autoHideDuration: 1000,
                        variant: "error",
                    });
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
                        for (let i = 0; i < formData.organizationWorkingEnvironments.length; i++) {
                            if (typeof formData.organizationWorkingEnvironments[i].image === 'string') {
                                dataSubmit.push({...formData.organizationWorkingEnvironments[i]})
                            } else {
                                dataSubmit.push({
                                    ...formData.organizationWorkingEnvironments[i],
                                    image: imageRes.map(item => item.data)[counter]
                                })
                                counter++;
                            }
                        }
                        const body = {
                            organizationId: data?.id,
                            organizationWorkingEnvironments: dataSubmit
                        };
                        try {
                            await updateCompanyWorkingEnvironment(body).unwrap();
                            enqueueSnackbar("Chỉnh sửa thông tin Môi trường làm việc thành công!", {
                                autoHideDuration: 2000,
                            });
                        } catch (err) {
                            enqueueSnackbar('Chỉnh sửa thông tin Môi trường làm việc không thành công!', {
                                autoHideDuration: 1000,
                                variant: "error",
                            });
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
            setValue("organizationWorkingEnvironments", data?.organizationWorkingEnvironments);
        }, [data]);

        const handleDrag = ({source, destination}) => {
            if (destination) {
                move(source.index, destination.index);
            }
        };

        return (
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{
                    px: 3, flex: 1,
                    paddingBottom: 36,
                    overflow: "hidden",
                    background: style.BG_WHITE,
                    padding: 3,
                    mb: 8, "& ul": {listStyle: 'none'}
                }}>
                    <DragDropContext onDragEnd={handleDrag}>
                        <ul>
                            <Droppable droppableId="organizationWorkingEnvironments-items">
                                {(provided) => (
                                    <div {...provided.droppableProps} ref={provided.innerRef}>
                                        {fields.map((item, index) => {
                                            return (
                                                <Draggable key={`organizationWorkingEnvironments[${index}]`} draggableId={`organizationWorkingEnvironments-${index}`} index={index}>
                                                    {(provided) => (
                                                        <li key={item.id}
                                                            ref={provided.innerRef} {...provided.draggableProps}>
                                                            <Box sx={{
                                                                my: 3,
                                                                px: 3,
                                                                py: 2,
                                                                background: "#F2F4F5",
                                                                borderRadius: "4px"
                                                            }}>
                                                                <Box sx={{
                                                                    py: 2,
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'space-between'
                                                                }}>
                                                                    <div {...provided.dragHandleProps}>
                                                                        <Iconify icon={"fluent:re-order-dots-vertical-16-filled"} width={20} height={20} color="#A2AAB7"/>
                                                                    </div>
                                                                    <RiDeleteBin6Line color="#E53935" onClick={() => remove(index)} cursor="pointer"/>
                                                                </Box>

                                                                <Box sx={{flex: 1}}>
                                                                    {item?.image ? (
                                                                            <Image
                                                                                disabledEffect
                                                                                visibleByDefault
                                                                                src={typeof organizationWorkingEnvironments[index]?.image === 'string' ?
                                                                                    `${DOMAIN_SERVER_API}/Image/GetImage?imagePath=${item?.image}` : organizationWorkingEnvironments[index]?.imagePreview?.url
                                                                                }
                                                                                id={index}
                                                                                alt="image"
                                                                                sx={{
                                                                                    border: "1px dashed #1976D2",
                                                                                    height: 400,
                                                                                }}
                                                                            />
                                                                        )
                                                                        : <Image
                                                                            disabledEffect
                                                                            visibleByDefault
                                                                            src={'/assets/placeholder.png'}
                                                                            id={index}
                                                                            alt="image"
                                                                            sx={{
                                                                                border: "1px dashed #1976D2",
                                                                                height: 400,
                                                                            }}
                                                                        />
                                                                    }
                                                                    {/*<Image*/}
                                                                    {/*    disabledEffect*/}
                                                                    {/*    visibleByDefault*/}
                                                                    {/*    src={`${DOMAIN_SERVER_API}/Image/GetImage?imagePath=${item?.image}`}*/}
                                                                    {/*    alt="image"*/}
                                                                    {/*    sx={{*/}
                                                                    {/*        border: "1px dashed #1976D2",*/}
                                                                    {/*        height: 400,*/}
                                                                    {/*    }}*/}
                                                                    {/*/>*/}
                                                                    <Box sx={{
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        justifyContent: "space-between",
                                                                        marginBottom: "24px",
                                                                        marginTop: "12px"
                                                                    }}>
                                                                        <RHFUploadImage name={`organizationWorkingEnvironments.${index}.image`}/>
                                                                    </Box>
                                                                    <Stack sx={{mb: 3}}>
                                                                        <LabelStyle required>Lĩnh vực kinh doanh</LabelStyle>
                                                                        <RHFTextField
                                                                            name={`organizationWorkingEnvironments.${index}.name`}
                                                                            placeholder="Nhập môi trường làm việc"
                                                                            sx={{
                                                                                backgroundColor: '#FDFDFD',
                                                                                '& .MuiFormHelperText-root.Mui-error': {
                                                                                    backgroundColor: '#F2F4F5',
                                                                                    marginTop: 0,
                                                                                    paddingTop: 1
                                                                                }
                                                                            }}
                                                                        />
                                                                    </Stack>
                                                                    <Stack sx={{mb: 3}}>
                                                                        <LabelStyle required>Mô tả</LabelStyle>
                                                                        <TextAreaDS
                                                                            maxLength={150}
                                                                            placeholder="Nhập nội dung mô tả lĩnh vực kinh doanh..."
                                                                            name={`organizationWorkingEnvironments.${index}.description`}
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
                            append({...defaultValues});
                        }}
                        fullWidth
                        startIcon={<PlusIcon/>}
                        sx={{width: '100%'}}
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
    }
;
export default EditEnvironmentWorkplace;
