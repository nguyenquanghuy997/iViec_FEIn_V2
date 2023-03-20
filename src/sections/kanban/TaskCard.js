import React, { memo } from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import {
  Box,

  Paper,
  Stack,
  Typography,
  Grid
} from '@mui/material'
import {
  AvatarDS,
  ButtonDS,

} from "@/components/DesignSystem";
import {srcImage} from '@/utils/enum'
import Iconify from "@/components/Iconify";
import {fDate} from "@/utils/formatTime";


function TaskCard({ item, index,pipelineStateType }) {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, ) => {
        return (
          <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Paper
          sx={{
            width: 1,
            position: 'relative',
            boxShadow: (theme) => theme.customShadows.z1,
            '&:hover': {
              boxShadow: (theme) => theme.customShadows.z16,
            },
          }}
        >
          
          <Box 
           sx={{
            justifyContent: 'space-between',
            display: 'flex',
            flexDirection: 'row',
            p: 1,
            

        }}
          >
            <Typography
              display="flex"
              fontSize="20px"
              fontWeight="600"
              alignItems="center"
            >
              <Iconify
                icon={"carbon:dot-mark"}
                width={20}
                height={20}
                color="#4CAF50"
                ml={1}
              />
               <Typography fontSize="12px">{fDate(item.createdTime)}</Typography>
             
            </Typography>
            <Iconify
                icon={"ph:dots-three"}
                width={20}
                height={20}
                color="#4CAF50"
                ml={1}
       
              />
          </Box>

           <Box
              // sx={{ cursor: 'pointer' }}
              // onClick={onOpenUpdateTask.bind(null, card)}
            >
                <Stack
                  spacing={1}
                  sx={{
                    p: 2,
                    background: '#FDFDFD',
                    // boxShadow: '0 0 0 0 rgb(9 30 66 / 25%)',
                  }}
                >
                    <Grid
          display="flex"
          alignItems="center"
          sx={{
            "& .MuiBadge-dot": {
              width: "6px",
              minWidth: "6px",
              height: "6px",
              top: 3,
              right: 3,
            },
          }}
        >
          <AvatarDS
            sx={{ height: "32px", width: "32px", borderRadius: "14px" }}
            src={
              srcImage(item?.portraitImage)
            }
          ></AvatarDS>
          <Box pl={1}>
            <Typography
              display="flex"
              fontSize="13px"
              fontWeight="600"
              alignItems="center"
            >
              {item?.fullName}
           
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              color="#172B4D"
            >
              <Typography fontSize="12px">{item.phoneNumber}</Typography>
            </Stack>
          </Box>
        </Grid>
        {/* Thi tuyển */}
        {pipelineStateType==1&&
             <Box
             sx={{
                backgroundColor:item?.processStatus==4?"#E8F5E9":"#FFEBEE",
                 display: 'flex',
                 flexDirection: 'column-reverse',
                 alignItems: 'flex-start',
             }}
         >
                <Stack
              direction="row"
              
              spacing={0.5}
              p={0.5}
              color={item?.processStatus==4?"##388E3C":"#D32F2F"}
            >
              <Typography fontSize="14px" fontWeight="600">{"Điểm:"}</Typography>
              <Typography fontSize="14px" fontWeight="600" >{item?.processStatus==4?"15/16":"3/16"}</Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={0.5}
              p={0.5}
              color={item?.processStatus==4?"##388E3C":"#D32F2F"}
            >
              <Typography fontSize="14px" fontWeight="600">{"Kết quả :"}</Typography>
              <Typography fontSize="14px" fontWeight="600" >{item?.processStatus==4?"Đạt":"Không Đạt"}</Typography>
            </Stack>
         </Box>
     
        }
        {/* Phỏng vấn */}
          {pipelineStateType==2&&
          <Stack
              direction="col"
             
              spacing={2}
              color={item?.processStatus==4?"##388E3C":"#D32F2F"}
            >
              <Typography fontSize="14px">{"Phỏng vấn lần 1"}</Typography>
              <ButtonDS
            tittle={"Đặt lịch phỏng vấn"}
            type="submit"
            sx={{
              color: "#455570",
              backgroundColor: "#FFFFFF",

              marginRight: "12px",
              fontSize: "14px",
              padding: "6px 12px",
              textTransform: "none",
            }}
       
          />
            </Stack>
        }

         {/* Phỏng vấn */}
     {pipelineStateType==3&&
    <Box>
      <Grid display="flex">
          <ButtonDS
            tittle={"Đạt"}
            type="submit"
            sx={{
              color: "#FDFDFD",
              backgroundColor: "#4CAF50",
              boxShadow: "none",
              ":hover": {
                backgroundColor: "#E7E9ED",
              },
              marginRight: "2px",
              fontSize: "12px",
              padding: "6px 12px",
            }}
  
          />
          <ButtonDS
            tittle={"Cân Nhắc"}
            type="submit"
            sx={{
              color: "#FDFDFD",
              backgroundColor: "#FF9800",
              boxShadow: "none",
              ":hover": {
                backgroundColor: "#1565C0",
              },
              marginRight: "2px",
              fontSize: "12px",
              padding: "6px 12px",
              textTransform: "none",
            }}
      
          />
          <ButtonDS
            tittle={"Loại"}
            type="submit"
            mr={2}
            sx={{
              color: "#FDFDFD",
              backgroundColor: "#F44336",
              boxShadow: "none",
              ":hover": {
                backgroundColor: "#01B6A7",
              },
              marginLeft: "2px",
              fontSize: "12px",
              padding: "6px 12px",
              textTransform: "none",
            }}
   
          />
       
        </Grid>
    
        <ButtonDS
            tittle={"Tái Khai Thác"}
            type="submit"
            sx={{
              ":hover": {
                backgroundColor: "#F3F4F6",
              },
              pt:'2px',
              color: "#455570",
              backgroundColor: "#FFFFFF",
              borderRadius:1,
              border:1,
              borderColor:'#455570',
              marginRight: "2px",
              fontSize: "14px",
              padding: "6px 12px",
              textTransform: "none",
            }}
       
          />

    </Box>
        }

            

                  <Box
                    display='Grid'
                    alignItems='center'
                    gridTemplateColumns='60px 1fr'
                  >
                
                  </Box>

              
                  </Stack>
              </Box>
        
        </Paper>
        </div>
        );
      }}
    </Draggable>
  );
}

TaskCard.propTypes = {
  index: PropTypes.number,
  item: PropTypes.object
};

export default memo(TaskCard);
