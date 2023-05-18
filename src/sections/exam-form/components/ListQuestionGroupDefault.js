import { AddQuestionGroupModel } from "./AddQuestionGroupModel";
import ListQuestionBottomNav from "./ListQuestionBottomNav";
import QuestionGallaryInternalModal from "./QuestionGallaryInternalModal";
import QuestionGroupCardItem from "./QuestionGroupCardItem";
import { UpdateQuestionGroupModel } from "./UpdateQuestionGroupModel";
import ConfirmModal from "@/components/BaseComponents/ConfirmModal";
import { ButtonDS } from "@/components/DesignSystem";
import Iconify from "@/components/Iconify";
import { AlertIcon } from "@/sections/organization/component/Icon";
import { STYLE_CONSTANT as style } from "@/theme/palette";
import { Checkbox, Button, ButtonGroup, Box, useTheme } from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";
import { useState } from "react";

function ListQuestionGroupDefault({
  listQuestions,
  setListQuestions,
  updateListQuestion,
}) {
  const [showQuestionGroup, setShowQuestionGroup] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [
    showQuestionGallaryInternalModal,
    setShowQuestionGallaryInternalModal,
  ] = useState(false);
  const [currentIndexQuestion, setCurrentIndexQuestion] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const { palette } = useTheme();
  const [itemIndexSelected, setItemIndexSelected] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  /**
   * Đóng form thêm hoặc sửa câu hỏi
   */
  // const handleCloseForm = () => {
  //   setCurrentIndexQuestion(-1);
  //   setCurrentQuestion(null);
  //   setShowQuestionGroup(false);
  // };

  const handleCloseDeleteModal = () => {
    resetSelectItem();
    setShowDeleteModal(false);
  };
  const handleCloseEditModal = () => {
    resetSelectItem();
    setShowEdit(false);
  };
  /**
   * Hàm xử lý sự kiện thêm hoặc sửa câu hỏi
   * @param {*} data
   */

  const handleCreateEditQuestion = (data) => {
    if (!Array.isArray(data)) return;
    let newData = [];
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (
        listQuestions.some(
          (j) =>
            j.questionGroupId === item.questionGroupId &&
            j.questionTypeId == Number(item.questionTypeId)
        )
      ) {
        enqueueSnackbar(
          `${item.questionGroup.name} - ${
            item.questionTypeId == 1 ? "Trắc nghiệm" : "Tự luận"
          } đã tồn tại trong đề thi`,
          {
            variant: "error",
          }
        );
        return;
      } else newData.push(item);
    }
    setListQuestions([...listQuestions, ...newData]);
    setShowQuestionGroup(false);
    resetSelectItem();
  };

  const handlerDeleteQuestion = () => {
    if (currentIndexQuestion >= 0) {
      listQuestions.splice(currentIndexQuestion, 1);
      updateListQuestion(listQuestions);
    } else {
      updateListQuestion(
        listQuestions.filter((el, i) => !itemIndexSelected.some((j) => i === j))
      );
    }

    setShowDeleteModal(false);
    resetSelectItem();
  };
  const handleEditQuestion = (data) => {
    if (
      listQuestions.some(
        (j, index) =>
          currentIndexQuestion != index &&
          j.questionGroupId === data.questionGroupId &&
          j.questionTypeId == Number(data.questionTypeId)
      )
    ) {
      enqueueSnackbar(
        `${data.questionGroup.name} - ${
          data.questionTypeId == 1 ? "Trắc nghiệm" : "Tự luận"
        } đã tồn tại trong đề thi`,
        {
          variant: "error",
        }
      );
      return;
    }
    listQuestions[currentIndexQuestion] = data;
    setShowEdit(false);
    resetSelectItem();
  };
  const openEditQuestionModel = (item, index) => {
    setCurrentIndexQuestion(index);
    setCurrentQuestion(item);
    setShowEdit(true);
  };

  const openDeleteQuestionModal = (item, index) => {
    setCurrentIndexQuestion(index);
    setShowDeleteModal(true);
  };
  const resetSelectItem = () => {
    setCurrentIndexQuestion(-1);
    setCurrentQuestion(null);
    setItemIndexSelected([]);
  };

  const handleSelected = (data, index) => {
    const isExits = itemIndexSelected.some((x) => x == index);
    if (isExits) {
      setItemIndexSelected(itemIndexSelected.filter((x) => x != index));
    } else {
      setItemIndexSelected([...itemIndexSelected, index]);
    }
  };

  const isSelected = (index) => {
    return itemIndexSelected.some((x) => x == index);
  };

  const handleSelectAll = () => {
    if (itemIndexSelected.length == listQuestions.length) {
      setItemIndexSelected([]);
    } else {
      setItemIndexSelected(listQuestions.map((x, i) => i));
    }
  };
  const [, setError] = React.useState("");
  // useEffect(()=>{
  //   updateListQuestion(listData)
  // },[listQuestions])
  return (
    <>
      <Box>
        {listQuestions.length == 0 && (
          <div
            style={{
              margin: "40px 0",
              minHeight: "250px",
              textAlign: "center",
              color: palette.text.disabled,
            }}
          >
            <img
              src={`/assets/icons/candidate/notfound.png`}
              style={{ margin: "0 auto" }}
            />
            <p
              style={{
                fontSize: 14,
                margin: "0 0 24px 0",
              }}
            >
              Đề thi hiện chưa có nhóm câu hỏi nào
            </p>
            <ButtonGroup
              variant="contained"
              aria-label="split button"
              sx={{
                boxShadow: "unset",
                "& .MuiButtonGroup-grouped:not(:last-of-type)": {
                  borderColor: "white",
                },
                "& .MuiButtonGroup-grouped:hover": {
                  opacity: 0.8,
                },
              }}
            >
              <ButtonDS
                tittle="Thêm nhóm câu hỏi"
                onClick={setShowQuestionGroup}
                icon={
                  <Iconify
                    icon={"material-symbols:add"}
                    width={20}
                    height={20}
                    color="#fff"
                    mr={1}
                  />
                }
              />
            </ButtonGroup>
          </div>
        )}
        {listQuestions.length > 0 && (
          <>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              ml={2}
              flexrow={"true"}
              jcbetween={"true"}
            >
              <Box display={"flex"} alignItems={"center"}>
                <Checkbox
                  checked={
                    itemIndexSelected.length > 0 &&
                    itemIndexSelected.length == listQuestions.length
                  }
                  indeterminate={
                    itemIndexSelected.length > 0 &&
                    itemIndexSelected.length < listQuestions.length
                  }
                  onChange={handleSelectAll}
                  title="Chọn tất cả"
                />
                <label
                  style={{
                    fontSize: 14,
                    lineHeight: "20px",
                    fontWeight: 600,
                    color: "#455570",
                    marginLeft: "24px",
                  }}
                >
                  Chọn tất cả
                </label>
              </Box>

              <ButtonGroup
                variant="contained"
                aria-label="split button"
                sx={{
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
                    padding: "8px 12px",
                    fontWeight: 600,
                    fontSize: " .875rem",
                    textTransform: "none",
                  }}
                  onClick={() => setShowQuestionGroup(true)}
                >
                  <Iconify
                    icon={"material-symbols:add"}
                    width={20}
                    height={20}
                    color="#fff"
                    mr={1}
                  />
                  Thêm nhóm câu hỏi
                </Button>
              </ButtonGroup>
            </Box>

            <Box mt={3} mb={2}>
              {listQuestions.map((item, index) => (
                <QuestionGroupCardItem
                  key={index}
                  index={index}
                  item={item}
                  onDelete={openDeleteQuestionModal}
                  onEdit={openEditQuestionModel}
                  onChangeQuantity={(v, err) => {
                    updateListQuestion(
                      listQuestions.map((i, j) =>
                        j === index ? { ...i, quantity: Number(v) } : i
                      )
                    );
                    setError([err]);
                  }}
                  checked={isSelected(index)}
                  onChangeSelected={() => handleSelected(item, index)}
                />
              ))}
            </Box>
          </>
        )}
      </Box>

      {/* <QuestionFormModal
        data={currentQuestion}
        show={showQuestionGroup}
        onClose={handleCloseForm}
        isNotSave={true}
        handleNoSave={handleCreateEditQuestion}
      /> */}
      <AddQuestionGroupModel
        show={showQuestionGroup}
        setShow={setShowQuestionGroup}
        onSubmit={handleCreateEditQuestion}
      />
      <QuestionGallaryInternalModal
        show={showQuestionGallaryInternalModal}
        onClose={() => setShowQuestionGallaryInternalModal(false)}
      />
      <ListQuestionBottomNav
        open={itemIndexSelected.length > 0}
        itemSelected={itemIndexSelected}
        canEdit={listQuestions[itemIndexSelected[0]]?.questionGroupId}
        onClose={() => setItemIndexSelected([])}
        onDelete={() => openDeleteQuestionModal()}
        onEdit={() =>
          openEditQuestionModel(
            listQuestions[itemIndexSelected[0]],
            itemIndexSelected[0]
          )
        }
      />

      <ConfirmModal
        open={showDeleteModal}
        onClose={handleCloseDeleteModal}
        icon={<AlertIcon />}
        title={"Xác nhận nhóm câu hỏi"}
        titleProps={{
          sx: {
            color: style.COLOR_TEXT_DANGER,
            fontWeight: 600,
            marginBottom: 1,
          },
        }}
        subtitle={"Bạn có chắc chắn muốn xóa nhóm câu hỏi?"}
        onSubmit={handlerDeleteQuestion}
        btnCancelProps={{
          title: "Hủy",
        }}
        btnConfirmProps={{
          title: "Xóa",
          color: "error",
        }}
      />
      {showEdit && (
        <UpdateQuestionGroupModel
          show={showEdit}
          editData={currentQuestion}
          setShow={setShowEdit}
          onSubmit={handleEditQuestion}
          onClose={handleCloseEditModal}
        />
      )}
    </>
  );
}

export default ListQuestionGroupDefault;
