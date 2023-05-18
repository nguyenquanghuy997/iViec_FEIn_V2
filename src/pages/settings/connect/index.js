import ConnectCard from "@/sections/connect/ConnectCard";
import { PERMISSION_PAGES } from "@/config";
import useSettings from "@/hooks/useSettings";
import SettingLayout from "@/layouts/setting";
import { Container, } from "@mui/material";
import React, { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { useLazyGetInternalAccountQuery, useSetActiveInternalAccountMutation } from "@/sections/connect/ConnectSlice";
import { useSnackbar } from "notistack";
import {useTheme} from "@mui/material/styles";
// import { DragDropContext } from "react-beautiful-dnd";

Board.getLayout = function getLayout(pageProps, page) {
  return <SettingLayout permissions={PERMISSION_PAGES.connect} {...pageProps} >{page}</SettingLayout>;
};

export default function Board() {
  const {themeStretch} = useSettings();
  const auth = useAuth();
  const [dataInternal, { data: Data }] = useLazyGetInternalAccountQuery();
  const [activeInter] = useSetActiveInternalAccountMutation();
  const [itemData, setItemData] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

  useEffect(async () => {
    await dataInternal({OrganizationId: auth.user.organizationId}).unwrap().then((response) => {
      setItemData([
        {
          img: "/assets/fe_icon.svg",
          title: "FPT Education tuyển dụng",
          active: response.isActivated
        },
      ]);
    })
      .catch(() => {

      });

  }, [])

  const handleChangeFE = async (value) => {
    await activeInter({isActive: value, id: Data.id}).unwrap().then(() => {
      enqueueSnackbar("Thực hiện thành công!", {
        autoHideDuration: 2000,
      });
    }).catch(() => {
      enqueueSnackbar("Thực hiện thất bại!", {
        autoHideDuration: 1000,
        variant: "error",
      });
    })
  }

  return (
    <Container maxWidth={themeStretch ? false : "xl"}>
      <ConnectCard
        accounts={itemData}
        color={theme.palette.common.green600}
        title="KẾT NỐI WEBSITE TUYỂN DỤNG NỘI BỘ"
        type='outside'
        handleChange={handleChangeFE}
      />
    </Container>
  );
}