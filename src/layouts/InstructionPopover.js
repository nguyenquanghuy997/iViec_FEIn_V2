import MenuPopover from "@/components/MenuPopover";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MAIN_COLOR = "#01b6a7";

const LIST_STEP = [
  {
    title: "Thông tin công ty",
    des: "Thiết lập thông tin giới thiệu của doanh nghiệp",
    path: "/settings/companyinfor",
  },
  {
    title: "Vị trí công việc",
    des: "Quản lý các vị trí công việc của doanh nghiệp",
    path: null,
  },
  {
    title: "Quản lý tin tuyển dụng",
    des: "Thiết lập và quản lý tin tuyển dụng của doanh nghiệp",
    path: null,
  },
];

export default function NotificationsPopover() {
  const router = useRouter();

  const [step, setStep] = useState(-1);
  const [enable, setEnable] = useState(false);
  const [openState, setOpenState] = useState(null);

  const pressOpen = (event) => {
    setOpenState(event.currentTarget);
  };

  const pressClose = () => {
    setOpenState(null);
  };

  const pressStep = (index) => {
    if (step + 1 !== index) return;

    setStep(index);
    localStorage.setItem("stepTutorial", index);

    const { path } = LIST_STEP[index - 1];
    if (path) {
      pressClose();
      router.replace(path);
    }
  };

  const pressHideTutorial = () => {
    setEnable(false);
    localStorage.setItem("hideTutorial", true);
  };

  const renderItem = (item, index) => {
    index += 1;
    const enable = step >= index;
    const color = enable ? MAIN_COLOR : "#ccc";

    return (
      <li
        style={{
          cursor: "pointer",
          position: "relative",
          userSelect: "none",
        }}
        onClick={() => pressStep(index)}
      >
        {index < LIST_STEP.length && (
          <div
            style={{
              top: 8,
              left: -31,
              height: "100%",
              position: "absolute",
              borderLeft: `1px solid ${color}`,
            }}
          />
        )}

        <div
          style={{
            top: 7,
            left: -43,
            width: 24,
            height: 24,
            fontSize: 14,
            borderRadius: "50%",
            position: "absolute",
            textAlign: "center",
            color: "white",
            border: `1px solid ${color}`,
            background: enable ? MAIN_COLOR : "white",
          }}
        >
          {"✔"}
        </div>

        <div style={{ padding: ".5rem" }}>
          <strong style={{ display: "block" }}>{item.title}</strong>
          {item.des}
        </div>
      </li>
    );
  };

  useEffect(() => {
    const hideTutorial =
      typeof window !== "undefined"
        ? localStorage.getItem("hideTutorial")
        : null;
    setEnable(!hideTutorial);

    const stepTutorial =
      typeof window !== "undefined"
        ? localStorage.getItem("stepTutorial")
        : null;
    setStep(Number(stepTutorial || 0));
  }, []);

  if (!enable) return null;

  return (
    <>
      <div
        style={{
          left: 20,
          bottom: 16,
          borderRadius: 32,
          cursor: "pointer",
          display: "flex",
          padding: "8px 12px",
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          background: MAIN_COLOR,
          boxShadow: "0 3px 6px 0 #0000004f",
        }}
        onClick={pressOpen}
      >
        <span
          style={{
            fontSize: 15,
            fontWeight: "600",
            userSelect: "none",
          }}
        >
          {"Bắt đầu sử dụng"}
        </span>
      </div>

      <MenuPopover
        disabledArrow
        open={!!openState}
        anchorEl={openState}
        onClose={pressClose}
        anchorOrigin={{ horizontal: "right" }}
        transformOrigin={{ vertical: "bottom" }}
        sx={{
          p: 0,
          width: 324,
          borderRadius: "8px",
          boxShadow: "0 0 10px #0000004f",
        }}
      >
        <div style={{ padding: "16px" }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: "700" }}>
              BẮT ĐẦU SỬ DỤNG
            </div>
            {/* <img class="imgX" style="cursor: pointer; width: 16px; height: 16px;" src="/public/img/X.svg"> */}
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: ".5rem" }}>
              {((step / LIST_STEP.length) * 100).toFixed(0)}%
            </div>
            <div
              style={{
                height: 8,
                width: "100%",
                overflow: "hidden",
                background: "#e9ecef",
                borderRadius: ".25rem",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${(step / LIST_STEP.length) * 100}%`,
                  background: MAIN_COLOR,
                }}
              />
            </div>
          </div>
          <div style={{ marginTop: ".5rem" }}>
            Vui lòng hoàn thành các bước sau:
          </div>
          <ul
            style={{
              listStyle: "none",
              paddingLeft: 45,
              margin: "16px 0",
            }}
          >
            {LIST_STEP.map(renderItem)}
          </ul>
          <div
            style={{
              cursor: "pointer",
              textAlign: "right",
              fontStyle: "italic",
              textDecoration: "underline",
            }}
            onClick={pressHideTutorial}
          >
            Tôi đã hiểu, không hiển thị lại
          </div>
        </div>
      </MenuPopover>
    </>
  );
}
