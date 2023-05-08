import MuiButton from "@/components/BaseComponents/MuiButton"
import { Text, View } from "@/components/FlexStyled"
import Iconify from "@/components/Iconify"
import { SubTitleStyle } from "@/sections/emailform/style"
import { ButtonIcon } from "@/utils/cssStyles"
import { Box, Divider, Typography } from "@mui/material"

const CreateExamContent = () => {
	const renderExamSettingInfo = (icon, title) => {
    return (
      <>
        {icon}
        <Text ml={10} fontSize={14} fontWeight={"400"} color={"#5C6A82"}>
          {title}
        </Text>
      </>
    );
  };

	return <>
		<View p={'24px'}>
			<View flexRow atCenter jcBetween>
				<View>
					<Typography variant="h6" sx={{
						fontSize: '1.5rem',
						fontWeight: 600,
						color: '#172B4D',
					}}>
						{'Đề thi tuyển dụng lập trình viên'}
					</Typography>

					<SubTitleStyle sx={{
						fontSize: '14px',
						fontWeight: 400,
						marginTop: '8px'
					}}>
						Dành cho các job tuyển vị trí front-end và back-end Junior
					</SubTitleStyle>
				</View>

				<View flexRow atCenter>
					<ButtonIcon
						sx={{
							marginLeft: "16px",
							backgroundColor: 'transparent',
							"&:hover": {
								backgroundColor: "unset",
							},
						}}
						// onClick={() => handleShowConfirmMultiple("delete")}
						icon={
							<Iconify
								icon={"ri:edit-2-fill"}
								width={20}
								height={20}
								color="#5C6A82"
							/>
						}
					/>

					<View allCenter style={{
						margin: '0 24px 0 8px',
						padding: '6px 8px',
						border: '1px solid #455570',
						borderRadius: '4px'
					}}>
						<Typography sx={{
							fontSize: '13px',
							color: '#455570',
							fontWeight: 500,
						}}>Điểm sàn
						</Typography>
						<span style={{ fontSize: '16px', fontWeight: 600 }}>-</span>
					</View>

					<View allCenter style={{
						padding: '6px 8px',
						border: '1px solid #455570',
						borderRadius: '4px'
					}}>
						<Typography sx={{
							fontSize: '13px',
							color: '#455570',
							fontWeight: 500,
						}}>Điểm tối đa
						</Typography>
						<span style={{ fontSize: '16px', fontWeight: 600 }}>10</span>
					</View>

				</View>
			</View>

			<View mt={'24px'}>
				<Box>
					<MuiButton
						title={'Thiết lập đề thi'}
						startIcon={<Iconify icon="material-symbols:settings" />}
						color="#455570"
						variant={'container'}
						sx={{
							border: '1px solid #455570',
							padding: '8px 12px',
							fontWeight: 600,
							fontSize: '14px',
							color: '#455570'
						}}
					/>
				</Box>

				<View flexRow>
						{renderExamSettingInfo(<Iconify icon="mdi:clock-time-three-outline" />, '45 phút')}
				</View>
			</View>

			<Divider sx={{ margin: '24px -24px' }} />

			<View>

			</View>
		</View>
	</>

}

export default CreateExamContent