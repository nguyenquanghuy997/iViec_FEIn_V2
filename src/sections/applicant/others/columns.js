import Iconify from "@/components/Iconify";

export const  columns = [
    {
        dataIndex: "1",
        name: "recruitmentIds",
        type: "select",
        multiple: true,
        placeholder: "Chọn một hoặc nhiều tin tuyển dụng",
        label: "Tin tuyển dụng",
    },
    {
        dataIndex: "2",
        name: 'recruitmentPipelineStates',
        label: "Bước tuyển dụng",
        placeholder: "Chọn một hoặc nhiều bước tuyển dụng",
        type: "select",
        multiple: true,
    },
    {
        dataIndex: "3",
        name: "createdTime",
        items: [
            {
                name: "createdTimeFrom",
                type: 'date',
                placeholder: "Chọn ngày",
                startIcon: <span>Từ</span>,
                endIcon: <Iconify icon="material-symbols:calendar-today"/>
            },
            {
                name: "createdTimeTo",
                type: 'date',
                placeholder: "Chọn ngày",
                startIcon: <span>Đến</span>,
                endIcon: <Iconify icon="material-symbols:calendar-today"/>
            }
        ]
    },
    {
        dataIndex: "4",
        name: "organizationIds",
        type: "tree",
        isTree: true,
        multiple: true,
        placeholder: "Chọn một hoặc nhiều đơn vị",
        label: "Đơn vị",
    },
    {
        dataIndex: "5",
        name: "jobSourceIds",
        label: "Nguồn",
        placeholder: "Chọn 1 hoặc nhiều nguồn",
        type: "select",
        multiple: true,
    },
    {
        dataIndex: "6",
        name: "ownerIds",
        label: "Cán bộ tuyển dụng",
        placeholder: "Chọn 1 hoặc nhiều cán bộ",
        type: "select",
        multiple: true,
    },
    {
        dataIndex: "7",
        name: "creatorIds",
        label: "Người tạo ứng viên",
        placeholder: "Chọn 1 hoặc nhiều người",
        type: "select",
        multiple: true,
    },
    {
        dataIndex: "8",
        name: "councilIds",
        label: "Hội đồng tuyển dụng",
        placeholder: "Chọn 1 hoặc nhiều người",
        type: "select",
        multiple: true,
    },
    {
        dataIndex: "9",
        name: "jobCategoryIds",
        label: "Ngành nghề",
        placeholder: "Chọn 1 hoặc nhiều ngành nghề",
        type: "select",
        multiple: true,
    },
    {
        dataIndex: "10",
        name: "yearsOfExperience",
        type: "select",
        multiple: false,
        placeholder: "Chọn số năm kinh nghiệm",
        label: "Số năm kinh nghiệm",
    },
    {
        dataIndex: "11",
        name: "educations",
        type: "text",
        placeholder: "Tìm kiếm...",
        label: "Học vấn"
    },
    {
        dataIndex: "12",
        name: "experience",
        type: "text",
        placeholder: "Tìm kiếm...",
        label: "Kinh nghiệm làm việc"
    },
    {
        dataIndex: "14",
        name: "applicantSkillIds",
        label: "Kỹ năng",
        placeholder: "Chọn 1 hoặc nhiều kỹ năng",
        type: "select",
        multiple: true,
    },
    {
        dataIndex: "15",
        name: "expectWorkingAddressProvinceIds",
        label: "Nơi làm việc mong muốn",
        placeholder: "Chọn 1 hoặc nhiều Tỉnh/Thành phố",
        type: "select",
        multiple: true,
    },
    {
        dataIndex: "16",
        name: "sexs",
        type: "radio",
        label: "Giới tính",
    },
    {
        dataIndex: "17",
        name: "maritalStatuses",
        type: "select",
        label: "Tình trạng hôn nhân",
    },
    {
        dataIndex: "18",
        name: "height",
        label: "Chiều cao",
        type: 'number',
        items: [
            {
                name: "heightFrom",
                type: 'number',
                placeholder: "Nhập chiều cao",
                startIcon: <span>Từ</span>,
                endIcon: <span>Cm</span>
            },
            {
                name: "heightTo",
                type: 'number',
                placeholder: "Nhập chiều cao",
                startIcon: <span>Đến</span>,
                endIcon: <span>Cm</span>
            }
        ]
    },
    {
        dataIndex: "19",
        name: "weight",
        label: "Cân nặng",
        type: 'number',
        items: [
            {
                name: "weightFrom",
                type: 'number',
                placeholder: "Nhập cân nặng",
                startIcon: <span>Từ</span>,
                endIcon: <span>Kg</span>
            },
            {
                name: "weightTo",
                type: 'number',
                placeholder: "Nhập cân nặng",
                startIcon: <span>Đến</span>,
                endIcon: <span>Kg</span>
            }
        ]
    },
    {
        dataIndex: "20",
        name: "expectSalary",
        placeholder: "",
        label: "Mức lương mong muốn",
        items: [
            {
                name: "expectSalaryFrom",
                type: 'number',
                placeholder: "Nhập số tiền",
                startIcon: <span>Từ</span>,
                endIcon: <span>VNĐ</span>
            },
            {
                name: "expectSalaryTo",
                type: 'number',
                placeholder: "Nhập số tiền",
                startIcon: <span>Đến</span>,
                endIcon: <span>VNĐ</span>
            }
        ]
    },
    {
        dataIndex: "21",
        name: "livingAddresses",
        type: "select",
        label: "Nơi ở hiện tại",
        items: [
            {
                name: "livingAddressProvinceIds",
                type: 'select',
                placeholder: "Chọn Tỉnh/Thành phố",
                label: "Tỉnh/Thành phố",
            },
            {
                name: "livingAddressDistrictIds",
                type: 'select',
                placeholder: "Chọn Quận/Huyện",
                label: "Quận/Huyện",
            }
        ]
    },
    {
        dataIndex: "21",
        name: "homeTowers",
        type: "select",
        label: "Quê quán",
        items: [
            {
                name: "homeTowerProvinceIds",
                type: 'select',
                placeholder: "Chọn Tỉnh/Thành phố",
                label: "Chọn Tỉnh/Thành phố",
            },
            {
                name: "homeTowerDistrictIds",
                type: 'select',
                placeholder: "Chọn Quận/Huyện",
                label: "Chọn Quận/Huyện",
            }
        ]
    },
];

