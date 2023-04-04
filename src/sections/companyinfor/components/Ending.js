import HeaderCard from "../HeaderCard";
import {useGetCompanyInfoQuery} from "../companyInforSlice";
import EditorEnding from "./EditorEnding";
import CloseIcon from "@/assets/CloseIcon";
import {Box, Button, Divider, Drawer, List, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import {useState} from "react";
import EmptyValue from "@/sections/companyinfor/components/EmptyValue";

const Ending = () => {
  const {data: Data} = useGetCompanyInfoQuery();
  const [open, setOpen] = useState();
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const PlaceholderStyle = styled("div")(() => ({
    background: "white",
    padding: "12px 96px",
    height: 150,
    "& .content": {
      backgroundColor: "white",
      color: "#455570",
      background: "#F2F4F5",
      position: "relative",
      padding: "24px 96px",
    },

    "& blockquote:before": {
      content: '" ,, "',
      position: "absolute",
      // content: "\f10d";
      top: -100,
      left: "20px",
      fontSize: "128px",
      color: "#A2AAB7",
    },
  }));
  const list = () => (
      <Box
          sx={{width: 700}}
          role="presentation"
          // onKeyDown={toggleDrawer(false)}
      >
        <List
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: 0,
            }}
        >
          <Typography sx={{p: "22px 24px", fontSize: 16, fontWeight: 600}}>
            Chỉnh sửa Lời kết
          </Typography>
          <Button
              onClick={handleClose}
              sx={{
                "&:hover": {
                  background: "white",
                },
              }}
          >
            <CloseIcon/>
          </Button>
        </List>
        <Divider/>
        <div>
          <EditorEnding data={Data} onClose={handleClose}/>
        </div>
      </Box>
  );

  const renderItem = (value, main) => {
    return (
        <div style={{flex: main ? undefined : 1}}>
          {String(value).startsWith("<") ? (
              <p dangerouslySetInnerHTML={{__html: value}}/>
          ) : (
              <span
                  style={{
                    display: "flex",
                    fontSize: 14,
                    lineHeight: 24 / 16,
                    color: "#172B4D",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
              >
            {value}
          </span>
          )}
        </div>
    );
  };
  return (
      <Box sx={{minHeight: '296px'}}>
        <HeaderCard
            text="Lời kết"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
        />
        {open && (
            <Drawer
                anchor="right"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
            >
              {list("right")}
            </Drawer>
        )}
        {Data?.conclusion ? (
            <PlaceholderStyle>
              <div className="content" style={{height: 100}}>
                <blockquote>{renderItem(Data?.conclusion)}</blockquote>
              </div>
            </PlaceholderStyle>
        ) : <EmptyValue text={"Hiện chưa có nội dung Lời kết"} />}
      </Box>
  );
};
export default Ending;
