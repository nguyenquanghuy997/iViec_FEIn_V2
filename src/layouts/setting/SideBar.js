import { SIDEBAR_CONSTANTS } from "./SideBarConfig";
import { SideBarListRoot } from "@/components/sidebar-section/SideBarList";
import useLocales from "@/hooks/useLocales";
import useRole from "@/hooks/useRole";
import { Box, List, ListSubheader } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useMemo } from "react";

export const ListSubheaderStyle = styled((props) => (
  <ListSubheader disableSticky disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.overline,
  // text
  textTransform: "uppercase",
  fontSize: SIDEBAR_CONSTANTS.MENU_TITLE_SIZE,
  fontWeight: SIDEBAR_CONSTANTS.MENU_TITLE_WEIGHT,
  color: SIDEBAR_CONSTANTS.MENU_TITLE_COLOR,
  transition: theme.transitions.create("opacity", {
    duration: theme.transitions.duration.shorter,
  }),
  lineHeight: '20px',
  marginBottom: '12px'
}));

SideBar.propTypes = {
  isCollapse: PropTypes.bool,
  navConfig: PropTypes.array,
};

export default function SideBar({ navConfig, isCollapse = false, ...other }) {
  const { translate } = useLocales();
  const { canAccess } = useRole();

  const navConfigBaseRole = useMemo(() => {
    let displayItems = [];
    navConfig.map(group => {
      let items = group.items?.filter(({ permissions = [] }) => canAccess(permissions));
      if (items && items.length > 0) {
        displayItems.push({
          ...group,
          items,
        });
      }
    });
    return displayItems;
  }, [navConfig]);

  return (
    <Box {...other} sx={{position: 'fixed'}}>
      {navConfigBaseRole.map((group, groupIndex) => (
        <List
          key={`${group.subheader}-${groupIndex}`}
          disablePadding
          sx={{ px: isCollapse ? 1 : 0, paddingBottom: 3 }}
        >
          <ListSubheaderStyle>
            {translate(group.subheader) || ""}
          </ListSubheaderStyle>
          {group.items.map((list) => (
            <SideBarListRoot
              key={list.title + list.path}
              list={list}
              isCollapse={isCollapse}
            />
          ))}
        </List>
      ))}
    </Box>
  );
}
