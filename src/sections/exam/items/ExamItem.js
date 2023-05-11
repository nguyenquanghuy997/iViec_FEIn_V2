import DynamicColumnsTable from "@/components/BaseComponents/table";
import { View } from "@/components/FlexStyled";
import {
  useGetAllExaminationQuery, 
  useGetListColumnExamsQuery, 
  useUpdateListColumnExamsMutation,
} from "@/sections/exam/ExamSlice"
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import TextMaxLine from "@/components/TextMaxLine";
import { PATH_DASHBOARD } from "@/routes/paths";
import { Box, Button, ButtonGroup, ClickAwayListener, MenuItem, MenuList, Typography } from "@mui/material";
import Iconify from "@/components/Iconify";
import { LightTooltip } from "@/components/DesignSystem/TooltipHtml";
import { DownloadLineIcon, ImportLinkIcon, TeamLineIcon } from "@/assets/ActionIcon";
import Divider from "@mui/material/Divider";
import ExamBottomNav from "@/sections/exam/items/ExamBottomNav";
import { QuestionFormModal } from "@/sections/exam/components/QuestionFormModal";
import ExamFormModal from "../components/ExamFormModal";
import ExamChooseTypeModal from "../components/ExamChooseTypeModal";
import { TBL_FILTER_TYPE } from "@/config";
import { LIST_EXAM_TYPE, LIST_STATUS } from "@/utils/formatString";
import { API_GET_ORGANIZATION_USERS } from "@/routes/api";
import { ExamType, Status } from "@/utils/enum";
import { fDate } from "@/utils/formatTime";

