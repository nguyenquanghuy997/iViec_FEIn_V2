import Iconify from "@/components/Iconify";

export const  columns = [
    {
        dataIndex: "1",
        name: "units",
        type: "select",
        multiple: true,
        placeholder: "Chọn một hoặc nhiều đơn vị",
        label: "Đơn vị",
        options: [
            {id: 1, name: "Tên đơn vị 1"},
            {id: 2, name: "Tên đơn vị 2"},
            {id: 3, name: "Tên đơn vị 3"},
            {id: 4, name: "Tên đơn vị 4"},
            {id: 5, name: "Tên đơn vị 5"},
            {id: 6, name: "Tên đơn vị 6"},
        ]
    },
    {
        dataIndex: "2",
        name: "newsRecruitment",
        type: "select",
        multiple: true,
        placeholder: "Chọn một hoặc nhiều tin tuyển dụng",
        label: "Tin tuyển dụng",
        options: [
            {id: 1, name: "Tin tuyển dụng 1"},
            {id: 2, name: "Tin tuyển dụng 2"},
            {id: 3, name: "Tin tuyển dụng 3"},
        ]
    },
    {
        dataIndex: "3",
        name: "dateApply", type: "date", between: true,  label: "Ngày ứng tuyển", placeholder: "",
        children: [
            {
                name: "startDateApply",
                type: 'date',
                placeholder: "Chọn ngày",
                startIcon: <span>Từ</span>,
                endIcon: <Iconify icon="material-symbols:calendar-today"/>
            },
            {
                name: "endDateApply",
                type: 'date',
                placeholder: "Chọn ngày",
                startIcon: <span>Đến</span>,
                endIcon: <Iconify icon="material-symbols:calendar-today"/>
            }
        ]
    },
    {
        dataIndex: "4",
        name: "steps", label: "Bước tuyển dụng", placeholder: "Chọn một hoặc nhiều bước tuyển dụng",
        type: "select",
        multiple: true,
        options: [
            {id: 1, name: "Bước tuyển dụng 1"},
            {id: 2, name: "Bước tuyển dụngg 2"},
            {id: 3, name: "Bước tuyển dụng 3"},
        ]
    },
    {
        dataIndex: "5",
        name: "sources", label: "Nguồn", placeholder: "Chọn 1 hoặc nhiều nguồn",
        type: "select",
        multiple: true,
        options: [
            {id: 1, name: "Nguồn 1"},
            {id: 2, name: "Nguồn 2"},
            {id: 3, name: "Nguồn 3"},
        ]
    },
    {
        dataIndex: "6",
        name: "hrs", label: "Cán bộ tuyển dụng", placeholder: "Chọn 1 hoặc nhiều cán bộ",
        type: "select",
        multiple: true,
        options: [
            {id: 1, name: "Cán bộ 1"},
            {id: 2, name: "Cán bộ 2"},
            {id: 3, name: "Cán bộ 3"},
        ]
    },
    {
        dataIndex: "7",
        name: "createdBy", label: "Người tạo ứng viên", placeholder: "Chọn 1 hoặc nhiều người",
        type: "select",
        multiple: true,
        options: [
            {id: 1, name: "Người tạo 1"},
            {id: 2, name: "Người tạo 2"},
            {id: 3, name: "Người tạo 3"},
        ]
    },
    {
        dataIndex: "8",
        name: "group", label: "Hội đồng tuyển dụng", placeholder: "Chọn 1 hoặc nhiều cán bộ",
        type: "select",
        multiple: true,
        options: [
            {id: 1, name: "Hội đồng 1"},
            {id: 2, name: "Hội đồng 2"},
            {id: 3, name: "Hội đồng 3"},
        ]
    },
    {
        dataIndex: "9",
        name: "career", label: "Ngành nghề", placeholder: "Chọn 1 hoặc nhiều ngành nghề",
        type: "select",
        multiple: true,
        options: [
            {id: 1, name: "Ngành nghề 1"},
            {id: 2, name: "Ngành nghề 2"},
            {id: 3, name: "Ngành nghề 3"},
        ]
    },
    {
        dataIndex: "10",
        name: "experienceNumber",
        type: "select",
        multiple: false,
        placeholder: "Chọn số năm kinh nghiệm",
        label: "Số năm kinh nghiệm",
        options: [
            {id: 1, name: "1 năm"},
            {id: 2, name: "2 năm"},
            {id: 3, name: "3 năm"},
            {id: 4, name: "4 năm"},
            {id: 5, name: "5 năm"},
        ]
    },
    {
        dataIndex: "11",
        name: "skills", label: "Kỹ năng", placeholder: "Chọn 1 hoặc nhiều kỹ năng",
        type: "select",
        multiple: true,
        options: [
            {id: 1, name: "Kỹ năng 1"},
            {id: 2, name: "Kỹ năng 2"},
            {id: 3, name: "Kỹ năng 3"},
        ]
    },
    {dataIndex: "12", name: "experience", type: "text", placeholder: "Tìm kiếm...", label: "Kinh nghiệm làm việc"},
    {dataIndex: "13", name: "education", type: "text", placeholder: "Tìm kiếm...", label: "Học vấn"},
    {
        dataIndex: "14",
        name: "workAddress", label: "Nơi làm việc mong muốn", placeholder: "Chọn 1 hoặc nhiều Tỉnh/Thành phố",
        type: "select",
        multiple: true,
        options: [
            {id: 1, name: "Thành phố 1"},
            {id: 2, name: "Thành phố 2"},
            {id: 3, name: "Thành phố 3"},
        ]
    },
    {
        dataIndex: "15",
        name: "salary", placeholder: "", label: "Mức lương mong muốn",
        children: [
            {
                name: "startSalary",
                type: 'text',
                placeholder: "Nhập số tiền",
                startIcon: <span>Từ</span>,
                endIcon: <span>VNĐ</span>
            },
            {
                name: "endSalary",
                type: 'text',
                placeholder: "Nhập số tiền",
                startIcon: <span>Đến</span>,
                endIcon: <span>VNĐ</span>
            }
        ]
    },
    {
        dataIndex: "16",
        name: "gender",
        type: "radio",
        label: "Giới tính",
        placeholder: "",
        options: [{label: 'Nam', value: "1"}, {label: 'Nữ', value: "0"}, {label: 'Khác', value: "2"}]
    },
    {
        dataIndex: "17",
        name: "married", type: "select", label: "Tình trạng hôn nhân", options: [
            {id: 1, name: "Đã kết hôn"},
            {id: 2, name: "Chưa kết hôn"},
        ]
    },
    {
        dataIndex: "18",
        name: "height", label: "Chiều cao", children: [
            {
                name: "startHeight",
                type: 'number',
                placeholder: "Nhập chiều cao",
                startIcon: <span>Từ</span>,
                endIcon: <span>Cm</span>
            },
            {
                name: "endHeight",
                type: 'number',
                placeholder: "Nhập chiều cao",
                startIcon: <span>Đến</span>,
                endIcon: <span>Cm</span>
            }
        ]
    },
    {
        dataIndex: "19",
        name: "weight", label: "Cân nặng", children: [
            {
                name: "startWeight",
                type: 'number',
                placeholder: "Nhập cân nặng",
                startIcon: <span>Từ</span>,
                endIcon: <span>Kg</span>
            },
            {
                name: "endWeight",
                type: 'number',
                placeholder: "Nhập cân nặng",
                startIcon: <span>Đến</span>,
                endIcon: <span>Kg</span>
            }
        ]
    },
    {
        dataIndex: "20",
        name: "currentAddress",
        type: "select",
        between: true,
        multiple: false,
        placeholder: "",
        label: "Nơi ở hiện tại",
        children: [
            {
                name: "currentAddressProvince",
                type: 'select',
                placeholder: "Chọn Tỉnh/Thành phố",
                label: "Tỉnh/Thành phố",
                options: [
                    {id: 1, name: "Hà Nội"},
                    {id: 2, name: "Hài Phòng"},
                    {id: 3, name: "Nam Định"},
                    {id: 4, name: "TP Hồ Chí Minh"},
                    {id: 5, name: "Đà Nẵng"},
                ],
            },
            {
                name: "currentAddressDistrict",
                type: 'select',
                placeholder: "Chọn Quận/Huyện",
                label: "Quận/Huyện",
                options: [
                    {id: 1, name: "Huyện 1"},
                    {id: 2, name: "Huyện 2"},
                    {id: 3, name: "Huyện 3"},
                ],
            }
        ]
    },
    {
        dataIndex: "21",
        name: "hometown", type: "select", between: true, multiple: false, placeholder: "", label: "Quê quán",
        children: [
            {
                name: "hometownProvince",
                type: 'select',
                placeholder: "Chọn Tỉnh/Thành phố",
                label: "Chọn Tỉnh/Thành phố",
                options: [
                    {id: 1, name: "Hà Nội"},
                    {id: 2, name: "Hài Phòng"},
                    {id: 3, name: "Nam Định"},
                    {id: 4, name: "TP Hồ Chí Minh"},
                    {id: 5, name: "Đà Nẵng"},
                ],
            },
            {
                name: "hometownDistrict",
                type: 'select',
                placeholder: "Chọn Quận/Huyện",
                label: "Chọn Quận/Huyện",
                options: [
                    {id: 1, name: "Huyện 1"},
                    {id: 2, name: "Huyện 2"},
                    {id: 3, name: "Huyện 3"},
                ],
            }
        ]
    },
];