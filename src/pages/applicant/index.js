import Page from "@/components/Page";
import PageWrapper from "@/components/PageWrapper";
import {PAGES} from "@/config";
import Layout from "@/layouts";
import {ApplicantItem, useLazyGetListApplicantsQuery} from "@/sections/applicant";
import ApplicantHeader from "@/sections/applicant/ApplicantHeader";
import {getRolesByPage} from "@/utils/role";
import {useEffect, useState} from "react";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useDebounce} from "@/hooks/useDebounce";
import ApplicantFilterModal from "@/sections/applicant/filter/ApplicantFilterModal";

Applicant.getLayout = function getLayout({roles = []}, page) {
    return <Layout roles={roles}>{page}</Layout>;
};

const columns = [
    {
        name: "unit",
        type: "select",
        multiple: true,
        between: false,
        placeholder: "Chọn một hoặc nhiều đơn vị",
        label: "Đơn vị",
        options: [
            {id: 214, name: "Đơn vị 1"},
            {id: 3155, name: "Đơn vị 2"},
            {id: 3155, name: "Đơn vị 3"},
            {id: 3155, name: "Đơn vị 4"},
            {id: 3155, name: "Đơn vị 5"},
        ]
    },
    {
        name: "experience_number",
        type: "select",
        multiple: false,
        between: false,
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
    {name: "date_apply", type: "date", label: "Ngày ứng tuyển"},
    {
        name: "married", type: "select", label: "Tình trạng hôn nhân", options: [
            {id: 214, name: "Đã kết hôn"},
            {id: 3155, name: "Chưa kết hôn"},
        ]
    },
    {
        name: "gender",
        type: "radio",
        label: "Giới tính",
        placeholder: "",
        options: [{label: 'Nam', value: 1}, {label: 'Nữ', value: 0}, {label: 'Khác', value: 2}]
    },
    {name: "experience", type: "text", placeholder: "Tìm kiếm", label: "Kinh nghiệm làm việc"},
    {
        name: "salary", type: "select", placeholder: "", label: "Mức lương mong muốn",
        options: [
            {id: 214, name: "1 năm"},
            {id: 3155, name: "2 năm"},
            {id: 3155, name: "3 năm"},
            {id: 3155, name: "4 năm"},
            {id: 3155, name: "5 năm"},
        ]
    },
    {name: "height", type: "text", numberic: true, placeholder: "", label: "Chiều cao"},
    {
        name: "current_address",
        type: "select",
        multiple: false,
        between: true,
        placeholder: "",
        label: "Nơi ở hiện tại",
        options: [
            {id: 214, name: "1 năm"},
            {id: 3155, name: "2 năm"},
            {id: 3155, name: "3 năm"},
            {id: 3155, name: "4 năm"},
            {id: 3155, name: "5 năm"},
        ]
    },
    {
        name: "hometown", type: "select", multiple: false, between: true, placeholder: "", label: "Quê quán",
        options: [
            {id: 214, name: "1 năm"},
            {id: 3155, name: "2 năm"},
            {id: 3155, name: "3 năm"},
            {id: 3155, name: "4 năm"},
            {id: 3155, name: "5 năm"},
        ]
    },
];

const defaultValues = {
    search: "",
};

export default function Applicant() {
    const [isOpen, setIsOpen] = useState(true);

    // search input
    const Schema = Yup.object().shape({
        search: Yup.string(),
    });
    const methods = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(Schema)
    });

    const {watch} = methods;

    const searchValue = useDebounce(watch('search'), 1000);

    const [getListApplicants, {
        data: Data,
        isLoading,
    }] = useLazyGetListApplicantsQuery();

    useEffect(() => {
        getListApplicants({SearchKey: searchValue})
    }, [searchValue])

    // filter modal
    const handleOpenFilterForm = () => {
        setIsOpen(true);
    };

    const handleCloseFilterForm = () => {
        setIsOpen(false);
    };

    return (
        <PageWrapper title={"Ứng viên"}>
            <ApplicantHeader
                methods={methods}
                columns={columns}
                isOpen={isOpen}
                onOpenFilterForm={handleOpenFilterForm}
                onCloseFilterForm={handleCloseFilterForm}
            />
            <Page>
                <ApplicantItem dataSource={Data} isLoading={isLoading}/>
            </Page>
            <ApplicantFilterModal
                columns={columns}
                isOpen={isOpen}
                onClose={handleCloseFilterForm}
            />
        </PageWrapper>
    );
}

export async function getStaticProps() {
    return {
        props: {
            roles: getRolesByPage(PAGES.Industry),
        },
    };
}