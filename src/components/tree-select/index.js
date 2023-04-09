import { useMemo } from 'react';
import { TreeSelect as AntTreeSelect } from 'antd';
import { RiArrowDownSLine } from 'react-icons/ri';
import { useTheme } from '@mui/material';
import { TreeSelectStyle } from './styles';

// TODO: only organization
import { useGetOrganizationsDataWithChildQuery } from '@/sections/organization/OrganizationSlice';

const toNestedOrgs = (orgs = [], parentId = null) => {
  if (!orgs.find(org => org.parentOrganizationId === parentId)) {
    return [];
  }

  let results = [];
  let cloneOrgs = [...orgs];
  orgs.map((org, orgIdx) => {
    if (org.parentOrganizationId === parentId) {
      cloneOrgs.splice(orgIdx, 1);
      let childs = toNestedOrgs(cloneOrgs, org.id);
      results.push({
        ...org,
        title: org.name,
        value: org.id,
        key: org.id,
        children: childs,
      });
    }
  });
  return results;
}

const TreeSelect = ({
  value: valueProps,
  onChange,
  ...props
}) => {
  const { SHOW_PARENT } = AntTreeSelect;
  const { palette } = useTheme();

  const value = useMemo(() => {
    if (valueProps === null || valueProps === '') {
      return undefined;
    }
    if (!Array.isArray(valueProps)) {
      return [valueProps];
    }
    return value;
  }, [valueProps]);

  const { data: { items } = { items: [] } } = useGetOrganizationsDataWithChildQuery({ PageSize: 1000 });
  const organizations = useMemo(() => {
    return toNestedOrgs(items);
  }, [items]);

  return (
    <TreeSelectStyle
      treeData={organizations}
      treeCheckable={true}
      showCheckedStrategy={SHOW_PARENT}
      value={value}
      onChange={onChange}
      style={{ width: '100%' }}
      dropdownStyle={{
        zIndex: 3001,
      }}
      suffixIcon={<RiArrowDownSLine size={18} color={palette.text.sub} />}
      {...props}
    />
  )
}

export default TreeSelect;