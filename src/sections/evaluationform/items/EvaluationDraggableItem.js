import { View } from "@/components/DesignSystem/FlexStyled";
import Iconify from "@/components/Iconify";
import { Label } from "@/components/hook-form/style";
import { Tooltip } from "@mui/material";
import { Stack } from "@mui/system";

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
          <Label
            style={{
              fontSize: 13,
              fontWeight: 600,
              marginBottom: "2px",
              color: "#455570",
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
  }
};
