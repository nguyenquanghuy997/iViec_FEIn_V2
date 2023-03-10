import {View} from "@/components/FlexStyled";
import {Box, Button, Grid, IconButton, Typography} from "@mui/material";
import {MinusIcon} from "@/assets/ActionIcon";
import React from "react";
import {useFieldArray, useForm} from "react-hook-form";
import Iconify from "@/components/Iconify";
import {styled} from "@mui/styles";
import {ApproveProcessFormLevelItem} from "@/sections/approve-process/Items/ApproveProcessFormLevelItem";

export const ApproveProcessFormLevel = () => {
    const ButtonStyle = {
        fontSize: 14,
        fontWeight: 600,
        minWidth: '56px',
        borderRadius: 6,
        padding: '8px 12px'
    }

    const ButtonAddInviteStyle = styled(Button)(({}) => ({
        "&.button-add-invite": {
            ...ButtonStyle,
            backgroundColor: '#FDFDFD',
            width: '100%',
            color: '#1976D2',
            ":hover": {
                color: '#455570',
                backgroundColor: '#FDFDFD',
            }
        }
    }));

    const defaultValue = {
        roleGroupId: "",
        personInChargeIds: [],
        processLevelDetailType: 0
    };

    const {control} = useForm({
            defaultValues: {
                test: [{
                    approvalProcessLevelDetails: [
                        {
                            roleGroupId: "",
                            personInChargeIds: [],
                            processLevelDetailType: 0
                        }
                    ]
                }]
            }
        })
    ;

    const {fields, append, remove} = useFieldArray({
        control,
        name: "test"
    });

    return <>
        {fields.map((item, index) => {
            return (<View
                p={16}
                mv={16}
                borderRadius={6}
                bgColor={"#F2F4F5"}>
                <Grid container direction="row"
                      justifyContent="center"
                      alignItems="center"
                      mb={2}>
                    <Grid item xs>
                        <Typography variant="subtitle1">
                            Cấp {index + 1}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="textSize13500">
                            Đã chọn: 12
                        </Typography>
                    </Grid>
                    <Grid item xs={9} container direction="row" justifyContent="flex-end">
                        <IconButton onClick={() => remove(index)}>
                            <MinusIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
                <Box className="box-content-wrapper" sx={{width: '100%'}}>
                    <ApproveProcessFormLevelItem
                        index={index}
                        key={item.id}
                    />
                </Box>
            </View>)
        })}
        <ButtonAddInviteStyle
            variant="outlined"
            className='button-add-invite'
            onClick={() => {
                append({...defaultValue})
            }}
            startIcon={<Iconify icon="material-symbols:add"/>}>
            Thêm cấp phê duyệt
        </ButtonAddInviteStyle>
    </>
};
