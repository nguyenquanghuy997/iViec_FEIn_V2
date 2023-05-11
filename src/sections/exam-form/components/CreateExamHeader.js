import MuiButton from "@/components/BaseComponents/MuiButton"
import { Box, Breadcrumbs, Link, Typography } from "@mui/material"

const CreateExamHeader = () => {
    return <>
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flex: 1,
            background: '#FDFDFD',
            border: ' 1px solid #E7E9ED',
            borderRadius: '4px',
            padding: '16px 24px',
        }}>
            <Box>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" href="/" sx={{
                        fontSize: '.875rem',
                        fontWeight: 600,
                        color: '#8A94A5'
                    }}>
                        Danh sách đề thi
                    </Link>
                    <Typography sx={{
                        fontSize: '.875rem',
                        fontWeight: 600,
                        color: '#455570'
                    }}>Tạo mới đề thi</Typography>
                </Breadcrumbs>
            </Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end'
            }}>
                <MuiButton
                    title={'Hủy'}
                    color="basic"
                    className={'btn-actions btn-cancel'}
                    sx={{
                        padding: '8px 12px'
                    }}
                />

                <MuiButton
                    title="Xem trước"
                    color="default"
                    // onClick={() => onOpenConfirm({ openPreview: true })}
                    // disabled={!name || isDisabled}
                    sx={{
                        fontWeight: 500,
                        padding: '8px 12px',
                        margin: '0 1rem',
                        "&:hover": {
                            boxShadow: 'none'
                        },
                        "&.Mui-disabled": {
                            color: "#8a94a5",
                            backgroundColor: "#d0d4db",
                        }
                    }}
                />

                <MuiButton
                    title="Lưu nháp"
                    color="default"
                    // disabled={!name || isDisabled}
                    // onClick={() => onOpenConfirm({ openSaveDraft: true })}
                    sx={{
                        marginRight: '1rem',
                        padding: '8px 12px',
                        fontWeight: 500,
                        "&:hover": {
                            boxShadow: 'none'
                        },
                        "&.Mui-disabled": {
                            color: "#8a94a5",
                            backgroundColor: "#d0d4db",
                        }
                    }}
                />

                <MuiButton
                    title={'Lưu'}
                    color={"primary"}
                    className={'btn-actions btn-confirm'}
                    sx={{
                        padding: '8px 12px',
                    }}
                />
            </Box>

        </Box>
    </>
}

export default CreateExamHeader