// utils
import { ButtonDS, TextAreaDS } from "@/components/DesignSystem";
import { View } from "@/components/FlexStyled";
// componentsf
import Page from "@/components/Page";
import SvgIcon from "@/components/SvgIcon";
import { FormProvider } from "@/components/hook-form";
// config
import { PERMISSION_PAGES } from "@/config";
// layouts
import Layout from "@/layouts";
import {
  ApplicantItem,
  useGetAllFilterApplicantQuery,
  useGetRecruitmentPipelineStatesByRecruitmentQuery,
  useUpdateApplicantRecruitmentToNextStateMutation,
} from "@/sections/applicant";
import { Column } from "@/sections/kanban";
import { useGetRecruitmentByIdQuery } from "@/sections/recruitment";
import RecruitmentPreviewItem from "@/sections/recruitment/preview/RecruitmentPreviewItem";
import { yupResolver } from "@hookform/resolvers/yup";
import { Container, Grid, Modal, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

Recruitment.getLayout = function getLayout(pageProps, page) {
  return (
    <Layout permissions={PERMISSION_PAGES.detailRecruitment} {...pageProps}>
      {page}
    </Layout>
  );
};

export default function Recruitment() {
  const Schema = Yup.object().shape({
    note: Yup.string().required("Chưa nhập lý do"),
  });

  const methods = useForm({
    resolver: yupResolver(Schema),
  });

  const { handleSubmit } = methods;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const [applicantId, setApplicantId] = useState();
  const [recruitmentId, setRecruitmentId] = useState();
  const [recruitmentPipelineStateId, setRecruitmentPipelineStateId] =
    useState();
  const [resultNew, setResultNew] = useState();
  const [pipelineStateResultType, setPipelineStateResultType] = useState(0);

  const handleOk = handleSubmit(async (e) => {
    let body = {
      applicantId: applicantId,
      recruitmentId: recruitmentId,
      recruitmentPipelineStateId: recruitmentPipelineStateId,
      pipelineStateResultType: pipelineStateResultType,
      note: e?.note,
    };

    await ChangeToNextState(body);
    const { source, destination } = resultNew;
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, {
      ...removed,
      pipelineStateResultType: pipelineStateResultType,
    });
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });

    setIsModalOpen(false);
  });

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const router = useRouter();
  const { query, isReady, asPath } = router;
  const { slug, PageIndex = 1, PageSize = 10, ...rest } = query;
  const RecruitmentId = slug;
  const { data: RecruitmentData } = useGetRecruitmentByIdQuery({
    Id: RecruitmentId,
  });
  const { data: ColumnData } =
    useGetRecruitmentPipelineStatesByRecruitmentQuery(RecruitmentId);
  const [ChangeToNextState] =
    useUpdateApplicantRecruitmentToNextStateMutation();

  const { data: Data, isLoading } = useGetAllFilterApplicantQuery(
    { ...rest, PageIndex, PageSize, recruitmentIds: [slug] },
    {
      skip: !isReady,
    }
  );

  const isSearch = (() => {
    for (const key in rest) if (rest[key]) return true;

    return false;
  })();

  useEffect(() => {
    if (isSearch) setViewMode(2);
  }, [rest]);

  const onDragEnd = async (result, columns, setColumns) => {
    setResultNew(result);
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
      let applicantId;
      sourceColumn.items.map((item) => {
        if (item.id == result.draggableId) applicantId = item.applicantId;
      });
      // call api

      if (destColumn.pipelineStateType == 3) {
        setPipelineStateResultType(0);
        setApplicantId(applicantId);
        setRecruitmentId(RecruitmentId);
        setRecruitmentPipelineStateId(destColumn.id);
        showModal();
      } else {
        // disable offer
        if (destColumn.pipelineStateType == 4) {
          /* empty */
        } else {
          //
          let body = {
            applicantId: applicantId,
            recruitmentId: RecruitmentId,
            recruitmentPipelineStateId: destColumn.id,
          };
          await ChangeToNextState(body);
          setColumns({
            ...columns,
            [source.droppableId]: {
              ...sourceColumn,
              items: sourceItems,
            },
            [destination.droppableId]: {
              ...destColumn,
              items: destItems,
            },
          });
        }
      }
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
          items: copiedItems,
        },
      });
    }
  };

  const [columns, setColumns] = useState(ColumnData);
  useEffect(() => {
    setColumns(ColumnData);
  }, [ColumnData]);

  const windowWidth = useRef(window.innerWidth);
  const windowHeight = useRef(window.innerHeight);
  const LIST_ACTION = [
    { id: 0, name: "Đạt", color: "#4CAF50" },
    { id: 1, name: "Cân nhắc", color: "#FF9800" },
    { id: 2, name: "Loại", color: "#F44336" },
  ];

  const [viewMode, setViewMode] = useState(1);
  const [tab, setTab] = useState(1);
  const onChangViewMode = (value) => {
    if (value === 1 && isSearch) window.location.href = asPath.split("?")[0];
    else setViewMode(value);
  };

  const onChangeTab = (value) => {
    setTab(value);
  };

  return (
    <Page title={"Chi tiết tin"}>
      <RecruitmentPreviewItem
        RecruitmentData={RecruitmentData}
        viewModeDefault={viewMode}
        tabDefault={tab}
        onChangeViewMode={onChangViewMode}
        onChangeTab={onChangeTab}
      >
        <ApplicantItem
          hideTable
          headerProps={{
            headerProps: {
              style: { background: "transparent", boxShadow: "none" },
            },
            contentProps: {
              style: {
                padding: 0,
              },
            },
            inputProps: {
              placeholder: "Tìm kiếm theo họ tên, email, SĐT ứng viên...",
            },
          }}
        />
      </RecruitmentPreviewItem>
      {/* ứng viên kanban */}
      {tab == 1 && viewMode == 1 && (
        <div
          style={{
            width: windowWidth,
            display: "flex",
            justifyContent: "left",
            height: windowHeight.current,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url('../assets/icons/candidate/bgImage.png')`,
          }}
        >
          <Container maxWidth="xl">
            <div
              style={{
                overflowY: "auto",
                width: windowWidth,
                display: "flex",
                justifyContent: "left",
              }}
            >
              <DragDropContext
                onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
              >
                {columns &&
                  Object.entries(columns).map(([columnId, column], index) => {
                    if (column.pipelineStateType != 4)
                      return (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            borderRadius: "8px",
                            minHeight: windowHeight.current,
                            maxHeight: windowHeight.current,
                          }}
                          key={columnId}
                        >
                          <div>
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

                <Modal
                  open={isModalOpen}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onBackdropClick={() => handleCancel()}
                >
                  <FormProvider methods={methods}>
                    <View width={600} borderRadius={8} bgColor={"#fff"}>
                      <View pt={20} pb={36} ph={24}>
                        {/* button close */}
                        <View asEnd mr={12} onPress={() => handleCancel()}>
                          <SvgIcon>
                            {
                              '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.0001 8.82178L14.1251 4.69678L15.3034 5.87511L11.1784 10.0001L15.3034 14.1251L14.1251 15.3034L10.0001 11.1784L5.87511 15.3034L4.69678 14.1251L8.82178 10.0001L4.69678 5.87511L5.87511 4.69678L10.0001 8.82178Z" fill="#455570"/></svg>'
                            }
                          </SvgIcon>
                        </View>

                        {/* icon */}
                        <View asCenter mt={25}>
                          <SvgIcon>
                            {
                              '<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M40.1255 30.125L52.5005 42.5L40.1255 54.875L36.5905 51.34L42.9305 44.9975L10.0005 45V40H42.9305L36.5905 33.66L40.1255 30.125ZM19.8755 5.125L23.4105 8.66L17.0705 15H50.0005V20H17.0705L23.4105 26.34L19.8755 29.875L7.50049 17.5L19.8755 5.125Z" fill="#455570"/></svg>'
                            }
                          </SvgIcon>
                        </View>

                        {/* title */}
                        <Typography
                          mt={"12px"}
                          fontSize={16}
                          fontWeight={"600"}
                          color="#455570"
                          textAlign={"center"}
                        >
                          {"Chuyển ứng viên sang bước kết quả"}
                        </Typography>

                        {/* des */}
                        <Typography
                          mt={"8px"}
                          fontSize={14}
                          color="#455570"
                          textAlign={"center"}
                        >
                          {`Lưu ý: Bạn chỉ có thể gửi Offer khi ứng viên ở trạng thái `}
                          <strong>{`Kết quả - Đạt`}</strong>
                        </Typography>

                        <View
                          hidden
                          flexRow
                          mt={24}
                          borderRadius={6}
                          borderWidth={1}
                          borderColor={"#D0D4DB"}
                        >
                          {LIST_ACTION.map((item, index) => {
                            const isActive = item.id == pipelineStateResultType;
                            return (
                              <View
                                flex1
                                pv={16}
                                key={item.id}
                                bgColor={isActive ? item.color : undefined}
                                onPress={() =>
                                  setPipelineStateResultType(index)
                                }
                              >
                                <Typography
                                  fontSize={14}
                                  fontWeight={"600"}
                                  color={isActive ? "#FDFDFD" : "#455570"}
                                  textAlign={"center"}
                                >
                                  {item.name}
                                </Typography>
                              </View>
                            );
                          })}
                        </View>

                        <Typography
                          fontWeight={"600"}
                          color="#5C6A82"
                          mt="24px"
                          mb="8px"
                        >
                          {"Ghi chú"}
                        </Typography>
                        <TextAreaDS
                          maxLength={150}
                          placeholder="Nhập nội dung ghi chú..."
                          name="note"
                        />
                      </View>

                      <Grid
                        container
                        padding="16px 24px"
                        borderTop="1px solid #E7E9ED"
                        justifyContent="end"
                        background="#FDFDFD"
                      >
                        <ButtonDS
                          tittle={"Hủy"}
                          type="button"
                          sx={{
                            color: "#455570",
                            backgroundColor: "#fff",
                            boxShadow: "none",
                            ":hover": {
                              backgroundColor: "#fff",
                              textDecoration: "underline",
                            },
                            fontSize: "14px",
                            marginRight: "8px",
                          }}
                          onClick={() => handleCancel()}
                        />

                        <ButtonDS
                          tittle={"Chuyển"}
                          type="button"
                          sx={{
                            textTransform: "unset",
                            color: "#fff",
                            boxShadow: "none",
                            fontSize: "14px",
                            padding: "6px 12px",
                          }}
                          loading={true}
                          onClick={handleOk}
                        />
                      </Grid>
                    </View>
                  </FormProvider>
                </Modal>
              </DragDropContext>
            </div>
          </Container>
        </div>
      )}

      {/* ứng viên list */}
      {tab == 1 && viewMode == 2 && (
        <View>
          <ApplicantItem
            Data={Data}
            isLoading={isLoading}
            PageSize={query.PageSize}
            PageIndex={query.PageIndex}
            headerProps={{
              display: "none",
            }}
          />
        </View>
      )}

      {/* lịch phỏng vấn */}
      {tab == 2 && <View></View>}
    </Page>
  );
}
