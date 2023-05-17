import { View } from "@/components/DesignSystem/FlexStyled";
import Iconify from "@/components/Iconify";
import { Label } from "@/components/hook-form/style";
import { Tooltip } from "@mui/material";
import { Stack } from "@mui/system";
import {useTheme} from "@mui/material/styles";
const  theme = useTheme();
export const EvaluationDraggableItem = ({
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
          <Label
            style={{
              fontSize: 13,
              fontWeight: 600,
              marginBottom: "2px",
              color: theme.palette.common.neutral700,
            }}
            title={data?.name}
            required={data?.isRequired ? true : false}
          >
            {data?.name}
          </Label>

          <div
            title={data?.des}
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
                color={theme.palette.common.neutral600}
              />
            </Stack>
          </Tooltip>
        </View>
      </View>
    );
  }
};
