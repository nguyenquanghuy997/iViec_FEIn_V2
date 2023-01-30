import SvgIcon from "@/components/SvgIcon";
import { Container, Modal } from "@mui/material";

export const ReportModal = ({ big, modalProps, title, subTitle, children }) => {
  return (
    <Modal
      {...modalProps}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Container
        style={{
          padding: 24,
          borderRadius: 8,
          width: big ? undefined : 900,
          overflow: "hidden",
          background: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 32,
          }}
        >
          <div style={{ flex: 1 }}>
            <span
              style={{
                display: "block",
                fontSize: 22,
                fontWeight: "700",
                marginBottom: 8,
              }}
            >
              {title}
            </span>
            <span
              style={{
                fontSize: 16,
                color: "##525356",
              }}
            >
              {subTitle}
            </span>
          </div>

          <div
            style={{ cursor: "pointer" }}
            onClick={modalProps.onBackdropClick}
          >
            <SvgIcon>
              {`<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.75 3.75L9 9M9 9L14.25 14.25M9 9L14.25 3.75M9 9L3.75 14.25" stroke="#393B3E" stroke-width="2.025" stroke-linecap="round" stroke-linejoin="round"/></svg>`}
            </SvgIcon>
          </div>
        </div>

        <div
          style={{
            paddingTop: 5,
            overflowY: "auto",
            maxHeight: "calc(100vh - 300px)",
          }}
        >
          {children}
        </div>

        <div
          style={{
            marginTop: 18,
            marginLeft: -24,
            marginRight: -24,
            marginBottom: -24,
            paddingTop: 18,
            paddingBottom: 18,
            paddingLeft: 24,
            paddingRight: 24,
            background: "#F8F8F9",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <span
            style={{
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 24,
              paddingRight: 24,
              display: "flex",
              background: "#fff",
              borderRadius: 4,
              cursor: "pointer",
              userSelect: "none",
            }}
            onClick={modalProps.onBackdropClick}
          >
            {"Đóng"}
          </span>
        </div>
      </Container>
    </Modal>
  );
};
