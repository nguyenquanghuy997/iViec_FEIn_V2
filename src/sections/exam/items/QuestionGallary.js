import { QuestionFormModal } from "../components/QuestionFormModal";
import EmptyIcon from "@/assets/EmptyIcon";
import { Text, View } from "@/components/FlexStyled";
import { useDebounce } from "@/hooks/useDebounce";
import ActiveModal from "@/sections/emailform/component/ActiveModal";
import ConfirmModal from "@/sections/emailform/component/ConfirmModal";
import {
  useCreateQuestionGroupMutation,
  useLazyGetQuestionGroupQuery,
  useRemoveQuestionGroupMutation,
  useUpdateActiveQuestionGroupMutation,
  useUpdateQuestionGroupMutation,
} from "@/sections/exam/ExamSlice";
import QuestionGalleryBottomNav from "@/sections/exam/components/QuestionGalleryBottomNav";
import { QuestionGalleryFormModal } from "@/sections/exam/components/QuestionGalleryFormModal";
import QuestionGalleryHeader from "@/sections/exam/components/QuestionGalleryHeader";
import QuestionGalleryItem from "@/sections/exam/components/QuestionGalleryItem";
import { CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const QuestionGallary = () => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  // state
  const [currentItem, setCurrentItem] = useState(null);
  const [listSelected, setListSelected] = useState([]);
  const [showFrom, setShowForm] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showConfirmSwitchActive, setShowConfirmSwitchActive] = useState(false);

  // api
  const [getQuestionGroup, { isLoading, data: { items = [] } = {} }] =
    useLazyGetQuestionGroupQuery();
  const list = Array.isArray(items) ? items : [];
  const [createQuestionGroup] = useCreateQuestionGroupMutation();
  const [updateQuestionGroup] = useUpdateQuestionGroupMutation();
  const [updateActiveQuestionGroup] = useUpdateActiveQuestionGroupMutation();
  const [removeQuestionGroup] = useRemoveQuestionGroupMutation();

  // variable
  const isMulti = !currentItem && !!listSelected.length;

  const {
    id,
    name = "",
    description,
    isActive,
  } = (isMulti || !currentItem
    ? { ...list.find((i) => i.id === listSelected[0]) }
    : currentItem) || {};

  const _name = isMulti ? "" : name;

  const [showFormQuestion, setShowFormQuestion] = useState(false);

  // form
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      searchKey: "",
    },
  });

  const searchKey = useDebounce(methods.watch("searchKey"), 500);

  // callback
  const onSubmitForm = async (e) => {
    const body = {
      ...e,
      description: e.des,
    };
    try {
      await (e.id
        ? updateQuestionGroup(body)
        : createQuestionGroup(body)
      ).unwrap();
      setShowForm(false);
      onHandleFinish();
    } catch (e) {
      if (e.status == "QGE_05") {
        enqueueSnackbar(
          "Nhóm câu hỏi đã tồn tại. Vui lòng nhập lại tên khác !",
          { variant: "error" }
        );
      }
    }
  };

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
    try {
      await removeQuestionGroup({
        ids: isMulti ? listSelected : [currentItem.id],
      });
      enqueueSnackbar("Xóa nhóm thành công!");
      onHandleFinish();
    } catch (err) {
      enqueueSnackbar("Xóa nhóm thất bại!", { variant: "error" });
    }
  };

  const handleActive = async () => {
    try {
      await updateActiveQuestionGroup({
        ids: isMulti ? listSelected : [currentItem.id],
        isActive: !isActive,
      });
      enqueueSnackbar("Thay đổi trạng thái thành công!");
      onHandleFinish();
    } catch (err) {
      enqueueSnackbar("Thay đổi trạng thái thất bại!", { variant: "error" });
    }
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
        setShowForm={()=>{
          setCurrentItem(data)
          setShowForm(true)
        }}
        setShowConfirmDelete={setShowConfirmDelete}
        setShowConfirmSwitchActive={setShowConfirmSwitchActive}
      />
    );
  };

  // effect
  useEffect(() => {
    getQuestionGroup({ searchKey });
  }, [searchKey]);

  useEffect(() => {
    if (showFrom) return;
    setCurrentItem(null);
  }, [showFrom]);

  return (
    <View>
      {/* title */}
      <Text fontSize={20} fontWeight={"700"}>
        {"Danh sách nhóm câu hỏi"}
      </Text>

      <QuestionGalleryHeader
        methods={methods}
        handleSubmit={methods.handleSubmit}
        pressAddQuestionGallery={() => setShowForm(true)}
        handlerCreateQuestion={() => setShowFormQuestion(true)}
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
                <Text
                  mt={12}
                  fontWeight={"500"}
                  color={theme.palette.common.neutral400}
                >
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
        setShowForm={setShowForm}
        setShowConfirmDelete={setShowConfirmDelete}
        setShowConfirmSwitchActive={setShowConfirmSwitchActive}
      />

      <ConfirmModal
        confirmDelete={showConfirmDelete}
        title="Xác nhận xóa nhóm câu hỏi"
        subtitle={listSelected.length > 1
          ? <span>Bạn có chắc chắn muốn xóa <b>{listSelected.length > 1 ? listSelected.length : ''} nhóm câu hỏi </b>này</span>
          : <span>Bạn có chắc chắn muốn xóa nhóm câu hỏi {listSelected.length == 1 ? <b>{name.trim()}</b> : ''}</span>
        }
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

      {showFrom && (
        <QuestionGalleryFormModal
          show={showFrom}
          editData={{ id, name, description, isActive }}
          setShow={setShowForm}
          onSubmit={onSubmitForm}
        />
      )}

      <QuestionFormModal
        show={showFormQuestion}
        onClose={() => setShowFormQuestion(false)}
      />
    </View>
  );
};
