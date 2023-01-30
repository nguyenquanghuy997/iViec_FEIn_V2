import SvgIcon from "@/components/SvgIcon";
import { Card, Tooltip } from "@mui/material";

export const ReportCard = (props) => {
  return (
    <div
      style={{
        width: 333,
        borderRadius: 8,
        padding: "36px 24px",
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        background: "#fff",
        border: "1px solid #EBECF4",
      }}
    >
      <Card
        style={{
          width: 48,
          height: 48,
          background: "#01B6A7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {props.icon}
      </Card>

      <div
        style={{
          flex: 1,
          marginLeft: 18,
        }}
      >
        <span
          style={{
            display: "block",
            fontSize: 13,
            color: "#6D6F81",
            fontWeight: "600",
          }}
        >
          {props.title}
        </span>
        <span
          style={{
            display: "block",
            fontSize: 23,
            color: "#01B6A7",
            fontWeight: "900",
          }}
        >
          {props.value}
        </span>
      </div>
      <SvgIcon>
        {props.delta < 0
          ? `<svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" > <path d="M9.12021 1.67999L6.98021 3.81999L5.67354 5.13332C5.12021 5.68666 4.22021 5.68666 3.66688 5.13332L0.213544 1.67999C-0.23979 1.22666 0.0868769 0.453325 0.72021 0.453325H4.46021H8.61354C9.25354 0.453325 9.57354 1.22666 9.12021 1.67999Z" fill="#E82E25" /> </svg>`
          : ` <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" > <path d="M9.12021 4.32001L6.98021 2.18001L5.67354 0.866675C5.12021 0.313342 4.22021 0.313342 3.66688 0.866675L0.213544 4.32001C-0.23979 4.77334 0.0868769 5.54668 0.72021 5.54668H4.46021H8.61354C9.25354 5.54668 9.57354 4.77334 9.12021 4.32001Z" fill="#23B15C" /> </svg>`}
      </SvgIcon>

      <span
        style={{
          marginLeft: 6,
          marginRight: 6,
          fontSize: 14,
          fontWeight: "600",
          color: props.delta < 0 ? "#E82E25" : "#23B15C",
        }}
      >
        {Math.abs(props.delta)}
        {"%"}
      </span>

      <Tooltip title={props.tooltip}>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.33355 1.77777C5.34483 1.77777 2.11133 5.01127 2.11133 8.99999C2.11133 12.9887 5.34483 16.2222 9.33355 16.2222C13.3223 16.2222 16.5558 12.9887 16.5558 8.99999C16.5558 7.08454 15.7949 5.24754 14.4404 3.89311C13.086 2.53868 11.249 1.77777 9.33355 1.77777ZM10.0557 12.9722C10.0557 13.1717 9.89402 13.3333 9.69458 13.3333H8.97236C8.77292 13.3333 8.61125 13.1717 8.61125 12.9722V12.25C8.61125 12.0506 8.77292 11.8889 8.97236 11.8889H9.69458C9.89402 11.8889 10.0557 12.0506 10.0557 12.25V12.9722ZM10.692 9.20944C11.5482 8.93233 12.1303 8.13766 12.1364 7.23778V6.83333C12.1364 6.28168 11.9173 5.75262 11.5272 5.36255C11.1371 4.97247 10.6081 4.75333 10.0564 4.75333H8.61198C7.46323 4.75333 6.53198 5.68458 6.53198 6.83333V7.19444C6.53198 7.39388 6.69366 7.55555 6.89309 7.55555H7.44198C7.64142 7.55555 7.80309 7.39388 7.80309 7.19444V6.83333C7.80309 6.38659 8.16525 6.02444 8.61198 6.02444H10.0564C10.2759 6.0166 10.4892 6.09834 10.6472 6.2509C10.8052 6.40345 10.8943 6.6137 10.8942 6.83333V7.23778C10.8949 7.58611 10.6744 7.8965 10.3453 8.01055L9.6592 8.23444C9.10437 8.41783 8.7291 8.93564 8.72754 9.52V10.0833C8.72754 10.2828 8.88921 10.4444 9.08865 10.4444H9.63754C9.83697 10.4444 9.99865 10.2828 9.99865 10.0833V9.52C9.99865 9.48209 10.0214 9.44791 10.0564 9.43333L10.692 9.20944Z"
            fill="#393B3E"
          />
        </svg>
      </Tooltip>
    </div>
  );
};
