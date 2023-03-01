import PropTypes from "prop-types";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const DraggableListProps = {
  data: PropTypes.array,
  setData: PropTypes.func,
  renderItem: PropTypes.func,
};

export const DraggableList = (props) => {
  const { data, setData, renderItem } = props;

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(data);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setData?.(items);
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="characters">
        {(provided) => (
          <ul
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ listStyle: "none" }}
          >
            {data?.map?.((item, index) => {
              return (
                <Draggable key={index} index={index} draggableId={`${index}`}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {renderItem?.(item, index)}
                    </li>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

DraggableList.propTypes = DraggableListProps;
