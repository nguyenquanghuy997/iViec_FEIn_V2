import Iconify from "@/components/Iconify";
import MenuPopover from "@/components/MenuPopover";
import Scrollbar from "@/components/Scrollbar";
import { IconButtonAnimate } from "@/components/animate";
import { PATH_DASHBOARD } from "@/routes/paths";
import {
  useGetAllNotificationMutation,
  useMaskReadNotificationMutation,
} from "@/sections/notification/notificationSlice";
import { fToNow } from "@/utils/formatTime";
import {
  Badge,
  Box,
  Button,
  CircularProgress,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import * as qs from "qs";
import { useEffect, useState } from "react";

export default function NotificationsPopover() {
  const router = useRouter();

  // api
  const [maskRead] = useMaskReadNotificationMutation();
  const [fetchData, { data: { DataList = [] } = {}, isLoading }] =
    useGetAllNotificationMutation();

  // state
  const [openState, setOpenState] = useState(null);
  const [list, setList] = useState([]);
  const listUnread = list.filter((item) => item.IsNewNotify);
  const listReaded = list.filter((item) => !item.IsNewNotify);
  const totalUnread = listUnread.length;

  const fetchNotification = () => {
    fetchData(
      qs.stringify({
        pageSize: 9999,
        pageIndex: 1,
      })
    ).unwrap();
  };

  const pressOpen = (event) => {
    fetchNotification();
    setOpenState(event.currentTarget);
  };

  const pressClose = () => {
    setOpenState(null);
  };

  const pressItem = async (id) => {
    await maskRead(id).unwrap();
    setList((prev) =>
      [...prev].map((i) => (i.Id === id ? { ...i, IsNewNotify: false } : i))
    );
  };

  const pressViewAll = () => {
    router.push(PATH_DASHBOARD.notification);
    pressClose();
  };

  useEffect(() => {
    fetchNotification();
  }, []);

  useEffect(() => {
    Array.isArray(DataList) && setList(DataList);
  }, [JSON.stringify(DataList)]);

  return (
    <>
      <IconButtonAnimate
        color={openState ? "inherit" : "inherit"}
        onClick={pressOpen}
        sx={{ width: 40, height: 40 }}
      >
        <Badge badgeContent={totalUnread} color="error">
          <Iconify icon="eva:bell-fill" width={20} height={20} />
        </Badge>
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(openState)}
        anchorEl={openState}
        onClose={pressClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          width: 360,
          maxHeight: 540,
          overflow: "auto",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Thông báo</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Bạn có {totalUnread} thông báo mới
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              py: 2,
              px: 2.5,
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Scrollbar sx={{ height: { xs: 340, md: 400, lg: 460, xl: "auto" } }}>
            <NotificationList
              title={"Thông báo chưa đọc"}
              data={listUnread}
              pressItem={pressItem}
            />
            <NotificationList
              title={"Thông báo đã đọc"}
              data={listReaded}
              pressItem={pressItem}
            />
          </Scrollbar>
        )}
        <Divider sx={{ borderStyle: "dashed" }} />

        {false && (
          <Box sx={{ p: 1 }}>
            <Button fullWidth disableRipple onClick={pressViewAll}>
              Xem tất cả
            </Button>
          </Box>
        )}
      </MenuPopover>
    </>
  );
}

const NotificationItem = ({ data, pressItem }) => {
  const { Id, NotifyTitle, NotifyContent, IsNewNotify, CreatedDate } = data;
  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: "1px",
        ...(IsNewNotify && {
          bgcolor: "action.selected",
        }),
      }}
      onClick={() => pressItem(Id)}
    >
      <ListItemText
        primary={
          <Typography variant="subtitle2">
            {NotifyTitle}{" "}
            <Typography
              component="span"
              variant="body2"
              sx={{ color: "text.secondary" }}
              dangerouslySetInnerHTML={{ __html: NotifyContent }}
            />
          </Typography>
        }
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: "flex",
              alignItems: "center",
              color: "text.disabled",
            }}
          >
            <Iconify
              icon="eva:clock-outline"
              sx={{ mr: 0.5, width: 16, height: 16 }}
            />
            {fToNow(CreatedDate)}
          </Typography>
        }
      />
    </ListItemButton>
  );
};

const NotificationList = ({ title, data, pressItem }) => {
  return (
    <List
      disablePadding
      subheader={
        <ListSubheader
          disableSticky
          sx={{ py: 1, px: 2.5, typography: "overline" }}
        >
          {title}
        </ListSubheader>
      }
    >
      {data.map((item, index) => (
        <NotificationItem
          key={item.Id || index}
          data={item}
          pressItem={pressItem}
        />
      ))}
    </List>
  );
};