export const tableColumns = [
    'STT',
    'Họ và Tên',
    'Ngày sinh',
    'Giới tính',
    'Email',
    'Số điện thoại',
    'Người tạo',
    'Ngày tạo',
    'Nguồn',
    'Ngành nghề',
    'Số CCCD/CMND',
    'Tình trạng hôn nhân',
    'Chiều cao(cm)',
    'Cân nặng(kg)',
    'Nơi ở hiện tại',
    'Kỹ năng',
    'Mức lương mong muốn',
    'Nơi làm việc mong muốn',
    'Số năm kinh nghiệm',
    'Quê quán',
    'Học vấn',
    'Kinh nghiệm làm việc ',
    'Ngày ứng tuyển',
    'Người phụ trách tin',
    'Tin tuyển dụng',
    'Đơn vị',
    'Vị trí công việc',
    'Bước tuyển dụng',
    'Điểm trung bình ',
    'Ngày thi',
    'Điểm thi',
    'Ngày phỏng vấn lần 1',
    'Kết quả phỏng vấn lần 1',
    'Ngày phỏng vấn lần 2',
    'Kết quả phỏng vấn lần 2',
    'Ngày phỏng vấn lần 3',
    'Kết quả phỏng vấn lần 3',
    'Ngày phỏng vấn lần 4',
    'Kết quả phỏng vấn lần 4',
    'Ngày phỏng vấn lần 5',
    'Kết quả phỏng vấn lần 5',
]