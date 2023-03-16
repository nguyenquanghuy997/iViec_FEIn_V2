import {pxToRem} from "@/utils/getFontValue";

export const EMAIL_ACCOUNT_EDITOR_DEFAULT_TEXT = (primaryColor = '#455570') => {
  const fontSize = pxToRem(16)
  return {
    contentEmail: `<p>Thân chào Anh/Chị&nbsp;<span style="font-weight: 500; font-size: 13px; padding: 5px 8px; color: #1565C0; background-color: #E3F2FD">Tên ứng viên</span>&nbsp;</p>`,
    contentSignature: `
      <p style="margin-bottom: 8px">Thanks & Best Regard</p>
      <p style="margin-bottom: 8px">&nbsp;<span style="font-weight: 500; font-size: 13px; padding: 5px 8px; color: #1565C0; background-color: #E3F2FD">Cán bộ tuyển dụng</span>&nbsp;</p>
      <p style="margin-bottom: 8px">Địa chỉ <span style="font-weight: 500; font-size: 13px; padding: 5px 8px; color: #1565C0; background-color: #E3F2FD">Địa chỉ công ty</span>&nbsp;</p>
      <p style="margin-bottom: 8px">
        Email: 
        <span style="font-weight: 500; font-size: 13px; padding: 5px 8px; color: #1565C0; background-color: #E3F2FD">Email công ty</span>
        &nbsp;-&nbsp;
        Hotline:
        <span style="font-weight: 500; font-size: 13px; padding: 5px 8px; color: #1565C0; background-color: #E3F2FD">SDT công ty</span>
        &nbsp;-&nbsp;
        Website:
        <span style="font-weight: 500; font-size: 13px; padding: 5px 8px; color: #1565C0; background-color: #E3F2FD">Website công ty</span>
      </p>
    `,
    responsibilities: `<h2 style="font-size: ${fontSize}rem;"><span style="color: ${primaryColor};"><strong>2. RESPONSIBILITIES</strong></span></h2><br/>`,
    requirement: `<h2 style="font-size: ${fontSize}rem;"><span style="color: ${primaryColor};"><strong>3. REQUIREMENT</strong></span></h2><br/>`,
    benefit: `<h2 style="font-size: ${fontSize}rem;"><span style="color: ${primaryColor};"><strong>4. WHY YOU‘LL LOVE WORKING HERE</strong></span></h2><br/>`,
    niceToHave: `<p></p>`,
  }
}
