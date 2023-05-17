import useLocales from "@/hooks/useLocales";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import { cloneElement } from "react";

const StyledProps = {
  //
  flex: PropTypes.any,
  flexwrap: PropTypes.any,
  flexrow: PropTypes.any,
  hidden: PropTypes.any,
  absolute: PropTypes.any,
  absolutefill: PropTypes.any,
  bgcolor: PropTypes.any,
  boxshadow: PropTypes.any,
  //
  zindex: PropTypes.number,
  opacity: PropTypes.number,
  //
  size: PropTypes.any,
  width: PropTypes.any,
  height: PropTypes.any,
  //
  borderwidth: PropTypes.number,
  borderradius: PropTypes.number,
  bordercolor: PropTypes.any,

  //
  allcenter: PropTypes.any,
  contentcenter: PropTypes.any,
  jcstart: PropTypes.any,
  jccenter: PropTypes.any,
  jcend: PropTypes.any,
  jcaround: PropTypes.any,
  jcbetween: PropTypes.any,
  asStart: PropTypes.any,
  asCenter: PropTypes.any,
  asEnd: PropTypes.any,
  atstart: PropTypes.any,
  atcenter: PropTypes.any,
  atend: PropTypes.any,
  //
  t: PropTypes.any,
  b: PropTypes.any,
  l: PropTypes.any,
  r: PropTypes.any,
  m: PropTypes.any,
  mt: PropTypes.any,
  mb: PropTypes.any,
  ml: PropTypes.any,
  mr: PropTypes.any,
  mv: PropTypes.any,
  mh: PropTypes.any,
  p: PropTypes.any,
  pt: PropTypes.any,
  pb: PropTypes.any,
  pl: PropTypes.any,
  pr: PropTypes.any,
  pv: PropTypes.any,
  ph: PropTypes.any,
  //
  style: PropTypes.any,
  children: PropTypes.any,
  //
  onclick: PropTypes.any,
};

const TextProps = {
  ...StyledProps,

  color: PropTypes.any,
  fontsize: PropTypes.number,
  fontweight: PropTypes.any,
  lineheight: PropTypes.number,
  italic: PropTypes.bool,
  underline: PropTypes.bool,
  rightalign: PropTypes.bool,
  centeralign: PropTypes.bool,
  justifyalign: PropTypes.bool,

  replacekey: PropTypes.any,
  replacevalue: PropTypes.any,
  replacearray: PropTypes.array,
  disableTranslate: PropTypes.bool,
};

const getASStyle = (props) => {
  if (props.allcenter) {
    return "center";
  }
  if (props.asStart) {
    return "flex-start";
  }
  if (props.asCenter) {
    return "center";
  }
  if (props.asEnd) {
    return "flex-end";
  }
  return undefined;
};

const getATStyle = (props) => {
  if (props.allcenter) {
    return "center";
  }
  if (props.contentcenter) {
    return "center";
  }
  if (props.atstart) {
    return "flex-start";
  }
  if (props.atcenter) {
    return "center";
  }
  if (props.atend) {
    return "flex-end";
  }
  return undefined;
};

const getJCStyle = (props) => {
  if (props.allcenter) {
    return "center";
  }
  if (props.contentcenter) {
    return "center";
  }
  if (props.jcstart) {
    return "flex-start";
  }
  if (props.jccenter) {
    return "center";
  }
  if (props.jcend) {
    return "flex-end";
  }
  if (props.jcaround) {
    return "space-around";
  }
  if (props.jcbetween) {
    return "space-between";
  }
  return undefined;
};

const getStyle = (props) => ({
  display: "flex",
  flex: props.flex ? 1 : undefined,
  flexWrap: props.flexwrap ? "wrap" : undefined,
  flexDirection: props.flexrow ? "row" : "column",
  overflow: props.hidden ? "hidden" : undefined,
  position: props.absolute ? "absolute" : "relative",
  boxShadow: props.boxshadow,
  background: props.bgcolor,
  //
  zIndex: props.zindex,
  opacity: props.opacity,
  //
  width: props.size || props.width,
  height: props.size || props.height,
  //
  border: `${props.borderwidth || 0}px solid ${props.bordercolor || "#000"}`,
  borderRadius: props.borderradius,
  //
  alignSelf: getASStyle(props),
  alignItems: getATStyle(props),
  justifyContent: getJCStyle(props),
  //
  top: props.t,
  bottom: props.b,
  left: props.l,
  right: props.r,
  marginTop: props.m || props.mv || props.mt,
  marginBottom: props.m || props.mv || props.mb,
  marginLeft: props.m || props.mh || props.ml,
  marginRight: props.m || props.mh || props.mr,
  paddingTop: props.p || props.pv || props.pt,
  paddingBottom: props.p || props.pv || props.pb,
  paddingLeft: props.p || props.ph || props.pl,
  paddingRight: props.p || props.ph || props.pr,
  //

  ...(props.absolutefill
    ? {
        top: props.t || 0,
        left: props.l || 0,
        right: props.r || 0,
        bottom: props.b || 0,
        position: "absolute",
      }
    : {}),
  //
  cursor: props.onclick ? "pointer" : undefined,

  //
  ...props.style,
});

const getTextAlign = (props) => {
  if (props.rightalign) {
    return "right";
  }
  if (props.centeralign) {
    return "center";
  }
  if (props.justifyalign) {
    return "justify";
  }
  return undefined;
};

const getTextStyle = (props) => {
  return {
    color: props.color,
    fontSize: props.fontsize || 14,
    fontWeight: props.fontweight || "400",
    lineHeight: props.lineheight || 1.25,
    textAlign: getTextAlign(props),
    fontStyle: props.italic ? "italic" : "normal",
    textDecorationLine: props.underline ? "underline" : undefined,
  };
};
const useStyles = makeStyles(({theme}) => ({
  scroll: {
    "&::-webkit-scrollbar": {
      width: "6px",
      marginRight: "3px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: theme.palette.common.neutral300,
      borderRadius: "30px",
      marginRight: "3px",
    },
  },
}));

export const View = (props) => {
  const classes = useStyles();
  return (
    <div
      {...props}
      className={classes.scroll}
      style={{ ...getStyle(props) }}
      onClick={props.onclick}
    >
      {props.children}
    </div>
  );
};

View.propTypes = StyledProps;

const replaceContent = (content, key, value) => {
  if (
    typeof key === "string" &&
    (typeof value === "string" || typeof value === "number")
  ) {
    return String(content).replace(new RegExp(`{${key}}`, "g"), `${value}`);
  }
  return content;
};

export const Text = (props) => {
  const {
    disableTranslate,
    replacekey,
    replacevalue,
    replacearray = [],
    children,
  } = props;

  const { translate } = useLocales();

  const translationContent = (value) => {
    let text = translate(value);
    text = replaceContent(text, replacekey, replacevalue);
    replacearray.forEach((i) => (text = replaceContent(text, i.key, i.value)));
    return text;
  };

  const renderContent = (item) => {
    if (!item || typeof item === "string" || typeof item === "number")
      return disableTranslate ? item : translationContent(item);

    const p = cloneElement(item).props;
    return p.children ? (
      <Text {...props} {...p} disableTranslate={p.disableTranslate} />
    ) : null;
  };

  return (
    <span
      style={{
        userSelect: "none",
        ...getTextStyle(props),
        ...getStyle({ ...props, width: props.width || "max-content" }),
      }}
      onClick={props.onclick}
    >
      {Array.isArray(children)
        ? children.map(renderContent)
        : renderContent(children)}
    </span>
  );
};

Text.propTypes = TextProps;
