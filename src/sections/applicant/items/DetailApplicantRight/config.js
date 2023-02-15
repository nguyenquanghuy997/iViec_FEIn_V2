export const ACTION_FAIL = "fail";
export const ACTION_SUCCESS = "success";
export const ACTION_CONSIDER = "consider";
export const ACTION_INTERVIEW = "interview";
export const ACTION_APPLY = "apply";
export const ACTION_COMPETITION = 'competition';
export const ACTION_INVITATION = 'invitation';


export const ACTION = {
  ACTION_FAIL,
  ACTION_SUCCESS,
  ACTION_CONSIDER,
  ACTION_INTERVIEW,
  ACTION_APPLY,
  ACTION_COMPETITION,
  ACTION_INVITATION
};

export const ACTION_CONTENT = {
  fail: {text:'Loại', color: "#D32F2F" },
  success: { text:'Kết quả- Đạt',color: "#388E3C" },
  consider: { text:'Kết quả- cân nhắc',color: "#F77A0C" },
  interview: { text:'Phỏng vấn trực tiếp',color: "#172B4D",option:'Xem bộ câu hỏi' },
  apply: { text:'Ứng tuyển',color: "#172B4D" },
  competition :{ text :'Thi tuyển',color :"#172B4D", option:'Xem đề thi'},
  invitation : {text:'Mời nhận việc', color:'#A2AAB7', option:'Xem thư mời nhận việc'}

};
