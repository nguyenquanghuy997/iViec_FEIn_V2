import {
  useDeleteReviewFormMutation,
  useGetAllReviewFormQuery,
  useUpdateStatusReviewFormMutation,
} from "../evaluationFormSlice";
import { EvaluationFormModal } from "../modals/EvaluationFormModal";
import EvaluationItemBlock from "./EvaluationItemBlock";
import ActiveModal from "@/components/BaseComponents/ActiveModal";
import DeleteModal from "@/components/BaseComponents/DeleteModal";
import FormHeader from "@/sections/emailform/component/FormHeader";
import { Box } from "@mui/material";
import { useSnackbar } from "notistack";
import React, {useMemo, useState} from "react";
import {PERMISSIONS, TBL_FILTER_TYPE} from "@/config";
import {API_GET_ORGANIZATION_USERS} from "@/routes/api";
import {LIST_STATUS} from "@/utils/formatString";
import {isEmpty as _isEmpty} from "lodash";
import {useRouter} from "next/router";
import TableHeader from "@/components/BaseComponents/table/TableHeader";
import useRole from "@/hooks/useRole";
import LoadingScreen from "@/components/LoadingScreen";

const columns = [
  {
    dataIndex: "createdTime",
    title: "Ngày tạo",
    colFilters: {
      type: TBL_FILTER_TYPE.RANGE_DATE,
      name: ['StartTime', 'EndTime'],
      placeholder: 'Chọn ngày',
    },
  },
  {
    dataIndex: "creatorName",
    title: "Người tạo",
    colFilters: {
      type: TBL_FILTER_TYPE.SELECT_CHECKBOX,
      name: "CreatorIds",
      placeholder: "Chọn 1 hoặc nhiều người",
      remoteUrl: API_GET_ORGANIZATION_USERS,
      showAvatar: true
    },
  },
  {
    dataIndex: "IsActivated",
    title: "Trạng thái",
    colFilters: {
      type: TBL_FILTER_TYPE.SELECT,
      placeholder: 'Tất cả',
      options: LIST_STATUS.map(item => ({ value: item.value, label: item.name }),)
    }
  }
]

const EvaluationItem = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { canAccess } = useRole();
  const router = useRouter();
  const { query = { PageIndex: 1, PageSize: 10 }, isReady } = router;

  const {data: {items: Data = []} = {}, isLoading} = useGetAllReviewFormQuery(query, { skip: !isReady });
  const [status] = useUpdateStatusReviewFormMutation();
  const canEdit = useMemo(() => canAccess(PERMISSIONS.CRUD_EVA_TPL), []);

  const [item, setItem] = useState(null);
  const [showConfirmMultiple, setShowConfirmMultiple] = useState(false);
  const [typeConfirmMultiple, setTypeConfirmMultiple] = useState("");

  const handleOpenModel = (event, data, type) => {
    event.stopPropagation();
    setTypeConfirmMultiple(type);
    setShowConfirmMultiple(true);
    setItem(data);
  };

  const handleCloseModel = () => {
    setShowConfirmMultiple(false);
    setItem(null);
  };

  const onSubmitFilter = (values = {}, reset = false, timeout = 1) => {
    if (reset && _isEmpty(router.query)) {
      return;
    }

    setTimeout(() => {
      router.push({
        query: reset ? {} : { ...router.query, ...values },
      }, undefined, { shallow: false });
    }, timeout);
  }

  const handleChangeStatus = async (item) => {
    try {
      const data = {
        ids: [item.id],
        isActivated: !item.isActive,
      };
      await status(data).unwrap();
      enqueueSnackbar("Chuyển trạng thái thành công !");
      handleCloseModel();
    } catch (err) {
      enqueueSnackbar("Chuyển trạng thái thất bại !", {
        autoHideDuration: 1000,
        variant: "error",
      });
    }
  };
  const [deletes] = useDeleteReviewFormMutation();

  const handleDelete = async (item) => {
    try {
      await deletes({ ids: [item?.id] }).unwrap();
      enqueueSnackbar("Thực hiện thành công !");
      handleCloseModel();
    } catch (err) {
      enqueueSnackbar("Thực hiện thất bại !", {
        autoHideDuration: 1000,
        variant: "error",
      });
    }
  };

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <>
      <Box>
        <FormHeader
          title="Mẫu đánh giá"
          buttonTitle="Thêm mẫu đánh giá"
          showButton={false}
        />
        <Box sx={{mb: 2}}>
          <TableHeader
              columns={columns}
              onSubmitFilter={onSubmitFilter}
              onClickCreate={(e) => handleOpenModel(e,null,"form")}
              createText={canEdit && 'Thêm mẫu đánh giá'}
              isInside={true}
          />
        </Box>
        {Data.map((column, index) => {
          return (
            <EvaluationItemBlock
              key={index}
              index={index}
              item={column}
              onOpenModel={handleOpenModel}
            />
          );
        })}
      </Box>
      {showConfirmMultiple && typeConfirmMultiple?.includes("status") && (
        <ActiveModal
          showConfirmMultiple={showConfirmMultiple}
          onClose={handleCloseModel}
          isActivated={item.isActive}
          title={"mẫu đánh giá"}
          handleSave={() => handleChangeStatus(item)}
        />
      )}
      {showConfirmMultiple && typeConfirmMultiple?.includes("delete") && (
        <DeleteModal
          showConfirmMultiple={showConfirmMultiple}
          onClose={handleCloseModel}
          title={"mẫu đánh giá"}
          handleSave={() => handleDelete(item)}
        />
      )}
      {showConfirmMultiple && typeConfirmMultiple?.includes("form") && (
        <EvaluationFormModal
          show={showConfirmMultiple}
          onClose={handleCloseModel}
          id={item?.id}
        />
      )}
    </>
  );
};

export default EvaluationItem;
