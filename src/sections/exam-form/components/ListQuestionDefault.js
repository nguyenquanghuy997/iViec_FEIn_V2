import { CheckboxIconChecked, CheckboxIconDefault, CheckboxIconIndeterminate } from "@/assets/CheckboxIcon"
import { Checkbox, Typography, Button, ButtonGroup, ClickAwayListener, MenuItem, MenuList } from "@mui/material"
import QuestionCardItemDefault from "./QuestionCardItemDefault"
import { TeamLineIcon } from "@/assets/ActionIcon";
import { LightTooltip } from "@/components/DesignSystem/TooltipHtml";

import React from 'react'
import { useState } from 'react';
import Iconify from '@/components/Iconify';
import NoQuestion from './NoQuestion';
import ConfirmModal from '@/sections/emailform/component/ConfirmModal';
import { View } from "@/components/DesignSystem/FlexStyled";
import QuestionGallaryInternalModal from "./QuestionGallaryInternalModal";
// import QuestionGallaryDetailModal from "./QuestionGallaryDetailModal";
import { useSnackbar } from "notistack";
import ListQuestionBottomNav from "./ListQuestionBottomNav";
import { QuestionFormModal } from "@/sections/exam/components/QuestionFormModal";

function ListQuestionDefault({ listQuestions, updateListQuestion }) {
  const { enqueueSnackbar } = useSnackbar();

  const [openGroup, setOpenGroup] = useState(false);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showQuestionGallaryInternalModal, setShowQuestionGallaryInternalModal] = useState(false);
  // const [showQuestionGallaryDetailModal, setShowQuestionGallaryDetailModal] = useState(false);
  const [currentIndexQuestion, setCurrentIndexQuestion] = useState(-1);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  // const [questionGallary, setQuestionGallary] = useState(null);
  const [itemIndexSelected, setItemIndexSelected] = useState([]);

  const handleCloseGroup = () => {
    setOpenGroup(false);
  };

  const handleOpenGroup = () => {
    setOpenGroup(true);
  };

  /**
     * Đóng form thêm hoặc sửa câu hỏi
     */
  const handleCloseForm = () => {
    resetSelectItem()
    setShowQuestionForm(false)
  }

  const handleCloseDeleteModal = () => {
    resetSelectItem()
    setShowDeleteModal(false)
  }

  /**
   * Hàm xử lý sự kiện thêm hoặc sửa câu hỏi
   * @param {*} data 
   */
  const handleCreateEditQuestion = (data) => {
    //create
    const newList = [...listQuestions]
    if (currentIndexQuestion === -1) {
      // check duplicate
      if (listQuestions.some(x => x.questionTitle === data.questionTitle)) {
        enqueueSnackbar("Câu hỏi đã tồn tại trong đề thi", {
          variant: 'error'
        })
        return;
      }
      newList.push(data);
    }
    //edit
    else {
      // check duplicate
      if (listQuestions.some((x, index) => x.questionTitle == data.questionTitle && index != currentIndexQuestion)) {
        enqueueSnackbar("Câu hỏi đã tồn tại trong đề thi", {
          variant: 'error'
        })
        return;
      }
      newList[currentIndexQuestion] = data;
    }
    enqueueSnackbar('Lưu câu hỏi thành công')
    updateListQuestion(newList)

    setShowQuestionForm(false)
    // reset choose index && data
    resetSelectItem()
  }

  const handleAddQuestionFromInternal = (datas) => {
    // loc nhung items da them vao danh sach
    updateListQuestion([...listQuestions, ...datas])
    // setShowQuestionGallaryDetailModal(false)
  }

  const handlerDeleteQuestion = () => {
    if (currentIndexQuestion != -1) {
      updateListQuestion(listQuestions.filter((el, i) => i != currentIndexQuestion))
    }
    else {
      updateListQuestion(listQuestions.filter((el, i) => !itemIndexSelected?.some(j => i === j)))
    }
    // setListData([...listData])

    setShowDeleteModal(false)
    resetSelectItem()
  }


  const openEditQuestionForm = (item, index) => {
    setCurrentIndexQuestion(index)
    setCurrentQuestion(item)
    setShowQuestionForm(true);
  }

  const openDeleteQuestionModal = (data, index) => {
    setCurrentIndexQuestion(index)
    setShowDeleteModal(true)
  }

  // const handleOpenQuestionGallaryDetailModal = (questionGallary) => {
  //   setQuestionGallary(questionGallary)
  //   setShowQuestionGallaryDetailModal(true)
  // }

  const resetSelectItem = () => {
    setCurrentIndexQuestion(-1)
    setCurrentQuestion(null)
    setItemIndexSelected([])
  }

  const handleSelected = (data, index) => {
    const isExits = itemIndexSelected.some(x => x == index)
    if (isExits) {
      setItemIndexSelected(itemIndexSelected.filter(x => x != index))
    }
    else {
      setItemIndexSelected([...itemIndexSelected, index]);
    }
  }

  const isSelected = (index) => {
    return itemIndexSelected.some(x => x == index)
  }

  const handleSelectAll = () => {
    if (itemIndexSelected.length == listQuestions.length) {
      setItemIndexSelected([])
    }
    else {
      setItemIndexSelected(listQuestions.map((x, i) => i))
    }
  }

  return (
    <>
      <View>
        {
          listQuestions.length == 0 ?
            <View>
              <NoQuestion setShowQuestionForm={() => setShowQuestionForm(true)} setShowQuestionGallaryInternalModal={() => setShowQuestionGallaryInternalModal(true)} />
            </View>
            :
            <>
              <View mh={24} flexrow={'true'} jcbetween={'true'}>
                <View flexrow={true} atcenter={true}>
                  <Checkbox
                    checked={itemIndexSelected.length > 0 && itemIndexSelected.length == listQuestions.length}
                    indeterminate={itemIndexSelected.length > 0 && itemIndexSelected.length < listQuestions.length}
                    onChange={handleSelectAll}
                    icon={<CheckboxIconDefault />}
                    checkedIcon={<CheckboxIconChecked />}
                    indeterminateIcon={<CheckboxIconIndeterminate />}
                    title="Chọn tất cả"
                    style={{
                      margin: '-6px 24px 0 -6px'
                    }}
                  />
                  <label style={{
                    fontSize: 14,
                    lineHeight: '20px',
                    fontWeight: 600,
                    color: '#455570'
                  }}>Chọn tất cả</label>
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
                      fontSize: ' .875rem',
                      borderRadius: '6px 0px 0px 6px',
                      textTransform: 'none'
                    }}
                    onClick={() => setShowQuestionForm(true)}
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
                          <MenuItem onClick={() => setShowQuestionGallaryInternalModal(true)}>
                            <TeamLineIcon sx={{ mr: "12px" }} />
                            <Typography ml={"12px"} variant={"textSize13600"}>
                              Lấy từ kho nội bộ
                            </Typography>
                          </MenuItem>
                          {/* <Divider />
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
                          </MenuItem> */}
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
                        padding: "8px 12px",
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
              </View>

              <View mt={24} mb={28}>
                {
                  listQuestions.map((item, index) =>
                    <QuestionCardItemDefault
                      key={item.questionTitle}
                      index={index}
                      item={item}
                      checked={isSelected(index)}
                      showIndex={true}
                      hasRoleEdit={!item?.id}
                      hasRoleDelete={true}
                      onDelete={openDeleteQuestionModal}
                      onEdit={openEditQuestionForm}
                      onChangeSelected={() => handleSelected(item, index)}
                    />)
                }
              </View>
            </>
        }
      </View>

      {
        showQuestionForm &&
        <QuestionFormModal
          data={currentQuestion}
          show={showQuestionForm}
          onClose={handleCloseForm}
          isNotSave={true}
          handleNoSave={handleCreateEditQuestion} />
      }

      {
        showQuestionGallaryInternalModal &&
        <QuestionGallaryInternalModal
          show={showQuestionGallaryInternalModal}
          listQuestions={listQuestions}
          handleAddQuestionFromInternal={handleAddQuestionFromInternal}
          // handleViewDetail={handleOpenQuestionGallaryDetailModal}
          onClose={() => setShowQuestionGallaryInternalModal(false)} />
      }

      {
        showDeleteModal &&
        <ConfirmModal
          confirmDelete={showDeleteModal}
          title="Xác nhận xóa câu hỏi"
          subtitle={'Bạn có chắc chắn muốn xóa câu hỏi'}
          onSubmit={handlerDeleteQuestion}
          onCloseConfirmDelete={handleCloseDeleteModal}
        />
      }

      {
        itemIndexSelected.length > 0 &&
        <ListQuestionBottomNav
          open={itemIndexSelected.length > 0}
          itemSelected={itemIndexSelected}
          canEdit={!listQuestions[itemIndexSelected[0]]?.id}
          onClose={() => setItemIndexSelected([])}
          onDelete={() => openDeleteQuestionModal(null, -1)}
          onEdit={() => openEditQuestionForm(listQuestions[itemIndexSelected[0]], itemIndexSelected[0])} />
      }
    </>
  )
}

export default React.memo(ListQuestionDefault)