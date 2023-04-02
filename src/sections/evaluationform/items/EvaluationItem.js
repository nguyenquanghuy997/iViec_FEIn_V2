import EvaluationFormHeader from "../EvaluationFormHeader";
import {
  useDeleteReviewFormMutation,
  useGetAllReviewFormQuery,
  useUpdateStatusReviewFormMutation,
} from "../evaluationFormSlice";
import EvaluationFilterModal from "../modals/EvaluationFilterModal";
import { EvaluationFormModal } from "../modals/EvaluationFormModal";
import EvaluationItemBlock from "./EvaluationItemBlock";
import ActiveModal from "@/components/BaseComponents/ActiveModal";
import DeleteModal from "@/components/BaseComponents/DeleteModal";
import FormHeader from "@/sections/emailform/component/FormHeader";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

// data
// const data = [
//   {
//     id: 1,
//     title: "Mặc định",
//     subtitle: "(Đã gửi 12)",
//     user: "Đinh Tiến Thành",
//     isActive: true,
//     createdDate: "17/02/2023",
//     reviewFormCriterias: [
//       {
//         name: "Ngoại hình",
//         description: "Cao trên 1m70, ngoại hình cần ưa nhìn, nhanh nhẹn",
//         isRequired: true,
//       },
//       {
//         name: "Học vấn",
//         description:
//           "Cao trên 1m70, ngoại hình cần ưa nhìn, nhanh nhẹn Cao trên 1m70, ngoại hình cần ưa nhìn, nhanh nhẹn",
//         isRequired: true,
//       },
//       {
//         name: "Kinh nghiệm làm việc",
//         description:
//           "Cao trên 1m70, Cao trên 1m70,Cao trên 1m70,Cao trên 1m70,",
//         isRequired: false,
//       },
//       {
//         name: "Kỹ năng",
//         description: "Biết lập trình, biết nói",
//         isRequired: false,
//       },
//       {
//         name: "Thái độ",
//         description: "ChĂM CHỈ, cần cù",
//         isRequired: true,
//       },
//     ],
//   },
//   {
//     id: 2,
//     title: "Mẫu email mời nhận việc 1",
//     subtitle: "(Đã gửi 12)",
//     user: "Đinh Tiến Thành",
//     isActive: true,
//     createdDate: "17/02/2023",
//   },
//   {
//     id: 3,
//     title: "Mẫu email mời nhận việc 2",
//     subtitle: "(Đã gửi 12)",
//     user: "Đinh Tiến Thành",
//     isActive: false,
//     createdDate: "17/02/2023",
//   },
//   {
//     id: 4,
//     title: "Mẫu email mời nhận việc 3",
//     subtitle: "(Đã gửi 12)",
//     user: "Đinh Tiến Thành",
//     isActive: false,
//     createdDate: "17/02/2023",
//   },
//   {
//     id: 5,
//     title: "Mẫu email mời nhận việc 4",
//     subtitle: "(Đã gửi 12)",
//     user: "Đinh Tiến Thành",
//     isActive: true,
//     createdDate: "17/02/2023",
//   },
//   {
//     id: 5,
//     title: "Mẫu email mời nhận việc 5",
//     subtitle: "(Đã gửi 12)",
//     user: "Đinh Tiến Thành",
//     isActive: false,
//     createdDate: "17/02/2023",
//   },
// ];

const defaultValues = {
  searchKey: "",
};
const EvaluationItem = () => {
  const { enqueueSnackbar } = useSnackbar();
  // const [Data] = useState([...data]);
  const {data: {items: Data = []} = {}} = useGetAllReviewFormQuery();
  const [status] = useUpdateStatusReviewFormMutation();

  const [expands, setExpands] = useState(Array(Data.length).fill(false));

  // const [selected, setSelected] = useState(
  //   Array(Data.length).fill(false)
  // );
  // const [selectedValue, setSelectedValue] = useState(
  //   Array(Data.length).fill({ checked: false })
  // );

  // modal
  const [item, setItem] = useState(null);
  const [showConfirmMultiple, setShowConfirmMultiple] = useState(false);
  const [typeConfirmMultiple, setTypeConfirmMultiple] = useState("");
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  const handleOpenFilterForm = () => {
    setIsOpenFilter(true);
  };
  const handleCloseFilterForm = () => {
    setIsOpenFilter(false);
  };

  // form search
  const Schema = Yup.object().shape({
    search: Yup.string(),
  });

  const methods = useForm({
    mode: "onChange",
    defaultValues: { ...defaultValues },
    resolver: yupResolver(Schema),
  });

  const { handleSubmit } = methods;

  // expand card item
  const handleChangeExpand = (index) => {
    const expandsNext = [...expands].map((item, idx) =>
      idx === index ? !item : item
    );
    setExpands(expandsNext);
  };
  // const handleSelected = (data, index) => {
  //   const selectedNext = [...selected].map((i, idx) =>
  //     idx === index ? !i : i
  //   );
  //   const selectedValueNext = [...selectedValue].map((i, idx) =>
  //     idx === index
  //       ? { ...i, checked: !i.checked }
  //       : {
  //           ...i,
  //           checked: i.checked,
  //         }
  //   );
  //   setSelected(selectedNext);
  //   setSelectedValue(selectedValueNext);
  // };

  const handleOpenModel = (data, type) => {
    setTypeConfirmMultiple(type);
    setShowConfirmMultiple(true);
    setItem(data);
  };

  const handleCloseModel = () => {
    setShowConfirmMultiple(false);
    setItem(null);
  };

  const handleChangeStatus = async (item) => {
    try {
      const data = {
        ids: [item.id],
        isActive: !item.isActive,
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
  return (
    <>
      <Box>
        <FormHeader
          title="Mẫu đánh giá"
          buttonTitle="Thêm mẫu đánh giá"
          showButton={false}
        />
        <EvaluationFormHeader
          methods={methods}
          handleSubmit={handleSubmit}
          onOpenFilterForm={handleOpenFilterForm}
          onCloseFilterForm={handleCloseFilterForm}
          onOpenForm={handleOpenModel}
        />
        {Data.map((column, index) => {
          return (
            <EvaluationItemBlock
              // isCheckbox
              key={index}
              index={index}
              item={column}
              expanded={expands[index]}
              // checked={selectedValue[index].checked}
              // onChangeSelected={() => handleSelected(column, index)}
              onChangeExpand={() => handleChangeExpand(index)}
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
      {isOpenFilter && (
        <EvaluationFilterModal
          isOpen={isOpenFilter}
          onClose={handleCloseFilterForm}
          onSubmit={handleCloseFilterForm}
        />
      )}
    </>
  );
};

export default EvaluationItem;
