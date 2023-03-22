import React, { memo } from "react";
import PropTypes from "prop-types";
import { Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import {
  Box,

  Stack,
  Typography
} from '@mui/material'

import {PipelineStateType} from '@/utils/enum'
import Iconify from "@/components/Iconify";

const Column = ({ droppableId, column }) => {
  // const { kanbanColumn: { lgHeight = 0, xsHeight = 0 } = {} } = useKanban()
  return (
    <Stack spacing={2} sx={{ p: 2 }} >

  <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    p: 1,
                    m: 1,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                }}
            >
                  <Iconify
                icon={"fluent:arrow-sort-16-regular"}
                width={12}
                height={12}
                color="#455570"
                mt={0.5}
    
              />
                 
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    justifyContent: 'space-between',

                }}
            >
                <Iconify
                icon={"material-symbols:square"}
                width={12}
                height={12}
                color="#1E88E5"
                mr={1}
                mt={0.5}
              />
             <Typography
              display="flex"
              fontSize="14px"
              fontWeight="600"
              alignItems="center"
            >
              {PipelineStateType(column.pipelineStateType)}
            
            </Typography>
            <Typography display="flex" fontSize="14px" fontWeight="600" alignItems="center" ml={1}>
              {column.items.length}
            
            </Typography>
            </Box>
            <Iconify
                icon={"material-symbols:filter-list-rounded"}
                width={12}
                height={12}
                color="#455570"
                mt={0.5}
              />
            </Box>
            <div style={{ display: 'flex', overflow: 'auto' }}>
            <Droppable droppableId={droppableId} key={droppableId}>
      {(provided) => {
        return (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
              background: 'rgba(9, 30, 66, 0.1)',
              padding: 4,
              width: 300,
              minHeight: 1000,
              border: "2px solid #ccc",
              borderRadius: "8px"
            }}
          >
            {column?.items?.map((item, index) => {
              return <TaskCard key={item.id} item={item} index={index} pipelineStateType={column.pipelineStateType}/>;
            })}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
    </div>
    </Stack>
  );
};

Column.propTypes = {
  column: PropTypes.object,
  droppableId: PropTypes.string
};

export default memo(Column);
