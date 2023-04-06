import React, { useEffect, useState, useRef } from 'react'
import RecruitmentPreviewItem from "@/sections/recruitment/preview/RecruitmentPreviewItem";
// componentsf
import Page from '@/components/Page'
// config
import { PAGES } from '@/config'
// layouts
import Layout from '@/layouts'
import { DragDropContext } from "react-beautiful-dnd";
import { Column } from '@/sections/kanban';
import { useGetRecruitmentByIdQuery } from "@/sections/recruitment";
// utils
import { getRolesByPage } from '@/utils/role'
import {
  useGetRecruitmentPipelineStatesByRecruitmentQuery,
  useUpdateApplicantRecruitmentToNextStateMutation
} from "@/sections/applicant";
import { ButtonDS, TextAreaDS } from "@/components/DesignSystem";
import { useRouter } from "next/router";
import { Modal } from 'antd';
import Iconify from "@/components/Iconify";
import { FormProvider } from "@/components/hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import {

  Container,
  Typography,

} from '@mui/material'
Recruitment.getLayout = function getLayout({ roles = [] }, page) {
  return <Layout roles={roles}>{page}</Layout>
}
export async function getServerSideProps() {
  return {
    props: {
      roles: getRolesByPage(PAGES.Recruitment),
    },
  }
}
import Box from '@mui/material/Box';



export default function Recruitment() {
  const Schema = Yup.object().shape({
    note: Yup.string().required("Chưa nhập lý do loại ứng viên"),
  });
  const methods = useForm({
    resolver: yupResolver(Schema),
  });
  const {
    handleSubmit,
  } = methods;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const [applicantId, setApplicantId] = useState();
  const [recruitmentId, setRecruitmentId] = useState();
  const [recruitmentPipelineStateId, setRecruitmentPipelineStateId] = useState();
  const [resultNew, setResultNew] = useState();
  const [pipelineStateResultType, setPipelineStateResultType] = useState();

  const handleOk = handleSubmit(async (e) => {
    let body = {
      "applicantId": applicantId,
      "recruitmentId": recruitmentId,
      "recruitmentPipelineStateId": recruitmentPipelineStateId,
      "pipelineStateResultType": pipelineStateResultType,
      "note": e?.note
    }

    await ChangeToNextState(body)
    const { source, destination } = resultNew;
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

    setIsModalOpen(false);
  });

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const router = useRouter();
  const RecruitmentId = router.query.slug;
  const { data: RecruitmentData } = useGetRecruitmentByIdQuery({ Id: RecruitmentId })
  const { data: ColumnData } = useGetRecruitmentPipelineStatesByRecruitmentQuery(RecruitmentId);
  const [ChangeToNextState] = useUpdateApplicantRecruitmentToNextStateMutation();
  const onDragEnd = async (result, columns, setColumns) => {
    setResultNew(result)
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
        if (item.id == result.draggableId)
          applicantId = item.applicantId

      })
      // call api

      if (destColumn.pipelineStateType == 3) {
        setApplicantId(applicantId)
        setRecruitmentId(RecruitmentId)
        setRecruitmentPipelineStateId(destColumn.id)
        showModal()
      }
      else {

        // disable offer
        if (destColumn.pipelineStateType == 4) { /* empty */ }
        else {
          //
          let body = {
            "applicantId": applicantId,
            "recruitmentId": RecruitmentId,
            "recruitmentPipelineStateId": destColumn.id,
          }
          await ChangeToNextState(body)
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
          items: copiedItems
        }
      });
    }
  };

  const [columns, setColumns] = useState(ColumnData);
  useEffect(() => {

    setColumns(ColumnData)
  }, [ColumnData])
  const windowWidth = useRef(window.innerWidth);
  const windowHeight = useRef(window.innerHeight);

  return (
    <Page title={"Chi tiết tin"}>

      <RecruitmentPreviewItem RecruitmentData={RecruitmentData} />
      <div style={{ overflow: "scroll", width: windowWidth, display: "flex", justifyContent: "center", height: windowHeight, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundImage: `url('../assets/icons/candidate/bgImage.png')` }}>
        <Container maxWidth='xl'>
          <div style={{ overflow: "auto", width: windowWidth, display: "flex", justifyContent: "center", height: windowHeight }}>
            <DragDropContext
              onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
            >
              {columns && Object.entries(columns).map(([columnId, column], index) => {
                if (column.pipelineStateType != 4)
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        borderRadius: "8px"
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

              <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    p: 1,
                    m: 1,
                    borderRadius: 1,
                  }}
                >
                  <Iconify icon={"fluent-mdl2:circle-half-full"} width={20} height={20} color="#D32F2F" />
                  <Typography fontSize="12px">{"Chuyển ứng viên sang bước kết quả"}</Typography>
                  <Typography fontSize="12px">{"Lưu ý: Bạn chỉ có thể gửi Offer khi ứng viên ở trạng thái Kết quả - Đạt"}</Typography>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                      p: 1,
                      m: 1,
                      bgcolor: "background.paper",
                      borderRadius: 1,
                    }}
                  >
                    <ButtonDS
                      onClick={() => { setPipelineStateResultType(0) }}
                      tittle={"Đạt"}
                      type="submit"
                      sx={{
                        borderWidth: '1px',
                        color: "#455570",
                        backgroundColor: "#FDFDFD",
                        boxShadow: "none",
                        ":hover": {
                          backgroundColor: "#4CAF50",
                        },
                        marginRight: "2px",
                        fontSize: "12px",
                        padding: "6px 12px",
                      }}
                    />
                    <ButtonDS
                      onClick={() => { setPipelineStateResultType(1) }}
                      tittle={"Cân Nhắc"}
                      type="submit"
                      sx={{
                        borderWidth: '1px',
                        color: "#455570",
                        backgroundColor: "#FDFDFD",
                        boxShadow: "none",
                        ":hover": {
                          backgroundColor: "#FF9800",
                        },
                        marginRight: "2px",
                        fontSize: "12px",
                        padding: "6px 12px",
                        textTransform: "none",
                      }}
                    />
                    <ButtonDS
                      onClick={() => { setPipelineStateResultType(2) }}
                      tittle={"Loại"}
                      type="submit"
                      mr={2}
                      sx={{
                        borderWidth: '1px',
                        color: "#455570",
                        backgroundColor: "#FDFDFD",
                        boxShadow: "none",
                        ":hover": {
                          backgroundColor: "#F44336",
                        },
                        marginLeft: "2px",
                        fontSize: "12px",
                        padding: "6px 12px",
                        textTransform: "none",
                      }}
                    />
                  </Box>
                  <FormProvider methods={methods}>
                    <TextAreaDS
                      maxLength={150}
                      placeholder="Nhập lý do..."
                      name="note"
                    />
                  </FormProvider>
                </Box>
              </Modal>

            </DragDropContext>
          </div>
        </Container>
      </div>
    </Page>
  )
}
