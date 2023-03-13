import React from "react";
import {useFieldArray, useFormContext, Controller, useWatch} from "react-hook-form";
import {Box, Grid, IconButton} from "@mui/material";
import RHFDropdown from "@/components/hook-form/RHFDropdown";
import {MinusIcon, PlusIcon} from "@/assets/ActionIcon";


const ConditionalInput = ({control, index, indexChild}) => {
    const value = useWatch({
        name: `approve.${index}.approvalProcessLevelDetails.${indexChild}.processLevelDetailType`,
        control
    });

    return (
        <Controller
            control={control}
            name={`approve.${index}.approvalProcessLevelDetails.${indexChild}.personInChargeIds`}
            render={() => value === "1" ?
                <>
                    <Grid item xs={5} pr={2}>
                        <RHFDropdown
                            options={[{id: "", name: ""}, {
                                id: "1",
                                name: "ABC"
                            }]?.map(item => ({...item, value: item?.id, label: item?.name}))}
                            name={`approve.${index}.approvalProcessLevelDetails.${indexChild}.roleGroupId`}
                            isRequired
                            placeholder="Chọn vai trò phê duyệt"
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <RHFDropdown
                            options={[{id: "", name: ""}, {
                                id: "1",
                                name: "ABC"
                            }, {
                                id: "2",
                                name: "ABCD"
                            }, {
                                id: "3",
                                name: "ABCDE"
                            }]?.map(item => ({...item, value: item?.id, label: item?.name}))}
                            name={`approve.${index}.approvalProcessLevelDetails.${indexChild}.personInChargeIds`}
                            multiple={true}
                            isRequired
                            placeholder="Chọn ..."

                        />
                    </Grid>
                </>
                :
                <Grid item xs={7}>
                    <RHFDropdown
                        options={[{id: "", name: ""}, {
                            id: "1",
                            name: "ABC"
                        }]?.map(item => ({...item, value: item?.id, label: item?.name}))}
                        name={`approve.${index}.approvalProcessLevelDetails.${indexChild}.roleGroupId`}
                        isRequired
                        multiple={true}
                        placeholder="Chọn vai trò phê duyệt"
                    />
                </Grid>
            }
        />
    );
};

export const ApproveProcessFormLevelItemContext = React.createContext({
    remove: () => {
    },
    append: () => {
    }
});

export const ApproveProcessFormLevelItem = (props) => {
    const {control} = useFormContext();
    const {index} = props;

    const {fields, append, remove} = useFieldArray({
        control,
        name: `approve.${index}.approvalProcessLevelDetails`
    });

    let watchFieldArray = useWatch({name: `approve.${index}.approvalProcessLevelDetails`, control});

    const addApproveProcessHandler = () => {
        append({
            roleGroupId: "",
            personInChargeIds: [],
            processLevelDetailType: ""
        });
    };

    const removeApproveProcessHandler = (index) => {
        remove(index);
    };

    return <>
        <ApproveProcessFormLevelItemContext.Provider value={{remove}}>
            {fields.map((field, indexChild) => (
                <Box
                    key={field.id}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        backgroundColor: '#F2F4F5',
                    }}>
                    <Box className="box-content-inner" sx={{flex: 1}}>
                        <Grid container alignItems={"center"}>
                            <Grid item xs={3} pr={2}>
                                <RHFDropdown
                                    options={[{id: "1", name: "Vai trò"}, {
                                        id: "2",
                                        name: "Cán bộ"
                                    }]?.map(item => ({...item, value: item?.id, label: item?.name}))}
                                    name={`approve.${index}.approvalProcessLevelDetails.${indexChild}.processLevelDetailType`}
                                    isRequired
                                    placeholder="Chọn 1 vai trò"
                                />
                            </Grid>
                            <ConditionalInput {...{control, index, indexChild}} />
                            <Grid item container flexDirection="row" justifyContent={"space-between"} xs={2} pl={3}
                                  mb={1}>
                                <IconButton sx={{ml: 2}} onClick={addApproveProcessHandler}>
                                    <PlusIcon/>
                                </IconButton>
                                {watchFieldArray.length > 1 && (
                                    <IconButton onClick={() => removeApproveProcessHandler(indexChild)}>
                                        <MinusIcon/>
                                    </IconButton>
                                )}

                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            ))}
        </ApproveProcessFormLevelItemContext.Provider>
    </>
};