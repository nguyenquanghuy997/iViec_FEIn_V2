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
      return <span style={{ color: "#E53935" }}>Từ chối</span>;
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

export const toHhMmSs = (num) => {
  let sec_num = parseInt(num * 60, 10);
  let hours = Math.floor(sec_num / 3600);
  let minutes = Math.floor((sec_num - hours * 3600) / 60);
  let seconds = sec_num - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + ":" + minutes + ":" + seconds;
};

export const pushMin = (time, minutes) => {
  let times = time.split(":");
  minutes = minutes % (24 * 60);
  let hour = parseInt(minutes / 60);
  times[0] = (parseInt(times[0])) + hour;
  times[1] = parseInt(times[1]) + (minutes - hour * 60);
  if (times[1] >= 60) {
    times[1] = times[1] - 60;
    times[0]++
  }

  // chuẩn hóa giờ
  times[0] >= 24 ? times[0] -= 24 : null;
  times[0] < 10 ? times[0] = "0" + times[0] : null;
  times[1] < 10 ? times[1] = "0" + times[1] : null;

  return times.join(":");
}

export const timeToMinutes = (time) => {
  let a = time.split(':');
  return (+a[0]) * 60 + (+a[1]);
};

export const convertDurationTimeToSeconds = (time) => {
  const splitToString = time?.split(":");
  return (
    +splitToString?.[0] * 60 * 60 + +splitToString?.[1] * 60 + +splitToString?.[2]
  );
};

export const convertDurationTimeToMinutes = (time) => {
  const splitToString = time?.split(":");
  return (
    +splitToString?.[0] * 60 * 60 + +splitToString?.[1] * 60
  );
};

export const convertStoMs = (s) => {
  const totalMinutes = Math.floor(s / 60);
  const seconds = s % 60;
  const newSeconds = seconds < 10 ? "0" + seconds : seconds;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}:${minutes}:${newSeconds}`;
};

export const convertDataGet = (model) => {
  if (!model) return "";
  return model.map(item => {
    return {
      ...item, bookingCalendarApplicants: item?.bookingCalendarApplicants.map(itemData => {
        let dataDuration = timeToMinutes(itemData.interviewDuration);
        let dataDate = new Date(itemData.interviewTime);
        let dataTime = new Date(itemData.interviewTime).toLocaleTimeString('vi-VN', { hour12: false });
        return {
          ...itemData,
          date: dataDate,
          interviewTime: dataTime,
          interviewDuration: dataDuration,
        };
      })
    };
  });

}
