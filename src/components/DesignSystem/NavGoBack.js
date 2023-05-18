import Iconify from "../Iconify";
import { Link } from "@mui/material";
import NextLink from "next/link";
import PropTypes from "prop-types";
import {useTheme} from "@mui/material/styles";

export default function NavGoBack(props) {
  const { link, name, sx } = props;
  const theme = useTheme();
  const Wrapper = link ? NextLink : "div";

  return (
    <Wrapper href={link} passHref {...props}>
      <Link
        sx={{
          lineHeight: 2,
          display: "flex",
          alignItems: "center",
          color: theme.palette.common.neutral700,
          fontWeight: "600",
          fontSize: "14px",
          padding: "12px 16px",
          marginTop: "16px",
          cursor: "pointer",
          ...sx,
        }}
      >
        <Iconify
          icon={"ion:arrow-back-outline"}
          width={20}
          height={20}
          color={theme.palette.common.neutral700}
          mr={1}
        />

        {name}
      </Link>
    </Wrapper>
  );
}

NavGoBack.prototype = {
  link: PropTypes.any,
  name: PropTypes.any,
};
