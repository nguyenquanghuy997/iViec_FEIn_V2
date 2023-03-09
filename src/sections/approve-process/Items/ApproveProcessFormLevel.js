import {View} from "@/components/FlexStyled";
import {Box, Grid, IconButton, Typography} from "@mui/material";
import {MinusIcon} from "@/assets/ActionIcon";
import React from "react";

export const ApproveProcessFormLevel = () => {
    return (
        <View
            flexRow
            p={16}
            mv={16}
            borderRadius={6}
            bgColor={"#F2F4F5"}>
            <Grid container direction="row"
                  justifyContent="center"
                  alignItems="center">
                <Grid item xs>
                    <Typography variant="subtitle1">
                        Cấp 1
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="textSize13500">
                        Đã chọn: 12
                    </Typography>
                </Grid>
                <Grid item xs={9} container direction="row" justifyContent="flex-end">
                    <IconButton>
                        <MinusIcon/>
                    </IconButton>
                </Grid>
            </Grid>
            <Box className="box-content-wrapper" sx={{width: '100%'}}>
                {/*{fields.map((item, index) => {*/}
                {/*    return (*/}
                {/*        <Box key={item.id} sx={{*/}
                {/*            display: 'flex',*/}
                {/*            justifyContent: 'space-between',*/}
                {/*            alignItems: 'center',*/}
                {/*            width: '100%',*/}
                {/*            backgroundColor: '#F2F4F5',*/}
                {/*            padding: 2,*/}
                {/*            mb: 2*/}
                {/*        }}>*/}
                {/*            <Box className="box-content-inner" sx={{flex: 1}}>*/}
                {/*                <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 2}}>*/}
                {/*                    <div>*/}
                {/*                        <RHFTextField*/}
                {/*                            name={`invite.${index}.email`}*/}
                {/*                            isRequired*/}
                {/*                            title="Email"*/}
                {/*                            placeholder="Nhập email người được mời"*/}
                {/*                            sx={{minWidth: '276px', backgroundColor: '#FDFDFD'}}*/}
                {/*                        />*/}
                {/*                    </div>*/}
                {/*                    <div>*/}
                {/*                        <RHFTextField*/}
                {/*                            name={`invite.${index}.name`}*/}
                {/*                            isRequired*/}
                {/*                            title="Họ và tên"*/}
                {/*                            placeholder="Họ và tên người được mời"*/}
                {/*                            sx={{minWidth: '276px', backgroundColor: '#FDFDFD'}}*/}
                {/*                        />*/}
                {/*                    </div>*/}
                {/*                    <div>*/}
                {/*                        <RHFDropdown*/}
                {/*                            options={[...ListRoleGroup, {id: "", name: ""}, {*/}
                {/*                                id: "1",*/}
                {/*                                name: "ABC"*/}
                {/*                            }]?.map(item => ({...item, value: item?.id, label: item?.name}))}*/}
                {/*                            name={`invite.${index}.roleGroup`}*/}
                {/*                            isRequired*/}
                {/*                            title="Vai trò"*/}
                {/*                            placeholder="Chọn 1 vai trò"*/}
                {/*                            sx={{minWidth: '276px', backgroundColor: '#FDFDFD'}}*/}
                {/*                        />*/}
                {/*                    </div>*/}
                {/*                </Box>*/}
                {/*                <RHFDropdown*/}
                {/*                    options={[...ListOrganization, {id: "", name: ""}]?.map(item => ({*/}
                {/*                        ...item,*/}
                {/*                        value: item?.id,*/}
                {/*                        label: item?.name*/}
                {/*                    }))}*/}
                {/*                    name={`invite.${index}.organization`}*/}
                {/*                    isRequired*/}
                {/*                    multiple*/}
                {/*                    title="Đơn vị"*/}
                {/*                    placeholder="Chọn 1 hoặc nhiều đơn vị"*/}
                {/*                    sx={{minWidth: '276px', backgroundColor: '#FDFDFD'}}*/}
                {/*                />*/}
                {/*            </Box>*/}
                {/*            <span*/}
                {/*                style={{marginLeft: 16, display: 'block', padding: 8, cursor: 'pointer'}}*/}
                {/*                onClick={() => remove(index)}*/}
                {/*            ><DeleteIcon/>*/}
                {/*      </span>*/}
                {/*        </Box>*/}
                {/*    );*/}
                {/*})}*/}
            </Box>
        </View>
    )
};