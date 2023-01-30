import { Text, View } from "@/components/FlexStyled";
import SvgIcon from "@/components/SvgIcon";

export const JobTypePreviewItem = ({ data, index }) => {
  const renderItemPoint = (_, index) => {
    return (
      <View flex1 contentCenter height={40}>
        {!!index && (
          <View absolute l={0} width={1} height={"100%"} bgColor={"#EBECF4"} />
        )}
        <Text>{index + 1}</Text>
      </View>
    );
  };

  const renderItemResult = (item, index) => {
    return (
      <View flex1 flexRow jcCenter atCenter pv={10} onPress={() => {}}>
        {!!index && (
          <View absolute l={0} width={1} height={"100%"} bgColor={"#C9D9E0"} />
        )}
        <SvgIcon>{item.icon}</SvgIcon>

        <Text ml={12} lineHeight={20 / 12}>
          {item.name}
        </Text>
      </View>
    );
  };

  return (
    <>
      <View p={16} mt={index ? 24 : 0} borderRadius={6} bgColor={"#F8F8F9"}>
        <Text fontSize={17} fontWeight={"700"}>
          {data.name}
        </Text>

        {!!data.des && (
          <Text mt={8} fontSize={15}>
            {data.des}
          </Text>
        )}
        <View height={8} />

        <View
          pv={12}
          ph={20}
          height={80}
          borderRadius={4}
          borderWidth={1}
          bgColor={"#fff"}
          borderColor={"#C9D9E0"}
        >
          <Text color={"#929292"}>{"Nhập nội dung đánh giá"}</Text>
        </View>

        <View
          flexRow
          mt={16}
          borderWidth={1}
          borderRadius={8}
          bgColor={"#fff"}
          borderColor={"#EBECF4"}
        >
          {new Array(10).fill(0).map(renderItemPoint)}
        </View>
      </View>

      <View p={16} mt={24} borderRadius={6} bgColor={"#F1F5F8"}>
        <Text flexRow atCenter fontSize={17} fontWeight={"700"}>
          {"Kết luận"}
          <Text ml={4} color={"#E82E25"}>
            {"*"}
          </Text>
        </Text>

        <View
          mt={24}
          borderWidth={1}
          borderRadius={4}
          bgColor={"#fff"}
          borderColor={"#C9D9E0"}
        >
          <View flexRow atCenter>
            {[
              {
                name: "Đạt",
                icon: '<svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.49992 6H3.49992V14H1.49992C1.32311 14 1.15354 13.9298 1.02851 13.8047C0.90349 13.6797 0.833252 13.5101 0.833252 13.3333V6.66667C0.833252 6.48986 0.90349 6.32029 1.02851 6.19526C1.15354 6.07024 1.32311 6 1.49992 6ZM5.02859 5.138L9.29525 0.871333C9.35196 0.814463 9.42729 0.779978 9.5074 0.774221C9.5875 0.768464 9.667 0.791822 9.73125 0.84L10.2999 1.26667C10.4579 1.38523 10.5771 1.5479 10.6428 1.73417C10.7084 1.92044 10.7174 2.12196 10.6686 2.31333L9.89992 5.33333H14.1666C14.5202 5.33333 14.8593 5.47381 15.1094 5.72386C15.3594 5.97391 15.4999 6.31304 15.4999 6.66667V8.06933C15.5001 8.24357 15.4661 8.41616 15.3999 8.57733L13.3366 13.5873C13.2863 13.7095 13.2008 13.8139 13.091 13.8874C12.9812 13.9609 12.852 14.0001 12.7199 14H5.49992C5.32311 14 5.15354 13.9298 5.02851 13.8047C4.90349 13.6797 4.83325 13.5101 4.83325 13.3333V5.60933C4.83329 5.43254 4.90355 5.26299 5.02859 5.138Z" fill="#6D6F81"/></svg>',
              },
              {
                name: "Cân nhắc",
                icon: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.00004 13.6667C3.31804 13.6667 0.333374 10.682 0.333374 7C0.333374 3.318 3.31804 0.333334 7.00004 0.333334C10.682 0.333334 13.6667 3.318 13.6667 7C13.6667 10.682 10.682 13.6667 7.00004 13.6667ZM3.66671 5H5.00004V7.66667H6.33337V5H7.66671L5.66671 2.66667L3.66671 5ZM10.3334 9H9.00004V6.33333H7.66671V9H6.33337L8.33337 11.3333L10.3334 9Z" fill="#6D6F81"/></svg>',
              },
              {
                name: "Không đạt",
                icon: '<svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.9999 8H11.9999V0H13.9999C14.1767 0 14.3463 0.0702379 14.4713 0.195262C14.5963 0.320286 14.6665 0.489856 14.6665 0.666667V7.33333C14.6665 7.51014 14.5963 7.67971 14.4713 7.80474C14.3463 7.92976 14.1767 8 13.9999 8ZM10.4712 8.862L6.20455 13.1287C6.14784 13.1855 6.0725 13.22 5.9924 13.2258C5.91229 13.2315 5.8328 13.2082 5.76855 13.16L5.19988 12.7333C5.04194 12.6148 4.92265 12.4521 4.85704 12.2658C4.79143 12.0796 4.78244 11.878 4.83121 11.6867L5.59988 8.66667H1.33321C0.97959 8.66667 0.640451 8.52619 0.390403 8.27614C0.140354 8.02609 -0.000121361 7.68696 -0.000121361 7.33333V5.93067C-0.000301108 5.75643 0.0336726 5.58384 0.0998786 5.42267L2.16388 0.413333C2.21407 0.291169 2.29941 0.186663 2.40908 0.113075C2.51875 0.0394861 2.64781 0.000130314 2.77988 0H9.99988C10.1767 0 10.3463 0.0702379 10.4713 0.195262C10.5963 0.320286 10.6665 0.489856 10.6665 0.666667V8.39067C10.6665 8.56746 10.5962 8.737 10.4712 8.862Z" fill="#6D6F81"/></svg>',
              },
            ].map(renderItemResult)}
          </View>
          <View height={1} bgColor={"#C9D9E0"} />

          <View pv={12} ph={20} height={124}>
            <Text color={"#929292"}>{"Nhập nội dung đánh giá"}</Text>
          </View>
        </View>
      </View>
    </>
  );
};
