import useLocales from "@/hooks/useLocales";
import PropTypes from "prop-types";
import { cloneElement } from "react";

const StyledProps = {
  //
  flex1: PropTypes.bool,
  flexWrap: PropTypes.bool,
  flexRow: PropTypes.bool,
  hidden: PropTypes.bool,
  absolute: PropTypes.bool,
  absoluteFill: PropTypes.bool,
  bgColor: PropTypes.any,
  boxShadow: PropTypes.any,
  //
  zIndex: PropTypes.number,
  opacity: PropTypes.number,
  //
  size: PropTypes.any,
  width: PropTypes.any,
  height: PropTypes.any,
  //
  borderWidth: PropTypes.number,
  borderRadius: PropTypes.number,
  borderColor: PropTypes.any,

  //
  allCenter: PropTypes.bool,
  contentCenter: PropTypes.bool,
  jcStart: PropTypes.bool,
  jcCenter: PropTypes.bool,
  jcEnd: PropTypes.bool,
  jcAround: PropTypes.bool,
  jcBetween: PropTypes.bool,
  asStart: PropTypes.bool,
  asCenter: PropTypes.bool,
  asEnd: PropTypes.bool,
  atStart: PropTypes.bool,
  atCenter: PropTypes.bool,
  atEnd: PropTypes.bool,
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
  onPress: PropTypes.any,
};

const TextProps = {
  ...StyledProps,

  color: PropTypes.any,
  fontSize: PropTypes.number,
  fontWeight: PropTypes.any,
  lineHeight: PropTypes.number,
  italic: PropTypes.bool,
  underline: PropTypes.bool,
  rightAlign: PropTypes.bool,
  centerAlign: PropTypes.bool,
  justifyAlign: PropTypes.bool,

  replaceKey: PropTypes.any,
  replaceValue: PropTypes.any,
  replaceArray: PropTypes.array,
  disableTranslate: PropTypes.bool,
};

const getASStyle = (props) => {
  if (props.allCenter) {
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
  if (props.allCenter) {
    return "center";
  }
  if (props.contentCenter) {
    return "center";
  }
  if (props.atStart) {
    return "flex-start";
  }
  if (props.atCenter) {
    return "center";
  }
  if (props.atEnd) {
    return "flex-end";
  }
  return undefined;
};

const getJCStyle = (props) => {
  if (props.allCenter) {
    return "center";
  }
  if (props.contentCenter) {
    return "center";
  }
  if (props.jcStart) {
    return "flex-start";
  }
  if (props.jcCenter) {
    return "center";
  }
  if (props.jcEnd) {
    return "flex-end";
  }
  if (props.jcAround) {
    return "space-around";
  }
  if (props.jcBetween) {
    return "space-between";
  }
  return undefined;
};

const getStyle = (props) => ({
  display: "flex",
  flex: props.flex1 ? 1 : undefined,
  flexWrap: props.flexWrap ? "wrap" : undefined,
  flexDirection: props.flexRow ? "row" : "column",
  overflow: props.hidden ? "hidden" : undefined,
  position: props.absolute ? "absolute" : "relative",
  boxShadow: props.boxShadow,
  background: props.bgColor,
  //
  zIndex: props.zIndex,
  opacity: props.opacity,
  //
  width: props.size || props.width,
  height: props.size || props.height,
  //
  border: `${props.borderWidth || 0}px solid ${props.borderColor || "#000"}`,
  borderRadius: props.borderRadius,
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
  ...(props.absoluteFill
    ? {
        top: props.t || 0,
        left: props.l || 0,
        right: props.r || 0,
        bottom: props.b || 0,
        position: "absolute",
      }
    : {}),
  //
  cursor: props.onPress ? "pointer" : undefined,
  //
  ...props.style,
});

const getTextAlign = (props) => {
  if (props.rightAlign) {
    return "right";
  }
  if (props.centerAlign) {
    return "center";
  }
  if (props.justifyAlign) {
    return "justify";
  }
  return undefined;
};

const getTextStyle = (props) => {
  return {
    color: props.color,
    fontSize: props.fontSize || 14,
    fontWeight: props.fontWeight || "400",
    lineHeight: props.lineHeight || 1.25,
    textAlign: getTextAlign(props),
    fontStyle: props.italic ? "italic" : "normal",
    textDecorationLine: props.underline ? "underline" : undefined,
  };
};

export const View = (props) => {
  return (
    <div {...props} style={getStyle(props)} onClick={props.onPress}>
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
    replaceKey,
    replaceValue,
    replaceArray = [],
    children,
  } = props;

  const { translate } = useLocales();

  const translationContent = (value) => {
    let text = translate(value);
    text = replaceContent(text, replaceKey, replaceValue);
    replaceArray.forEach((i) => (text = replaceContent(text, i.key, i.value)));
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
      onClick={props.onPress}
    >
      {Array.isArray(children)
        ? children.map(renderContent)
        : renderContent(children)}
    </span>
  );
};

Text.propTypes = TextProps;
