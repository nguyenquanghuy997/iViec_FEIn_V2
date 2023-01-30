import {
  EvaluationDeleteModal,
  EvaluationFormModal,
  EvaluationPreviewModal,
} from "../modals";
import { Avatar } from "@/components/Avatar";
import { Text, View } from "@/components/FlexStyled";
import SvgIcon from "@/components/SvgIcon";
import {
  useDeleteReviewFormMutation,
  useSetDefaultReviewFormMutation,
} from "@/sections/evaluationform";
import { TableCell, TableRow } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";

const TABLE_WIDTH = 1392;

const TABLE_ROW = [
  { id: "index", size: 74 },
  { id: "ReviewName", size: 306 },
  { id: "CreatorName", size: 208 },
  { id: "Criterias", size: 353 },
  { id: "Status", size: 153 },
  { id: "UsingTotal", size: 153 },
  { id: "action", size: 145 },
];

export const EvaluationItem = ({ data, order, onRefreshData }) => {
  const {
    ReviewId,
    ReviewName,
    CreatorName,
    Criterias = [],
    IsDefault,
    Status,
    UsingTotal = 0,
  } = data || {};

  const { enqueueSnackbar } = useSnackbar();
  const [showStar, setShowStar] = useState(false);
  const [showPreview, setPreview] = useState(false);
  const [showEdit, setEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [deleteForm] = useDeleteReviewFormMutation();
  const [setDefault] = useSetDefaultReviewFormMutation();

  const pressAuthor = () => {};

  const pressSetDefault = async () => {
    if (IsDefault || !ReviewId) return;

    await setDefault({ ReviewId }).unwrap();
    enqueueSnackbar("Đặt mẫu đánh giá mặc định thành công");
    onRefreshData();
  };

  const pressView = () => {
    setPreview(true);
  };

  const pressEdit = () => {
    setEdit(true);
  };

  const pressDelete = () => {
    setShowDelete(true);
  };

  const confirmDelete = async () => {
    if (!ReviewId) return;

    setShowDelete(false);
    await deleteForm({ ReviewId }).unwrap();
    onRefreshData();
  };

  const renderTitle = () => {
    return (
      <View
        flexRow
        atCenter
        onMouseEnter={() => setShowStar(true)}
        onMouseLeave={() => setShowStar(false)}
      >
        <Text flex1>{ReviewName}</Text>

        <View ml={12} onPress={pressSetDefault}>
          {showStar || IsDefault ? (
            <SvgIcon>
              {IsDefault
                ? '<svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.5 13.4342L3.50413 16.2307L4.61975 10.615L0.415794 6.72767L6.10159 6.05334L8.5 0.854172L10.8984 6.05334L16.5842 6.72767L12.3803 10.615L13.4959 16.2307L8.5 13.4342Z" fill="#FFA41C"/></svg>'
                : '<svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.5 13.4342L3.50413 16.2307L4.61975 10.615L0.415794 6.72767L6.10159 6.05333L8.5 0.854167L10.8984 6.05333L16.5842 6.72767L12.3803 10.615L13.4959 16.2307L8.5 13.4342ZM8.5 11.8107L11.5083 13.4944L10.8361 10.1135L13.367 7.77246L9.94359 7.36658L8.5 4.23646L7.05642 7.36729L3.63304 7.77246L6.16392 10.1135L5.49171 13.4944L8.5 11.8107Z" fill="#393B3E"/></svg>'}
            </SvgIcon>
          ) : (
            <View size={17} />
          )}
        </View>
      </View>
    );
  };

  const renderAuthor = () => {
    return (
      <View flexRow atCenter>
        <Avatar>{CreatorName}</Avatar>

        <Text ml={10} onPress={() => pressAuthor()}>
          {CreatorName}
        </Text>
      </View>
    );
  };

  const renderCriteriaItem = (item, index) => {
    if (!String(item).trim()) return null;

    return (
      <View
        pv={4}
        ph={12}
        ml={index ? 12 : 0}
        borderRadius={100}
        bgColor={"#F8F8F9"}
      >
        <Text>{item}</Text>
      </View>
    );
  };

  const renderCriteria = () => {
    return (
      <View flexRow atCenter style={{ maxWidth: 353, overflow: "scroll" }}>
        {Criterias.map?.((i) => renderCriteriaItem(i.CriteriaName))}
      </View>
    );
  };

  const renderStatus = () => {
    return (
      <View flexRow atCenter>
        <View
          mr={8}
          size={6}
          borderRadius={6}
          bgColor={Status ? "#29CB6A" : "#929292"}
        />

        <Text>{Status ? "Đang hoạt động" : "Dừng hoạt động"}</Text>
      </View>
    );
  };

  const renderAction = () => {
    return (
      <View flexRow atCenter>
        <View onPress={pressView}>
          <SvgIcon>
            {
              '<svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.50001 0.625C12.3193 0.625 15.4969 3.37333 16.1635 7C15.4976 10.6267 12.3193 13.375 8.50001 13.375C4.68067 13.375 1.50309 10.6267 0.836548 7C1.50238 3.37333 4.68067 0.625 8.50001 0.625ZM8.50001 11.9583C9.94463 11.958 11.3464 11.4673 12.4758 10.5666C13.6052 9.66582 14.3954 8.40836 14.717 7C14.3942 5.59276 13.6035 4.33667 12.4742 3.4371C11.3449 2.53753 9.9438 2.04771 8.50001 2.04771C7.05621 2.04771 5.65512 2.53753 4.52581 3.4371C3.39651 4.33667 2.6058 5.59276 2.28296 7C2.60462 8.40836 3.39482 9.66582 4.52423 10.5666C5.65365 11.4673 7.05538 11.958 8.50001 11.9583ZM8.50001 10.1875C7.65463 10.1875 6.84388 9.85167 6.2461 9.2539C5.64833 8.65613 5.31251 7.84538 5.31251 7C5.31251 6.15462 5.64833 5.34387 6.2461 4.7461C6.84388 4.14833 7.65463 3.8125 8.50001 3.8125C9.34538 3.8125 10.1561 4.14833 10.7539 4.7461C11.3517 5.34387 11.6875 6.15462 11.6875 7C11.6875 7.84538 11.3517 8.65613 10.7539 9.2539C10.1561 9.85167 9.34538 10.1875 8.50001 10.1875ZM8.50001 8.77083C8.96966 8.77083 9.42008 8.58426 9.75217 8.25217C10.0843 7.92007 10.2708 7.46965 10.2708 7C10.2708 6.53035 10.0843 6.07993 9.75217 5.74783C9.42008 5.41574 8.96966 5.22917 8.50001 5.22917C8.03035 5.22917 7.57993 5.41574 7.24784 5.74783C6.91574 6.07993 6.72917 6.53035 6.72917 7C6.72917 7.46965 6.91574 7.92007 7.24784 8.25217C7.57993 8.58426 8.03035 8.77083 8.50001 8.77083Z" fill="#393B3E"/></svg>'
            }
          </SvgIcon>
        </View>

        {!UsingTotal && (
          <View ml={12} onPress={pressEdit}>
            <SvgIcon>
              {
                '<svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.54325 11.8334L11.7272 4.64948L10.7256 3.6479L3.54167 10.8318V11.8334H4.54325ZM5.13046 13.2501H2.125V10.2446L10.2248 2.14481C10.3576 2.01202 10.5378 1.93742 10.7256 1.93742C10.9134 1.93742 11.0935 2.01202 11.2264 2.14481L13.2302 4.14869C13.363 4.28152 13.4376 4.46166 13.4376 4.64948C13.4376 4.83731 13.363 5.01744 13.2302 5.15027L5.13046 13.2501ZM2.125 14.6667H14.875V16.0834H2.125V14.6667Z" fill="#09121F"/></svg>'
              }
            </SvgIcon>
          </View>
        )}

        {!UsingTotal && (
          <View ml={12} onPress={pressDelete}>
            <SvgIcon>
              {
                '<svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.71875 4.75L4.65194 14.5485C4.72526 15.3183 5.37184 15.9062 6.14518 15.9062H10.8548C11.6282 15.9062 12.2747 15.3183 12.3481 14.5485L13.2812 4.75" stroke="#E82E25" stroke-width="1.0625" stroke-linecap="round" stroke-linejoin="round"/><path d="M2.125 4.75H5.84375M14.875 4.75H11.1562M11.1562 4.75H5.84375M11.1562 4.75V3.59375C11.1562 2.76532 10.4847 2.09375 9.65625 2.09375H7.34375C6.51532 2.09375 5.84375 2.76532 5.84375 3.59375V4.75" stroke="#E82E25" stroke-width="1.0625" stroke-linecap="round" stroke-linejoin="round"/><path d="M10.0938 7.40625L9.82813 13.25M7.17188 13.25L6.90625 7.40625" stroke="#E82E25" stroke-width="1.0625" stroke-linecap="round" stroke-linejoin="round"/></svg>'
              }
            </SvgIcon>
          </View>
        )}
      </View>
    );
  };

  const renderValue = (item) => {
    switch (item.id) {
      case "index":
        return order + 1;
      case "ReviewName":
        return renderTitle();
      case "CreatorName":
        return renderAuthor();
      case "Criterias":
        return renderCriteria();
      case "Status":
        return renderStatus();
      case "UsingTotal":
        return `${UsingTotal} tin`;
      case "action":
        return renderAction();
    }
    return data[item.id];
  };

  return (
    <TableRow>
      {TABLE_ROW.map((item) => (
        <TableCell
          align="center"
          width={Math.floor((item.size / TABLE_WIDTH) * 100) + "%"}
        >
          {renderValue(item)}
        </TableCell>
      ))}

      <EvaluationPreviewModal
        data={data}
        show={showPreview}
        setShow={setPreview}
        onEdit={pressEdit}
        onDelete={pressDelete}
        onRefreshData={onRefreshData}
      />

      <EvaluationFormModal
        data={data}
        show={showEdit}
        setShow={setEdit}
        onRefreshData={onRefreshData}
      />

      <EvaluationDeleteModal
        data={data}
        showDelete={showDelete}
        pressDelete={confirmDelete}
        setShowDelete={setShowDelete}
      />
    </TableRow>
  );
};
