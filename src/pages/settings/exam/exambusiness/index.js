import EmptyIcon from "@/assets/EmptyIcon";
import { Text, View } from "@/components/FlexStyled";
import Page from "@/components/Page";
import PageWrapper from "@/components/PageWrapper";
import { PAGES } from "@/config";
import { useDebounce } from "@/hooks/useDebounce";
import SettingLayout from "@/layouts/setting";
import ActiveModal from "@/sections/emailform/component/ActiveModal";
import ConfirmModal from "@/sections/emailform/component/ConfirmModal";
import {
  useLazyGetQuestionGroupQuery,
  useRemoveQuestionGroupMutation,
  useUpdateActiveQuestionGroupMutation,
} from "@/sections/exam/ExamSlice";
import QuestionGalleryBottomNav from "@/sections/exam/components/QuestionGalleryBottomNav";
import QuestionGalleryHeader from "@/sections/exam/components/QuestionGalleryHeader";
import QuestionGalleryItem from "@/sections/exam/components/QuestionGalleryItem";
import { getRolesByPage } from "@/utils/role";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

Setting.getLayout = function getLayout({ roles = [] }, page) {
  return <SettingLayout roles={roles}>{page}</SettingLayout>;
};

export async function getStaticProps() {
  return {
    props: {
      roles: getRolesByPage(PAGES.Industry),
    },
  };
}

export default function Setting() {
  // state
  const [currentItem, setCurrentItem] = useState(null);
  const [listSelected, setListSelected] = useState([]);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showConfirmSwitchActive, setShowConfirmSwitchActive] = useState(false);

  // api
  const [getQuestionGroup, { isLoading, data: { items = [] } = {} }] =
    useLazyGetQuestionGroupQuery();
  const list = Array.isArray(items) ? items : [];
  const [updateActiveQuestionGroup] = useUpdateActiveQuestionGroupMutation();
  const [removeQuestionGroup] = useRemoveQuestionGroupMutation();

  // variable
  const isMulti = !currentItem && !!listSelected.length;
  const { name = "", isActive } =
    (isMulti
      ? { ...list.find((i) => i.id === listSelected[0]), name: "" }
      : currentItem) || {};

  // form
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      searchKey: "",
    },
  });
  const searchKey = useDebounce(methods.watch("searchKey"), 500);

  // callback
  const onCloseConfirmDelete = () => {
    setCurrentItem(null);
    setShowConfirmDelete(false);
  };

  const onCloseActiveModal = () => {
    setCurrentItem(null);
    setShowConfirmSwitchActive(false);
  };

  const onHandleFinish = () => {
    setListSelected([]);
    onCloseActiveModal();
    onCloseConfirmDelete();
    getQuestionGroup({ searchKey });
  };

  // handle
  const handleDelete = async () => {
    await removeQuestionGroup({
      ids: isMulti ? listSelected : [currentItem.id],
    });
    onHandleFinish();
  };

  const handleActive = async () => {
    await updateActiveQuestionGroup({
      ids: isMulti ? listSelected : [currentItem.id],
      isActive: !isActive,
    });
    onHandleFinish();
  };

  // render
  const renderItem = (data) => {
    const { id } = data;
    const isSelected = listSelected.includes(id);

    const pressCheckbox = () => {
      setListSelected((l) =>
        isSelected ? l.filter((i) => i !== id) : [...l, id]
      );
    };

    return (
      <QuestionGalleryItem
        data={data}
        isSelected={isSelected}
        pressCheckbox={pressCheckbox}
        setCurrentItem={setCurrentItem}
        setShowConfirmDelete={setShowConfirmDelete}
        setShowConfirmSwitchActive={setShowConfirmSwitchActive}
      />
    );
  };

  // effect
  useEffect(() => {
    getQuestionGroup({ searchKey });
  }, [searchKey]);

  return (
    <PageWrapper title={"Kho đề thi doanh nghiệp"}>
      <Page>
        {/* title */}
        <Text fontSize={20} fontWeight={"700"}>
          {"Danh sách nhóm câu hỏi"}
        </Text>

        <QuestionGalleryHeader
          methods={methods}
          handleSubmit={methods.handleSubmit}
        />

        <View flex1>
          {list.length ? (
            list.map(renderItem)
          ) : (
            <View contentCenter pt={64}>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <>
                  <EmptyIcon />
                  <Text mt={12} fontWeight={"500"} color={"#A2AAB7"}>
                    {"Hiện chưa có nhóm câu hỏi nào."}
                  </Text>
                </>
              )}
            </View>
          )}
        </View>

        <QuestionGalleryBottomNav
          list={list}
          listSelected={listSelected}
          setListSelected={setListSelected}
          setShowConfirmDelete={setShowConfirmDelete}
          setShowConfirmSwitchActive={setShowConfirmSwitchActive}
        />

        <ConfirmModal
          confirmDelete={showConfirmDelete}
          title="Xác nhận xóa nhóm câu hỏi"
          subtitle={`Bạn có chắc chắn muốn xóa nhóm câu hỏi ${name}`.trim()}
          onSubmit={handleDelete}
          onCloseConfirmDelete={onCloseConfirmDelete}
        />

        <ActiveModal
          item={{ isActive }}
          isOpenActive={showConfirmSwitchActive}
          title={
            isActive
              ? "Tắt trạng thái hoạt động cho nhóm câu hỏi"
              : "Bật trạng thái hoạt động cho nhóm câu hỏi"
          }
          subtitle={
            isActive
              ? `Bạn có chắc chắn muốn tắt hoạt động cho nhóm câu hỏi ${name}`.trim()
              : `Bạn có chắc chắn muốn bật hoạt động cho nhóm câu hỏi ${name}`.trim()
          }
          onSubmit={handleActive}
          onCloseActiveModal={onCloseActiveModal}
        />
      </Page>
    </PageWrapper>
  );
}
