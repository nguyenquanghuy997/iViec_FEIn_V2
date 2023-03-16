import {ButtonDS, SwitchStatusDS} from "@/components/DesignSystem";
import {Text, View} from "@/components/DesignSystem/FlexStyled";
import Iconify from "@/components/Iconify";
import {useGetPreviewApproveProcessQuery} from "@/sections/approve-process/ApproveProcessSlice";
import {ViewModel} from "@/utils/cssStyles";
import {Avatar, CircularProgress, Divider, Grid, Modal, Typography} from "@mui/material";
import React from "react";
import {ButtonCancelStyle} from "@/sections/applicant/style";
import {stringAvatar} from "@/utils/function";

export const ApproveProcessViewModal = ({title, data, show, setShow}) => {
    const {data: preview = {}} = useGetPreviewApproveProcessQuery({Id: data?.id}, {skip: !data?.id});
    const isLoading = !preview.id;

    // action
    const pressHide = () => {
        setShow(false);
    };

    return (
        <Modal
            open={show}
            onClose={pressHide}
            sx={{display: "flex", justifyContent: "flex-end"}}
        >
            <ViewModel>
                {/* header */}
                <View
                    flexrow="true"
                    atcenter="center"
                    pv={12}
                    ph={24}
                    bgcolor={"#FDFDFD"}
                >
                    <Text flex="true" fontsize={16} fontweight={"600"}>
                        Xem {title.toLowerCase()}
                    </Text>
                    <ButtonDS
                        type="submit"
                        sx={{
                            backgroundColor: "#fff",
                            boxShadow: "none",
                            ":hover": {
                                backgroundColor: "#EFF3F7",
                            },
                            textTransform: "none",
                            padding: "12px",
                            minWidth: "unset",
                        }}
                        onClick={pressHide}
                        icon={
                            <Iconify
                                icon={"mi:close"}
                                width={20}
                                height={20}
                                color="#5C6A82"
                            />
                        }
                    />
                </View>
                <Divider/>
                {/* body */}
                {isLoading ? (
                    <View flex="true" contentcenter="true">
                        <CircularProgress/>
                    </View>
                ) : (
                    (
                        <View flex="true" p={24} pb={28} style={{overflowY: "scroll"}}>
                            <Typography variant={"h3"} color={"#172B4D"}>
                                {preview.name}
                            </Typography>
                            <Grid mt={3} container direction="row" justifyContent="flex-start"
                                  alignItems="stretch">
                                <Grid item xs={1}>Mô tả:</Grid>
                                <Grid item xs={11}>
                                    {preview.description}
                                </Grid>
                            </Grid>
                            <Divider sx={{my: 3}}/>
                            <Typography variant={"subtitle1"} color={"#455570"} mb={2}>
                                Cán bộ phê duyệt
                            </Typography>
                            {preview.approvalProcessLevels.map((item, index) => {
                                return (<View
                                    style={{
                                        padding: 16,
                                        marginBottom: 24,
                                        borderRadius: 6,
                                        backgroundColor: "#F2F4F5"
                                    }}
                                    key={item}>
                                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                        <Grid item>
                                            <Typography variant={"subtitle1"} color={"#455570"}>
                                                Cấp {index + 1}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant={"textSize13500"} color={"#455570"}>
                                                Đã
                                                chọn {item?.approvalProcessLevelDetails.flatMap((x) => x?.processLevelDetailPersonInCharges?.length)}
                                            </Typography>
                                        </Grid>
                                        <Grid mt={3} container direction="row" justifyContent="flex-start"
                                              alignItems="baseline">
                                            <Grid item pr={1}>
                                                <Typography variant={"textSize13500"} color={"#455570"}>
                                                    Vai trò:
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                {item?.approvalProcessLevelDetails.map((itemRole, index) => {
                                                    return <>
                                                        <Typography key={itemRole.id} variant={"subtitle2"}
                                                                    mb={1} color={"#455570"}>
                                                            Nguễn Quang
                                                            Huy {itemRole.roleGroupName} ({itemRole.processLevelDetailPersonInCharges.length}) {(index + 1) < item?.approvalProcessLevelDetails.length ? "," : ""}
                                                        </Typography>
                                                    </>
                                                })}
                                            </Grid>
                                        </Grid>
                                        <Grid mt={3} container direction="row" justifyContent="flex-start"
                                              alignItems="baseline">
                                            <Grid item pr={1}>
                                                <Typography variant={"textSize13500"} color={"#455570"}>
                                                    Cán bộ:
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                {item?.approvalProcessLevelDetails.map((itemRole) => {
                                                    itemRole?.processLevelDetailPersonInCharges.map((itemUser) => {
                                                        return <>
                                                            <Avatar
                                                                key={itemUser.id} {...stringAvatar(itemUser?.personInChargeName)}
                                                                sx={{width: "28px", height: "28px"}}/>
                                                            <Typography key={itemUser.id + "typo"} variant={"textSize13500"} mb={1}
                                                                        color={"#455570"}>
                                                                {itemUser?.personInChargeName}
                                                            </Typography>
                                                        </>
                                                    });
                                                })}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </View>)
                            })}
                        </View>
                    )
                )}
                {/* footer */}
                <View
                    flexrow="true"
                    pv={12}
                    ph={16}
                    boxshadow={"inset 0px 1px 0px #EBECF4"}
                >
                    <ButtonDS
                        type="submit"
                        variant="contained"
                        tittle={"Chỉnh sửa"}
                    />
                    <View width={8}/>
                    <ButtonCancelStyle onClick={pressHide}>Đóng</ButtonCancelStyle>
                    <View width={8}/>
                    <View flex="true"/>
                    <SwitchStatusDS
                        name={"isAvailable"}
                        label={"Đang áp dụng"}
                    />
                </View>
            </ViewModel>
        </Modal>
    );
};
