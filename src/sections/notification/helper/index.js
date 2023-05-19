export function convertNotificationType(notificationType) {
  switch (notificationType) {
    case 0:
      return "Ứng tuyển"
    case 1:
    case 2:
    case 3:
      return "Phỏng vấn"
    case 4:
    case 5:
      return "Kết quả"
  }
}

export function convertNotificationTypeTitle(notificationType) {
  switch (notificationType) {
    case 0:
      return "Ứng tuyển thành công"
    case 1:
      return "Thông báo lịch phỏng vấn"
    case 2:
      return "Thông báo lịch phỏng vấn"
    case 3:
      return "Thông báo lịch phỏng vấn"
    case 4:
      return "Thông báo kết quả phỏng vấn"
    case 5:
      return "Thông báo kết quả phỏng vấn"
  }
}

export function renderContent(content, type) {
  if (!content) return;
  if (type) {
    content = content.replace(' {{jobPosition}}', '&nbsp;<span class="tag">Vị trí ứng tuyển</span>&nbsp;')
    content = content.replace(' {{interviewTime}}', '&nbsp;<span class="tag">Giờ phỏng vấn</span>&nbsp;')
    return content
  } else {
    content = content.replace('<span class="tag">Vị trí ứng tuyển</span>', '{{jobPosition}}')
    content = content.replace('<span class="tag">Giờ phỏng vấn</span>', '{{interviewTime}}')
    return content
  }
}

export function renderDataDemo(content) {
  if (!content) return;
  content = content.replace('<span class="tag">Vị trí ứng tuyển</span>', '<b>Nhân viên chăm sóc khách hàng</b>')
  content = content.replace('<span class="tag">Giờ phỏng vấn</span>', '<b>14:00 19/5/2023</b>')
  return content
}

export const LIST_TYPE_NOTIFICATION = [
  {id: null, value: null, name: "Tất cả"},
  {id: "0", value: "0", name: "Ứng tuyển"},
  {id: "1", value: "1", name: "Phỏng vấn"},
  {id: "2", value: "2", name: "Kết quả"},
]

export const dataDefault = [
  {
    title: "Ứng tuyển thành công",
    notificationType: 0,
    content: "Bạn đã ứng tuyển thành công vị trí {{jobPosition}}",
  },
  {
    title: "Thông báo lịch phỏng vấn",
    notificationType: 1,
    content: "Bạn đã được sắp xếp lịch phỏng vấn vị trí {{jobPosition}}",
  },
  {
    title: "Thông báo lịch phỏng vấn",
    notificationType: 2,
    content: "Bạn có lịch phỏng vấn vị trí {{jobPosition}} vào {{interviewTime}}",
  },
  {
    title: "Thông báo lịch phỏng vấn",
    notificationType: 3,
    content: "Vui lòng tham gia phỏng vấn vị trí {{jobPosition}} tại đây",
  },
  {
    title: "Thông báo kết quả phỏng vấn",
    notificationType: 4,
    content: "Chúc mừng bạn đã vượt qua vòng phỏng vấn vị trí {{jobPosition}}",
  },
  {
    title: "Thông báo kết quả phỏng vấn",
    notificationType: 5,
    content: "Bạn chưa vượt qua vòng phỏng vấn vị trí {{jobPosition}}",
  }
]