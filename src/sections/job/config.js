import palette from '@/theme/palette'
import { pxToRem } from '@/utils/getFontValue'

export const TABLE_HEAD = ({ translate }) => [
  { id: 'title', label: translate('pages.jobs.title'), align: 'left' },
  { id: 'client', label: translate('pages.jobs.client'), align: 'left' },
  { id: 'time', label: translate('pages.jobs.time'), align: 'left' },
  { id: 'salary', label: translate('pages.jobs.salary'), align: 'left' },
  { id: 'type', label: translate('pages.jobs.type'), align: 'left' },
  { id: 'status', label: translate('pages.jobs.status'), align: 'left' },
  { id: 'actions', label: translate('pages.jobs.actions'), align: 'left' },
]

export const TABLE_HEAD_MOBILE = ({ translate }) => [
  { id: 'emtpy_cell', label: translate(''), align: 'left' },
  { id: 'title', label: translate('pages.jobs.title'), align: 'left' },
  { id: 'client', label: translate('pages.jobs.client'), align: 'left' },
]

export const JOB_ALL_STATUS = 'All'
export const JOB_ACTIVE_STATUS = 'Active'
export const JOB_CLOSE_STATUS = 'Close'
export const JOB_PENDING_STATUS = 'Pending'
export const JOB_ARCHIVE_STATUS = 'Archive'

export const JOB_STATUS_OPTIONS = [
  JOB_ACTIVE_STATUS,
  JOB_CLOSE_STATUS,
  JOB_PENDING_STATUS,
  JOB_ARCHIVE_STATUS,
]

export const JOB_STATUS_COLORS = {
  active: palette.light.primary.main,
  close: palette.light.error.main,
  pending: palette.light.warning.main,
  archive: palette.light.info.main,
}

export const JOB_TYPE_OPTIONS = [
  { value: 'Full time', label: 'Full time' },
  { value: 'Part time', label: 'Part time' },
  { value: 'Freelance', label: 'Freelance' },
]

export const JOB_EDITOR_DEFAULT_TEXT = (primaryColor = '#FCCC4B') => {
  const fontSize = pxToRem(16)
  return {
    aboutIviec: ``,
    responsibilities: `<h2 style="font-size: ${fontSize}rem;"><span style="color: ${primaryColor};"><strong>2. RESPONSIBILITIES</strong></span></h2><br/>`,
    requirement: `<h2 style="font-size: ${fontSize}rem;"><span style="color: ${primaryColor};"><strong>3. REQUIREMENT</strong></span></h2><br/>`,
    benefit: `<h2 style="font-size: ${fontSize}rem;"><span style="color: ${primaryColor};"><strong>4. WHY YOU‘LL LOVE WORKING HERE</strong></span></h2><br/>`,
    niceToHave: `<p></p>`,
  }
}

export const JOB_FORM_STICKY_BAR_COLOR = {
  LIGHT: {
    COLOR: '#fff',
    SHADOW: '#d8d8d8',
  },
  DARK: {
    COLOR: '#212b36',
    SHADOW: '#3e474f',
  },
}

export const REPLACE_LABEL_TYPE = (type) => type.replace(/ /g, '-')

export const JOB_FORM_STICKY_BAR_TEXT = (title) =>
  `<h1 style="font-size: 16px;"><span style="color: #FCCC4B;">${title}</span></h1>`
