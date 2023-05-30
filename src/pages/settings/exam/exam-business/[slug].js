import Content from "@/components/BaseComponents/Content";
import DynamicColumnsTable from "@/components/BaseComponents/table";
import { AvatarDS } from "@/components/DesignSystem";
import { View } from "@/components/FlexStyled";
import { PERMISSION_PAGES, TBL_FILTER_TYPE } from "@/config";
import SettingLayout from "@/layouts/setting";
import ActiveModal from "@/sections/emailform/component/ActiveModal";
import ConfirmModal from "@/sections/emailform/component/ConfirmModal";
import {
  useGetListQuestionColumnsQuery,
  useLazyGetQuestionsQuery,
  useRemoveQuestionMutation,
  useUpdateActiveQuestionMutation,
  useUpdateQuestionColumnsMutation,
} from "@/sections/exam/ExamSlice";
import QuestionBottomNav from "@/sections/exam/components/QuestionBottomNav";
import { QuestionFormModal } from "@/sections/exam/components/QuestionFormModal";
import QuestionTransferModal from "@/sections/exam/components/QuestionTransferModal";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { API_GET_ORGANIZATION_USERS } from "@/routes/api";


Question.getLayout = function getLayout(pageProps, page) {
  return (
    <SettingLayout permissions={PERMISSION_PAGES.exam} {...pageProps}>
      {page}
    </SettingLayout>
  );
};

