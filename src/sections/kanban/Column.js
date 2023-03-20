import React, { memo,useRef } from "react";
import PropTypes from "prop-types";
import { Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import {
  Box,
  Paper,
  Stack,
  Typography
} from '@mui/material'
import useKanban from '@/hooks/useKanban'
import {PipelineStateType} from '@/utils/enum'
import Iconify from "@/components/Iconify";
const CARD_WIDTH=250
const KANBAN_STATUS_HEADER_HEIGHT=300
const Column = ({ droppableId, column }) => {
  const { kanbanColumn: { lgHeight = 0, xsHeight = 0 } = {} } = useKanban()
  const scrollRef = useRef(null)
  console.log('âdad',column.items.length)
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

    <Droppable droppableId={droppableId} key={droppableId}>
      {(provided) => {
        return (
      
          <Paper
          variant='outlined'
          sx={{
            px: 2,
            bgcolor: 'rgba(9, 30, 66, 0.1)',
            height: {
              lg: `calc(100vh - ${lgHeight}px)`,
              xs: `calc(100vh - ${xsHeight}px)`,
            },
            backdropFilter: "blur(3px)",
          }}
        >
                <Box
          sx={{
            // background: background,
            borderTopLeftRadius: '1rem',
            borderTopRightRadius: '1rem',
            height: '8px',
            marginX: -2,
          }}
        />
            <Box
            ref={scrollRef}
            sx={{
              height: {
                lg: `calc(100vh - ${lgHeight + KANBAN_STATUS_HEADER_HEIGHT}px)`,
                xs: `calc(100vh - ${xsHeight + KANBAN_STATUS_HEADER_HEIGHT}px)`,
              },
              width: `${CARD_WIDTH}px`,
              overflowY: 'auto',
              mb: 2,
            }}
          >
            <Stack
              ref={provided.innerRef}
              {...provided.droppableProps}
              spacing={2}
              sx={{
                minHeight: '200px',
              }}
            >
            {column?.items?.map((item, index) => {
              return <TaskCard key={item.id} item={item} index={index} pipelineStateType={column.pipelineStateType}/>;
            })}
            {provided.placeholder}
            </Stack>
          </Box>
          </Paper>
        );
      }}


    </Droppable>
    </Stack>
  );
};

Column.propTypes = {
  column: PropTypes.object,
  droppableId: PropTypes.string
};

export default memo(Column);
