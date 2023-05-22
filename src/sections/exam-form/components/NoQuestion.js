import { TeamLineIcon } from "@/assets/ActionIcon";
import { LightTooltip } from "@/components/DesignSystem/TooltipHtml";
import Iconify from "@/components/Iconify";
import { Button, ButtonGroup, ClickAwayListener, MenuItem, MenuList, Typography } from "@mui/material";
import { useState } from "react";
import {useTheme} from "@mui/material/styles";

const NoQuestion = ({ setShowQuestionForm, setShowQuestionGallaryInternalModal }) => {
    const [openGroup, setOpenGroup] = useState(false);

    const handleCloseGroup = () => {
        setOpenGroup(false);
    };
    const handleOpenGroup = () => {
        setOpenGroup(true);
    };
    const theme = useTheme();

    return <div style={{ margin: "40px 0", minHeight: "250px", textAlign: 'center' }}>
        <img
            src={`/assets/icons/candidate/notfound.png`}
            style={{ margin: "0 auto" }}
        />
        <p style={{ fontSize: 14, color: theme.palette.common.neutral400, margin: '0 0 24px 0' }}> Đề thi hiện chưa có câu hỏi nào</p>
        <ButtonGroup
            variant="contained"
            aria-label="split button"
            sx={{
                boxShadow: "unset",
                "& .MuiButtonGroup-grouped:not(:last-of-type)": {
                    borderColor: "white",
                },
                "& .MuiButtonGroup-grouped:hover": {
                    opacity: 0.8,
                },
            }}
        >
            <Button
                style={{
                    background: theme.palette.common.blue700,
                    padding: "8px 12px",
                    fontWeight: 600,
                    fontSize: ' .875rem',
                    borderRadius: '6px 0px 0px 6px',
                    textTransform: 'none'
                }}
                onClick={setShowQuestionForm}
            >
                <Iconify
                    icon={"material-symbols:add"}
                    width={20}
                    height={20}
                    color={theme.palette.background.paper}
                    mr={1}
                />
                Thêm câu hỏi
            </Button>
            <LightTooltip
                placement="bottom-end"
                onClose={handleCloseGroup}
                disableFocusListener
                disableHoverList
                ener={'true'}
                disableTouchListener
                open={openGroup}
                title={
                    <ClickAwayListener
                        onClickAway={handleCloseGroup}
                    >
                        <MenuList
                            autoFocusItem
                            divider={'true'}
                            disableGutters={'true'}
                        >
                            <MenuItem onClick={setShowQuestionGallaryInternalModal}>
                                <TeamLineIcon sx={{ mr: "12px" }} />
                                <Typography ml={"12px"} variant={"textSize13600"}>
                                    Lấy từ kho nội bộ
                                </Typography>
                            </MenuItem>
                            {/* <Divider />
                            <MenuItem>
                                <TeamLineIcon sx={{ mr: "12px" }} />
                                <Typography ml={"12px"} variant={"textSize13600"}>
                                    Lấy từ kho iVIEC
                                </Typography>
                            </MenuItem>
                            <Divider />
                            <MenuItem>
                                <DownloadLineIcon />
                                <Typography ml={"12px"} variant={"textSize13600"}>
                                    Tải mẫu Excel
                                </Typography>
                            </MenuItem>
                            <Divider />
                            <MenuItem>
                                <ImportLinkIcon sx={{ mr: "12px" }} />
                                <Typography ml={"12px"} variant={"textSize13600"}>
                                    Import Excel
                                </Typography>
                            </MenuItem> */}
                        </MenuList>
                    </ClickAwayListener>
                }
            >
                <Button
                    size="small"
                    aria-haspopup="menu"
                    onClick={handleOpenGroup}
                    style={{
                        background: theme.palette.common.blue700,
                        padding: "8px 12px",
                        borderRadius: '0px 6px 6px 0px',
                    }}
                >
                    <Iconify
                        icon={"material-symbols:arrow-drop-down"}
                        width={20}
                        height={20}
                        color={theme.palette.background.paper}
                    />
                </Button>
            </LightTooltip>
        </ButtonGroup>
    </div>
}

export default NoQuestion