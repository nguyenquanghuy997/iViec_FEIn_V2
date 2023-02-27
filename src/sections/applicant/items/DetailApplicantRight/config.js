export const ACTION_FAIL = "fail";
export const ACTION_SUCCESS = "success";
export const ACTION_CONSIDER = "consider";
export const ACTION_INTERVIEW = "interview";
export const ACTION_APPLY = "apply";
export const ACTION_COMPETITION = 'competition';
export const ACTION_INVITATION = 'invitation';
export const ACTION_ADD = 'add';
export const ACTION_UPDATE = 'update';


export const ACTION = {
  ACTION_FAIL,
  ACTION_SUCCESS,
  ACTION_CONSIDER,
  ACTION_INTERVIEW,
  ACTION_APPLY,
  ACTION_COMPETITION,
  ACTION_INVITATION,
  ACTION_ADD,
  ACTION_UPDATE
};

export const ACTION_CONTENT = {
  add: { text:'Ứng tuyển', color: "#172B4D" },
  update: { text:'Ứng tuyển', color: "#172B4D" },
  apply: { text:'Ứng tuyển', color: "#172B4D" },
  evaluateFail: {text:'Loại', color: "#D32F2F" },
  evaluateSuccess: { text:'Đạt',color: "#388E3C" },
  evaluateSonsider: { text:'Cân nhắc',color: "#F77A0C" },
  resultFail: {text:'Kết quả - Loại', color: "#D32F2F" },
  resultSuccess: { text:'Kết quả - Đạt',color: "#388E3C" },
  resultSonsider: { text:'Kết quả - Cân nhắc',color: "#F77A0C" },
  resultSonsider: { text:'Kết quả - Cân nhắc',color: "#F77A0C" },
  interviewExam: { text:'Phỏng vấn máy',color: "#172B4D",option:'Xem bộ câu hỏi' },
  interview: { text:'Phỏng vấn người',color: "#172B4D",option:'Xem bộ câu hỏi' },
  ownerApply: { text:'Ứng tuyển',color: "#172B4D" },
  competition :{
 text :'Thi tuyển',color :"#172B4D", option:'Xem đề thi'},
  ownerCompetition :{
 text :'Thi tuyển',color :"#172B4D", option:'Xem đề thi'},
  invitation : {text:'Mời nhận việc', color:'#A2AAB7', option:'Xem thư mời nhận việc'}

};