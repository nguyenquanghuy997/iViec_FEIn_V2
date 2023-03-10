// import {Box, Grid, IconButton} from "@mui/material";
// import RHFDropdown from "@/components/hook-form/RHFDropdown";
// import {MinusIcon, PlusIcon} from "@/assets/ActionIcon";
import React from "react";
import {useFieldArray, useFormContext} from "react-hook-form";

export const ApproveProcessFormLevelItemContext = React.createContext({
    remove: () => {
    },
    append: () => {
    }
});

export const ApproveProcessFormLevelItem = (props) => {
    const {control} = useFormContext();
    const {index} = props;

    const {fields, remove} = useFieldArray({
        control,
        name: `socials.${index}.approvalProcessLevelDetails`
    });

    // const addProfileHandler = () => {
    //     append({
    //         name: ''
    //     });
    // };
    console.log(fields);
    return <>
        <ApproveProcessFormLevelItemContext.Provider value={{remove}}>
            {/*{fields.map((field, indexChild) => (*/}
            {/*    <Box sx={{*/}
            {/*        display: 'flex',*/}
            {/*        justifyContent: 'space-between',*/}
            {/*        alignItems: 'center',*/}
            {/*        width: '100%',*/}
            {/*        backgroundColor: '#F2F4F5',*/}
            {/*    }}>*/}
            {/*        <Box className="box-content-inner" sx={{flex: 1}}>*/}
            {/*            <Grid container alignItems={"center"}>*/}
            {/*                <Grid item xs={3} pr={2}>*/}
            {/*                    <RHFDropdown*/}
            {/*                        options={[{id: "1", name: "Vai trò"}, {*/}
            {/*                            id: "2",*/}
            {/*                            name: "Cán bộ"*/}
            {/*                        }]?.map(item => ({...item, value: item?.id, label: item?.name}))}*/}
            {/*                        name={`invite.${index}.type`}*/}
            {/*                        isRequired*/}
            {/*                        placeholder="Chọn 1 vai trò"*/}
            {/*                    />*/}
            {/*                </Grid>*/}
            {/*                <Grid item xs={7}>*/}
            {/*                    <RHFDropdown*/}
            {/*                        options={[{id: "", name: ""}, {*/}
            {/*                            id: "1",*/}
            {/*                            name: "ABC"*/}
            {/*                        }]?.map(item => ({...item, value: item?.id, label: item?.name}))}*/}
            {/*                        name={`invite.${index}.roleGroup`}*/}
            {/*                        isRequired*/}
            {/*                        placeholder="Chọn vai trò phê duyệt"*/}
            {/*                    />*/}
            {/*                </Grid>*/}
            {/*                <Grid item container flexDirection="row" justifyContent={"end"} xs={2} pl={3}>*/}
            {/*                    <IconButton sx={{mr: 2}} onClick={() => {*/}
            {/*                        handleAppend()*/}
            {/*                    }}>*/}
            {/*                        <PlusIcon/>*/}
            {/*                    </IconButton>*/}
            {/*                    <IconButton onClick={() => {*/}
            {/*                        handleRemove()*/}
            {/*                    }}>*/}
            {/*                        <MinusIcon/>*/}
            {/*                    </IconButton>*/}
            {/*                </Grid>*/}
            {/*            </Grid>*/}
            {/*        </Box>*/}
            {/*    </Box>*/}
            {/*))}*/}
        </ApproveProcessFormLevelItemContext.Provider>
    </>
};