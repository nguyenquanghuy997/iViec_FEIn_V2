import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";

export default function ReadMore({ intro, numberChar = 265 }) {
  const [des, setDes] = useState(intro);
  const [isReadMoreShown, setReadMoreShown] = useState(false);
  const [showBtn, setShowBtn] = useState(false);

  const handleReadMore = () => {
    setReadMoreShown(true);
    setShowBtn(false);
  };

  useEffect(() => {
    if (intro === null) {
      setDes("");
    } else if (`${intro}`.length > 0 && `${intro}`.length <= numberChar) {
      setShowBtn(false);
      setReadMoreShown(true);
    } else if (`${intro}`.length > numberChar) {
      if (isReadMoreShown) {
        setShowBtn(false);
      } else {
        setShowBtn(true);
      }
    }
  }, [des]);

  const TypoContent = styled(Typography)(() => ({
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "24px",
    color: "#455570",
    whiteSpace: "pre-line",
    overflow: "ellipsis",
    order: 1,
  }));

  return (
      <TypoContent
          className="typoContent"
          variant="body1"
          sx={{ whiteSpace: "pre-line", wordWrap: "break-word" }}
      >
        {isReadMoreShown ? intro : `${intro}`.substring(0, {numberChar}) + "..."}

        {showBtn ? (
            <span className="read-more" onClick={handleReadMore}>
          {" "}
              Xem thêm
        </span>
        ) : null}
      </TypoContent>
  );
}
