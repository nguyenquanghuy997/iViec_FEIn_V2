import React, { useEffect } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { Box, Grid, IconButton } from "@mui/material";
import { MinusIcon, PlusIcon } from "@/assets/ActionIcon";
import RHFDropdownAvatarGroup from "@/components/hook-form/RHFDropdownAvatarGroup";
import {
  useGetRoleGroupListQuery,
} from "@/sections/rolegroup";
import { LIST_PROCESS_LEVEL_DETAIL_TYPE } from "@/utils/formatString";
import { useGetApplicationByRoleGroupQuery } from "@/sections/auth/authSlice";
import {
  useGetAllApplicantUserOrganizationByIdQuery
} from "@/sections/organization/override/OverrideOrganizationSlice";
import { RHFSelect } from "@/components/hook-form";
import useAuth from "@/hooks/useAuth";

const ConditionalInput = ({control, index, indexChild}) => {
  const {setValue} = useFormContext();
  const auth = useAuth();
  
  const value = useWatch({
    name: `approvalProcessLevels.${index}.approvalProcessLevelDetails.${indexChild}.processLevelDetailType`,
    control
  });
  const id = useWatch({
    name: `approvalProcessLevels.${index}.approvalProcessLevelDetails.${indexChild}.id`,
    control
  });
  const roleGroupId = useWatch({
    control,
    name: `approvalProcessLevels.${index}.approvalProcessLevelDetails.${indexChild}.roleGroupId`
  });
  const processLevelDetailType = useWatch({
    control,
    name: `approvalProcessLevels.${index}.approvalProcessLevelDetails.${indexChild}.processLevelDetailType`
  });
  console.log(processLevelDetailType)
  const {data: {items: RoleGroups = []} = {}} = useGetRoleGroupListQuery({IsActivated: true, PageSize: 999});
  const {data: {items: Applications = []} = {}} = useGetApplicationByRoleGroupQuery({RoleGroupId: roleGroupId}, {skip: !roleGroupId});
  const {data: {items: ApplicationOrganization = []} = {}} = useGetAllApplicantUserOrganizationByIdQuery({OrganizationId: auth.user.organizationId}, {skip: !processLevelDetailType});
  
  useEffect(() => {
    if (Applications.length > 0 && !id) {
      let applicantIds = Applications.map(item => item.id);
      setValue(`approvalProcessLevels.${index}.approvalProcessLevelDetails.${indexChild}.personInChargeIds`, applicantIds)
    }
  }, [Applications])
  
  return (
    (value === 0 ?
        <>
          <Grid item xs={5} pr={2}>
            <RHFSelect
              options={RoleGroups?.map(item => ({value: item?.id, label: item?.name}))}
              name={`approvalProcessLevels.${index}.approvalProcessLevelDetails.${indexChild}.roleGroupId`}
              isRequired
              placeholder="Chọn nhóm phê duyệt"
            />
          </Grid>
          <Grid item xs={2}>
            <RHFDropdownAvatarGroup
              options={Applications?.map(item => ({
                ...item,
                value: item?.id,
                label: item?.lastName ? item.lastName : item?.email,
                subLabel: item?.email
              }))}
              name={`approvalProcessLevels.${index}.approvalProcessLevelDetails.${indexChild}.personInChargeIds`}
              isRequired
              multiple
              placeholder="Chọn ..."
            />
          </Grid>
        </>
        :
        <Grid item xs={7}>
          <RHFDropdownAvatarGroup
            options={ApplicationOrganization?.map(item => ({
              ...item,
              value: item?.id,
              label: item?.lastName ? item?.lastName : item?.email,
              subLabel: item?.email
            }))}
            name={`approvalProcessLevels.${index}.approvalProcessLevelDetails.${indexChild}.personInChargeIds`}
            isRequired
            placeholder="Chọn người phê duyệt"
            render
          />
        </Grid>
    )
  );
};

export const ApproveProcessFormLevelItemContext = React.createContext({
  remove: () => {
  },
  append: () => {
  }
});

export const ApproveProcessFormLevelItem = (props) => {
  const {control} = useFormContext();
  const {index, isEditMode} = props;
  
  const {fields, append, remove} = useFieldArray({
    control,
    name: `approvalProcessLevels.${index}.approvalProcessLevelDetails`
  });
  
  let watchFieldArray = useWatch({name: `approvalProcessLevels.${index}.approvalProcessLevelDetails`, control});
  const addApproveProcessHandler = () => {
    append({
      roleGroupId: undefined,
      personInChargeIds: [],
      processLevelDetailType: undefined
    });
  };
  
  const removeApproveProcessHandler = (index) => {
    remove(index);
  };
  
  return <>
    <ApproveProcessFormLevelItemContext.Provider value={{remove}}>
      {fields.map((field, indexChild) => (
        <Box
          key={field.id}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}>
          <Box className="box-content-inner" sx={{flex: 1}}>
            <Grid container alignItems={"flex-start"}>
              <Grid item xs={3} pr={2}>
                <RHFSelect
                  options={LIST_PROCESS_LEVEL_DETAIL_TYPE.map(item => ({
                    value: item?.id,
                    label: item?.name
                  }))}
                  name={`approvalProcessLevels.${index}.approvalProcessLevelDetails.${indexChild}.processLevelDetailType`}
                  isRequired
                  placeholder="Chọn vai trò"
                />
              </Grid>
              <ConditionalInput {...{control, index, indexChild, isEditMode}} />
              <Grid item container flexDirection="row" justifyContent={"space-between"} xs={2} pl={3}>
                <IconButton sx={{ml: 2}} onClick={addApproveProcessHandler}>
                  <PlusIcon/>
                </IconButton>
                {watchFieldArray?.length > 1 && (
                  <IconButton onClick={() => removeApproveProcessHandler(indexChild)}>
                    <MinusIcon/>
                  </IconButton>
                )}
              </Grid>
            </Grid>
          </Box>
        </Box>
      ))}
    </ApproveProcessFormLevelItemContext.Provider>
  </>
};