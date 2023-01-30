import { View } from "./FlexStyled";

export default function SvgIcon({ children, style }) {
  return (
    <View
      zIndex={0}
      style={style}
      dangerouslySetInnerHTML={{ __html: children }}
    />
  );
}
