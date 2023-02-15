import { Link } from "@mui/material";
import NextLink from "next/link";
import PropTypes from "prop-types";
import React from "react";
import Iconify from "../Iconify";

export default function NavGoBack(props) {
  const { link,name} = props;

  return (
    <NextLink href={link} passHref>
          <Link
            sx={{
              lineHeight: 2,
              display: "flex",
              alignItems: "center",
              color: "#455570",
              fontWeight:'600',
              fontSize:'14px',
              padding: '12px 16px',
              marginTop:'16px'
            }}
          >
              <Iconify
                icon={"ion:arrow-back-outline"}
                width={20}
                height={20}
                color="#455570"
                mr={1}
              />

            {name}
          </Link>
        </NextLink>
  );
}

NavGoBack.prototype = {
  link: PropTypes.any,
  name: PropTypes.any,
};
