import SvgIcon from "./SvgIcon";
import { useState } from "react";

const nest = (items, id = null, link = "ParentId") => {
  return items
    .map((item) => ({
      ...item,
      [link]:
        items.findIndex((i) => i.Id === item[link]) >= 0 ? item[link] : null,
    }))
    .filter((item) => item[link] === id)
    .map((item) => ({ ...item, children: nest(items, item.Id) }));
};

const TreeItem = ({ data, onSelect }) => {
  const { Name, children } = data;
  const withChild = Array.isArray(children) && children.length > 0;

  const [show, setShow] = useState(true);

  const renderItem = (item) => {
    return <TreeItem data={item} onSelect={() => onSelect?.(item)} />;
  };

  return (
    <div style={{ paddingLeft: 20, paddingRight: 10 }}>
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        {withChild && (
          <div
            style={{ marginRight: 10, cursor: "pointer" }}
            onClick={() => setShow(!show)}
          >
            <SvgIcon>
              {!show
                ? `<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.5001 10.9766L14.6251 6.85156L15.8034 8.0299L10.5001 13.3332L5.19678 8.0299L6.37511 6.85156L10.5001 10.9766Z" fill="#2F2F2F"/></svg>`
                : `<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.5001 9.02341L6.37511 13.1484L5.19678 11.9701L10.5001 6.66675L15.8034 11.9701L14.6251 13.1484L10.5001 9.02341Z" fill="#2F2F2F"/></svg>`}
            </SvgIcon>
          </div>
        )}
        <span
          style={{
            paddingTop: 12,
            paddingBottom: 12,
            display: "block",
            cursor: "pointer",
            userSelect: "none",
            wordBreak: "break-all",
          }}
          onClick={() => onSelect?.(data)}
        >
          {Name}
        </span>
      </div>

      {show && withChild && children.map(renderItem)}
    </div>
  );
};

export default function DropdownTree(props) {
  const { data, onSelect } = props;
  if (!Array.isArray(data)) return null;

  const renderItem = (item) => {
    return <TreeItem data={item} onSelect={onSelect} />;
  };

  return <>{nest(data).map(renderItem)}</>;
}
