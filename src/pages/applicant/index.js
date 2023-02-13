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
import {columns} from "@/sections/applicant/others/columns";

Applicant.getLayout = function getLayout({roles = []}, page) {
    return <Layout roles={roles}>{page}</Layout>;
};


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