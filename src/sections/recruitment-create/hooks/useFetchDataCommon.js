import {useGetOrganizationsDataWithChildQuery} from "@/sections/organization/OrganizationSlice";
import {useGetJobCategoriesQuery, useGetProvinceQuery} from "@/sections/companyinfor/companyInforSlice";
import {useGetListCandidateLevelsQuery, useGetListLanguagesQuery} from "@/redux/slice/masterDataSlice";

const useFetchDataInformation = () => {
  const {data: {items: ListOrganization = []} = {}} = useGetOrganizationsDataWithChildQuery();
  const {data: {items: ListJobCategory = []} = {}} = useGetJobCategoriesQuery();
  const {data: {items: ListProvince = []} = {}} = useGetProvinceQuery();
  const {data: ListCandidateLevels = []} = useGetListCandidateLevelsQuery({ PageSize: 100 });
  const {data: {items: ListLanguage = []} = {}} = useGetListLanguagesQuery({ PageSize: 100 });

  return { ListOrganization, ListJobCategory, ListProvince, ListCandidateLevels, ListLanguage }

}

export default useFetchDataInformation;