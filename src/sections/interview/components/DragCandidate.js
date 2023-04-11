import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useFormContext } from "react-hook-form";
import DraggableForm from "@/sections/interview/components/DraggableForm";

export const DragItem = styled("li")(() => ({
  "&::marker": {
    color: "white"
  }
}));

function DragCandidate({ data }) {
  const { setValue } = useFormContext();
  const [characters, setCharacters] = useState([]);
  const newArr = data;
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setCharacters([...data, items]);
  };

  const RemoveItem = (id) => {
    setValue("applicantIdArray", newArr.map(function(item) {
      if (item.id !== id)
        return item["id"];
    }));
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable sx={{ height: "100%" }} droppableId="characters">
          {(provided) => (
            <ul
              style={{ overflowY: "auto", height: "calc(100% - 105px)" }}
              className="characters"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {newArr?.map((model, index) => {
                return <DraggableForm model={model} index={index} removeItem={RemoveItem}/>
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default DragCandidate;