export const ExamItem = ({
  hideTable,
  headerProps,
}) => {
  const router = useRouter();

  const listArrayOtherIdsFilter = ["yearsOfExperience", "sexs", "maritalStatuses", "recruitmentPipelineStates"]
  const [showFormQuestion, setShowFormQuestion] = useState(false);
  const { query = { PageIndex: 1, PageSize: 10 }, isReady } = router;
  let reqData = {};
  for (let f in query) {
    let val = query[f];
    if ((f.includes('Ids') || listArrayOtherIdsFilter.includes(f)) && !Array.isArray(val)) {
      val = [val];
    }
    reqData[f] = val;
  }

  const { data: Data, isLoading } = useGetAllExaminationQuery(reqData, {
    skip: !isReady,
  });

  const columns = useMemo(() => {
    return [
      {
        dataIndex: "id",
        title: "STT",
        key: "index",
        align: "center",
        fixed: 'left',
        render: (item, record, index, page, paginationSize) => (
          <>{(page - 1) * paginationSize + index + 1}</>
        ),
        width: "60px"
      },
      {
        dataIndex: "name",
        title: "Đề thi",
        width: "150px",
        render: (item, record) => (
          <TextMaxLine
            sx={{width: 360, fontWeight: 500, fontSize: 14, cursor: 'pointer'}}
            onClick={() => router.push({
              pathname: PATH_DASHBOARD.applicant.view(record?.applicantId), query: {
                correlationId: record?.correlationId,
                organizationId: record?.organizationId,
                recruitmentId: record?.recruitmentId,
                applicantId: record?.applicantId,
              }
            }, undefined, {shallow: true})}
          >
            {item}
          </TextMaxLine>
        ),
      },
      {
        dataIndex: "description",
        title: "Mô tả",
        width: "200px"
      },
      {
        dataIndex: "type",
        title: "Kiểu đề thi",
        width: "220px",
        render: (item) => (

          ExamType(item)),
        filters: {
          type: TBL_FILTER_TYPE.SELECT,
          name: 'type',
          options: LIST_EXAM_TYPE.map(item => ({value: item.value, label: item.name})),
          placeholder: "Tất cả"
        },
      },
      {
        dataIndex: "createdTime",
        title: "Ngày tạo",
        width: "214px",
        render: (date, record) => record?.createdTime ? fDate(record?.createdTime) : '',
        filters: {
          type: TBL_FILTER_TYPE.RANGE_DATE,
          name: ['createdTimeFrom', 'createdTimeTo'],
          placeholder: 'Chọn ngày',
        },
      },
      {
        dataIndex: "creatorId",
        title: "Người tạo",
        width: "300px",
        render: (item, record) => (
          <div style={{display: "flex", alignItems: "center"}}>
            {/*<AvatarDS*/}
            {/*  sx={{*/}
            {/*    height: "20px",*/}
            {/*    width: "20px",*/}
            {/*    borderRadius: "100px",*/}
            {/*    fontSize: "12px",*/}
            {/*  }}*/}
            {/*  name={record.creatorEmail}*/}
            {/*></AvatarDS>*/}
            <span fontSize="14px" fontWeight="600" color="#172B4D">
              {record.creatorEmail}
            </span>
          </div>
        ),
        filters: {
          type: TBL_FILTER_TYPE.SELECT_CHECKBOX,
          name: "creatorEmail",
          placeholder: "Chọn 1 hoặc nhiều người",
          remoteUrl: API_GET_ORGANIZATION_USERS,
          showAvatar: true,
        },
      },
      {
        dataIndex: "lastUpdatedTime",
        title: "Ngày chỉnh sửa",
        render: (date, record) => record?.createdTime ? fDate(record?.createdTime) : '',
        width: "200px"
      },
      {
        dataIndex: "updaterId",
        title: "Người chỉnh sửa",
        width: "200px",
        render: (item, record) => (
          <div style={{display: "flex", alignItems: "center"}}>
            {/*<AvatarDS*/}
            {/*  sx={{*/}
            {/*    height: "20px",*/}
            {/*    width: "20px",*/}
            {/*    borderRadius: "100px",*/}
            {/*    fontSize: "12px",*/}
            {/*  }}*/}
            {/*  name={record.updaterEmail}*/}
            {/*></AvatarDS>*/}
            <span fontSize="14px" fontWeight="600" color="#172B4D">
              {record.updaterEmail}
            </span>
          </div>
        ),
        filters: {
          type: TBL_FILTER_TYPE.SELECT_CHECKBOX,
          name: "updaterName",
          placeholder: "Chọn 1 hoặc nhiều người",
          remoteUrl: API_GET_ORGANIZATION_USERS,
          showAvatar: true,
        },
      },
      {
        dataIndex: "recruitmentCount",
        title: "Số tin áp dụng",
        width: "200px",
      },
      {
        dataIndex: "numOfTotalQuestion",
        title: "Tổng số câu hỏi",
        width: "200px",
        filters: {
          type: TBL_FILTER_TYPE.RANGE_QUESTION,
          name: ['totalQuestionFrom', 'totalQuestionTo'],
          placeholder: 'Nhập số câu hỏi',
        },
      },
      {
        dataIndex: "numOfMultipleChoiceQuestion",
        title: "Trắc nghiệm",
        width: "220px"
      },
      {
        dataIndex: "numOfEssayQuestion",
        title: "Tự luận",
        width: "200px"
      },
      {
        title: "Điểm tối đa",
        dataIndex: "maximumPoint",
        width: "120px",
        filters: {
          type: TBL_FILTER_TYPE.RANGE_POINT,
          name: ["maximumPointForm", "maximumPointTo"],
          placeholder: "Nhập số điểm",
        },
      },
      {
        dataIndex: "standardPoint",
        title: "Điểm sàn",
        width: "200px",
        filters: {
          type: TBL_FILTER_TYPE.RANGE_POINT,
          name: ["standardPointFrom", "standardPointTo"],
          placeholder: "Nhập số điểm",
        },
      },
      {
        dataIndex: "isActive",
        title: "Trạng thái",
        width: "200px",
        render: (item) => (
          <span style={{color: item ? "#388E3C" : "#455570"}}>
            {Status(item)}
          </span>
        ),
        filters: {
          type: TBL_FILTER_TYPE.SELECT,
          name: 'isActive',
          options: LIST_STATUS.map(item => ({value: item.id, label: item.name})),
          placeholder: "Tất cả"
        },
      }
    ];
  }, [query.PageIndex, query.PageSize]);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [itemSelected, setItemSelected] = useState([]);
  const [showForm, setShowForm] = useState(false)
  const [showChooseType, setShowChooseType] = useState(false)
  const [dataForm, setDataForm] = useState({})
  const [, setIsOpenBottomNav] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setIsOpenBottomNav(newOpen);
    setSelectedRowKeys([]);
    event.currentTarget.getElementsByClassName(
      "css-6pqpl8"
    )[0].style.paddingBottom = null;
  };
  const [openGroup, setOpenGroup] = useState(false);

  const handleCloseGroup = () => {
    setOpenGroup(false);
  };

  const handleOpenGroup = () => {
    setOpenGroup(true);
  };

  const handleSubmitForm = (data) => {
    setDataForm(data)
    setShowForm(false);
    setShowChooseType(true);
  }

  const handleSubmitCreate = (data) => {
    let url = '/settings/exam/exam-business/create'
    if (data.type === 2) {
      url = '/settings/exam/exam-business/create-random'
    }
    router.push({
      pathname: url,
      query: data
    });
  }

  const onCloseExamForm = () => {
    setShowForm(false);
  }

  const onCloseExamChooseTypeForm = () => {
    setShowChooseType(false);
  }

  const renderButton = () => {
    return <Box flexDirection="row" alignItems="center">
      {/*<ButtonAddStyle*/}
      {/*    className="button-add"*/}
      {/*    startIcon={<Iconify icon="material-symbols:add" />}*/}
      {/*    // onClick={pressAddQuestionGallery}*/}
      {/*>*/}
      {/*    Thêm nhóm câu hỏi*/}
      {/*</ButtonAddStyle>*/}

      <ButtonGroup
        variant="contained"
        aria-label="split button"
        sx={{
          marginLeft: '8px',
          boxShadow: "unset",
          "& .MuiButtonGroup-grouped:not(:last-of-type)": {
            borderColor: "white",
          },
          "& .MuiButtonGroup-grouped:hover": {
            opacity: 0.8,
          },
        }}
      >
        <Button
          style={{
            background: "#1976D2",
            padding: "6px 12px",
            fontWeight: 600,
            fontSize: ' .875rem',
            borderRadius: '6px 0px 0px 6px',
            textTransform: 'none'
          }}
          onClick={() => setShowFormQuestion(true)}
        >
          <Iconify
            icon={"material-symbols:add"}
            width={20}
            height={20}
            color="#fff"
            mr={1}
          />
          Thêm câu hỏi
        </Button>
        <LightTooltip
          placement="bottom-end"
          onClose={handleCloseGroup}
          disableFocusListener
          disableHoverList
          ener
          disableTouchListener
          open={openGroup}
          title={
            <ClickAwayListener
              onClickAway={handleCloseGroup}
            >
              <MenuList
                autoFocusItem
                divider={true}
                disableGutters={true}
              >
                <MenuItem>
                  <TeamLineIcon sx={{ mr: "12px" }} />
                  <Typography ml={"12px"} variant={"textSize13600"}>
                    Lấy từ kho iVIEC
                  </Typography>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <DownloadLineIcon />
                  <Typography ml={"12px"} variant={"textSize13600"}>
                    Tải mẫu Excel
                  </Typography>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ImportLinkIcon sx={{ mr: "12px" }} />
                  <Typography ml={"12px"} variant={"textSize13600"}>
                    Import Excel
                  </Typography>
                </MenuItem>
              </MenuList>
            </ClickAwayListener>
          }
        >
          <Button
            size="small"
            aria-haspopup="menu"
            onClick={handleOpenGroup}
            style={{
              background: "#1976D2",
              padding: "6px 12px",
              borderRadius: '0px 6px 6px 0px',
            }}
          >
            <Iconify
              icon={"material-symbols:arrow-drop-down"}
              width={20}
              height={20}
              color="#fff"
            />
          </Button>
        </LightTooltip>
      </ButtonGroup>
    </Box>
  }

  return (
    <View style={{ margin: '-32px' }}>
      <View>
        <DynamicColumnsTable
          columns={columns}
          source={Data}
          loading={isLoading}
          settingName={"DANH SÁCH ĐỀ THI"}
          nodata="Hiện chưa có đề thi nào"
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
          itemSelected={itemSelected}
          setItemSelected={setItemSelected}
          useGetColumnsFunc={useGetListColumnExamsQuery}
          useUpdateColumnsFunc={useUpdateListColumnExamsMutation}
          // searchInside={false}
          hideTable={hideTable}
          searchTextHint='Tìm kiếm theo họ tên, email, SĐT ứng viên...'
          createText={"Thêm đề thi"}
          onClickCreate={() => {
            setShowForm(true);
            setItemSelected([]);
            setSelectedRowKeys([]);
          }}
          headerProps={

            {
              ...headerProps,
              actions: renderButton()
            }
          }
        />
        <QuestionFormModal
          data={itemSelected[0]}
          show={showFormQuestion}
          onClose={() => setShowFormQuestion(false)}
        />

        <ExamBottomNav
          open={selectedRowKeys?.length > 0}
          onClose={toggleDrawer(false)}
          selectedList={selectedRowKeys || []}
          onOpenForm={toggleDrawer(true)}
          setselectedList={setSelectedRowKeys}
          itemSelected={itemSelected}
          setItemSelected={setItemSelected}
        />

        <ExamFormModal show={showForm} onClose={onCloseExamForm} onSubmit={handleSubmitForm} />
        <ExamChooseTypeModal data={dataForm} show={showChooseType} onClose={onCloseExamChooseTypeForm} onSubmit={handleSubmitCreate} />
      </View>
    </View>
  );
};
