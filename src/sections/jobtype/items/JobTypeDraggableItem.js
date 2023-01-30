import { Text, View } from "@/components/FlexStyled";
import MenuPopover from "@/components/MenuPopover";
import SvgIcon from "@/components/SvgIcon";
import { useState } from "react";

export const JobTypeDraggableItem = ({
  data,
  onPressAdd,
  onPressEdit,
  onPressDelete,
}) => {
  const [openState, setOpenState] = useState(null);

  const pressOpen = (event) => {
    setOpenState(event.currentTarget);
  };

  const pressClose = () => {
    setOpenState(null);
  };

  const pressAdd = () => {
    pressClose();
    onPressAdd?.();
  };

  const pressEdit = () => {
    pressClose();
    onPressEdit?.();
  };

  const pressDelete = () => {
    pressClose();
    onPressDelete?.();
  };

  return (
    <View
      flexRow
      atCenter
      p={12}
      mv={16}
      borderWidth={1}
      borderRadius={6}
      bgColor={"#fff"}
      borderColor={"#C9D9E0"}
    >
      <View>
        <SvgIcon>
          {
            '<svg width="21" height="28" viewBox="0 0 21 28" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="7.5" cy="2" r="1.5" fill="#929292"/><circle cx="7.5" cy="8" r="1.5" fill="#929292"/><circle cx="7.5" cy="14" r="1.5" fill="#929292"/><circle cx="7.5" cy="20" r="1.5" fill="#929292"/><circle cx="7.5" cy="26" r="1.5" fill="#929292"/><circle cx="13.5" cy="2" r="1.5" fill="#929292"/><circle cx="13.5" cy="8" r="1.5" fill="#929292"/><circle cx="13.5" cy="14" r="1.5" fill="#929292"/><circle cx="13.5" cy="20" r="1.5" fill="#929292"/><circle cx="13.5" cy="26" r="1.5" fill="#929292"/></svg>'
          }
        </SvgIcon>
      </View>

      <View flex1 mh={12}>
        <Text fontSize={15} fontWeight={"600"}>
          {data.name}
        </Text>

        {!!data.des && <Text>{data.des}</Text>}
      </View>

      <View onPress={pressOpen}>
        <SvgIcon>
          {
            '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="16" fill="white"/><g clip-path="url(#clip0_15168_45870)"><path d="M16 7.00001C14.9 7.00001 14 7.90001 14 9.00001C14 10.1 14.9 11 16 11C17.1 11 18 10.1 18 9.00001C18 7.90001 17.1 7.00001 16 7.00001ZM16 21C14.9 21 14 21.9 14 23C14 24.1 14.9 25 16 25C17.1 25 18 24.1 18 23C18 21.9 17.1 21 16 21ZM16 14C14.9 14 14 14.9 14 16C14 17.1 14.9 18 16 18C17.1 18 18 17.1 18 16C18 14.9 17.1 14 16 14Z" fill="#393B3E"/></g><defs><clipPath id="clip0_15168_45870"><rect width="24" height="24" fill="white" transform="translate(4 4)"/></clipPath></defs></svg>'
          }
        </SvgIcon>
      </View>

      <MenuPopover
        disabledArrow
        open={Boolean(openState)}
        anchorEl={openState}
        onClose={pressClose}
        sx={{
          p: 0,
          width: undefined,
          borderRadius: 0,
          boxShadow: "none",
          background: "transparent",
        }}
      >
        <View
          hidden
          contentCenter
          pv={16}
          width={56}
          borderWidth={1}
          borderRadius={8}
          bgColor={"#fff"}
          borderColor={"#01B6A7"}
        >
          <View onPress={pressAdd}>
            <SvgIcon>
              {
                '<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="20" fill="white"/><path d="M20 30C14.4797 29.994 10.0061 25.5204 10 20V19.8C10.1099 14.3045 14.6346 9.92797 20.1307 10.0009C25.6268 10.0738 30.0337 14.5689 29.9978 20.0654C29.9619 25.5618 25.4966 29.9989 20 30ZM15 19V21H19V25H21V21H25V19H21V15H19V19H15Z" fill="#01B6A7"/></svg>'
              }
            </SvgIcon>
          </View>

          <View mt={12} onPress={pressEdit}>
            <SvgIcon>
              {
                '<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="20" fill="white"/><g clip-path="url(#clip0_11637_169319)"><path d="M15.243 26H11V21.757L22.435 10.322C22.6225 10.1346 22.8768 10.0292 23.142 10.0292C23.4072 10.0292 23.6615 10.1346 23.849 10.322L26.678 13.151C26.8655 13.3386 26.9708 13.5929 26.9708 13.858C26.9708 14.1232 26.8655 14.3775 26.678 14.565L15.243 26ZM11 28H29V30H11V28Z" fill="#393B3E"/></g><defs><clipPath id="clip0_11637_169319"><rect width="24" height="24" fill="white" transform="translate(8 8)"/></clipPath></defs></svg>'
              }
            </SvgIcon>
          </View>

          <View mt={12} onPress={pressDelete}>
            <SvgIcon>
              {
                '<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="20" fill="white"/><g clip-path="url(#clip0_11637_169321)"><path d="M25 12H30V14H28V29C28 29.2652 27.8946 29.5196 27.7071 29.7071C27.5196 29.8946 27.2652 30 27 30H13C12.7348 30 12.4804 29.8946 12.2929 29.7071C12.1054 29.5196 12 29.2652 12 29V14H10V12H15V10H25V12ZM17 17V25H19V17H17ZM21 17V25H23V17H21Z" fill="#393B3E"/></g><defs><clipPath id="clip0_11637_169321"><rect width="24" height="24" fill="white" transform="translate(8 8)"/></clipPath></defs></svg>'
              }
            </SvgIcon>
          </View>
        </View>
      </MenuPopover>
    </View>
  );
};
