import { View } from "@/components/DesignSystem/FlexStyled";
import Iconify from "@/components/Iconify";
import { Tooltip } from "@mui/material";
import { Stack } from "@mui/system";

export const PipelineDraggableItem = ({
  data,
  onPressEdit,
  onPressDelete,
  isDefault,
}) => {
  const pressEdit = () => {
    onPressEdit?.();
  };

  const pressDelete = () => {
    onPressDelete?.();
  };
  if (isDefault == false) {
    return (
      <View
        flexrow="true"
        atcenter="true"
        p={16}
        mb={16}
        borderradius={6}
        bgcolor={"#F2F4F5"}
      >
        <View>
          <Iconify
            icon={"fluent:re-order-dots-vertical-16-filled"}
            width={20}
            height={20}
            color="#A2AAB7"
          />
        </View>

        <View flex="true" mh={12} color="#455570" width={"50%"}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              marginBottom: "2px",
              color: "#455570",
            }}
          >
            {data?.stageType?.name}
          </div>

          <div
            style={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              fontSize: 12,
              color: "#455570",
            }}
          >
            {data?.des}
          </div>
        </View>

        <View flexrow="false" atcenter="true">
          <Tooltip title="Sửa">
            <Stack onClick={pressEdit} cursor="pointer">
              <Iconify
                icon={"ri:edit-2-fill"}
                width={20}
                height={20}
                color="#5C6A82"
              />
            </Stack>
          </Tooltip>
          <Iconify
            icon={"fluent:divider-short-16-filled"}
            width={20}
            height={20}
            color="#A2AAB7"
          />
          <Tooltip title="Xóa">
            <Stack onClick={pressDelete} cursor="pointer">
              <Iconify
                icon={"material-symbols:delete-outline-rounded"}
                width={20}
                height={20}
                color="#5C6A82"
              />
            </Stack>
          </Tooltip>
        </View>
      </View>
    );
  } else {
    return (
      <View
        flexrow="true"
        atcenter="true"
        p={16}
        mb={16}
        borderwidth={1}
        borderradius={6}
        bgcolor={"#FDFDFD"}
        bordercolor={"#CCD4DC"}
      >
        <View width={20}>
          <Iconify
            icon={"mingcute:lock-line"}
            width={16}
            height={16}
            color="#455570"
          />
        </View>
        <View flex="true" ml={12} color="#455570">
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              marginBottom: "2px",
              color: "#455570",
            }}
          >
            {data[0]?.name}
          </div>
          <div style={{ fontSize: 12, color: "#455570" }}>{data[0]?.des}</div>
        </View>
      </View>
    );
  }
};
