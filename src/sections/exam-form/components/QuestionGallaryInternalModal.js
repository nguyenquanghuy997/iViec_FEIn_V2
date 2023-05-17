import EmptyIcon from '@/assets/EmptyIcon'
import { ButtonDS } from '@/components/DesignSystem'
import { View, Text } from '@/components/DesignSystem/FlexStyled'
import Iconify from '@/components/Iconify'
import SvgIcon from '@/components/SvgIcon'
import { FormProvider, RHFTextField } from '@/components/hook-form'
import { DOMAIN_SERVER_API } from '@/config'
import { useDebounce } from '@/hooks/useDebounce'
import { useLazyGetQuestionGroupQuery } from '@/sections/exam/ExamSlice'
import { ButtonIcon } from '@/utils/cssStyles'
import { Avatar, CircularProgress, Dialog, Divider, InputAdornment } from '@mui/material'
import moment from 'moment'
import React from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

function QuestionGallaryInternalModal({ show, onClose, handleViewDetail }) {

  const [getQuestionGroup, { isLoading, data: { items = [] } = {} }] =
    useLazyGetQuestionGroupQuery();

  const list = Array.isArray(items) ? items : [];

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      searchKey: "",
    },
  });

  const { handleSubmit } = methods;

  const searchKey = useDebounce(methods.watch("searchKey"), 500);

  useEffect(() => {
    if(show)
      getQuestionGroup({ searchKey });
  }, [searchKey, show])

  const renderItem = (data) => {
    const renderInfoItem = (icon, title, value) => {
      return (
        <>
          <SvgIcon>{icon}</SvgIcon>
          <Text ml={10} fontsize={14} fontweight={"400"} color={"#5C6A82"}>
            {title}
          </Text>

          <Text ml={8} fontsize={14} fontweight={"500"} color={"#5C6A82"}>
            {value}
          </Text>
        </>
      );
    };

    const renderInfoSpace = () => {
      return <View mh={20} width={1} height={12} bgcolor={"#A2AAB7"} />;
    };

    return <View
      key={data.id}
      pv={16}
      mt={16}
      ph={20}
      borderwidth={1}
      borderradius={4}
      bordercolor={'#E7E9ED'}
      bgcolor={"#FDFDFD"}
      flexrow={'true'}
      jcbetween={'true'}
      atcenter={'true'}
    >
      <View>
        <View flexrow={'true'} atstart={'true'}>
          <View flex={'true'}>
            <Text fontsize={16} fontweight={"600"} color={"#455570"}>
              {data.name}
            </Text>

            <Text
              hidden
              mt={4}
              fontsize={13}
              fontweight={"400"}
              color={"#455570"}
              width={"auto"}
              style={{ "maxHeight": "16.25px" }}
            >
              {data.description}
            </Text>

            <View flexrow={'true'} atcenter={'true'} mt={12}>
              {renderInfoItem(
                '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.33333 2.66665H14V3.99998H5.33333V2.66665ZM2 2.33331H4V4.33331H2V2.33331ZM2 6.99998H4V8.99998H2V6.99998ZM2 11.6666H4V13.6666H2V11.6666ZM5.33333 7.33331H14V8.66665H5.33333V7.33331ZM5.33333 12H14V13.3333H5.33333V12Z" fill="#5C6A82"/></svg>',
                "Số câu hỏi:",
                data.questions.length
              )}
              {renderInfoSpace()}

              {renderInfoItem(
                '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.99967 14.6666C4.31767 14.6666 1.33301 11.682 1.33301 7.99998C1.33301 4.31798 4.31767 1.33331 7.99967 1.33331C11.6817 1.33331 14.6663 4.31798 14.6663 7.99998C14.6663 11.682 11.6817 14.6666 7.99967 14.6666ZM7.99967 13.3333C9.41416 13.3333 10.7707 12.7714 11.7709 11.7712C12.7711 10.771 13.333 9.41447 13.333 7.99998C13.333 6.58549 12.7711 5.22894 11.7709 4.22874C10.7707 3.22855 9.41416 2.66665 7.99967 2.66665C6.58519 2.66665 5.22863 3.22855 4.22844 4.22874C3.22824 5.22894 2.66634 6.58549 2.66634 7.99998C2.66634 9.41447 3.22824 10.771 4.22844 11.7712C5.22863 12.7714 6.58519 13.3333 7.99967 13.3333ZM7.33501 10.6666L4.50634 7.83798L5.44901 6.89531L7.33501 8.78131L11.1057 5.00998L12.049 5.95265L7.33501 10.6666Z" fill="#5C6A82"/></svg>',
                "Trắc nghiệm:",
                data.questions.filter((i) => i.questionType !== 2).length
              )}
              {renderInfoSpace()}

              {renderInfoItem(
                '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.3333 1.33331C13.7013 1.33331 14 1.63198 14 1.99998V4.50465L12.6667 5.83798V2.66665H3.33333V13.3333H12.6667V11.4946L14 10.1613V14C14 14.368 13.7013 14.6666 13.3333 14.6666H2.66667C2.29867 14.6666 2 14.368 2 14V1.99998C2 1.63198 2.29867 1.33331 2.66667 1.33331H13.3333ZM14.5187 5.87198L15.4613 6.81465L10.276 12L9.332 11.9986L9.33333 11.0573L14.5187 5.87198ZM8.66667 7.99998V9.33331H5.33333V7.99998H8.66667ZM10.6667 5.33331V6.66665H5.33333V5.33331H10.6667Z" fill="#5C6A82"/></svg>',
                "Tự luận:",
                data.questions.filter((i) => i.questionType === 2).length
              )}
            </View>
          </View>
        </View>

        <View flexrow={'true'} atcenter={'true'} mt={24}>
          <Avatar
            src={`${DOMAIN_SERVER_API}/file/GetFile?filePath=${data.createdUserInFo.avatar}`}
            sx={{ width: 20, height: 20 }}
          />

          <Text ml={4} fontsize={12} color={"#172B4D"}>
            {data.createdUserInFo.fullName}
          </Text>

          <Text ml={4} fontsize={12} color={"#5C6A82"}>
            {`đã tạo ngày ${moment(data.createdTime).format("DD/MM/YYYY")}`}
          </Text>
        </View>
      </View>

      <View>
        <ButtonIcon
          onClick={() => handleViewDetail(data)}
          icon={
            <Iconify
              icon="ic:baseline-arrow-circle-right"
              width={20}
              height={20}
              color="#1976D2"
            />
          }
        />
      </View>
    </View>
  }

  return (
    <Dialog
      fullWidth
      maxWidth='lg'
      open={show}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiPaper-root": {
          top: "0 !important",
          padding: "0 !important",
          borderRadius: "6px !important",
          minHeight: 'calc(100% - 64px)'
        },
      }}
    >
      {/* header */}
      <View
        flexrow="true"
        atcenter="center"
        jcbetween="true"
        pv={12}
        ph={24}
        bgcolor={"#FDFDFD"}
      >
        <Text flex="true" fontsize={16} fontweight={"600"}>
          {"Thêm câu hỏi từ thư viện câu hỏi nội bộ"}
        </Text>
        <ButtonDS
          type="button"
          sx={{
            backgroundColor: "#fff",
            boxShadow: "none",
            ":hover": {
              backgroundColor: "#EFF3F7",
            },
            textTransform: "none",
            padding: "12px",
            minWidth: "unset",
          }}
          onClick={onClose}
          icon={
            <Iconify
              icon={"mi:close"}
              width={20}
              height={20}
              color="#5C6A82"
            />
          }
        />
      </View>
      <Divider />

      {/* body */}

      <View flex="true" ph={16} pv={24}
        style={{
          overflowY: "scroll",
          backgroundColor: "#F2F4F5",
          minHeight: 'calc(100vh - 64px -68px -68px) !important'
        }}>
        <FormProvider methods={methods} onSubmit={handleSubmit}>
          <View flexrow={'true'} atcenter={'true'} jcbetween={'true'} mb={8}>
            <Text color={'#455570'} fontsize={16} fontweight={600}>Danh sách nhóm câu hỏi</Text>

            <RHFTextField
              name="searchKey"
              placeholder="Tìm kiếm theo nhóm câu hỏi..."
              sx={{
                width: "360px",
                backgroundColor: '#FDFDFD',
                borderRadius: '6px',
                '.MuiInput-root': {
                  border: 'none'
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ ml: 1.5 }}>
                    <Iconify
                      icon={"eva:search-fill"}
                      sx={{ color: "text.disabled", width: 20, height: 20 }}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </View>
        </FormProvider>

        <View flex1='true'>
          {list.length ? (
            list.map(renderItem)
          ) : (
            <View allcenter={'true'} pt={64}>
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
      </View>
    </Dialog>
  )
}

export default React.memo(QuestionGallaryInternalModal)