import React, { useEffect, useState } from 'react'

import RecruitmentPreviewItem from "@/sections/recruitment/preview/RecruitmentPreviewItem";

// components
import Page from '@/components/Page'
// config
import {PAGES } from '@/config'
// layouts
import Layout from '@/layouts'
import { DragDropContext } from "react-beautiful-dnd";
import {Column} from '@/sections/kanban';

// utils
import { getRolesByPage } from '@/utils/role'
import {
  useGetRecruitmentPipelineStatesByRecruitmentQuery,
  useUpdateApplicantRecruitmentToNextStateMutation
} from "@/sections/applicant";
Recruitment.getLayout = function getLayout({ roles = [] }, page) {
  return <Layout roles={roles}>{page}</Layout>
}
import {PipelineStateType} from '@/utils/enum'
import { useRouter } from "next/router";
export async function getServerSideProps() {
  return {
    props: {
      roles: getRolesByPage(PAGES.Recruitment),
    },
  }
}

export default function Recruitment() {
  const router = useRouter();
  const RecruitmentId = router.query.slug;
  const { data: ColumnData } = useGetRecruitmentPipelineStatesByRecruitmentQuery(RecruitmentId);
  console.log('ColumnData',ColumnData)
  const [ChangeToNextState] = useUpdateApplicantRecruitmentToNextStateMutation();
  const onDragEnd = async(result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    // khác cột
    if (source.droppableId !== destination.droppableId) {
      console.log('1234',columns)
      console.log('12345',result)
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      console.log('12346',sourceColumn)
      console.log('12347',destColumn)
      console.log('12348',sourceItems)
      console.log('12349',destItems)
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
      // let sourceColumn2=sourceColumn
      // let applicantId=sourceColumn2?.items((item)=>{
      //   if(source.draggableId==item.id)
      //   // applicantId=item.applicantId
      //   return item.applicantId
      // })
      // console.log('12347',destColumn)
      // console.log('12348',sourceItems)
      // console.log('12349',destItems)
      // console.log('123410',source.draggableId)
      
      // call api
      let body
      if(destColumn.pipelineStateType==3){
        body ={
          "applicantId": applicantId,
          "recruitmentId": RecruitmentId,
          "recruitmentPipelineStateId":destColumn.id,
          "pipelineStateResultType": 0,
          "note":"abc"
        }
      }
      else{
         body ={
          "applicantId": applicantId,
          "recruitmentId": RecruitmentId,
          "recruitmentPipelineStateId":destColumn.id,
        }
      }
    


      await ChangeToNextState(body)
      
      
      // await ChangeToNextState({ Id }).unwrap();
      //
 
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
     
        <RecruitmentPreviewItem/>
        <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
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
             <h2>{PipelineStateType(column.pipelineStateType)}</h2>
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
       
    
    
      </DragDropContext>
    </div>
  </Page>
  )
}
