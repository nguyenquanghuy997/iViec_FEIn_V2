import {
  CheckboxIconChecked,
  CheckboxIconDefault,
} from "@/assets/CheckboxIcon";
import { Text, View } from "@/components/FlexStyled";
import SvgIcon from "@/components/SvgIcon";
import { DOMAIN_SERVER_API } from "@/config";
import {
  ActionSwitchCheckedIcon,
  ActionSwitchUnCheckedIcon,
} from "@/sections/organization/component/Icon";
import { Avatar, Checkbox } from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";

export default ({
  data,
  isSelected,
  pressCheckbox,
  setCurrentItem,
  setShowForm,
  setShowConfirmDelete,
  setShowConfirmSwitchActive,
}) => {
  const {
    id,
    name,
    description,
    isActive,
    questions,
    createdUserInFo,
    createdTime,
  } = data;
  const quest = Array.isArray(questions) ? questions : [];
  const user = createdUserInFo || {};
  const router = useRouter();

  const pressSwitchActive = () => {
    setCurrentItem(data);
    setShowConfirmSwitchActive(true);
  };

  const pressView = () => {
    router.push(
      {
        pathname: `${router.pathname}/${id}`,
        query: { group: name },
      },
      undefined,
      { shallow: true }
    );
  };

  const pressEdit = () => {
    setCurrentItem(data);
    setShowForm(true);
  };

  const pressDelete = () => {
    setCurrentItem(data);
    setShowConfirmDelete(true);
  };

  const renderInfoItem = (icon, title, value) => {
    return (
      <>
        <SvgIcon>{icon}</SvgIcon>
        <Text ml={10} fontSize={14} fontWeight={"400"} color={"#5C6A82"}>
          {title}
        </Text>

        <Text ml={8} fontSize={14} fontWeight={"500"} color={"#5C6A82"}>
          {value}
        </Text>
      </>
    );
  };

  const renderInfoSpace = () => {
    return <View mh={20} width={1} height={12} bgColor={"#A2AAB7"} />;
  };

  const renderButtonAction = (icon, onPress) => {
    return (
      <View ml={30} onPress={onPress}>
        <SvgIcon>{icon}</SvgIcon>
      </View>
    );
  };

  return (
    <View
      key={id}
      pv={16}
      mt={24}
      ph={20}
      borderWidth={1}
      borderRadius={4}
      bgColor={"#FDFDFD"}
      borderColor={isSelected ? "#1E88E5" : "#E7E9ED"}
    >
      <View flexRow atStart>
        <Checkbox
          checked={isSelected}
          onChange={pressCheckbox}
          icon={<CheckboxIconDefault />}
          checkedIcon={<CheckboxIconChecked />}
          style={{
            marginTop: -6,
            marginLeft: -6
          }}
        />

        <View flex1 mh={12}>
          <Text fontSize={16} fontWeight={"600"} color={"#455570"}>
            {name}
          </Text>

          <Text
            hidden
            mt={4}
            fontSize={13}
            fontWeight={"400"}
            color={"#455570"}
            width={"auto"}
            style={{ "max-height": "16.25px" }}
          >
            {description}
          </Text>

          <View flexRow atCenter mt={12}>
            {renderInfoItem(
              '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.33333 2.66665H14V3.99998H5.33333V2.66665ZM2 2.33331H4V4.33331H2V2.33331ZM2 6.99998H4V8.99998H2V6.99998ZM2 11.6666H4V13.6666H2V11.6666ZM5.33333 7.33331H14V8.66665H5.33333V7.33331ZM5.33333 12H14V13.3333H5.33333V12Z" fill="#5C6A82"/></svg>',
              "Số câu hỏi:",
              quest.length
            )}
            {renderInfoSpace()}

            {renderInfoItem(
              '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.99967 14.6666C4.31767 14.6666 1.33301 11.682 1.33301 7.99998C1.33301 4.31798 4.31767 1.33331 7.99967 1.33331C11.6817 1.33331 14.6663 4.31798 14.6663 7.99998C14.6663 11.682 11.6817 14.6666 7.99967 14.6666ZM7.99967 13.3333C9.41416 13.3333 10.7707 12.7714 11.7709 11.7712C12.7711 10.771 13.333 9.41447 13.333 7.99998C13.333 6.58549 12.7711 5.22894 11.7709 4.22874C10.7707 3.22855 9.41416 2.66665 7.99967 2.66665C6.58519 2.66665 5.22863 3.22855 4.22844 4.22874C3.22824 5.22894 2.66634 6.58549 2.66634 7.99998C2.66634 9.41447 3.22824 10.771 4.22844 11.7712C5.22863 12.7714 6.58519 13.3333 7.99967 13.3333ZM7.33501 10.6666L4.50634 7.83798L5.44901 6.89531L7.33501 8.78131L11.1057 5.00998L12.049 5.95265L7.33501 10.6666Z" fill="#5C6A82"/></svg>',
              "Trắc nghiệm:",
              quest.filter((i) => i.questionType !== 2).length
            )}
            {renderInfoSpace()}

            {renderInfoItem(
              '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.3333 1.33331C13.7013 1.33331 14 1.63198 14 1.99998V4.50465L12.6667 5.83798V2.66665H3.33333V13.3333H12.6667V11.4946L14 10.1613V14C14 14.368 13.7013 14.6666 13.3333 14.6666H2.66667C2.29867 14.6666 2 14.368 2 14V1.99998C2 1.63198 2.29867 1.33331 2.66667 1.33331H13.3333ZM14.5187 5.87198L15.4613 6.81465L10.276 12L9.332 11.9986L9.33333 11.0573L14.5187 5.87198ZM8.66667 7.99998V9.33331H5.33333V7.99998H8.66667ZM10.6667 5.33331V6.66665H5.33333V5.33331H10.6667Z" fill="#5C6A82"/></svg>',
              "Tự luận:",
              quest.filter((i) => i.questionType === 2).length
            )}
          </View>
        </View>

        <Text
          fontSize={12}
          fontWeight={"500"}
          color={isActive ? "#388E3C" : "#5C6A82"}
        >
          {isActive ? "Đang hoạt động" : "Ngừng hoạt động"}
        </Text>
      </View>

      <View flexRow atCenter mt={30}>
        <Avatar
          src={`${DOMAIN_SERVER_API}/file/GetFile?filePath=${user.avatar}`}
          sx={{ width: 20, height: 20 }}
        />

        <Text ml={4} fontSize={12} color={"#172B4D"}>
          {user.name}
        </Text>

        <Text ml={4} fontSize={12} color={"#5C6A82"}>
          {`đã tạo ngày ${moment(createdTime).format("DD/MM/YYYY")}`}
        </Text>
        <View flex1 />

        <View style={{marginRight:-10}} onPress={pressSwitchActive}>
          {isActive ? (
            <ActionSwitchCheckedIcon />
          ) : (
            <ActionSwitchUnCheckedIcon />
          )}
        </View>

        {renderButtonAction(
          '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.99967 1.33331C11.6817 1.33331 14.6663 4.31798 14.6663 7.99998C14.6663 11.682 11.6817 14.6666 7.99967 14.6666C4.31767 14.6666 1.33301 11.682 1.33301 7.99998C1.33301 4.31798 4.31767 1.33331 7.99967 1.33331ZM7.99967 2.66665C6.58519 2.66665 5.22863 3.22855 4.22844 4.22874C3.22824 5.22894 2.66634 6.58549 2.66634 7.99998C2.66634 9.41447 3.22824 10.771 4.22844 11.7712C5.22863 12.7714 6.58519 13.3333 7.99967 13.3333C9.41416 13.3333 10.7707 12.7714 11.7709 11.7712C12.7711 10.771 13.333 9.41447 13.333 7.99998C13.333 6.58549 12.7711 5.22894 11.7709 4.22874C10.7707 3.22855 9.41416 2.66665 7.99967 2.66665ZM7.99967 4.66665C8.7014 4.66691 9.38514 4.88863 9.95349 5.30021C10.5218 5.71178 10.9458 6.29223 11.165 6.95885C11.3842 7.62546 11.3874 8.34425 11.1741 9.01279C10.9609 9.68134 10.5422 10.2655 9.97752 10.6822C9.41287 11.0988 8.73113 11.3266 8.02944 11.3332C7.32775 11.3397 6.64189 11.1246 6.06958 10.7186C5.49727 10.3125 5.0677 9.73621 4.84208 9.07174C4.61645 8.40728 4.60628 7.68856 4.81301 7.01798C4.96896 7.36645 5.23986 7.6508 5.58038 7.82342C5.9209 7.99605 6.31038 8.04648 6.68364 7.96628C7.0569 7.88609 7.39129 7.68013 7.63086 7.38287C7.87042 7.08561 8.00062 6.71509 7.99967 6.33331C7.99976 6.01229 7.90714 5.69807 7.73293 5.42843C7.55873 5.15879 7.31036 4.94519 7.01767 4.81331C7.32834 4.71798 7.65767 4.66665 7.99967 4.66665Z" fill="#5C6A82"/></svg>',
          pressView
        )}

        {renderButtonAction(
          '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.162 12.6667H14V14H2V11.1713L8.6 4.57133L11.428 7.40066L6.16133 12.6667H6.162ZM9.542 3.62933L10.9567 2.21466C11.0817 2.08968 11.2512 2.01947 11.428 2.01947C11.6048 2.01947 11.7743 2.08968 11.8993 2.21466L13.7853 4.10066C13.9103 4.22568 13.9805 4.39522 13.9805 4.57199C13.9805 4.74877 13.9103 4.91831 13.7853 5.04333L12.3707 6.45733L9.54267 3.62933H9.542Z" fill="#5C6A82"/></svg>',
          pressEdit
        )}

        {renderButtonAction(
          '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.66634 2.66665V1.33331H11.333V2.66665H14.6663V3.99998H13.333V14C13.333 14.1768 13.2628 14.3464 13.1377 14.4714C13.0127 14.5964 12.8432 14.6666 12.6663 14.6666H3.33301C3.1562 14.6666 2.98663 14.5964 2.8616 14.4714C2.73658 14.3464 2.66634 14.1768 2.66634 14V3.99998H1.33301V2.66665H4.66634ZM3.99967 3.99998V13.3333H11.9997V3.99998H3.99967ZM5.99967 5.99998H7.33301V11.3333H5.99967V5.99998ZM8.66634 5.99998H9.99967V11.3333H8.66634V5.99998Z" fill="#5C6A82"/></svg>',
          pressDelete
        )}
      </View>
    </View>
  );
};
