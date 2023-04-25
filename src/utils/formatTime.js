import {
  endOfMonth,
  endOfWeek,
  format,
  formatDistanceToNow,
  getTime,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns'
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz'

import { AMPM_DATETIME_FORMAT, DATE_FORMAT, TIMEZONE, TIME_FORMAT, YEAR_FORMAT } from '@/config'

export function fDate(date, dateFormat = DATE_FORMAT) {
  return format(new Date(date), dateFormat)
}
export function fTime(date, timeFormat = TIME_FORMAT) {
  return format(new Date(date), timeFormat)
}
export function fYear(date, yearFormat = YEAR_FORMAT) {
  return format(new Date(date), yearFormat)
}

export function fUtcToDateTime(date, timeZone = TIMEZONE) {
  return utcToZonedTime(new Date(date), timeZone)
}

export function fDateTimeToUtc(date, timeZone = TIMEZONE) {
  return zonedTimeToUtc(date, timeZone)
}

export function fDateTime(date) {
  return format(new Date(date), 'dd MMM yyyy p')
}

export function fTimestamp(date) {
  return getTime(new Date(date))
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p')
}
export function fTimeDate(date) {
  return format(new Date(date), AMPM_DATETIME_FORMAT)
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  })
}

export function fDateCalendar(date) {
  // use with date input format dd/MM/yyyy
  try {
    const convertDate = date?.split('/') || []
    if (convertDate.length < 3) return new Date()
    return new Date(`${convertDate[1]}/${convertDate[0]}/${convertDate[2]}`)
  } catch (error) {
    return new Date()
  }
}

export function fDateStartOfWeek(date) {
  return startOfWeek(date)
}

export function fDateEndOfWeek(date) {
  return endOfWeek(date)
}

export function fDateSubMonths(date, months) {
  return subMonths(date, months)
}

export function fStartOfMonth(date) {
  return startOfMonth(date)
}

export function fEndOfMonth(date) {
  return endOfMonth(date)
}
