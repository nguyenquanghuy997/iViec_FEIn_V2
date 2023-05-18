import { AddQuestionGroupModel } from "./AddQuestionGroupModel";
import QuestionGallaryInternalModal from "./QuestionGallaryInternalModal";
import {
  CheckboxIconChecked,
  CheckboxIconDefault,
} from "@/assets/CheckboxIcon";
import { ButtonDS } from "@/components/DesignSystem";
import { View } from "@/components/DesignSystem/FlexStyled";
import Iconify from "@/components/Iconify";
import ConfirmModal from "@/sections/emailform/component/ConfirmModal";
import { Checkbox, Button, ButtonGroup, Box, useTheme } from "@mui/material";
import React from "react";
import { useState } from "react";
import QuestionGroupCardItem from "./QuestionGroupCardItem";

function ListQuestionGroupDefault({ listQuestions, updateListQuestion }) {
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
    if (currentIndexQuestion == -1) {
      // setListData([...listData, data])
      listQuestions.push(data);
    } else {
      listQuestions[currentIndexQuestion] = data;
      // setListData([...listData])
    }

    updateListQuestion(listQuestions);

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
            <View mh={24} flexrow={"true"} jcbetween={"true"}>
              <View flexrow={true} atcenter={true}>
                <Checkbox
                  // onChange={pressCheckbox}
                  icon={<CheckboxIconDefault />}
                  checkedIcon={<CheckboxIconChecked />}
                  title="Chọn tất cả"
                  style={{
                    margin: "-6px 24px 0 -6px",
                  }}
                />
                <label
                  style={{
                    fontSize: 14,
                    lineHeight: "20px",
                    fontWeight: 600,
                    color: "#455570",
                  }}
                >
                  Chọn tất cả
                </label>
              </View>

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
                    borderRadius: "6px 0px 0px 6px",
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
            </View>

            <View mt={24} mb={28}>
              {listQuestions.map((item, index) => (
                <QuestionGroupCardItem
                  key={index}
                  index={index}
                  item={item}
                  onDelete={openDeleteQuestionModal}
                  onEdit={openEditQuestionForm}
                />
              ))}
            </View>
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

      <ConfirmModal
        confirmDelete={showDeleteModal}
        title="Xác nhận xóa câu hỏi"
        subtitle={"Bạn có chắc chắn muốn xóa câu hỏi"}
        onSubmit={handlerDeleteQuestion}
        onCloseConfirmDelete={handleCloseDeleModal}
      />
    </>
  );
}

export default ListQuestionGroupDefault;
