import {useGetAllUserFromOrganizationQuery} from "@/sections/applicant";

const useFetchDataUser = ({ organizationId }) => {
  const {data: ListUserFromOrganization = []} = useGetAllUserFromOrganizationQuery({Id: organizationId}, { skip: !organizationId });

  return { ListUserFromOrganization }

}

export default useFetchDataUser;