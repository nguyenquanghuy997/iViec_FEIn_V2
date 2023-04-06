import { useState, useRef } from 'react';
import {
  Box,
  TextField,
  Stack,
  InputAdornment,
  useTheme,
} from '@mui/material';
import {
  RiAddCircleFill,
  RiSearch2Line,
  RiFilterLine,
} from 'react-icons/ri';
import { useRouter } from 'next/router';

import Content from "../Content";
import { Button } from '@/components/DesignSystem';
import FilterModal from './FilterModal';

import { HeaderStyle } from './styles';

export default function TableHeader({
  createText = null,
  onClickCreate,
  onSubmitFilter,
}) {
  const { query = {} } = useRouter();
  const { palette } = useTheme();
  const [openFilter, setOpenFilter] = useState(false);
  const _timeoutSearch = useRef();

  const onSubmit = (value, timeout = 0) => {
    clearTimeout(_timeoutSearch.current);
    _timeoutSearch.current = setTimeout(() => {
      onSubmitFilter({ SearchKey: value, PageIndex: 1, PageSize: 10 });
    }, timeout);
  }

  return (
    <HeaderStyle>
      <Content className="table-header-container">
        <Box display="flex">
          <Box flex={1}>
            <Stack direction="row" className="search-form" spacing={1}>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment>
                      <RiSearch2Line size={16} color={palette.text.secondary} />
                    </InputAdornment>
                  )
                }}
                placeholder="Tìm kiếm..."
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
              />
              <Button
                variant="contained"
                color="default"
                startIcon={<RiFilterLine size={18} color={palette.text.sub} />}
                onClick={() => {
                  setOpenFilter(true);
                }}
              >
                Bộ lọc
              </Button>
            </Stack>
          </Box>

          {createText && (
            <Box mr={1}>
              <Button
                startIcon={<RiAddCircleFill size={18} color="#fff" />}
                onClic={onClickCreate}
                variant="contained"
                color="primary"
              >
                {createText}
              </Button>
            </Box>
          )}
        </Box>
      </Content>

      <FilterModal
        open={openFilter}
        onClose={() => {
          setOpenFilter(false);
        }}
        onSubmit={onSubmit}
        width={384}
      />
    </HeaderStyle>
  )
}