import { CheckboxIconChecked, CheckboxIconDefault } from "@/assets/CheckboxIcon"
import { Checkbox, Divider, Typography, Button, ButtonGroup, ClickAwayListener, MenuItem, MenuList } from "@mui/material"
import QuestionCardItemDefault from "./QuestionCardItemDefault"
import { DownloadLineIcon, ImportLinkIcon, TeamLineIcon } from "@/assets/ActionIcon";
import { LightTooltip } from "@/components/DesignSystem/TooltipHtml";

import React from 'react'
import { useState } from 'react';
import Iconify from '@/components/Iconify';
import NoQuestion from './NoQuestion';
import { QuestionFormModal } from '@/sections/exam/components/QuestionFormModal';
import ConfirmModal from '@/sections/emailform/component/ConfirmModal';
import { View } from "@/components/DesignSystem/FlexStyled";
import QuestionGallaryInternalModal from "./QuestionGallaryInternalModal";
import QuestionGallaryDetailModal from "./QuestionGallaryDetailModal";
import { useSnackbar } from "notistack";
import ListQuestionBottomNav from "./ListQuestionBottomNav";

function ListQuestionDefault({ listQuestions, updateListQuestion }) {

  const { enqueueSnackbar } = useSnackbar();

  const [openGroup, setOpenGroup] = useState(false);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showQuestionGallaryInternalModal, setShowQuestionGallaryInternalModal] = useState(false);
  const [showQuestionGallaryDetailModal, setShowQuestionGallaryDetailModal] = useState(false);
  const [currentIndexQuestion, setCurrentIndexQuestion] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionGallary, setQuestionGallary] = useState(null);
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
    setCurrentIndexQuestion(-1)
    setCurrentQuestion(null)
    setShowQuestionForm(false)
  }

  const handleCloseDeleModal = () => {
    setCurrentIndexQuestion(-1)
    setCurrentQuestion(null)
    setShowDeleteModal(false)
  }

  /**
   * Hàm xử lý sự kiện thêm hoặc sửa câu hỏi
   * @param {*} data 
   */
  const handleCreateEditQuestion = (data) => {
    //create
    if (currentIndexQuestion == -1) {
      // check duplicate
      if (listQuestions.find(x => x.questionTitle == data.questionTitle)) {
        enqueueSnackbar("Câu hỏi đã tồn tại trong đề thi", {
          variant: 'error'
        })
        return;
      }
      listQuestions.push(data);
    }
    //edit
    else {
      // check duplicate
      if (listQuestions.find((x, index) => x.questionTitle == data.questionTitle && index != currentIndexQuestion)) {
        enqueueSnackbar("Câu hỏi đã tồn tại trong đề thi", {
          variant: 'error'
        })
        return;
      }
      listQuestions[currentIndexQuestion] = data;
      // setListData([...listData])
    }

    updateListQuestion(listQuestions)

    setShowQuestionForm(false)
    // reset choose index && data
    setCurrentQuestion(null)
    setCurrentIndexQuestion(-1)
  }

  const handleAddQuestionFromInternal = (datas) => {
    // loc nhung items da them vao danh sach
    updateListQuestion([...listQuestions, ...datas])
    setShowQuestionGallaryDetailModal(false)
  }

  const handlerDeleteQuestion = () => {
    listQuestions.splice(currentIndexQuestion, 1)
    // setListData([...listData])
    updateListQuestion(listQuestions)

    setShowDeleteModal(false)
    setCurrentIndexQuestion(-1)
  }


  const openEditQuestionForm = (item, index) => {
    setCurrentIndexQuestion(index)
    setCurrentQuestion(item)
    setShowQuestionForm(true);
  }

  const openDeleteQuestionModal = (index) => {
    setCurrentIndexQuestion(index)
    setShowDeleteModal(true)
  }

  const handleViewQuestionGallaryDetail = (questionGallary) => {
    setQuestionGallary(questionGallary)
    setShowQuestionGallaryDetailModal(true)
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
                    // onChange={pressCheckbox}
                    icon={<CheckboxIconDefault />}
                    checkedIcon={<CheckboxIconChecked />}
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
                          <Divider />
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
                      key={index}
                      index={index}
                      item={item}
                      hasRoleEdit={!item.id}
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

      <QuestionFormModal
        data={currentQuestion}
        show={showQuestionForm}
        onClose={handleCloseForm}
        isNotSave={true}
        handleNoSave={handleCreateEditQuestion} />

      <QuestionGallaryInternalModal
        show={showQuestionGallaryInternalModal}
        handleViewDetail={handleViewQuestionGallaryDetail}
        onClose={() => setShowQuestionGallaryInternalModal(false)} />

      <QuestionGallaryDetailModal
        listQuestions={listQuestions?.filter(x => x.id)}
        show={showQuestionGallaryDetailModal}
        handleAddQuestionFromInternal={handleAddQuestionFromInternal}
        onClose={() => setShowQuestionGallaryDetailModal(false)}
        questionGallary={questionGallary} />

      <ConfirmModal
        confirmDelete={showDeleteModal}
        title="Xác nhận xóa câu hỏi"
        subtitle={'Bạn có chắc chắn muốn xóa câu hỏi'}
        onSubmit={handlerDeleteQuestion}
        onCloseConfirmDelete={handleCloseDeleModal}
      />

      <ListQuestionBottomNav
        open={itemIndexSelected.length > 0}
        itemSelected={itemIndexSelected}
        onEdit={() => openEditQuestionForm(listQuestions[itemIndexSelected[0]], itemIndexSelected[0])} />
    </>
  )
}

export default React.memo(ListQuestionDefault)