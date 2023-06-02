import TaskCard from "./TaskCard";
import Iconify from "@/components/Iconify";
import { PipelineStateType } from "@/utils/enum";
import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import React, { memo } from "react";
import { Droppable } from "react-beautiful-dnd";

const Column = ({ droppableId, column, windowHeight }) => {
  // const { kanbanColumn: { lgHeight = 0, xsHeight = 0 } = {} } = useKanban()
  const  theme = useTheme();
  return (
    <Stack spacing={2} sx={{ p: 1, py: 0 }}>
      <div
        style={{
          background: "rgba(9, 30, 66, 0.1)",
          padding: "12px",
          // backdropFilter: 'blur(3px)'
          width: 350,
          // border: "2px solid #ccc",
          // borderRadius: "8px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 2,
            m: 1,
            bgcolor: "background.paper",
            borderRadius: "4px",
            boxShadow:
              "0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)",
          }}
        >
          <div />

          <Box
            sx={{
              display: "flex",
              // justifyContent: "center",
              justifyContent: "space-between",
            }}
          >
            <Iconify
              icon={"material-symbols:square-rounded"}
              width={15}
              height={15}
              color={theme.palette.common.blue600}
              mr={1}
              mt={0.5}
            />
            <Typography
              display="flex"
              fontSize="14px"
              fontWeight="700"
              alignItems="center"
              color={theme.palette.common.neutral700}
            >
              {PipelineStateType(column.pipelineStateType)}
            </Typography>
            <Typography
              display="flex"
              fontSize="14px"
              fontWeight="700"
              alignItems="center"
              color={theme.palette.common.neutral700}
              ml={1}
            >
              {column.items.length}
            </Typography>
          </Box>

          <div />
        </Box>
        <Box style={{ borderRadius: "8px" }}>
          <Droppable droppableId={droppableId} key={droppableId}>
            {(provided) => {
              return (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    // background: "rgba(9, 30, 66, 0.1)",
                    padding: 8,
                    borderRadius: "8px",
                    height: `calc(100vh - ${windowHeight}px - 110px)`,
                    overflowX: "auto",
                  }}
                >
                  {column?.items?.map((item, index) => {
                    return (
                      <TaskCard
                        key={item.id}
                        item={item}
                        index={index}
                        pipelineStateType={column.pipelineStateType}
                      />
                    );
                  })}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        </Box>
      </div>
    </Stack>
  );
};

Column.propTypes = {
  column: PropTypes.object,
  droppableId: PropTypes.string,
};

export default memo(Column);
