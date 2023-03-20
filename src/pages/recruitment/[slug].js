import React, { useEffect, useState } from 'react'
import RecruitmentPreviewItem from "@/sections/recruitment/preview/RecruitmentPreviewItem";
// componentsf
import Page from '@/components/Page'
// config
import {PAGES } from '@/config'
// layouts
import Layout from '@/layouts'
import { DragDropContext } from "react-beautiful-dnd";
import {Column} from '@/sections/kanban';
import {useGetRecruitmentByIdQuery} from "@/sections/recruitment";
// utils
import { getRolesByPage } from '@/utils/role'
import {
  useGetRecruitmentPipelineStatesByRecruitmentQuery,
  useUpdateApplicantRecruitmentToNextStateMutation
} from "@/sections/applicant";

import { useRouter } from "next/router";
import {  Modal } from 'antd';
import Iconify from "@/components/Iconify";
import {

  Typography,

} from '@mui/material'
Recruitment.getLayout = function getLayout({ roles = [] }, page) {
  return <Layout roles={roles}>{page}</Layout>
}
export async function getServerSideProps() {
  return {
    props: {
      roles: getRolesByPage(PAGES.Recruitment),
    },
  }
}
import Box from '@mui/material/Box';
export default function Recruitment() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const router = useRouter();
  const RecruitmentId = router.query.slug;
  const { data: RecruitmentData } = useGetRecruitmentByIdQuery({ Id: RecruitmentId })
  const { data: ColumnData } = useGetRecruitmentPipelineStatesByRecruitmentQuery(RecruitmentId);
  console.log('ColumnData',ColumnData)
  const [ChangeToNextState] = useUpdateApplicantRecruitmentToNextStateMutation();
  const onDragEnd = async(result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    // khác cột
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      let applicantId
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
      sourceColumn.items.map((item)=>{
        if(item.id==result.draggableId)
         applicantId=item.applicantId

      })
      // call api
      let body
      if(destColumn.pipelineStateType==3){
        showModal()
        // body ={
        //   "applicantId": applicantId,
        //   "recruitmentId": RecruitmentId,
        //   "recruitmentPipelineStateId":destColumn.id,
        //   "pipelineStateResultType": 0,
        //   "note":"abc"
        // }
      }
      else{
         body ={
          "applicantId": applicantId,
          "recruitmentId": RecruitmentId,
          "recruitmentPipelineStateId":destColumn.id,
        }
      }
      await ChangeToNextState(body)
    } else {
      // cùng cột
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };

  const [columns, setColumns] = useState(ColumnData);
  useEffect(() => {
    
    setColumns(ColumnData)
  }, [ColumnData])

  return (
    <Page title={"Chi tiết tin"}>
     
        <RecruitmentPreviewItem RecruitmentData={RecruitmentData}/>
         <div style={{ display: "flex", justifyContent: "center", height: "100%",backgroundSize: 'cover', backgroundRepeat: 'no-repeat' ,backgroundImage:`url('../assets/icons/candidate/bgImage.png')`}}> 

       <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
         {columns&&Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
              key={columnId}
            > 
              <div style={{ margin: 8 }}>
                <Column
                  droppableId={columnId}
                  key={columnId}
                  index={index}
                  column={column}
                />
              </div>
            </div>
          );
        })}
       

      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    p: 1,
                    m: 1,
                    borderRadius: 1,
                }}
            >
                 <Iconify icon={"fluent-mdl2:circle-half-full"} width={20} height={20} color="#D32F2F"/>
                 <Typography fontSize="12px">{"Chuyển ứng viên sang bước kết quả"}</Typography>
                 <Typography fontSize="12px">{"Lưu ý: Bạn chỉ có thể gửi Offer khi ứng viên ở trạng thái Kết quả - Đạt"}</Typography>
                 
            </Box>
      </Modal>

      </DragDropContext> 

    </div>
  </Page>
  )
}
