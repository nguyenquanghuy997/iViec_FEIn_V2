import {Box, Divider, Drawer, Grid, IconButton, Stack, Typography} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import Content from "@/components/BaseComponents/Content";
import {BoxFlex} from "@/sections/emailform/style";
import CloseIcon from "@/assets/CloseIcon";
import MuiButton from "@/components/BaseComponents/MuiButton";
import {
    BookmarkIcon,
    ReportIcon,
    SearchPreviewIcon,
    ShareIcon,
    StarPreviewIcon
} from "@/sections/recruitment/others/Icon";
import {pxToRem} from "@/utils/getFontValue";
import {
    CompanyIntro,
    JobDescriptionBox,
    JobDetailHeader,
    JobFunction,
    JobLogo,
    JobRemainTime,
    JobSummary,
    JobTitleBox
} from "@/sections/recruitment/style";

const RecruitmentPreview = ({open, onClose}) => {
    return (
        <Drawer
            open={open}
            onClose={onClose}
            anchor="right"
            PaperProps={{
                sx: {
                    width: {lg: '100%'},
                    zIndex: 9999,
                    position: 'fixed',
                    height: 'calc(100% - 64px)',
                    top: '64px',
                    right: 0,
                }
            }}
        >
            {/*   Header   */}
            <Box sx={{boxShadow: "0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)",}}>
                <Content style={{paddingTop: '20px', paddingBottom: '20px'}}>
                    <BoxFlex>
                        <Typography variant="body1" sx={{color: '#172B4D', fontSize: 16, fontWeight: 600}}>
                            Xem trước tin tuyển dụng
                        </Typography>
                        <IconButton onClick={onClose}>
                            <CloseIcon/>
                        </IconButton>
                    </BoxFlex>
                </Content>
            </Box>
            {/*  content  */}
            <Grid container sx={{background: '#EDEDED'}}>
                <Content>
                    <JobDetailHeader className="job-detail-header">
                        <Grid container>
                            <Grid item md={8} sm={6} xs={12}>
                                <JobLogo className="job-logo">
                                    <img alt="Logo"
                                         src={'http://103.176.149.158:5001/api/Image/GetImage?imagePath=01000000-ac12-0242-4102-08db28f341ae%2F20230320033302290.jpg'}/>
                                </JobLogo>
                                <JobTitleBox className="job-title-box">
                                    <Box sx={{mb: 0.5, display: 'inline-flex', alignItems: 'center'}}>
                                        <h2 className="job-title">Giảng Viên Lập Trình Fullstack</h2>
                                        <div>
                                            <MuiButton
                                                startIcon={<StarPreviewIcon/>}
                                                title="Hot"
                                                color="error"
                                                sx={{
                                                    fontSize: pxToRem(12),
                                                    color: '#F77A0C',
                                                    backgroundColor: "#FFF3E0",
                                                    ml: 1,
                                                    px: '10px',
                                                }}
                                            />
                                        </div>
                                    </Box>
                                    <Box>
                                        <p className="job-company">
                                            Công ty Cổ phần Giáo dục iVIEC 14
                                        </p>
                                    </Box>
                                    <Box className="extra-buttons" sx={{display: 'flex'}}>
                                        <p className="job-match">
                                            Phù hợp với bạn
                                        </p>
                                        <MuiButton
                                            title="So sánh"
                                            startIcon={<SearchPreviewIcon/>}
                                            color="error"
                                            sx={{
                                                color: '#F77A0C',
                                                fontSize: pxToRem(12),
                                                ml: 1,
                                                px: '10px',
                                                border: '1px solid #F77A0C',
                                            }}
                                        />
                                    </Box>
                                </JobTitleBox>
                            </Grid>
                            <Grid item md={4} sm={6} xs={12}>
                                <JobFunction className="job-function">
                                    <Stack flexDirection="row" flex={1} flexDirection="row-reverse" ml={'22px'}>
                                        <MuiButton title="Ứng tuyển" sx={{
                                            backgroundColor: "#F77A0C",
                                            px: 2,
                                            color: '#FFF',
                                            minWidth: 8
                                        }}/>
                                        <MuiButton title={<BookmarkIcon/>} color="basic"/>
                                        <MuiButton title={<ShareIcon/>} color="basic"/>
                                        <MuiButton title={<ReportIcon/>} color="basic"/>
                                    </Stack>
                                </JobFunction>
                                <JobRemainTime className="job-remainTime">
                                    Còn <strong>24</strong> ngày để ứng tuyển
                                </JobRemainTime>
                            </Grid>
                        </Grid>
                    </JobDetailHeader>
                    <Grid container>
                        <Grid item md={8}>
                            <JobDescriptionBox className="job-description-box">
                                <Box className="job-description">
                                    <JobSummary className="job-summary">
                                        <Grid2 direction="row" container>
                                            <Grid2 direction="row" md={4}>
                                                <Box>
                                                    <MuiButton
                                                        title={<span>icon</span>}
                                                    />
                                                    <Box>
                                                        <Typography variant="body1" className="title-summary">Mức lương</Typography>
                                                        <Typography variant="body1" className="detail-summary">15 - 30 triệu</Typography>
                                                    </Box>
                                                </Box>
                                            </Grid2>
                                            <Grid2 direction="row" md={4}>
                                                <Box>
                                                    <MuiButton
                                                        title={<span>icon</span>}
                                                    />
                                                    <Box>
                                                        <Typography variant="body1" className="title-summary">Mức lương</Typography>
                                                        <Typography variant="body1" className="detail-summary">15 - 30 triệu</Typography>
                                                    </Box>
                                                </Box>
                                            </Grid2>
                                            <Grid2 direction="row" md={4}>
                                                <Box>
                                                    <MuiButton
                                                        title={<span>icon</span>}
                                                    />
                                                    <Box>
                                                        <Typography variant="body1" className="title-summary">Mức lương</Typography>
                                                        <Typography variant="body1" className="detail-summary">15 - 30 triệu</Typography>
                                                    </Box>
                                                </Box>
                                            </Grid2>
                                            <Grid2 direction="row" md={4}>
                                                <Box>
                                                    <MuiButton
                                                        title={<span>icon</span>}
                                                    />
                                                    <Box>
                                                        <Typography variant="body1" className="title-summary">Mức lương</Typography>
                                                        <Typography variant="body1" className="detail-summary">15 - 30 triệu</Typography>
                                                    </Box>
                                                </Box>
                                            </Grid2>
                                            <Grid2 direction="row" md={8}>
                                                <Box>
                                                    <MuiButton
                                                        title={<span>icon</span>}
                                                    />
                                                    <Box>
                                                        <Typography variant="body1" className="title-summary">Mức lương</Typography>
                                                        <Typography variant="body1" className="detail-summary">15 - 30 triệu</Typography>
                                                    </Box>
                                                </Box>
                                            </Grid2>
                                        </Grid2>
                                    </JobSummary>
                                    <Divider fullWidth/>
                                    <Box>
                                        <Box>
                                            <Typography variant="body1">Chi tiết công việc</Typography>
                                            <div className="job-content">
                                                <ul>
                                                    <li>Lập trình Web với HTML/CSS/Javascript, ReactJS.</li>
                                                    <li>Thiết kế và lập trình cơ sở dữ liệu.</li>
                                                    <li>Lập trình Java, C#, PHP.</li>
                                                    <li>Lập trình Web với Spring framework, ASP.Net, API,…</li>
                                                    <li>Lập trình Mobile với Flutter/Dart.</li>
                                                </ul>
                                            </div>
                                        </Box>
                                        <Box>
                                            <Typography variant="body1">Yêu cầu công việc</Typography>
                                            <div className="job-content">
                                                <ul>
                                                    <li>Lập trình Web với HTML/CSS/Javascript, ReactJS.</li>
                                                    <li>Thiết kế và lập trình cơ sở dữ liệu.</li>
                                                    <li>Lập trình Java, C#, PHP.</li>
                                                    <li>Lập trình Web với Spring framework, ASP.Net, API,…</li>
                                                    <li>Lập trình Mobile với Flutter/Dart.</li>
                                                </ul>
                                            </div>
                                        </Box>
                                        <Box>
                                            <Typography variant="body1">Quyền lợi</Typography>
                                            <div className="job-content">
                                                <ul>
                                                    <li>Lập trình Web với HTML/CSS/Javascript, ReactJS.</li>
                                                    <li>Thiết kế và lập trình cơ sở dữ liệu.</li>
                                                    <li>Lập trình Java, C#, PHP.</li>
                                                    <li>Lập trình Web với Spring framework, ASP.Net, API,…</li>
                                                    <li>Lập trình Mobile với Flutter/Dart.</li>
                                                </ul>
                                            </div>
                                        </Box>
                                    </Box>
                                </Box>
                                <JobFunction className="job-function">
                                    <Stack flexDirection="row" flex={1}>
                                        <MuiButton
                                            title="Ứng tuyển"
                                            color="error"
                                        />
                                    </Stack>
                                    <MuiButton title={<BookmarkIcon/>} color="basic"/>
                                    <MuiButton title={<ShareIcon/>} color="basic"/>
                                    <MuiButton title={<ReportIcon/>} color="basic"/>
                                </JobFunction>
                            </JobDescriptionBox>
                        </Grid>
                        <Grid item md={4}>
                            <Box>
                                <Box sx={{
                                    width: '100%',
                                    border: '1px solid #CCD4DC',
                                    backgroundColor: '#FFF',
                                    borderRadius: 0.5,
                                    overFlow: 'auto'
                                }}>
                                    <img alt="Banner"
                                         src="http://103.176.149.158:5001/api/Image/GetImage?imagePath=01000000-ac12-0242-4102-08db28f341ae%2F20230320033302326.jpg"/>
                                    <CompanyIntro className="company-intro">
                                        <Box className="company-name">
                                            <Box className="job-logo">
                                                <img
                                                    src="http://103.176.149.158:5001/api/Image/GetImage?imagePath=01000000-ac12-0242-4102-08db28f341ae%2F20230320033302290.jpg"
                                                    alt="Logo"/>
                                            </Box>
                                            <Typography variant="body1">Công ty Cổ phần Giáo dục iVIEC 14</Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant="body1" className="typoTitle">
                                                Giới thiệu
                                            </Typography>
                                            <Typography variant="body1" className="typoContent">
                                                ABCDEF
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant="body1" className="typoTitle">
                                                Quy mô
                                            </Typography>
                                            <Typography variant="body1" className="typoContent">
                                                2000 - 3000 nhân sự
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant="body1" className="typoTitle">
                                                Địa chỉ công ty
                                            </Typography>
                                            <Typography variant="body1" className="typoContent"></Typography>
                                        </Box>
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3724.1442338210686!2d105.78650891535462!3d21.02691409321628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1679287010117!5m2!1svi!2s"
                                            width={400} height={300} style={{border: 0, width: '100%', height: '168px'}}
                                            allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"/>
                                    </CompanyIntro>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Content>
            </Grid>

        </Drawer>
    )
}
export default RecruitmentPreview;