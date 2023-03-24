import {Breadcrumbs as MuiBreadcrumbs, Link, Typography,} from "@mui/material";
import {styled} from '@mui/material/styles';
import PropTypes from "prop-types";
import NextLink from "next/link";
import {pxToRem} from "@/utils/getFontValue";
import {STYLE_CONSTANT as style} from "@/theme/palette";

const BreadcrumbsJobs = styled(MuiBreadcrumbs)(() => ({
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: pxToRem(14),
  lineHeight: "20px",
  margin: "24px 0",
  "li p": {
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: pxToRem(14),
    lineHeight: "20px",
  },
  "& .MuiBreadcrumbs-separator": {
    margin: "0 4px",
  },
}));

const handleClick = (event) => {
  event.preventDefault();
};

const Breadcrumbs = ({ links = [], ...other }) => {
  return (
      <div role="presentation" onClick={handleClick}>
        <BreadcrumbsJobs aria-label="breadcrumb" {...other}>
          {links.map((link, index) => {
            if (index === links.length - 1) {
              return <Typography key={index} color={style.COLOR_MAIN}>{link.name}</Typography>
            }

            return (
                <NextLink key={index} href={link.href}>
                  <Link color={style.COLOR_TEXT_PRIMARY} style={{cursor: "pointer"}}>
                    {link.name}
                  </Link>
                </NextLink>
            )
          })}
        </BreadcrumbsJobs>
      </div>
  );
};

export default Breadcrumbs;

Breadcrumbs.propTypes = {
  link: PropTypes.array[
      {
        name: PropTypes.string,
        href: PropTypes.string,
      }
      ],
};
