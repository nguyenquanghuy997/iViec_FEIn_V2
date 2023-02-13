import Iconify from "@/components/Iconify";

export const  columns = [
    {
        name: "unit",
        type: "select",
        multiple: true,
        placeholder: "Chọn một hoặc nhiều đơn vị",
        label: "Đơn vị",
        options: [
            {id: 214, name: "Đơn vị 1"},
            {id: 3155, name: "Đơn vị 2"},
            {id: 3155, name: "Đơn vị 3"},
        ]
    },
    {
        name: "newsRecruiment",
        type: "select",
        multiple: true,
        placeholder: "Chọn một hoặc nhiều tin tuyển dụng",
        label: "Tin tuyển dụng",
        options: [
            {id: 214, name: "Tin tuyển dụng 1"},
            {id: 3155, name: "Tin tuyển dụng 2"},
            {id: 3155, name: "Tin tuyển dụng 3"},
        ]
    },
    {
        name: "dateApply", type: "date", label: "Ngày ứng tuyển", placeholder: "",
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
        name: "experienceNumber",
        type: "select",
        multiple: false,
        placeholder: "Chọn số năm kinh nghiệm",
        label: "Số năm kinh nghiệm",
        options: [
            {id: 214, name: "1 năm"},
            {id: 3155, name: "2 năm"},
            {id: 3155, name: "3 năm"},
            {id: 3155, name: "4 năm"},
            {id: 3155, name: "5 năm"},
        ]
    },
    {
        name: "step", label: "Bước tuyển dụng", placeholder: "Chọn một hoặc nhiều bước tuyển dụng",
        type: "select",
        multiple: true,
        options: [
            {id: 214, name: "Bước tuyển dụng 1"},
            {id: 3155, name: "Bước tuyển dụngg 2"},
            {id: 3155, name: "Bước tuyển dụng 3"},
        ]
    },
    {
        name: "step", label: "Nguồn", placeholder: "Chọn 1 hoặc nhiều nguồn",
        type: "select",
        multiple: true,
        options: [
            {id: 214, name: "Nguồn 1"},
            {id: 3155, name: "Nguồn 2"},
            {id: 3155, name: "Nguồn 3"},
        ]
    },
    {
        name: "step", label: "Cán bộ tuyển dụng", placeholder: "Chọn 1 hoặc nhiều cán bộ",
        type: "select",
        multiple: true,
        options: [
            {id: 214, name: "Cán bộ 1"},
            {id: 3155, name: "Cán bộ 2"},
            {id: 3155, name: "Cán bộ 3"},
        ]
    },
    {
        name: "step", label: "Người tạo ứng viên", placeholder: "Chọn 1 hoặc nhiều người",
        type: "select",
        multiple: true,
        options: [
            {id: 214, name: "Người tạo 1"},
            {id: 3155, name: "Người tạo 2"},
            {id: 3155, name: "Người tạo 3"},
        ]
    },
    {
        name: "step", label: "Hội đồng tuyển dụng", placeholder: "Chọn 1 hoặc nhiều cán bộ",
        type: "select",
        multiple: true,
        options: [
            {id: 214, name: "Hội đồng 1"},
            {id: 3155, name: "Hội đồng 2"},
            {id: 3155, name: "Hội đồng 3"},
        ]
    },
    {
        name: "step", label: "Số năm kinh nghiệm", placeholder: "Chọn 1 hoặc nhiều cán bộ",
        type: "select",
        multiple: true,
        options: [
            {id: 214, name: "Hội đồng 1"},
            {id: 3155, name: "Hội đồng 2"},
            {id: 3155, name: "Hội đồng 3"},
        ]
    },
    {
        name: "step", label: "Ngành nghề", placeholder: "Chọn 1 hoặc nhiều ngành nghề",
        type: "select",
        multiple: true,
        options: [
            {id: 214, name: "Ngành nghề 1"},
            {id: 3155, name: "Ngành nghề 2"},
            {id: 3155, name: "Ngành nghề 3"},
        ]
    },
    {
        name: "step", label: "Số năm kinh nghiệm", placeholder: "Chọn số năm kinh nghiệm",
        type: "select",
        multiple: false,
        options: [
            {id: 214, name: "1 năm"},
            {id: 3155, name: "2 năm"},
            {id: 3155, name: "3 năm"},
        ]
    },
    {
        name: "step", label: "Kỹ năng", placeholder: "Chọn số năm kinh nghiệm",
        type: "select",
        multiple: true,
        options: [
            {id: 214, name: "Kỹ năng 1"},
            {id: 3155, name: "Kỹ năng 2"},
            {id: 3155, name: "Kỹ năng 3"},
        ]
    },
    {name: "experience", type: "text", placeholder: "Tìm kiếm...", label: "Kinh nghiệm làm việc"},
    {name: "experience", type: "text", placeholder: "Tìm kiếm...", label: "Học vấn"},
    {
        name: "step", label: "Nơi làm việc mong muốn", placeholder: "Chọn 1 hoặc nhiều Tỉnh/Thành phố",
        type: "select",
        multiple: true,
        options: [
            {id: 214, name: "Thành phố 1"},
            {id: 3155, name: "Thành phố 2"},
            {id: 3155, name: "Thành phố 3"},
        ]
    },
    {
        name: "salary", placeholder: "", label: "Mức lương mong muốn",
        children: [
            {
                name: "startSalary",
                type: 'number',
                placeholder: "Nhập số tiền",
                startIcon: <span>Từ</span>,
                endIcon: <span>VNĐ</span>
            },
            {
                name: "endSalary",
                type: 'number',
                placeholder: "Nhập số tiền",
                startIcon: <span>Đến</span>,
                endIcon: <span>VNĐ</span>
            }
        ]
    },
    {
        name: "gender",
        type: "radio",
        label: "Giới tính",
        placeholder: "",
        options: [{label: 'Nam', value: 1}, {label: 'Nữ', value: 0}, {label: 'Khác', value: 2}]
    },
    {
        name: "married", type: "select", label: "Tình trạng hôn nhân", options: [
            {id: 214, name: "Đã kết hôn"},
            {id: 3155, name: "Chưa kết hôn"},
        ]
    },
    {
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
        name: "height", label: "Cân nặng", children: [
            {
                name: "startHeight",
                type: 'number',
                placeholder: "Nhập cân nặng",
                startIcon: <span>Từ</span>,
                endIcon: <span>Cm</span>
            },
            {
                name: "endHeight",
                type: 'number',
                placeholder: "Nhập cân nặng",
                startIcon: <span>Đến</span>,
                endIcon: <span>Cm</span>
            }
        ]
    },
    {
        name: "current_address",
        type: "select_between",
        multiple: false,
        placeholder: "",
        label: "Nơi ở hiện tại",
        children: [
            {
                name: "current_address_province",
                type: 'select',
                placeholder: "Chọn Tỉnh/Thành phố",
                label: "Chọn Tỉnh/Thành phố",
                options: [
                    {id: 214, name: "Hà Nội"},
                    {id: 3155, name: "Hài Phòng"},
                    {id: 3155, name: "Nam Định"},
                    {id: 3155, name: "TP Hồ Chí Minh"},
                    {id: 3155, name: "Đà Nẵng"},
                ],
            },
            {
                name: "current_address_district",
                type: 'select',
                placeholder: "Chọn Quận/Huyện",
                label: "Chọn Quận/Huyện",
                options: [
                    {id: 214, name: "Huyện 1"},
                    {id: 3155, name: "Huyện 2"},
                    {id: 3155, name: "Huyện 3"},
                ],
            }
        ]
    },
    {
        name: "hometown", type: "select_between", multiple: false, placeholder: "", label: "Quê quán",
        children: [
            {
                name: "hometown_province",
                type: 'select',
                placeholder: "Chọn Tỉnh/Thành phố",
                label: "Chọn Tỉnh/Thành phố",
                options: [
                    {id: 214, name: "Hà Nội"},
                    {id: 3155, name: "Hài Phòng"},
                    {id: 3155, name: "Nam Định"},
                    {id: 3155, name: "TP Hồ Chí Minh"},
                    {id: 3155, name: "Đà Nẵng"},
                ],
            },
            {
                name: "hometown_district",
                type: 'select',
                placeholder: "Chọn Quận/Huyện",
                label: "Chọn Quận/Huyện",
                options: [
                    {id: 214, name: "Huyện 1"},
                    {id: 3155, name: "Huyện 2"},
                    {id: 3155, name: "Huyện 3"},
                ],
            }
        ]
    },
];