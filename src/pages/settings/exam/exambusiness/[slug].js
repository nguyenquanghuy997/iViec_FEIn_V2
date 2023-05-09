import Content from "@/components/BaseComponents/Content";
import DynamicColumnsTable from "@/components/BaseComponents/table";
import { AvatarDS } from "@/components/DesignSystem";
import { View } from "@/components/FlexStyled";
import { PERMISSION_PAGES } from "@/config";
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
  const [showTransferQuestionGroup, setShowTransferQuestionGroup] = useState(false);

  const { isActive, questionTitle = "" } = itemSelected[0] || {};
  const isMulti = itemSelected.length > 1;
  const ids = itemSelected.map((i) => i.id);
  const _name = isMulti ? "" : questionTitle;

  //   api
  const [getQuestions, { data: Data, isLoading }] = useLazyGetQuestionsQuery();
  const [updateActiveQuestion] = useUpdateActiveQuestionMutation();
  const [removeQuestion] = useRemoveQuestionMutation();

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
        dataIndex: "questionType",
        title: "Loại câu hỏi",
        width: "214px",
        render: (_, { questionType }) => {
          return questionType === 2
            ? "Tự luận"
            : questionType === 1
              ? "Trắc nghiệm - nhiều đáp án đúng"
              : "Trắc nghiệm - một đáp án đúng";
        },
      },
      {
        dataIndex: "createDate",
        title: "Ngày tạo",
        width: "180px",
        render: (_, { createdTime }) => {
          return moment(createdTime).format("DD/MM/YYYY");
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

              {createdUser?.name}
            </View>
          );
        },
      },
      {
        dataIndex: "updateDate",
        title: "Ngày chỉnh sửa",
        width: "180px",
        render: (_, { updatedTime }) => {
          return updatedTime ? moment(updatedTime).format("DD/MM/YYYY") : "-";
        },
      },
      {
        dataIndex: "creatorUpdate",
        title: "Người chỉnh sửa",
        width: "220px",
        render: (_, { updatedUser }) => {
          return (
            <View flexRow atCenter>
              <AvatarDS
                sx={{
                  height: "20px",
                  width: "20px",
                  fontSize: "10px",
                  borderRadius: "20px",
                }}
                src={updatedUser.avatar}
                name={updatedUser.name}
              />

              {updatedUser?.name}
            </View>
          );
        },
      },
      {
        dataIndex: "description",
        title: "Điểm",
        width: "160px",
        render: () => {
          return "-";
        },
      },
      {
        dataIndex: "examApply",
        title: "Đề thi áp dụng",
        width: "160px",
        render: () => {
          return "-";
        },
      },
      {
        dataIndex: "isActive",
        title: "Trạng thái",
        width: "180px",
        render: (_, record) => {
          return (
            <span style={{ color: record.isActive ? "#388E3C" : "#D32F2F" }}>
              {record.isActive ? "Đang hoạt động" : "Ngừng hoạt động"}
            </span>
          );
        },
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
            setShowForm(true);
            setItemSelected([]);
            setSelectedRowKeys([]);
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
          setShowTransferQuestionGroup={() => setShowTransferQuestionGroup(true)}
        />
      </Content>

      <QuestionFormModal
        data={itemSelected[0]}
        show={showForm}
        onClose={() => setShowForm(false)}
        getData={getData}
      />

      <ConfirmModal
        confirmDelete={showConfirmDelete}
        title="Xác nhận xóa câu hỏi"
        subtitle={
          isMulti ? (
            <span>
              Bạn có chắc chắn muốn xóa{" "}
              <b>{isMulti ? itemSelected.length : ""} câu hỏi</b>
            </span>
          ) : (
            <span>
              Bạn có chắc chắn muốn xóa nhóm câu hỏi{" "}
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
              Bạn có chắc chắn muốn tắt hoạt động cho nhóm câu hỏi{" "}
              <b>{_name.trim()}</b>
            </span>
          ) : (
            <span>
              Bạn có chắc chắn muốn bật hoạt động cho nhóm câu hỏi{" "}
              <b>{_name.trim()}</b>
            </span>
          )
        }
        onSubmit={handleActive}
        onCloseActiveModal={onCloseActiveModal}
      />

      <QuestionTransferModal
        isShowTransferQuestionGroup={showTransferQuestionGroup}
        onCloseTransfer={onCloseTransfer} />
    </View>
  );
}

export default Question;
