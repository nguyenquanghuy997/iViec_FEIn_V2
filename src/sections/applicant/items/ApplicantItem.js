import React, { useState } from "react";
import { View } from "@/components/FlexStyled";
import { Table } from "antd";
import ReactDragListView from "react-drag-listview";
// import { calculateColumnsWidth } from "./DynamicColumnsHelper";
const data = [
  {
    id: 1,
    title: "Lorem Ipsum",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    date: "2019-30-09",
    excerpt:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    author: "Some author",
    url: "http://www.lipsum.com",
    fixed1: "-",
    fixed2: "-"
  },
  {
    id: 2,
    title: "Neque porro quisquam",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page.",
    date: "2019-29-09",
    excerpt:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
    author: "Some author",
    url: "http://www.lipsum.com",
    fixed1: "-",
    fixed2: "-"
  },
  {
    id: 3,
    title: "All the Lorem Ipsum",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
    date: "2019-28-09",
    excerpt:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
    author: "Some author",
    url: "http://www.lipsum.com",
    fixed1: "-",
    fixed2: "-"
  },
  {
    id: 4,
    title: "Lorem Ipsum",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    date: "2019-30-09",
    excerpt:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    author: "Some author",
    url: "http://www.lipsum.com",
    fixed1: "-",
    fixed2: "-"
  },
  {
    id: 5,
    title: "Neque porro quisquam",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page.",
    date: "2019-29-09",
    excerpt:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
    author: "Some author",
    url: "http://www.lipsum.com",
    fixed1: "-",
    fixed2: "-"
  },
  {
    id: 6,
    title: "All the Lorem Ipsum",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
    date: "2019-28-09",
    excerpt:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
    author: "Some author",
    url: "http://www.lipsum.com",
    fixed1: "-",
    fixed2: "-"
  },
  {
    id: 7,
    title: "Lorem Ipsum",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    date: "2019-30-09",
    excerpt:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    author: "Some author",
    url: "http://www.lipsum.com",
    fixed1: "-",
    fixed2: "-"
  },
  {
    id: 8,
    title: "Neque porro quisquam",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page.",
    date: "2019-29-09",
    excerpt:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
    author: "Some author",
    url: "http://www.lipsum.com",
    fixed1: "-",
    fixed2: "-"
  },
  {
    id: 9,
    title: "All the Lorem Ipsum",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
    date: "2019-28-09",
    excerpt:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
    author: "Some author",
    url: "http://www.lipsum.com",
    fixed1: "-",
    fixed2: "-"
  }
];

export const ApplicantItem = () => {
  const [columns, setColumns] = useState([
  { dataIndex: "id", title: "STT" ,fixed: "left" },
  { dataIndex: "title", title: "Họ và tên" ,fixed: "left"},
  { dataIndex: "description", title: "SĐT" },
  { dataIndex: "date", title: "Ngày sinh" },
  { dataIndex: "excerpt", title: "Email" },
  { dataIndex: "author", title: "tin tuyển dụng" },
  { dataIndex: "url", title: "Bước tuyển dụng" },
  { dataIndex: "fixed1", title: "Fixed 1", fixed: "right" },
  ]);
  const dragProps = {
    onDragEnd(fromIndex, toIndex) {
      console.log(`dragged from ${fromIndex} to ${toIndex}`);
      const newColumns = [...columns];
      const item = newColumns.splice(fromIndex, 1)[0];
      newColumns.splice(toIndex, 0, item);
      setColumns(newColumns);
    },
    nodeSelector: "th"
  };
  // const maxWidthPerCell = 2000;
  const tableHeight = 1800;
  const rowKey = "id";
  // const dataTable = calculateColumnsWidth(columns, data, maxWidthPerCell);
  return (
    <View pv={20} ph={24}>
    <ReactDragListView.DragColumn {...dragProps}>
    <Table columns={columns} 
        dataSource={data}
        rowKey={rowKey}
        scroll={{ x: 3000, y: tableHeight }}
    />
    </ReactDragListView.DragColumn>
    </View>
  );
};
