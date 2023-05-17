import { View } from "./FlexStyled";

export default function SvgIcon({ children, style }) {
  return (
    <View
      style={{ ...style, zIndex: 0 }}
      dangerouslySetInnerHTML={{ __html: children }}
    />
  );
}
