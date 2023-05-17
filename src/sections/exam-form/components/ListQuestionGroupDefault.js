import { AddQuestionGroupModel } from "./AddQuestionGroupModel";
import QuestionGallaryInternalModal from "./QuestionGallaryInternalModal";
import QuestionGroupCardItem from "./QuestionGroupCardItem";
import {
  CheckboxIconChecked,
  CheckboxIconDefault,
} from "@/assets/CheckboxIcon";
import ConfirmModal from "@/components/BaseComponents/ConfirmModal";
import { ButtonDS } from "@/components/DesignSystem";
import Iconify from "@/components/Iconify";
import { AlertIcon } from "@/sections/organization/component/Icon";
import { STYLE_CONSTANT as style } from "@/theme/palette";
import {
  Checkbox,
  Button,
  ButtonGroup,
  Box,
  useTheme,
} from "@mui/material";
import React from "react";
import { useState } from "react";

function ListQuestionGroupDefault({
  listQuestions,
  setListQuestions,
  updateListQuestion,
}) {
  const [showQuestionGroup, setShowQuestionGroup] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [
    showQuestionGallaryInternalModal,
    setShowQuestionGallaryInternalModal,
  ] = useState(false);
  const [currentIndexQuestion, setCurrentIndexQuestion] = useState(0);
  const [, setCurrentQuestion] = useState(null);
  const { palette } = useTheme();

  /**
   * Đóng form thêm hoặc sửa câu hỏi
   */
  // const handleCloseForm = () => {
  //   setCurrentIndexQuestion(-1);
  //   setCurrentQuestion(null);
  //   setShowQuestionGroup(false);
  // };

  const handleCloseDeleModal = () => {
    setCurrentIndexQuestion(-1);
    setCurrentQuestion(null);
    setShowDeleteModal(false);
  };

  /**
   * Hàm xử lý sự kiện thêm hoặc sửa câu hỏi
   * @param {*} data
   */
  const handleCreateEditQuestion = (data) => {
    setListQuestions([...listQuestions, ...data]);
    // updateListQuestion(listQuestions);

    setShowQuestionGroup(false);
    // reset choose index && data
    setCurrentQuestion(null);
    setCurrentIndexQuestion(-1);
  };

  const handlerDeleteQuestion = () => {
    listQuestions.splice(currentIndexQuestion, 1);
    // setListData([...listData])
    updateListQuestion(listQuestions);

    setShowDeleteModal(false);
    setCurrentIndexQuestion(-1);
  };

  const openEditQuestionForm = (item, index) => {
    setCurrentIndexQuestion(index);
    setCurrentQuestion(item);
    setShowQuestionGroup(true);
  };

  const openDeleteQuestionModal = (item, index) => {
    setCurrentIndexQuestion(index);
    setShowDeleteModal(true);
  };
  const [error, setError] = React.useState("");
  // useEffect(()=>{
  //   updateListQuestion(listData)
  // },[listQuestions])
console.log('errorerror', error)
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
            <Box display={'flex'} justifyContent={'space-between'} ml={2} flexrow={"true"} jcbetween={"true"}>
              <Box display={'flex'} alignItems={'center'}>
                <Checkbox
                  // onChange={pressCheckbox}
                  icon={<CheckboxIconDefault />}
                  checkedIcon={<CheckboxIconChecked />}
                  title="Chọn tất cả"
                />
                <label
                  style={{
                    fontSize: 14,
                    lineHeight: "20px",
                    fontWeight: 600,
                    color: "#455570",
                    marginLeft: '24px'
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
                  onEdit={openEditQuestionForm}
                  onChangeQuantity={(v, err) => {
                    updateListQuestion(listQuestions.map((i, j) => j ===index ? ({...i, quantity: Number(v)}): i))
                    setError([err])
                  }}
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

      {/* <ConfirmModal
        confirmDelete={showDeleteModal}
        title="Xác nhận xóa nhóm câu hỏi"
        subtitle={"Bạn có chắc chắn muốn xóa nhóm câu hỏi"}
        onSubmit={handlerDeleteQuestion}
        onCloseConfirmDelete={handleCloseDeleModal}
      /> */}

      <ConfirmModal
        open={showDeleteModal}
        onClose={handleCloseDeleModal}
        icon={<AlertIcon />}
        title={"Xác nhận xóa ứng viên"}
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
          color: 'error'
        }}
      />
    </>
  );
}

export default ListQuestionGroupDefault;