function Question() {
  const router = useRouter();
  const { query = { group: "", PageIndex: 1, PageSize: 10 } } = router;
  const { group, PageSize, PageIndex, slug: QuestionGroupId } = query;
  const pageTitle = `Nhóm câu hỏi ${group}`.trim();

  //   state
  const [showForm, setShowForm] = useState(false);
  const [itemSelected, setItemSelected] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showConfirmSwitchActive, setShowConfirmSwitchActive] = useState(false);
  const [showTransferQuestionGroup, setShowTransferQuestionGroup] =
    useState(false);

  const { isActive, questionTitle = "" } = itemSelected[0] || {};
  const isMulti = itemSelected.length > 1;
  const ids = itemSelected.map((i) => i.id);
  const _name = isMulti ? "" : questionTitle;

  //   api
  const [getQuestions, { data: Data, isLoading }] = useLazyGetQuestionsQuery();
  const [updateActiveQuestion] = useUpdateActiveQuestionMutation();
  const [removeQuestion] = useRemoveQuestionMutation();

  const LIST_OPTIONS_QUESTION_TYPE = [
    { id: null, value: null, name: "Tất cả" },
    { id: 2, value: 2, name: "Tự luận" },
    { id: 0, value: 0, name: "Trắc nghiệm - một đáp án đúng" },
    { id: 1, value: 1, name: "Trắc nghiệm - nhiều đáp án đúng" },
  ]
  // table
  const columns = useMemo(() => {
    return [
      {
        dataIndex: "id",
        title: "STT",
        align: "center",
        width: "62px",
        fixed: "left",
        render: (_, __, index, page, paginationSize) =>
          (page - 1) * paginationSize + index + 1,
      },
      {
        dataIndex: "name",
        title: "Câu hỏi",
        width: "240px",
        fixed: "left",
        render: (_, { questionTitle }) => {
          return questionTitle;
        },
      },
      {
        dataIndex: "createDate",
        title: "Ngày tạo",
        width: "180px",
        render: (_, { createdTime }) => {
          return moment(createdTime).format("DD/MM/YYYY");
        },
        filters: {
          type: TBL_FILTER_TYPE.RANGE_DATE,
          name: ['createdTimeFrom', 'createdTimeTo'],
          placeholder: 'Chọn ngày',
        },
      },
      {
        dataIndex: "creator",
        title: "Người tạo",
        width: "220px",
        render: (_, { createdUser }) => {
          return (
            <View flexRow atCenter>
              <AvatarDS
                sx={{
                  height: "20px",
                  width: "20px",
                  fontSize: "10px",
                  borderRadius: "20px",
                }}
                src={createdUser.avatar}
                name={createdUser.name}
              />

              {createdUser?.email}
            </View>
          );
        },
        filters: {
          type: TBL_FILTER_TYPE.SELECT_CHECKBOX,
          name: "creatorIds",
          placeholder: "Chọn 1 hoặc nhiều người",
          remoteUrl: API_GET_ORGANIZATION_USERS,
          showAvatar: true,
        },
      },
      {
        dataIndex: "updateDate",
        title: "Ngày chỉnh sửa",
        width: "180px",
        render: (_, { updatedTime, updatedUser }) => {
          return updatedUser?.id ? moment(updatedTime).format("DD/MM/YYYY") : "-";
        },
      },
      {
        dataIndex: "creatorUpdate",
        title: "Người chỉnh sửa",
        width: "220px",
        render: (_, { updatedUser }) => {
          return (
            updatedUser?.id ?
              <View flexRow atCenter>
                <AvatarDS
                  sx={{
                    height: "20px",
                    width: "20px",
                    fontSize: "10px",
                    borderRadius: "20px",
                  }}
                  src={updatedUser?.avatar}
                  name={updatedUser?.name}
                />

                {updatedUser?.email}
              </View>
              : '-'
          );
        },
        filters: {
          type: TBL_FILTER_TYPE.SELECT_CHECKBOX,
          name: "updaterIds",
          placeholder: "Chọn 1 hoặc nhiều người",
          remoteUrl: API_GET_ORGANIZATION_USERS,
          showAvatar: true,
        },
      },
      {
        dataIndex: "questionType",
        title: "Kiểu câu hỏi",
        width: "214px",
        render: (_, { questionType }) => {
          return questionType === 2
            ? "Tự luận"
            : questionType === 1
              ? "Trắc nghiệm - nhiều đáp án đúng"
              : "Trắc nghiệm - một đáp án đúng";
        },
        filters: {
          type: TBL_FILTER_TYPE.SELECT,
          name: 'type',
          options: LIST_OPTIONS_QUESTION_TYPE.map(item => ({ value: item.id, label: item.name })),
          placeholder: "Tất cả"
        },
      },
      {
        dataIndex: "description",
        title: "Điểm",
        width: "160px",
        render: (_, { questionPoint }) => {
          return questionPoint;
        },
      },
      {
        dataIndex: "examApply",
        title: "Đề thi áp dụng",
        width: "160px",
        render: (_, { numOfExaminationApply }) => {
          return numOfExaminationApply > 0 ? numOfExaminationApply : "-";
        },
      },
      {
        dataIndex: "isActive",
        title: "Trạng thái",
        width: "180px",
        render: (_, record) => {
          return (
            <span style={{ color: record.isActive ? "#388E3C" : "#D32F2F" }}>
              {record.isActive ? "Đang hoạt động" : "Không hoạt động"}
            </span>
          );
        },
        filters: {
          type: TBL_FILTER_TYPE.SELECT,
          placeholder: 'Tất cả',
          name: "isActive",
          // options: LIST_STATUS.map(item => ({ value: item.value, label: item.name }),)
          options: [
            {
              value: null,
              label: 'Tất cả'
            },
            {
              value: 'true',
              label: 'Đang hoạt động'
            },
            {
              value: 'false',
              label: 'Không hoạt động'
            }
          ]
        }
      },
    ];
  }, [PageIndex, PageSize]);

  // callback
  const onCloseConfirmDelete = () => {
    setShowConfirmDelete(false);
  };

  const onCloseActiveModal = () => {
    setShowConfirmSwitchActive(false);
  };

  const onCloseTransfer = () => {
    setShowTransferQuestionGroup(false);
  };

  // handle
  const getData = () => {
    setShowForm(false);
    setItemSelected([]);
    setSelectedRowKeys([]);
    onCloseActiveModal();
    onCloseConfirmDelete();
    onCloseTransfer();
    getQuestions({ ...query, QuestionGroupId, slug: undefined });
  };

  const handleDelete = async () => {
    await removeQuestion({
      questionIds: ids,
    });
    getData();
  };

  const handleActive = async () => {
    await updateActiveQuestion({
      questionIds: ids,
      isActive: !isActive,
    });
    getData();
  };

  const handlerOpenCopyQuestion = () => {
    setItemSelected(itemSelected.map(x => {
      return {
        ...x,
        id: null
      }
    }))
    setShowForm(true)
  }

  //   effect
  useEffect(() => {
    getData();
  }, [query, QuestionGroupId]);

  return (
    <View>
      <Content
        sx={{
          padding: "0 !important",
          "& .MuiBox-root": {
            padding: 0,
          },
        }}
      >
        <DynamicColumnsTable
          source={Data}
          columns={columns}
          loading={isLoading}
          settingName={pageTitle}
          itemSelected={itemSelected}
          selectedRowKeys={selectedRowKeys}
          nodata={"Hiện chưa có câu hỏi nào"}
          setItemSelected={setItemSelected}
          setSelectedRowKeys={setSelectedRowKeys}
          useGetColumnsFunc={useGetListQuestionColumnsQuery}
          useUpdateColumnsFunc={useUpdateQuestionColumnsMutation}
          createText={"Thêm câu hỏi"}
          onClickCreate={() => {
            setItemSelected([]);
            setSelectedRowKeys([]);
            setShowForm(true);
          }}
        />

        <QuestionBottomNav
          list={Data?.items || []}
          listSelected={selectedRowKeys}
          setListSelected={(e) => {
            if (!e.length) {
              setSelectedRowKeys([]);
              setItemSelected([]);
              return;
            }
            setSelectedRowKeys(e);
          }}
          setShowForm={setShowForm}
          setShowConfirmDelete={() => setShowConfirmDelete(true)}
          setShowConfirmSwitchActive={() => setShowConfirmSwitchActive(true)}
          setShowTransferQuestionGroup={() =>
            setShowTransferQuestionGroup(true)
          }

          setShowCopyQuestion={() => handlerOpenCopyQuestion()}
        />
      </Content>

      {
        showForm && <QuestionFormModal
          data={itemSelected[0]}
          show={showForm}
          isNotSave={false}
          onClose={() => {
            setShowForm(false);
            setItemSelected([]);
            setSelectedRowKeys([]);
          }}
          getData={getData}
        />
      }

      <ConfirmModal
        confirmDelete={showConfirmDelete}
        title="Xác nhận xóa câu hỏi"
        subtitle={
          isMulti ? (
            <span>
              Bạn có chắc chắn muốn xóa{" "}
              <b>{isMulti ? itemSelected.length : ""} câu hỏi </b> này
            </span>
          ) : (
            <span>
              Bạn có chắc chắn muốn xóa câu hỏi{" "}
              {!isMulti ? <b>{_name.trim()}</b> : ""} này
            </span>
          )
        }
        onSubmit={handleDelete}
        onCloseConfirmDelete={onCloseConfirmDelete}
      />

      <ActiveModal
        item={{ isActive }}
        isOpenActive={showConfirmSwitchActive}
        title={
          isActive
            ? "Tắt trạng thái hoạt động cho câu hỏi"
            : "Bật trạng thái hoạt động cho câu hỏi"
        }
        subtitle={
          isActive ? (
            <span>
              Bạn có chắc chắn muốn tắt hoạt động cho câu hỏi{" "}
              <b>{_name.trim()}</b>
            </span>
          ) : (
            <span>
              Bạn có chắc chắn muốn bật hoạt động cho câu hỏi{" "}
              <b>{_name.trim()}</b>
            </span>
          )
        }
        onSubmit={handleActive}
        onCloseActiveModal={onCloseActiveModal}
      />

      <QuestionTransferModal
        questionGroupId={QuestionGroupId}
        data={selectedRowKeys}
        getData={getData}
        isShowTransferQuestionGroup={showTransferQuestionGroup}
        onCloseTransfer={onCloseTransfer}
      />
    </View>
  );
}

export default Question;
