import Content from "../Content";
import FilterModal from "./FilterModal";
import { HeaderStyle } from "./styles";
import { AddIcon } from "@/assets/ActionIcon";
import { Button } from "@/components/DesignSystem";
import {
  Badge,
  Box,
  InputAdornment,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import qs from "query-string";
import { useRef, useState } from "react";
import { RiFilterLine, RiSearch2Line } from "react-icons/ri";

export default function TableHeader({
  columns = [],
  createText = null,
  searchTextHint = "Tìm kiếm...",
  onClickCreate,
  onSubmitFilter,
  isInside,
  display,
  headerProps,
  contentProps,
  inputProps,
  actions,
}) {
  const { query = {}, asPath } = useRouter();
  const { palette } = useTheme();
  const [openFilter, setOpenFilter] = useState(false);
  const _timeoutSearch = useRef();
  const _filterBtn = useRef();
  const buttonHeight = isInside ? 36 : 44;

  const onSubmit = (value, timeout = 0) => {
    clearTimeout(_timeoutSearch.current);
    _timeoutSearch.current = setTimeout(() => {
      onSubmitFilter({ SearchKey: value, PageIndex: 1 });
    }, timeout);
  };

  const countFilter = () => {
    /* eslint-disable */
    let { PageSize, PageIndex, SearchKey, ...restQuery } =
      qs.parseUrl(asPath).query;
    /* eslint-enable */
    return Object.keys(restQuery).filter(x => columns.find(y => y.dataIndex == x)).length;
  };

  if (display === "none") return null;

  return (
    <HeaderStyle className={isInside ? "inside" : ""} {...headerProps}>
      <Content className="table-header-container" {...contentProps}>
        <Box display="flex">
          <Box flex={1}>
            <Stack direction="row" className="search-form" spacing={1}>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <RiSearch2Line size={16} color={palette.text.secondary} />
                    </InputAdornment>
                  ),
                }}
                placeholder={searchTextHint}
                className="search-input"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onSubmit(e.target.value);
                  }
                }}
                defaultValue={query.SearchKey}
                onChange={(e) => {
                  onSubmit(e.target.value, 500);
                }}
                {...inputProps}
              />

              {!isEmpty(columns) && (
                <Badge badgeContent={countFilter()} color="secondary">
                  <Button
                    onRef={(ref) => (_filterBtn.current = ref)}
                    variant="contained"
                    color="default"
                    startIcon={
                      <RiFilterLine size={18} color={palette.text.sub} />
                    }
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
                startIcon={<AddIcon />}
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
  );
}
