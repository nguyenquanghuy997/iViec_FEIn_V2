import { useState, useRef } from 'react';
import {
  Box,
  TextField,
  Stack,
  InputAdornment,
  useTheme,
  Badge,
} from '@mui/material';
import {
  RiSearch2Line,
  RiFilterLine,
} from 'react-icons/ri';
import { useRouter } from 'next/router';

import Content from "../Content";
import { Button } from '@/components/DesignSystem';
import FilterModal from './FilterModal';

import { HeaderStyle } from './styles';
import { isEmpty } from "lodash";
import { AddIcon } from "@/assets/ActionIcon";

export default function TableHeader({
  columns = [],
  createText = null,
  searchTextHint = 'Tìm kiếm...',
  onClickCreate,
  onSubmitFilter,
  isInside,
  display,
  headerProps,
  contentProps,
  inputProps, actions,
}) {
  const {query = {}} = useRouter();
  const {palette} = useTheme();
  const [openFilter, setOpenFilter] = useState(false);
  const _timeoutSearch = useRef();
  const _filterBtn = useRef();
  const buttonHeight = isInside ? 36 : 44;
  
  const onSubmit = (value, timeout = 0) => {
    clearTimeout(_timeoutSearch.current);
    _timeoutSearch.current = setTimeout(() => {
      onSubmitFilter({SearchKey: value, PageIndex: 1, PageSize: 10});
    }, timeout);
  }
  
  const countFilter = () => {
    /* eslint-disable */
    let {PageSize, PageIndex, SearchKey, ...restQuery} = query;
    /* eslint-enable */
    return Object.keys(restQuery).length;
  }
  
  if (display === "none") return null;
  
  return (
    <HeaderStyle className={isInside ? 'inside' : ''} {...headerProps}>
      <Content className="table-header-container" {...contentProps}>
        <Box display="flex">
          <Box flex={1}>
            <Stack direction="row" className="search-form" spacing={1}>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <RiSearch2Line size={16} color={palette.text.secondary}/>
                    </InputAdornment>
                  )
                }}
                placeholder={searchTextHint}
                className="search-input"
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    onSubmit(e.target.value);
                  }
                }}
                defaultValue={query.SearchKey}
                onChange={e => {
                  onSubmit(e.target.value, 500);
                }}
                {...inputProps}
              />
              
              {!isEmpty(columns) && (
                <Badge badgeContent={countFilter()} color="secondary">
                  <Button
                    onRef={ref => _filterBtn.current = ref}
                    variant="contained"
                    color="default"
                    startIcon={<RiFilterLine size={18} color={palette.text.sub}/>}
                    onClick={() => {
                      setOpenFilter(true);
                    }}
                    height={buttonHeight}
                  >
                    Bộ lọc
                  </Button>
                </Badge>
              )}
            </Stack>
          </Box>
          
          {createText && (
            <Box mr={1}>
              <Button
                startIcon={<AddIcon/>}
                onClick={onClickCreate}
                variant="contained"
                color="primary"
                height={buttonHeight}
              >
                {createText}
              </Button>
            </Box>
          )}
          {actions && <>{actions}</>}
        </Box>
      </Content>
      
      <FilterModal
        open={openFilter}
        onClose={() => {
          setOpenFilter(false);
        }}
        columns={columns}
        onSubmitFilter={onSubmitFilter}
        _filterBtn={_filterBtn}
      />
    </HeaderStyle>
  )
}
