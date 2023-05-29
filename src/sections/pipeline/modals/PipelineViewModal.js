import { ButtonDS } from "@/components/DesignSystem";
import { Text, View } from "@/components/DesignSystem/FlexStyled";
import Iconify from "@/components/Iconify";
import SvgIcon from "@/components/SvgIcon";
import { ButtonCancelStyle } from "@/sections/applicant/style";
import { ButtonIcon, ViewModel } from "@/utils/cssStyles";
import { PipelineStateType } from "@/utils/enum";
import { Divider, Modal } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const PipelineViewModal = ({
  data,
  show,
  onClose,
  onPressEdit,
  onPressDelete,
}) => {
  const theme = useTheme();

  const list = Array.isArray(data?.organizationPipelineStates)
    ? data?.organizationPipelineStates
    : [];

  const getIcon = (type) => {
    if (type === 0)
      return `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_8391_108812)"> <path d="M1.29734 6.21019C0.949337 6.09419 0.946004 5.90686 1.304 5.78752L14.0287 1.54619C14.3813 1.42886 14.5833 1.62619 14.4847 1.97152L10.8487 14.6955C10.7487 15.0482 10.5453 15.0602 10.396 14.7255L8 9.33352L12 4.00019L6.66667 8.00019L1.29734 6.21019Z" fill="#1E88E5"/> </g> <defs> <clipPath id="clip0_8391_108812"> <rect width="16" height="16" fill="white"/> </clipPath> </defs> </svg>`;
    if (type === 1)
      return `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M13.3333 1.3335C13.7013 1.3335 14 1.63216 14 2.00016V4.50483L8.00067 10.5048L7.99667 13.3302L10.8273 13.3342L14 10.1615V14.0002C14 14.3682 13.7013 14.6668 13.3333 14.6668H2.66667C2.29867 14.6668 2 14.3682 2 14.0002V2.00016C2 1.63216 2.29867 1.3335 2.66667 1.3335H13.3333ZM14.5187 5.87216L15.4613 6.81483L10.276 12.0002L9.332 11.9988L9.33333 11.0575L14.5187 5.87216ZM8 8.00016H4.66667V9.3335H8V8.00016ZM10 5.3335H4.66667V6.66683H10V5.3335Z" fill="#1E88E5"/> </svg>`;
    if (type === 2)
      return `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_8391_109670)"> <path d="M8.00001 7.3335C8.88407 7.3335 9.73191 7.68469 10.357 8.30981C10.9822 8.93493 11.3333 9.78277 11.3333 10.6668V14.6668H4.66668V10.6668C4.66668 9.78277 5.01787 8.93493 5.64299 8.30981C6.26811 7.68469 7.11596 7.3335 8.00001 7.3335ZM3.52534 9.3375C3.41925 9.69535 3.35658 10.0647 3.33868 10.4375L3.33334 10.6668V14.6668H1.33334V11.6668C1.33321 11.0919 1.54536 10.5371 1.9291 10.109C2.31284 9.68082 2.84114 9.40942 3.41268 9.34683L3.52601 9.3375H3.52534ZM12.4747 9.3375C13.068 9.37366 13.6251 9.6348 14.0324 10.0677C14.4397 10.5005 14.6666 11.0725 14.6667 11.6668V14.6668H12.6667V10.6668C12.6667 10.2048 12.6 9.75883 12.4747 9.3375ZM3.66668 5.3335C4.1087 5.3335 4.53263 5.50909 4.84519 5.82165C5.15775 6.13421 5.33334 6.55814 5.33334 7.00016C5.33334 7.44219 5.15775 7.86611 4.84519 8.17867C4.53263 8.49123 4.1087 8.66683 3.66668 8.66683C3.22465 8.66683 2.80073 8.49123 2.48817 8.17867C2.1756 7.86611 2.00001 7.44219 2.00001 7.00016C2.00001 6.55814 2.1756 6.13421 2.48817 5.82165C2.80073 5.50909 3.22465 5.3335 3.66668 5.3335ZM12.3333 5.3335C12.7754 5.3335 13.1993 5.50909 13.5119 5.82165C13.8244 6.13421 14 6.55814 14 7.00016C14 7.44219 13.8244 7.86611 13.5119 8.17867C13.1993 8.49123 12.7754 8.66683 12.3333 8.66683C11.8913 8.66683 11.4674 8.49123 11.1548 8.17867C10.8423 7.86611 10.6667 7.44219 10.6667 7.00016C10.6667 6.55814 10.8423 6.13421 11.1548 5.82165C11.4674 5.50909 11.8913 5.3335 12.3333 5.3335ZM8.00001 1.3335C8.70725 1.3335 9.38553 1.61445 9.88563 2.11454C10.3857 2.61464 10.6667 3.29292 10.6667 4.00016C10.6667 4.70741 10.3857 5.38568 9.88563 5.88578C9.38553 6.38588 8.70725 6.66683 8.00001 6.66683C7.29277 6.66683 6.61449 6.38588 6.11439 5.88578C5.6143 5.38568 5.33334 4.70741 5.33334 4.00016C5.33334 3.29292 5.6143 2.61464 6.11439 2.11454C6.61449 1.61445 7.29277 1.3335 8.00001 1.3335Z" fill="#1E88E5"/> </g> <defs> <clipPath id="clip0_8391_109670"> <rect width="16" height="16" fill="white"/> </clipPath> </defs> </svg>`;
    if (type === 3)
      return `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_8391_107261)"> <path d="M2.66668 10.6668V13.3335H5.33334V14.6668H1.33334V10.6668H2.66668ZM14.6667 10.6668V14.6668H10.6667V13.3335H13.3333V10.6668H14.6667ZM5.00001 4.66683C5.00001 5.46248 5.31608 6.22554 5.87869 6.78815C6.4413 7.35076 7.20436 7.66683 8.00001 7.66683C8.79566 7.66683 9.55872 7.35076 10.1213 6.78815C10.6839 6.22554 11 5.46248 11 4.66683H12.3333C12.3335 5.45976 12.1161 6.23753 11.7048 6.91544C11.2935 7.59335 10.704 8.14541 10.0007 8.5115L10 12.6668H6.00001V8.51216C5.29643 8.14611 4.7068 7.59399 4.29536 6.91594C3.88393 6.2379 3.66647 5.45994 3.66668 4.66683H5.00001ZM8.00001 3.3335C8.44204 3.3335 8.86596 3.50909 9.17852 3.82165C9.49108 4.13421 9.66668 4.55814 9.66668 5.00016C9.66668 5.44219 9.49108 5.86611 9.17852 6.17867C8.86596 6.49123 8.44204 6.66683 8.00001 6.66683C7.55798 6.66683 7.13406 6.49123 6.8215 6.17867C6.50894 5.86611 6.33334 5.44219 6.33334 5.00016C6.33334 4.55814 6.50894 4.13421 6.8215 3.82165C7.13406 3.50909 7.55798 3.3335 8.00001 3.3335ZM5.33334 1.3335V2.66683L2.66668 2.66616V5.3335H1.33334V1.3335H5.33334ZM14.6667 1.3335V5.3335H13.3333V2.66683H10.6667V1.3335H14.6667Z" fill="#1E88E5"/> </g> <defs> <clipPath id="clip0_8391_107261"> <rect width="16" height="16" fill="white"/> </clipPath> </defs> </svg>`;
    if (type === 4)
      return `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_8391_107279)"> <path d="M3.28599 14.3233L7.18332 10.426C7.46684 10.502 7.76751 10.4823 8.03869 10.37C8.30988 10.2577 8.53643 10.059 8.6832 9.80485C8.82997 9.55066 8.88876 9.25514 8.85046 8.96413C8.81215 8.67312 8.67889 8.40288 8.47134 8.19533C8.26379 7.98777 7.99355 7.85451 7.70254 7.8162C7.41152 7.7779 7.116 7.83669 6.86181 7.98346C6.60762 8.13024 6.40896 8.35678 6.29666 8.62797C6.18435 8.89916 6.16466 9.19982 6.24066 9.48334L2.34332 13.3807L1.63666 12.674C3.52132 10.474 4.22866 8.038 5.17132 3.95267L9.41399 3.48134L13.1853 7.25267L12.714 11.4953C8.62866 12.438 6.19266 13.1453 3.99332 15.0307L3.28599 14.324V14.3233ZM11.064 1.36001L15.2953 5.59067C15.3389 5.6342 15.3696 5.68896 15.384 5.74887C15.3983 5.80879 15.3958 5.87151 15.3767 5.93007C15.3575 5.98864 15.3226 6.04076 15.2756 6.08064C15.2286 6.12052 15.1715 6.14661 15.1107 6.15601L14.128 6.30934L10.3573 2.53867L10.4987 1.54867C10.5074 1.48745 10.5331 1.42988 10.5727 1.38241C10.6124 1.33493 10.6644 1.29942 10.7231 1.27984C10.7818 1.26026 10.8447 1.25739 10.9049 1.27155C10.9651 1.2857 11.0202 1.31633 11.064 1.36001Z" fill="#1E88E5"/> </g> <defs> <clipPath id="clip0_8391_107279"> <rect width="16" height="16" fill="white"/> </clipPath> </defs> </svg>`;

    return null;
  };

  const renderItem = (item) => {
    return (
      <View
        flexrow
        atcenter
        p={16}
        mt={16}
        borderwidth={1}
        borderradius={6}
        bordercolor={theme.palette.common.strokeDividerLine}
      >
        <SvgIcon>{getIcon(item.pipelineStateType)}</SvgIcon>

        <View flex ml={16}>
          <Text fontsize={13} fontweight={600}>
            {PipelineStateType(item.pipelineStateType)}
          </Text>

          {
            !!item.description &&<Text mt={2} fontsize={12}>
              {item.description}
            </Text>
          }
        </View>
      </View>
    );
  };

  return (
    <Modal
      open={show}
      onClose={onClose}
      sx={{ display: "flex", justifyContent: "flex-end" }}
    >
      <ViewModel>
        {/* header */}
        <View
          flexrow="true"
          atcenter="center"
          pv={12}
          ph={24}
          bgcolor={theme.palette.common.white}
        >
          <Text flex="true" fontsize={16} fontweight={"600"}>
            {"Xem chi tiết quy trình tuyển dụng"}
          </Text>
          <ButtonDS
            type="submit"
            sx={{
              backgroundColor: "#fff",
              boxShadow: "none",
              ":hover": {
                backgroundColor: "#EFF3F7",
              },
              textTransform: "none",
              padding: "12px",
              minWidth: "unset",
            }}
            onClick={onClose}
            icon={
              <Iconify
                icon={"mi:close"}
                width={20}
                height={20}
                color={theme.palette.common.borderObject}
              />
            }
          />
        </View>
        <Divider />

        {/* body */}
        <View flex="true" p={24} pb={28} style={{ overflowY: "scroll" }}>
          {/* name */}
          <Text fontsize={24} fontweight={700}>
            {data?.name}
          </Text>

          {/* description */}
          {!!data?.description &&<View flexrow mt={24}>
            <Text>{"Mô tả:"}</Text>

            <Text ml={24}>{data?.description}</Text>
          </View>}

          <View mv={24}>
            <Divider />
          </View>

          <Text fontsize={16} fontweight={600}>
            {"Bước tuyển dụng"}
          </Text>

          {list.map(renderItem)}
        </View>

        {/* footer */}
        <View
          flexrow="true"
          pv={16}
          ph={24}
          boxshadow={"inset 0px 1px 0px #EBECF4"}
        >
          {!!onPressEdit && (
            <>
              <ButtonDS
                type="submit"
                variant="contained"
                tittle={"Chỉnh sửa"}
                onClick={onPressEdit}
              />
              <View width={8} />
            </>
          )}

          <ButtonCancelStyle onClick={onClose}>Hủy</ButtonCancelStyle>
          <View width={8} />
          <View flex="true" />

          {!!onPressDelete && (
            <ButtonIcon
              sx={{
                marginLeft: "16px",
              }}
              onClick={onPressDelete}
              icon={
                <Iconify
                  icon={"material-symbols:delete-outline-rounded"}
                  width={20}
                  height={20}
                  color="#D32F2F"
                />
              }
            />
          )}
        </View>
      </ViewModel>
    </Modal>
  );
};
