export const CandidateState = (item) => {
  switch (item) {
    case 0: //"Draft"
      return <span style={{ color: "#388E3C" }}>Ứng tuyển</span>;
    case 1: //"WaitingOrganizationApproval":
      return <span style={{ color: "#F77A0C" }}>Thi tuyển</span>;
    case 2: //"OrganizationReject":
      return <span style={{ color: "#E53935" }}>Kết thúc thi tuyển</span>;
    case 3: //"WaitingMedusaApproval":
      return <span style={{ color: "#F77A0C" }}>Hết hạn</span>;
    case 4: //"MedusaReject":
      return <span style={{ color: "#E53935" }}>Đạt</span>;
    case 5: //"Recruiting":
      return <span style={{ color: "#388E3C" }}>Không đạt</span>;
    case 6: //"Calendared":
      return <span style={{ color: "#388E3C" }}>Đang lên lịch</span>;
    case 7: //"Expired":
      return <span style={{ color: "#455570" }}>Chấp nhận</span>;
    case 8: //"Closed":
      return <span style={{ color: "#455570" }}>Từ chối</span>;
    case 9: //"Draft"
      return <span style={{ color: "#455570" }}>Đang phỏng vấn</span>;
    case 10: //"WaitingOrganizationApproval":
      return <span style={{ color: "#F77A0C" }}>Kết thúc phỏng vấn</span>;
    case 11: //"OrganizationReject":
      return <span style={{ color: "#E53935" }}>Hết hạn phỏng vấn</span>;
    case 12: //"WaitingMedusaApproval":
      return <span style={{ color: "#F77A0C" }}>Phỏng vấn với máy</span>;
    case 13: //"MedusaReject":
      return (
        <span style={{ color: "#E53935" }}>Kết thúc phỏng vấn với máy</span>
      );
    case 14: //"Recruiting":
      return <span style={{ color: "#388E3C" }}>Kết quả đạt</span>;
    case 15: //"Calendared":
      return <span style={{ color: "#388E3C" }}>Kết quả cân nhắc</span>;
    case 16: //"Expired":
      return <span style={{ color: "#455570" }}>Kết quả loại</span>;
    case 17: //"Closed":
      return <span style={{ color: "#455570" }}>Mời nhận việc</span>;
    case 18: //"Expired":
      return <span style={{ color: "#455570" }}>Từ chối nhận việc</span>;
    case 19: //"Closed":
      return <span style={{ color: "#455570" }}>Đồng ý nhận việc</span>;
  }
};
