import { DownloadLineIcon, ImportLinkIcon, TeamLineIcon } from "@/assets/ActionIcon";
import { LightTooltip } from "@/components/DesignSystem/TooltipHtml";
import Iconify from "@/components/Iconify";
import { FormProvider, RHFTextField } from "@/components/hook-form";
import { ButtonAddStyle } from "@/sections/emailform/style";
import { Box, Button, ButtonGroup, ClickAwayListener, Divider, InputAdornment, MenuItem, MenuList, Stack, Typography } from "@mui/material";
import { useState } from "react";
import {useTheme} from "@mui/material/styles";

export default ({
  methods,
  onSubmit,
  handleSubmit,
  pressAddQuestionGallery,
  handlerCreateQuestion
}) => {
  // const [showDialogStage, setShowDialogStage] = useState(false);
  const [openGroup, setOpenGroup] = useState(false);
  const theme = useTheme();

  const handleCloseGroup = () => {
    setOpenGroup(false);
  };
  const handleOpenGroup = () => {
    setOpenGroup(true);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px",
          marginTop: "16px",
          borderRadius: "6px",
          border: "1px solid " +  theme.palette.common.neutral100,
          background: theme.palette.common.white,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <RHFTextField
              name="searchKey"
              placeholder="Tìm kiếm theo nhóm câu hỏi..."
              sx={{
                minWidth: "360px",
                backgroundColor: theme.palette.common.bgrMaster,
                borderRadius: '6px',
                '.MuiInput-root': {
                  border: 'none'
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ ml: 1.5 }}>
                    <Iconify
                      icon={"eva:search-fill"}
                      sx={{ color: "text.disabled", width: 20, height: 20 }}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </FormProvider>
        </Box>
        <Stack flexDirection="row" alignItems="center">
          <ButtonAddStyle
            className="button-add"
            startIcon={<Iconify icon="material-symbols:add" />}
            onClick={pressAddQuestionGallery}
          >
            Thêm nhóm câu hỏi
          </ButtonAddStyle>

          <ButtonGroup
            variant="contained"
            aria-label="split button"
            sx={{
              marginLeft: '1rem',
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
              onClick={handlerCreateQuestion}
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
              ener
              disableTouchListener
              open={openGroup}
              title={
                <ClickAwayListener
                  onClickAway={handleCloseGroup}
                >
                  <MenuList
                    autoFocusItem
                    divider={true}
                    disableGutters={true}
                  >
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
                    </MenuItem>
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
        </Stack>
      </Box>
    </>
  );
};
