import React, { memo } from "react";
import PropTypes from "prop-types";
import { Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import {
    useGetApplicantByPipelineStateIdQuery
  } from "@/sections/applicant";
const Column = ({ droppableId, column }) => {
  const { data: ColumnData } = useGetApplicantByPipelineStateIdQuery(droppableId);
  console.log('ColumnData',ColumnData?.items)
  return (
    <Droppable droppableId={droppableId} key={droppableId}>
      {(provided, snapshot) => {
        return (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
              background: snapshot.isDraggingOver ? "lightblue" : column.color,
              padding: 4,
              width: 250,
              minHeight: 500,
              border: "2px ridge #ccc",
              borderRadius: "4px"
            }}
          >
            {ColumnData?.items?.map((item, index) => {
              return <TaskCard key={item.id} item={item} index={index} />;
            })}
            {provided.placeholder}
          </div>
        );
      }}


    </Droppable>
  );
};

Column.propTypes = {
  column: PropTypes.object,
  droppableId: PropTypes.string
};

export default memo(Column);
