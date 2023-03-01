import ConnectCard from "../../sections/connect/ConnectCard";
// import Iconify from "@/components/Iconify";
// // components
// import Page from "@/components/Page";
// import { IconButtonAnimate } from "@/components/animate";
// import { SkeletonKanbanColumn } from "@/components/skeleton";
// config
// import { HEADER, NAVBAR, PAGES } from "@/config";
// import useCollapseDrawer from "@/hooks/useCollapseDrawer";
// // hooks
// import useLocales from "@/hooks/useLocales";
import useSettings from "@/hooks/useSettings";
// layouts
// import Layout from "@/layouts";
import SettingLayout from "@/layouts/setting";
// import { useGetAdminSearchListJobsQuery } from "@/redux/api/apiSlice";
// redux
import { useDispatch } from "@/redux/store";
// sections
// import { KanbanColumn, KanbanTableToolbar } from "@/sections/kanban";
// import KanbanTaskAdd from "@/sections/kanban/KanbanTaskAdd";
import {
  getBoard,
  // selectBoard,
  // updateCardByDestColumn,
  // useGetActiveJobsQuery,
  useGetCardDetailMutation,
  // useGetClientQuery,
  // useGetLabelQuery,
  // useGetMemberQuery,
} from "@/sections/kanban/kanbanSlice";
// import cssStyles from "@/utils/cssStyles";
// // utils
// import { getRolesByPage } from "@/utils/role";
// // @mui
import {
  Container,
} from "@mui/material";
// import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useCallback, useEffect } from "react";
// import { DragDropContext } from "react-beautiful-dnd";

Board.getLayout = function getLayout({ roles = [] }, page) {
  return <SettingLayout roles={roles} >{page}</SettingLayout>;
};

// export async function getStaticProps() {
//   return {
//     props: {
//       roles: getRolesByPage(PAGES.Board),
//     },
//   };
// }

// const SearchIconStyle = styled("div")(({ theme, ownerState }) => {
//   const { isCollapse = false } = ownerState;
//   const left = isCollapse
//     ? NAVBAR.DASHBOARD_COLLAPSE_WIDTH``
//     : NAVBAR.DASHBOARD_WIDTH;
//   const pl = (window.innerWidth - theme.breakpoints.values["xl"] - left) / 2;

//   return {
//     top: HEADER.MOBILE_HEIGHT / 4,
//     left: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
//     zIndex: 1101,
//     position: "fixed",
//     [theme.breakpoints.up("xl")]: {
//       top: HEADER.DASHBOARD_DESKTOP_HEIGHT / 4,
//       left,
//       paddingLeft: theme.spacing(2),
//     },
//     [theme.breakpoints.up("2k")]: {
//       paddingLeft: pl + parseInt(theme.spacing(2)),
//     },
//   };
// });

// const SearchbarStyle = styled("div")(({ theme, ownerState }) => {
//   const { isCollapse = false } = ownerState;
//   const collapseWidth = isCollapse
//     ? NAVBAR.DASHBOARD_COLLAPSE_WIDTH
//     : NAVBAR.DASHBOARD_WIDTH;

//   return {
//     ...cssStyles(theme).bgBlur(),
//     top: 0,
//     left: 0,
//     zIndex: 1102,
//     width: "100%",
//     display: "flex",
//     position: "absolute",
//     padding: theme.spacing(3),
//     boxShadow: theme.customShadows.z8,
//     "& form": {
//       width: "100%",
//     },
//     [theme.breakpoints.up("lg")]: {
//       left: collapseWidth,
//       width: `calc(100% - ${collapseWidth}px)`,
//     },
//   };
// });

