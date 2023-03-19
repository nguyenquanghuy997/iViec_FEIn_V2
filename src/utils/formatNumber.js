import numeral from 'numeral'

export function fCurrency(number) {
  return numeral(number).format(Number.isInteger(number) ? '0,0' : '0,0.00')
}

export function fPercent(number) {
  return numeral(number / 100).format('0.0%')
}

export function fNumber(number) {
  return numeral(number).format()
}

export function fShortenNumber(number) {
  return numeral(number).format('0.00a').replace('.00', '')
}

export function fData(number) {
  return numeral(number).format('0.0 b')
}
export function currencyFormat(
  amount,
  unitType = 0,
  showCurrency = true,
  options = {}
) {
  const isVn = unitType === 0;
  let {
    decimalCount = isVn ? 0 : 2,
    decimal = isVn ? ',' : '.',
    thousands = isVn ? '.' : ',',
    unit = isVn ? 'VNĐ' : '$',
  } = options;

  try {
    if (typeof amount === 'undefined' || amount === null) {
      return null
    }

    const negativeSign = amount < 0 ? '-' : ''
    amount = Math.abs(Number(amount)) || 0

    let amountStr = amount
    if (decimalCount > 0) {
      amountStr.toFixed(decimalCount)
    }
    amountStr = parseInt(amountStr).toString()

    const surLen = amountStr.length > 3 ? amountStr.length % 3 : 0
    let format = negativeSign

    if (surLen > 0) {
      format += amountStr.substr(0, surLen) + thousands
    }

    format += amountStr
      .substr(surLen)
      .replace(/(\d{3})(?=\d)/g, '$1' + thousands)

    if (decimalCount > 0) {
      format +=
        decimal +
        Math.abs(amount - amountStr)
          .toFixed(decimalCount)
          .slice(2)
    }

    if (showCurrency) {
      if (isVn) {
        format += ' ' + unit;
      } else {
        format = unit + ' ' + format
      }
    }

    return format
  } catch (e) {
    return amount
  }
}