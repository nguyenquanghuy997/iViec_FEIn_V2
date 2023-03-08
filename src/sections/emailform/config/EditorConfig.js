import {pxToRem} from "@/utils/getFontValue";

export const EMAIL_ACCOUNT_EDITOR_DEFAULT_TEXT = (primaryColor = '#455570') => {
  const fontSize = pxToRem(16)
  return {
    contentEmail: ``,
    responsibilities: `<h2 style="font-size: ${fontSize}rem;"><span style="color: ${primaryColor};"><strong>2. RESPONSIBILITIES</strong></span></h2><br/>`,
    requirement: `<h2 style="font-size: ${fontSize}rem;"><span style="color: ${primaryColor};"><strong>3. REQUIREMENT</strong></span></h2><br/>`,
    benefit: `<h2 style="font-size: ${fontSize}rem;"><span style="color: ${primaryColor};"><strong>4. WHY YOU‘LL LOVE WORKING HERE</strong></span></h2><br/>`,
    niceToHave: `<p></p>`,
  }
}
