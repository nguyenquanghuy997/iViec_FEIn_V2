import { View } from "@/components/DesignSystem/FlexStyled";
import Iconify from "@/components/Iconify";
import { Tooltip } from "@mui/material";
import { Stack } from "@mui/system";
import {useTheme} from "@mui/material/styles";

export const PipelineDraggableItem = ({
  data,
  onPressEdit,
  onPressDelete,
  isDefault,
}) => {
  const pressEdit = () => {
    onPressEdit?.();
  };
  const theme = useTheme();
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
        bgcolor={theme.palette.common.bgrMaster}
      >
        <View>
          <Iconify
            icon={"fluent:re-order-dots-vertical-16-filled"}
            width={20}
            height={20}
            color={theme.palette.common.neutral400}
          />
        </View>

        <View flex="true" mh={12} color={theme.palette.common.neutral700} width={"50%"}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              marginBottom: "2px",
              color: theme.palette.common.neutral700,
            }}
          >
            {data?.stageType?.name}
          </div>

          <div
            style={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              fontSize: 12,
              color: theme.palette.common.neutral700,
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
                color={theme.palette.common.borderObject}
              />
            </Stack>
          </Tooltip>
          <Iconify
            icon={"fluent:divider-short-16-filled"}
            width={20}
            height={20}
            color={theme.palette.common.neutral400}
          />
          <Tooltip title="Xóa">
            <Stack onClick={pressDelete} cursor="pointer">
              <Iconify
                icon={"material-symbols:delete-outline-rounded"}
                width={20}
                height={20}
                color={theme.palette.common.borderObject}
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
        bgcolor={theme.palette.common.white}
        bordercolor={theme.palette.common.strokeDividerLine}
      >
        <View width={20}>
          <Iconify
            icon={"mingcute:lock-line"}
            width={16}
            height={16}
            color={theme.palette.common.neutral700}
          />
        </View>
        <View flex="true" ml={12} color={theme.palette.common.neutral700}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              marginBottom: "2px",
              color: theme.palette.common.neutral700,
            }}
          >
            {data[0]?.name}
          </div>
          <div style={{ fontSize: 12, color: theme.palette.common.neutral700 }}>{data[0]?.des}</div>
        </View>
      </View>
    );
  }
};
