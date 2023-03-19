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
} from "@/sections/applicant";
Recruitment.getLayout = function getLayout({ roles = [] }, page) {
  return <Layout roles={roles}>{page}</Layout>
}
import {PipelineStateType} from '@/utils/enum'

export async function getServerSideProps() {
  return {
    props: {
      roles: getRolesByPage(PAGES.Recruitment),
    },
  }
}


export default function Recruitment() {
  const { data: ColumnList } = useGetRecruitmentPipelineStatesByRecruitmentQuery({"RecruitmentId":"01000000-ac12-0242-10ee-08db277f57a2"});
  const onDragEnd = (result, columns, setColumns) => {
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

  const [columns, setColumns] = useState([]);
  useEffect(() => {
    setColumns(ColumnList?.items)
  }, [ColumnList])

  return (
    <Page title={"Chi tiết tin"}>
     
        <RecruitmentPreviewItem/>
        <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {
          columns&&columns.map((item,index)=>{
            let columnId =item.id
            let column= item
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
          })
        }
    
    
      </DragDropContext>
    </div>
  </Page>
  )
}