export default function Board() {
  // const { isCollapse } = useCollapseDrawer();
  const { themeStretch } = useSettings();
  // const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const { query } = useRouter();
  // const { isLeaderRole, isMemberRole } = useRole()
  const dispatch = useDispatch();
  // const [laneId, setLaneId] = useState("");
  // const [card, setCard] = useState(null);
  // const [open, setOpen] = useState(false);
  // const [isAddTaskNoColumn, setIsAddTaskNoColumn] = useState(false);
  // const [isOpenSearchForm, setOpenSearchForm] = useState(false);

  // const isLoading = useSelector((state) => state.kanban.isLoading);
  // const board = useSelector((state) => selectBoard(state));

  // // const hasAddPermission = true;

  // const { data: listLabels } = useGetLabelQuery();
  // const { data: listClients } = useGetClientQuery();
  // const { data: listJobs } = useGetAdminSearchListJobsQuery();
  // const { data: listMembers } = useGetMemberQuery();
  // const { data: listActiveJobs } = useGetActiveJobsQuery();
  const [getCardDetail] = useGetCardDetailMutation();

  // const labelOptions = useMemo(() => {
  //   if (!listLabels) return [];

  //   const { data: { list = [] } = {} } = listLabels;
  //   return list.map(({ title }) => ({
  //     value: title,
  //     label: title,
  //   }));
  // }, [listLabels]);

  // const clientOptions = useMemo(() => {
  //   if (!listClients) return [];

  //   const { data: { clients = [] } = {} } = listClients;
  //   return clients.map(({ id, name }) => ({
  //     value: id,
  //     label: name,
  //   }));
  // }, [listClients]);

  // const jobOptions = useMemo(() => {
  //   if (!listJobs) return [];

  //   const { data: { listJob = [] } = {} } = listJobs;
  //   return listJob.map(({ id, title }) => ({
  //     value: id,
  //     label: title,
  //   }));
  // }, [listJobs]);

  // const memberOptions = useMemo(() => {
  //   if (!listMembers) return [];

  //   const { data: { list = [] } = {} } = listMembers;
  //   return list.map(({ id, name }) => ({
  //     value: id,
  //     label: name,
  //   }));
  // }, [listMembers]);

  // const activeJobOptions = useMemo(() => {
  //   if (!listActiveJobs) return [];

  //   const { data: { arrJob = [] } = {} } = listActiveJobs;
  //   return arrJob.map((job) => ({
  //     label: job.title,
  //     value: job.id,
  //     location: job.Location ? job.Location.name : "",
  //     clientName: job.Client ? job.Client.name : "",
  //   }));
  // }, [listActiveJobs]);

  // const handleOpenAddTask = useCallback((laneId) => {
  //   setOpen((prev) => !prev);
  //   setLaneId(laneId);
  // }, []);

  // const handleOpenAddTaskNoColumn = useCallback(() => {
  //   setOpen((prev) => !prev);
  //   setIsAddTaskNoColumn(true);
  // }, []);

  // const handleCloseAddTask = useCallback(() => {
  //   setOpen(false);
  //   setLaneId("");
  //   setIsAddTaskNoColumn(false);
  // }, []);

  const handleOpenUpdateTask = useCallback(() => {
    // setOpen((prev) => !prev);
    // setIsAddTaskNoColumn(true);
    // setCard(card);
  }, []);

  // const handleCloseUpdateTask = useCallback(() => {
  //   setOpen(false);
  //   setIsAddTaskNoColumn(false);
  //   setCard(null);
  // }, []);

  useEffect(() => {
    dispatch(getBoard());
  }, [dispatch]);

  useEffect(() => {
    async function getCard(cardId) {
      try {
        const { data: cardDetail } = await getCardDetail(cardId);
        if (cardDetail.data.success) {
          handleOpenUpdateTask(cardDetail.data.card);
        } else {
          throw new Error("Card not found!");
        }
      } catch (error) {
        enqueueSnackbar(error.message, { variant: "error" });
      }
    }
    if (query && query.cardId) {
      getCard(query.cardId);
    }
  }, [query, getCardDetail, handleOpenUpdateTask, enqueueSnackbar]);

  // const onDragEnd = (result) => {
  //   // Reorder card
  //   const { destination, source, draggableId } = result;

  //   if (!destination) return;

  //   if (
  //     destination.droppableId === source.droppableId &&
  //     destination.index === source.index
  //   )
  //     return;

  //   const start = board.columns[source.droppableId];
  //   const finish = board.columns[destination.droppableId];
  //   const originalColumns = { ...board.columns };

  //   // Same column
  //   if (start.id === finish.id) {
  //     const destCandidateJob =
  //       start.CandidateJobs.find((value) => draggableId === value.id) || {};
  //     const updatedCandidateJobs = [...start.CandidateJobs];

  //     updatedCandidateJobs.splice(source.index, 1);
  //     updatedCandidateJobs.splice(destination.index, 0, destCandidateJob);

  //     const updatedColumn = {
  //       ...start,
  //       CandidateJobs: updatedCandidateJobs,
  //     };
  //     const newColumns = {
  //       ...board.columns,
  //       [updatedColumn.id]: updatedColumn,
  //     };

  //     dispatch(
  //       updateCardByDestColumn({
  //         columnId: updatedColumn.id,
  //         cardId: draggableId,
  //         originalColumns,
  //         newColumns,
  //       })
  //     );
  //     return;
  //   }

  //   // Difference column
  //   const startCandidateJobs = [...start.CandidateJobs];
  //   const destCandidateJob =
  //     startCandidateJobs.find((value) => draggableId === value.id) || {};
  //   startCandidateJobs.splice(source.index, 1);
  //   const updatedStart = {
  //     ...start,
  //     CandidateJobs: startCandidateJobs,
  //   };

  //   const finishCandidateJobs = [...finish.CandidateJobs];
  //   finishCandidateJobs.splice(destination.index, 0, destCandidateJob);
  //   const updatedFinish = {
  //     ...finish,
  //     CandidateJobs: finishCandidateJobs,
  //   };

  //   const newColumns = {
  //     ...board.columns,
  //     [updatedStart.id]: updatedStart,
  //     [updatedFinish.id]: updatedFinish,
  //   };

  //   dispatch(
  //     updateCardByDestColumn({
  //       columnId: updatedFinish.id,
  //       cardId: draggableId,
  //       originalColumns,
  //       newColumns,
  //     })
  //   );
  // };

  // const handleOpenSearchForm = useCallback(() => {
  //   setOpenSearchForm((prev) => !prev);
  // }, []);

  // const handleCloseSearchForm = useCallback(() => {
  //   setOpenSearchForm(false);
  // }, []);

  const itemData = [
    {
      img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
      title: "Breakfast",
    },
    {
      img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
      title: "Burger",
    },
  ];
  const itemTest = [
    {
      img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
      title: "Camera",
    },
    {
      img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
      title: "Coffee",
    },
    {
      img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
      title: "Hats",
    },
    {
      img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
      title: "Honey",
    },
  ];
  const itemTestImage = [
    {
      img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
      title: "Basketball",
    },
    {
      img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
      title: "Fern",
    },
    {
      img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
      title: "Mushrooms",
    },
    {
      img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
      title: "Tomato basil",
    },
  ];

  return (
    <Container maxWidth={themeStretch ? false : "xl"}>
      {/* <Container maxWidth={themeStretch ? false : "xl"}>
        <ClickAwayListener
          onClickAway={handleCloseSearchForm}
          mouseEvent="onMouseDown"
          touchEvent="onTouchStart"
        >
          <div>
            <SearchIconStyle ownerState={{ isCollapse }}>
              <Tooltip
                title={translate("Search")}
                sx={{ visibility: !isOpenSearchForm ? "visible" : "hidden" }}
              >
                <IconButtonAnimate onClick={handleOpenSearchForm}>
                  <Iconify icon={"eva:search-fill"} width={20} height={20} />
                </IconButtonAnimate>
              </Tooltip>
            </SearchIconStyle>

            <Slide
              direction="down"
              in={isOpenSearchForm}
              mountOnEnter
              unmountOnExit
            >
              <SearchbarStyle ownerState={{ isCollapse }}>
                <KanbanTableToolbar
                  onOpenUpdateTask={handleOpenUpdateTask}
                  labelOptions={labelOptions}
                  jobOptions={jobOptions}
                  clientOptions={clientOptions}
                  memberOptions={memberOptions}
                  onCloseSearchForm={handleCloseSearchForm}
                />
              </SearchbarStyle>
            </Slide>
          </div>
        </ClickAwayListener>

        <KanbanTaskAdd
          open={open}
          isAddTaskNoColumn={isAddTaskNoColumn}
          card={card}
          laneId={laneId}
          hasAddPermission={hasAddPermission}
          activeJobOptions={activeJobOptions}
          onClose={handleCloseAddTask}
          onCloseUpdate={handleCloseUpdateTask}
        />

        {isLoading && !board.columnOrder.length ? (
          <SkeletonKanbanColumn />
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <Stack direction="row" spacing={2} sx={{ overflowY: "hidden" }}>
              {board.columnOrder.map((columnId) => (
                <KanbanColumn
                  key={columnId}
                  column={board.columns[columnId]}
                  hasAddPermission={hasAddPermission}
                  onOpenAddTask={handleOpenAddTask}
                  onOpenUpdateTask={handleOpenUpdateTask}
                />
              ))}
            </Stack>
          </DragDropContext>
        )}

        <Box sx={{ position: "fixed", right: "50px", bottom: "50px" }}>
          <Button
            size="large"
            variant="contained"
            onClick={handleOpenAddTaskNoColumn}
            sx={{ fontSize: 12, padding: "32px 16px", borderRadius: "50%" }}
          >
            <Iconify icon={"eva:plus-fill"} width={24} height={24} />
          </Button>
        </Box>
      </Container> */}

      <ConnectCard
        accounts={itemData}
        color={"#FB8906"}
        title="KẾT NỐI WEBSITE TUYỂN DỤNG NỘI BỘ"
      />
      <ConnectCard
        accounts={itemTest}
        color={"#43A047"}
        title="KẾT NỐI WEBSITE TUYỂN DỤNG BÊN NGOÀI"
      />
      <ConnectCard
        accounts={itemTestImage}
        color={"#1E88E5"}
        title="KẾT NỐI MẠNG XÃ HỘI"
      />
    </Container>
  );
}
