import Content from "../Content";
import FilterModal from "./FilterModal";
import { HeaderStyle } from "./styles";
import { Button } from "@/components/DesignSystem";
import SvgIcon from "@/components/SvgIcon";
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
import { RiSearch2Line } from "react-icons/ri";

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
    return Object.keys(restQuery).filter((x) =>
      columns.find((y) =>
        Array.isArray(y.colFilters?.name)
          ? y.colFilters?.name.some((f) => f == x)
          : y.colFilters?.name == x
      )
    ).length;
  };

  if (display === "none") return null;

  return (
    <HeaderStyle className={isInside ? "inside" : ""} {...headerProps}>
      <Content className="table-header-container" {...contentProps}>
        <Box display="flex">
          <Box flex={1}>
            <Stack direction="row" className="search-form">
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
                sx={{
                  "& .MuiInputBase-input": {
                    paddingLeft: "0px !important",
                  },
                  ...inputProps?.sx,
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
                      <SvgIcon>
                        {
                          '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_8888_127470)"> <path d="M14 2.66666V3.99999H13.3333L10 8.99999V14.6667H6V8.99999L2.66667 3.99999H2V2.66666H14ZM4.26933 3.99999L7.33333 8.59599V13.3333H8.66667V8.59599L11.7307 3.99999H4.26933Z" fill="#455570"/> </g> <defs> <clipPath id="clip0_8888_127470"> <rect width="16" height="16" fill="white"/> </clipPath> </defs> </svg>'
                        }
                      </SvgIcon>
                    }
                    onClick={() => {
                      setOpenFilter(true);
                    }}
                    height={buttonHeight}
                    sx={{
                      ml: "16px",
                    }}
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
                startIcon={
                  <SvgIcon>
                    {
                      '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M9.16675 9.16675V4.16675H10.8334V9.16675H15.8334V10.8334H10.8334V15.8334H9.16675V10.8334H4.16675V9.16675H9.16675Z" fill="#FDFDFD"/> </svg>'
                    }
                  </SvgIcon>
                }
                onClick={onClickCreate}
                variant="contained"
                color="primary"
                height={44}
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
